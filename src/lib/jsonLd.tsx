import { COMPANY, isFilled } from "@/config/company";
import { HAS_SITE_URL, SITE_URL, absoluteUrl } from "@/config/site";
import type { FaqItem } from "@/types/product";

type Thing = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function JsonLd({ data }: { data: Thing | Thing[] }) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      // "<" escaped so no string in the data can close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema(): Thing {
  const org: Thing = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.name,
    description: COMPANY.description,
    slogan: COMPANY.tagline,
  };
  if (isFilled(COMPANY.legalName)) org.legalName = COMPANY.legalName;
  if (HAS_SITE_URL) {
    org.url = SITE_URL;
    org.logo = { "@type": "ImageObject", url: absoluteUrl("/apple-icon"), width: 180, height: 180 };
  }
  if (isFilled(COMPANY.supportEmail)) {
    org.contactPoint = { "@type": "ContactPoint", contactType: "sales", email: COMPANY.supportEmail };
  }
  if (COMPANY.sameAs.length) org.sameAs = COMPANY.sameAs;
  return org;
}

export function websiteSchema(): Thing {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: COMPANY.name,
    description: COMPANY.description,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
    ...(HAS_SITE_URL && { url: SITE_URL }),
  };
}

/** Home → page trail. `path` is the current page. */
export function breadcrumbSchema(name: string, path: string): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

export function softwareSchema(features: string[]): Thing {
  return {
    "@type": "SoftwareApplication",
    name: COMPANY.name,
    description: COMPANY.description,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Spending controls for AI agents",
    operatingSystem: "Web",
    featureList: features.filter(isFilled),
    publisher: { "@id": ORG_ID },
    ...(HAS_SITE_URL && { url: absoluteUrl("/product") }),
  };
}

/** FAQPage from visible Q&A. Returns null while every answer is a placeholder. */
export function faqSchema(items: FaqItem[]): Thing | null {
  const answered = items.filter((i) => isFilled(i.answer));
  if (!answered.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: answered.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}
