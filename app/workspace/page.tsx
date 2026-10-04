"use client";
import { useEffect } from "react";
import { useWorkspace } from "@/store/workspace";
import { projectService } from "@/services";
import { Toolbar } from "@/components/workspace/Toolbar";
import { PageList } from "@/components/workspace/PageList";
import { Canvas } from "@/components/workspace/Canvas";
import { BubblePanel } from "@/components/workspace/BubblePanel";

export default function Workspace() {
  const { load, step, zoom, setZoom, toggleAfter, pages } = useWorkspace();

  useEffect(() => { Promise.all([projectService.pages("c110"), projectService.bubbles("c110")]).then(([p, b]) => load(p, b)); }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (e.key === "]") step(1); if (e.key === "[") step(-1);
      if (e.key === "+" || e.key === "=") setZoom(zoom + 0.1); if (e.key === "-") setZoom(zoom - 0.1);
      if (e.key.toLowerCase() === "b") toggleAfter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, zoom, setZoom, toggleAfter]);

  if (pages.length === 0) return <div className="p-6"><div className="h-96 animate-pulse rounded-lg bg-zinc-900" /></div>;
  return (
    <div className="flex h-full flex-col">
      <Toolbar />
      <div className="flex min-h-0 flex-1"><PageList /><Canvas /><BubblePanel /></div>
    </div>
  );
}
