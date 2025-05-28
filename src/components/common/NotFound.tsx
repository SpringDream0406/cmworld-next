import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="/images/notfound.webp"
        alt="Not Found"
        width={1000}
        height={1000}
        className="object-cover w-full h-full common-border"
      />
    </div>
  );
};
