import type { MetadataRoute } from "next";
import { SEO_PAGES } from "@/lib/seo-pages";
import { BLOG_POSTS } from "@/lib/blog";
import { LEARN_LEVELS } from "@/lib/learn-levels";
import { TOOLS } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,              lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/tools`,         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/resources`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/extension`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/jeu`,           lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE_URL}/mot-du-jour`,   lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE_URL}/learn`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/glossary`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/vocab`,         lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
  for (const slug of Object.keys(SEO_PAGES)) {
    entries.push({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const t of TOOLS) {
    entries.push({
      url: `${SITE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const p of BLOG_POSTS) {
    entries.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const l of LEARN_LEVELS) {
    entries.push({
      url: `${SITE_URL}/learn/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return entries;
}
