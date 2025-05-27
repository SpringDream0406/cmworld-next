"use client";

import React from "react";
import { HomeTop } from "./_components";
import { useNotice } from "./_hooks";

export default function HomePage() {
  const { noticeId, setNotice, selectedNotice } = useNotice();

  return (
    <div className="w-full h-full p-1">
      <div className="h-[25%]">
        <HomeTop noticeId={noticeId} setNotice={setNotice} />
      </div>
      <div className="h-[5%]"></div>
      <div className="h-[70%] common-border p-2 overflow-auto">
        {selectedNotice.content}
      </div>
    </div>
  );
}
