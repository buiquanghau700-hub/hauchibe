"use client";
import { create } from "zustand";
import type { BubbleFont, Page, SpeechBubble } from "@/types";

interface WorkspaceState {
  pages: Page[]; bubbles: SpeechBubble[]; pageId?: string; bubbleId?: string;
  zoom: number; after: boolean; progress: number;
  load: (p: Page[], b: SpeechBubble[]) => void;
  selectPage: (id: string) => void; selectBubble: (id: string) => void;
  patchBubble: (id: string, patch: Partial<SpeechBubble>) => void;
  patchFont: (id: string, patch: Partial<BubbleFont>) => void;
  step: (d: 1 | -1) => void; setZoom: (z: number) => void; toggleAfter: () => void; setProgress: (n: number) => void;
}

export const useWorkspace = create<WorkspaceState>((set, get) => ({
  pages: [], bubbles: [], zoom: 1, after: false, progress: 0,
  load: (pages, bubbles) => set({ pages, bubbles, pageId: pages[0]?.id, bubbleId: bubbles[0]?.id }),
  selectPage: (id) => set((s) => ({ pageId: id, bubbleId: s.bubbles.find((b) => b.pageId === id)?.id })),
  selectBubble: (id) => set({ bubbleId: id }),
  patchBubble: (id, patch) => set((s) => ({ bubbles: s.bubbles.map((b) => (b.id === id ? { ...b, ...patch } : b)) })),
  patchFont: (id, patch) => set((s) => ({ bubbles: s.bubbles.map((b) => (b.id === id ? { ...b, font: { ...b.font, ...patch } } : b)) })),
  step: (d) => {
    const { bubbles, pageId, bubbleId } = get();
    const list = bubbles.filter((b) => b.pageId === pageId);
    const i = list.findIndex((b) => b.id === bubbleId);
    const next = list[Math.min(list.length - 1, Math.max(0, i + d))];
    if (next) set({ bubbleId: next.id });
  },
  setZoom: (zoom) => set({ zoom: Math.min(3, Math.max(0.4, zoom)) }),
  toggleAfter: () => set((s) => ({ after: !s.after })),
  setProgress: (progress) => set({ progress }),
}));
