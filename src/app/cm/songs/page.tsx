"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { playlists, TPlaylistKey } from "@/data/musicData";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Song {
  id: number;
  url: string;
  artist: string;
  title: string;
  playlists: TPlaylistKey[];
  is_active: boolean;
  sort_order: number;
}

const PLAYLIST_KEYS = Object.keys(playlists).filter(
  (k) => k !== "Total",
) as TPlaylistKey[];

const emptyForm = {
  url: "",
  artist: "",
  title: "",
  playlists: [] as TPlaylistKey[],
  is_active: true,
};

function SortableRow({
  song,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  song: Song;
  onEdit: (s: Song) => void;
  onDelete: (id: number) => void;
  onToggleActive: (s: Song) => void;
}) {
  const isPinned = song.id === 1;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id, disabled: isPinned });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        song.is_active
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-900 border-gray-800 opacity-50"
      }`}
    >
      {/* 드래그 핸들 */}
      <button
        {...(!isPinned ? { ...attributes, ...listeners } : {})}
        className={`px-1 touch-none ${isPinned ? "text-gray-600 cursor-not-allowed" : "text-gray-500 hover:text-gray-300 cursor-grab active:cursor-grabbing"}`}
      >
        ⠿
      </button>

      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => onEdit(song)}
      >
        <div className="font-medium truncate">{song.title}</div>
        <div className="text-sm text-gray-400 truncate">{song.artist}</div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {song.playlists.map((p) => (
            <span key={p} className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
              {playlists[p] ?? p}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onToggleActive(song)}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            song.is_active
              ? "bg-green-800 hover:bg-green-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {song.is_active ? "활성" : "비활성"}
        </button>
        <button
          onClick={() => onEdit(song)}
          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(song.id)}
          className="px-2 py-1 text-xs bg-red-900 hover:bg-red-800 rounded transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default function SongsPage() {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPlaylist, setFilterPlaylist] = useState<string>("Total");

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (sessionStorage.getItem("cm-auth") !== "true") {
      router.replace("/cm");
      return;
    }
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("songs")
      .select("*")
      .order("sort_order", { ascending: false });
    if (data) setSongs(data as Song[]);
    setLoading(false);
  };

  const filteredSongs = songs.filter((s) => {
    const matchSearch = s.title.includes(search) || s.artist.includes(search);
    const matchPlaylist =
      filterPlaylist === "Total" ||
      s.playlists.includes(filterPlaylist as TPlaylistKey);
    return matchSearch && matchPlaylist;
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = songs.findIndex((s) => s.id === active.id);
    const newIndex = songs.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(songs, oldIndex, newIndex);

    setSongs(reordered);

    // sort_order 일괄 업데이트
    await Promise.all(
      reordered.map((song, index) =>
        supabase
          .from("songs")
          .update({ sort_order: index + 2 })
          .eq("id", song.id),
      ),
    );
  };

  const openAdd = () => {
    setEditingSong(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (song: Song) => {
    setEditingSong(song);
    setForm({
      url: song.url,
      artist: song.artist,
      title: song.title,
      playlists: song.playlists,
      is_active: song.is_active,
    });
    setShowForm(true);
  };

  const togglePlaylistInForm = (key: TPlaylistKey) => {
    setForm((f) => ({
      ...f,
      playlists: f.playlists.includes(key)
        ? f.playlists.filter((p) => p !== key)
        : [...f.playlists, key],
    }));
  };

  const cleanUrl = (url: string) => {
    try {
      const u = new URL(url);
      u.searchParams.delete("si");
      return u.toString();
    } catch {
      return url;
    }
  };

  const handleSave = async () => {
    if (!form.url || !form.artist || !form.title) return;
    const data = { ...form, url: cleanUrl(form.url) };
    if (editingSong) {
      await supabase.from("songs").update(data).eq("id", editingSong.id);
    } else {
      const maxOrder =
        songs.length > 0 ? Math.max(...songs.map((s) => s.sort_order)) : 0;
      await supabase
        .from("songs")
        .insert({ ...data, sort_order: maxOrder + 1 });
    }
    setShowForm(false);
    fetchSongs();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제할까요?")) return;
    await supabase.from("songs").delete().eq("id", id);
    fetchSongs();
  };

  const toggleActive = async (song: Song) => {
    await supabase
      .from("songs")
      .update({ is_active: !song.is_active })
      .eq("id", song.id);
    setSongs((prev) =>
      prev.map((s) =>
        s.id === song.id ? { ...s, is_active: !s.is_active } : s,
      ),
    );
  };

  return (
    <div className="h-screen flex flex-col p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-2xl font-bold">곡 관리 ({filteredSongs.length})</h1>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium transition-colors"
        >
          + 곡 추가
        </button>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap shrink-0">
        <input
          type="text"
          placeholder="제목 / 아티스트 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-gray-400 text-sm w-52"
        />
        <select
          value={filterPlaylist}
          onChange={(e) => setFilterPlaylist(e.target.value)}
          className="px-3 py-1.5 rounded bg-gray-800 border border-gray-600 focus:outline-none text-sm"
        >
          <option value="Total">전체</option>
          {PLAYLIST_KEYS.map((k) => (
            <option key={k} value={k}>
              {playlists[k]}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">로딩 중...</p>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredSongs.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {filteredSongs.map((song) => (
                  <SortableRow
                    key={song.id}
                    song={song}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggleActive={toggleActive}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {editingSong ? "곡 수정" : "곡 추가"}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="유튜브 URL"
                value={form.url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400 text-sm"
              />
              <input
                type="text"
                placeholder="아티스트"
                value={form.artist}
                onChange={(e) =>
                  setForm((f) => ({ ...f, artist: e.target.value }))
                }
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400 text-sm"
              />
              <input
                type="text"
                placeholder="제목"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400 text-sm"
              />
              <div>
                <p className="text-sm text-gray-400 mb-2">플레이리스트</p>
                <div className="flex flex-wrap gap-2">
                  {PLAYLIST_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => togglePlaylistInForm(key)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        form.playlists.includes(key)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {playlists[key]}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, is_active: e.target.checked }))
                  }
                />
                활성화
              </label>
            </div>
            <div className="flex gap-2 mt-5 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
