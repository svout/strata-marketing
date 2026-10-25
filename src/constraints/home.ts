/**
 * Home page (W1) copy and sample data.
 *
 * Copy rules (vault: Marketing Website → Copy rules): only claims that
 * are true today, no invented statistics, no badges until earned.
 * Anything in [brackets] is for the owner to fill in. Every amount,
 * agent ID and ledger number here is SAMPLE data and is labelled as
 * such on the page.
 */
import type {
  AgentKind,
  CodeSample,
  DecideCheck,
  DecisionSample,
  LinkItem,
  ProblemRow,
} from "@/types/home";
import type { FaqItem } from "@/types/product";
import { COMPANY } from "@/config/company";

/** <title> ≤ 60 characters, description ≤ 160: both show in full in search results. */
export const homeMeta = {
  title: `${COMPANY.name}: spending controls for AI agent payments`,
  description: COMPANY.seoDescription,
};

export const hero = {
  label: "Spending controls for AI agents",
  headline: "Your agents can spend.",
  headlineAccent: "You set the limits.",
  lede: "Strata checks every payment an AI agent tries to make, before any money moves.",
  primary: { label: "Request demo", href: "/demo" },
  secondary: { label: "Read the docs", href: "/developers" },
};

/** Live decision panel: loops through these, last one is the default view. */
export const decisionSamples: DecisionSample[] = [
  {
    id: "hotel",
    time: "13:58:04",
    amount: "£412.00",
    agent: "agt_travel-booker",
    payee: "[Hotel]",
    checks: [
      { layer: "Mandate", tone: "approve", note: "hotels allowed" },
      { layer: "Risk", tone: "approve", note: "normal for this agent" },
      { layer: "Ledger", tone: "recorded", note: "#1039 recorded" },
    ],
    outcome: "approve",
    headline: "Approved",
    detail: "Inside the mandate. The payment goes ahead.",
  },
  {
    id: "shop",
    time: "14:01:47",
    amount: "£1,250.00",
    agent: "agt_travel-booker",
    payee: "[Unknown shop]",
    checks: [
      { layer: "Mandate", tone: "block", note: "merchant not in mandate" },
      { layer: "Risk", tone: "neutral", note: "not reached" },
      { layer: "Ledger", tone: "recorded", note: "#1041 recorded" },
    ],
    outcome: "block",
    headline: "Blocked",
    detail: "No mandate covers this merchant. Nothing charged.",
  },
  {
    id: "supplier",
    time: "14:02:19",
    amount: "£9,800.00",
    agent: "agt_procure-bot",
    payee: "[Supplier]",
    checks: [
      { layer: "Mandate", tone: "approve", note: "supplier allowed" },
      { layer: "Risk", tone: "review", note: "over £5,000 daily cap" },
      { layer: "Ledger", tone: "recorded", note: "#1042 recorded" },
    ],
    outcome: "review",
    headline: "Sent to review",
    detail: "Nothing charged until you decide.",
  },
];

export const earlierDecisions = [
  { label: "£412.00 hotel · approved", outcome: "approve" as const },
  { label: "£1,250.00 · blocked, no mandate", outcome: "block" as const },
  { label: "£86.40 rail · approved", outcome: "approve" as const },
];

export const logoStrip = {
  label: "Teams putting agents in charge of spend",
  logos: ["[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]"],
};

export const problem = {
  overline: "The problem",
  title: "Agents are starting to pay for things. The controls haven't caught up.",
  aside:
    "Card limits were built for people. Here is one afternoon of agent spending, without and with Strata.",
  withoutTitle: "Without controls",
  withoutMeta: "4 problems",
  withTitle: "With Strata",
  withMeta: "all decided",
  rows: [
    {
      time: "13:02",
      without: "Travel agent books the same £640 flight **14 times** in a loop",
      with: "Stopped at the 4th booking: over the £2,000 daily cap",
      outcome: "block",
    },
    {
      time: "13:40",
      without: "A poisoned prompt sends **£4,200** to an unknown shop",
      with: "Merchant isn't in the agent's mandate",
      outcome: "block",
    },
    {
      time: "14:02",
      without: "A **£9,800** supplier order goes through, no one asked",
      with: "Unusual size, paused for a person to approve",
      outcome: "review",
    },
    {
      time: "17:30",
      without: "Finance asks who approved it. **Nobody knows.**",
      with: "Ledger #1042: approved by [name] at 14:04",
      outcome: "recorded",
    },
  ] satisfies ProblemRow[],
};

/**
 * 03 How Strata decides (board 03B, design/Home Section 03 Handoff.md).
 * The H2 and the three columns are real text for SEO; the animated
 * window (widgets/HowStrataDecides/scene.ts) is illustration only.
 */
