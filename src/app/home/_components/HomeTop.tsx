"use client";

import { useEffect } from "react";
import { noticeList } from "../_data";
import { useNoticeStore } from "@/store/noticeStore";

export const HomeTop = () => {
  const { noticeId, setNotice, initFromUrl } = useNoticeStore();

  // 컴포넌트 마운트 시 URL에서 상태 초기화
  useEffect(() => {
    initFromUrl();
  }, [initFromUrl]);

  return (
    <div className="h-full">
      <div className="h-[15%] text-2xl ml-3 flex items-center">공지사항</div>
      <div className="h-[85%] flex flex-row">
        {/* 공지사항 */}
        <div className="w-[60%] h-full common-border">
          {noticeList
            .slice()
            .reverse()
            .map((notice, index) => (
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

        {/* 게시물 숫자 */}
        <div className="w-[35%]">{}</div>
      </div>
    </div>
  );
};
