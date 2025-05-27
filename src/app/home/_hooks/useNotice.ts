"use client";

import { useUrlParam } from "@/hooks/useUrlParam";
import { noticeList } from "../_data";

export const useNotice = () => {
  // 범용 URL 파라미터 훅 사용
  const [noticeId, setNoticeId] = useUrlParam<number>("notice", 0);

  const selectedNotice =
    noticeList.find((notice) => notice.id === noticeId) || noticeList[0];

  return {
    noticeId,
    setNotice: setNoticeId,
    selectedNotice,
  };
};
