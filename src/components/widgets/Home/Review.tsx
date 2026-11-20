"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Btn, Chip, GlowTile, Lede, LogoTile, Mark, Tag, TwoTone, v2Container } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { review } from "@/constraints/home";

/**
 * W4 · Review. Approval as a conversation. When the panel scrolls into
 * view the three messages arrive one by one, each after a short typing
 * indicator. Reduced motion: all shown at once. The server HTML has all
 * three, so nothing is hidden without JavaScript.
 */
function Typing() {
  return (
    <span className="inline-flex gap-1 rounded-2xl bg-surface-2 px-4 py-3.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="typing-dot size-1.5 rounded-full bg-text-2" style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </span>
  );
}

export default function Review() {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  // -1 = server / no-JS: show everything. Then 0…3 messages as they arrive.
  const [shown, setShown] = useState(-1);
  const [typing, setTyping] = useState(false);
  const p = review.panel;

  useEffect(() => {
    if (reduced) return;
    // Start hidden only if the panel isn't on screen yet
    setShown((s) => (s === -1 ? 0 : s));
  }, [reduced]);

  useEffect(() => {
    if (reduced || !inView || shown < 0 || shown >= 3) return;
    setTyping(true);
    const t = window.setTimeout(
      () => {
        setTyping(false);
        setShown((s) => s + 1);
      },
      shown === 0 ? 700 : 1100,
    );
    return () => window.clearTimeout(t);
  }, [inView, shown, reduced]);

  const visible = (i: number) => shown === -1 || reduced || shown > i;

  return (
    <section id="review" aria-labelledby="review-title" className="relative overflow-hidden bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,#111A3D,rgba(17,26,61,0))]" />
      <div className={clsx(v2Container, "relative pb-20 pt-20 md:pb-[110px] md:pt-[120px]")}>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <GlowTile>
            <Mark size={40} />
          </GlowTile>
          <TwoTone id="review-title" lines={review.title} size="h2-lg" className="mt-2" />
          <Lede className="max-w-[520px]">{review.lede}</Lede>
          <Btn href={review.cta.href}>{review.cta.label}</Btn>
        </Reveal>

        <div ref={ref} className="mx-auto mt-10 max-w-[1120px] rounded-panel-lg bg-surface-1 shadow-edge md:mt-10">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <LogoTile size={22} />
            <p className="text-[14px] font-medium">{p.title}</p>
            <Chip tone="review" className="ml-auto">
              {p.waiting}
            </Chip>
          </div>

          <div className="flex min-h-[300px] flex-col gap-4 p-4 md:p-6" aria-live="polite">
            {visible(0) && (
              <div className="max-w-[420px] self-start rounded-2xl bg-surface-2 p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
                <p className="text-[14px]">
                  <span className="font-mono">{p.request.agent}</span> wants to pay <strong className="font-semibold">{p.request.amount}</strong> to{" "}
                  {p.request.merchant}.
                </p>
                <ul className="mt-2.5 flex flex-col gap-1 text-[13px] text-text-2">
                  {p.request.reasons.map((r) => (
                    <li key={r}>
                      <span aria-hidden>▲ </span>
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.request.tags.map((t) => (
                    <Tag key={t.label} tone={t.tone}>
                      {t.label}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {visible(1) && (
              <p className="self-end rounded-2xl bg-cobalt px-4 py-3.5 text-[14px] text-white">{p.reply}</p>
            )}
            {visible(2) && (
              <p className="self-start rounded-2xl bg-surface-2 px-4 py-3.5 text-[14px] shadow-[inset_0_0_0_1px_var(--color-line)]">
                {p.result.before}
                <span className="font-mono text-cobalt-pale">{p.result.id}</span>
                {p.result.after}
              </p>
            )}
            {typing && <span className={shown === 1 ? "self-end" : "self-start"}><Typing /></span>}

            <div className="mt-auto flex flex-col gap-3 pt-2">
              <ul className="flex flex-wrap gap-2" aria-label="Suggested replies">
                {p.suggestions.map((s) => (
                  <li key={s} className="rounded-button px-3 py-1.5 text-[13px] text-text-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex h-12 items-center rounded-card bg-surface-2 pl-4 pr-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                <span className="grow truncate text-[14px] text-text-3">{p.placeholder}</span>
                <span aria-hidden className="flex size-8 items-center justify-center rounded-button bg-cobalt text-white">
                  <V2Icons.Send size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
