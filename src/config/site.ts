import type { MetadataRoute } from "next";
import { COMPANY, isFilled } from "./company";

/**
 * Canonical origin for metadata, sitemap, robots and JSON-LD.
 * NEXT_PUBLIC_SITE_URL wins (set it per deployment); otherwise
 * COMPANY.url once the [domain] placeholder is filled.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || (isFilled(COMPANY.url) ? COMPANY.url : "");

export const HAS_SITE_URL = configuredUrl !== "";
export const SITE_URL = (configuredUrl || "http://localhost:3000").replace(/\/+$/, "");

/**
 * Search engines may index the site only on a real domain. Staging and
 * preview deployments set NEXT_PUBLIC_NOINDEX=1 to stay out of results.
 */
export const IS_INDEXABLE = HAS_SITE_URL && process.env.NEXT_PUBLIC_NOINDEX !== "1";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

type SiteRoute = {
  path: string;
  name: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/** Every public page, in site-map order. Feeds sitemap.xml and llms.txt. */
export const ROUTES: SiteRoute[] = [
  { path: "/", name: "Home", changeFrequency: "weekly", priority: 1 },
  { path: "/product", name: "How it works", changeFrequency: "monthly", priority: 0.9 },
  { path: "/developers", name: "Developers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security", name: "Security", changeFrequency: "monthly", priority: 0.7 },
  { path: "/demo", name: "Request a demo", changeFrequency: "yearly", priority: 0.6 },
];
