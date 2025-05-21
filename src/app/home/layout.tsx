import { ContentLayout } from "@/components/layouts";
import { LeftBasic } from "@/components/left/LeftBasic";
import { HomeLeftContent } from "./_components";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout
      leftContent={<LeftBasic leftContent={<HomeLeftContent />} />}
    >
      {children}
    </ContentLayout>
  );
}
