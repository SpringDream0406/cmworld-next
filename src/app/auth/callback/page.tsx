"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";

let exchanging = false;

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    if (exchanging) return;
    exchanging = true;

    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      router.replace("/guestbook");
      exchanging = false;
      return;
    }

    supabaseClient.auth.exchangeCodeForSession(code).then(() => {
      router.replace("/guestbook");
    }).catch(() => {
      router.replace("/guestbook");
    }).finally(() => {
      exchanging = false;
    });
  }, []);

  return <div className="flex items-center justify-center h-screen">로그인 처리 중...</div>;
}
