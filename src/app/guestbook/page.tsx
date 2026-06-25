"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store";
import { supabase, supabaseClient } from "@/lib/supabase";
import { guestbookImages } from "@/data/guestbookImages";

const ADMIN_EMAIL = "springdream0406@gmail.com";

interface Post {
  id: number;
  user_id: string;
  user_name: string;
  avatar: string;
  message: string;
  reply: string;
  created_at: string;
  is_secret: boolean;
}

export default function GuestbookPage() {
  const { user, nickname, init } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState("basic.webp");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [loadingPosts, setLoadingPosts] = useState(true);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });
    if (data) setPosts(data as Post[]);
    setLoadingPosts(false);
  };

  const canViewSecret = (post: Post) =>
    isAdmin || user?.id === post.user_id;

  const handleWrite = async () => {
    if (!user || !nickname) return alert("로그인이 필요합니다.");
    if (!textRef.current?.value) return alert("내용을 입력해주세요.");

    await supabase.from("guestbook").insert({
      user_id: user.id,
      user_name: nickname,
      avatar: selectedAvatar,
      message: textRef.current.value,
      is_secret: isSecret,
    });

    textRef.current.value = "";
    setSelectedAvatar("basic.webp");
    setIsSecret(false);
    fetchPosts();
  };

  const handleDelete = async (post: Post) => {
    if (!user) return;
    if (!isAdmin && user.id !== post.user_id) return alert("본인의 글만 삭제 가능합니다.");
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    await supabaseClient.from("guestbook").update({ is_deleted: true }).eq("id", post.id);
    fetchPosts();
  };

  const handleReply = async (post: Post) => {
    const reply = replyInputs[post.id]?.trim();
    if (!reply) return;
    await supabaseClient.from("guestbook").update({ reply }).eq("id", post.id);
    setReplyInputs((prev) => { const n = { ...prev }; delete n[post.id]; return n; });
    fetchPosts();
  };

  const handleDeleteReply = async (post: Post) => {
    await supabaseClient.from("guestbook").update({ reply: "" }).eq("id", post.id);
    fetchPosts();
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 글쓰기 영역 */}
      <div className="shrink-0 border-t border-b border-gray-300 bg-gray-100 dark:bg-gray-800 p-2 mb-4">
        <div className="flex h-24">
          <div
            className="w-20 shrink-0 border border-gray-300 bg-white flex items-center justify-center cursor-pointer hover:border-black"
            onClick={() => setShowAvatarModal(true)}
          >
            <img src={`/images/guestbook/${selectedAvatar}`} alt="avatar" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 ml-1 border border-gray-300 bg-white">
            <textarea
              ref={textRef}
              maxLength={1000}
              className="w-full h-full resize-none p-1 text-sm outline-none bg-transparent"
              placeholder={`로그인을 하셔야 방명록 글 작성이 가능합니다.\n\n왼쪽 이미지를 눌러서 원하시는 방명록 프로필 이미지를 선택해보세요.`}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-1">
          <label className="flex items-center gap-1 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              className="cursor-pointer"
            />
            비밀글
          </label>
          <button
            onClick={handleWrite}
            disabled={!user}
            className="px-4 py-1 text-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            작성하기
          </button>
        </div>
      </div>

      {/* 글 목록 */}
      <div className="flex-1 overflow-y-auto">
        {loadingPosts ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">아직 방명록이 없습니다.</div>
        ) : null}
        {posts.map((post) => {
          const isSecret = post.is_secret && !canViewSecret(post);
          return (
            <div key={post.id} className="mb-8 border-t border-gray-300">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1">
                <span className="ml-4 text-blue-600 dark:text-blue-400 font-medium">
                  {post.user_name}
                  {post.is_secret && <span className="ml-1 text-xs text-gray-400">🔒</span>}
                </span>
                <span className="ml-8 text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</span>
                {(isAdmin || user?.id === post.user_id) && (
                  <button
                    onClick={() => handleDelete(post)}
                    className="ml-auto text-xs text-gray-500 hover:text-red-500"
                  >
                    X
                  </button>
                )}
              </div>
              <div className="flex h-28 m-1">
                <div className="w-20 shrink-0 flex items-center justify-center">
                  <img src={`/images/guestbook/${post.avatar}`} alt={post.avatar} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 ml-1 text-sm overflow-y-auto p-1 whitespace-pre-wrap">
                  {isSecret
                    ? <span className="text-gray-400 italic">🔒 비밀글입니다.</span>
                    : post.message
                  }
                </div>
              </div>

              {/* 답글 표시 + 관리자 수정/삭제 */}
              {!isSecret && post.reply && (
                <div className="flex items-center ml-4 mr-2 mb-1 text-sm text-gray-600 dark:text-gray-400 gap-2">
                  <span>ㄴ춘몽: {post.reply}</span>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => setReplyInputs((prev) => ({ ...prev, [post.id]: post.reply }))}
                        className="text-xs text-gray-400 hover:text-blue-400"
                      >수정</button>
                      <button
                        onClick={() => handleDeleteReply(post)}
                        className="text-xs text-gray-400 hover:text-red-400"
                      >삭제</button>
                    </>
                  )}
                </div>
              )}

              {/* 관리자 답글 입력 */}
              {isAdmin && (!post.reply || replyInputs[post.id] !== undefined) && (
                <div className="flex gap-1 mx-2 mb-2">
                  <input
                    type="text"
                    value={replyInputs[post.id] ?? ""}
                    onChange={(e) => setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && handleReply(post)}
                    placeholder="답글 입력..."
                    className="flex-1 border border-gray-300 text-sm px-2 py-0.5 outline-none focus:border-gray-500"
                  />
                  <button
                    onClick={() => handleReply(post)}
                    className="text-xs px-2 py-0.5 border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {post.reply ? "수정" : "답글"}
                  </button>
                  {post.reply && (
                    <button
                      onClick={() => setReplyInputs((prev) => { const n = { ...prev }; delete n[post.id]; return n; })}
                      className="text-xs px-2 py-0.5 border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >취소</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 아바타 선택 모달 */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAvatarModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <p className="font-medium mb-3">원하시는 방명록 프로필을 선택해보세요.</p>
            <div className="flex flex-wrap gap-2">
              {guestbookImages.map((img) => (
                <img
                  key={img}
                  src={`/images/guestbook/${img}`}
                  alt={img}
                  className="w-16 h-16 object-contain cursor-pointer hover:ring-2 hover:ring-black"
                  onClick={() => { setSelectedAvatar(img); setShowAvatarModal(false); }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
