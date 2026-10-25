"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { DecisionChip, SignalDot } from "@/components/elements/DecisionChip";
import { containerClass } from "@/components/containers/Section";
import { Icons } from "@/components/icons";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { decisionSamples, earlierDecisions, logoStrip } from "@/constraints/home";
import type { ChipTone, DecisionSample } from "@/types/home";

/**
 * 02 Live decision panel (W1). One payment flows through the layers:
 * request slides in → Mandate, Risk, Ledger light one by one → the
 * decision appears. Loops through three SAMPLE payments.
 *
 * - First paint (and no-JS, and reduced motion) shows the finished
 *   £9,800 "Sent to review" state from the mock-up.
 * - The loop only runs while the panel is on screen, and has a visible
 *   pause button (WCAG 2.2.2, auto-updating content).
 */
const STEP_MS = 650; // between layers
const HOLD_MS = 3800; // on the finished decision

// Phase: 0 request · 1 mandate · 2 risk · 3 ledger · 4 decision
const LAST = decisionSamples.length - 1;

const layerTint: Record<ChipTone, string> = {
  approve: "bg-approve-tint",
  review: "bg-review-tint",
  block: "bg-block-tint",
  recorded: "bg-recorded-tint",
  neutral: "bg-surface",
};
const noteColour: Record<ChipTone, string> = {
  approve: "text-approve-fg",
  review: "text-review-fg",
  block: "text-block-fg",
  recorded: "text-recorded-fg font-mono text-[12.5px]",
  neutral: "text-fg-muted",
};
const decisionDot: Record<DecisionSample["outcome"], string> = {
  approve: "bg-mint",
  review: "bg-amber",
  block: "bg-[#FF7A7E]",
};

function Arrow() {
  return (
    <span aria-hidden className="flex justify-center text-mist">
      <Icons.ArrowRight size={20} className="rotate-90 lg:rotate-0" />
    </span>
  );
}

