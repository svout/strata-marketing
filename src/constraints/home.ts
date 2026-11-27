import { COMPANY } from "@/config/company";
import type { FaqItem } from "@/types/product";
import type { Signal } from "@/components/elements/V2";
import type { V2IconName } from "@/components/icons/v2";

/**
 * Home page copy and sample data, v2 (docs/design/website-v2/SPEC.md,
 * W1–W9). Copy is final unless in [square brackets]; brackets are
 * placeholders and render as written. Every amount, ID and time in the
 * product mock-ups is sample data.
 */

export const homeMeta = {
  title: `${COMPANY.name} | Spending Controls for AI Agent Payments`,
  description:
    "Strata checks every payment an AI agent tries to make against your rules, scores it for risk and records it on a tamper-evident ledger, before any money moves.",
};

/* ── W1 · Hero ─────────────────────────────────────────────────────── */

export const hero = {
  announcement: { tag: "New", text: "Watch three payments go through Strata", href: "#how-it-works" },
  label: "Spending controls for AI agents",
  headline: "Your agents can spend.",
  headlineAccent: "You set the limits.",
  lede: "Spending controls for AI agents. Every payment is checked against your rules, scored for risk and recorded before any money moves.",
  primary: { label: "Request demo", href: "/demo" },
  secondary: { label: "See the API", href: "/#developers" },
};

/* ── W2 · Connect ──────────────────────────────────────────────────── */

export type ConnectRail = {
  label: string;
  icon: V2IconName;
  /** Line, tile glow and panel accent colour for this rail */
  color: string;
  /** Panel, left: bold lead + grey body, then a button */
  lead: string;
  body: string;
  cta: { label: string; href: string };
};

/**
 * Categories, not partner logos (real logos only once a partnership
 * exists). Each rail's sample card is an animated SVG,
 * src/visuals/connect-<label-slug>.svg: SAMPLE data, amounts and rules are
 * illustrations; [brackets] are for the owner to fill in.
 */
export const connect = {
  title: ["Start controlling agent spend in minutes.", "Put Strata in front of the rails your agents already pay through."] as [string, string],
  rails: [
    {
      label: "Card issuing",
      icon: "Card",
      color: "#729EFF",
      lead: "Every card payment, checked first.",
      body: "Give each agent its own virtual card. Strata checks every authorisation against that agent's mandate before it goes through.",
      cta: { label: "See how mandates work", href: "/#product" },
    },
    {
      label: "Open banking",
      icon: "Bank",
      color: "#56B683",
      lead: "Pay by bank, with a person on the big ones.",
      body: "Connect your business account. Agents can start bank payments, and anything over your limit waits for someone to approve it.",
      cta: { label: "Request demo", href: "/demo" },
    },
    {
      label: "Payouts",
      icon: "Send",
      color: "#FFCC00",
      lead: "Money only goes to people you know.",
      body: "Agents pay out to approved payees only. New payees, and anything above the daily cap, are stopped until a person says yes.",
      cta: { label: "Get test keys", href: "/demo" },
    },
    {
      label: "Invoices",
      icon: "Invoice",
      color: "#F18169",
      lead: "Pay the invoice, not the scam.",
      body: "Before an agent pays a bill, Strata checks the supplier, the amount and the bank details against what it has seen before.",
      cta: { label: "See how it decides", href: "/#how-it-works" },
    },
    {
      label: "Wallets",
      icon: "Wallet",
      color: "#B392F0",
      lead: "Wallet spending, inside the lines.",
      body: "Set how much an agent's wallet can send, how often and to whom. Strata checks every transfer before it goes out.",
      cta: { label: "Request demo", href: "/demo" },
    },
    {
      label: "Subscriptions",
      icon: "Repeat",
      color: "#4FD1C5",
      lead: "No surprise renewals.",
      body: "Agents can sign up for the tools you've approved. Price rises and new sign-ups wait for a person first.",
      cta: { label: "See the review flow", href: "/#review" },
    },
    {
      label: "Marketplaces",
      icon: "Store",
      color: "#F472B6",
      lead: "Shop the marketplace, within budget.",
      body: "Agents order only from the marketplaces you allow. Category, seller and basket limits are checked on every order.",
      cta: { label: "See every feature", href: "/#product" },
    },
    {
      label: "Payment links",
      icon: "Link",
      color: "#FF9F43",
      lead: "Paying a link? Strata checks it first.",
      body: "When an agent is sent a payment link, Strata checks who it pays and how much before any money moves.",
      cta: { label: "Get test keys", href: "/demo" },
    },
  ] satisfies ConnectRail[],
};

