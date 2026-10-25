import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl } from "@/config/site";

/** Generated at build time, so lastModified is the date of the last deploy. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
