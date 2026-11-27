"use client";

import { TwoTone, V2Section, Lede } from "@/components/elements/V2";
import { PauseButton, ProgressTabs, Reveal, useAutoTabs } from "@/components/elements/V2/client";
import { Visual } from "@/components/elements/Visual";
import { decides } from "@/constraints/home";
import type { VisualSource } from "@/lib/visuals";

/**
 * W3 · How it decides. Header (question in grey, answer in white) and a
 * paragraph; a 640 px stage with a faded decisions table behind a
 * floating "Payment decision" panel; three tabs with progress lines.
 * The table and the panel are animated SVGs (src/visuals/decides-*.svg).
 *
 * The active tab's group in the panel gets a cobalt tint and a 2 px
 * cobalt left bar (data-step on the wrapper, styled inside the SVG). The
 * spec dims the others to 45% opacity; here they turn grey instead, which
 * keeps every label at 4.5:1 contrast. Tabs advance every 5 s while on
 * screen; a click jumps and restarts; reduced motion: no auto-advance.
 * Phones: the faded table is hidden, the panel uses its narrow SVG and the
 * tabs scroll sideways.
 */
const MS = 5000;

type DecidesVisuals = { table: VisualSource; panel: VisualSource; panelMobile: VisualSource };

export default function HowItDecides({ visuals }: { visuals: DecidesVisuals }) {
  const { ref, active, select, cycle, running, reduced, paused, togglePause } = useAutoTabs(decides.tabs.length, MS);

  return (
    <V2Section id="how-it-works" labelledBy="decides-title" hairline innerClassName="flex flex-col gap-12 md:gap-16 md:pb-[100px]">
      <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <TwoTone id="decides-title" lines={decides.title} order="question" className="max-w-[640px]" />
        <Lede className="lg:mt-2">{decides.lede}</Lede>
      </Reveal>

      <div ref={ref} className="flex flex-col gap-10">
        <div className="relative lg:h-[640px]">
          {/* Faded table behind the panel (desktop): src/visuals/decides-table.svg */}
          <div aria-hidden className="absolute left-0 top-[90px] hidden w-[560px] opacity-55 lg:block">
            <Visual source={visuals.table} />
          </div>
          {/* Fade the table into the page on every edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#08090a_0%,rgba(8,9,10,0)_18%,rgba(8,9,10,0)_60%,#08090a_100%),linear-gradient(180deg,#08090a_0%,rgba(8,9,10,0)_20%,rgba(8,9,10,0)_70%,#08090a_100%)] lg:block"
          />

          {/* The decision panel: src/visuals/decides-panel(-mobile).svg. The
              active check is highlighted through data-step, inside the SVG. */}
          <div
            id="decides-panel"
            role="tabpanel"
            aria-labelledby={`decides-tab-${active}`}
            className="relative ml-auto w-full rounded-[18px] shadow-float lg:absolute lg:right-0 lg:top-0 lg:w-[680px]"
          >
            <Visual source={visuals.panel} step={active} className="hidden sm:block" />
            <Visual source={visuals.panelMobile} step={active} className="sm:hidden" />
            <PauseButton
              paused={paused}
              onToggle={togglePause}
              reduced={reduced}
              label="the three checks"
              className="absolute right-4 top-[22px] sm:right-[30px] sm:top-[22px]"
            />
          </div>
        </div>

        <ProgressTabs
          items={decides.tabs}
          active={active}
          onSelect={select}
          cycle={cycle}
          running={running}
          ms={MS}
          label="The three checks"
          idBase="decides"
        />
      </div>
    </V2Section>
  );
}
