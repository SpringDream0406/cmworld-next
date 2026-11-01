"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProjectStore } from "@/store";
import { projectTags } from "@/app/project/_data";
import { LeftSelectBasic } from "@/components/left/LeftSelectBasic";

export const ProjectLeftContent = () => {
  const { selectedTag, setTag, initFromUrl } = useProjectStore();
  const router = useRouter();
  const pathname = usePathname();
  const isHistory = pathname === "/project/history";

  useEffect(() => {
    if (!isHistory) initFromUrl();
  }, [initFromUrl, isHistory]);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => router.push("/project/history")}
        className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded cursor-pointer ${isHistory ? "bg-basic text-white font-bold" : "hover:bg-basic/20 text-gray-600"}`}
      >
        History
      </button>
      <div className="w-full h-px bg-gray-200 my-1" />
      <LeftSelectBasic
        options={projectTags}
        selected={isHistory ? "" as typeof selectedTag : selectedTag}
        onSelect={(tag) => {
          if (isHistory) {
            router.push(`/project?tag=${tag}`);
          } else {
            setTag(tag);
          }
        }}
      />
    </div>
  );
};
