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
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6"
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
          {details.map((detail, i) => (
            <li key={i} className="text-sm text-gray-700">
              • {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
