import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 시스템 기본 폰트 대체용 (선택사항)
import "./globals.css";
import { LayoutSelector } from "@/components/layouts";

// Inter 폰트 설정 (기존 프로젝트의 시스템 폰트와 유사)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // 폰트 로딩 중에도 텍스트 표시
});

// 메타데이터 설정 (SEO 및 페이지 정보)
export const metadata: Metadata = {
  title: "CMWORLD",
  description: "춘몽의 CMWORLD입니다.",
  metadataBase: new URL("https://cmworld.springdream.kr"),
  authors: [{ name: "SpringDream" }],
  openGraph: {
    type: "website",
    siteName: "CMWORLD",
    title: "춘몽월드",
    description: "춘몽의 CMWORLD입니다.",
    images: ["/favicon.png"],
  },
  twitter: {
    card: "summary",
    title: "춘몽월드",
    description: "춘몽의 CMWORLD입니다.",
  },
};

// 루트 레이아웃 (서버 컴포넌트)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="ob8CiIUhwBqHkZ5d-Qepo7XYEmGL7gY2fRNRn7DKSPQ"
        />
      </head>
      <body className={`${inter.variable}`}>
        {/* 모바일인지, musicplayer 경로인지 체크 후 반영 */}
        <LayoutSelector>{children}</LayoutSelector>
      </body>
    </html>
  );
}
