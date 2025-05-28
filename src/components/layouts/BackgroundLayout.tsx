"use client";

import { useSettingStore } from "@/store";
import { ReactNode } from "react";

export const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  const background = useSettingStore((state) => state.background);

  //
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url("/images/backgrounds/${
          background ? background : "Basic"
        }.webp")`,
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
