import { create } from "zustand";

type Store = {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
};

export const useStore = create<Store>()((set) => ({
  isLoading: false,
  start: () => set({ isLoading: true }),
  stop: () => set({ isLoading: false }),
}));
