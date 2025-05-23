import { ReactNode } from "react";
import {
  Notice0Welcome,
  Notice1UpdateInfo,
  Notice2Guestbook,
  Notice3AboutMusic,
} from "../_components/notice";

type Notice = {
  id: number;
  title: string;
  content: ReactNode;
  lastUpdate: string;
};

export const noticeList: Notice[] = [
  {
    id: 3,
    title: "음악에 대하여",
    content: <Notice3AboutMusic />,
    lastUpdate: "2024-05-25",
  },
  {
    id: 2,
    title: "데이터에 관하여",
    content: <Notice2Guestbook />,
    lastUpdate: "2024-05-24",
  },
  {
    id: 1,
    title: "업데이트 정보",
    content: <Notice1UpdateInfo />,
    lastUpdate: "2024-08-26",
  },
  {
    id: 0,
    title: "환영합니다.",
    content: <Notice0Welcome />,
    lastUpdate: "2024-05-24",
  },
];
