"use client";

import { useEffect } from "react";
import { useMusicStore } from "@/store";
import { playlists, TPlaylistKey } from "@/data/musicData";
import { Button } from "@/components/ui/button";

export const JukeboxLeftContent = () => {
  const { allSongs, viewCategory, setViewCategory, initSongs } = useMusicStore();

  useEffect(() => {
    initSongs().then(() => {
      const { playMusics, playlistCategory, selectPlaylist } =
        useMusicStore.getState();
      const { viewCategory, setViewCategory } = useMusicStore.getState();
      if (!viewCategory) {
        setViewCategory("Total");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCount = (key: string) =>
    key === "Total"
      ? allSongs.length
      : allSongs.filter((m) => m.playlists.includes(key as TPlaylistKey)).length;

  return (
    <div className="w-full h-full p-2">
      <div className="space-y-1">
        {Object.entries(playlists).map(([key, label]) => {
          const count = getCount(key);
          const isSelected = viewCategory === key;

          return (
            <Button
              key={key}
              onClick={() => setViewCategory(key)}
              variant="ghost"
              className={`w-full px-3 py-1.5 text-left rounded-lg transition-colors justify-between ${
                isSelected
                  ? "bg-basic text-white hover:bg-basic"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span className="text-sm truncate">{label}</span>
              <span className="text-xs opacity-70 ml-1 shrink-0">{count}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
