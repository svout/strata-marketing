"use client";

import clsx from "clsx";
import { Chip, TwoTone, V2Section, Lede } from "@/components/elements/V2";
import { PauseButton, ProgressTabs, Reveal, useAutoTabs } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { decides, type PanelRow } from "@/constraints/home";

/**
 * W3 · How it decides. Header (question in grey, answer in white) and a
 * paragraph; a 640 px stage with a faded decisions table behind a
 * floating "Payment decision" panel; three tabs with progress lines.
 *
 * The active tab's group in the panel gets a cobalt tint and a 2 px
 * cobalt left bar. The spec dims the others to 45% opacity; here they
 * turn grey instead, which keeps every label at 4.5:1 contrast. Tabs
 * advance every 5 s while on screen; a click jumps and restarts; reduced
 * motion: no auto-advance. Phones: the faded table is hidden, the panel
 * is full width and the tabs scroll sideways.
 */
const MS = 5000;

const sideMark = { approved: "↗", review: "▲", blocked: "✕" } as const;
const sideColour = { approved: "text-approved", review: "text-review", blocked: "text-blocked" } as const;

function Row({ row, wide, dim }: { row: PanelRow; wide?: boolean; dim?: boolean }) {
  const Icon = V2Icons[row.icon];
  return (
    <div
      className={clsx(
        "grid min-h-[30px] items-center gap-2 text-[13px]",
        wide ? "grid-cols-[22px_minmax(0,130px)_minmax(0,1fr)_20px] md:grid-cols-[22px_150px_minmax(0,1fr)_20px]" : "grid-cols-[22px_70px_minmax(0,1fr)_20px]",
      )}
    >
      <Icon size={15} className="text-text-3" />
      <span className="text-text-2">{row.label}</span>
      <span
        className={clsx(
          "break-words font-mono text-[12.5px] sm:truncate",
          dim ? "text-text-2" : row.tone === "review" ? "text-review" : row.tone === "pale" ? "text-cobalt-pale" : "text-text-1",
        )}
      >
        {row.value}
      </span>
      <span aria-hidden className={clsx("text-[13px]", dim ? "text-text-3" : row.mark === "warn" ? "text-review" : "text-approved")}>
        {row.mark === "ok" ? "✓" : row.mark === "warn" ? "▲" : ""}
      </span>
      {row.mark && <span className="sr-only">{row.mark === "ok" ? "passed" : "flagged"}</span>}
    </div>
  );
}

function BackTable() {
  const t = decides.backTable;
  return (
    <div aria-hidden className="absolute left-0 top-[90px] hidden w-[560px] opacity-55 lg:block">
      <div className="mb-3 flex items-center gap-1.5">
        {t.filters.map((f, i) => (
          <span
            key={f}
            className={clsx(
              "rounded-[5px] px-2 py-[3px] text-[10px]",
              i === 0 ? "bg-surface-2 text-text-2" : i === t.filters.length - 1 ? "bg-surface-3 text-text-1" : "text-text-3",
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="grid h-6 grid-cols-[1.6fr_40px_1fr_90px] items-center gap-2.5 text-[10px] text-text-3">
        {t.columns.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      {t.rows.map(([agent, side, amount, time], i) => (
        <div key={i} className="grid h-[30px] grid-cols-[1.6fr_40px_1fr_90px] items-center gap-2.5 border-t border-line font-mono text-[11px]">
          <span className="text-text-2">{agent}</span>
          <span className={sideColour[side]}>{sideMark[side]}</span>
          <span className={sideColour[side]}>{amount}</span>
          <span className="text-text-3">{time}</span>
        </div>
      ))}
    </div>
  );
}

export default function HowItDecides() {
  const { ref, active, select, cycle, running, reduced, paused, togglePause } = useAutoTabs(decides.tabs.length, MS);
  const p = decides.panel;

  return (
    <V2Section id="how-it-works" labelledBy="decides-title" hairline innerClassName="flex flex-col gap-12 md:gap-16 md:pb-[100px]">
      <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <TwoTone id="decides-title" lines={decides.title} order="question" className="max-w-[640px]" />
        <Lede className="lg:mt-2">{decides.lede}</Lede>
      </Reveal>

      <div ref={ref} className="flex flex-col gap-10">
        <div className="relative lg:h-[640px]">
          <BackTable />
          {/* Fade the table into the page on every edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#08090a_0%,rgba(8,9,10,0)_18%,rgba(8,9,10,0)_60%,#08090a_100%),linear-gradient(180deg,#08090a_0%,rgba(8,9,10,0)_20%,rgba(8,9,10,0)_70%,#08090a_100%)] lg:block"
          />

          <div
            id="decides-panel"
            role="tabpanel"
            aria-labelledby={`decides-tab-${active}`}
            className="relative ml-auto flex w-full flex-col gap-1.5 rounded-[18px] bg-surface-1 px-3 pb-[18px] pt-[22px] shadow-float md:px-[22px] lg:absolute lg:right-0 lg:top-0 lg:w-[680px]"
          >
            <div className="flex flex-wrap items-center gap-2.5 px-4 pb-2.5">
              <span className="text-[20px] font-semibold tracking-[-0.02em]">{p.title}</span>
              <Chip tone="review">{p.status}</Chip>
              <span className="ml-auto font-mono text-[12px] text-text-3">{p.id}</span>
              <PauseButton paused={paused} onToggle={togglePause} reduced={reduced} label="the three checks" />
            </div>

            <div className="flex flex-col gap-1 rounded-xl px-4 py-3.5">
              <span className="mb-1.5 text-[14px] font-semibold">Request</span>
              <div className="grid gap-x-4 sm:grid-cols-2">
                {p.request.map((r) => (
                  <Row key={r.label} row={r} />
                ))}
              </div>
            </div>

            {p.groups.map((g, i) => {
              const on = i === active;
              return (
                <div
                  key={g.title}
                  className={clsx(
                    "flex flex-col gap-1 rounded-xl px-4 py-3.5 transition-[opacity,background-color,box-shadow] duration-300",
                    // Spec dims inactive groups to 45%; grey text keeps them at 4.5:1 instead
                    on ? "bg-[rgba(43,89,255,0.08)] shadow-[inset_2px_0_0_#2B59FF]" : "",
                  )}
                >
                  <span className={clsx("mb-1.5 text-[14px] font-semibold", !on && "text-text-2")}>{g.title}</span>
                  {g.rows.map((r) => (
                    <Row key={r.label} row={r} wide dim={!on} />
                  ))}
                </div>
              );
            })}

            <div className="flex justify-end gap-2 px-4 pt-2" aria-hidden>
              <span className="inline-flex h-[34px] items-center rounded-button bg-surface-3 px-4 text-[13px] font-medium shadow-[inset_0_0_0_1px_#2A2C31]">
                {p.actions.decline}
              </span>
              <span className="inline-flex h-[34px] items-center rounded-button bg-cobalt px-4 text-[13px] font-medium text-white">
                {p.actions.approve}
              </span>
            </div>
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
