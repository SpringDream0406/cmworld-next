"use client";

export const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[100%] h-[100%] bg-white border-1 border-black rounded-xl p-2">
      {children}
    </div>
  );
};
