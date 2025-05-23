"use client";

import Navigation from "@/components/common/Navigation";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex py-18">
      {/* 왼쪽 영역 */}
      <div className="w-[15%]"></div>

      {/* 가운데 영역 */}
      <div className="w-[65%] h-full common-border2 bg-basic p-3">
        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl p-2 ">
          <div className="w-full h-full common-border2 bg-gray-200 p-2">
            <div className="w-full h-full rounded-xl relative">
              {children}
              <div className="absolute top-5 left-9988/10000">
                <Navigation />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-[20%] bg-amber-100">
        <MusicPlayer />
      </div>
    </div>
  );
};
