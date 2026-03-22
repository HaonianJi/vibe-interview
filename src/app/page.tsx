import { getAllInterviews } from "@/lib/notion";
import { getQuestion } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const interviews = await getAllInterviews();

  const statusBadge = (status: string) => {
    const cls: Record<string, string> = {
      registered: "bg-gray-100 text-gray-600",
      in_progress: "bg-blue-100 text-blue-700",
      submitted: "bg-green-100 text-green-700",
    };
    return cls[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="site-container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Interviews</h1>
          <p className="text-gray-500 text-sm mt-1">
            {interviews.length} total
          </p>
        </div>
        <Link href="/new" className="btn-primary text-white no-underline">
          + New Interview
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-4">No interviews yet</p>
          <Link href="/new" className="btn-primary text-white no-underline">
            Create your first interview
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Candidate
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Question
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Repo
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((iv) => {
                const q = getQuestion(iv.questionId);
                return (
                  <tr
                    key={iv.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/interview/${iv.id}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {iv.candidateName}
                      </Link>
                      <div className="text-xs text-gray-400">
                        {iv.candidateEmail}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {q?.title || iv.questionId}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(iv.status)}`}
                      >
                        {iv.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {iv.repoUrl ? (
                        <a
                          href={iv.repoUrl.startsWith("http") ? iv.repoUrl : `https://github.com/${iv.repoUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-300">&mdash;</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-gray-400">
                      {iv.createdAt ? new Date(iv.createdAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