function Panel({ sample, phase }: { sample: DecisionSample; phase: number }) {
  // A new sample mounts at phase 0 and slides in on the next frame;
  // the first (server-rendered) sample is already in place.
  const [entered, setEntered] = useState(phase !== 0);
  useEffect(() => {
    if (entered) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [entered]);

  const show = "translate-x-0 opacity-100";
  const hide = "-translate-x-3 opacity-0";
  return (
    <div className="grid items-center gap-3 lg:grid-cols-[250px_32px_minmax(0,1fr)_32px_260px] lg:gap-0">
      {/* Request */}
      <div
        className={clsx(
          "flex flex-col gap-2 rounded-[20px] bg-surface p-5 transition-all duration-500",
          entered ? show : hide,
        )}
      >
        <span className="font-mono text-overline uppercase text-fg-muted">Agent wants to pay</span>
        <span className="font-mono text-[26px] font-medium md:text-[30px]">{sample.amount}</span>
        <span className="font-mono text-[13px]">{sample.agent}</span>
        <span className="text-[13px] text-fg-muted">→ {sample.payee}</span>
      </div>

      <Arrow />

      {/* Three layers, shifted like the mark */}
      <ol className="flex flex-col gap-2.5" aria-label="Checks">
        {sample.checks.map((c, i) => {
          const on = phase >= i + 1;
          const tone = on ? c.tone : "neutral";
          return (
            <li
              key={c.layer}
              className={clsx(
                "flex h-[52px] items-center gap-2.5 rounded-full px-5 text-[15px] transition-colors duration-300",
                layerTint[tone],
                i === 0 && "md:ml-12",
                i === 1 && "md:mx-6",
                i === 2 && "md:mr-12",
              )}
            >
              <SignalDot tone={tone} />
              <b className="font-semibold">{c.layer}</b>
              <span className={clsx("ml-auto truncate text-right text-sm md:text-[15px]", noteColour[tone])}>
                {on ? c.note : "…"}
              </span>
            </li>
          );
        })}
      </ol>

      <Arrow />

      {/* Decision: always dark, like the mock */}
      <div
        data-theme="dark"
        className="flex min-h-[172px] flex-col gap-2.5 rounded-[20px] bg-ink p-5"
        aria-live="off"
      >
        <span className="font-mono text-overline uppercase text-fg-muted">Decision</span>
        {phase >= 4 ? (
          <>
            <span className="flex items-center gap-2 text-[22px] font-semibold">
              <span aria-hidden className={clsx("size-2.5 rounded-full", decisionDot[sample.outcome])} />
              {sample.headline}
            </span>
            <span className="text-[13px] text-fg-muted">{sample.detail}</span>
            {sample.outcome === "review" && (
              // Illustration of the review controls, not real buttons
              <div aria-hidden className="mt-1 flex gap-1.5 text-[13px] font-semibold">
                <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-cobalt-500">Approve</span>
                <span className="flex h-9 flex-1 items-center justify-center rounded-full border-[1.5px] border-slate">
                  Decline
                </span>
              </div>
            )}
          </>
        ) : (
          <span className="flex items-center gap-2 text-[22px] font-semibold text-fg-muted">Checking…</span>
        )}
      </div>
    </div>
  );
}

const LiveDecision = () => {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>(0.3, false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(LAST);
  const [phase, setPhase] = useState(4);

  const running = !reduced && !paused && inView;

  useEffect(() => {
    if (!running) return;
    const delay = phase < 4 ? STEP_MS : HOLD_MS;
    const t = window.setTimeout(() => {
      if (phase < 4) setPhase(phase + 1);
      else {
        setIndex((i) => (i + 1) % decisionSamples.length);
        setPhase(0);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [running, phase]);

  const sample = decisionSamples[index];

  return (
    <section aria-label="How a decision looks" className="relative bg-elevated pb-16 md:pb-24">
      <div className={containerClass}>
        <figure
          ref={ref}
          className="relative z-10 mx-auto -mt-28 flex max-w-[1120px] flex-col gap-5 rounded-[24px] bg-elevated p-4 shadow-panel md:-mt-[220px] md:gap-6 md:rounded-[30px] md:px-8 md:py-7"
        >
          <figcaption className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-approve" />
              <span className="text-[15px] font-semibold">Live decision</span>
              <span className="font-mono text-xs text-fg-muted">{sample.time}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-overline text-fg-muted">SAMPLE</span>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-pressed={paused}
                  className="flex size-9 items-center justify-center rounded-full text-fg-muted hover:bg-surface hover:text-fg"
                >
                  <span className="sr-only">{paused ? "Play animation" : "Pause animation"}</span>
                  {paused ? <Icons.Play size={16} /> : <Icons.Pause size={16} />}
                </button>
              )}
            </span>
          </figcaption>

          {/* key= restarts the slide-in for each new sample */}
          <Panel key={sample.id} sample={sample} phase={phase} />

          <div className="flex flex-wrap items-center gap-2.5 border-t border-[#EEECE6] pt-4 text-[13px]">
            <span className="mr-1.5 text-fg-muted">Earlier</span>
            {earlierDecisions.map((d) => (
              <DecisionChip key={d.label} tone={d.outcome} dot={false} className="text-[13px]">
                {d.label}
              </DecisionChip>
            ))}
          </div>
        </figure>

        {/* Logo strip: placeholders until real customers can be named */}
        <div className="mx-auto mt-12 flex max-w-[1120px] flex-col gap-4 md:mt-16 md:flex-row md:items-center md:gap-8">
          <p className="shrink-0 text-sm text-fg-muted">{logoStrip.label}</p>
          <ul className="grid flex-1 grid-cols-3 gap-2.5 md:grid-cols-5 md:gap-4">
            {logoStrip.logos.map((l, i) => (
              <li
                key={i}
                className={clsx(
                  "flex h-8 items-center justify-center rounded-sm bg-surface font-mono text-[11px] text-fg-muted md:h-10 md:text-xs",
                  i > 2 && "hidden md:flex",
                )}
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LiveDecision;
