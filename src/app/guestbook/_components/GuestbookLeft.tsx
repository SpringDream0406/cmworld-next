"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";

export function GuestbookLeft() {
  const { user, nickname, loading, signInWithGoogle, signOut, init, saveNickname } = useAuthStore();
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");

  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user && nickname === null && !loading) {
      setEditingNickname(true);
      setNicknameInput(user.user_metadata?.name ?? "");
    }
  }, [user, nickname, loading]);

  const handleSaveNickname = async () => {
    const trimmed = nicknameInput.trim();
    if (!trimmed) return alert("닉네임을 입력해주세요.");
    await saveNickname(trimmed);
    setEditingNickname(false);
  };

  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex flex-col items-center text-center mb-4">
        {user && nickname && (
          <div className="text-xl font-bold mb-1">
            <span className="bg-pink-300 px-1">{nickname}</span> 님
          </div>
        )}
        <div className="mt-2 text-sm">방명록에 오신걸 환영합니다.</div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-4">
        {loading ? (
          <div className="text-sm text-gray-400">로딩 중...</div>
        ) : !user ? (
          <button
            onClick={signInWithGoogle}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            Google 로그인
          </button>
        ) : editingNickname ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-sm font-medium">닉네임 설정</div>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveNickname()}
              maxLength={20}
              className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-blue-400"
              placeholder="사용할 닉네임을 입력하세요"
              autoFocus
            />
            <button
              onClick={handleSaveNickname}
              className="w-full px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <button
              onClick={() => { setNicknameInput(nickname ?? ""); setEditingNickname(true); }}
              className="w-full px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              닉네임 변경
            </button>
            <button
              onClick={signOut}
              className="w-full px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
