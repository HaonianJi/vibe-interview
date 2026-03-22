import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeInterview — Coding Assessment Platform",
  description: "PhD intern vibe coding assessment platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
            <Link href="/" className="text-lg font-bold text-gray-900 no-underline">
              Vibe<span className="text-blue-600">Interview</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/questions" className="text-gray-600 hover:text-gray-900 no-underline">Questions</Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 no-underline">Dashboard</Link>
              <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium no-underline">+ New</Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 py-6 mt-12 text-center text-xs text-gray-400">
          VibeInterview — PhD Intern Assessment
        </footer>
      </body>
    </html>
  );
}
