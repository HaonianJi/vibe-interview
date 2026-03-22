"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SubmitForm() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "zh" ? "zh" : "en";
  const isZh = lang === "zh";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [github, setGithub] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, field, github, repoUrl, question, notes }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="site-container py-16 max-w-lg text-center">
        <div className="card p-10">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-xl font-bold mb-2">{isZh ? "提交成功！" : "Submitted!"}</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {isZh
              ? "你的提交已记录，我们会尽快审核。"
              : "Your submission has been recorded. We'll review it shortly."}
          </p>
          <Link href={`/?lang=${lang}`} className="btn-secondary no-underline text-sm">
            {isZh ? "← 返回题库" : "← Back to Questions"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container py-8 sm:py-12 max-w-xl">
      <Link
        href={`/?lang=${lang}`}
        className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] no-underline mb-6 inline-block"
      >
        &larr; {isZh ? "返回题库" : "Back"}
      </Link>

      <div className="card p-5 sm:p-8">
        <h1 className="text-xl font-bold mb-1">{isZh ? "提交作品" : "Submit Your Work"}</h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-6">
          {isZh
            ? "完成题目后，在这里提交你的 GitHub 仓库链接和相关信息。"
            : "After completing a question, submit your GitHub repo link and info here."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-[var(--error-light)] text-[var(--error)] px-4 py-3 rounded-[var(--radius-xs)] text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">{isZh ? "姓名 *" : "Name *"}</label>
              <input className="input" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={isZh ? "张三" : "Jane Doe"} />
            </div>
            <div>
              <label className="label">{isZh ? "邮箱 *" : "Email *"}</label>
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">{isZh ? "研究方向" : "Research Field"}</label>
              <input className="input" type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder={isZh ? "计算机视觉、NLP..." : "CV, NLP, Robotics..."} />
            </div>
            <div>
              <label className="label">{isZh ? "GitHub 用户名" : "GitHub Username"}</label>
              <input className="input" type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="username" />
            </div>
          </div>

          <div>
            <label className="label">{isZh ? "完成的题目 *" : "Question Completed *"}</label>
            <select className="input" required value={question} onChange={(e) => setQuestion(e.target.value)}>
              <option value="">{isZh ? "请选择..." : "Select..."}</option>
              <option value="02-kanban-board">Kanban Board</option>
              <option value="05-realtime-poll">Real-Time Polling App</option>
              <option value="08-chat-room">Chat Room</option>
              <option value="10-quiz-builder">Quiz Builder</option>
              <option value="14-url-shortener">URL Shortener</option>
              <option value="15-movie-watchlist">Movie Watchlist</option>
              <option value="16-research-field-navigator">Research Field Navigator</option>
            </select>
          </div>

          <div>
            <label className="label">{isZh ? "GitHub 仓库地址 *" : "GitHub Repository URL *"}</label>
            <input
              className="input"
              type="url"
              required
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
            />
            <p className="text-[11px] text-[var(--text-tertiary)] mt-1">
              {isZh ? "请确保仓库是公开的，且包含完整的 README" : "Make sure the repo is public and includes a complete README"}
            </p>
          </div>

          <div>
            <label className="label">{isZh ? "补充说明（选填）" : "Additional Notes (optional)"}</label>
            <textarea
              className="input"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isZh ? "部署链接、设计说明、遇到的困难等..." : "Deployment link, design decisions, challenges..."}
              style={{ resize: "vertical" }}
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading
              ? (isZh ? "提交中..." : "Submitting...")
              : (isZh ? "提交" : "Submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div className="site-container py-16 text-center text-[var(--text-tertiary)]">Loading...</div>}>
      <SubmitForm />
    </Suspense>
  );
}
