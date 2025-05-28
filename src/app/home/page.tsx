"use client";

import React from "react";
import { HomeTop } from "./_components";
import { useNoticeStore } from "@/store/noticeStore";
import { NotFound } from "@/components/common";

export default function HomePage() {
  const selectedContent = useNoticeStore((state) => state.selectedContent);

  return (
    <div className="w-full h-full p-1">
      <div className="h-[25%]">
        <HomeTop />
      </div>
      <div className="h-[5%]"></div>
      <div className="h-[70%] common-border p-2 overflow-auto">
        {selectedContent || <NotFound />}
      </div>
    </div>
  );
}
