import { Suspense } from "react";
import TextAnalyzer from "@/components/TextAnalyzer";
import HeroIntro from "@/components/HeroIntro";
import DailyWordCard from "@/components/DailyWordCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { dailyWord } from "@/lib/daily";
import { faqPageSchema, softwareAppSchema, jsonLdString } from "@/lib/jsonld";

// Revalidate hourly so the embedded "Mot du jour" rolls over after UTC midnight.
export const revalidate = 3600;

const faqs = [
  {
    q: "What does the tool actually do?",
    a: "It reads any French text you paste and tells you its CEFR level (A1 to C2), highlights the difficult words and grammar, and rewrites it one level lower.",
  },
  {
    q: "Is it really free?",
    a: "Yes — no signup, no credit card, no limits beyond a 3000-character cap per analysis.",
  },
  {
    q: "How accurate is the level rating?",
    a: "It uses a large language model trained on multilingual text and a strict CEFR rubric. For short texts (under 50 words) it can be off by one level; for paragraphs it's usually right on the money.",
  },
  {
    q: "What can I use it for?",
    a: "Find reading material at your level, check if your own French writing matches the level you're aiming for, build a vocabulary list of words you don't know, or generate easier versions of articles to study.",
  },
];

const jsonLd = softwareAppSchema();

const faqLd = faqPageSchema(faqs.map((f) => ({ q: f.q, a: f.a })));

export default function Home() {
  const today = new Date();
  const word = dailyWord(today);
  const dateLabel = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString([jsonLd, faqLd]) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Install extension banner — top of page, dismissible-feel but persistent */}
        <Link
          href="/extension"
          className="group relative block rounded-xl mb-8 overflow-hidden transition-transform hover:-translate-y-0.5"
          style={{
            border: "1px solid color-mix(in srgb, var(--accent) 24%, var(--border))",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--surface)) 0%, var(--surface) 100%)",
          }}
        >
          <div className="flex items-center gap-4 p-4 sm:p-5">
            <div
              className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
                boxShadow:
                  "0 4px 12px -2px color-mix(in srgb, var(--accent) 40%, transparent)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="21.17" y1="8" x2="12" y2="8" />
                <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Nouveau · Chrome Extension
              </p>
              <p className="font-semibold mt-0.5" style={{ color: "var(--ink)" }}>
                Check French level on any webpage
              </p>
              <p className="text-sm mt-0.5" style={{ color: "var(--ink-soft)" }}>
                Highlight text → see CEFR level, difficult words, and a simpler version. Free.
              </p>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-transform group-hover:translate-x-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
              }}
            >
              Install
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </Link>

        <HeroIntro
          title="French Level Checker"
          subtitle="Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult, and get a simpler version. Free, no signup."
        />
        <Suspense fallback={null}>
          <TextAnalyzer />
        </Suspense>

        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold ink-strong">Mot du jour</h2>
            <Link href="/mot-du-jour" className="text-sm hover:underline ink-soft">
              Voir tous →
            </Link>
          </div>
          <DailyWordCard word={word} dateLabel={dateLabel} compact />
        </section>

        <section className="mt-12">
          <div className="tactile-card p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest ink-faint">
                Le jeu
              </p>
              <h2 className="text-xl font-semibold ink-strong mt-1">
                French Wordle
              </h2>
              <p className="ink-soft text-sm mt-1">
                Devine le mot français de 5 lettres en 6 essais. Nouveau mot
                chaque jour.
              </p>
            </div>
            <Link
              href="/jeu"
              className="tactile-button px-5 py-2 text-sm whitespace-nowrap"
            >
              Jouer →
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Popular checks</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            <li><Link href="/cefr-checker" className="hover:underline">French CEFR checker</Link></li>
            <li><Link href="/french-reading-level" className="hover:underline">French reading level analyzer</Link></li>
            <li><Link href="/is-this-french-a2" className="hover:underline">Is this French A2?</Link></li>
            <li><Link href="/is-this-french-b1" className="hover:underline">Is this French B1?</Link></li>
            <li><Link href="/is-this-french-b2" className="hover:underline">Is this French B2?</Link></li>
            <li><Link href="/french-text-analyzer" className="hover:underline">French text analyzer</Link></li>
            <li><Link href="/french-sentence-simplifier" className="hover:underline">French sentence simplifier</Link></li>
            <li><Link href="/french-vocabulary-extractor" className="hover:underline">French vocabulary extractor</Link></li>
            <li><Link href="/delf-b1-sample-text" className="hover:underline">DELF B1 sample text checker</Link></li>
            <li><Link href="/delf-b2-sample-text" className="hover:underline">DELF B2 sample text checker</Link></li>
            <li><Link href="/dalf-c1-sample-text" className="hover:underline">DALF C1 sample text checker</Link></li>
            <li><Link href="/check-french-homework-level" className="hover:underline">Check French homework level</Link></li>
          </ul>
          <p className="ink-soft text-sm mt-3">
            See <Link href="/tools" className="underline">all tools</Link> or browse the{" "}
            <Link href="/glossary" className="underline">CEFR glossary</Link>.
          </p>
        </section>

        <section className="mt-12">
          <div className="tactile-card p-6">
            <p className="text-xs uppercase tracking-widest ink-faint">Recommended</p>
            <h2 className="text-2xl font-semibold mt-1 ink-strong">
              Apps, tutors & books we actually recommend
            </h2>
            <p className="ink-soft mt-2 text-sm">
              Curated list of resources to take you from A1 to C1 — free options
              and paid ones, with honest pros and cons.
            </p>
            <Link
              href="/resources"
              className="tactile-button inline-block px-5 py-2 text-sm mt-4 no-underline"
              style={{ color: "var(--accent-ink)" }}
            >
              See the list →
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 ink-strong">Learn by level</h2>
          <p className="ink-soft mb-3 text-sm">Plain-English guides to every CEFR level for French.</p>
          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <li><Link href="/learn/a1-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">A1</Link></li>
            <li><Link href="/learn/a2-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">A2</Link></li>
            <li><Link href="/learn/b1-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">B1</Link></li>
            <li><Link href="/learn/b2-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">B2</Link></li>
            <li><Link href="/learn/c1-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">C1</Link></li>
            <li><Link href="/learn/c2-french" className="tactile-chip block text-center px-3 py-2 font-semibold ink-strong">C2</Link></li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">From the blog</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link href="/blog/how-cefr-levels-work-for-french" className="hover:underline">How CEFR levels actually work for French</Link></li>
            <li><Link href="/blog/free-ways-to-find-french-reading-material" className="hover:underline">5 free ways to find French reading material at your level</Link></li>
            <li><Link href="/blog/why-intermediate-french-learners-plateau" className="hover:underline">Why intermediate French learners plateau</Link></li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
          <dl className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border-b pb-4">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="text-gray-700 mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
