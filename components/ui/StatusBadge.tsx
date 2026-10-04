const MAP: Record<string, string> = {
  in_progress: "bg-amber-500/15 text-amber-400", translated: "bg-emerald-500/15 text-emerald-400",
  exported: "bg-emerald-500/15 text-emerald-400", none: "bg-zinc-700/40 text-zinc-400", ocr: "bg-amber-500/15 text-amber-400",
  pending: "bg-zinc-700/40 text-zinc-400", edited: "bg-amber-500/15 text-amber-400", error: "bg-red-500/15 text-red-400",
};
const LABEL: Record<string, string> = {
  in_progress: "Đang làm dở", translated: "Đã dịch xong", exported: "Đã xuất", none: "Chưa OCR", ocr: "Đã OCR",
  pending: "Chưa dịch", edited: "Đã sửa", error: "Lỗi",
};
export function StatusBadge({ status }: { status: string }) {
  return <span className={`rounded px-1.5 py-0.5 text-xs ${MAP[status]}`}>{LABEL[status] ?? status}</span>;
}
