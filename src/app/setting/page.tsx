"use client";

import { useSettingStore } from "@/store";

const BACKGROUNDS = [
  { key: "Basic", label: "기본" },
  { key: "Clear", label: "맑음" },
  { key: "Clouds", label: "흐림" },
  { key: "Rain", label: "비" },
  { key: "Mist", label: "안개" },
  { key: "Snow", label: "눈" },
  { key: "Thunderstorm", label: "뇌우" },
];

export default function SettingPage() {
  const { background, setBackground } = useSettingStore();

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {BACKGROUNDS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setBackground(key)}
            className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
              background === key ? "border-blue-500 scale-[1.03]" : "border-transparent hover:border-gray-400"
            }`}
          >
            <img
              src={`/images/backgrounds/${key}.webp`}
              alt={label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-xs py-1 text-center">
              {label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
