"use client";

import { LeftBottom, LeftTopImage } from "@/components/left";

interface LeftBasicProps {
  leftContent?: React.ReactNode;
}

export const LeftBasic = ({ leftContent }: LeftBasicProps) => {
  return (
    <div className="w-full h-full overflow-hidden">
      {/* 상단__ 이미지 */}
      <div className="h-[30%]">{<LeftTopImage />}</div>

      {/* 컨텐츠 내용 */}
      <div className="h-[60%]">{leftContent}</div>

      {/* 하단__ 이메일, 관련 사이트 */}
      <div className="h-[10%]">{<LeftBottom />}</div>
    </div>
  );
};
