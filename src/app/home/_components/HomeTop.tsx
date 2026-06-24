"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { noticeList } from "../_data";
import { useNoticeStore } from "@/store/noticeStore";
import { supabase } from "@/lib/supabase";
import { projectData } from "@/app/project/_data";

const playgroundCount = 3;

export const HomeTop = () => {
  const { noticeId, setNotice, initFromUrl } = useNoticeStore();
  const [songCount, setSongCount] = useState<number | null>(null);
  const [guestbookCount, setGuestbookCount] = useState<number | null>(null);

  useEffect(() => {
    initFromUrl();
    supabase
      .from("songs")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .then(({ count }) => setSongCount(count));
    supabase
      .from("guestbook")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setGuestbookCount(count));
  }, [initFromUrl]);

  const summaryItems = [
    { label: "공지사항", count: noticeList.length, href: "/home" },
    { label: "프로젝트", count: projectData.length, href: "/project" },
    { label: "쥬크박스", count: songCount, href: "/jukebox" },
    { label: "놀이터", count: playgroundCount, href: "/playground" },
    { label: "방명록", count: guestbookCount, href: "/guestbook" },
    null,
  ];

  return (
    <div className="h-full">
      <div className="h-[15%] text-2xl ml-3 flex items-center">공지사항</div>
      <div className="h-[85%] flex flex-row">
        {/* 공지사항 */}
        <div className="w-[60%] h-full common-border">
          {noticeList.map((notice, index) => (
            <div
              key={index}
              className="w-full h-[15%] flex justify-between p-3 cursor-pointer hover:underline"
              onClick={() => setNotice(notice.id)}
            >
              <div
                className={`w-[70%] ${
                  noticeId === notice.id ? "text-basic" : ""
                }`}
              >
                {notice.title}
              </div>
              <div className="w-[30%] text-right text-gray-500">
                {notice.lastUpdate}
              </div>
            </div>
          ))}
        </div>
        <div className="w-[5%]"></div>

        {/* 게시물 숫자 대시보드 */}
        <div className="w-[35%] h-full common-border grid grid-cols-2 grid-rows-3 p-0 overflow-hidden">
          {summaryItems.map((item, i) =>
            item ? (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-4 hover:bg-basic/10 transition-colors border-gray-200 ${i < 4 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""}`}
              >
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-lg font-bold text-basic">
                  {item.count ?? ".."}
                </span>
              </Link>
            ) : (
              <div key={i} className="border-gray-200" />
            )
          )}
        </div>
      </div>
    </div>
  );
};
