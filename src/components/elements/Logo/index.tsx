import clsx from "clsx";
import { primitives } from "@/config/tokens";

/**
 * "Shift" logo: three 24 × 9u pills, r 4.5u, 3.5u apart, each shifted
 * 6u, climbing to the top right, in a 12.5u-radius tile (Brand Guidelines
 * → Construction). Wordmark: lowercase, Instrument Sans Semibold, −5%.
 */
type Tone = "light" | "dark" | "onCobalt";

const tones: Record<Tone, { tile: string; bars: string; text: string }> = {
  light: { tile: primitives.cobalt[500], bars: primitives.white, text: "text-ink" },
  dark: { tile: primitives.cobalt[500], bars: primitives.white, text: "text-white" },
  onCobalt: { tile: primitives.white, bars: primitives.cobalt[500], text: "text-white" },
};

export function LogoMark({ size = 30, tile, bars }: { size?: number; tile: string; bars: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <rect width="48" height="48" rx="12.5" fill={tile} />
      <g transform="translate(7.68 7.68) scale(0.68)" fill={bars}>
        <rect x="18" y="7" width="24" height="9" rx="4.5" />
        <rect x="12" y="19.5" width="24" height="9" rx="4.5" />
        <rect x="6" y="32" width="24" height="9" rx="4.5" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "light", size = 30, className }: { tone?: Tone; size?: number; className?: string }) {
  const t = tones[tone];
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} tile={t.tile} bars={t.bars} />
      <span
        className={clsx("font-semibold leading-none tracking-[-0.05em]", t.text)}
        style={{ fontSize: Math.round(size * 0.73) }}
      >
        strata
      </span>
    </span>
  );
}

export default Logo;
