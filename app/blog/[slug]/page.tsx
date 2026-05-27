import { BLOG_POSTS, getPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterSignup from "@/components/NewsletterSignup";
import { SITE_URL } from "@/lib/site";
import { articleSchema, breadcrumbList, jsonLdString } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title} — French Level Checker`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const out: React.ReactNode[] = [];
  let para: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ");
    out.push(
      <p key={key++} className="my-4 leading-relaxed">
        {renderInline(text)}
      </p>
    );
    para = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushPara();
      out.push(
        <h2 key={key++} className="text-2xl font-semibold mt-8 mb-2">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("> ")) {
      flushPara();
      out.push(
        <blockquote
          key={key++}
          className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.trim() === "") {
      flushPara();
    } else {
      para.push(line);
    }
  }
  flushPara();
  return out;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<em key={key++}>{m[1]}</em>);
    else if (m[2])
      parts.push(
        <a
          key={key++}
          href={m[3]}
          className="text-blue-600 hover:underline"
        >
          {m[2]}
        </a>
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const ld = [
    breadcrumbList([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${slug}` },
    ]),
    articleSchema({
      headline: post.title,
      description: post.description,
      url,
      datePublished: post.date,
    }),
  ];

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
      />
      <article className="max-w-2xl mx-auto">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />
        <h1 className="text-4xl font-bold mt-4 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date}</p>
        <div className="prose-like">{renderMarkdown(post.body)}</div>
        <div className="mt-12 p-6 border rounded-lg bg-blue-50">
          <p className="font-semibold mb-1">Check any French text&apos;s level</p>
          <p className="text-sm text-gray-700 mb-3">
            Free, no signup. Get the CEFR level, difficult words, and a simpler rewrite.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Try the tool →
          </Link>
        </div>
        <div className="mt-8">
          <NewsletterSignup />
        </div>
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-wider ink-faint mb-3">
              Keep reading
            </h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="block group">
                    <span className="font-semibold ink-strong group-hover:underline">
                      {r.title}
                    </span>
                    <span className="ink-soft text-sm block">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
