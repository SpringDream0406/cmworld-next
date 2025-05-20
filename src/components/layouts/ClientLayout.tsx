"use client";

import Navigation from "@/components/common/Navigation";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import { ContentLayout } from "./ContentLayout";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex py-14">
      {/* 왼쪽 영역 */}
      <div className="w-[15%] bg-green-100"></div>

      {/* 가운데 영역 */}
      <div className="w-[65%] h-[100%] border-2 border-black bg-basic rounded-xl p-3">
        <div className="w-[100%] h-[100%] border-2 border-dashed border-gray-300 rounded-xl p-2 ">
          <div className="w-[100%] h-[100%] border-2 border-black bg-gray-200 rounded-xl p-2 ">
            <div className="w-[100%] h-[100%] rounded-xl relative">
              <ContentLayout>{children}</ContentLayout>
              <div className="absolute top-5 left-9991/10000">
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
