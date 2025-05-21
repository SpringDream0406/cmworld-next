"use client";

import { useState, useEffect } from "react";
import { guestbookImages } from "@/data";

// 랜덤 방명록 이미지 URL을 반환하는 커스텀 훅
export const useRandomGuestbook = () => {
  const baseURL = "/images/guestbook/";
  const [imgURL, setImgURL] = useState<string>(`${baseURL}basic.webp`);

  // 클라이언트에서만 실행되는 useEffect 내에서 랜덤 이미지 선택
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * guestbookImages.length);
    setImgURL(`${baseURL}${guestbookImages[randomIndex]}`);
  }, []);

  return imgURL;
};
