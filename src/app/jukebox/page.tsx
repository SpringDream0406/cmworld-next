"use client";

import { useMusicStore } from "@/store";
import { playlists } from "@/data/musicData";

export default function JukeboxPage() {
  const { allSongs, playlistCategory, viewCategory, selectPlaylist, setPlayMusics } =
    useMusicStore();

  const viewSongs = viewCategory === "Total" || !viewCategory
    ? allSongs
    : allSongs.filter((m) => m.playlists.includes(viewCategory as keyof typeof playlists));

  const displayLabel = viewCategory
    ? playlists[viewCategory as keyof typeof playlists]
    : "플레이리스트를 선택해주세요";

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* 헤더: 전체 재생 버튼 */}
      <div className="px-4 py-2 border-b bg-white flex items-center gap-3 shrink-0">
        <button
          className="px-3 py-1 bg-basic text-white rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
          disabled={viewSongs.length === 0}
          onClick={() => {
            if (viewCategory) selectPlaylist(viewCategory);
          }}
        >
          ▶ 전체 재생
        </button>
        <span className="text-sm text-gray-600">
          {displayLabel}
          {viewSongs.length > 0 && ` (${viewSongs.length}곡)`}
        </span>
      </div>

      {/* 테이블 헤더 */}
      {viewSongs.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-b grid grid-cols-[40px_1fr_1fr] gap-2 text-xs text-gray-500 font-semibold shrink-0">
          <div className="text-center">번호</div>
          <div>곡명</div>
          <div>아티스트</div>
        </div>
      )}

      {/* 음악 목록 */}
      <div className="flex-1 overflow-y-auto">
        {viewSongs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            왼쪽에서 플레이리스트를 선택해주세요
          </div>
        ) : (
          viewSongs.map((music, index) => (
            <div
              key={index}
              className="px-4 py-2 grid grid-cols-[40px_1fr_1fr] gap-2 items-center border-b hover:bg-blue-50 transition-colors group"
            >
              {/* 번호 / 재생 버튼 */}
              <div className="text-center">
                <span className="text-xs text-gray-400 group-hover:hidden">
                  {index + 1}
                </span>
                <button
                  className="hidden group-hover:block mx-auto text-basic hover:text-blue-700"
                  onClick={() => setPlayMusics([music])}
                  title="이 곡만 재생"
                >
                  ▶
                </button>
              </div>

              {/* 곡명 */}
              <div
                className="text-sm truncate cursor-pointer hover:text-basic"
                title={music.title}
                onClick={() => setPlayMusics([music])}
              >
                {music.title}
              </div>

              {/* 아티스트 */}
              <div className="text-sm text-gray-500 truncate" title={music.artist}>
                {music.artist}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
