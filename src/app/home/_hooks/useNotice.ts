"use client";

import { useState, useEffect, useCallback } from "react";
import { noticeList } from "../_data";

export const useNotice = () => {
  // URL에서 공지사항 ID 가져오기
  const getNoticeIdFromUrl = useCallback(() => {
    if (typeof window === "undefined") return 0;

    const searchParams = new URLSearchParams(window.location.search);
    const noticeParam = searchParams.get("notice");
    return noticeParam ? parseInt(noticeParam) : 0;
  }, []);

  // 현재 선택된 공지사항 ID 상태
  const [noticeId, setNoticeId] = useState(getNoticeIdFromUrl());

  // URL 변경 감지
  useEffect(() => {
    const handleUrlChange = () => {
      setNoticeId(getNoticeIdFromUrl());
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [getNoticeIdFromUrl]);

  // 공지사항 선택 함수 - URL 파라미터 업데이트
  const setNotice = useCallback((id: number) => {
    setNoticeId(id);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("notice", id.toString());

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, []);

  const selectedNotice =
    noticeList.find((notice) => notice.id === noticeId) || noticeList[0];

  return {
    noticeId,
    setNotice,
    selectedNotice,
  };
};
