import { ContentLayout } from "@/components/layouts";
import { LeftBasic } from "@/components/left/LeftBasic";
import { ProfileLeftContent } from "./_components";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout
      leftContent={<LeftBasic leftContent={<ProfileLeftContent />} />}
    >
      {children}
    </ContentLayout>
  );
}
