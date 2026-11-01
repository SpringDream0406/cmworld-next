"use client";

import { useSettingStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

const WEATHER_TO_BG: Record<string, string> = {
  Clear: "Clear",
  Clouds: "Clouds",
  Rain: "Rain",
  Drizzle: "Rain",
  Thunderstorm: "Thunderstorm",
  Snow: "Snow",
  Mist: "Mist",
  Smoke: "Mist",
  Haze: "Mist",
  Dust: "Mist",
  Fog: "Mist",
  Sand: "Mist",
  Ash: "Mist",
  Squall: "Rain",
  Tornado: "Thunderstorm",
};

export const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  const { background } = useSettingStore();

  const [weatherBg, setWeatherBg] = useState<string>("Clear");

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        const bg = WEATHER_TO_BG[data.weatherMain];
        if (bg) setWeatherBg(bg);
      })
      .catch(() => {});
  }, []);

  const activeBg = background === "Auto" ? weatherBg : background;

  //
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url("/images/backgrounds/${activeBg || "Basic"}.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      {children}
    </div>
  );
};
