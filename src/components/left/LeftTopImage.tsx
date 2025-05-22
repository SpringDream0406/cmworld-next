import Image from "next/image";
import React from "react";
import { useRandomGuestbook } from "@/hooks";

export const LeftTopImage = () => {
  const imgURL = useRandomGuestbook();

  //
  return (
    <div className="w-full h-full border rounded-xl overflow-hidden relative ">
      {
        <Image
          src={imgURL}
          alt="랜덤 방명록 이미지"
          fill
          sizes="(max-width: 768px) 50vw, 30vw"
          style={{ objectFit: "cover" }}
          priority
        />
      }
    </div>
  );
};
