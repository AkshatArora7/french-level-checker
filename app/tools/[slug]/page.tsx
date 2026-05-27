import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getTool } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";
import HeroIntro from "@/components/HeroIntro";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import NewsletterSignup from "@/components/NewsletterSignup";
import TextAnalyzer from "@/components/TextAnalyzer";
import { breadcrumbList, jsonLdString } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};
  const url = `${SITE_URL}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.title, description: t.description, url, type: "website" },
  };
}

export default async function ToolPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const ld = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: tool.name, url: `/tools/${slug}` },
  ]);

  const related = TOOLS.filter((t) => t.slug !== slug)
    .slice(0, 4)
    .map((t) => ({ href: `/tools/${t.slug}`, label: t.name, sub: t.short }));

  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
      />
      <div className="max-w-3xl mx-auto space-y-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: tool.name },
          ]}
        />
        <HeroIntro title={tool.name} subtitle={tool.intro} />
        <Suspense fallback={null}>
          <TextAnalyzer />
        </Suspense>
        <RelatedLinks title="Other tools" items={related} />
        <NewsletterSignup />
        <p className="text-sm ink-soft">
          <Link href="/resources" className="hover:underline">
            See the resources we recommend →
          </Link>
        </p>
      </div>
    </main>
  );
}