export const decides = {
  overline: "How Strata decides",
  title: "Three checks before any money moves.",
  titleRest: "Watch three payments go through them: one paid, one paused for a person, one stopped.",
  checks: [
    {
      id: "mandate",
      label: "01 Mandate",
      lead: "Is the agent allowed?",
      rest: "Merchants, caps and time windows you set.",
    },
    {
      id: "risk",
      label: "02 Risk",
      lead: "Does it look normal?",
      rest: "Unusual payments wait for a person.",
    },
    {
      id: "ledger",
      label: "03 Ledger",
      lead: "Write it down.",
      rest: "Every outcome, chained so no one can quietly edit it.",
    },
  ] satisfies DecideCheck[],
};

export const mandateSentence = {
  overline: "Built for any agent that spends",
  title: "Write the rule the way you'd say it.",
  resultsLabel: "Today Strata would have",
  kinds: [
    {
      id: "travel",
      label: "Travel",
      agent: "travel agent",
      amount: "£800",
      per: "booking",
      what: "flights, hotels & rail",
      over: "£500",
      who: "me",
      results: [
        { amount: "£412.00", what: "hotel", outcome: "approve" },
        { amount: "£1,900.00", what: "flight", outcome: "review" },
        { amount: "£640.00", what: "laptop", outcome: "block" },
      ],
    },
    {
      id: "procurement",
      label: "Procurement",
      agent: "procurement bot",
      amount: "£5,000",
      per: "day",
      what: "12 approved suppliers",
      over: "£3,000",
      who: "finance",
      results: [
        { amount: "£2,310.00", what: "supplier", outcome: "approve" },
        { amount: "£9,800.00", what: "supplier", outcome: "review" },
        { amount: "£480.00", what: "unknown shop", outcome: "block" },
      ],
    },
    {
      id: "refunds",
      label: "Refunds",
      agent: "support agent",
      amount: "£150",
      per: "refund",
      what: "customer refunds",
      over: "£100",
      who: "the team lead",
      results: [
        { amount: "£42.00", what: "refund", outcome: "approve" },
        { amount: "£120.00", what: "refund", outcome: "review" },
        { amount: "£150.00", what: "to a new card", outcome: "block" },
      ],
    },
    {
      id: "saas",
      label: "SaaS & API",
      agent: "ops agent",
      amount: "£1,500",
      per: "month",
      what: "tools we already use",
      over: "£500",
      who: "IT",
      results: [
        { amount: "£120.00", what: "renewal", outcome: "approve" },
        { amount: "£1,480.00", what: "new vendor", outcome: "review" },
        { amount: "£99.00", what: "crypto exchange", outcome: "block" },
      ],
    },
  ] satisfies AgentKind[],
};

