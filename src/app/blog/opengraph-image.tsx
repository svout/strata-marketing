import { ogImage } from "@/lib/og";
import { blogHero } from "@/config/blog";

export const alt = `Strata blog: ${blogHero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: blogHero.overline, title: blogHero.headline, accent: blogHero.headlineAccent });
}
