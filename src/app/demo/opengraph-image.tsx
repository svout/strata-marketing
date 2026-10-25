import { ogImage } from "@/lib/og";
import { demoHero } from "@/constraints/demo";

export const alt = `Request a Strata demo: ${demoHero.headline} ${demoHero.headlineAccent}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Request a demo", title: demoHero.headline, accent: demoHero.headlineAccent });
}
