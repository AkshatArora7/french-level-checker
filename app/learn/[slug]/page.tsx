import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LEARN_LEVELS, getLearnLevel } from "@/lib/learn-levels";
import HeroIntro from "@/components/HeroIntro";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEARN_LEVELS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const lvl = getLearnLevel(slug);
  if (!lvl) return {};
  return {
    title: lvl.metaTitle,
    description: lvl.metaDescription,
    openGraph: { title: lvl.metaTitle, description: lvl.metaDescription, type: "article" },
  };
}

const LEVEL_INK: Record<string, string> = {
  A1: "#3f9d4a",
  A2: "#1f8a6b",
  B1: "#2b6cb0",
  B2: "#4338ca",
  C1: "#7c3aed",
  C2: "#c4302b",
};

export default async function LearnLevelPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const lvl = getLearnLevel(slug);
  if (!lvl) notFound();

  const nextLvl = lvl.nextLevel
    ? LEARN_LEVELS.find((l) => l.level === lvl.nextLevel)
    : null;

  return (
    <main className="min-h-screen p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/learn" className="text-sm hover:underline">
          ← All levels
        </Link>

        <div className="mt-6 mb-2 flex items-baseline gap-4">
          <span
            className="text-6xl sm:text-7xl font-extrabold tracking-tight"
            style={{ color: LEVEL_INK[lvl.level] }}
          >
            {lvl.level}
          </span>
          <span className="ink-soft text-sm uppercase tracking-wider">
            {lvl.hours} · {lvl.vocab}
          </span>
        </div>

        <HeroIntro title={lvl.title.replace(/^[A-C][12] French — /, "")} subtitle={lvl.tagline} />

        <section className="tactile-card p-6 mb-6">
          <p className="ink-strong leading-relaxed">{lvl.overview}</p>
        </section>

        <section className="tactile-card p-6 mb-6">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">
            What you can do at {lvl.level}
          </h2>
          <ul className="space-y-2">
            {lvl.cando.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{
                    background: LEVEL_INK[lvl.level],
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                  }}
                />
                <span className="ink-strong">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tactile-card p-6 mb-6">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">
            Grammar that defines this level
          </h2>
          <ul className="space-y-3">
            {lvl.grammar.map((g, i) => (
              <li key={i} className="tactile-inset p-3">
                <div className="font-semibold ink-strong">{g.name}</div>
                <div className="ink-soft text-sm italic mt-1">
                  &laquo;&nbsp;{g.example}&nbsp;&raquo;
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="tactile-card p-6 mb-6">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">
            Vocabulary anchors
          </h2>
          <ul className="space-y-2 text-sm">
            {lvl.vocabulary.map((v, i) => (
              <li key={i}>
                <span className="font-mono font-semibold ink-strong">{v.word}</span>
                <span className="ink-soft"> — {v.gloss}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tactile-card p-6 mb-6">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">
            Sample text at this level
          </h2>
          <p className="tactile-inset p-4 italic ink-strong leading-relaxed">
            {lvl.sample}
          </p>
          <p className="ink-soft text-sm mt-3">{lvl.sampleNote}</p>
          <div className="mt-4">
            <Link
              href={`/?sample=${encodeURIComponent(lvl.sample)}`}
              className="tactile-button inline-block px-5 py-2 text-sm no-underline"
              style={{ color: "var(--accent-ink)" }}
            >
              Check this text in the analyzer →
            </Link>
          </div>
        </section>

        <section className="tactile-card p-6 mb-6">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">
            Common pitfalls
          </h2>
          <ul className="space-y-2">
            {lvl.pitfalls.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="ink-faint mt-0.5">!</span>
                <span className="ink-strong">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {nextLvl && (
          <Link
            href={`/learn/${nextLvl.slug}`}
            className="block tactile-card p-5 mb-6"
          >
            <div className="text-xs uppercase tracking-wider ink-faint mb-1">
              Next level
            </div>
            <div className="flex items-baseline gap-3">
              <span
                className="text-3xl font-extrabold"
                style={{ color: LEVEL_INK[nextLvl.level] }}
              >
                {nextLvl.level}
              </span>
              <span className="ink-strong font-semibold">
                {nextLvl.title.replace(/^[A-C][12] French — /, "")}
              </span>
            </div>
            <p className="ink-soft text-sm mt-1">{nextLvl.tagline}</p>
          </Link>
        )}

        <section className="tactile-card p-6 mb-6">
          <h2 className="ink-strong font-semibold mb-2">
            Check any French text against {lvl.level}
          </h2>
          <p className="ink-soft text-sm mb-3">
            Paste an article, a song lyric, or your own writing into the analyzer.
            It will tell you the CEFR level, highlight difficult words, and rewrite
            it one level easier.
          </p>
          <Link
            href="/"
            className="tactile-button inline-block px-5 py-2 text-sm no-underline"
            style={{ color: "var(--accent-ink)" }}
          >
            Open the analyzer →
          </Link>
        </section>
      </div>
    </main>
  );
}
