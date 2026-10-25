import type { MetadataRoute } from "next";
import { IS_INDEXABLE, absoluteUrl } from "@/config/site";

/** Open to every crawler (search and AI answer engines) on the real domain; closed everywhere else. */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
