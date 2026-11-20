"use client";

import { useState } from "react";
import clsx from "clsx";
import { Btn, TwoTone, V2Section } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { connect } from "@/constraints/home";

/**
 * W2 · Connect. Eight payment-rail categories (not partner logos), a
 * connector drawn from each tile to the panel, and the connection panel.
 * Clicking a rail selects it: the glow and the cobalt connector line move
 * and the panel label changes to "<Rail> connection".
 * Phones: tiles in a 4×2 grid, connector hidden, panel stacked.
 */

/** Connector: each tile drops a line and curves to the centre; one line then drops to a dot. */
function Connector({ count, selected }: { count: number; selected: number }) {
  const W = 1000;
  // Tiles are spread with justify-between; the svg spans first to last tile centre
  const xs = Array.from({ length: count }, (_, i) => (W / (count - 1)) * i);
  const mid = W / 2;
  const path = (x: number) => {
    const dir = x < mid ? 1 : -1;
    return `M ${x} 0 V 30 Q ${x} 40 ${x + 10 * dir} 40 H ${mid}`;
  };
  return (
    <div aria-hidden className="relative hidden md:block">
    <svg viewBox={`0 0 ${W} 80`} preserveAspectRatio="none" className="block h-20 w-full overflow-visible">
      {xs.map((x, i) =>
        i === selected ? null : (
          <path key={i} d={path(x)} fill="none" stroke="#2A2C31" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        ),
      )}
      <path d={path(xs[selected])} fill="none" stroke="#2B59FF" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <path d={`M ${mid} 40 V 78`} fill="none" stroke="#2A2C31" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </svg>
      <span className="absolute bottom-0 left-1/2 size-[5px] -translate-x-1/2 translate-y-1/2 rounded-full bg-line-strong" />
    </div>
  );
}

export default function Connect() {
  const [selected, setSelected] = useState(0);
  const rail = connect.rails[selected];

  return (
    <V2Section id="connect" labelledBy="connect-title" innerClassName="flex flex-col gap-12 md:gap-14">
      <Reveal>
        <TwoTone id="connect-title" lines={connect.title} className="mx-auto max-w-[900px] text-center" />
      </Reveal>

      <Reveal className="flex flex-col">
        <div role="group" aria-label="Payment rails" className="grid grid-cols-4 gap-y-6 md:flex md:justify-between">
          {connect.rails.map((r, i) => {
            const Icon = V2Icons[r.icon];
            const on = i === selected;
            return (
              <button
                key={r.label}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(i)}
                className="group flex flex-col items-center gap-2.5 rounded-md md:w-[68px]"
              >
                <span
                  className={clsx(
                    "flex size-14 items-center justify-center rounded-[14px] bg-surface-2 transition-[box-shadow,color] duration-300",
                    on
                      ? "text-white shadow-[inset_0_0_0_1px_#2A2C31,0_0_24px_rgba(43,89,255,0.5)]"
                      : "text-text-2 shadow-[inset_0_0_0_1px_#2A2C31] group-hover:text-text-1",
                  )}
                >
                  <Icon size={22} />
                </span>
                <span className={clsx("whitespace-nowrap text-[12px] transition-colors", on ? "text-text-1" : "text-text-2")}>
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-[34px] max-md:mt-8">
          <Connector count={connect.rails.length} selected={selected} />
        </div>

        <div className="grid gap-8 rounded-panel-lg bg-surface-1 p-6 shadow-edge md:h-[400px] md:grid-cols-[minmax(0,1fr)_420px] md:gap-10 md:p-8">
          <div className="flex flex-col justify-between gap-10">
            <p className="text-[14px] text-text-2" aria-live="polite">
              {rail.label} connection
            </p>
            <div className="flex max-w-[420px] flex-col gap-5">
              <p className="text-[16px] leading-normal">
                <span className="font-semibold">{connect.panel.lead}</span>{" "}
                <span className="text-text-2">{connect.panel.body}</span>
              </p>
              <div>
                <Btn href={connect.panel.cta.href} variant="accent">
                  {connect.panel.cta.label}
                </Btn>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 rounded-card bg-surface-2 p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <p className="mb-1 text-[15px] font-semibold">{connect.manager.title}</p>
            <p className="text-[12px] text-text-3">{connect.manager.label}</p>
            <ul className="flex flex-col gap-1.5">
              {connect.manager.rows.map((w) => (
                <li
                  key={w.name}
                  className={clsx("flex items-center gap-2.5 rounded-button px-3 py-2.5 text-[14px]", w.selected && "bg-surface-3")}
                >
                  <V2Icons.Wallet size={16} className="text-text-2" />
                  <span className="grow">{w.name}</span>
                  <span className="font-mono text-[12px] text-text-2">{w.meta}</span>
                </li>
              ))}
              <li className="flex items-center gap-2.5 px-3 py-2.5 text-[14px] text-text-2">
                <V2Icons.Plus size={16} />
                {connect.manager.add}
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </V2Section>
  );
}
