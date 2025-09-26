import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  user_name: string;
  user_email: string;
  profile_picture: string;
}

interface UserStore {
  profile: UserProfile | null;
  setUser: (user: UserProfile) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      setUser: (user) => set({ profile: user }),
      resetUser: () => set({ profile: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

