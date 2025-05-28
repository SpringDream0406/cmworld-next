import { create } from "zustand";
import { combine } from "zustand/middleware";
import { noticeList } from "@/app/home/_data";
import { updateUrlParam, getUrlParam } from "@/utils";

export const useNoticeStore = create(
  combine(
    {
      noticeId: 0,
      selectedContent: noticeList[0].content,
    },
    (set) => ({
      setNotice: (id: number) => {
        const notice =
          noticeList.find((notice) => notice.id === id) || noticeList[0];

        set({
          noticeId: id,
          selectedContent: notice.content,
        });

        // URL 업데이트
        updateUrlParam("notice", id);
      },

      // URL에서 상태 초기화
      initFromUrl: () => {
        const id = getUrlParam("notice", 0);
        if (id !== 0) {
          const notice =
            noticeList.find((notice) => notice.id === id) || noticeList[0];

          set({
            noticeId: id,
            selectedContent: notice.content,
          });
        }
      },
    })
  )
);
