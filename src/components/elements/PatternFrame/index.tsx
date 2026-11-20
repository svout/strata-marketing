import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * The v2 cobalt pattern frame (Design System v2 → Cobalt pattern).
 *
 * The full-width cobalt pattern sits behind a dark rounded container; the
 * pattern only ever shows as a frame around it, never under text.
 * - `hero`: container starts 72 px down (56 on phones), 16 px in from both
 *   sides, rounded top corners only, and runs to the bottom of the section
 *   so it flows into the page.
 * - `band`: closing CTA band. Container is rounded on all corners with
 *   pattern above and below it (W9).
 *
 * Tile: 96 px, three 48×18 pills (rx 9) at (36,14), (24,39), (12,64),
 * #4169FF on #2B59FF. A few "lit" pills sit where the frame is visible:
 * white (full or 60%) and one #08090A pill.
 */
type Lit = { x: number; y: number; tone: "white" | "white60" | "ink" };

// Positions on the 96 px grid (measured from the left, as in the design):
// in the top band (y 14/39), visible at any width, and one ink pill in the
// left strip. Off-screen ones on narrow viewports are simply clipped.
// Row offsets: y 14 → x ≡ 36, y 39 → x ≡ 24, y 64 → x ≡ 12 (mod 96)
const heroLit: Lit[] = [
  { x: 132, y: 14, tone: "white" },
  { x: 312, y: 39, tone: "white60" },
  { x: 1092, y: 14, tone: "white60" },
  { x: 1176, y: 39, tone: "white" },
  { x: 12, y: 352, tone: "ink" },
];
const bandLit: Lit[] = [
  { x: 324, y: 14, tone: "white" },
  { x: 504, y: 39, tone: "white60" },
  { x: 996, y: 14, tone: "white60" },
  { x: 12, y: 256, tone: "ink" },
];

const litFill = { white: "#FFFFFF", white60: "rgba(255,255,255,0.6)", ink: "#08090A" };

function Pattern({ id, lit }: { id: string; lit: Lit[] }) {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <rect x="36" y="14" width="48" height="18" rx="9" fill="#4169FF" />
          <rect x="24" y="39" width="48" height="18" rx="9" fill="#4169FF" />
          <rect x="12" y="64" width="48" height="18" rx="9" fill="#4169FF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#2B59FF" />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {lit.map((p, i) => (
        // Phones: only the ink pill, so nothing lights up behind the announcement pill
        <rect key={i} x={p.x} y={p.y} width="48" height="18" rx="9" fill={litFill[p.tone]} className={p.tone === "ink" ? undefined : "max-md:hidden"} />
      ))}
    </svg>
  );
}

type FrameProps = {
  id: string;
  variant?: "hero" | "band";
  /** Content above the container, inside the top pattern band (hero only) */
  above?: ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export function PatternFrame({
  id,
  variant = "hero",
  above,
  className,
  containerClassName,
  labelledBy,
  children,
}: FrameProps) {
  if (variant === "band") {
    return (
      <section aria-labelledby={labelledBy} className={clsx("relative overflow-hidden px-2 py-14 md:px-4 md:pb-[68px] md:pt-[72px]", className)}>
        <Pattern id={id} lit={bandLit} />
        <div
          className={clsx(
            "relative rounded-[24px] bg-bg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
            containerClassName,
          )}
        >
          {children}
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby={labelledBy} className={clsx("relative overflow-hidden px-2 pt-14 md:px-4 md:pt-[72px]", className)}>
      <Pattern id={id} lit={heroLit} />
      {above && <div className="absolute inset-x-0 top-0 z-[1] flex h-14 items-center justify-center px-4 md:h-[72px]">{above}</div>}
      <div
        className={clsx(
          "relative rounded-t-[20px] bg-bg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] md:rounded-t-[24px]",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export default PatternFrame;
