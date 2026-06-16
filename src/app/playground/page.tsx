"use client";

import { openUrl } from "@/utils";

// 놀이터 데이터 (기존 playgroundData.ts 참고)
const playgroundData = [
  {
    title: "뮤직 플레이어",
    img: "musicplayer",
    ex: "CM월드의 BGM 기능만 편하게 사용하고 싶다면? CM월드 모바일 버전을 PC에서 즐기고 싶다면? CM월드의 뮤직플레이어를 이용해보세요.",
    url: "/musicplayer",
    isInternal: true,
  },
  {
    title: "가짜 결제",
    img: "fake-pay",
    ex: "가짜로 카카오페이를 원하는 금액과 상품명으로 결제해보고, 결제 내용을 카카오톡 메시지로 받아보세요.",
    url: "https://fake-kakaopay.netlify.app/",
    isInternal: false,
  },
  {
    title: "팜팜",
    img: "farmfarm",
    ex: `광주 인공지능사관학교 4기 App반의 1차 프로젝트, 에비앙(App이앙)조의 "도심 농부를 위한 텃밭 분양 플랫폼" 데모 사이트를 경험해보세요.`,
    url: "http://farmfarm-front.s3-website.ap-northeast-2.amazonaws.com/",
    isInternal: false,
  },
];

export default function PlaygroundPage() {
  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="grid grid-cols-2 gap-4">
        {playgroundData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openUrl(item.url)}
          >
            {/* 제목 */}
            <div className="text-lg font-bold mb-2">{item.title}</div>

            {/* 이미지 */}
            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
              <img
                src={`/images/playground/${item.img}.png`}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 이미지 없을 경우 배경색만 표시
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* 설명 */}
            <p className="text-sm text-gray-600">{item.ex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
