import React from "react";
import { HomeTop } from "./_components";

export default function HomePage() {
  return (
    <div className="w-full h-full p-1">
      <div className="h-[35%]">
        <HomeTop />
      </div>
      <div className="h-[5%]"></div>
      <div className="h-[60%] bg-amber-700"></div>
    </div>
  );
}
