import type { Metadata } from "next";
import { Containers, Widgets } from "@/components";
import { productCta, productFaq, productLayers, productMeta } from "@/constraints/product";
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
 * Product · how it works (W2): cobalt hero → flow diagram → one section
 * per layer (Mandate, Risk, Ledger) → FAQ → ink CTA → footer (Layout).
 * The sticky "on this page" bar lives inside the wrapper so it sticks
 * only while the flow and layer sections are on screen.
 */
export default function ProductPage() {
  return (
    <Containers.Layout headerTone="onCobalt">
      <Widgets.ProductHero />
      <div className="relative">
        <Widgets.ProductNav />
        <Widgets.ProductFlow />
        <Widgets.ProductLayers />
      </div>
      <Widgets.Faq id="faq" title={productFaq.title} items={productFaq.items} />
      <Widgets.PageCta id="product-cta-title" title={productCta.title} action={productCta.action} />
      <JsonLd data={schema} />
    </Containers.Layout>
  );
}
