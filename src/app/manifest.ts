import type { MetadataRoute } from "next";
import { COMPANY } from "@/config/company";
import { primitives } from "@/config/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name}: spending controls for AI agents`,
    short_name: COMPANY.name,
    description: COMPANY.seoDescription,
    start_url: "/",
    display: "browser",
    background_color: primitives.white,
    theme_color: primitives.cobalt[500],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