/* ── W3 · How it decides ───────────────────────────────────────────── */

/** The faded table and the decision panel are SVGs: src/visuals/decides-*.svg */
export const decides = {
  title: ["Why did that payment stop?", "Every decision explains itself."] as [string, string],
  lede: "Each payment runs through the mandate, the risk check and the ledger, in that order. What comes back is the decision, the reason, and the ledger entry that proves it.",
  tabs: [
    { title: "01 Mandate", desc: "Is the agent allowed to do this?" },
    { title: "02 Risk", desc: "Does this payment look normal?" },
    { title: "03 Ledger", desc: "Write the outcome down, chained." },
  ],
};

/* ── W4 · Review ───────────────────────────────────────────────────── */

/** The chat is an SVG: src/visuals/review-chat(-mobile).svg */
export const review = {
  title: ["Approvals that come to you,", "not a dashboard you have to watch."] as [string, string],
  lede: "When a payment looks unusual, Strata pauses it and asks the right person, with the reasons, in one message.",
  cta: { label: "See every feature", href: "/#product" },
};

/* ── W5 · Features ─────────────────────────────────────────────────── */

export const features = {
  title: ["Everything around the payment,", "in one console."] as [string, string],
  lede: "Set the rules, see the risk, approve what needs a person, and keep a record no one can quietly change.",
  console: "Strata console",
  /** One card per item, in this order: src/visuals/features-*.svg */
  items: [
    {
      id: "mandates",
      title: "Mandates",
      desc: "Decide what each agent may buy, where, and how much: per payment, per day and per month.",
    },
    { id: "risk", title: "Risk scoring", desc: "Every payment is compared with the agent's normal behaviour and scored, with reasons." },
    { id: "review", title: "Human review", desc: "Unusual payments wait for a person, who approves from their phone or inbox." },
    { id: "ledger", title: "Tamper-evident ledger", desc: "Every attempt, approval and rule change is hash-chained, so any edit shows." },
    { id: "webhooks", title: "Webhooks", desc: "Your systems hear about every approval, block and review the moment it happens." },
    { id: "test", title: "Test mode", desc: "Try every rule against fake payments with test keys. Same API, no real money." },
  ],
};

/* ── W6 · Developers ───────────────────────────────────────────────── */

/**
 * SDK method names are illustrative until the real SDK exists; they live
 * here so they're easy to update. TypeScript and Go aren't written yet.
 */
export type CodeToken = { t: string; k?: "comment" | "string" | "number" };

const c = (t: string): CodeToken => ({ t, k: "comment" });
const s = (t: string): CodeToken => ({ t, k: "string" });
const n = (t: string): CodeToken => ({ t, k: "number" });
const p = (t: string): CodeToken => ({ t });

