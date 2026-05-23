import { Suspense } from "react";
import { SEO_PAGES } from "@/lib/seo-pages";
import TextAnalyzer from "@/components/TextAnalyzer";
import HeroIntro from "@/components/HeroIntro";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

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
  return {
    title: page.title,
    description: page.description,
    openGraph: { title: page.title, description: page.description },
  };
}

export default async function SeoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← French Level Checker
        </Link>
        <div className="mt-4">
          <HeroIntro title={page.h1} subtitle={page.intro} />
        </div>
        <Suspense fallback={null}>
          <TextAnalyzer />
        </Suspense>
      </div>
    </main>
  );
}
