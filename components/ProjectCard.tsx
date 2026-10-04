import Link from "next/link";
import { Play } from "lucide-react";
import type { Project } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      <img src={p.info.coverUrl} alt="" className="h-36 w-24 shrink-0 rounded object-cover" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-medium">{p.info.title}</h3><StatusBadge status={p.status} />
        </div>
        <p className="text-sm text-zinc-400">{p.info.author} · {p.langFrom}→{p.langTo} · {p.source}</p>
        <p className="text-xs text-zinc-500">{p.totalChapters} chương · cập nhật {p.updatedAt}</p>
        <div className="mt-auto">
          <div className="mb-1 flex justify-between text-xs text-zinc-400"><span>Tiến trình</span><span>{p.progress}%</span></div>
          <div className="h-1.5 rounded bg-zinc-800"><div className="h-full rounded bg-red-500" style={{ width: `${p.progress}%` }} /></div>
          {p.status === "in_progress" && (
            <Link href={`/workspace?project=${p.id}`} className="mt-2 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"><Play size={14} /> Tiếp tục dịch</Link>
          )}
        </div>
      </div>
    </div>
  );
}
