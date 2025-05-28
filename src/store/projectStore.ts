import { create } from "zustand";
import { combine } from "zustand/middleware";
import { updateUrlParam, getUrlParam } from "@/utils/urlParams";

// 태그 타입 정의
type TagType = "Total" | "Team" | "Personal" | "2025" | "2024" | "2023";

// 프로젝트 store
export const useProjectStore = create(
  combine(
    {
      selectedTag: "Total" as TagType,
    },
    (set) => ({
      // 필터 설정 (URL 동기화 포함)
      setTag: (filter: TagType) => {
        set({ selectedTag: filter });
        updateUrlParam("tag", filter);
      },

      // URL에서 초기 필터 값 읽기
      initFromUrl: () => {
        const tag = getUrlParam("tag", "Total");
        if (tag !== "Total") {
          set({ selectedTag: tag });
        }
      },
    })
  )
);
