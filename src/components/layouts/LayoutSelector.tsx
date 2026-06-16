"use client";
import { isMobile } from "@/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { BackgroundLayout } from "./BackgroundLayout";
import { ClientLayout } from "./ClientLayout";
import MusicPlayer from "../musicPlayer/MusicPlayer";

export const LayoutSelector = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (isMobile() || pathname === "/musicplayer") return <div className="w-screen h-screen"><MusicPlayer /></div>;

  return (
    <BackgroundLayout>
      <ClientLayout>{children}</ClientLayout>
    </BackgroundLayout>
  );
};
