/** Shared shapes for the Home page content (src/constraints/home.ts). */

export type Outcome = "approve" | "review" | "block";
export type ChipTone = Outcome | "recorded" | "neutral";

export type LinkItem = { label: string; href: string };

export type LayerCheck = {
  layer: "Mandate" | "Risk" | "Ledger";
  tone: ChipTone;
  note: string;
};

export type DecisionSample = {
  id: string;
  time: string;
  amount: string;
  agent: string;
  payee: string;
  checks: [LayerCheck, LayerCheck, LayerCheck];
  outcome: Outcome;
  headline: string;
  detail: string;
};

export type ProblemRow = {
  time: string;
  /** Plain text with **bold** spans, rendered by the widget */
  without: string;
  with: string;
  outcome: Outcome | "recorded";
};

/** One of the three checks listed under the section 03 animation */
export type DecideCheck = {
  id: string;
  label: string;
  /** Lead phrase, shown in ink */
  lead: string;
  rest: string;
};

export type AgentKind = {
  id: string;
  label: string;
  agent: string;
  amount: string;
  per: string;
  what: string;
  over: string;
  who: string;
  results: { amount: string; what: string; outcome: Outcome }[];
};

/** A line of highlighted code: [text, token kind] pairs */
export type CodeToken = [string, "plain" | "str" | "num" | "key" | "comment"];
export type CodeLine = CodeToken[];

export type CodeSample = {
  id: string;
  label: string;
  request: CodeLine[];
  illustrative?: boolean;
};
