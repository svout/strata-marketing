"use client";

import { useRef } from "react";
import clsx from "clsx";
import { Chip, Lede, LogoTile, Tag, TwoTone, V2Section } from "@/components/elements/V2";
import { PauseButton, Reveal, useAutoTabs } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { features } from "@/constraints/home";

/**
 * W5 · Features. Vertical tabs on the left; on the right a 720 px
 * "Strata console" panel whose centre card changes with the tab
 * (cross-fade 200 ms, rises 8 px). Auto-advances every 6 s while on
 * screen; reduced motion: no auto-advance. Phones: the list becomes a
 * row of pills above the panel.
 */
const MS = 6000;

const card = "w-full max-w-[460px] rounded-panel bg-surface-2 p-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_-20px_rgba(0,0,0,0.9)]";

function Mandates() {
  const m = features.mandate;
  return (
    <div className={clsx(card, "flex flex-col gap-3.5")}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px]">{m.agent}</span>
        <Chip tone="approved">Active</Chip>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {m.scope.map((s) => (
          <span key={s} className="flex h-7 items-center rounded-[7px] bg-surface-3 px-2.5 text-[13px]">
            {s}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {m.caps.map((c) => (
          <div key={c.label} className="flex flex-col rounded-[10px] bg-surface-1 px-3 py-2.5">
            <span className="text-[12px] text-text-3">{c.label}</span>
            <span className="font-mono text-[15px]">{c.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 text-[12px] text-text-2">
        {m.used.label}
        <div className="h-1.5 grow rounded-[3px] bg-surface-3">
          <div className="h-1.5 rounded-[3px] bg-cobalt" style={{ width: `${m.used.pct}%` }} />
        </div>
        <span className="font-mono text-text-1">{m.used.value}</span>
      </div>
    </div>
  );
}

function Risk() {
  const r = features.risk;
  return (
    <div className={clsx(card, "flex flex-col gap-3.5")}>
      <div className="flex justify-between gap-3">
        <span className="font-mono text-[13px] text-text-2">{r.title}</span>
        <Tag tone="review">{r.score}</Tag>
      </div>
      <div className="flex h-[150px] items-end gap-1 border-b border-line">
        {r.bars.map((h, i) => (
          <div
            key={i}
            className={clsx("grow rounded-t-[2px]", i === r.bars.length - 1 ? "bg-review" : "bg-[rgba(43,89,255,0.45)]")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-1.5 text-[13px] text-text-2">
        {r.reasons.map((x) => (
          <li key={x}>
            <span aria-hidden className="text-review">
              ▲{" "}
            </span>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Notify() {
  const n = features.notify;
  return (
    <div className={clsx(card, "flex flex-col gap-3.5")}>
      <div className="flex items-center gap-2.5">
        <LogoTile size={22} />
        <span className="text-[14px] font-medium">{n.title}</span>
        <span className="ml-auto text-[12px] text-text-3">{n.when}</span>
      </div>
      <span className="font-mono text-[26px]">{n.amount}</span>
      <span className="text-[13px] text-text-2">{n.detail}</span>
      <div className="flex gap-2">
        <span className="inline-flex h-9 items-center rounded-button bg-cobalt px-4 text-[13px] font-medium text-white">Approve</span>
        <span className="inline-flex h-9 items-center rounded-button bg-surface-3 px-4 text-[13px] font-medium shadow-[inset_0_0_0_1px_#2A2C31]">
          Decline
        </span>
      </div>
    </div>
  );
}

function Ledger() {
  const l = features.ledger;
  return (
    <div className={clsx(card, "flex flex-col gap-3.5")}>
      <div>
        {l.rows.map((r) => (
          <div key={r.id} className="grid h-[34px] grid-cols-[56px_minmax(0,1fr)_80px] items-center gap-2.5 border-t border-line text-[12.5px] first:border-t-0">
            <span className="font-mono text-[12px] text-cobalt-pale">{r.id}</span>
            <span className="truncate">{r.event}</span>
            <span className="font-mono text-[11px] text-text-3">{r.hash}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 rounded-[10px] bg-[rgba(86,182,131,0.1)] px-3 py-2.5 text-[13px] text-approved">
        <V2Icons.Check size={16} />
        {l.verified}
      </div>
    </div>
  );
}

function Webhooks() {
  return (
    <div className={clsx(card, "flex flex-col")}>
      {features.webhooks.map((w) => (
        <div key={w.event} className="flex h-9 items-center gap-2.5 border-t border-line text-[12.5px] first:border-t-0">
          <Tag>POST</Tag>
          <span className="font-mono text-[12px]">{w.event}</span>
          <span className="ml-auto">
            <Tag tone="approved">200</Tag>
          </span>
          <span className="font-mono text-[11px] text-text-3">{w.time}</span>
        </div>
      ))}
    </div>
  );
}

function TestMode() {
  const t = features.test;
  return (
    <div className={clsx(card, "flex flex-col gap-3.5")}>
      <div className="flex items-center gap-2.5 text-[14px]">
        <span aria-hidden className="relative h-5 w-9 rounded-full bg-review">
          <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-bg" />
        </span>
        {t.label}
        <span className="ml-auto font-mono text-[12px] text-text-2">{t.key}</span>
      </div>
      <div>
        {t.rows.map((r) => (
          <div key={r.amount} className="flex h-[34px] items-center gap-2.5 border-t border-line text-[13px]">
            <span className="font-mono text-[12px]">{r.amount}</span>
            <span className="text-text-2">{r.what}</span>
            <span className="ml-auto">
              <Chip tone={r.tone}>{r.label}</Chip>
            </span>
          </div>
        ))}
      </div>
      <span className="text-[12px] text-text-3">{t.note}</span>
    </div>
  );
}

const panels = [Mandates, Risk, Notify, Ledger, Webhooks, TestMode];

export default function Features() {
  const { ref, active, select, cycle, reduced, paused, togglePause } = useAutoTabs(features.items.length, MS);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const Panel = panels[active];

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
            <Panel />
          </div>
        </div>
      </div>
    </V2Section>
  );
}
