"use client";

import { useEffect, useState, useCallback, useRef, use } from "react";

interface ExamData {
  id: string;
  candidateName: string;
  status: string;
  timeLimitMin: number;
  startedAt: string | null;
  submittedAt: string | null;
  question: {
    title: string;
    difficulty: string;
    duration: string;
    content: string;
  } | null;
  timeRemainingSeconds: number | null;
}

export default function ExamPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchExam = useCallback(async () => {
    try {
      const res = await fetch(`/api/exam/${token}`);
      if (!res.ok) throw new Error("Failed to load exam");
      const data = await res.json();
      setExam(data);
      if (data.timeRemainingSeconds !== null) {
        setTimeRemaining(data.timeRemainingSeconds);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam?.status]);

  async function handleStart() {
    setError("");
    try {
      const res = await fetch(`/api/exam/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start");
      }
      await fetchExam();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to start");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/exam/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", repoUrl: repoUrl.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }
      await fetchExam();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <div className="site-container py-10 text-center text-gray-400">
        Loading exam...
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="site-container py-10 text-center text-red-500">
        {error || "Exam not found"}
      </div>
    );
  }

  // Submitted state
  if (exam.status === "submitted" || exam.status === "graded") {
    return (
      <div className="site-container py-10 max-w-2xl">
        <div className="card p-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-500">
            Your submission has been received. The interviewer will review it
            shortly.
          </p>
        </div>
      </div>
    );
  }

  // Pending state — show start button
  if (exam.status === "pending") {
    return (
      <div className="site-container py-10 max-w-2xl">
        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-2">
            {exam.question?.title || "Coding Interview"}
          </h1>
          {exam.question && (
            <div className="flex gap-3 mb-4">
              <span className="badge">{exam.question.difficulty}</span>
              <span className="badge">{exam.question.duration}</span>
            </div>
          )}
          <p className="text-gray-500 mb-6">
            Welcome, <strong>{exam.candidateName}</strong>. You have{" "}
            <strong>{exam.timeLimitMin} minutes</strong> to complete this
            challenge. The timer starts when you click the button below.
          </p>
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded text-sm mb-4">
              {error}
            </div>
          )}
          <button onClick={handleStart} className="btn-primary">
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // In-progress state
  return (
    <div className="site-container py-10 max-w-3xl">
      {/* Timer bar */}
      {timeRemaining !== null && (
        <div
          className={`sticky top-0 z-10 mb-6 p-3 rounded text-center font-mono text-lg font-bold ${
            timeRemaining <= 300
              ? "bg-red-100 text-red-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          Time Remaining: {formatTime(timeRemaining)}
          {timeRemaining <= 0 && (
            <span className="block text-sm font-normal mt-1">
              Time is up! Please submit your work.
            </span>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded text-sm mb-6">
          {error}
        </div>
      )}

      {/* Question */}
      {exam.question && (
        <div className="card p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{exam.question.title}</h1>
          <div className="flex gap-3 mb-4">
            <span className="badge">{exam.question.difficulty}</span>
            <span className="badge">{exam.question.duration}</span>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
            {exam.question.content}
          </pre>
        </div>
      )}

      {/* Submit form */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Submit Your Solution</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="repoUrl">
              GitHub Repository URL
            </label>
            <input
              id="repoUrl"
              className="input"
              type="text"
              required
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo or username/repo"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting || !repoUrl.trim()}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
