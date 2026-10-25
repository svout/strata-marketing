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
