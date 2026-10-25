"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { SignalDot } from "@/components/elements/DecisionChip";
import { CodeBlock } from "@/components/elements/CodeBlock";
import { quickstart as qs } from "@/constraints/developers";

/**
 * Developers · 02 Quickstart stepper (W3). Four steps on the left; the
 * code window and its output on the right change with the step.
 *
 * Built as a vertical tab list (role tablist / tab / tabpanel) so arrow
 * keys, Home and End move between steps, like any tab set. Every code
 * block has a Copy button; "Copied" is announced politely.
 */
const outColour = {
  approve: "text-approve",
  review: "text-review",
  recorded: "text-recorded-fg",
} as const;

const DevQuickstart = () => {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = qs.steps[active];

  const select = (i: number) => {
    setActive(i);
    setCopied(false);
    tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = qs.steps.length - 1;
    const map: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key]);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(step.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): leave the button as is
    }
  };

  return (
    <Section tone="ink2" id="quickstart" labelledBy="quickstart-title">
      <SectionHeader
        overline={qs.overline}
        title={qs.title}
        titleId="quickstart-title"
        aside={
          <span className="inline-flex items-center gap-2 rounded-full bg-elevated px-3.5 py-2 text-sm text-[#C9CBD1]">
            <SignalDot tone="approve" />
            {qs.badge}
          </span>
        }
      />

      <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-8">
        <div role="tablist" aria-label="Quickstart steps" aria-orientation="vertical" className="flex flex-col gap-2.5" onKeyDown={onKey}>
          {qs.steps.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`qs-tab-${i}`}
                aria-selected={on}
                aria-controls="qs-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={clsx(
                  "flex items-start gap-4 rounded-[20px] px-5 py-4 text-left transition-colors md:px-[22px] md:py-5",
                  on ? "bg-elevated shadow-[inset_0_0_0_1.5px_var(--color-cobalt-500)]" : "shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-elevated/60",
                )}
              >
                <span
                  className={clsx(
                    "flex size-[34px] shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    on ? "bg-cobalt-500 text-white" : "bg-elevated text-fg-muted",
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold">{s.title}</span>
                  <span className="text-[14.5px] leading-snug text-fg-muted">{s.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="qs-panel" role="tabpanel" aria-labelledby={`qs-tab-${active}`} className="flex min-w-0 flex-col gap-3">
          <div className="flex min-h-[320px] flex-1 flex-col overflow-hidden rounded-[22px] border border-line bg-ink">
            <div className="flex h-[50px] shrink-0 items-center gap-3 border-b border-line px-4 md:px-[18px]">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </span>
              <span className="font-mono text-[12.5px] text-fg-muted">{step.file}</span>
              <button
                type="button"
                onClick={copy}
                className="ml-auto rounded-sm bg-elevated px-3 py-1.5 text-[12.5px] text-[#C9CBD1] hover:text-white"
              >
                {copied ? "Copied" : "Copy"}
                <span className="sr-only"> code for step {active + 1}</span>
              </button>
              <span aria-live="polite" className="sr-only">
                {copied ? "Code copied" : ""}
              </span>
            </div>
            <CodeBlock text={step.code} label={`Step ${active + 1} code`} className="flex-1 px-5 py-5 md:px-[26px] md:py-6 md:text-[15px]" />
          </div>
          <div className="flex flex-wrap items-center gap-3.5 rounded-[16px] border border-line bg-ink px-5 py-4 font-mono text-[13.5px]">
            <span className="text-fg-muted">OUTPUT</span>
            <span className={outColour[step.tone]}>{step.out}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DevQuickstart;
