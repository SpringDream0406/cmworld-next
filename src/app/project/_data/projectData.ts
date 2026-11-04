// 프로젝트 데이터 타입 정의
export interface IProjectData {
  title: string;
  where: string;
  when: string;
  sub: string;
  exp: string[];
  site: {
    selectOptions: {
      name: string;
      url: string;
    }[];
  };
  tags: string[];
}

// 프로젝트 태그 레이블
export const projectTags = {
  total: "Total",
  business: "Business",
  team: "Team",
  personal: "Personal",
  y2026: "2026",
  y2025: "2025",
  y2024: "2024",
  y2023: "2023",
} as const;

// 프로젝트 데이터
export const projectData: IProjectData[] = [
  {
    title: "CMWorld (Next.js)",
    where: "개인 프로젝트",
    when: "2026.06 ~ 진행 중",
    sub: "CMWorld 포트폴리오 사이트 Next.js 리팩토링",
    exp: [
      "React + Firebase 기반의 기존 CMWorld를 Next.js + Supabase로 전면 리팩토링.",
      "Firebase 방명록 → Supabase PostgreSQL 마이그레이션, Google OAuth 인증 연동.",
      "Zustand persist로 뮤직 플레이어 상태 영속화, Web Audio API 기반 모바일 재생 처리.",
      "Vercel 배포, 배경 설정·관리자 페이지(곡 관리) 등 신규 기능 추가.",
    ],
    site: {
      selectOptions: [
        {
          name: "사이트",
          url: "https://cmworld.springdream.kr",
        },
        {
          name: "GitHub",
          url: "https://github.com/SpringDream0406/cmworld-next",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.y2026],
  },
  {
    title: "Kidsnity",
    where: "JKLink",
    when: "2026.05 ~ 2026.07",
    sub: "유아동 교구 전문 쇼핑몰 풀스택 개발",
    exp: [
      "NestJS + TypeORM 기반 REST API 서버 구축 및 React + Vite + Tailwind CSS 프론트엔드 개발.",
      "상품 관리 (카테고리, 옵션, 재고, 추천 상품, 품절 처리) 구현.",
      "장바구니, 바로구매, 무통장 입금 주문 플로우 구현.",
      "관리자 페이지 (상품/주문/회원/배너/공지 관리) 개발.",
      "AWS EC2 + RDS + S3 인프라 구성, Docker Compose 배포, GitHub Actions CI/CD 파이프라인 구축.",
    ],
    site: {
      selectOptions: [
        {
          name: "키즈니티",
          url: "https://www.kidsnity.com/",
        },
      ],
    },
    tags: [projectTags.business, projectTags.y2026],
  },
  {
    title: "GoingTogether",
    where: "JKLink",
    when: "2025.01 ~ 2026.07",
    sub: "체험 활동 예약·결제 O2O 플랫폼",
    exp: [
      "호스트가 체험 활동을 등록하고 사용자가 예약·결제할 수 있는 O2O 플랫폼.",
      "React Native(Expo) 기반 iOS/Android 크로스플랫폼 앱 개발.",
      "토스페이먼츠 카드·가상계좌 결제 연동 및 카카오 알림톡 자동 발송 구현.",
      "Cron 기반 가상계좌 만료 자동 취소, 체험 완료 처리 등 자동화 구현.",
      "Docker + GitHub Actions 기반 EC2 자동 배포 CI/CD 파이프라인 구축.",
      "주요 기능: 체험 검색/찜, 예약/결제, 리뷰, 내 주변 체험(지도), 알림, 마이페이지, 호스트 관리 페이지",
    ],
    site: {
      selectOptions: [
        {
          name: "고잉투게더 호스트 페이지",
          url: "https://host.going-together.co.kr",
        },
        {
          name: "플레이스토어",
          url: "https://play.google.com/store/apps/details?id=com.goingtogether.jklink&hl=ko",
        },
        {
          name: "앱스토어",
          url: "https://apps.apple.com/kr/app/%EA%B3%A0%EC%9E%89%ED%88%AC%EA%B2%8C%EB%8D%94/id6746176536?l=en-GB",
        },
        // {
        //   name: "개발일지 (tistory)",
        //   url: "https://springdream0406.tistory.com/category/Projects/GoingTogether",
        // },
      ],
    },
    tags: [projectTags.business, projectTags.y2025],
  },
  {
    title: "팜팜 서버 교체2",
    where: "개인 프로젝트",
    when: "2024.04 ~ 2024.05 (약 2주)",
    sub: "Express.js로 만들어진 서버를 Nest.js로 교체",
    exp: [
      "Nest.js를 공부하면서 Express.js로 구성된 Router를 Nest.js로 변경했습니다.",
      "TypeScript를 사용하여 안전성을 높였습니다.",
      "TypeORM을 사용하여 DB를 구현하고 쿼리를 처리했습니다.",
      "인증용 Auth 테이블을 만들고 실제 데이터에 맞게 DB를 조금 더 구체화했습니다.",
      "바뀐 DB 테이블과 데이터에 맞게 ERD를 새로 작성했습니다.",
      "Validation을 사용하여 제약 조건을 설정했습니다.",
      "Swagger를 작성하여 API에 대한 설명과 테스트를 해볼 수 있도록 하였습니다.",
      "AWS에 데모사이트를 배포하여 팜팜을 체험해 볼 수 있도록 하였습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "데모 사이트",
          url: "https://farmfarm.springdream.kr/",
        },
        {
          name: "Swagger",
          url: "https://springdream0406.myqnapcloud.com:3001/api",
        },
        {
          name: "ERD (Nest.js)",
          url: "https://www.erdcloud.com/d/qezCTMmk7pf4SE4TQ",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.y2024],
  },
  {
    title: "CMWorld",
    where: "개인 프로젝트",
    when: "2024.03 ~ 2024.12 (Beta 완성 - 약 2주)",
    sub: "싸이월드를 모티브로 포트폴리오 사이트 제작",
    exp: [
      "이전에 만들어본 포트폴리오의 결과가 만족스럽지 않아 저의 취향을 반영한 포트폴리오를 다시 만들게 되었습니다.",
      "React-Player를 사용하여 BGM을 구현했습니다.",
      "Firebase를 사용하여 방명록 페이지의 데이터를 처리했습니다.",
      "Redux를 사용하여 Component간의 데이터 전달을 처리했습니다.",
      "고정 페이지는 정적 Router로, 늘어나는 Component는 동적 Router로 처리했습니다.",
      "~~AWS의 S3와 CloudFront를 이용하여 배포하고, Route53를 사용하여 도메인을 호스팅했습니다.~~",
      "고정 지출을 줄이고 간편한 CI/CD를 사용하고자, 배포와 호스팅을 AWS에서 Netlify로 변경했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/CMWorld",
        },
        {
          name: "개발일지 (tistory)",
          url: "https://springdream0406.tistory.com/category/Projects/%08CMWorld",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.y2024],
  },
  {
    title: "Noona-Music",
    where: "코딩알려주는누나 JS 그룹 스터디",
    when: "2024.02 ~ 2024.03 (1주)",
    sub: "음악 검색 사이트 제작",
    exp: [
      "협업 경험과 JS의 기초를 다지기 위해 스터디 그룹에 참여하여 팀프로젝트를 진행했습니다.",
      "당시 공부중이던 모듈화를 활용해서 코드의 중복을 줄이기 위해 노력했습니다.",
      "~~프로젝트 후, API KEY를 숨기기 위해 Express.js를 사용하여 간단한 중간 서버를 만들었습니다.~~",
      "~~프로젝트 후, API KEY를 숨기기 위해 netlify-functions를 사용했습니다.~~",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/Noona-Music",
        },
      ],
    },
    tags: [projectTags.team, projectTags.y2024],
  },
  {
    title: "KEKEKE",
    where: "광주 인공지능사관학교",
    when: "2023.11 ~ 2023.12 (1개월)",
    sub: "AI 추천 드로잉 기술을 이용한 주문 케이크 플랫폼",
    exp: [
      "옆 팀이 서버 관련 어려움을 겪고 있어 도움 역할로 참여했습니다.",
      "Express 서버의 초기 설정, 구매자와 판매자의 회원가입과 로그인 관련 API, 케이크 둘러보기 페이지 API 구축을 담당했습니다.",
      "작업한 코드들에 주석을 달아 이후 담당자가 작업하는데 참고 할 수 있게 했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/-GAI-kekeke",
        },
        {
          name: "시연 영상 (Youtube)",
          url: "https://youtu.be/A5MbFHJaqCA?si=2Qr1wjDJL3knaBpe",
        },
      ],
    },
    tags: [projectTags.team, projectTags.y2023],
  },
  {
    title: "Seb's Music",
    where: "광주 인공지능사관학교",
    when: "2023.11 ~ 2023.12 (1개월)",
    sub: "AI기반 음악 추천 스트리밍 서비스",
    exp: ["서버와 DB 역할로 참여했습니다."],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/-GAI-Appsolute",
        },
        {
          name: "시연 영상 (Youtube)",
          url: "https://youtu.be/A3frdYgd-ho?si=EyyWxYKxZKZpHRYj",
        },
      ],
    },
    tags: [projectTags.team, projectTags.y2023],
  },
  {
    title: "팜팜 서버 교체",
    where: "개인 프로젝트",
    when: "2023.10 ~ 2023.11 (1개월)",
    sub: "Flask로 만들어진 서버를 Express.js로 교체",
    exp: [
      "py파일 한개로만 짰던 Flask 서버를 Node 수업에서 배운 Router를 활용하여 기능별로 분리했습니다.",
      "Express.js로 다시 짜면서 ChatGPT와 인터넷을 따라 만들었던 코드를 다시 이해해볼 수 있었습니다.",
      "ERD를 작성하여 테이블 구조에 대하여 쉽게 알아볼 수 있도록 했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "ERD (Express.js)",
          url: "https://www.erdcloud.com/d/4FpqQg6NLnfDBboQv",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.y2023],
  },
  {
    title: "팜팜",
    where: "광주 인공지능사관학교",
    when: "2023.07 ~ 2023.08 (1개월)",
    sub: "도심농부를 위한 텃밭 분양 플랫폼",
    exp: [
      "서버와 DB를 배우지 않은 상태로, ChatGPT와 인터넷 검색을 활용하여 Flask서버와 Oracle DB를 구축하고 관리했습니다.",
      "KAMIS와 농업날씨365 사이트의 기간별 데이터를 활용하여 농산물 가격 예측 모델을 개발했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "프로젝트 설명 (Notion)",
          url: "https://hellosori.notion.site/4dd1ce5f2f684bf9adf2cb49d631c81b",
        },
        {
          name: "핵심기능 시연 영상 (Youtube)",
          url: "https://youtu.be/2ZGiNXSUUps?si=R4VWkc9IfYvczpei",
        },
        {
          name: "전체페이지 시연 영상 (Youtube)",
          url: "https://youtu.be/HNtmMcy6rKk?si=erTCpHPdIUcxasrC",
        },
      ],
    },
    tags: [projectTags.team, projectTags.y2023],
  },
];
