import { Suspense } from "react";
import { SEO_PAGES } from "@/lib/seo-pages";
import TextAnalyzer from "@/components/TextAnalyzer";
import HeroIntro from "@/components/HeroIntro";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbList, faqPageSchema, jsonLdString } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  if (!page) return {};
  const url = `${SITE_URL}/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

export default async function SeoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  if (!page) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: page.h1 },
  ];
  const related = (page.related || [])
    .map((s) => {
      const p = SEO_PAGES[s];
      return p ? { href: `/${s}`, label: p.h1, sub: p.description } : null;
    })
    .filter(Boolean) as { href: string; label: string; sub: string }[];

  const jsonLd: object[] = [
    breadcrumbList([
      { name: "Home", url: "/" },
      { name: page.h1, url: `/${slug}` },
    ]),
  ];
  if (page.faqs?.length) jsonLd.push(faqPageSchema(page.faqs));

  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto space-y-10">
        <Breadcrumbs items={crumbs} />

        <div>
          <HeroIntro title={page.h1} subtitle={page.intro} />
        </div>

        <Suspense fallback={null}>
          <TextAnalyzer />
        </Suspense>

        {page.faqs?.length ? (
          <section className="tactile-card p-6">
            <h2 className="text-xs uppercase tracking-wider ink-faint mb-4">FAQ</h2>
            <dl className="space-y-4">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold ink-strong">{f.q}</dt>
                  <dd className="ink-soft text-sm mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {related.length ? (
          <RelatedLinks title="More tools like this" items={related} />
        ) : null}

        <AdSlot slot="seo-landing-end" />

        <NewsletterSignup />

        <p className="text-sm ink-soft">
          More: <Link href="/tools" className="hover:underline">all tools</Link> ·{" "}
          <Link href="/resources" className="hover:underline">recommended resources</Link> ·{" "}
          <Link href="/glossary" className="hover:underline">CEFR glossary</Link>
        </p>
      </div>
    </main>
  );
}

