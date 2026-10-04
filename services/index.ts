// Mock implementations. Thay bằng API thật tại đây, UI không cần sửa.
import { adapters, bubbles, chapters, glossary, pages, projects, searchResults } from "@/mock";
import type { ExportService, InpaintService, OcrService, ProjectService, SourceService, TranslateService } from "./types";

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const ocrService: OcrService = { async detectBubbles(pageId) { await wait(); return bubbles.filter((b) => b.pageId === pageId); } };
export const translateService: TranslateService = {
  async translate(text) { await wait(400); return `[AI] ${text}`; },
  async applyGlossary(text, g) { await wait(200); return g.reduce((acc, e) => acc.replaceAll(e.source, e.target), text); },
};
export const inpaintService: InpaintService = { async inpaint(pageId) { await wait(); return pages.find((p) => p.id === pageId)?.imageUrl ?? ""; } };
export const sourceService: SourceService = {
  async adapters() { await wait(200); return adapters; },
  async search(q, adapterId) { await wait(); return searchResults.filter((r) => r.adapterId === adapterId && r.title.toLowerCase().includes(q.toLowerCase())); },
  async chapters() { await wait(); return chapters; },
};
export const exportService: ExportService = {
  async run(_cfg, onProgress) { for (let i = 1; i <= 10; i++) { await wait(150); onProgress(i * 10); } },
};
export const projectService: ProjectService = {
  async list() { await wait(700); return projects; },
  async pages() { await wait(300); return pages; },
  async bubbles() { await wait(300); return bubbles; },
  async glossary() { await wait(300); return glossary; },
  async save() { await wait(300); },
};
