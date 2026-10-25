/**
 * Company facts used in metadata, JSON-LD and the footer.
 * Values in [brackets] are for the owner to fill in; anything still in
 * brackets is left out of structured data (see lib/jsonLd).
 */
export const COMPANY = {
  name: "Strata",
  legalName: "[Legal entity]",
  url: "https://[domain]",
  appUrl: "https://app.[domain]",
  tagline: "Layered control for agent payments.",
  description:
    "Strata checks every payment an AI agent tries to make, before any money moves.",
  /** Default <meta description> and social description: what it is, how, and the outcome. */
  seoDescription:
    "Spending controls for AI agents. Strata checks every payment an agent tries to make against your rules, sends unusual ones to a person and records each decision.",
  supportEmail: "[contact email]",
  securityEmail: "security@[domain]",
  /** Official profiles (LinkedIn, GitHub, X…) for Organization.sameAs */
  sameAs: [] as string[],
} as const;

/** True once an owner has replaced the [placeholder]. */
export const isFilled = (value: string) => !/\[.*\]/.test(value);
