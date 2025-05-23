"use client";

import { useNotice } from "../_hooks/useNotice";

export const HomeTop = () => {
  const { notices, selectedNotice, setSelectNotice } = useNotice();

  return (
    <div className="h-full">
      <div className="h-[15%] text-2xl ml-3 flex items-center">공지사항</div>
      <div className="h-[85%] flex flex-row">
        {/* 공지사항 */}
        <div className="w-[60%] h-full common-border">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="w-full h-[15%] flex justify-between p-3 cursor-pointer hover:underline"
              onClick={() => setSelectNotice(notice.id)}
            >
              <div
                className={`w-[70%] ${
                  selectedNotice?.id === notice.id ? "text-basic" : ""
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
