// src/app/profile/_data/profileData.ts

export type TProfileItem = {
  icon?: string;
  iconUrl?: string;
  title: string;
  subtitle?: string;
  description?: string;
  period?: string;
};

// 프로필 섹션별 데이터 구조
export interface ProfileSection {
  itemTitle: string;
  type: string;
  items: TProfileItem[]; // 섹션 내 아이템들
}

// 통합된 프로필 데이터
export const profileData: ProfileSection[] = [
  {
    itemTitle: "Skills",
    type: "icon",
    items: [
      {
        title: "React.js",
        iconUrl:
          "https://img.icons8.com/external-tal-revivo-color-tal-revivo/144/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
      },
      {
        title: "Nextjs",
        iconUrl: "https://img.icons8.com/color/144/nextjs.png",
      },
      {
        title: "Node.js",
        iconUrl: "https://img.icons8.com/color/144/nodejs.png",
      },
      {
        title: "Nest.js",
        iconUrl: "https://img.icons8.com/color/144/nestjs.png",
      },
      {
        title: "PostgreSQL",
        iconUrl: "https://img.icons8.com/color/144/postgreesql.png",
      },
      // {
      //   title: "MySQL",
      //   iconUrl: "https://img.icons8.com/color/144/mysql-logo.png",
      // },
      // {
      //   title: "ORACLE",
      //   iconUrl: "https://img.icons8.com/color/144/oracle-logo.png",
      // },
      // {
      //   title: "Firebase",
      //   iconUrl: "https://img.icons8.com/color/144/firebase.png",
      // },
      {
        title: "AWS",
        iconUrl: "https://img.icons8.com/color/144/amazon-web-services.png",
      },
      {
        title: "Github",
        iconUrl: "https://img.icons8.com/ios-glyphs/120/github.png",
      },
    ],
  },
  // -----
  {
    itemTitle: "Work",
    type: "text",
    items: [
      {
        title: "블루밍하트",
        description: "인턴 (광주 일경험 드림)",
        period: "2025.03 ~",
      },
    ],
  },
  // -----
  {
    itemTitle: "Certification",
    type: "icon",
    items: [
      {
        title: "AI-900",
        subtitle: "2023-11",
        icon: "AI-900",
      },
      {
        title: "SQLD",
        subtitle: "2023-10",
        icon: "SQLD",
      },
    ],
  },
  // -----
  {
    itemTitle: "Education",
    type: "text",
    items: [
      {
        title: "광주 인공지능사관학교",
        description: "4기 / App반",
        period: "2023.03 ~ 2023.12",
      },
      {
        title: "조선대학교",
        description: "전자공학과 4.09/4.5",
        period: "2007.03 ~ 2013.02",
      },
    ],
  },
];
