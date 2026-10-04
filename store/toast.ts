"use client";
import { create } from "zustand";
type Toast = { id: number; msg: string; kind: "ok" | "err" };
export const useToast = create<{ items: Toast[]; push: (msg: string, kind?: Toast["kind"]) => void }>((set) => ({
  items: [],
  push: (msg, kind = "ok") => {
    const id = Math.random();
    set((s) => ({ items: [...s.items, { id, msg, kind }] }));
    setTimeout(() => set((s) => ({ items: s.items.filter((t) => t.id !== id) })), 2500);
  },
}));
