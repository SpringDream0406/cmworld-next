// src/components/common/Navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 네비게이션 항목 정의
const tags = {
  home: "홈",
  profile: "프로필",
  project: "프로젝트",
  jukbox: "쥬크박스",
  playground: "놀이터",
  // photo: "사진첩", // 주석 처리된 항목
  guestbook: "방명록",
  // setting: "설정", // 주석 처리된 항목
};

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = "" }: NavigationProps) => {
  const pathname = usePathname();

  // 네비게이션 항목 렌더링
  const navigationBars = Object.entries(tags).map(([key, value]) => {
    const isActive =
      pathname === `/${key}` || (key === "home" && pathname === "/");

    return (
      <Link
        key={key}
        href={`/${key}`}
        className={`w-[65px] h-[50px] flex justify-center items-center p-0.5 rounded-r-lg border-black border-t border-b border-r 
                   ${isActive ? "bg-white text-black" : "bg-basic text-white"}`}
      >
        {value}
      </Link>
    );
  });

  // 본문
  return (
    <nav className={`flex flex-col gap-0.5 ${className}`}>{navigationBars}</nav>
  );
};

export default Navigation;
