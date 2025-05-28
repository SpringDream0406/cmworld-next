import { ContentLayout } from "@/components/layouts";
import { ProjectLeftContent } from "./_components";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout leftContent={<ProjectLeftContent />}>
      {children}
    </ContentLayout>
  );
}
