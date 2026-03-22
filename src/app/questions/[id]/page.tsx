import { getQuestion } from "@/lib/questions";
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
    <div className="site-container py-6 sm:py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/?lang=${lang}`}
          className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] no-underline transition-colors"
        >
          &larr; {isZh ? "返回题库" : "Back"}
        </Link>
        <Link
          href={`/questions/${id}?lang=${lang === "zh" ? "en" : "zh"}`}
          className="btn-secondary no-underline text-xs"
        >
          {isZh ? "English" : "中文"}
        </Link>
      </div>

      <div className="card p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{question.title}</h1>
          <div className="flex gap-2 flex-shrink-0">
            <span className={`badge ${question.difficulty === "hard" ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
              {question.difficulty}
            </span>
            <span className="badge">{question.duration}</span>
          </div>
        </div>

        {question.description && (
          <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">{question.description}</p>
        )}

        <div className="border-t border-[var(--border-light)] pt-6">
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
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\d+\.\s+\*\*(.+?)\*\*:\s*(.+)$/gm, '<li><strong>$1</strong>: $2</li>')
    .replace(/^\d+\.\s+\*\*(.+?)\*\*(.*)$/gm, '<li><strong>$1</strong>$2</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li class="list-disc ml-4">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^(?!<)((?!<).+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul>$&</ul>');
}
