"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store";
import { projectTags } from "@/app/project/_data";
import { LeftSelectBasic } from "@/components/left/LeftSelectBasic";

export const ProjectLeftContent = () => {
  const { selectedTag, setTag, initFromUrl } = useProjectStore();

  useEffect(() => {
    initFromUrl();
  }, [initFromUrl]);

  return (
    <LeftSelectBasic
      options={projectTags}
      selected={selectedTag}
      onSelect={setTag}
    />
  );
};