export const developers = {
  title: ["Built for the agent", "you are writing."] as [string, string],
  lede: "Put Strata in front of every payment with one call. Decisions, reasons and ledger IDs come straight back.",
  cta: { label: "Request test keys", href: "/demo" },
  window: "strata · quickstart",
  languages: [
    { id: "python", label: "Python", ready: true },
    { id: "typescript", label: "TypeScript", ready: false },
    { id: "go", label: "Go", ready: false },
  ],
  comingSoon: "[coming soon]",
  snippets: [
    {
      title: "Send a payment",
      desc: "One call, one decision.",
      code: [
        [c("# send a payment through Strata")],
        [p("decision = strata.pay(")],
        [p("    agent="), s('"agt_procure-bot"'), p(",")],
        [p("    amount="), n("9800_00"), p(", currency="), s('"GBP"'), p(",")],
        [p("    merchant="), s('"[supplier_id]"'), p(",")],
        [p(")")],
      ],
      response: [
        { k: "outcome", v: "review", tone: "review" as Signal },
        { k: "layer", v: "risk", tone: "neutral" as Signal },
        { k: "ledger", v: "#1042", tone: "info" as Signal },
      ],
    },
    {
      title: "Handle a review",
      desc: "Hear when a person decides.",
      code: [
        [c("# react when a person decides")],
        [p('@app.post('), s('"/strata/webhooks"'), p(")")],
        [p("def on_event(event):")],
        [p("    if event.type == "), s('"review.resolved"'), p(":")],
        [p("        release_order(event.payment_id, event.outcome)")],
      ],
      response: [
        { k: "event", v: "review.resolved", tone: "neutral" as Signal },
        { k: "outcome", v: "approved", tone: "approved" as Signal },
      ],
    },
    {
      title: "Verify the ledger",
      desc: "Prove nothing was edited.",
      code: [
        [c("# prove nothing was edited")],
        [p("report = strata.ledger.verify(")],
        [p("    since="), s('"2026-11-01"'), p(",")],
        [p(")")],
      ],
      response: [
        { k: "verified", v: "true", tone: "approved" as Signal },
        { k: "entries", v: "[n]", tone: "neutral" as Signal },
      ],
    },
    {
      title: "Test mode",
      desc: "Same API, fake money.",
      code: [
        [c("# same API, fake money")],
        [p("strata = Strata(api_key="), s('"sk_test_…"'), p(")")],
        [p("strata.pay(agent="), s('"agt_travel-booker"'), p(", amount="), n("412_00"), p(", currency="), s('"GBP"'), p(")")],
      ],
      response: [
        { k: "mode", v: "test", tone: "review" as Signal },
        { k: "outcome", v: "approved", tone: "approved" as Signal },
      ],
    },
  ] satisfies {
    title: string;
    desc: string;
    code: CodeToken[][];
    response: { k: string; v: string; tone: Signal }[];
  }[],
};

/* ── W7 · FAQ ──────────────────────────────────────────────────────── */

export const homeFaq: { title: [string, string]; lede: string; items: FaqItem[] } = {
  title: ["Questions,", "answered."],
  lede: "Can't find what you need? Talk to the people building Strata.",
  items: [
    {
      question: "Does Strata hold our money?",
      answer: "No. Strata decides whether a payment may go ahead. Your existing payment provider still moves the money.",
    },
    { question: "Which payment providers does it work with?", answer: "[Supported providers]" },
    { question: "Can a person override a decision?", answer: "[Answer: yes, through human review; confirm wording]" },
    {
      question: "How is the ledger tamper-evident?",
      answer: "[Answer: each entry is hash-chained to the previous one; confirm wording]",
    },
    { question: "What happens if Strata can't be reached?", answer: "[Product decision: fail closed or fail open]" },
    { question: "Is there a test mode?", answer: "[Answer: yes, sk_test_ keys, same API, no real money]" },
  ],
};

/* ── W8 · Pricing (header; plans come from constraints/pricing) ────── */

export const homePricing = {
  title: ["Simple plans that grow", "with your agents."] as [string, string],
  lede: "Bring your own agents, subscribe to ours, or have one built for you.",
  footnote: "All prices exclude VAT.",
};

/* ── W9 · Closing CTA ──────────────────────────────────────────────── */

export const cta = {
  title: ["Give your agents a budget,", "not a blank cheque."] as [string, string],
  primary: { label: "Get started", href: "/#pricing" },
  secondary: { label: "Request demo", href: "/demo" },
};
