import { getQuestion, getAllQuestions } from "@/lib/questions";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function QuestionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang: rawLang } = await searchParams;
  const lang = rawLang === "zh" ? "zh" : "en";
  const question = getQuestion(id, lang);

  if (!question) notFound();

  const isZh = lang === "zh";

  return (
    <div className="site-container py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/questions?lang=${lang}`}
          className="text-sm text-gray-400 hover:text-gray-600 no-underline"
        >
          &larr; {isZh ? "返回题库" : "Back to Questions"}
        </Link>
        <Link
          href={`/questions/${id}?lang=${lang === "zh" ? "en" : "zh"}`}
          className="btn-secondary no-underline text-sm"
        >
          {isZh ? "English" : "中文"}
        </Link>
      </div>

      <div className="card p-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <div className="flex gap-2 ml-4 flex-shrink-0">
            <span className={`badge ${question.difficulty === "hard" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
              {question.difficulty}
            </span>
            <span className="badge">{question.duration}</span>
          </div>
        </div>

        {question.description && (
          <p className="text-gray-500 mb-6">{question.description}</p>
        )}

        <div className="prose prose-sm max-w-none">
          <div
            className="question-content"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(question.content) }}
          />
        </div>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mt-8 mb-3 pb-2 border-b border-gray-200">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-6 mb-3">$1</h1>')
    .replace(/^\d+\.\s+\*\*(.+?)\*\*:\s*(.+)$/gm, '<li class="mb-2"><strong class="text-gray-900">$1</strong>: <span class="text-gray-600">$2</span></li>')
    .replace(/^\d+\.\s+\*\*(.+?)\*\*(.*)$/gm, '<li class="mb-2"><strong class="text-gray-900">$1</strong><span class="text-gray-600">$2</span></li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="mb-2 text-gray-600">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="mb-1 text-gray-600 list-disc ml-4">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">$1</code>')
    .replace(/^(?!<)((?!<).+)$/gm, '<p class="text-gray-600 mb-3">$1</p>')
    .replace(/<p class="text-gray-600 mb-3"><\/p>/g, '')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-decimal pl-5 mb-4 space-y-1">$&</ul>');
}
