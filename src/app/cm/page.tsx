"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CmLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cm-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("cm-auth", "true");
      router.push("/cm/songs");
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
        <h1 className="text-xl font-bold text-center">CM 관리자</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="비밀번호"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-gray-400"
          autoFocus
        />
        {error && <p className="text-red-400 text-sm text-center">비밀번호가 틀렸습니다.</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium transition-colors"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
