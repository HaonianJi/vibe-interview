"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInterviewPage() {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [field, setField] = useState("");
  const [track, setTrack] = useState("advanced");
  const [github, setGithub] = useState("");
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
          field,
          track,
          github,
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
            Email
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
          <label className="label" htmlFor="field">
            Research Field
          </label>
          <input
            id="field"
            className="input"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="Computer Vision, NLP, Robotics..."
          />
        </div>

        <div>
          <label className="label" htmlFor="track">
            Assessment Track
          </label>
          <select
            id="track"
            className="input"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          >
            <option value="basic">Basic (60 min, random question)</option>
            <option value="advanced">Advanced (6-8 hrs, Research Field Navigator)</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="github">
            GitHub Username (optional)
          </label>
          <input
            id="github"
            className="input"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="username"
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
