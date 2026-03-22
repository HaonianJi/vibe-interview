import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

const t = {
  en: {
    hero: "Vibe Coding Assessment",
    heroSub: "Build real projects with AI-driven development. Show your engineering skills, research creativity, and design taste.",
    warmup: "Warm-up Questions",
    warmupDesc: "Pick one to practice before the main challenge. 60 min each.",
    main: "Main Assessment",
    mainDesc: "The comprehensive challenge — your primary evaluation.",
    view: "View Details",
    langSwitch: "中文",
    langHref: "/?lang=zh",
    track1: "Quick Track",
    track1Desc: "Choose 1 warm-up question to complete in 60 minutes",
    track2: "Full Track",
    track2Desc: "Complete the Research Field Navigator (6-8 hours)",
    tracks: "Assessment Tracks",
    tracksDesc: "Choose your track based on the assessment arrangement",
  },
  zh: {
    hero: "Vibe Coding 考核",
    heroSub: "用 AI 驱动的方式构建真实项目。展示你的工程能力、科研创造力和设计品味。",
    warmup: "热身题",
    warmupDesc: "在正式考核前选一道练练手，每题 60 分钟。",
    main: "正式考核",
    mainDesc: "综合挑战——核心评估环节。",
    view: "查看详情",
    langSwitch: "English",
    langHref: "/?lang=en",
    track1: "快速赛道",
    track1Desc: "选 1 道热身题，60 分钟完成",
    track2: "完整赛道",
    track2Desc: "完成 Research Field Navigator（6-8 小时）",
    tracks: "考核赛道",
    tracksDesc: "根据考核安排选择你的赛道",
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang = rawLang === "zh" ? "zh" : "en";
  const i = t[lang];
  const questions = getAllQuestions(lang);

  const warmup = questions.filter((q) => q.id !== "16-research-field-navigator");
  const main = questions.filter((q) => q.id === "16-research-field-navigator");

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-light)] via-transparent to-transparent opacity-60" />
        <div className="relative site-container py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            {i.hero}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            {i.heroSub}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href={i.langHref} className="text-xs text-[var(--accent)] hover:underline no-underline font-medium">
              {i.langSwitch}
            </Link>
          </div>
        </div>
      </div>

      <div className="site-container pb-12">
        {/* Tracks overview */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">{i.tracks}</h2>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">{i.tracksDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="card p-5 border-l-[3px] border-l-blue-400">
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{i.track1}</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{i.track1Desc}</p>
            </div>
            <div className="card p-5 border-l-[3px] border-l-[var(--accent)]">
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{i.track2}</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{i.track2Desc}</p>
            </div>
          </div>
        </section>

        {/* Main Assessment */}
        {main.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">{i.main}</h2>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mb-4">{i.mainDesc}</p>
            {main.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}?lang=${lang}`}
                className="card p-5 sm:p-6 block no-underline group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{q.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{q.description}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="badge bg-red-50 text-red-600 border-red-100">{q.difficulty}</span>
                    <span className="badge">{q.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Warm-up */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">{i.warmup}</h2>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">{i.warmupDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {warmup.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}?lang=${lang}`}
                className="card p-4 no-underline group block"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">{q.title}</h3>
                  <span className="badge text-[10px] flex-shrink-0">{q.difficulty}</span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed line-clamp-2">{q.description}</p>
                <div className="mt-3 text-xs text-[var(--accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {i.view} &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
