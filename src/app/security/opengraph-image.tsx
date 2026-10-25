import { ogImage } from "@/lib/og";
import { securityHero } from "@/constraints/security";

export const alt = `Strata security: ${securityHero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: securityHero.overline, title: securityHero.headline });
}
