"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { noticeList } from "../_data";

export const useNotice = () => {
  // URL에서 공지사항 ID 가져오기
  const searchParams = useSearchParams();
  const router = useRouter();
  const noticeId = searchParams.get("notice");

  // 현재 선택된 공지사항 상태
  const [selectedNotice, setSelectedNotice] = useState(
    noticeId
      ? noticeList.find((notice) => notice.id === Number(noticeId)) ||
          noticeList[0]
      : noticeList[0]
  );

  // URL 파라미터가 변경되면 선택된 공지사항 업데이트
  useEffect(() => {
    if (noticeId) {
      const notice = noticeList.find(
        (notice) => notice.id === Number(noticeId)
      );
      if (notice) {
        setSelectedNotice(notice);
      }
    } else {
      // 기본값: 첫 번째 공지사항
      setSelectedNotice(noticeList[0]);
    }
  }, [noticeId]);

  // 공지사항 선택 함수
  const setSelectNotice = (id: number) => {
    // URL 파라미터 업데이트 (페이지 새로고침 없음)
    const params = new URLSearchParams(searchParams.toString());
    params.set("notice", id.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    notices: noticeList,
    selectedNotice,
    setSelectNotice,
  };
};
