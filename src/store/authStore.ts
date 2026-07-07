"use client";

import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase";

interface AuthStore {
  user: User | null;
  nickname: string | null;
  loading: boolean;
  signInWithGoogle: (next?: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchNickname: (userId: string) => Promise<void>;
  saveNickname: (nickname: string) => Promise<void>;
  init: () => () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  nickname: null,
  loading: true,

  signInWithGoogle: async (next?: string) => {
    const redirectTo = `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`;
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  },

  signOut: async () => {
    await supabaseClient.auth.signOut();
    set({ user: null, nickname: null });
  },

  fetchNickname: async (userId: string) => {
    const { data } = await supabaseClient
      .from("profiles")
      .select("nickname")
      .eq("id", userId)
      .single();
    set({ nickname: data?.nickname ?? null });
  },

  saveNickname: async (nickname: string) => {
    const user = get().user;
    if (!user) return;
    await supabaseClient.from("profiles").upsert({ id: user.id, nickname });
    set({ nickname });
  },

  init: () => {
    const getSessionWithRetry = (retryCount = 0) => {
      const timeout = setTimeout(() => {
        if (retryCount < 3) getSessionWithRetry(retryCount + 1);
        else set({ loading: false });
      }, 5000);

      supabaseClient.auth.getSession().then(async ({ data }) => {
        clearTimeout(timeout);
        const user = data.session?.user ?? null;
        set({ user });
        if (user) await get().fetchNickname(user.id);
        set({ loading: false });
      });
    };
    getSessionWithRetry();
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      set({ user });
      if (user) await get().fetchNickname(user.id);
      else set({ nickname: null });
      set({ loading: false });
    });
    return () => subscription.unsubscribe();
  },
}));
