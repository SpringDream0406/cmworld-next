"use client";

import React from "react";
import { profileData } from "./_data";
import { ProfileItem } from "./_components";

export default function ProfilePage() {
  return (
    <div className="h-full rounded-2xl p-2 flex flex-col overflow-y-auto">
      {profileData.map((data) => (
        <div key={data.itemTitle} className="flex flex-col mb-12">
          <div className="py-1 text-5xl font-bold mb-0.5">{data.itemTitle}</div>
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
