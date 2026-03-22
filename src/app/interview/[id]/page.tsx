"use client";

import { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";

interface Interview {
  id: string;
  token: string;
  candidateName: string;
  candidateEmail: string;
  mode: string;
  timeLimitMin: number;
  questionId: string;
  repoUrl: string | null;
  status: string;
  startedAt: string | null;
  submittedAt: string | null;
  createdAt: string;
  question: {
    title: string;
    difficulty: string;
    duration: string;
    content: string;
  } | null;
}

export default function InterviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchInterview = useCallback(async () => {
    try {
      const res = await fetch(`/api/interviews/${id}`);
      if (!res.ok) throw new Error("Failed to load interview");
      const data = await res.json();
      setInterview(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInterview();
  }, [fetchInterview]);

  function copyExamLink() {
    if (!interview) return;
    const url = `${window.location.origin}/exam/${interview.token}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="site-container py-10 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="site-container py-10 text-center text-red-500">
        Interview not found
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-600",
    in_progress: "bg-blue-100 text-blue-700",
    submitted: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="site-container py-10 max-w-3xl">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block"
      >
        &larr; Back to Dashboard
      </Link>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded text-sm mb-6">
          {error}
        </div>
      )}

      {/* Candidate Info */}
      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{interview.candidateName}</h1>
            <p className="text-gray-500 text-sm">{interview.candidateEmail}</p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[interview.status] || "bg-gray-100 text-gray-600"}`}
          >
            {interview.status.replace("_", " ")}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Mode</span>
            <p className="font-medium uppercase">{interview.mode}</p>
          </div>
          <div>
            <span className="text-gray-400">Time Limit</span>
            <p className="font-medium">{interview.timeLimitMin} min</p>
          </div>
          <div>
            <span className="text-gray-400">Created</span>
            <p className="font-medium">
              {new Date(interview.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={copyExamLink} className="btn-secondary text-sm">
            {copied ? "Copied!" : "Copy Exam Link"}
          </button>
        </div>
      </div>

      {/* Question */}
      {interview.question && (
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {interview.question.title}
          </h2>
          <div className="flex gap-3 mb-4">
            <span className="badge">{interview.question.difficulty}</span>
            <span className="badge">{interview.question.duration}</span>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
            {interview.question.content}
          </pre>
        </div>
      )}

      {/* Repo URL */}
      {interview.repoUrl && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Submitted Repository</h2>
          <a
            href={
              interview.repoUrl.startsWith("http")
                ? interview.repoUrl
                : `https://github.com/${interview.repoUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {interview.repoUrl}
          </a>
          {interview.submittedAt && (
            <p className="text-xs text-gray-400 mt-2">
              Submitted at {new Date(interview.submittedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
