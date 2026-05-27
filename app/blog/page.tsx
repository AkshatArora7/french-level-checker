import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "French Learning Blog — French Level Checker",
  description:
    "Practical articles about CEFR levels, French reading material, DELF prep, AI for language learning, and breaking through the B1 plateau.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
  },
};

export default function BlogIndex() {
  const posts = BLOG_POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
        <header>
          <h1 className="text-4xl font-bold ink-strong">Blog</h1>
          <p className="ink-soft text-sm mt-2">
            Practical writing about CEFR levels, DELF prep, AI-assisted French
            learning, and the B1 plateau. New posts every couple of weeks —{" "}
            <a
              href={`${SITE_URL}/blog/feed.xml`}
              className="underline"
              rel="alternate"
              type="application/rss+xml"
            >
              RSS
            </a>
            .
          </p>
        </header>
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block group">
                <span className="ink-faint text-xs">{p.date}</span>
                <h2 className="text-xl font-semibold group-hover:underline ink-strong">
                  {p.title}
                </h2>
                <p className="ink-soft mt-1 text-sm">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <NewsletterSignup />
      </div>
    </main>
  );
}
