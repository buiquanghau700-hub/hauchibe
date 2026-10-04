export type Lang = "EN" | "JA" | "KO" | "ZH" | "VI";
export type ProjectStatus = "in_progress" | "translated" | "exported";
export type PageStatus = "none" | "ocr" | "translated" | "exported";
export type BubbleStatus = "pending" | "translated" | "edited" | "error";
export interface Character { name: string; role: string; note: string }
export interface ComicInfo { coverUrl: string; title: string; originalTitle: string; author: string; characters: Character[]; summary: string }
export interface Project { id: string; info: ComicInfo; source: string; langFrom: Lang; langTo: Lang; totalChapters: number; progress: number; status: ProjectStatus; updatedAt: string; glossaryId: string }
export interface Chapter { id: string; projectId: string; number: number; title: string; publishedAt: string; state: "remote" | "downloaded" | "translating" | "translated" }
export interface Page { id: string; order: number; imageUrl: string; status: PageStatus }
export interface BubbleFont { family: string; size: number; color: string; align: "left" | "center" | "right"; bold: boolean; italic: boolean }
/** bbox tính theo % kích thước ảnh (0-100) */
export interface SpeechBubble { id: string; pageId: string; bbox: { x: number; y: number; w: number; h: number }; originalText: string; translatedText: string; font: BubbleFont; status: BubbleStatus; glossaryHit: boolean }
export interface GlossaryEntry { id: string; source: string; target: string; kind: "character" | "term" | "honorific" | "place" | "skill"; note: string; scope: "global" | "project" }
export interface SourceAdapter { id: string; name: string; enabled: boolean; baseUrl?: string }
export interface SearchResult { id: string; adapterId: string; coverUrl: string; title: string; author: string; status: string; totalChapters: number }
export interface ExportConfig { chapterIds: string[]; format: "png" | "jpg"; quality: number; folderPerChapter: boolean; zip: "none" | "per_chapter" | "single"; outputDir: string }
export interface AppSettings { geminiApiKey: string; model: string; defaultFrom: Lang; defaultTo: Lang; defaultFont: string; defaultSize: number; defaultColor: string; dataDir: string }
