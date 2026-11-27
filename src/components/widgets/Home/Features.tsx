"use client";

import { useRef } from "react";
import clsx from "clsx";
import { Lede, LogoTile, TwoTone, V2Section } from "@/components/elements/V2";
import { PauseButton, Reveal, useAutoTabs } from "@/components/elements/V2/client";
import { Visual } from "@/components/elements/Visual";
import { features } from "@/constraints/home";
import type { VisualSource } from "@/lib/visuals";

/**
 * W5 · Features. Vertical tabs on the left; on the right a 720 px
 * "Strata console" panel whose centre card changes with the tab
 * (cross-fade 200 ms, rises 8 px). Each card is an animated SVG
 * (src/visuals/features-*.svg) whose parts build in when it appears. Auto-advances every 6 s while on
 * screen; reduced motion: no auto-advance. Phones: the list becomes a
 * row of pills above the panel.
 */
const MS = 6000;

/** One animated SVG card per tab, in tab order (src/visuals/features-*.svg) */
export default function Features({ cards }: { cards: VisualSource[] }) {
  const { ref, active, select, cycle, reduced, paused, togglePause } = useAutoTabs(features.items.length, MS);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = features.items.length;
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (to < 0) return;
    e.preventDefault();
    select(to);
    buttons.current[to]?.focus();
  };

  return (
    <V2Section id="product" labelledBy="features-title" hairline>
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-20">
        <Reveal className="flex min-w-0 flex-col gap-7">
          <TwoTone id="features-title" lines={features.title} className="max-w-[440px]" />
          <Lede className="max-w-[400px]">{features.lede}</Lede>
          <div
            role="tablist"
            aria-label="Console features"
            aria-orientation="vertical"
            className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
          >
            {features.items.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.id}
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`features-tab-${i}`}
                  aria-selected={on}
                  aria-controls="features-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={clsx(
                    "flex shrink-0 gap-[18px] rounded-sm text-left max-lg:h-9 max-lg:items-center max-lg:rounded-button max-lg:px-3.5 lg:py-2.5",
                    on ? "max-lg:bg-surface-3 max-lg:shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "",
                  )}
                >
                  <span aria-hidden className={clsx("hidden w-0.5 shrink-0 rounded-[1px] lg:block", on ? "bg-text-1" : "bg-line-strong")} />
                  <span className="flex flex-col gap-1.5">
                    <span className={clsx("whitespace-nowrap font-medium max-lg:text-[14px] lg:text-[17px]", on ? "text-text-1" : "text-text-3")}>
                      {f.title}
                    </span>
                    {on && <span className="hidden max-w-[380px] text-[14px] leading-[1.6] text-text-2 lg:block">{f.desc}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Phones: the active description under the pills */}
          <p className="-mt-3 text-[14px] leading-[1.6] text-text-2 lg:hidden">{features.items[active].desc}</p>
        </Reveal>

        <div
          id="features-panel"
          role="tabpanel"
          aria-labelledby={`features-tab-${active}`}
          className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-feature bg-surface-1 px-5 pb-10 pt-16 shadow-edge lg:h-[720px]"
        >
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(43,89,255,0.14)_0%,rgba(43,89,255,0)_70%)]" />
          <div className="absolute left-7 top-6 flex items-center gap-2.5">
            <LogoTile size={22} />
            <span className="text-[13px] text-text-2">{features.console}</span>
          </div>
          <PauseButton paused={paused} onToggle={togglePause} reduced={reduced} label="feature tour" className="absolute right-5 top-5" />
          <div key={`${active}-${cycle}`} className="relative flex w-full justify-center animate-[feature-in_200ms_ease-out_both] motion-reduce:animate-none">
            <Visual source={cards[active]} className="w-full max-w-[460px] rounded-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]" />
          </div>
        </div>
      </div>
    </V2Section>
  );
}
