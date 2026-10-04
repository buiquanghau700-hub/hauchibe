"use client";
import { Download, Save, ScanText, Languages, BookOpen } from "lucide-react";
import Link from "next/link";
import { useWorkspace } from "@/store/workspace";
import { useToast } from "@/store/toast";
import { ocrService, projectService, translateService } from "@/services";

export function Toolbar() {
  const { pageId, bubbles, progress, setProgress, patchBubble } = useWorkspace();
  const push = useToast((s) => s.push);

  const ocr = async () => { if (pageId) { await ocrService.detectBubbles(pageId); push("OCR xong trang"); } };
  const translate = async (all: boolean) => {
    const list = bubbles.filter((b) => all || b.pageId === pageId);
    for (let i = 0; i < list.length; i++) {
      patchBubble(list[i].id, { translatedText: await translateService.translate(list[i].originalText, "EN", "VI"), status: "translated" });
      setProgress(Math.round(((i + 1) / list.length) * 100));
    }
    push(all ? "Đã dịch toàn chapter" : "Đã dịch toàn trang");
  };
  const btn = "inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700";

  return (
    <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-2">
      <button className={btn} onClick={ocr}><ScanText size={14} /> OCR trang</button>
      <button className={btn} onClick={() => translate(false)}><Languages size={14} /> Dịch toàn trang</button>
      <button className={btn} onClick={() => translate(true)}><BookOpen size={14} /> Dịch toàn chapter</button>
      <div className="mx-3 h-1.5 w-48 rounded bg-zinc-800"><div className="h-full rounded bg-red-500" style={{ width: `${progress}%` }} /></div>
      <span className="mr-auto text-xs text-zinc-500">[ ] đổi bóng · +/- zoom · B trước/sau</span>
      <button className={btn} onClick={async () => { await projectService.save(); push("Đã lưu"); }}><Save size={14} /> Lưu</button>
      <Link href="/export" className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"><Download size={14} /> Xuất</Link>
    </div>
  );
}
