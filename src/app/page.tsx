import type { Metadata } from "next";
import { Containers } from "@/components";
import Hero from "@/components/widgets/Home/Hero";
import Connect from "@/components/widgets/Home/Connect";
import HowItDecides from "@/components/widgets/Home/HowItDecides";
import Review from "@/components/widgets/Home/Review";
import Features from "@/components/widgets/Home/Features";
import Developers from "@/components/widgets/Home/Developers";
import HomePricing from "@/components/widgets/Home/Pricing";
import Faq from "@/components/widgets/Faq";
import ClosingBand from "@/components/widgets/ClosingBand";
import { connect, cta, homeFaq, homeMeta } from "@/constraints/home";
import { productLayers } from "@/constraints/product";
import { pageMetadata } from "@/lib/seo";
import { loadVisual } from "@/lib/visuals";
import { JsonLd, faqSchema, softwareSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...homeMeta, path: "/", absolute: true });

const faqData = faqSchema(homeFaq.items);

/** Rail label → file slug ("Card issuing" → "card-issuing") */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Animated SVG visuals (src/visuals), read at build time
const visuals = {
  heroTable: loadVisual("hero-decisions"),
  connectCards: connect.rails.map((r) => loadVisual(`connect-${slug(r.label)}`)),
  decides: {
    table: loadVisual("decides-table"),
    panel: loadVisual("decides-panel"),
    panelMobile: loadVisual("decides-panel-mobile"),
  },
  reviewChat: loadVisual("review-chat"),
  reviewChatMobile: loadVisual("review-chat-mobile"),
  featureCards: ["mandates", "risk", "review", "ledger", "webhooks", "test-mode"].map((n) => loadVisual(`features-${n}`)),
};

/**
 * Home, v2 (docs/design/website-v2/SPEC.md): W1 Hero → W2 Connect →
 * W3 How it decides → W4 Review → W5 Features → W6 Developers → W7 FAQ →
 * W8 Pricing → W9 closing band (+ footer from Layout).
 */
export default function HomePage() {
  return (
    <Containers.Layout>
      <Hero table={visuals.heroTable} />
      <Connect cards={visuals.connectCards} />
      <HowItDecides visuals={visuals.decides} />
      <Review chat={visuals.reviewChat} chatMobile={visuals.reviewChatMobile} />
      <Features cards={visuals.featureCards} />
      <Developers />
      <Faq id="faq" title={homeFaq.title} lede={homeFaq.lede} items={homeFaq.items} />
      <HomePricing />
      <ClosingBand id="cta-title" title={cta.title} primary={cta.primary} secondary={cta.secondary} />
      <JsonLd data={[softwareSchema(productLayers.flatMap((l) => l.points)), ...(faqData ? [faqData] : [])]} />
    </Containers.Layout>
  );
}
