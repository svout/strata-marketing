import Script from "next/script";
import { COMPANY } from "@/config/company";

export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY?.name,
    legalName: COMPANY?.legalName ?? COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    description: COMPANY.tagline,
    email: COMPANY.supportEmail,
    telephone: COMPANY.phone,
    sameAs: COMPANY.sameAs ?? [],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.phone,
        email: COMPANY.supportEmail,
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
