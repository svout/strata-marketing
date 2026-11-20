import type { FaqItem } from "@/types/product";

/**
 * Pricing page and the Home pricing section.
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
 * the rest of the copy reads from PRICES and the catalogue below.
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

export const pricingHero = {
  overline: "Pricing",
  headline: "Run our agents, or bring your own.",
  headlineAccent: "Either way, every payment is checked.",
  lede: `Strata agents from ${PRICES.agentFrom} a month, platform included. Already have agents? Connect them for ${PRICES.platformMonthly} a month, or try the free Sandbox first.`,
  anchors: [
    { id: "plans", label: "Compare plans" },
    { id: "agents", label: "Strata agents" },
    { id: "custom", label: "Custom build" },
  ] as const,
};

export type PlanId = "agents" | "platform" | "custom";

export type Plan = {
  id: PlanId;
  name: string;
  /** Who it's for, one line */
  forWho: string;
  price: string;
  /** Shown after the price ("per agent / month") */
  priceUnit: string;
  /** Short line under the price */
  priceNote: string;
  /** Label on the card, e.g. "Platform included" */
  badge?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "agents",
    name: "Strata agents",
    forWho: "For teams that want an agent ready to work.",
    price: `${PRICES.agentFrom}–${PRICES.agentTo}`,
    priceUnit: "per agent / month",
    priceNote: "Depends on the agent. Platform included, no separate fee.",
    badge: "Platform included",
    features: [
      "A ready-made agent for one job, built and maintained by us",
      "Free access to the Strata platform while you subscribe",
      "Mandates and spending limits set up with you",
      "Payments outside the mandate go to a person to review",
      "Every decision written to the ledger",
    ],
    cta: { label: "Choose an agent", href: "/pricing#agents" },
    featured: true,
  },
  {
    id: "platform",
    name: "Platform",
    forWho: "For teams that already run their own agents.",
    price: PRICES.platformMonthly,
    priceUnit: "/ month",
    priceNote: `Up to ${PRICES.platformAgents} agents, then ${PRICES.extraAgent} per extra agent / month.`,
    features: [
      "Connect any agent through the API and SDKs",
      "Mandate, risk and ledger checks on every payment attempt",
      "Review queue for the payments a person should decide",
      "Webhooks for every decision",
      `${PRICES.platformPayments} checked payments a month included`,
    ],
    cta: { label: "Request demo", href: "/demo" },
  },
  {
    id: "custom",
    name: "Custom development",
    forWho: "For a workflow no ready-made agent covers.",
    price: `From ${PRICES.customFrom}`,
    priceUnit: "one-off build",
    priceNote: `Then ${PRICES.customMonthly} per agent / month, platform included.`,
    badge: "Platform included",
    features: [
      "An agent built around your process and systems",
      "Mandates designed with your finance and risk teams",
      "Runs on Strata like any of our agents",
      `Usually live in ${PRICES.customWeeks} weeks, quoted after a call`,
    ],
    cta: { label: "Talk to us", href: "/demo" },
  },
];

