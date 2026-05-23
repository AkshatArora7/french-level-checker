import type { MetadataRoute } from "next";
import { SEO_PAGES } from "@/lib/seo-pages";
import { BLOG_POSTS } from "@/lib/blog";
import { LEARN_LEVELS } from "@/lib/learn-levels";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/learn`, lastModified: now, priority: 0.8 },
  ];
  for (const slug of Object.keys(SEO_PAGES)) {
    entries.push({ url: `${SITE_URL}/${slug}`, lastModified: now, priority: 0.8 });
  }
  for (const p of BLOG_POSTS) {
    entries.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    });
  }
  for (const l of LEARN_LEVELS) {
    entries.push({
      url: `${SITE_URL}/learn/${l.slug}`,
      lastModified: now,
      priority: 0.7,
    });
  }
  return entries;
}
