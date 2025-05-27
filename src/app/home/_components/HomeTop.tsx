"use client";

import { useNoticeStore } from "@/store/noticeStore";
import { noticeList } from "../_data";

export const HomeTop = () => {
  const noticeId = useNoticeStore((state) => state.noticeId);
  const setNotice = useNoticeStore((state) => state.setNotice);

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

        {/* 게시물 */}
        <div className="w-[35%]">{}</div>
      </div>
    </div>
  );
};
