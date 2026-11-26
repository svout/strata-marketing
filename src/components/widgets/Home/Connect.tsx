"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import clsx from "clsx";
import { Btn, Chip, TwoTone, V2Section } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { useInView } from "@/hooks/useInView";
import { connect, type ConnectRail } from "@/constraints/home";

/**
 * W2 · Connect. Eight payment-rail tiles, each with its label, joined to
 * the connection panel below by lines.
 *
 * Nothing moves on its own. Clicking a tile (or arrow keys, it's a tab
 * list) draws that rail's line from the tile down to the panel in the
 * rail's colour. When the line arrives, the panel lights up and its
 * content for that rail (heading, pitch, button and a sample card)
 * animates in. The first rail plays once when the section scrolls into
 * view. Reduced motion: everything just appears.
 * Phones: tiles in a 4×2 grid, no lines, content animates in straight away.
 * Line timing: --draw-ms (0 on phones, 900 ms from md) on the wrapper.
 */

const H = 96; // connector height (px)
const Y = 44; // where the branch lines run across
const R = 14; // corner radius

/** Measures its own width so the lines are drawn in real pixels (no stretched strokes). */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/** Below the label → down → across → round the corner → down the trunk to the panel. */
function railPath(x: number, mid: number) {
  if (Math.abs(x - mid) < 1) return `M ${x} 0 V ${H}`;
  const d = x < mid ? 1 : -1;
  return `M ${x} 0 V ${Y - R} Q ${x} ${Y} ${x + R * d} ${Y} H ${mid - R * d} Q ${mid} ${Y} ${mid} ${Y + R} V ${H}`;
}

