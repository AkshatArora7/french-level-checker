import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "French Learning Blog — French Level Checker",
  description:
    "Practical articles about CEFR levels, reading material, and breaking through the B1 plateau in French.",
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← French Level Checker
        </Link>
        <h1 className="text-4xl font-bold mb-8 mt-4">Blog</h1>
        <ul className="space-y-6">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block group">
                <h2 className="text-xl font-semibold group-hover:text-blue-600">
                  {p.title}
                </h2>
                <p className="text-gray-600 mt-1">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
