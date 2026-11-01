"use client";

import { useEffect } from "react";

interface VersionDetailModalProps {
  version: string;
  date: string;
  details: string[];
  onClose: () => void;
}

export const VersionDetailModal = ({
  version,
  date,
  details,
  onClose,
}: VersionDetailModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-bold text-blue-900">{version}</span>
            <span className="text-sm text-gray-400 ml-2">{date}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-1.5">
          {details.map((detail, i) => {
            const match = detail.match(/^([^:]{1,10}):\s(.+)$/);
            if (match) {
              return (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded text-gray-800 shrink-0">
                    {match[1]}
                  </kbd>
                  <span>{match[2]}</span>
                </li>
              );
            }
            return (
              <li key={i} className="text-sm text-gray-700 flex gap-1">
                <span className="shrink-0">•</span>
                <span>{detail}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
