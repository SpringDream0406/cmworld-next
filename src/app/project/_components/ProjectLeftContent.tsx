"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/projectStore";
import { projectTags } from "@/app/project/_data/projectData";
import { Button } from "@/components/ui/button";

export const ProjectLeftContent = () => {
  const { selectedTag, setTag, initFromUrl } = useProjectStore();

  useEffect(() => {
    initFromUrl();
  }, [initFromUrl]);

  return (
    <div className="w-full h-full p-4">
      <div className="space-y-2">
        {Object.entries(projectTags).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => setTag(value)}
            variant="ghost"
            size="lg"
            className={`w-full px-4 py-2 text-left rounded-lg transition-colors text-xl ${
              selectedTag === value
                ? "bg-basic text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};
