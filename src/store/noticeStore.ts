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
        const notice = noticeList.find((notice) => notice.id === id);

        set({
          noticeId: id,
          selectedContent: notice ? notice.content : null,
        });

        updateUrlParam("notice", id);
      },

      initFromUrl: () => {
        const id = getUrlParam("notice", 0);

        if (id !== 0) {
          const notice = noticeList.find((notice) => notice.id === id);

          set({
            noticeId: id,
            selectedContent: notice ? notice.content : null,
          });
        }
      },
    })
  )
);
