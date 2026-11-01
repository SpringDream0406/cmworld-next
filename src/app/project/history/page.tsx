"use client";

import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store";
import { projectData } from "@/app/project/_data";
import { useEffect } from "react";

export default function ProjectHistoryPage() {
  const router = useRouter();
  const { setHighlightTitle } = useProjectStore();

  let lastYear = "";

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2" />
        <div className="space-y-2 pb-4">
          {projectData.map((project, index) => {
            const year = project.when.slice(0, 4);
            const showYear = year !== lastYear;
            if (showYear) lastYear = year;
            const isLeft = index % 2 === 0;

            return (
              <div key={index}>
                {showYear && (
                  <div className="relative flex justify-center my-6">
                    <span className="bg-white border-2 border-gray-400 rounded-full px-5 py-1.5 text-lg font-bold text-gray-700 z-10">
                      {year}
                    </span>
                  </div>
                )}
                <div className="relative flex items-center">
                  <div
                    className={`w-[45%] cursor-pointer border rounded-lg p-3 bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all ${isLeft ? "mr-auto text-right" : "ml-auto text-left"}`}
                    onClick={() => {
                      setHighlightTitle(project.title);
                      router.push("/project?tag=Total");
                    }}
                  >
                    <div className="font-bold text-sm">{project.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{project.when}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{project.sub}</div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    {project.tags.filter(t => ["Business", "Team", "Personal"].includes(t)).map(t => (
                      <span key={t} className={`block text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap text-center ${
                        t === "Business" ? "bg-[#e8f4f8] border-[#66b5d4] text-[#3a8aad]" :
                        t === "Team" ? "bg-[#eefaf0] border-[#6dcc7f] text-[#3a9a50]" :
                        "bg-[#f5f0ff] border-[#c4a8f0] text-[#7c4dcc]"
                      }`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
