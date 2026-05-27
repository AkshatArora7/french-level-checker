import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/glossary";
import HeroIntro from "@/components/HeroIntro";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";
import { breadcrumbList, jsonLdString } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "French CEFR Glossary — Levels, Tenses, Exams Explained",
  description:
    "Plain-English definitions for every CEFR level, French exam, and grammar term mentioned across the site.",
  alternates: { canonical: `${SITE_URL}/glossary` },
};

export default function Glossary() {
  const ld = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
  ]);
  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Glossary" }]} />
        <HeroIntro
          title="French CEFR glossary"
          subtitle="Quick, plain-English definitions for every CEFR level, French language exam, and grammar term used across the site."
        />
        <dl className="space-y-5">
          {GLOSSARY.map((g) => (
            <div key={g.slug} id={g.slug} className="tactile-card p-5">
              <dt className="font-semibold ink-strong">{g.term}</dt>
              <dd className="ink-soft text-sm mt-1 leading-relaxed">
                {g.definition}
                {g.see_also?.length ? (
                  <span className="block mt-2 text-xs ink-faint">
                    See also:{" "}
                    {g.see_also.map((s, i) => (
                      <span key={s}>
                        <Link href={`#${s}`} className="underline">
                          {s.toUpperCase()}
                        </Link>
                        {i < g.see_also!.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
