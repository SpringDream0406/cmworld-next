"use client";

import { useProjectStore } from "@/store";
import { projectData } from "@/app/project/_data";
import { ScSelect, TSelectOption } from "@/components/shadcn/ScSelect";
import { openUrl } from "@/utils";

export default function ProjectPage() {
  const { selectedTag } = useProjectStore();
  const filteredProjects =
    selectedTag === "Total"
      ? projectData
      : projectData.filter((project) => project.tags.includes(selectedTag));

  //
  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        프로젝트 목록 ({filteredProjects.length}개)
      </h2>

      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="text-sm mb-2">
              <span className="text-navy mr-4">{project.where}</span>
              <span className="text-gray-400">{project.when}</span>
            </div>
            <p className="text-gray-700 font-semibold mb-3">{project.sub}</p>

            {/* 설명 리스트 */}
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              {project.exp.map((exp, expIndex) => (
                <li key={expIndex}>• {renderTextWithStrikethrough(exp)}</li>
              ))}
            </ul>

            {/* 사이트 링크들 */}
            {project.site.selectOptions.length > 0 && (
              <div className="mt-3">
                <ScSelect
                  options={project.site.selectOptions.map(
                    (option): TSelectOption => ({
                      label: option.name,
                      value: option.url,
                    })
                  )}
                  placeholder="관련 사이트"
                  onChange={(url) => openUrl(url)}
                  className="w-full max-w-xs"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 텍스트 렌더링 함수
const renderTextWithStrikethrough = (text: string) => {
  // ~~텍스트~~ 패턴을 찾아서 <del> 태그로 변환
  const parts = text.split(/(~~[^~]+~~)/g);

  return parts.map((part, index) => {
    if (part.startsWith("~~") && part.endsWith("~~")) {
      // ~~ 제거하고 취소선 스타일 적용
      const strikethroughText = part.slice(2, -2);
      return (
        <del key={index} className="text-gray-400">
          {strikethroughText}
        </del>
      );
    }
    return part;
  });
};
