import type { Metadata } from "next";
import { Containers, Widgets } from "@/components";
import { homeFaq, homeMeta } from "@/constraints/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...homeMeta, path: "/", absolute: true });

const faqData = faqSchema(homeFaq.items);

/**
 * Home (W1), in the section order from the vault note "Marketing
 * Website": hero → live decision → problem → how Strata decides (03B,
 * animated app window) →
 * editable mandate sentence → developers → trust → FAQ → CTA band →
 * footer (the footer comes from Layout).
 */
export default function HomePage() {
  return (
    <Containers.Layout headerTone="onCobalt">
      <Widgets.Hero />
      <Widgets.LiveDecision />
      <Widgets.Problem />
      <Widgets.HowStrataDecides />
      <Widgets.MandateSentence />
      <Widgets.Developers />
      <Widgets.Trust />
      <Widgets.Faq id="faq" tone="white" title={homeFaq.title} items={homeFaq.items} />
      <Widgets.CtaBand />
      {faqData && <JsonLd data={faqData} />}
    </Containers.Layout>
  );
}
