"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { noticeList } from "../_data";

export const useNotice = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 공지사항 ID 가져오기
  const getNoticeIdFromUrl = useCallback(() => {
    const noticeParam = searchParams.get("notice");
    return noticeParam ? parseInt(noticeParam) : 0;
  }, [searchParams]);

  // 현재 선택된 공지사항 ID 상태
  const [noticeId, setNoticeId] = useState(getNoticeIdFromUrl());

  // searchParams가 변경될 때마다 noticeId 업데이트
  useEffect(() => {
    setNoticeId(getNoticeIdFromUrl());
  }, [searchParams, getNoticeIdFromUrl]);

  // 공지사항 선택 함수 - URL 파라미터 업데이트
  const setNotice = useCallback(
    (id: number) => {
      // 현재 URL 쿼리 파라미터 가져오기
      const params = new URLSearchParams(searchParams.toString());

      // notice 파라미터 업데이트
      params.set("notice", id.toString());

      // 새 URL로 이동 (현재 경로 유지, 쿼리 파라미터만 변경)
      router.push(`?${params.toString()}`);

      // 상태 업데이트
      setNoticeId(id);
    },
    [searchParams, router]
  );

  const selectedNotice =
    noticeList.find((notice) => notice.id === noticeId) || noticeList[0];

  return {
    noticeId,
    setNotice,
    selectedNotice,
  };
};
