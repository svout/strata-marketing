import { ogImage } from "@/lib/og";
import { pricingHero } from "@/constraints/pricing";

export const alt = `Strata pricing: ${pricingHero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: pricingHero.overline, title: pricingHero.headline, accent: pricingHero.headlineAccent });
}
