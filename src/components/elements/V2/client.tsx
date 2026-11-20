"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * v2 client pieces: the fade-up reveal and the auto-advancing tabs with
 * a progress line (W3, W5, W6).
 */

/** Fades its content up 16 px once, on entering the viewport. Static for reduced motion. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, revealed] = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={clsx("reveal", revealed && "is-in", className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/**
 * Auto-advancing tab state.
 * - Advances every `ms` while the section is on screen (IntersectionObserver).
 * - A click jumps to a tab and restarts the timer.
 * - Reduced motion: no auto-advance.
 * Returns `cycle`, a key that changes on every (re)start, so the progress
 * fill's CSS animation restarts from 0.
 */
export function useAutoTabs(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const running = onScreen && !reduced && !paused;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setActive((a) => (a + 1) % count);
      setCycle((c) => c + 1);
    }, ms);
    return () => window.clearTimeout(t);
    // cycle restarts the timer after a click
  }, [running, ms, count, cycle]);

  const select = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
    setCycle((c) => c + 1);
  }, []);

  return { ref, active, select, cycle, running, reduced, paused, togglePause };
}

/**
 * Pause / play for auto-advancing content (WCAG 2.2.2). Hidden when the
 * visitor prefers reduced motion, since nothing advances then.
 */
export function PauseButton({
  paused,
  onToggle,
  reduced,
  label,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  reduced: boolean;
  label: string;
  className?: string;
}) {
  if (reduced) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      className={clsx("flex size-7 items-center justify-center rounded-chip text-text-3 transition-colors hover:text-text-1", className)}
    >
      {paused ? (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <rect x="2.5" y="1.5" width="2.2" height="9" rx="0.6" fill="currentColor" />
          <rect x="7.3" y="1.5" width="2.2" height="9" rx="0.6" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

type TabItem = { title: string; desc: string };

/**
 * Tabs under a stage (W3, W6): equal columns, each with a title, a line of
 * description and a 2 px progress track. The active fill animates 0 → 100%;
 * earlier tabs show full, later ones empty.
 */
export function ProgressTabs({
  items,
  active,
  onSelect,
  cycle,
  running,
  ms,
  label,
  idBase,
}: {
  items: TabItem[];
  active: number;
  onSelect: (i: number) => void;
  cycle: number;
  running: boolean;
  ms: number;
  label: string;
  idBase: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const to =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    onSelect(to);
    refs.current[to]?.focus();
  };
  return (
    <div
      role="tablist"
      aria-label={label}
      className="-mx-5 flex snap-x scroll-px-5 gap-6 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:overflow-visible md:px-0"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((t, i) => {
        const on = i === active;
        return (
          <button
            key={t.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${i}`}
            aria-selected={on}
            aria-controls={`${idBase}-panel`}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKey(e, i)}
            className="flex min-w-[220px] snap-start flex-col gap-1.5 rounded-sm text-left md:min-w-0"
          >
            <span className={clsx("text-[16px] font-medium transition-colors", on ? "text-text-1" : "text-text-2")}>{t.title}</span>
            <span className="text-[14px] text-text-2">{t.desc}</span>
            <span aria-hidden className="mt-2.5 block h-0.5 overflow-hidden rounded-[1px] bg-line-strong">
              <span
                key={on ? `run-${cycle}` : "idle"}
                className={clsx(
                  "tab-fill block h-0.5 bg-text-1",
                  i < active && "is-done",
                  on && (running ? "is-running" : "is-done"),
                )}
                style={on ? ({ "--tab-ms": `${ms}ms` } as React.CSSProperties) : undefined}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
