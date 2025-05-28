import { ScSelect, TSelectOption } from "../shadcn";
import { openUrl } from "@/utils";

export const LeftBottom = () => {
  const selectOptions: TSelectOption[] = [
    { label: "Github", value: "https://github.com/springdream0406" },
    { label: "Tistory", value: "https://springdream0406.tistory.com" },
    {
      label: "CMWorld 개발일지",
      value: "https://springdream0406.tistory.com/category/Projects/%08CMWorld",
    },
  ];

  return (
    <div className="h-full">
      <div className="h-[40%] flex items-center">
        <div className="w-full text-xs text-blue-900 font-bold text-center">
          springdream0406@gmail.com
        </div>
      </div>
      <div className="h-[60%]">
        <ScSelect
          className="w-full"
          options={selectOptions}
          onChange={(value) => openUrl(value)}
          placeholder="관련 사이트"
        />
      </div>
    </div>
  );
};
