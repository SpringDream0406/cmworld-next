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

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const next = url.searchParams.get("next") ?? "/guestbook";

    if (!code) {
      router.replace(next);
      exchanging = false;
      return;
    }

    supabaseClient.auth.exchangeCodeForSession(code).then(() => {
      router.replace(next);
    }).catch(() => {
      router.replace(next);
    }).finally(() => {
      exchanging = false;
    });
  }, []);

  return <div className="flex items-center justify-center h-screen">로그인 처리 중...</div>;
}
