import { ContentLayout } from "@/components/layouts";
import { LeftBasic } from "@/components/left/LeftBasic";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout leftContent={<LeftBasic />}>{children}</ContentLayout>
  );
}
