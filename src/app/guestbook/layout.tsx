import { ContentLayout } from "@/components/layouts";
import { GuestbookLeft } from "./_components/GuestbookLeft";

export default function GuestbookLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout leftContent={<GuestbookLeft />}>
      {children}
    </ContentLayout>
  );
}
