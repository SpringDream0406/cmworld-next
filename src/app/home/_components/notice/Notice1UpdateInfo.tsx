"use client";

import { useState } from "react";
import { updateVersionData } from "../../_data/";
import { VersionDetailModal } from "./VersionDetailModal";

export const Notice1UpdateInfo = () => {
  const [selected, setSelected] = useState<{
    version: string;
    date: string;
    details: string[];
  } | null>(null);

  return (
    <>
      {updateVersionData.map((item, index) => (
        <div className="flex flex-col p-2" key={index}>
          <div className="text-2xl text-blue-900">{item.title}</div>
          {item.sub.map((subitem, index) => (
            <div
              className="flex flex-row cursor-pointer hover:bg-blue-50 rounded px-1"
              key={index}
              onClick={() =>
                subitem.details &&
                setSelected({
                  version: subitem.version,
                  date: subitem.date,
                  details: subitem.details,
                })
              }
            >
              <div className="w-[8%] ml-4">{subitem.version}:</div>
              <div className="w-[77%]">{subitem.change}</div>
              <div className="w-[15%]">{subitem.date}</div>
            </div>
          ))}
        </div>
      ))}

      {selected && (
        <VersionDetailModal
          version={selected.version}
          date={selected.date}
          details={selected.details}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};
