// 프로젝트 데이터 타입 정의
export interface ProjectData {
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
  tags: string[]; // category -> tags로 변경
}

// 프로젝트 태그 레이블
export const projectTags = {
  total: "Total",
  team: "Team",
  personal: "Personal",
  p2025: "2025",
  p2024: "2024",
  p2023: "2023",
} as const;

// 프로젝트 데이터
export const projectData: ProjectData[] = [
  {
    title: "GoingTogether",
    where: "팀 프로젝트",
    when: "2025.01 ~ 진행 중",
    sub: "체험학습 연계 앱",
    exp: [
      "체험학습 연계 앱의 백앤드를 맡아, 서버, DB, 배포를 담당해서 개발 중입니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "개발일지 (tistory)",
          url: "https://springdream0406.tistory.com/category/Projects/GoingTogether",
        },
      ],
    },
    tags: [projectTags.team, projectTags.p2025], // projectTags 객체 사용
  },
  {
    title: "CMSPP (CM Solar Power Plant)",
    where: "개인 프로젝트",
    when: "2024.06 ~ 진행 중",
    sub: "태양광 발전 정보 저장/관리 사이트",
    exp: [
      "코딩에 관심을 두게 했던, 태양광 데이터 저장/관리를 위한 사이트를 제작 중입니다.",
      "회원가입/로그인의 간편화와 보안을 위해 소셜로그인 기능을 사용했습니다.",
      "보안을 위해 refeshToken과 accessToken 기능을 사용했습니다.",
      "Netlify와 AWS를 활용해 배포를 진행했습니다.",
      "CI/CD 자동화를 위해 Github Action를 사용했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "사이트",
          url: "https://front.cmspp.kr/",
        },
        {
          name: "Github [Back]",
          url: "https://github.com/SpringDream0406/CMSPP.Back",
        },
        {
          name: "Github [Front]",
          url: "https://github.com/SpringDream0406/CMSPP.Front",
        },
        {
          name: "개발일지 (tistory)",
          url: "https://springdream0406.tistory.com/category/Projects/CMSPP%28CM%20Solar%20Power%20Plant%29",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.p2024],
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
          url: "http://farmfarm-front.s3-website.ap-northeast-2.amazonaws.com/",
        },
        {
          name: "ERD (Nest.js)",
          url: "https://www.erdcloud.com/d/qezCTMmk7pf4SE4TQ",
        },
        {
          name: "Swagger",
          url: "http://43.201.93.123/api",
        },
      ],
    },
    tags: [projectTags.personal, projectTags.p2024],
  },
  {
    title: "CMWorld",
    where: "개인 프로젝트",
    when: "2024.03 ~ 진행 중 (Beta 완성 - 약 2주)",
    sub: "싸이월드를 모티브로 포트폴리오 사이트 제작",
    exp: [
      "이전에 만들어본 포트폴리오의 결과가 만족스럽지 않아 저의 취향을 반영한 포트폴리오를 다시 만들게 되었습니다.",
      "React-Player를 사용하여 BGM을 구현했습니다.",
      "Firebase를 사용하여 방명록 페이지의 데이터를 처리했습니다.",
      "Redux를 사용하여 Component간의 데이터 전달을 처리했습니다.",
      "고정 페이지는 정적 Router로, 늘어나는 Component는 동적 Router로 처리했습니다.",
      "(변경됨) AWS의 S3와 CloudFront를 이용하여 배포하고, Route53를 사용하여 도메인을 호스팅했습니다.",
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
    tags: [projectTags.personal, projectTags.p2024],
  },
  {
    title: "Noona-Music",
    where: "코딩알려주는누나 JS 그룹 스터디",
    when: "2024.02 ~ 2024.03 (1주)",
    sub: "음악 검색 사이트 제작",
    exp: [
      "협업 경험과 JS의 기초를 다지기 위해 스터디 그룹에 참여하여 팀프로젝트를 진행했습니다.",
      "당시 공부중이던 모듈화를 활용해서 코드의 중복을 줄이기 위해 노력했습니다.",
      "(변경됨) 프로젝트 후, API KEY를 숨기기 위해 Express.js를 사용하여 간단한 중간 서버를 만들었습니다.",
      "프로젝트 후, API KEY를 숨기기 위해 netlify-functions를 사용했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Github",
          url: "https://github.com/SpringDream0406/Noona-Music",
        },
      ],
    },
    tags: [projectTags.team, projectTags.p2024],
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
          name: "시연 연상 (Youtube)",
          url: "https://youtu.be/A5MbFHJaqCA?si=2Qr1wjDJL3knaBpe",
        },
      ],
    },
    tags: [projectTags.team, projectTags.p2023],
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
    tags: [projectTags.team, projectTags.p2023],
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
    tags: [projectTags.personal, projectTags.p2023],
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
    tags: [projectTags.team, projectTags.p2023],
  },
];

// 간단한 필터링 함수 (category -> tags로 변경)
export const filterProjects = (
  projects: ProjectData[],
  selectedTag: string
): ProjectData[] => {
  if (selectedTag === projectTags.total) {
    return projects;
  }

  return projects.filter((project) => project.tags.includes(selectedTag));
};
