import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({ subsets: ["latin", "vietnamese"] });
export const metadata: Metadata = { title: "RedTranslate" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.className} flex h-screen min-w-[1280px]`}>
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
