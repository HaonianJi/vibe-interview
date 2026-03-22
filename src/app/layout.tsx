import type { Metadata } from "next";
import Link from "next/link";
import { NavAdmin } from "./nav-admin";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeInterview — Coding Assessment",
  description: "Intern vibe coding assessment platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50">
          <div className="mx-auto mt-2 sm:mt-3 px-3 sm:px-6 max-w-5xl">
          <div className="bg-white/80 backdrop-blur-xl border border-[var(--border)] rounded-full px-4 sm:px-6 flex items-center justify-between h-11 shadow-[var(--shadow-xs)]">
            <Link href="/" className="text-base font-bold text-[var(--text-primary)] no-underline tracking-tight">
              Vibe<span className="text-[var(--accent)]">Interview</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-3 text-sm">
              <Link href="/" className="px-3 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] no-underline text-[13px] font-medium transition-colors">
                Questions
              </Link>
              <Link href="/submit" className="px-3 py-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] no-underline text-[13px] font-medium transition-colors">
                Submit
              </Link>
              <NavAdmin />
            </nav>
          </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-8 mt-16 text-center text-xs text-[var(--text-tertiary)]">
          VibeInterview &middot; Intern Assessment
        </footer>
      </body>
    </html>
  );
}
