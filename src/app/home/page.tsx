"use client";

import React from "react";
import { HomeTop } from "./_components";
import { useNoticeStore } from "@/store";
import { NotFound } from "@/components/common";
import { noticeList } from "./_data";

export default function HomePage() {
  const noticeId = useNoticeStore((state) => state.noticeId);
  const selectedNotice = noticeList.find((notice) => notice.id === noticeId);

  return (
    <div className="w-full h-full p-1">
      <div className="h-[25%]">
        <HomeTop />
      </div>
      <div className="h-[5%]"></div>
      <div className="h-[70%] common-border p-2 overflow-auto">
        {selectedNotice?.content || <NotFound />}
      </div>
    </div>
  );
}
