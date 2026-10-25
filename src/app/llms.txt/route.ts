import { COMPANY } from "@/config/company";
import { absoluteUrl } from "@/config/site";
import { homeMeta } from "@/constraints/home";
import { productMeta } from "@/constraints/product";
import { devMeta } from "@/constraints/developers";
import { securityMeta } from "@/constraints/security";
import { demoMeta } from "@/constraints/demo";

/**
 * /llms.txt (llmstxt.org): a Markdown map of the site for AI assistants
 * and coding agents. Google Search ignores it; it neither helps nor
 * hurts rankings. Built from the same copy as the page metadata.
 */
export const dynamic = "force-static";

const pages = [
  { name: "How it works", path: "/product", meta: productMeta },
  { name: "Developers", path: "/developers", meta: devMeta },
  { name: "Security", path: "/security", meta: securityMeta },
  { name: "Request a demo", path: "/demo", meta: demoMeta },
];

export function GET() {
  const body = [
    `# ${COMPANY.name}`,
    "",
    `> ${homeMeta.description}`,
    "",
    "Every payment attempt passes three checks, in order: Mandate (is the agent allowed?), Risk (does it look normal for this agent?) and Ledger (the outcome is written to a tamper-evident, hash-chained record). Each payment is approved, sent to a person for review, or blocked.",
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): ${homeMeta.title}`,
    ...pages.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.meta.description}`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
