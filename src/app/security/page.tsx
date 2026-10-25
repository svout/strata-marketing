import type { Metadata } from "next";
import { Containers } from "@/components";
import {
  SecurityContact,
  SecurityData,
  SecurityHero,
  SecurityPillars,
  SecurityVerify,
} from "@/components/widgets/SecurityPage";
import { securityMeta } from "@/constraints/security";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata: Metadata = pageMetadata({ ...securityMeta, path: "/security" });

/**
 * Security & ledger (W4): stone hero → pillars → verify it yourself (ink)
 * → data handling → security contact → footer (Layout). No CTA band: the
 * page is for reviewers, so it ends on the security contact.
 */
export default function SecurityPage() {
  return (
    <Containers.Layout headerTone="light">
      <SecurityHero />
      <SecurityPillars />
      <SecurityVerify />
      <SecurityData />
      <SecurityContact />
      <JsonLd data={breadcrumbSchema("Security", "/security")} />
    </Containers.Layout>
  );
}
