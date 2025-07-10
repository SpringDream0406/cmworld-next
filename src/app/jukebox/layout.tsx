import { ContentLayout } from "@/components/layouts";
import { ProjectLeftContent } from "./_components";

export default function JukeboxLayout({
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
