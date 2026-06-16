import { ContentLayout } from "@/components/layouts";
import { JukeboxLeftContent } from "./_components";

export default function JukeboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout leftContent={<JukeboxLeftContent />}>
      {children}
    </ContentLayout>
  );
}
