import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TSelectOption = {
  label: string;
  value: string;
};

interface IScSelectProps {
  options: TSelectOption[];
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export const ScSelect = ({
  className,
  placeholder = "선택하세요",
  options,
  onChange,
  defaultValue,
}: IScSelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className={`${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.label} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
