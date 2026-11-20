import type { Metadata } from "next";
import { COMPANY } from "@/config/company";

type PageMeta = {
  /** Page title; the layout template appends " · Strata" unless `absolute` */
  title: string;
  description: string;
  /** Route path, e.g. "/product". Becomes the canonical and og:url. */
  path: string;
  absolute?: boolean;
};

/**
 * Per-page metadata. Next replaces (not merges) a parent's `openGraph`
 * and `twitter` objects when a page sets them, so every page builds the
 * full set here. Images come from each route's opengraph-image.tsx.
 */
export function pageMetadata({ title, description, path, absolute = false }: PageMeta): Metadata {
  const fullTitle = absolute ? title : `${title} · ${COMPANY.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Feed link for <head>, so readers and feed tools find the RSS feed */
export const blogFeed = { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${COMPANY.name} blog` }] };

type ArticleMeta = {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  author: string;
  section: string;
  tags: string[];
  /** Drafts are never indexed, even if a preview build shows them */
  draft?: boolean;
};

/** Metadata for a blog post: og:type article with dates, author and tags. */
export function articleMetadata(a: ArticleMeta): Metadata {
  const base = pageMetadata({ title: a.title, description: a.description, path: a.path });
  return {
    ...base,
    alternates: { canonical: a.path, types: blogFeed },
    authors: [{ name: a.author }],
    keywords: a.tags,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [a.author],
      section: a.section,
      tags: a.tags,
    },
    ...(a.draft && { robots: { index: false, follow: false } }),
  };
}
