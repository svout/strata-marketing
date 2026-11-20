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
  secondary: { label: "Read the docs", href: "/developers" },
};

export type DecisionRow = {
  agent: string;
  decision: "Approved" | "Review" | "Blocked";
  time: string;
  merchant: string;
  category: string;
  amount: string;
  risk: string;
  ledger: string;
};

/** W1 product window: the decisions journal (SAMPLE data) */
export const productWindow = {
  workspace: "[Workspace]",
  date: "Today · 20 Nov",
  title: "Decisions",
  ranges: ["Today", "Week", "Month", "All", "Custom"],
  totals: [
    { tone: "approved" as Signal, label: "1,241 approved" },
    { tone: "review" as Signal, label: "3 waiting" },
    { tone: "blocked" as Signal, label: "40 blocked" },
  ],
  columns: ["Agent", "Decision", "Time", "Merchant", "Category", "Amount", "Risk", "Ledger"],
  rows: [
    { agent: "agt_travel-booker", decision: "Approved", time: "14:02:11", merchant: "[Airline]", category: "Travel", amount: "£412.00", risk: "0.08", ledger: "#1039" },
    { agent: "agt_procure-bot", decision: "Review", time: "14:02:19", merchant: "[Supplier]", category: "Procurement", amount: "£9,800.00", risk: "0.71", ledger: "#1042" },
    { agent: "agt_unknown", decision: "Blocked", time: "14:02:31", merchant: "[Merchant]", category: "Unknown", amount: "£1,250.00", risk: "—", ledger: "#1041" },
    { agent: "agt_support-refunds", decision: "Approved", time: "14:01:52", merchant: "Refund #A-2291", category: "Refunds", amount: "£42.00", risk: "0.05", ledger: "#1038" },
    { agent: "agt_travel-booker", decision: "Approved", time: "14:01:48", merchant: "[Hotel]", category: "Travel", amount: "£86.40", risk: "0.11", ledger: "#1037" },
    { agent: "agt_ops", decision: "Approved", time: "14:00:03", merchant: "[Vendor]", category: "SaaS", amount: "£120.00", risk: "0.09", ledger: "#1036" },
    { agent: "agt_travel-booker", decision: "Blocked", time: "13:58:40", merchant: "[Electronics]", category: "Not allowed", amount: "£640.00", risk: "—", ledger: "#1035" },
    { agent: "agt_procure-bot", decision: "Approved", time: "13:57:12", merchant: "[Supplier]", category: "Procurement", amount: "£2,310.00", risk: "0.22", ledger: "#1034" },
    { agent: "agt_ops", decision: "Review", time: "13:55:09", merchant: "[New vendor]", category: "SaaS", amount: "£1,480.00", risk: "0.58", ledger: "#1033" },
    { agent: "agt_support-refunds", decision: "Approved", time: "13:54:44", merchant: "Refund #A-2287", category: "Refunds", amount: "£18.99", risk: "0.04", ledger: "#1032" },
  ] satisfies DecisionRow[],
};

/* ── W2 · Connect ──────────────────────────────────────────────────── */

export const connect = {
  title: ["Start controlling agent spend in minutes.", "Put Strata in front of the rails your agents already pay through."] as [string, string],
  /** Categories, not partner logos (real logos only once a partnership exists) */
  rails: [
    { label: "Card issuing", icon: "Card" },
    { label: "Open banking", icon: "Bank" },
    { label: "Payouts", icon: "Send" },
    { label: "Invoices", icon: "Invoice" },
    { label: "Wallets", icon: "Wallet" },
    { label: "Subscriptions", icon: "Repeat" },
    { label: "Marketplaces", icon: "Store" },
    { label: "Payment links", icon: "Link" },
  ] satisfies { label: string; icon: V2IconName }[],
  panel: {
    lead: "Strata in test mode. Every feature, free.",
    body: "Connect a sandbox account, register an agent and watch real decisions on fake money.",
    cta: { label: "Get test keys", href: "/developers#quickstart" },
  },
  manager: {
    title: "Connection manager",
    label: "Workspaces",
    rows: [
      { name: "Production", meta: "3 agents · live" },
      { name: "Test mode", meta: "5 agents · sk_test_", selected: true },
      { name: "Staging", meta: "2 agents" },
    ],
    add: "Add workspace",
  },
};

