"use client";
import { useToast } from "@/store/toast";
export function Toaster() {
  const items = useToast((s) => s.items);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {items.map((t) => (
        <div key={t.id} className={`rounded-lg border px-4 py-2 text-sm shadow-lg ${t.kind === "ok" ? "border-zinc-700 bg-zinc-900" : "border-red-600 bg-red-950"}`}>{t.msg}</div>
      ))}
    </div>
  );
}
