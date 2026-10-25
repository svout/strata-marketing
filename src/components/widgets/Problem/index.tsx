"use client";

import clsx from "clsx";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { DecisionChip, outcomeLabel } from "@/components/elements/DecisionChip";
import { LogoMark } from "@/components/elements/Logo";
import { useReveal } from "@/hooks/useReveal";
import { problem } from "@/constraints/home";
import { primitives } from "@/config/tokens";

/**
 * 03 Problem: "the same afternoon, twice". The two cards share grid rows
 * (CSS subgrid), so each "without" row lines up with its "with" row and
 * the eye reads across. On scroll the right card decides each row in turn.
 */

/** Renders **bold** spans from the content file */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <b key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}

const rowCount = problem.rows.length + 1; // header + rows

const Problem = () => {
  const [ref, revealed] = useReveal<HTMLDivElement>(0.3);

  return (
    <Section tone="white" labelledBy="problem-title" className="!pt-8 md:!pt-16 lg:!pt-24">
      <SectionHeader
        overline={problem.overline}
        title={problem.title}
        titleId="problem-title"
        aside={<p className="max-w-[340px] text-body-lg text-fg-muted">{problem.aside}</p>}
      />

      <div
        ref={ref}
        className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5"
        style={{ gridTemplateRows: `repeat(${rowCount}, auto)` }}
      >
        {/* Without */}
        <div
          data-theme="dark"
          className="grid grid-rows-subgrid rounded-[24px] bg-ink px-5 py-6 md:rounded-[28px] md:px-7 md:py-7"
          style={{ gridRow: `span ${rowCount}` }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{problem.withoutTitle}</h3>
            <span className="font-mono text-xs text-block-fg">● {problem.withoutMeta}</span>
          </div>
          {problem.rows.map((r) => (
            <p
              key={r.time}
              className="grid grid-cols-[52px_minmax(0,1fr)] gap-3.5 border-t border-elevated py-4 text-[15px] text-[#C9CBD1] md:grid-cols-[64px_minmax(0,1fr)]"
            >
              <span className="font-mono text-[12.5px] text-mist">{r.time}</span>
              <span>
                <Rich text={r.without} />
              </span>
            </p>
          ))}
        </div>

        {/* With Strata */}
        <div
          className="grid grid-rows-subgrid rounded-[24px] bg-surface px-5 py-6 md:rounded-[28px] md:px-7 md:py-7"
          style={{ gridRow: `span ${rowCount}` }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2.5 text-xl font-semibold">
              <LogoMark size={24} tile={primitives.cobalt[500]} bars={primitives.white} />
              {problem.withTitle}
            </h3>
            <span className="font-mono text-xs text-approve-fg">● {problem.withMeta}</span>
          </div>
          {problem.rows.map((r, i) => (
            <p
              key={r.time}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 border-t border-line py-3.5 text-[15px]"
            >
              <span>{r.with}</span>
              <span
                className={clsx(
                  "transition-all duration-500",
                  revealed ? "scale-100 opacity-100" : "scale-90 opacity-0",
                )}
                style={{ transitionDelay: revealed ? `${i * 450}ms` : "0ms" }}
              >
                <DecisionChip tone={r.outcome}>{outcomeLabel[r.outcome]}</DecisionChip>
              </span>
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Problem;
