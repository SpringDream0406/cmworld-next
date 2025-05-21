import { useSiteSelect } from "@/app/home/_hooks";
import { ScSelect } from "../shadcn";

export const LeftBottom = () => {
  const { selectOptions, setSelectedOption } = useSiteSelect();
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
          onChange={setSelectedOption}
          placeholder="관련 사이트"
        />
      </div>
    </div>
  );
};
