import { ogImage } from "@/lib/og";
import { devHero } from "@/constraints/developers";

export const alt = `Strata for developers: ${devHero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: devHero.overline, title: devHero.headline, accent: "One API call." });
}
