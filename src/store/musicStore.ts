import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useMusicStore = create(
  combine(
    {
      index: 0,
    },
    (set) => ({})
  )
);
