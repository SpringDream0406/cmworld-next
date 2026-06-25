import { ContentLayout } from "@/components/layouts";
import { LeftBasic } from "@/components/left/LeftBasic";

const PlaygroundLeftContent = () => (
  <div className="p-2 text-sm text-gray-500">
    유용하거나 재밌었던 혹은 추억을 담고 있는 프로젝트를 체험해 볼 수 있는 공간입니다.
  </div>
);

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout leftContent={<LeftBasic leftContent={<PlaygroundLeftContent />} />}>{children}</ContentLayout>
  );
}
