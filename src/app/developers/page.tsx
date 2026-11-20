import type { Metadata } from "next";
import { Containers, Widgets } from "@/components";
import PageHero from "@/components/widgets/PageHero";
import ClosingBand from "@/components/widgets/ClosingBand";
import DevCodeCard from "@/components/widgets/DevHero";
import { devCta, devHero, devMeta } from "@/constraints/developers";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...devMeta, path: "/developers" });

/**
 * Developers, v2: pattern-frame hero with a code card → quickstart
 * stepper → SDKs & webhooks → reliability table → closing band.
 */
export default function DevelopersPage() {
  return (
    <Containers.Layout>
      <PageHero
        id="dev-hero-title"
        eyebrow={devHero.overline}
        title={devHero.headline}
        lede={devHero.lede}
        primary={devHero.primary}
        secondary={devHero.secondary}
        aside={<DevCodeCard />}
      />
      <Widgets.DevQuickstart />
      <Widgets.DevSdks />
      <Widgets.DevReliability />
      <ClosingBand id="dev-cta-title" title={[devCta.title, devCta.titleAccent]} primary={devCta.primary} secondary={devCta.secondary} />
      <JsonLd data={breadcrumbSchema("Developers", "/developers")} />
    </Containers.Layout>
  );
}
