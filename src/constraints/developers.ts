/**
 * Developers (W3) copy and sample code.
 *
 * Copy rules: only claims that are true today; [brackets] are for the
 * owner to fill in. Package names, statuses, timeouts and event names
 * stay as placeholders until the API spec is final (W3 note 03). All
 * code is illustrative SAMPLE code against a test key.
 */
import type { CodeLine } from "@/types/home";

export const devMeta = {
  title: "Agent payments API, SDKs and webhooks",
  description:
    "Add spending controls to any AI agent with one API call. REST API, SDKs and webhooks: every call returns a decision, a reason and a ledger ID.",
};

export const devHero = {
  overline: "Developers",
  headline: "Put Strata in front of every payment.",
  lede: "A REST API, webhooks and SDKs. Every call returns a decision, a reason and a ledger ID.",
  primary: { label: "Read the quickstart", href: "#quickstart" },
  secondary: { label: "API reference", href: "#api" },
  samples: [
    {
      id: "curl",
      label: "cURL",
      code: [
        [["curl https://api.[domain]/v1/payments \\", "plain"]],
        [["  -H ", "plain"], ['"Authorization: Bearer sk_test_…"', "str"], [" \\", "plain"]],
        [["  -d agent=", "plain"], ["agt_travel-booker", "str"], [" \\", "plain"]],
        [["  -d amount=", "plain"], ["41200", "num"], [" -d currency=", "plain"], ["GBP", "str"]],
      ],
    },
    {
      id: "python",
      label: "Python",
      code: [
        [["decision = strata.pay(", "plain"]],
        [["    agent=", "plain"], ['"agt_travel-booker"', "str"], [",", "plain"]],
        [["    amount=", "plain"], ["412_00", "num"], [",", "plain"]],
        [["    currency=", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [[")", "plain"]],
      ],
    },
    {
      id: "typescript",
      label: "TypeScript",
      code: [
        [["const decision = await strata.pay({", "plain"]],
        [["  agent: ", "plain"], ['"agt_travel-booker"', "str"], [",", "plain"]],
        [["  amount: ", "plain"], ["41200", "num"], [",", "plain"]],
        [["  currency: ", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [["});", "plain"]],
      ],
    },
    {
      id: "go",
      label: "Go",
      code: [
        [["decision, err := client.Pay(ctx, strata.PayParams{", "plain"]],
        [["  Agent:    ", "plain"], ['"agt_travel-booker"', "str"], [",", "plain"]],
        [["  Amount:   ", "plain"], ["41200", "num"], [",", "plain"]],
        [["  Currency: ", "plain"], ['"GBP"', "str"], [",", "plain"]],
        [["})", "plain"]],
      ],
    },
  ] satisfies { id: string; label: string; code: CodeLine[] }[],
  response: [
    [["{ ", "plain"], ['"outcome"', "key"], [": ", "plain"], ['"approve"', "str"], [",", "plain"]],
    [["  ", "plain"], ['"reason"', "key"], [": ", "plain"], ['"within mandate"', "str"], [",", "plain"]],
    [["  ", "plain"], ['"ledger_id"', "key"], [": ", "plain"], ['"led_7e2c…04"', "str"], [" }", "plain"]],
  ] satisfies CodeLine[],
};

export const quickstart = {
  overline: "Quickstart",
  title: "From zero to your first decision.",
  badge: "Runs in test mode, no real money moves",
  steps: [
    {
      title: "Install the SDK",
      sub: "Python or TypeScript, or call the REST API directly.",
      file: "terminal",
      code: "pip install [package]\n\n# or\nnpm install [package]",
      out: "✓ installed [package]",
      tone: "approve",
    },
    {
      title: "Register an agent",
      sub: "Every agent gets its own ID, so every payment has an owner.",
      file: "setup.py",
      code: 'from strata import Strata\n\nstrata = Strata(api_key="sk_test_…")\n\nagent = strata.agents.create(\n    name="travel-booker",\n)',
      out: "agt_travel-booker  created · test mode",
      tone: "approve",
    },
    {
      title: "Add a mandate",
      sub: "The rules this agent must follow, in code or in the console.",
      file: "setup.py",
      code: 'strata.mandates.create(\n    agent="agt_travel-booker",\n    categories=["flights", "hotels", "rail"],\n    per_payment=800_00,\n    per_day=2000_00,\n    review_over=500_00,\n)',
      out: '"May book flights, hotels and rail up to £800 each…"',
      tone: "recorded",
    },
    {
      title: "Send a test payment",
      sub: "Get a decision, a reason and a ledger ID back.",
      file: "agent.py",
      code: 'decision = strata.pay(\n    agent="agt_travel-booker",\n    amount=1900_00,\n    currency="GBP",\n    merchant="[airline_id]",\n)\n\nprint(decision.outcome, decision.reason)',
      out: "review  over £500 review threshold",
      tone: "review",
    },
  ] as const,
};

export const sdks = {
  overline: "SDKs & webhooks",
  title: "Call it from anywhere. Hear back when it matters.",
  sdkNote: "Generated from one OpenAPI spec",
  rows: [
    { name: "Python", install: "pip install [package]", status: "[Available]", tone: "approve" },
    { name: "TypeScript", install: "npm install [package]", status: "[Available]", tone: "approve" },
    { name: "Go", install: "go get [module]", status: "[Beta]", tone: "review" },
    { name: "REST", install: "https://api.[domain]/v1", status: "[Available]", tone: "approve" },
  ] as const,
  openapi: { name: "OpenAPI", file: "strata-openapi.yaml", label: "Download", href: "#" /* [spec URL] */ },
  missing: "Missing your language? Generate a client from the spec.",
  webhookNote: "One payment's life, as events",
  events: [
    {
      name: "decision.review_requested",
      time: "14:02:19",
      tone: "review",
      payload: [
        [["{ ", "plain"], ['"decision"', "key"], [": ", "plain"], ['"dec_7Kq2…f19"', "str"], [",", "plain"]],
        [["  ", "plain"], ['"amount"', "key"], [": ", "plain"], ["980000", "num"], [", ", "plain"], ['"layer"', "key"], [": ", "plain"], ['"risk"', "str"], [",", "plain"]],
        [["  ", "plain"], ['"reason"', "key"], [": ", "plain"], ['"over daily cap"', "str"], [" }", "plain"]],
      ] satisfies CodeLine[],
    },
    { name: "review.resolved", time: "14:03:40", tone: "recorded", note: "Approved by [name] from the console" },
    { name: "decision.approved", time: "14:03:41", tone: "approve", note: "Your agent retries the payment and it goes through" },
    { name: "ledger.recorded", time: "14:03:41", tone: "brand", note: "Entry #1043 chained to #1042" },
  ],
  webhookFooter: "Signed payloads and automatic retries. [Confirm signing scheme and retry policy]",
};

export const reliability = {
  overline: "Reliability",
  title: "Know exactly what happens when things go wrong.",
  aside: "Strata sits in your payment path, so every failure has a defined, predictable outcome.",
  columns: ["If…", "Strata…", "You control"],
  rows: [
    {
      when: "Strata can't be reached",
      then: "The SDK applies the fallback you chose, and logs it for the ledger once back.",
      control: 'fallback: "block" | "allow"',
    },
    {
      when: "A request is sent twice",
      then: "Returns the original decision. Nothing is charged twice.",
      control: "Idempotency-Key header",
    },
    { when: "A decision is slow", then: "Times out after [X ms] and applies your fallback.", control: "timeout_ms" },
    { when: "Nobody answers a review", then: "[Declines after X hours] and tells the agent why.", control: "review_ttl" },
  ],
  tiles: [
    { title: "Test mode", detail: "sk_test_ keys, same API, no money", mono: false },
    { title: "Public status page", detail: "status.[domain]", mono: true },
    { title: "Request IDs", detail: "On every response, for support and tracing", mono: false },
  ],
};

export const devCta = {
  title: "Your first decision",
  titleAccent: "in a few calls.",
  primary: { label: "Get API key", href: "/demo" /* [sign-up URL] once self-serve keys exist */ },
  secondary: { label: "Read the docs", href: "#quickstart" /* [docs URL] */ },
};
