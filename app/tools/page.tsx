import Link from "next/link";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";
import HeroIntro from "@/components/HeroIntro";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterSignup from "@/components/NewsletterSignup";
import { breadcrumbList, jsonLdString } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Free French Tools — CEFR Checker, Simplifier, Vocab Extractor",
  description:
    "Every free French analysis tool we ship: CEFR level checker, sentence simplifier, vocabulary extractor, grammar spotter, and homework checker. No signup.",
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsIndex() {
  const ld = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
  ]);
  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Tools" }]} />
        <HeroIntro
          title="Free French tools"
          subtitle="Every tool below is free, runs in your browser, and shares the same underlying CEFR analysis. Pick the framing that fits your task."
        />
        <ul className="grid sm:grid-cols-2 gap-4">
          {TOOLS.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}`} className="block tactile-card p-5 h-full">
                <h2 className="font-semibold ink-strong">{t.name}</h2>
                <p className="ink-soft text-sm mt-1">{t.short}</p>
              </Link>
            </li>
          ))}
        </ul>
        <NewsletterSignup />
      </div>
    </main>
  );
}
