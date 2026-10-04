"use client";
import { useWorkspace } from "@/store/workspace";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function PageList() {
  const { pages, pageId, selectPage } = useWorkspace();
  return (
    <div className="flex w-40 shrink-0 flex-col gap-2 overflow-auto border-r border-zinc-800 bg-zinc-900 p-2">
      {pages.map((p) => (
        <button key={p.id} onClick={() => selectPage(p.id)} className={`rounded-lg border p-1 text-left ${p.id === pageId ? "border-red-500" : "border-zinc-800"}`}>
          <img src={p.imageUrl} alt="" className="aspect-[2/3] w-full rounded object-cover" />
          <div className="mt-1 flex items-center justify-between text-xs"><span>#{p.order}</span><StatusBadge status={p.status} /></div>
        </button>
      ))}
    </div>
  );
}
