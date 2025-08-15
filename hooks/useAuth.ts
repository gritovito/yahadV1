import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";

type AuthState = {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, options?: any) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) set({ user: data.user });
    set({ loading: false });
  },
  signUp: async (email, password, fullName) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data?.user) {
      set({ user: data.user });
      // Создание профиля в Supabase
      await supabase.rpc('join_complete_tili_system', { p_user_id: data.user.id, p_user_name: fullName });
    }
    set({ loading: false });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  }
}));
