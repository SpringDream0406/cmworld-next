"use client";

import React from "react";
import { profileData } from "./_data";
import { ProfileItem } from "./_components";

export default function ProfilePage() {
  return (
    <div className="h-full rounded-2xl p-2 flex flex-col overflow-y-auto">
      {profileData.map((data) => (
        <div
          key={data.itemTitle}
          className="flex flex-col mb-7 border rounded-xl shadow-sm p-2"
        >
          <div className="py-1 text-4xl font-bold mb-0.5">{data.itemTitle}</div>
          <div className="w-full h-px bg-gray-200 my-2"></div>
          <div className="flex flex-row flex-wrap gap-2">
            {data.items.map((item, index) => (
              <ProfileItem
                key={item.title}
                item={item}
                index={index}
                type={data.type}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
