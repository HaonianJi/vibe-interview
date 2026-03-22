"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInterviewPage() {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [mode, setMode] = useState("sync");
  const [timeLimitMin, setTimeLimitMin] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          candidateEmail,
          mode,
          timeLimitMin,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create interview");
      }

      const interview = await res.json();
      router.push(`/interview/${interview.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-container py-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-8">New Interview</h1>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="label" htmlFor="candidateName">
            Candidate Name
          </label>
          <input
            id="candidateName"
            className="input"
            type="text"
            required
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="label" htmlFor="candidateEmail">
            Candidate Email
          </label>
          <input
            id="candidateEmail"
            className="input"
            type="email"
            required
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="label" htmlFor="mode">
            Mode
          </label>
          <select
            id="mode"
            className="input"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="sync">Sync (live)</option>
            <option value="async">Async (take-home)</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="timeLimitMin">
            Time Limit (minutes)
          </label>
          <input
            id="timeLimitMin"
            className="input"
            type="number"
            min={15}
            max={480}
            value={timeLimitMin}
            onChange={(e) => setTimeLimitMin(Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Interview"}
        </button>
      </form>
    </div>
  );
}
