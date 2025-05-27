import Image from "next/image";
import { TProfileItem } from "../_data";

// 아이콘이 있는 컴포넌트
export const IconItem = ({ item }: { item: TProfileItem }) => {
  return (
    <div className="flex flex-col items-center w-28 h-28 m-2 rounded-2xl font-medium">
      {/* icon 또는 iconUrl이 있는 경우에만 이미지를 표시 */}
      {(item.icon || item.iconUrl) && (
        <div className="relative w-20 h-20">
          <Image
            src={item.iconUrl || `/images/profile/${item.icon}.webp`}
            alt={item.title}
            fill
            sizes="5rem"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <div className="text-lg text-teal-00">{item.title}</div>
      {item.subtitle && (
        <div className="text-xs text-gray-500">{item.subtitle}</div>
      )}
    </div>
  );
};

// 아이콘 없고 텍스트가 있는 컴포넌트
export const TextItem = ({ item }: { item: TProfileItem }) => {
  return (
    <div className="flex flex-col items-center h-26 m-2 rounded-2xl font-medium">
      <div className="h-3/5 text-2xl text-navy flex items-center text-center">
        {item.title}
      </div>
      {item.description && (
        <div className="h-1/4 flex items-center text-center">
          {item.description}
        </div>
      )}
      {item.period && (
        <div className="h-1/6 text-xs text-gray-500 flex items-center text-center">
          {item.period}
        </div>
      )}
    </div>
  );
};

// 통합 아이템 컴포넌트 - 섹션에 따라 적절한 컴포넌트 선택
export const ProfileItem = ({
  item,
  type,
}: {
  item: TProfileItem;
  index: number;
  type: string;
}) => {
  // 섹션에 따라 적절한 컴포넌트 반환
  if (type === "text") {
    return <TextItem item={item} />;
  } else {
    return <IconItem item={item} />;
  }
};
