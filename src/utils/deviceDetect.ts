"use client";

// 사용자 기기가 모바일인지 확인하는 유틸리티 함수
export const isMobile = (): boolean => {
  // 서버 사이드 렌더링 중에는 window 객체가 없으므로 확인
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent;

  // 일반적인 모바일 기기의 user-agent 패턴을 검사
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};