export const developers = {
  overline: "For developers",
  title: "Put one API call in front of every payment.",
  primary: { label: "Read the quickstart", href: "/developers" },
  secondary: { label: "API reference", href: "/developers#api" },
  endpoint: "POST /v1/payments",
  samples: [
    {
      id: "python",
      label: "Python",
      request: [
        [["# request", "comment"]],
        [["decision = strata.pay(", "plain"]],
        [["  agent=", "plain"], ['"agt_procure-bot"', "str"], [",", "plain"]],
        [["  amount=", "plain"], ["9800_00", "num"], [",", "plain"]],
        [["  currency=", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [["  merchant=", "plain"], ['"[supplier_id]"', "str"], [",", "plain"]],
        [[")", "plain"]],
      ],
    },
    {
      id: "typescript",
      label: "TypeScript",
      illustrative: true,
      request: [
        [["// request", "comment"]],
        [["const decision = await strata.pay({", "plain"]],
        [["  agent: ", "plain"], ['"agt_procure-bot"', "str"], [",", "plain"]],
        [["  amount: ", "plain"], ["980000", "num"], [",", "plain"]],
        [["  currency: ", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [["  merchant: ", "plain"], ['"[supplier_id]"', "str"], [",", "plain"]],
        [["});", "plain"]],
      ],
    },
    {
      id: "go",
      label: "Go",
      illustrative: true,
      request: [
        [["// request", "comment"]],
        [["decision, err := client.Pay(ctx, strata.PayParams{", "plain"]],
        [["  Agent:    ", "plain"], ['"agt_procure-bot"', "str"], [",", "plain"]],
        [["  Amount:   ", "plain"], ["980000", "num"], [",", "plain"]],
        [["  Currency: ", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [["  Merchant: ", "plain"], ['"[supplier_id]"', "str"], [",", "plain"]],
        [["})", "plain"]],
      ],
    },
    {
      id: "curl",
      label: "cURL",
      illustrative: true,
      request: [
        [["# request", "comment"]],
        [["curl https://api.[domain]/v1/payments \\", "plain"]],
        [["  -H ", "plain"], ['"Authorization: Bearer $STRATA_KEY"', "str"], [" \\", "plain"]],
        [["  -d agent=", "plain"], ["agt_procure-bot", "str"], [" \\", "plain"]],
        [["  -d amount=", "plain"], ["980000", "num"], [" -d currency=", "plain"], ["GBP", "str"], [" \\", "plain"]],
        [["  -d merchant=", "plain"], ["[supplier_id]", "str"]],
      ],
    },
  ] satisfies CodeSample[],
  response: [
    [["# response", "comment"]],
    [["{", "plain"]],
    [["  ", "plain"], ['"outcome"', "key"], [":   ", "plain"], ['"review"', "num"], [",", "plain"]],
    [["  ", "plain"], ['"reason"', "key"], [":    ", "plain"], ['"over daily cap"', "str"], [",", "plain"]],
    [["  ", "plain"], ['"layer"', "key"], [":     ", "plain"], ['"risk"', "str"], [",", "plain"]],
    [["  ", "plain"], ['"ledger_id"', "key"], [": ", "plain"], ['"led_91ab…3e"', "str"]],
    [["}", "plain"]],
  ] satisfies CodeSample["request"],
  tiles: [
    { title: "SDKs", detail: "Python · TypeScript · [Go status]" },
    { title: "Webhooks", detail: "decision.* · review.resolved" },
    { title: "Test mode", detail: "sk_test_… keys, no real money" },
    { title: "OpenAPI spec", detail: "generate your own client" },
  ],
};

export const trust = {
  overline: "Trust",
  title: "Built to be audited, not just trusted.",
  link: { label: "Security at Strata", href: "/security" },
  ledger: {
    title: "A tamper-evident ledger",
    body: "Each entry carries the fingerprint of the one before it. Change one, and every entry after it stops matching.",
    chain: [
      { id: "#1040", hash: "7e2c…04" },
      { id: "#1041", hash: "a41f…9c" },
      { id: "#1042", hash: "91ab…3e" },
      { id: "#1043", hash: "c07d…12" },
    ],
    verified: "12,480 entries verified",
    checkedAt: "checked 14:05",
  },
  pillars: [
    {
      icon: "shield",
      title: "Workspace isolation",
      body: "One team's data can never be read by another. [How isolation is tested]",
    },
    {
      icon: "pulse",
      title: "Explainable by default",
      body: "Every decision says which layer decided, and why.",
    },
    {
      icon: "download",
      title: "Yours to export",
      body: "The full log as CSV, whenever finance or auditors ask.",
    },
  ] as const,
};

/**
 * Home FAQ. Each answer stands on its own (search snippets and AI answers
 * quote one at a time) and only restates claims made elsewhere on the
 * site. Marked up as FAQPage, so keep the visible text and the data the same.
 */
export const homeFaq = {
  title: "Questions about agent spending controls",
  items: [
    {
      question: "What is Strata?",
      answer:
        "Strata is a spending-control layer for AI agents. It sits between your agents and your payment provider and checks every payment an agent tries to make, before any money moves. Each payment is approved, sent to a person for review, or blocked.",
    },
    {
      question: "How does Strata decide whether an agent's payment goes ahead?",
      answer:
        "Every payment attempt passes three checks, in order. Mandate: is the agent allowed to make this payment? Risk: does it look normal for this agent? Ledger: the outcome is written down, whatever it is.",
    },
    {
      question: "What can a mandate control?",
      answer:
        "A mandate is the set of rules one agent must follow: allowed merchants and categories, per-payment, daily and monthly caps, time windows and currencies, and an amount above which a person has to approve.",
    },
    {
      question: "What happens when a payment looks unusual?",
      answer:
        "Strata scores each attempt against the agent's normal behaviour and shows the top reasons behind the score. Unusual payments wait for a person to decide, and nothing is charged until they do.",
    },
    {
      question: "How can auditors tell the record hasn't been changed?",
      answer:
        "Every attempt, decision and override is written to a tamper-evident ledger. Each entry carries the fingerprint of the one before it, so changing one entry breaks every entry after it. The chain can be verified and exported as CSV at any time.",
    },
    {
      question: "How do developers add Strata to an agent?",
      answer:
        "Put one API call in front of every payment. Strata has a REST API, webhooks and SDKs, and every call returns a decision, a reason and a ledger ID. Test mode uses sk_test_ keys, so no real money moves.",
    },
  ] satisfies FaqItem[],
};

export const cta = {
  title: "Give your agents a budget,",
  titleAccent: "not a blank cheque.",
  primary: { label: "Request demo", href: "/demo" },
  secondary: { label: "Read the docs", href: "/developers" },
};

export const footer = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/product" },
        { label: "Use cases", href: "/#built-for" },
        { label: "Security", href: "/security" },
        { label: "Request demo", href: "/demo" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Quickstart", href: "/developers" },
        { label: "API reference", href: "/developers#api" },
        { label: "Status", href: "#" /* [status page URL] */ },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" /* later (site map) */ },
        { label: "Privacy", href: "#" /* [privacy policy] */ },
        { label: "Terms", href: "#" /* [terms] */ },
      ],
    },
  ] satisfies { title: string; links: LinkItem[] }[],
  legal: "© [year] [Legal entity]",
};
