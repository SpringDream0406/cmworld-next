import { Button } from "@/components/ui/button";

interface LeftSelectBasicProps<T extends string> {
  options: Record<string, T>;
  selected: T;
  onSelect: (value: T) => void;
  className?: string;
}

export const LeftSelectBasic = <T extends string>({
  options,
  selected,
  onSelect,
  className,
}: LeftSelectBasicProps<T>) => (
  <div className={className ?? "w-full h-full p-4"}>
    <div className="space-y-2">
      {Object.entries(options).map(([key, value]) => (
        <Button
          key={key}
          onClick={() => onSelect(value as T)}
          variant="ghost"
          size="lg"
          className={`w-full px-4 py-2 text-left rounded-lg transition-colors text-xl ${
            selected === value
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
