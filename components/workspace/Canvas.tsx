"use client";
import { Eye, ZoomIn, ZoomOut } from "lucide-react";
import { useWorkspace } from "@/store/workspace";

export function Canvas() {
  const { pages, bubbles, pageId, bubbleId, zoom, after, selectBubble, setZoom, toggleAfter } = useWorkspace();
  const page = pages.find((p) => p.id === pageId);
  const list = bubbles.filter((b) => b.pageId === pageId);
  const btn = "rounded-lg border border-zinc-700 bg-zinc-900/90 p-2 hover:bg-zinc-800";

  return (
    <div className="relative min-w-0 flex-1 bg-zinc-950">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button className={btn} onClick={() => setZoom(zoom - 0.1)}><ZoomOut size={16} /></button>
        <span className="grid place-items-center text-xs">{Math.round(zoom * 100)}%</span>
        <button className={btn} onClick={() => setZoom(zoom + 0.1)}><ZoomIn size={16} /></button>
        <button className={`${btn} flex items-center gap-1 text-sm ${after ? "border-red-500 text-red-400" : ""}`} onClick={toggleAfter}><Eye size={16} /> {after ? "Sau" : "Trước"}</button>
      </div>
      <div className="h-full overflow-auto p-6">
        {page && (
          <div className="relative mx-auto" style={{ width: 600 * zoom }}>
            <img src={page.imageUrl} alt="" draggable={false} className="block w-full rounded" />
            {list.map((b) => (
              <div key={b.id} onClick={() => selectBubble(b.id)}
                className={`absolute flex cursor-pointer items-center overflow-hidden border-2 ${b.id === bubbleId ? "border-red-500 bg-red-500/10" : "border-zinc-300/50"} ${after ? "bg-white" : ""}`}
                style={{ left: `${b.bbox.x}%`, top: `${b.bbox.y}%`, width: `${b.bbox.w}%`, height: `${b.bbox.h}%` }}>
                {after && (
                  <span className="w-full leading-tight" style={{ fontSize: b.font.size * zoom * 0.8, color: b.font.color, textAlign: b.font.align, fontWeight: b.font.bold ? 700 : 400, fontStyle: b.font.italic ? "italic" : "normal", fontFamily: b.font.family }}>{b.translatedText}</span>
                )}
                {b.glossaryHit && <span className="absolute -top-0.5 left-0 rounded-br bg-red-600 px-1 text-[10px] text-white">Glossary</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
