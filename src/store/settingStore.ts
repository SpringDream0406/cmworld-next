import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

// 초기 상태 정의
const initialState = {
  // 배경 설정 (기본값: 'Basic')
  background: "Clear",
  // 마지막으로 재생한 플레이리스트를 localStorage에 저장할지 여부
  savePlaylist: false,
};

// Zustand 스토어 생성 - persist 미들웨어로 로컬 스토리지에 저장
export const useSettingStore = create(
  persist(
    combine(initialState, (set) => ({
      // 배경 설정 변경
      setBackground: (background: string) => set({ background }),
      // 플레이리스트 저장 설정 변경
      setSavePlaylist: (savePlaylist: boolean) => set({ savePlaylist }),
      // 설정 초기화
      resetSettings: () => set(initialState),
    })),
    {
      name: "cmworld-settings",
    }
  )
);
