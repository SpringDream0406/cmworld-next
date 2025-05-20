// src/store/weatherStore.ts
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  weather: "Basic",
};

export const useWeatherStore = create(
  combine(initialState, (set) => ({
    setWeather: (weather: string) => set({ weather }),
  }))
);
