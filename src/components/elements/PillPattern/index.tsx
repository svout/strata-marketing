import clsx from "clsx";
import { litColours, patternColours } from "@/config/tokens";

/**
 * The shifted-pill field (vault: Marketing Website → Pattern system).
 *
 * The logo's three pills tiled as one SVG <pattern>. Each tile holds
 * three pills; every row shifts 12 px left as it goes down, which reads as
 * the mark's "climb to the top right".
 *
 *   tile 96 px (64 on mobile) · pill 48 × 18, r 9 · shift 12 · row step 25
 *
 * Grid origin: the pattern is centred on the element's horizontal middle,
 * so a lit pill at `col: -5` sits five tiles left of centre at every
 * viewport width and stays on the grid. Pills placed off-screen just
 * don't show, so wide-screen pills disappear on phones without hiding.
 *
 * No canvas, no WebGL, no images. Server-rendered; motion is CSS only.
 */

type Variant = keyof typeof patternColours;
export type LitColour = keyof typeof litColours;

export type LitPill = {
  /** Tile column relative to the centre line (… -2, -1, 0, 1 …) */
  col: number;
  /** Pill row from the top: tile row × 3 + pill index (0–2) */
  row: number;
  colour: LitColour;
};

type Geometry = { tile: number; w: number; h: number; x0: number; y0: number; shift: number; step: number };

// Pill positions inside one tile, measured from the PatternSystem board
const DESKTOP: Geometry = { tile: 96, w: 48, h: 18, x0: 36, y0: 14, shift: 12, step: 25 };
const MOBILE: Geometry = { tile: 64, w: 32, h: 12, x0: 24, y0: 9, shift: 8, step: 17 };

const pillPos = (g: Geometry, col: number, row: number) => {
  const tileRow = Math.floor(row / 3);
  const i = row - tileRow * 3;
  return { x: col * g.tile + g.x0 - i * g.shift, y: tileRow * g.tile + g.y0 + i * g.step };
};

/** Load-in: lit pills switch on left → right in 3 steps (Mandate → Risk → Ledger). */
const stepDelay = (col: number) => (col < -2 ? 0 : col <= 2 ? 1 : 2) * 0.35 + 0.2;

function Field({ g, id, variant, lit }: { g: Geometry; id: string; variant: Variant; lit: LitPill[] }) {
  const fill = patternColours[variant].pill;
  return (
    // Nested <svg> at x=50% moves the origin to the horizontal centre
    <svg x="50%" overflow="visible">
      <defs>
        <pattern id={id} width={g.tile} height={g.tile} patternUnits="userSpaceOnUse">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={g.x0 - i * g.shift}
              y={g.y0 + i * g.step}
              width={g.w}
              height={g.h}
              rx={g.h / 2}
              fill={fill}
            />
          ))}
        </pattern>
      </defs>
      <rect x={-4000} y={0} width={8000} height="100%" fill={`url(#${id})`} />
      {lit.map((p, n) => {
        const { x, y } = pillPos(g, p.col, p.row);
        return (
          <g key={n} className="animate-pill-on" style={{ animationDelay: `${stepDelay(p.col)}s` }}>
            <rect
              className="lit-pill animate-lit"
              // Stagger the pulse so pills never blink together
              style={{ animationDelay: `${-((n * 1.37) % 4.2).toFixed(2)}s` }}
              x={x}
              y={y}
              width={g.w}
              height={g.h}
              rx={g.h / 2}
              fill={litColours[p.colour]}
            />
          </g>
        );
      })}
    </svg>
  );
}

type PillPatternProps = {
  /** Unique per page: used for the SVG <pattern> ids */
  id: string;
  variant: Variant;
  /** Lit pills on the 96 px desktop grid (shown from md up) */
  lit?: LitPill[];
  /** Lit pills on the 64 px mobile grid (shown below md) */
  litCompact?: LitPill[];
  /**
   * Scrim in the base colour behind the copy so text never sits on the
   * pattern. radial = centred hero (Home); left = left-aligned hero
   * (sub-pages: solid to ~46% width so the headline is covered, fading
   * out by ~72%); band = solid horizontal band through the middle, for a
   * one-row layout like PageCta (text left, button right), so the
   * pattern shows only above and below it. On mobile every
   * scrim is a band that leaves the pattern visible along the top.
   */
  scrim?: "radial" | "radial-wide" | "left" | "band" | "none";
  className?: string;
};

export function PillPattern({ id: uid, variant, lit = [], litCompact = [], scrim = "radial", className }: PillPatternProps) {
  const base = patternColours[variant].base;

  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute inset-0 hidden h-full w-full md:block">
        <Field g={DESKTOP} id={`pp-d-${uid}`} variant={variant} lit={lit} />
      </svg>
      <svg className="absolute inset-0 h-full w-full md:hidden">
        <Field g={MOBILE} id={`pp-m-${uid}`} variant={variant} lit={litCompact} />
      </svg>
      {scrim !== "none" && (
        <div
          className="absolute inset-0"
          style={
            {
              "--scrim": base,
            } as React.CSSProperties
          }
        >
          {/* Mobile: pattern band along the top, solid behind the copy and buttons */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_8%,var(--scrim)_22%)] md:hidden" />
          {/* Desktop: ellipse behind centred copy, or a left-to-right fade */}
          <div
            className={clsx(
              "absolute inset-0 hidden md:block",
              scrim === "radial" && "bg-[radial-gradient(ellipse_44%_40%_at_50%_45%,var(--scrim)_55%,transparent_100%)]",
              scrim === "radial-wide" && "bg-[radial-gradient(ellipse_46%_62%_at_50%_50%,var(--scrim)_35%,transparent_100%)]",
              scrim === "left" && "bg-[linear-gradient(to_right,var(--scrim)_46%,transparent_72%)]",
              scrim === "band" &&
                "bg-[linear-gradient(to_bottom,transparent_14%,var(--scrim)_32%,var(--scrim)_68%,transparent_86%)]",
            )}
          />
        </div>
      )}
    </div>
  );
}

export default PillPattern;