function Connector({ rails, active, prev, run }: { rails: readonly ConnectRail[]; active: number; prev: number; run: string }) {
  const [ref, w] = useWidth<HTMLDivElement>();
  const n = rails.length;
  const mid = w / 2;
  const xs = rails.map((_, i) => (w / (n - 1)) * i);
  const color = rails[active].color;

  return (
    <div ref={ref} aria-hidden className="relative hidden md:block" style={{ height: H }}>
      {w > 0 && (
        <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} className="absolute inset-0 overflow-visible">
          {/* Resting lines */}
          {xs.map((x, i) => (
            <path key={i} d={railPath(x, mid)} fill="none" stroke="#2A2C31" strokeWidth={1.5} />
          ))}

          {/* The previous rail's line fades out */}
          {prev >= 0 && prev !== active && (
            <path key={`prev-${run}`} d={railPath(xs[prev], mid)} className="rail-fade" fill="none" stroke={rails[prev].color} strokeWidth={1.5} />
          )}

          {/* The chosen rail's line draws down to the panel: soft glow under the line itself */}
          <g key={`on-${run}`}>
            <path
              d={railPath(xs[active], mid)}
              pathLength={1}
              className="rail-draw"
              fill="none"
              stroke={color}
              strokeOpacity={0.25}
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path d={railPath(xs[active], mid)} pathLength={1} className="rail-draw" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
          </g>
        </svg>
      )}
      {/* Where the line meets the panel */}
      <span className="absolute bottom-0 left-1/2 size-[5px] -translate-x-1/2 translate-y-1/2 rounded-full bg-line-strong" />
      <span
        key={`dot-${run}`}
        className="rail-hit absolute bottom-[-3.5px] left-[calc(50%-3.5px)] size-[7px] rounded-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

/** Fades and lifts in once the line has arrived; `i` staggers the pieces. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

function PanelContent({ rail }: { rail: ConnectRail }) {
  return (
    <>
      <div className="relative flex flex-col justify-between gap-10">
        <div style={step(0)} className="connect-in flex items-center gap-2.5">
          <span aria-hidden className="size-2 rounded-full" style={{ background: rail.color, boxShadow: `0 0 10px ${rail.color}` }} />
          <h3 className="plain text-[14px] font-normal text-text-2">{rail.label} connection</h3>
        </div>
        <div className="flex max-w-[440px] flex-col gap-5">
          <p style={step(1)} className="connect-in text-[16px] leading-normal md:text-[17px]">
            <span className="font-semibold">{rail.lead}</span> <span className="text-text-2">{rail.body}</span>
          </p>
          <div style={step(2)} className="connect-in">
            <Btn href={rail.cta.href} variant="accent">
              {rail.cta.label}
            </Btn>
          </div>
        </div>
      </div>

      <div
        style={step(1)}
        className="connect-in relative flex flex-col gap-1.5 self-end rounded-card bg-surface-2 p-5 shadow-[inset_0_0_0_1px_var(--color-line)]"
      >
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold">{rail.card.title}</p>
          <span className="font-mono text-[11px] text-text-3">{connect.sample}</span>
        </div>
        <p className="truncate text-[12px] text-text-3">{rail.card.label}</p>
        <ul className="flex flex-col gap-1">
          {rail.card.rows.map((row, i) => {
            const Icon = V2Icons[row.icon];
            return (
              <li key={row.name} style={step(2 + i)} className="connect-in flex items-center gap-3 rounded-button px-2.5 py-2 odd:bg-surface-3/60">
                <Icon size={16} className="shrink-0 text-text-2" />
                <span className="flex min-w-0 grow flex-col">
                  <span className="text-[14px] md:truncate">{row.name}</span>
                  <span className="font-mono text-[11.5px] text-text-2 md:truncate">{row.meta}</span>
                </span>
                <Chip tone={row.status.tone}>{row.status.label}</Chip>
              </li>
            );
          })}
          <li style={step(5)} className="connect-in flex items-center gap-3 px-2.5 py-2 text-[14px] text-text-2">
            <V2Icons.Plus size={16} />
            {rail.card.add}
          </li>
        </ul>
      </div>
    </>
  );
}

export default function Connect() {
  const rails = connect.rails;
  const [active, setActive] = useState(0);
  const [viewRef, seen] = useInView<HTMLDivElement>(0.35, true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Remember which rail was chosen before, so its line can fade out
  const [track, setTrack] = useState({ cur: active, prev: -1 });
  if (track.cur !== active) setTrack({ cur: active, prev: track.cur });

  // Changes on every new choice (and once on first view), replaying the line and the content
  const run = `${active}-${seen}`;
  const rail = rails[active];

  const choose = (i: number) => {
    if (i !== active) setActive(i);
  };
  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: rails.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + rails.length) % rails.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <V2Section id="connect" labelledBy="connect-title" innerClassName="flex flex-col gap-12 md:gap-14">
      <Reveal>
        <TwoTone id="connect-title" lines={connect.title} className="mx-auto max-w-[900px] text-center" />
      </Reveal>

      <Reveal>
        <div ref={viewRef} className="flex flex-col [--draw-ms:0ms] md:[--draw-ms:900ms]">
          <div className="relative">
            {/* Faint rule the tiles sit on */}
            <span aria-hidden className="absolute inset-x-0 top-7 hidden h-px bg-[linear-gradient(90deg,transparent,#1F2125_12%,#1F2125_88%,transparent)] md:block" />
            <div
              role="tablist"
              aria-label="Payment rails"
              onKeyDown={onKey}
              className="relative grid grid-cols-4 gap-y-6 md:flex md:justify-between"
            >
              {rails.map((r, i) => {
                const Icon = V2Icons[r.icon];
                const on = i === active;
                return (
                  <button
                    key={r.label}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`rail-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="rail-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(i)}
                    className="group flex flex-col items-center rounded-md md:w-[68px]"
                  >
                    <span
                      className={clsx(
                        "flex size-14 items-center justify-center rounded-[14px] bg-surface-2 transition-[box-shadow,color] duration-500",
                        !on && "text-text-2 shadow-[inset_0_0_0_1px_#2A2C31] group-hover:text-text-1 group-hover:shadow-[inset_0_0_0_1px_#3A3D44]",
                      )}
                      style={on ? { color: r.color, boxShadow: `inset 0 0 0 1px ${r.color}80, 0 0 28px ${r.color}59` } : undefined}
                    >
                      <Icon size={22} />
                    </span>
                    {/* Stub from the tile to its label */}
                    <span aria-hidden className="flex h-3 flex-col items-center">
                      <span className="h-1.5 w-px bg-line-strong" />
                      <span className="size-[3px] rounded-full transition-colors duration-500" style={{ background: on ? r.color : "#2A2C31" }} />
                    </span>
                    <span
                      className={clsx(
                        "mt-1 whitespace-nowrap text-[12px] transition-colors md:text-[13px]",
                        on ? "text-text-1" : "text-text-2 group-hover:text-text-1",
                      )}
                    >
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-[34px] pt-3 max-md:mt-8 max-md:pt-0">
            <Connector rails={rails} active={active} prev={track.prev} run={run} />
          </div>

          <div
            id="rail-panel"
            role="tabpanel"
            aria-labelledby={`rail-tab-${active}`}
            className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-panel-lg bg-surface-1 p-6 shadow-edge md:min-h-[400px] md:grid-cols-[minmax(0,1fr)_440px] md:gap-10 md:p-8"
          >
            {/* The panel lights up in the colour of the rail whose line just arrived */}
            <span
              key={`glow-${run}`}
              aria-hidden
              className="rail-glow pointer-events-none absolute inset-x-0 top-0 h-[240px]"
              style={{
                background: `radial-gradient(60% 100% at 50% 0%, ${rail.color}24 0%, transparent 70%), linear-gradient(90deg, transparent 15%, ${rail.color} 50%, transparent 85%) top / 100% 1px no-repeat`,
              }}
            />
            <PanelContent key={`content-${run}`} rail={rail} />
          </div>
        </div>
      </Reveal>
    </V2Section>
  );
}
