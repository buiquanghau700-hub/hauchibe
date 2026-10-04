"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FilePlus, Globe, BookA, Download, Settings, Languages } from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutGrid }, { href: "/projects/new", label: "Project mới", icon: FilePlus },
  { href: "/sources", label: "Nguồn truyện", icon: Globe }, { href: "/glossary", label: "Glossary", icon: BookA },
  { href: "/export", label: "Xuất bản", icon: Download }, { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900">
      <div className="flex items-center gap-2 px-4 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-600"><Languages size={18} /></span>
        <span className="font-semibold">RedTranslate</span>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-red-600/15 text-red-400" : "text-zinc-400 hover:bg-zinc-800"}`}>
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
