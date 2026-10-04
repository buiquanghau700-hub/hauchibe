import type { Chapter, ExportConfig, GlossaryEntry, Lang, Page, Project, SearchResult, SourceAdapter, SpeechBubble } from "@/types";
export interface OcrService { detectBubbles(pageId: string): Promise<SpeechBubble[]> }
export interface TranslateService { translate(text: string, from: Lang, to: Lang): Promise<string>; applyGlossary(text: string, g: GlossaryEntry[]): Promise<string> }
export interface InpaintService { inpaint(pageId: string): Promise<string> }
export interface SourceService { adapters(): Promise<SourceAdapter[]>; search(q: string, adapterId: string): Promise<SearchResult[]>; chapters(resultId: string): Promise<Chapter[]> }
export interface ExportService { run(cfg: ExportConfig, onProgress: (pct: number) => void): Promise<void> }
export interface ProjectService { list(): Promise<Project[]>; pages(chapterId: string): Promise<Page[]>; bubbles(chapterId: string): Promise<SpeechBubble[]>; glossary(): Promise<GlossaryEntry[]>; save(): Promise<void> }
