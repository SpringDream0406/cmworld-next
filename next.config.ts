import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["img.icons8.com"], // icons8.com 도메인의 이미지 사용 허용
    // 필요하다면 더 많은 도메인을 추가할 수 있습니다
    // 예: 'cdn.jsdelivr.net', 'images.unsplash.com' 등
  },
};

export default nextConfig;
