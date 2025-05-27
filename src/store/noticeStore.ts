// src/store/noticeStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { combine } from "zustand/middleware";

// 검색 파라미터에 상태 저장을 위한 커스텀 스토리지
const searchParamsStorage = {
  getItem: (_key: string): string => {
    // 브라우저 환경에서만 실행
    if (typeof window === "undefined") return JSON.stringify({ noticeId: 0 });

    const searchParams = new URLSearchParams(window.location.search);
    const noticeParam = searchParams.get("notice");

    // URL에서 notice 파라미터 값을 가져와 반환
    return JSON.stringify({
      state: {
        noticeId: noticeParam ? parseInt(noticeParam) : 0,
      },
    });
  },

  setItem: (key: string, newValue: string): void => {
    // 브라우저 환경에서만 실행
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const parsed = JSON.parse(newValue);

    // state 객체 내에서 noticeId를 찾아 URL 파라미터로 설정
    if (parsed.state && parsed.state.noticeId !== undefined) {
      searchParams.set("notice", parsed.state.noticeId.toString());
    }

    // URL 업데이트 (페이지 새로고침 없음)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  },

  removeItem: (_key: string): void => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("notice");

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  },
};

// 공지사항 스토어 정의 (combine 사용)
export const useNoticeStore = create(
  persist(
    combine(
      {
        noticeId: 0, // 기본값: 첫 번째 공지사항
      },
      (set) => ({
        // 공지사항 선택 메서드
        setNotice: (id: number) => set({ noticeId: id }),
      })
    ),
    {
      name: "notice-storage",
      storage: createJSONStorage(() => searchParamsStorage),
    }
  )
);
