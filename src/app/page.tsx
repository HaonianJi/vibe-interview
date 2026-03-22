import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

const t = {
  en: {
    title: "Question Bank",
    subtitle: "Browse all available assessment questions",
    basic: "Basic Questions",
    basicDesc: "60-minute individual challenges",
    advanced: "Comprehensive Assessment",
    advancedDesc: "6-8 hour research-integrated challenge",
    viewDetails: "View Details",
    langSwitch: "中文",
    langHref: "/questions?lang=zh",
  },
  zh: {
    title: "题库",
    subtitle: "浏览所有可用的考核题目",
    basic: "基础题",
    basicDesc: "60 分钟独立挑战",
    advanced: "综合考核",
    advancedDesc: "6-8 小时科研综合挑战",
    viewDetails: "查看详情",
    langSwitch: "English",
    langHref: "/questions?lang=en",
  },
};

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang = rawLang === "zh" ? "zh" : "en";
  const i = t[lang];
  const questions = getAllQuestions(lang);

  const basic = questions.filter((q) => q.id !== "16-research-field-navigator");
  const advanced = questions.filter((q) => q.id === "16-research-field-navigator");

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-blue-100 text-blue-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="site-container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{i.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{i.subtitle}</p>
        </div>
        <Link
          href={i.langHref}
          className="btn-secondary no-underline text-sm"
        >
          {i.langSwitch}
        </Link>
      </div>

      {/* Advanced / Comprehensive */}
      {advanced.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            {i.advanced}
            <span className="text-xs font-normal text-gray-400 ml-1">{i.advancedDesc}</span>
          </h2>
          {advanced.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}?lang=${lang}`}
              className="card p-6 mb-4 block no-underline hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{q.description}</p>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <span className={`badge ${difficultyColor[q.difficulty] || ""}`}>
                    {q.difficulty}
                  </span>
                  <span className="badge">{q.duration}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="mb-8" />
        </>
      )}

      {/* Basic Questions */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
        {i.basic}
        <span className="text-xs font-normal text-gray-400 ml-1">{i.basicDesc}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {basic.map((q) => (
          <Link
            key={q.id}
            href={`/questions/${q.id}?lang=${lang}`}
            className="card p-5 no-underline hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{q.title}</h3>
              <span className={`badge text-xs ${difficultyColor[q.difficulty] || ""}`}>
                {q.difficulty}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{q.description}</p>
            <div className="mt-3 text-xs text-blue-600 font-medium">{i.viewDetails} &rarr;</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
