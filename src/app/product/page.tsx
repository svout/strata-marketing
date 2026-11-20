import type { Metadata } from "next";
import { Containers, Widgets } from "@/components";
import PageHero from "@/components/widgets/PageHero";
import ClosingBand from "@/components/widgets/ClosingBand";
import { productCta, productFaq, productHero, productLayers, productMeta } from "@/constraints/product";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, softwareSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...productMeta, path: "/product" });

// FAQPage is left out until the [owner] answers are written
const faqData = faqSchema(productFaq.items);
const schema = [
  breadcrumbSchema("How it works", "/product"),
  softwareSchema(productLayers.flatMap((l) => l.points)),
  ...(faqData ? [faqData] : []),
];

/**
 * Product · how it works, v2: pattern-frame hero → flow diagram → one
 * section per layer (Mandate, Risk, Ledger) → FAQ → closing band.
 * The sticky "on this page" bar lives inside the wrapper so it sticks
 * only while the flow and layer sections are on screen.
 */
export default function ProductPage() {
  return (
    <Containers.Layout>
      <PageHero
        id="product-title"
        eyebrow={productHero.overline}
        title={productHero.headline}
        accent={productHero.headlineAccent}
        lede={productHero.lede}
        anchors={productHero.anchors}
        anchorsLabel="Jump to a check"
      />
      <div className="relative">
        <Widgets.ProductNav />
        <Widgets.ProductFlow />
        <Widgets.ProductLayers />
      </div>
      <Widgets.Faq id="faq" title={productFaq.title} items={productFaq.items} />
      <ClosingBand id="product-cta-title" title={productCta.title} primary={productCta.primary} secondary={productCta.secondary} />
      <JsonLd data={schema} />
    </Containers.Layout>
  );
}
