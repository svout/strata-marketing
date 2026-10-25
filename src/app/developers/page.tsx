import type { Metadata } from "next";
import { Containers, Widgets } from "@/components";
import { devCta, devMeta } from "@/constraints/developers";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...devMeta, path: "/developers" });

/**
 * Developers (W3): ink hero with code → quickstart stepper → SDKs &
 * webhooks → reliability table → cobalt CTA band (the page's one cobalt
 * moment) → footer (Layout).
 */
export default function DevelopersPage() {
  return (
    <Containers.Layout headerTone="onInk">
      <Widgets.DevHero />
      <Widgets.DevQuickstart />
      <Widgets.DevSdks />
      <Widgets.DevReliability />
      <Widgets.PatternCta
        id="dev-cta-title"
        variant="cobalt"
        title={devCta.title}
        titleAccent={devCta.titleAccent}
        primary={devCta.primary}
        secondary={devCta.secondary}
      />
      <JsonLd data={breadcrumbSchema("Developers", "/developers")} />
    </Containers.Layout>
  );
}
