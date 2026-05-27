import type { Metadata } from "next";
import { RESOURCE_CATEGORIES } from "@/lib/resources";
import { SITE_URL } from "@/lib/site";
import HeroIntro from "@/components/HeroIntro";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import { breadcrumbList, jsonLdString } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The Best Free + Paid French Learning Resources (2026 Edition)",
  description:
    "A curated, regularly-updated list of the best apps, books, tutors, and free resources for learners going from A1 to C1 in French. No affiliate links.",
  alternates: { canonical: `${SITE_URL}/resources` },
};

export default function ResourcesPage() {
  const ld = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
  ]);

  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
      />
      <div className="max-w-3xl mx-auto space-y-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources" }]} />

        <HeroIntro
          title="French resources we actually recommend"
          subtitle="Hand-picked apps, tutors, books, and free sources for going from A1 to C1 in French. No affiliate links — just honest picks, reviewed annually."
        />

        {RESOURCE_CATEGORIES.map((cat, i) => (
          <section key={cat.id} id={cat.id} className="space-y-4">
            <header>
              <h2 className="text-2xl font-semibold ink-strong">{cat.title}</h2>
              <p className="ink-soft text-sm mt-1">{cat.summary}</p>
            </header>
            <ul className="space-y-3">
              {cat.resources.map((r) => (
                <li key={r.name} className="tactile-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold ink-strong">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener"
                        className="hover:underline"
                      >
                        {r.name}
                      </a>
                    </h3>
                    <span className="text-xs ink-soft">{r.price}</span>
                  </div>
                  <p className="ink-soft text-sm mt-1">{r.blurb}</p>
                  <p className="text-xs ink-faint mt-2">Best for: {r.best_for}</p>
                </li>
              ))}
            </ul>
            {i === 0 && <AdSlot slot="resources-mid" />}
          </section>
        ))}

        <NewsletterSignup />
      </div>
    </main>
  );
}