/** Smaller options shown in a row under the three plans */
export const extraPlans = [
  {
    name: "Sandbox",
    price: "Free",
    body: "Test mode with no real money. Connect an agent, set mandates and see every decision before you go live.",
    cta: { label: "Request access", href: "/demo" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    body: "Higher volumes, single sign-on, a support agreement and help with rollout across teams.",
    cta: { label: "Talk to us", href: "/demo" },
  },
];

export type CatalogueAgent = {
  name: string;
  job: string;
  /** A sample mandate, as a person would write it */
  sampleMandate: string;
  /** Per agent per month, platform included */
  price: string;
  /** [Available] / [Coming soon] until the owner confirms */
  status: string;
};

export const catalogue = {
  overline: "Strata agents",
  title: "Agents you can subscribe to.",
  titleAccent: "Each one comes with its limits set.",
  lede: `${PRICES.agentFrom} to ${PRICES.agentTo} per agent per month, with the Strata platform included. The more money an agent moves, the more it costs. Mandates below are samples; yours are set up with you.`,
  agents: [
    {
      name: "SaaS renewals agent",
      job: "Renews software subscriptions at their current price before they bill.",
      sampleMandate: "Renew existing tools up to their current price; review any increase.",
      price: "£99",
      status: "[Coming soon]",
    },
    {
      name: "Procurement agent",
      job: "Reorders supplies from approved suppliers when stock runs low.",
      sampleMandate: "Reorder office supplies from approved suppliers, up to £1,000 a month.",
      price: "£149",
      status: "[Coming soon]",
    },
    {
      name: "Refunds agent",
      job: "Handles routine customer refunds and sends the unusual ones to a person.",
      sampleMandate: "Refund orders under £50 within 30 days of purchase; review the rest.",
      price: "£199",
      status: "[Coming soon]",
    },
    {
      name: "Travel agent",
      job: "Books trains, flights and hotels for your team within travel policy.",
      sampleMandate: "Book rail and hotels for the sales team, up to £400 a trip, UK only.",
      price: "£249",
      status: "[Coming soon]",
    },
    {
      name: "Supplier invoice agent",
      job: "Pays approved supplier invoices on time and holds anything that doesn't match.",
      sampleMandate: "Pay invoices that match a purchase order, up to £5,000 each; review the rest.",
      price: "£349",
      status: "[Coming soon]",
    },
  ] satisfies CatalogueAgent[],
  more: "Need an agent that isn't here? We can build one.",
};

export const customBuild = {
  overline: "Custom development",
  title: "An agent built for your workflow.",
  titleAccent: "Then it runs on Strata like the rest.",
  lede: `Tell us the job. We build the agent, design its mandates with your team, and run it for you. One-off build from ${PRICES.customFrom}, usually live in ${PRICES.customWeeks} weeks, then ${PRICES.customMonthly} per agent per month with the platform included.`,
  steps: [
    { title: "Scope", body: "A call to map the job, your systems and who approves what. You get a fixed quote." },
    { title: "Build", body: "We build the agent and draft its mandates with your finance and risk teams." },
    { title: "Test", body: "The agent runs in test mode against Strata until every limit behaves as agreed." },
    { title: "Run", body: "It goes live on the platform, billed monthly like any Strata agent." },
  ],
  cta: { label: "Talk to us about a build", href: "/demo" },
};

/** Plan comparison rows: one value per plan, in plan order */
export const comparison = {
  title: "What each plan includes",
  rows: [
    { label: "Price", values: [`${PRICES.agentFrom}–${PRICES.agentTo} per agent / month`, `${PRICES.platformMonthly} / month`, `From ${PRICES.customFrom}, then ${PRICES.customMonthly} / month`] },
    { label: "Platform access", values: ["Included", `Up to ${PRICES.platformAgents} agents, ${PRICES.extraAgent} per extra`, "Included"] },
    { label: "Agents", values: ["Built and run by Strata", "Your own", "Built for you, run by Strata"] },
    { label: "Set-up", values: ["Done with you", "Your developers, using the API", "Part of the build"] },
    { label: "Mandate, risk and ledger checks", values: ["✓", "✓", "✓"] },
    { label: "Human review queue", values: ["✓", "✓", "✓"] },
    { label: "Billing", values: ["Monthly, per agent", "Monthly", "One-off build, then monthly"] },
  ],
};

export const pricingFaq: { title: string; items: FaqItem[] } = {
  title: "Pricing questions",
  items: [
    {
      question: "If I subscribe to a Strata agent, do I also pay for the platform?",
      answer: "No. Every Strata agent subscription includes free access to the Strata platform for as long as you subscribe.",
    },
    {
      question: "We already have our own agents. What do we pay?",
      answer: `The Platform plan: ${PRICES.platformMonthly} a month for up to ${PRICES.platformAgents} agents and ${PRICES.platformPayments} checked payments, then ${PRICES.extraAgent} a month for each extra agent. Your agents connect through the API, and every payment they attempt is checked.`,
    },
    {
      question: "Can we use Strata agents and our own agents together?",
      answer: `Yes. Each Strata agent is billed at its own price with the platform included. Your own agents are covered by the Platform plan.`,
    },
    {
      question: "How much does a custom agent cost?",
      answer: `It depends on the job, so we quote after a call. Builds start from ${PRICES.customFrom} and are usually live in ${PRICES.customWeeks} weeks. After that the agent costs ${PRICES.customMonthly} a month, platform included.`,
    },
    {
      question: "Is there a free trial?",
      answer: "The Sandbox is free: connect an agent in test mode, with no real money, and see every decision before you pay for anything.",
    },
    {
      question: "Do prices include VAT, and can we cancel?",
      answer: "Prices exclude VAT. [Cancellation terms]",
    },
  ],
};

export const pricingCta = {
  title: "Not sure which fits?",
  titleAccent: "We'll help you choose on a call.",
};
