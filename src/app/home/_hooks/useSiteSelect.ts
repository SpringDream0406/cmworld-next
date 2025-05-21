import { SelectOption } from "@/components/shadcn/ScSelect";
import { useEffect, useState } from "react";

export const useSiteSelect = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 사이트 선택하면 새창으로 열기
  useEffect(() => {
    if (selectedOption) {
      window.open(selectedOption, "_blank");
    }
  }, [selectedOption]);

  // 사이트 선택 옵션
  const selectOptions: SelectOption[] = [
    { label: "Github", value: "https://github.com/springdream0406" },
    { label: "Tistory", value: "https://springdream0406.tistory.com" },
    {
      label: "CMWorld 개발일지",
      value: "https://springdream0406.tistory.com/category/Projects/%08CMWorld",
    },
  ];

  return { selectOptions, selectedOption, setSelectedOption };
};
