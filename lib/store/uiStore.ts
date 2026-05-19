import { create } from 'zustand';

export type CursorVariant = 'default' | 'text' | 'image' | 'button' | 'shop-item' | 'navbar';
export type ScrollContext = 'hero' | 'story' | 'shop' | 'admin' | 'none';

interface UIState {
  cursorVariant: CursorVariant;
  scrollContext: ScrollContext;
  isNavOpen: boolean;
  setCursorVariant: (variant: CursorVariant) => void;
  setScrollContext: (context: ScrollContext) => void;
  toggleNav: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  cursorVariant: 'default',
  scrollContext: 'none',
  isNavOpen: false,
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setScrollContext: (context) => set({ scrollContext: context }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));
