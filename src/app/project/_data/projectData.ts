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
}

// 프로젝트 태그 레이블
export const projectTags = {
  total: "전체",
  team: "팀 프로젝트",
  personal: "개인 프로젝트",
  "2025": "2025",
  "2024": "2024",
  "2023": "2023",
  ongoing: "진행 중",
  completed: "완료됨",
} as const;

// 프로젝트 데이터 (category 필드 제거)
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
  },
  // ...나머지 프로젝트들도 동일하게 category 필드만 제거
];

// 자동 태그 생성 유틸리티 함수들
export const getProjectYear = (when: string): string => {
  const yearMatch = when.match(/(\d{4})/);
  return yearMatch ? yearMatch[1] : "";
};

export const getProjectType = (where: string): "team" | "personal" => {
  return where.includes("팀") ? "team" : "personal";
};

export const getProjectStatus = (when: string): "ongoing" | "completed" => {
  return when.includes("진행 중") ? "ongoing" : "completed";
};

// 프로젝트에서 모든 태그를 자동 생성하는 함수
export const getProjectTags = (project: ProjectData) => {
  return {
    year: getProjectYear(project.when),
    type: getProjectType(project.where),
    status: getProjectStatus(project.when),
  };
};

// 필터링 함수
export const filterProjects = (
  projects: ProjectData[],
  selectedTag: string
): ProjectData[] => {
  if (selectedTag === "total") {
    return projects;
  }

  return projects.filter((project) => {
    const tags = getProjectTags(project);

    return (
      tags.year === selectedTag ||
      tags.type === selectedTag ||
      tags.status === selectedTag
    );
  });
};
