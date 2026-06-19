"use client";
import { isMobile } from "@/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { BackgroundLayout } from "./BackgroundLayout";
import { ClientLayout } from "./ClientLayout";
import MusicPlayer from "../musicPlayer/MusicPlayer";

export const LayoutSelector = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(isMobile());
  }, []);

  if (isMobileView || pathname === "/mp") return <div className="w-screen h-dvh overflow-hidden"><MusicPlayer /></div>;

  if (pathname.startsWith("/cm")) return <>{children}</>;

  return (
    <BackgroundLayout>
      <ClientLayout>{children}</ClientLayout>
    </BackgroundLayout>
  );
};
