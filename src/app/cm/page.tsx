"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

const ADMIN_EMAIL = "springdream0406@gmail.com";

export default function CmLoginPage() {
  const { user, loading, init, signInWithGoogle } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading && user) {
      if (user.email === ADMIN_EMAIL) {
        router.replace("/cm/songs");
      }
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-72 items-center">
        <h1 className="text-xl font-bold">CM 관리자</h1>
        {loading ? (
          <p className="text-gray-400 text-sm">확인 중...</p>
        ) : user && user.email !== ADMIN_EMAIL ? (
          <p className="text-red-400 text-sm">접근 권한이 없습니다.</p>
        ) : (
          <button
            onClick={() => signInWithGoogle("/cm")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium transition-colors w-full"
          >
            Google로 로그인
          </button>
        )}
      </div>
    </div>
  );
}
