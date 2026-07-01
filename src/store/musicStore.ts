import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { IMusicData, TPlaylistKey } from "@/data/musicData";
import { supabase } from "@/lib/supabase";

export const useMusicStore = create(
  persist(
    combine(
      {
        allSongs: [] as IMusicData[],
        playMusics: [] as IMusicData[],
        playlistCategory: "",
        viewCategory: "",
        volume: 10,
        currentIndex: 0,
        isShuffleOn: false,
      },
      (set, get) => ({
        initSongs: async () => {
          if (get().allSongs.length > 0) return;
          const { data, error } = await supabase
            .from("songs")
            .select("url, artist, title, playlists")
            .eq("is_active", true)
            .order("sort_order", { ascending: false });
          if (!error && data) {
            set({ allSongs: data as IMusicData[] });
          }
        },

        // 실제 재생 목록 변경 (뮤직플레이어에서 재생 시작)
        setPlayMusics: (musics: IMusicData[]) => set({ playMusics: musics }),

        // 쥬크박스 왼쪽 카테고리 선택 - 목록만 변경, 재생은 안 함
        setViewCategory: (category: string) => {
          set({ viewCategory: category });
        },

        // 실제 재생 시작 (전체재생 또는 플레이어에서 카테고리 선택)
        selectPlaylist: async (category: string) => {
          let all = get().allSongs;
          if (all.length === 0) {
            const { data } = await supabase
              .from("songs")
              .select("url, artist, title, playlists")
              .eq("is_active", true)
              .order("sort_order", { ascending: false });
            if (data) {
              all = data as IMusicData[];
              set({ allSongs: all });
            }
          }
          const filtered =
            category === "Total"
              ? all
              : all.filter((m) =>
                  m.playlists.includes(category as TPlaylistKey),
                );
          set({ playMusics: filtered, playlistCategory: category, viewCategory: category });
        },

        setVolume: (volume: number) => set({ volume }),
        setCurrentIndex: (currentIndex: number) => set({ currentIndex }),
        setIsShuffleOn: (isShuffleOn: boolean) => set({ isShuffleOn }),
      }),
    ),
    {
      name: "cmworld-music",
      partialize: (state) => ({
        volume: state.volume,
        playlistCategory: state.playlistCategory,
        currentIndex: state.currentIndex,
        isShuffleOn: state.isShuffleOn,
      }),
    },
  ),
);
