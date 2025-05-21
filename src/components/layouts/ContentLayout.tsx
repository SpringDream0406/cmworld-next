"use client";

interface ContentLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
}

export const ContentLayout = ({
  children,
  leftContent,
}: ContentLayoutProps) => {
  return (
    <div className="w-full h-full   rounded-xl flex">
      <div className="w-[20%] common-border p-2 bg-white">{leftContent}</div>
      <div className="w-[2%]"></div>
      <div className="w-[78%] common-border p-2 bg-amber-700">{children}</div>
    </div>
  );
};
