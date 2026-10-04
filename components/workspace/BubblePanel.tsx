"use client";
import { AlignCenter, AlignLeft, AlignRight, Bold, ChevronLeft, ChevronRight, Italic, RefreshCw, BookA } from "lucide-react";
import { useWorkspace } from "@/store/workspace";
import { useToast } from "@/store/toast";
import { projectService, translateService } from "@/services";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const FONTS = ["Be Vietnam Pro", "Patrick Hand", "Comic Neue", "Inter"];

export function BubblePanel() {
  const { bubbles, bubbleId, patchBubble, patchFont, step } = useWorkspace();
  const push = useToast((s) => s.push);
  const b = bubbles.find((x) => x.id === bubbleId);
  if (!b) return <aside className="w-80 shrink-0 border-l border-zinc-800 bg-zinc-900 p-3"><EmptyState title="Chưa chọn bóng thoại" hint="Bấm vào khung đỏ trên trang." /></aside>;

  const retranslate = async () => { patchBubble(b.id, { translatedText: await translateService.translate(b.originalText, "EN", "VI"), status: "translated" }); push("Đã dịch lại"); };
  const glossary = async () => { patchBubble(b.id, { translatedText: await translateService.applyGlossary(b.translatedText, await projectService.glossary()) }); push("Đã áp glossary"); };
  const btn = "inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-sm hover:bg-zinc-700";
  const tog = (on: boolean) => `rounded-lg border p-1.5 ${on ? "border-red-500 text-red-400" : "border-zinc-700"}`;

  return (
    <aside className="flex w-80 shrink-0 flex-col gap-3 overflow-auto border-l border-zinc-800 bg-zinc-900 p-3 text-sm">
      <div className="flex items-center justify-between"><span className="font-medium">Bóng thoại</span><StatusBadge status={b.status} /></div>
      <label className="text-xs text-zinc-500">Text gốc</label>
      <div className="rounded-lg bg-zinc-950 p-2">{b.originalText}</div>
      <label className="text-xs text-zinc-500">Bản dịch</label>
      <textarea rows={4} value={b.translatedText} onChange={(e) => patchBubble(b.id, { translatedText: e.target.value, status: "edited" })} className="rounded-lg border border-zinc-800 bg-zinc-950 p-2" />
      <div className="flex gap-2"><button className={btn} onClick={retranslate}><RefreshCw size={14} /> Dịch lại</button><button className={btn} onClick={glossary}><BookA size={14} /> Áp glossary</button></div>
      <hr className="border-zinc-800" />
      <select value={b.font.family} onChange={(e) => patchFont(b.id, { family: e.target.value })} className="rounded-lg border border-zinc-800 bg-zinc-950 p-2">{FONTS.map((f) => <option key={f}>{f}</option>)}</select>
      <div className="flex items-center gap-2">
        <input type="number" min={8} max={72} value={b.font.size} onChange={(e) => patchFont(b.id, { size: +e.target.value })} className="w-16 rounded-lg border border-zinc-800 bg-zinc-950 p-1.5" />
        <input type="color" value={b.font.color} onChange={(e) => patchFont(b.id, { color: e.target.value })} className="h-8 w-10 rounded bg-transparent" />
        {(["left", "center", "right"] as const).map((a, i) => { const I = [AlignLeft, AlignCenter, AlignRight][i]; return <button key={a} className={tog(b.font.align === a)} onClick={() => patchFont(b.id, { align: a })}><I size={14} /></button>; })}
        <button className={tog(b.font.bold)} onClick={() => patchFont(b.id, { bold: !b.font.bold })}><Bold size={14} /></button>
        <button className={tog(b.font.italic)} onClick={() => patchFont(b.id, { italic: !b.font.italic })}><Italic size={14} /></button>
      </div>
      <div className="mt-auto flex justify-between"><button className={btn} onClick={() => step(-1)}><ChevronLeft size={14} /> Bóng trước</button><button className={btn} onClick={() => step(1)}>Bóng sau <ChevronRight size={14} /></button></div>
    </aside>
  );
}
