"use client";

import { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";

interface Grade {
  id: string;
  functionalityScore: number;
  codeQualityScore: number;
  productSenseScore: number;
  techChoiceScore: number;
  documentationScore: number;
  totalScore: number;
  detailedFeedback: string;
  gradedAt: string;
}

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
  grade: Grade | null;
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
  const [grading, setGrading] = useState(false);
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

  async function handleGrade() {
    if (!interview) return;
    setGrading(true);
    setError("");
    try {
      const res = await fetch(`/api/interviews/${interview.id}/grade`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Grading failed");
      }
      await fetchInterview();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Grading failed");
    } finally {
      setGrading(false);
    }
  }

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
    graded: "bg-green-100 text-green-700",
  };

  const dimensions = interview.grade
    ? [
        {
          label: "Functionality",
          score: interview.grade.functionalityScore,
          weight: "35%",
        },
        {
          label: "Code Quality",
          score: interview.grade.codeQualityScore,
          weight: "25%",
        },
        {
          label: "Product Sense",
          score: interview.grade.productSenseScore,
          weight: "20%",
        },
        {
          label: "Tech Choice",
          score: interview.grade.techChoiceScore,
          weight: "10%",
        },
        {
          label: "Documentation",
          score: interview.grade.documentationScore,
          weight: "10%",
        },
      ]
    : [];

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

        <div className="mt-4 flex gap-3">
          <button onClick={copyExamLink} className="btn-secondary text-sm">
            {copied ? "Copied!" : "Copy Exam Link"}
          </button>
          {interview.status === "submitted" && !interview.grade && (
            <button
              onClick={handleGrade}
              disabled={grading}
              className="btn-primary text-sm"
            >
              {grading ? "Grading..." : "AI Grade"}
            </button>
          )}
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
        <div className="card p-6 mb-6">
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
        </div>
      )}

      {/* Grade Report */}
      {interview.grade && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Grade Report</h2>
            <span className="text-3xl font-bold text-blue-600">
              {interview.grade.totalScore.toFixed(1)}
              <span className="text-base text-gray-400 font-normal"> / 5</span>
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {dimensions.map((dim) => (
              <div key={dim.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {dim.label}
                  </span>
                  <span className="text-gray-500">
                    {dim.score}/5 ({dim.weight})
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${(dim.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-sm text-gray-600 mb-2">
              Detailed Feedback
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {interview.grade.detailedFeedback}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
