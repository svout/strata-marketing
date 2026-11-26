/**
 * Prices and plans for the Home pricing section (W8) and llms.txt.
 *
 * Three ways to buy Strata:
 * 1. Strata agents: subscribe to an agent we build and run. The
 *    platform is included at no extra cost.
 * 2. Platform: bring your own agents and pay a monthly platform fee.
 * 3. Custom development: we build an agent for your workflow, then it
 *    runs like any Strata agent (platform included).
 *
 * Launch list prices (Nov 2026), set from a market check of agent,
 * travel, AP, SaaS-spend, agent-payment and AI-governance pricing: the
 * middle of each range. Agents are priced by how much money they move
 * and how risky the job is. All prices exclude VAT. Change them here;
 * the plan cards read from PRICES.
 */
export const PRICES = {
  currency: "GBP",
  /** Strata agents, per agent per month, platform included */
  agentFrom: "£99",
  agentTo: "£349",
  /** Platform for your own agents */
  platformMonthly: "£149",
  platformAgents: 3,
  platformPayments: "1,000",
  extraAgent: "£39",
  /** Custom development: one-off build, then monthly like a Strata agent */
  customFrom: "£8,000",
  customMonthly: "£249–£349",
  customWeeks: "5–9",
  /** Yearly billing: the discount and yearly prices aren't decided yet */
  yearlyDiscount: "[−x%]",
  yearlyPrice: "[yearly price]",
} as const;

export const pricingMeta = {
  title: "Pricing",
  description:
    "Subscribe to a ready-made Strata agent with the platform included, bring your own agents for a monthly platform fee, or have an agent built for you.",
};

export type PlanId = "platform" | "agents" | "custom";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  /** Shown after the price ("per agent / month") */
  priceUnit: string;
  /** One or two lines under the price: who it's for */
  forWho: string;
  /** Tab on the card's top edge; `featured` makes it cobalt */
  badge?: string;
  /** "Everything in Platform, plus:" line above the features */
  includes?: string;
  features: string[];
  cta: { label: string; href: string };
  /** Small grey line under the button */
  note: string;
  featured?: boolean;
};

/** The three cards, in display order (scope360-style row) */
export const plans: Plan[] = [
  {
    id: "platform",
    name: "Platform",
    price: PRICES.platformMonthly,
    priceUnit: "per month",
    forWho: "For teams that already run their own agents.",
    features: [
      `Up to ${PRICES.platformAgents} agents, then ${PRICES.extraAgent} per extra agent / month`,
      `${PRICES.platformPayments} checked payments a month`,
      "Connect any agent through the API",
      "Review queue for payments a person should decide",
      "Webhooks for every decision",
    ],
    cta: { label: "Request demo", href: "/demo" },
    note: "Billed monthly, cancel anytime",
  },
  {
    id: "agents",
    name: "Strata agents",
    price: `${PRICES.agentFrom}–${PRICES.agentTo}`,
    priceUnit: "per agent / month",
    forWho: "A ready-made agent for one job, with the platform included.",
    badge: "Platform included",
    includes: "Everything in Platform, plus:",
    features: [
      "An agent built and maintained by us",
      "No separate platform fee while you subscribe",
      "Mandates and limits set up with you",
      "Price depends on the agent and how much it moves",
    ],
    cta: { label: "Choose an agent", href: "/demo" },
    note: "Billed monthly, cancel anytime",
    featured: true,
  },
  {
    id: "custom",
    name: "Custom development",
    price: PRICES.customFrom,
    priceUnit: "one-off build",
    forWho: "An agent built around a workflow no ready-made agent covers.",
    badge: "Built for you",
    includes: "Everything in Strata agents, plus:",
    features: [
      "An agent built around your process and systems",
      "Mandates designed with your finance and risk teams",
      `Then ${PRICES.customMonthly} per agent / month, platform included`,
      `Usually live in ${PRICES.customWeeks} weeks`,
    ],
    cta: { label: "Talk to us", href: "/demo" },
    note: "Quoted after a call",
  },
];

/** Slim row under the four cards */
export const extraPlans = [
  {
    name: "Enterprise",
    price: "Custom",
    body: "Higher volumes, single sign-on, a support agreement and help with rollout across teams.",
    cta: { label: "Talk to us", href: "/demo" },
  },
];