/* ── W3 · How it decides ───────────────────────────────────────────── */

export type PanelRow = { icon: V2IconName; label: string; value: string; mark?: "ok" | "warn"; tone?: "review" | "pale" };

export const decides = {
  title: ["Why did that payment stop?", "Every decision explains itself."] as [string, string],
  lede: "Each payment runs through the mandate, the risk check and the ledger, in that order. What comes back is the decision, the reason, and the ledger entry that proves it.",
  /** Faded table behind the panel (SAMPLE) */
  backTable: {
    filters: ["All agents ▾", "Day", "Week", "Month", "All time", "Custom"],
    columns: ["Agent", "Side", "Amount", "Time"],
    rows: [
      ["agt_travel-booker", "approved", "£412.00", "14:00"],
      ["agt_procure-bot", "review", "£9,800.00", "14:01"],
      ["agt_unknown", "blocked", "£1,250.00", "14:02"],
      ["agt_support-refunds", "approved", "£42.00", "14:03"],
      ["agt_travel-booker", "approved", "£86.40", "14:04"],
      ["agt_ops", "approved", "£120.00", "14:05"],
      ["agt_travel-booker", "blocked", "£640.00", "14:06"],
      ["agt_procure-bot", "approved", "£2,310.00", "14:07"],
      ["agt_ops", "review", "£1,480.00", "14:08"],
      ["agt_support-refunds", "approved", "£18.99", "14:09"],
      ["agt_travel-booker", "approved", "£64.20", "14:00"],
      ["agt_ops", "approved", "£99.00", "14:01"],
      ["agt_procure-bot", "approved", "£780.00", "14:02"],
      ["agt_support-refunds", "approved", "£26.00", "14:03"],
    ] as [string, "approved" | "review" | "blocked", string, string][],
  },
  panel: {
    title: "Payment decision",
    status: "Review",
    id: "pay_8Hc2…",
    request: [
      { icon: "Sparkle", label: "Agent", value: "agt_procure-bot" },
      { icon: "Card", label: "Amount", value: "£9,800.00" },
      { icon: "Store", label: "Merchant", value: "[Supplier]" },
      { icon: "Activity", label: "Time", value: "14:02:19" },
    ] satisfies PanelRow[],
    groups: [
      {
        title: "01 · Mandate",
        rows: [
          { icon: "Store", label: "Merchant allowed", value: "in procurement-v3", mark: "ok" },
          { icon: "Card", label: "Per-payment cap", value: "£10,000", mark: "ok" },
          { icon: "Activity", label: "Active hours", value: "Mon–Fri 07–20", mark: "ok" },
        ],
      },
      {
        title: "02 · Risk",
        rows: [
          { icon: "Chart", label: "Risk score", value: "0.71 · unusual", mark: "warn", tone: "review" },
          { icon: "File", label: "Reasons", value: "3× usual size · over daily cap" },
        ],
      },
      {
        title: "03 · Ledger",
        rows: [
          { icon: "Lock", label: "Entry", value: "#1042", tone: "pale" },
          { icon: "Link", label: "Hash · previous", value: "91ab…3e ← a41f…9c", mark: "ok" },
        ],
      },
    ] satisfies { title: string; rows: PanelRow[] }[],
    actions: { decline: "Decline", approve: "Approve" },
  },
  tabs: [
    { title: "01 Mandate", desc: "Is the agent allowed to do this?" },
    { title: "02 Risk", desc: "Does this payment look normal?" },
    { title: "03 Ledger", desc: "Write the outcome down, chained." },
  ],
};

/* ── W4 · Review ───────────────────────────────────────────────────── */

