/**
 * Security (W4) copy. Read by security reviewers: plain, factual.
 *
 * Copy rules: only claims that are true today, no badges or
 * certifications you don't hold. The data-handling rows are [owner]
 * placeholders by design (W4 note 04). The pillar bullets come from the
 * board: confirm each is true of the shipped product before launch.
 * Ledger rows are SAMPLE data from platform board P9.
 */
import { COMPANY } from "@/config/company";

export const securityMeta = {
  title: "Security and tamper-evident audit ledger",
  description:
    "How Strata keeps your data separate and every decision provable: a hash-chained, append-only audit ledger, workspace isolation and a reason on every outcome.",
};

export const securityHero = {
  overline: "Security",
  headline: "Controls you can prove, not just promise.",
  lede: "How Strata keeps your data separate, your decisions explainable and your records intact.",
};

export const pillars = [
  {
    icon: "ledger",
    title: "Tamper-evident ledger",
    points: [
      "Each entry hashes the previous one",
      "Chain verified on demand in the console",
      "Append-only: corrections are new entries",
    ],
  },
  {
    icon: "shield",
    title: "Workspace isolation",
    points: [
      "Row-level security on every table",
      "Automated tests guard cross-workspace reads",
      "Roles: owner, admin, member, viewer",
    ],
  },
  {
    icon: "pulse",
    title: "Explainable decisions",
    points: [
      "A readable reason on every outcome",
      "Which layer decided, and on what rule",
      "Human overrides logged with who and why",
    ],
  },
] as const;

export const verify = {
  title: "Check the chain in one click.",
  body: "Auditors don't have to take our word for it. They can re-verify every entry and export the full log.",
  /** Crop of platform board P9 (Ledger). SAMPLE data. */
  badge: "Chain verified · 12,480 entries · checked 14:05",
  rows: [
    { n: "12480", event: "review.approved", tone: "edit", subject: "£9,800.00 · agt_procure-bot", hash: "c07d…12", prev: "5e19…aa" },
    { n: "12479", event: "mandate.updated", tone: "edit", subject: "Procurement · daily cap £5,000", hash: "5e19…aa", prev: "a41f…9c" },
    { n: "12478", event: "decision.blocked", tone: "block", subject: "£1,250.00 · agt_unknown", hash: "a41f…9c", prev: "91ab…3e" },
    { n: "12477", event: "decision.review", tone: "review", subject: "£9,800.00 · agt_procure-bot", hash: "91ab…3e", prev: "7e2c…04" },
    { n: "12476", event: "decision.approved", tone: "approve", subject: "£412.00 · agt_travel-booker", hash: "7e2c…04", prev: "0b3d…71" },
  ],
};

export const dataHandling = {
  title: "Data handling",
  rows: [
    { label: "Hosting region", value: "[e.g. AWS eu-west-2]" },
    { label: "Encryption", value: "[in transit / at rest details]" },
    { label: "Card data", value: "[what Strata does and doesn't store]" },
    { label: "Certifications", value: "[only list what you actually hold]" },
  ],
};

export const securityContact = {
  title: "Security questions or a disclosure?",
  email: COMPANY.securityEmail,
};
