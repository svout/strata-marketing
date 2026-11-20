import type { Metadata } from "next";
import { Containers } from "@/components";
import { PricingAgents, PricingCustom, PricingPlans } from "@/components/widgets/Pricing";
import PageHero from "@/components/widgets/PageHero";
import Faq from "@/components/widgets/Faq";
import ClosingBand from "@/components/widgets/ClosingBand";
import { absoluteUrl } from "@/config/site";
import { PRICES, catalogue, plans, pricingCta, pricingFaq, pricingHero, pricingMeta } from "@/constraints/pricing";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...pricingMeta, path: "/pricing" });

/** "£1,000" → "1000" */
const amount = (price: string) => price.replace(/[^0-9.]/g, "");

/**
 * Offer structured data from the live prices: the agent range as an
 * AggregateOffer (one Offer per agent) and the Platform plan.
 */
function offersSchema() {
  const url = absoluteUrl("/pricing");
  const monthly = (price: string) => ({
    "@type": "UnitPriceSpecification",
    price: amount(price),
    priceCurrency: PRICES.currency,
    unitCode: "MON",
    valueAddedTaxIncluded: false,
  });
  return {
    "@type": "Product",
    name: "Strata",
    description: pricingMeta.description,
    url,
    offers: [
      {
        "@type": "AggregateOffer",
        name: plans[0].name,
        priceCurrency: PRICES.currency,
        lowPrice: amount(PRICES.agentFrom),
        highPrice: amount(PRICES.agentTo),
        offerCount: catalogue.agents.length,
        offers: catalogue.agents.map((a) => ({
          "@type": "Offer",
          name: a.name,
          url,
          priceCurrency: PRICES.currency,
          priceSpecification: monthly(a.price),
        })),
      },
      {
        "@type": "Offer",
        name: plans[1].name,
        url,
        priceCurrency: PRICES.currency,
        priceSpecification: monthly(PRICES.platformMonthly),
      },
    ],
  };
}

const faqData = faqSchema(pricingFaq.items);
const offers = offersSchema();
const schema = [breadcrumbSchema("Pricing", "/pricing"), ...(faqData ? [faqData] : []), offers];

/**
 * Pricing, v2: pattern-frame hero → plans + comparison → Strata agents
 * catalogue → custom development → FAQ → closing band.
 */
export default function PricingPage() {
  return (
    <Containers.Layout>
      <PageHero
        id="pricing-title"
        eyebrow={pricingHero.overline}
        title={pricingHero.headline}
        accent={pricingHero.headlineAccent}
        lede={pricingHero.lede}
        anchors={pricingHero.anchors}
      />
      <PricingPlans />
      <PricingAgents />
      <PricingCustom />
      <Faq id="pricing-faq" title={pricingFaq.title} items={pricingFaq.items} />
      <ClosingBand
        id="pricing-cta-title"
        title={[pricingCta.title, pricingCta.titleAccent]}
        primary={{ label: "Request demo", href: "/demo" }}
        secondary={{ label: "See how it works", href: "/product" }}
      />
      <JsonLd data={schema} />
    </Containers.Layout>
  );
}
