import Link from "next/link";
import type { Metadata } from "next";
import { LEARN_LEVELS } from "@/lib/learn-levels";
import HeroIntro from "@/components/HeroIntro";

export const metadata: Metadata = {
  title: "Learn French by CEFR Level — A1 to C2 Guides",
  description:
    "Plain-English guides to every CEFR level for French: A1, A2, B1, B2, C1, C2. What it means, what you can do, and how to get there.",
};

const LEVEL_INK: Record<string, string> = {
  A1: "#3f9d4a",
  A2: "#1f8a6b",
  B1: "#2b6cb0",
  B2: "#4338ca",
  C1: "#7c3aed",
  C2: "#c4302b",
};

export default function LearnIndex() {
  return (
    <main className="min-h-screen p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm hover:underline">
          ← French Level Checker
        </Link>
        <div className="mt-6">
          <HeroIntro
            title="Learn French by level"
            subtitle="A short, no-nonsense guide to every CEFR level. What it actually means, what you can do at it, the grammar and vocabulary that define it, and how to climb to the next one."
          />
        </div>

        <ul className="grid sm:grid-cols-2 gap-4">
          {LEARN_LEVELS.map((l) => (
            <li key={l.slug}>
              <Link href={`/learn/${l.slug}`} className="block tactile-card p-5 h-full">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: LEVEL_INK[l.level] }}
                  >
                    {l.level}
                  </span>
                  <span className="ink-soft text-xs uppercase tracking-wider">
                    {l.hours} · {l.vocab}
                  </span>
                </div>
                <h2 className="font-semibold ink-strong mb-1">{l.title.replace(/ — .*$/, "")}</h2>
                <p className="ink-soft text-sm">{l.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
