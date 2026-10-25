/**
 * Product · how it works (W2) copy and sample data.
 *
 * Same copy rules as Home: only claims that are true today, no invented
 * statistics. Text in [brackets] is for the owner to fill in. Amounts,
 * agent IDs and ledger entries are SAMPLE data and labelled as such.
 */
import type { FaqItem, ProductLayer } from "@/types/product";

export const productMeta = {
  title: "How it works: mandate, risk and ledger checks",
  description:
    "What happens when an AI agent tries to pay: Strata checks its mandate, scores the risk and records the decision in a tamper-evident ledger before money moves.",
};

export const productHero = {
  overline: "How it works",
  headline: "Three checks, in order,",
  headlineAccent: "before any money moves.",
  lede: "Strata sits between your agents and your payment provider. Here is exactly what happens to each payment attempt.",
  anchors: [
    { id: "mandate", label: "01 Mandate" },
    { id: "risk", label: "02 Risk" },
    { id: "ledger", label: "03 Ledger" },
  ] as const,
};

export const productFlow = {
  title: "How a payment moves through Strata",
  agent: { name: "AI agent", note: "tries to pay" },
  layers: ["Mandate", "Risk", "Ledger"],
  outcomes: [
    { tone: "approve" as const, label: "Approved → paid" },
    { tone: "review" as const, label: "Review → a person decides" },
    { tone: "block" as const, label: "Blocked → nothing charged" },
  ],
};

export const productLayers: ProductLayer[] = [
  {
    id: "mandate",
    eyebrow: "01 · Mandate",
    title: "Rules each agent must follow.",
    points: [
      "Allowed merchants and categories",
      "Per-payment, daily and monthly caps",
      "Time windows and currencies",
      "Automatic review above a threshold",
    ],
  },
  {
    id: "risk",
    eyebrow: "02 · Risk",
    title: "A second opinion on every payment.",
    points: [
      "Scores each attempt against the agent's normal behaviour",
      "Shows the top reasons behind the score",
      "Unusual payments wait for a person to decide",
      "[Add any real model detail you want to share]",
    ],
  },
  {
    id: "ledger",
    eyebrow: "03 · Ledger",
    title: "A record nobody can quietly edit.",
    points: [
      "Every attempt, decision and override is written down",
      "Each entry is chained to the one before it",
      "Verify the chain and export it at any time",
    ],
  },
];

/** Crop of platform board P7 (mandate editor). SAMPLE data. */
export const mandateEditorSample = {
  breadcrumb: "Mandates / Travel & accommodation",
  name: "Travel & accommodation",
  agent: "agt_travel-booker",
  categories: ["Flights", "Hotels", "Rail"],
  caps: [
    { label: "Per payment", value: "£800" },
    { label: "Per day", value: "£2,000" },
    { label: "Per month", value: "£20,000" },
  ],
  days: [
    { d: "Mon", on: true },
    { d: "Tue", on: true },
    { d: "Wed", on: true },
    { d: "Thu", on: true },
    { d: "Fri", on: true },
    { d: "Sat", on: false },
    { d: "Sun", on: false },
  ],
  reviewOver: "£500",
  reviewer: "[Owner]",
  plainWords:
    "agt_travel-booker may buy flights, hotels and rail on weekdays, up to £800 each, £2,000 a day and £20,000 a month. Anything over £500 waits for [Owner].",
};

/** Crop of platform board P5 (review queue). SAMPLE data. */
export const reviewQueueSample = {
  waiting: "3 waiting",
  cards: [
    {
      amount: "£9,800.00",
      agent: "agt_procure-bot",
      merchant: "[Merchant] · 2 min ago",
      why: "Over the £5,000 daily cap in “Procurement”. About 3× this agent’s usual payment.",
      score: 0.71,
    },
    {
      amount: "£4,990.00",
      agent: "agt_procure-bot",
      merchant: "[Merchant] · 11 min ago",
      why: "Just under the per-payment cap, third payment to this merchant in an hour.",
      score: 0.58,
    },
  ],
};

/**
 * Ledger chain. Each entry's "prev" is the hash of the entry before it,
 * matching the Home page ledger (#1040 7e2c…, #1041 a41f…, #1042 91ab…).
 */
export const ledgerChainSample = [
  { id: "#1041", outcome: "approve", prev: "7e2c…" },
  { id: "#1042", outcome: "review", prev: "a41f…" },
  { id: "#1043", outcome: "block", prev: "91ab…" },
];

export const productFaq = {
  title: "Questions teams ask",
  items: [
    {
      question: "Which payment providers do you work with?",
      answer: "[Owner to answer: the payment providers supported today.]",
    },
    {
      question: "How long does a decision take?",
      answer: "[Owner to answer: measured decision time. Quote it only once it has been measured.]",
    },
    {
      question: "What happens if Strata is unavailable?",
      answer: "[Owner to answer: the fallback you choose (block or allow) and how it is configured.]",
    },
    {
      question: "Can a person override a decision?",
      answer: "[Owner to answer: who can override, and how overrides are recorded on the ledger.]",
    },
    {
      question: "Where is our data stored?",
      answer: "[Owner to answer: data region and storage. Link to the Security page once it is live.]",
    },
  ] satisfies FaqItem[],
};

export const productCta = {
  title: "See it on your own agents.",
  action: { label: "Request demo", href: "/demo" },
};
