import { ogImage } from "@/lib/og";
import { productHero } from "@/constraints/product";

export const alt = `Strata, how it works: ${productHero.headline} ${productHero.headlineAccent}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: productHero.overline, title: productHero.headline, accent: productHero.headlineAccent });
}
