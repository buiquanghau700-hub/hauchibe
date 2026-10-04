# RedTranslate (frontend)

## Cài & chạy
```bash
npm install
npm run dev     # http://localhost:3000
```
Thêm shadcn/ui khi cần: `npx shadcn@latest init` (Tailwind v3, alias `@/*`).

## Cấu trúc
```
types/        Project, Page, SpeechBubble, GlossaryEntry...
mock/         dữ liệu mẫu (2 project, 6 trang, 8 glossary, 2 nguồn)
services/     interface (types.ts) + bản mock (index.ts) — thay bằng API thật tại đây
store/        zustand: workspace, toast
components/   Sidebar, ProjectCard, ui/*, workspace/{Toolbar,PageList,Canvas,BubblePanel}
app/          page.tsx (Dashboard), workspace/, và các route còn lại (placeholder)
```
