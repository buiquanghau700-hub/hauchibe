import type { Project, Page, SpeechBubble, GlossaryEntry, SourceAdapter, SearchResult, Chapter } from "@/types";

const svg = (t: string, c: string, w = 800, h = 1200) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${c}"/><text x="${w / 2}" y="${h / 2}" font-size="${w / 10}" fill="#fff" fill-opacity=".6" text-anchor="middle" font-family="sans-serif">${t}</text></svg>`)}`;

export const projects: Project[] = [
  { id: "p1", source: "TappyToon", langFrom: "EN", langTo: "VI", totalChapters: 110, progress: 34, status: "in_progress", updatedAt: "2026-10-03", glossaryId: "g1",
    info: { coverUrl: svg("Solo", "#7f1d1d", 400, 560), title: "Tôi Thăng Cấp Một Mình", originalTitle: "Solo Leveling", author: "Chugong",
      summary: "Thợ săn yếu nhất thế giới bất ngờ nhận được hệ thống cho phép anh thăng cấp không giới hạn.",
      characters: [{ name: "Sung Jinwoo", role: "Nhân vật chính", note: "Xưng 'tôi'" }, { name: "Cha Hae-In", role: "Thợ săn S-rank", note: "" }, { name: "Go Gunhee", role: "Chủ tịch hội", note: "" }] } },
  { id: "p2", source: "TruyenQQKo", langFrom: "KO", langTo: "VI", totalChapters: 42, progress: 100, status: "exported", updatedAt: "2026-09-18", glossaryId: "g1",
    info: { coverUrl: svg("Moon", "#1e3a5f", 400, 560), title: "Nguyệt Quang Kiếm Sĩ", originalTitle: "월광검사", author: "Han Seo", characters: [], summary: "Kiếm sĩ dưới ánh trăng." } },
];

export const chapters: Chapter[] = Array.from({ length: 8 }, (_, i) => ({
  id: `c${110 - i}`, projectId: "p1", number: 110 - i, title: `Chapter ${110 - i}`, publishedAt: `2026-09-${20 - i}`,
  state: i === 0 ? "translating" : i < 3 ? "downloaded" : "remote",
}));

const raw: [string, string, boolean][][] = [
  [["HUFF... HUFF...", "Haaah... haaah...", true], ["I can't die here.", "Mình không thể chết ở đây.", false]],
  [["Sung Jinwoo, rank E.", "Sung Jinwoo, hạng E.", true], ["Are you alright?", "Anh ổn chứ?", false], ["Stay behind me!", "Đứng sau tôi!", false]],
  [["The gate is closing!", "Cổng đang đóng lại!", false], ["RUN!", "CHẠY ĐI!", false]],
  [["[Arise.]", "[Trỗi dậy.]", true], ["What is this power?", "Sức mạnh này là gì vậy?", false], ["I feel stronger.", "Mình thấy mạnh hơn.", false], ["...", "...", false]],
  [["Hunter Association, Seoul.", "Hiệp hội Thợ săn, Seoul.", true], ["We need a report.", "Chúng ta cần một bản báo cáo.", false]],
  [["See you tomorrow.", "Hẹn mai gặp lại.", false], ["Level up!", "Thăng cấp!", true]],
];
const statuses = ["translated", "translated", "ocr", "ocr", "none", "none"] as const;

export const pages: Page[] = raw.map((_, i) => ({ id: `pg${i + 1}`, order: i + 1, status: statuses[i], imageUrl: svg(`Trang ${i + 1}`, ["#27272a", "#3f3f46", "#52525b", "#44403c", "#3b3b4f", "#2f3e3a"][i]) }));

export const bubbles: SpeechBubble[] = raw.flatMap((list, pi) =>
  list.map(([o, t, g], bi): SpeechBubble => ({
    id: `b${pi + 1}-${bi + 1}`, pageId: `pg${pi + 1}`, originalText: o, translatedText: t, glossaryHit: g,
    status: pi < 2 ? "translated" : "pending",
    bbox: { x: 8 + (bi % 2) * 44, y: 8 + bi * 22, w: 40, h: 16 },
    font: { family: "Be Vietnam Pro", size: 16, color: "#000000", align: "center", bold: false, italic: false },
  })));

export const glossary: GlossaryEntry[] = [
  ["Sung Jinwoo", "Sung Jinwoo", "character"], ["HUFF", "Haaah", "term"], ["Hunter", "Thợ săn", "term"], ["Gate", "Cổng", "term"],
  ["Arise", "Trỗi dậy", "skill"], ["Seoul", "Seoul", "place"], ["Hyung", "Anh", "honorific"], ["Shadow Monarch", "Quân Vương Bóng Tối", "skill"],
].map(([source, target, kind], i) => ({ id: `gl${i + 1}`, source, target, kind: kind as GlossaryEntry["kind"], note: "", scope: i < 5 ? "project" : "global" }));

export const adapters: SourceAdapter[] = [
  { id: "tappytoon", name: "TappyToon", enabled: true, baseUrl: "https://tappytoon.com" },
  { id: "truyenqqko", name: "TruyenQQKo", enabled: true, baseUrl: "https://truyenqq.example" },
];

export const searchResults: SearchResult[] = [
  { id: "s1", adapterId: "tappytoon", coverUrl: svg("Solo", "#7f1d1d", 400, 560), title: "Solo Leveling", author: "Chugong", status: "Hoàn thành", totalChapters: 110 },
  { id: "s2", adapterId: "tappytoon", coverUrl: svg("Tower", "#14532d", 400, 560), title: "Tower of God", author: "SIU", status: "Đang ra", totalChapters: 640 },
];