export const review = {
  title: ["Approvals that come to you,", "not a dashboard you have to watch."] as [string, string],
  lede: "When a payment looks unusual, Strata pauses it and asks the right person, with the reasons, in one message.",
  cta: { label: "See the review flow", href: "/product#risk" },
  panel: {
    title: "Strata Review",
    waiting: "3 waiting",
    request: {
      agent: "agt_procure-bot",
      amount: "£9,800.00",
      merchant: "[Supplier]",
      reasons: ["Over the £5,000 daily cap", "About 3× this agent’s usual size"],
      tags: [
        { tone: "review" as Signal, label: "risk 0.71" },
        { tone: "approved" as Signal, label: "mandate ✓" },
        { tone: "info" as Signal, label: "ledger #1042" },
      ],
    },
    reply: "Approve once.",
    result: { before: "Approved by [name] at 14:04. Paid and recorded as ", id: "#1043", after: "." },
    suggestions: ["Approve once", "Raise daily cap to £10,000", "Always ask for this supplier"],
    placeholder: "Reply, or ask why this payment was flagged…",
  },
};

/* ── W5 · Features ─────────────────────────────────────────────────── */

export const features = {
  title: ["Everything around the payment,", "in one console."] as [string, string],
  lede: "Set the rules, see the risk, approve what needs a person, and keep a record no one can quietly change.",
  console: "Strata console",
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
  mandate: {
    agent: "agt_travel-booker",
    scope: ["Flights", "Hotels", "Rail"],
    caps: [
      { label: "Per payment", value: "£800" },
      { label: "Per day", value: "£2,000" },
      { label: "Review over", value: "£500" },
    ],
    used: { label: "Used today", value: "£498", pct: 25 },
  },
  risk: {
    title: "agt_procure-bot · last 20 payments",
    score: "0.71",
    bars: [22, 30, 18, 26, 34, 20, 28, 24, 31, 19, 27, 23, 35, 21, 29, 25, 33, 20, 26, 96],
    reasons: ["About 3× this agent’s usual size", "Over the £5,000 daily cap"],
  },
  notify: {
    title: "Strata · needs your approval",
    when: "now",
    amount: "£9,800.00",
    detail: "agt_procure-bot → [Supplier] · over the daily cap",
  },
  ledger: {
    rows: [
      { id: "#1043", event: "review.approved · [name]", hash: "c07d…12" },
      { id: "#1042", event: "decision.review · £9,800", hash: "91ab…3e" },
      { id: "#1041", event: "decision.blocked · £1,250", hash: "a41f…9c" },
      { id: "#1040", event: "mandate.updated · [name]", hash: "7e2c…04" },
    ],
    verified: "Chain verified · every hash matches",
  },
  webhooks: [
    { event: "decision.approved", time: "14:02:11" },
    { event: "decision.review", time: "14:02:19" },
    { event: "decision.blocked", time: "14:02:31" },
    { event: "review.resolved", time: "14:04:02" },
  ],
  test: {
    label: "Test mode on",
    key: "sk_test_••••3f9a",
    rows: [
      { amount: "£412.00", what: "hotel", tone: "approved" as Signal, label: "Approved" },
      { amount: "£1,900.00", what: "flight", tone: "review" as Signal, label: "Review" },
      { amount: "£640.00", what: "laptop", tone: "blocked" as Signal, label: "Blocked" },
    ],
    note: "Simulated · no money moves",
  },
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
  cta: { label: "Read the quickstart", href: "/developers#quickstart" },
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
  footnote: "No card needed for Sandbox · cancel anytime · prices exclude VAT",
  more: { label: "Compare every plan", href: "/pricing" },
};

/* ── W9 · Closing CTA ──────────────────────────────────────────────── */

export const cta = {
  title: ["Give your agents a budget,", "not a blank cheque."] as [string, string],
  primary: { label: "Get started", href: "/pricing" },
  secondary: { label: "Request demo", href: "/demo" },
};
