"use client";

import { useWeatherStore } from "@/store/weatherStore";
import { ReactNode } from "react";

export const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  const weather = useWeatherStore((state) => state.weather);

  //
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url("/images/backgrounds/${weather}.webp")`,
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
