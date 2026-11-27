"use client";

import type { CSSProperties } from "react";
import clsx from "clsx";
import { useInView } from "@/hooks/useInView";
import type { VisualSource } from "@/lib/visuals";

/**
 * Places an animated SVG from src/visuals inline (see lib/visuals.ts).
 *
 * - Its animations wait (`.visual-paused`) until it scrolls into view, then
 *   play once. Remount it (change `key`) to play again.
 * - Reduced motion: each SVG's own CSS switches animation off, leaving the
 *   finished design. Without JavaScript a <noscript> rule in the root
 *   layout lets the animations run.
 * - `step` is set as data-step for SVGs with states (How it decides).
 * - `start` delays everything, e.g. until a connector line arrives.
 * - Screen readers get the SVG's <title> as the image's name.
 */
export function Visual({
  source,
  className,
  step,
  start,
  playOnView = true,
}: {
  source: VisualSource;
  className?: string;
  step?: number;
  start?: string;
  playOnView?: boolean;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2, true);
  return (
    <div
      ref={ref}
      role="img"
      aria-label={source.label}
      data-step={step}
      className={clsx("visual [&>svg]:block [&>svg]:h-auto [&>svg]:w-full", playOnView && !seen && "visual-paused", className)}
      style={start ? ({ "--v-start": start } as CSSProperties) : undefined}
      dangerouslySetInnerHTML={{ __html: source.svg }}
    />
  );
}

export default Visual;
