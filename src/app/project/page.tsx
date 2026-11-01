"use client";

import { useEffect, useRef } from "react";
import { useProjectStore } from "@/store";
import { projectData } from "@/app/project/_data";
import { ScSelect, TSelectOption } from "@/components/shadcn/ScSelect";
import { openUrl } from "@/utils";

export default function ProjectPage() {
  const { selectedTag, highlightTitle, setHighlightTitle } = useProjectStore();
  const highlightRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedTag === "Total"
      ? projectData
      : projectData.filter((project) => project.tags.includes(selectedTag));

  useEffect(() => {
    if (highlightTitle && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => setHighlightTitle(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightTitle, setHighlightTitle]);

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        {({ Total: "전체", Business: "비즈니스", Team: "팀", Personal: "개인" } as Record<string, string>)[selectedTag] ?? selectedTag} 프로젝트 목록 ({filteredProjects.length}개)
      </h2>

      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            ref={project.title === highlightTitle ? highlightRef : null}
            className={`border rounded-lg p-4 bg-white shadow-sm transition-all duration-500 ${project.title === highlightTitle ? "border-blue-400 shadow-blue-100 shadow-md" : ""}`}
          >
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="text-sm mb-2">
              <span className="text-navy mr-4">{project.where}</span>
              <span className="text-gray-400">{project.when}</span>
            </div>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <p className="text-gray-700 font-semibold mb-3">{project.sub}</p>

            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              {project.exp.map((exp, expIndex) => (
                <li key={expIndex}>• {renderTextWithStrikethrough(exp)}</li>
              ))}
            </ul>

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

const renderTextWithStrikethrough = (text: string) => {
  const parts = text.split(/(~~[^~]+~~)/g);
  return parts.map((part, index) => {
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <del key={index} className="text-gray-400">{part.slice(2, -2)}</del>;
    }
    return part;
  });
};
