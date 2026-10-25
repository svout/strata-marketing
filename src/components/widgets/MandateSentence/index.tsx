"use client";

import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { SignalDot } from "@/components/elements/DecisionChip";
import { mandateSentence as content } from "@/constraints/home";
import type { Outcome } from "@/types/home";

/**
 * 05 Built for: the rule IS the section. Pick an agent type with the
 * toggle group and every blank in the sentence (the agent is highlighted
 * in cobalt, the rest in light blue) plus "Today Strata would have…"
 * updates.
 * The results line is a polite live region so the change is announced.
 */
const outcomeText: Record<Outcome, { label: string; fg: string }> = {
  approve: { label: "approved", fg: "text-approve-fg" },
  review: { label: "sent to review", fg: "text-review-fg" },
  block: { label: "blocked", fg: "text-block-fg" },
};

/** One filled-in blank of the sentence */
const Blank = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-brand-subtle px-[0.4em] pb-[0.08em] text-brand-on-subtle [box-decoration-break:clone]">
    {children}
  </span>
);

const MandateSentence = () => {
  const [kindId, setKindId] = useState(content.kinds[0].id);
  const kind = content.kinds.find((k) => k.id === kindId) ?? content.kinds[0];

  return (
    <Section tone="white" id="built-for" labelledBy="built-for-title">
      <SectionHeader
        overline={content.overline}
        title={content.title}
        titleId="built-for-title"
        aside={
          <ToggleButtonGroup
            exclusive
            value={kindId}
            onChange={(_, v: string | null) => v && setKindId(v)}
            aria-label="Agent type"
          >
            {content.kinds.map((k) => (
              <ToggleButton key={k.id} value={k.id}>
                {k.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        }
      />

      <div className="mt-8 flex flex-col gap-10 rounded-[24px] bg-surface px-5 py-8 md:mt-10 md:rounded-[36px] md:px-16 md:py-14 lg:min-h-[480px] lg:justify-between">
        <p className="text-[clamp(1.75rem,1rem+3vw,3.125rem)] font-semibold leading-[1.45] tracking-[-0.04em]">
          My{" "}
          {/* The agent is highlighted, not interactive: switch it with the toggles above */}
          <span className="rounded-full bg-cobalt-500 px-[0.45em] pb-[0.08em] text-white [box-decoration-break:clone]">
            {kind.agent}
          </span>{" "}
          can spend up to <Blank>{kind.amount}</Blank> per <Blank>{kind.per}</Blank> on <Blank>{kind.what}</Blank>.
          Anything over <Blank>{kind.over}</Blank> asks <Blank>{kind.who}</Blank> first.
        </p>

        <div
          aria-live="polite"
          className="flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:flex-wrap md:items-center"
        >
          <span className="text-[15px] text-fg-muted md:mr-2">{content.resultsLabel}</span>
          <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-3">
            {kind.results.map((r) => (
              <li
                key={r.amount + r.what}
                className="inline-flex items-center gap-2 self-start rounded-full bg-elevated px-4 py-2.5 text-sm"
              >
                <SignalDot tone={r.outcome} />
                <span className="font-mono">{r.amount}</span>
                <span className="text-fg-muted">{r.what}</span>
                <b className={outcomeText[r.outcome].fg}>{outcomeText[r.outcome].label}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default MandateSentence;
