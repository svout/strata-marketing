import type { ElementType, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { btn, type BtnVariant } from "@/lib/ui";

/**
 * v2 building blocks (Design System v2 → Components): buttons as links,
 * decision chips, data tags, the two-tone heading, the glow tile and the
 * hairline. Server components; no client JavaScript.
 */

/* ── Buttons ──────────────────────────────────────────────────────── */

type BtnProps = {
  href: string;
  variant?: BtnVariant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
  /** Extra text for screen readers when the label alone is ambiguous */
  srLabel?: string;
};

/** A link styled as a v2 button. External URLs open in a new tab. */
export function Btn({ href, variant = "primary", size = "md", className, children, srLabel }: BtnProps) {
  const external = /^https?:\/\//.test(href);
  const content = (
    <>
      {children}
      {srLabel && <span className="sr-only"> {srLabel}</span>}
      {variant === "link" && (
        <span aria-hidden className="text-text-2">
          ›
        </span>
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const cls = btn(variant, className, size);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/* ── Chips and tags ───────────────────────────────────────────────── */

export type Signal = "approved" | "review" | "blocked" | "info" | "neutral";

const chipTone: Record<Signal, string> = {
  approved: "bg-approved-bg text-approved",
  review: "bg-review-bg text-review",
  blocked: "bg-blocked-bg text-blocked",
  info: "bg-info-bg text-cobalt-pale",
  neutral: "bg-neutral-bg text-text-2",
};

/** Decision chip: 22 px, radius 6, a 6 px dot in front, 12/500, tinted. */
export function Chip({ tone, children, className }: { tone: Signal; children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex h-[22px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-chip px-2 text-[12px] font-medium",
        chipTone[tone],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

/** Data tag: 20 px, radius 4, Geist Mono 11. */
export function Tag({ tone = "neutral", children, className }: { tone?: Signal; children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-tag px-1.5 font-mono text-[11px]",
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Headings ─────────────────────────────────────────────────────── */

type TwoToneProps = {
  /** The two sentences, in reading order */
  lines: [ReactNode, ReactNode];
  /**
   * "claim": white then grey (the first line is the claim).
   * "question": grey then white (the first line is a question).
   * "white": both lines white.
   */
  order?: "claim" | "question" | "white";
  as?: ElementType;
  size?: "display" | "h1" | "h2" | "h2-lg" | "cta";
  id?: string;
  className?: string;
};

const headingSize: Record<NonNullable<TwoToneProps["size"]>, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  "h2-lg": "text-h2-lg",
  cta: "text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] leading-[1.02]",
};

/**
 * The v2 signature heading: two sentences on two lines, one white and one
 * grey. On narrow screens the lines wrap naturally.
 */
export function TwoTone({ lines, order = "claim", as: Tag = "h2", size = "h2", id, className }: TwoToneProps) {
  const [a, b] = lines;
  return (
    <Tag id={id} className={clsx("text-balance font-bold tracking-[-0.05em]", headingSize[size], className)}>
      <span className={order === "question" ? "text-text-2" : "text-text-1"}>{a}</span>
      <br />
      <span className={order === "claim" ? "text-text-2" : "text-text-1"}>{b}</span>
    </Tag>
  );
}

/* ── Small pieces ─────────────────────────────────────────────────── */

/** 1 px line across the 1200 px column (sections W3, W5, W6) */
export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={clsx("h-px w-full bg-line", className)} />;
}

/** 64 px (or 56 px) tile with a cobalt glow behind it (W4, W6, W9) */
export function GlowTile({
  children,
  size = 64,
  gradient = "linear-gradient(180deg,#2A3A7A,#141B3A)",
  className,
}: {
  children: ReactNode;
  size?: number;
  gradient?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={clsx("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-[-24px] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.45),transparent)]" />
      <span
        className="relative flex size-full items-center justify-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        style={{ background: gradient, borderRadius: size * 0.27 }}
      >
        {children}
      </span>
    </span>
  );
}

/** The mark only (three pills), for use inside tiles */
export function Mark({ size = 24, fill = "#FFFFFF" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <g fill={fill}>
        <rect x="18" y="7" width="24" height="9" rx="4.5" />
        <rect x="12" y="19.5" width="24" height="9" rx="4.5" />
        <rect x="6" y="32" width="24" height="9" rx="4.5" />
      </g>
    </svg>
  );
}

/** Small cobalt logo tile (18–26 px) used in product mock-ups */
export function LogoTile({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("inline-flex shrink-0 items-center justify-center bg-cobalt", className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.27) }}
    >
      <Mark size={Math.round(size * 0.68)} />
    </span>
  );
}

/** Lede paragraph: 16 px (18 in heroes), text-2, 1.6 leading */
export function Lede({ children, hero = false, className }: { children: ReactNode; hero?: boolean; className?: string }) {
  return <p className={clsx("text-text-2", hero ? "text-[17px] leading-[1.6] md:text-lede" : "text-body-lg", className)}>{children}</p>;
}

/** Section wrapper: 1200 px column, 120 px top padding, ~100–120 px bottom */
export function V2Section({
  id,
  labelledBy,
  hairline = false,
  wide = false,
  className,
  innerClassName,
  children,
}: {
  id?: string;
  labelledBy?: string;
  hairline?: boolean;
  /** 1320 px content column instead of 1200 (pricing cards) */
  wide?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={clsx("relative bg-bg", className)}>
      <div className={clsx(wide ? v2ContainerWide : v2Container, "relative")}>
        {hairline && <Hairline />}
        <div className={clsx("pb-20 pt-20 md:pb-[110px] md:pt-[120px]", innerClassName)}>{children}</div>
      </div>
    </section>
  );
}

/** The v2 content column: 1200 px, 20 px gutters */
export const v2Container = "mx-auto w-full max-w-[1240px] px-5";
/** Wider column for the pricing row: 1320 px, 20 px gutters */
export const v2ContainerWide = "mx-auto w-full max-w-[1360px] px-5";
