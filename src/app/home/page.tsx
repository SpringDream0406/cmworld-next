"use client";

import React from "react";
import { HomeTop } from "./_components";
import { useNotice } from "./_hooks/useNotice";
import { noticeList } from "./_data";

export default function HomePage() {
  // 커스텀 훅에서 noticeId 가져오기
  const { noticeId, setNotice } = useNotice();

  // 해당 ID에 맞는 공지사항 찾기
  const selectedNotice =
    noticeList.find((notice) => notice.id === noticeId) || noticeList[0];

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
