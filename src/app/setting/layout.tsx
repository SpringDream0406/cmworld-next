import { ContentLayout } from "@/components/layouts";
import { LeftBasic } from "@/components/left/LeftBasic";

// 설정 페이지 왼쪽 고정 메뉴
const SettingLeftContent = () => (
  <div className="p-2">
    <div className="px-3 py-2 bg-basic text-white rounded-lg text-sm font-medium">
      뮤직 플레이어
    </div>
  </div>
);

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout leftContent={<SettingLeftContent />}>
      {children}
    </ContentLayout>
  );
}
