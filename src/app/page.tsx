import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

const t = {
  en: {
    badge: "PhD Intern Assessment 2026",
    hero: "Vibe Coding Assessment",
    heroSub: "Build real projects with AI-driven development. Show your engineering skills, research creativity, and design taste.",
    warmup: "Warm-up",
    warmupDesc: "Pick one to practice. 60 min each.",
    main: "Main Assessment",
    mainDesc: "The comprehensive challenge — your primary evaluation.",
    view: "View Details",
    langSwitch: "中文",
    langHref: "/?lang=zh",
    track1: "Quick Track",
    track1Desc: "Choose 1 warm-up question, 60 minutes",
    track2: "Full Track",
    track2Desc: "Complete the Research Field Navigator, 6-8 hours",
    tracks: "Tracks",
  },
  zh: {
    badge: "博士实习生考核 2026",
    hero: "Vibe Coding 考核",
    heroSub: "用 AI 驱动的方式构建真实项目。展示你的工程能力、科研创造力和设计品味。",
    warmup: "热身题",
    warmupDesc: "选一道练练手，每题 60 分钟。",
    main: "正式考核",
    mainDesc: "综合挑战——核心评估环节。",
    view: "查看详情",
    langSwitch: "English",
    langHref: "/?lang=en",
    track1: "快速赛道",
    track1Desc: "选 1 道热身题，60 分钟完成",
    track2: "完整赛道",
    track2Desc: "完成 Research Field Navigator，6-8 小时",
    tracks: "考核赛道",
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
      <div className="hero-wrapper">
        <div className="site-container py-8 sm:py-14 relative z-10">
          <div className="hero-card max-w-2xl mx-auto">
            <span className="inline-block text-[11px] font-medium tracking-wide uppercase text-[var(--accent)] bg-[var(--accent-light)] px-3 py-1 rounded-full mb-4">
              {i.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              {i.hero}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-5">
              {i.heroSub}
            </p>
            <Link href={i.langHref} className="btn-secondary no-underline text-xs inline-flex">
              {i.langSwitch}
            </Link>
          </div>
        </div>
      </div>

      <div className="site-container pb-16 -mt-2">
        {/* Tracks */}
        <section className="mb-10">
          <div className="section-header">
            <div className="section-dot bg-[var(--accent)]" />
            <span className="section-title">{i.tracks}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="track-card track-quick">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">⚡</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{i.track1}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{i.track1Desc}</p>
            </div>
            <div className="track-card track-full">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🔬</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{i.track2}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{i.track2Desc}</p>
            </div>
          </div>
        </section>

        {/* Main Assessment */}
        {main.length > 0 && (
          <section className="mb-10">
            <div className="section-header">
              <div className="section-dot bg-[var(--accent)]" />
              <span className="section-title">{i.main}</span>
            </div>
            <p className="section-desc">{i.mainDesc}</p>
            {main.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}?lang=${lang}`}
                className="card card-interactive p-5 sm:p-6 block no-underline group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{q.title}</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">{q.description}</p>
                    <span className="inline-block mt-3 text-xs text-[var(--accent)] font-medium">{i.view} &rarr;</span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="badge bg-red-50 text-red-600">{q.difficulty}</span>
                    <span className="badge">{q.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Warm-up */}
        <section>
          <div className="section-header">
            <div className="section-dot bg-blue-500" />
            <span className="section-title">{i.warmup}</span>
          </div>
          <p className="section-desc">{i.warmupDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {warmup.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}?lang=${lang}`}
                className="card card-interactive p-4 no-underline group block"
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
