import { ogImage } from "@/lib/og";
import { hero } from "@/constraints/home";

export const alt = `Strata: ${hero.headline} ${hero.headlineAccent}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: hero.label, title: hero.headline, accent: hero.headlineAccent });
}
