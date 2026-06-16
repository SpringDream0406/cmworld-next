"use client";

import { useSettingStore } from "@/store";

export default function SettingPage() {
  const { savePlaylist, setSavePlaylist } = useSettingStore();

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h2 className="text-lg font-bold mb-6">뮤직 플레이어</h2>

      {/* 플레이리스트 저장 토글 */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <div className="font-medium">플레이리스트 저장</div>
          <div className="text-xs text-gray-500 mt-0.5">
            localStorage에 저장됩니다.
          </div>
        </div>
        {/* 토글 스위치 */}
        <button
          role="switch"
          aria-checked={savePlaylist}
          onClick={() => setSavePlaylist(!savePlaylist)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
            savePlaylist ? "bg-basic" : "bg-gray-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${
              savePlaylist ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
