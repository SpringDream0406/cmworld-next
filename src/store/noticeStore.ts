import { create } from "zustand";
import { combine } from "zustand/middleware";
import { updateUrlParam, getUrlParam } from "@/utils";

export const useNoticeStore = create(
  combine(
    {
      noticeId: 0,
    },
    (set) => ({
      setNotice: (id: number) => {
        set({ noticeId: id });
        updateUrlParam("notice", id);
      },

      initFromUrl: () => {
        const id = getUrlParam("notice", 0);
        if (id !== 0) {
          set({ noticeId: id });
        }
      },
    })
  )
);
