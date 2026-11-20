import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl } from "@/config/site";
import { getPublishedPosts } from "@/lib/blog";

/**
 * Pages use the build date as lastModified; blog posts use their own
 * updated (or publish) date, so Google re-crawls only what changed.
 * Drafts are never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const posts = getPublishedPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(`${p.updated ?? p.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
