import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

// 초기 상태 정의
const initialState = {
  // 배경 설정 (기본값: 'Basic')
  background: "Clear",
  // 나중에 추가할 수 있는 다른 설정들
  // darkMode: false,
  // musicVolume: 0.7,
  // 등등...
};

// Zustand 스토어 생성 - persist 미들웨어로 로컬 스토리지에 저장
export const useSettingStore = create(
  persist(
    combine(initialState, (set) => ({
      // 배경 설정 변경
      setBackground: (background: string) => set({ background }),
      // 설정 초기화
      resetSettings: () => set(initialState),
    })),
    {
      name: "cmworld-settings",
    }
  )
);
