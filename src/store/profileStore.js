import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      fullName: null,
      email: null,
      phone: null,
      localtion: null,
      profileImage: null,

      setProfileData: (profileData) => set({ ...profileData }),
    }),
    {
      name: "user-profile-storage", // Key in localStorage
      getStorage: () => localStorage,
    }
  )
);
