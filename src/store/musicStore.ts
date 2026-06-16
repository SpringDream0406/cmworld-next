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
        volume: 70,
      },
      (set, get) => ({
        initSongs: async () => {
          if (get().allSongs.length > 0) return;
          const { data, error } = await supabase
            .from("songs")
            .select("url, artist, title, playlists");
          if (!error && data) {
            set({ allSongs: data as IMusicData[] });
          }
        },

        setPlayMusics: (musics: IMusicData[]) => set({ playMusics: musics }),

        selectPlaylist: async (category: string) => {
          let all = get().allSongs;
          if (all.length === 0) {
            const { data } = await supabase
              .from("songs")
              .select("url, artist, title, playlists");
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
          set({ playMusics: filtered, playlistCategory: category });
        },

        setVolume: (volume: number) => set({ volume }),
      }),
    ),
    {
      name: "cmworld-music",
      partialize: (state) => ({
        volume: state.volume,
        playlistCategory: state.playlistCategory,
      }),
    },
  ),
);
