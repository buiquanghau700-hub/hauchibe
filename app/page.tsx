"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import type { Project } from "@/types";
import { projectService } from "@/services";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";

export default function Dashboard() {
  const [items, setItems] = useState<Project[] | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [desc, setDesc] = useState(true);
  useEffect(() => { projectService.list().then(setItems); }, []);

  const shown = useMemo(() => (items ?? [])
    .filter((p) => (status === "all" || p.status === status) && p.info.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (desc ? b.updatedAt.localeCompare(a.updatedAt) : a.updatedAt.localeCompare(b.updatedAt))), [items, q, status, desc]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="mr-auto text-xl font-semibold">Kho project</h1>
        <div className="relative"><Search size={14} className="absolute left-2.5 top-2.5 text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm truyện…" className="rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-3 text-sm" /></div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">
          <option value="all">Tất cả</option><option value="in_progress">Đang làm dở</option><option value="translated">Đã dịch xong</option><option value="exported">Đã xuất</option>
        </select>
        <button onClick={() => setDesc(!desc)} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm">Ngày {desc ? "↓" : "↑"}</button>
        <Link href="/projects/new" className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"><Plus size={16} /> Project mới</Link>
      </div>
      {items === null ? (
        <div className="grid grid-cols-2 gap-4">{[0, 1].map((i) => <div key={i} className="h-44 animate-pulse rounded-lg bg-zinc-900" />)}</div>
      ) : shown.length === 0 ? (
        <EmptyState title="Chưa có project nào" hint="Bấm “Project mới” để bắt đầu." />
      ) : (
        <div className="grid grid-cols-2 gap-4">{shown.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
