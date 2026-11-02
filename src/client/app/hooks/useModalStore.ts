
import { create } from "zustand";

type ModalStore = {
  isDemoOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;

  isSearchOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({

  isDemoOpen: false,

  openDemoModal: () => set({ isDemoOpen: true }),

  closeDemoModal: () => set({ isDemoOpen: false }),

  isSearchOpen: false,

  openSearchModal: () => set({ isSearchOpen: true }),

  closeSearchModal: () => set({ isSearchOpen: false }),

  isAuthOpen: false,

  openAuthModal: () => set({ isAuthOpen: true }),

  closeAuthModal: () => set({ isAuthOpen: false }),

}));
