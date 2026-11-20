import type { Metadata } from "next";
import { Containers } from "@/components";
import PageHero from "@/components/widgets/PageHero";
import { SecurityContact, SecurityData, SecurityPillars, SecurityVerify } from "@/components/widgets/SecurityPage";
import { securityHero, securityMeta } from "@/constraints/security";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...securityMeta, path: "/security" });

/**
 * Security & ledger, v2: pattern-frame hero → pillars → verify it
 * yourself → data handling → security contact. No CTA band: the page is
 * for reviewers, so it ends on the security contact.
 */
export default function SecurityPage() {
  return (
    <Containers.Layout>
      <PageHero id="security-title" eyebrow={securityHero.overline} title={securityHero.headline} lede={securityHero.lede} />
      <SecurityPillars />
      <SecurityVerify />
      <SecurityData />
      <SecurityContact />
      <JsonLd data={breadcrumbSchema("Security", "/security")} />
    </Containers.Layout>
  );
}
