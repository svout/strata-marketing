import clsx from "clsx";
import { SectionInterface, SectionTone } from "@/types/section";

/**
 * A full-bleed page section. `tone` picks the background and, for ink
 * and cobalt, switches the token set (data-theme) so text, lines and
 * chips inside use their dark values without extra props.
 *
 * Content width follows layout/grid: 12 col · margin 80 @1440 → 1280 px.
 */
const tones: Record<SectionTone, { bg: string; theme?: string }> = {
  white: { bg: "bg-elevated" },
  paper: { bg: "bg-surface" },
  stone: { bg: "bg-canvas" },
  ink: { bg: "bg-ink", theme: "dark" },
  // bg-surface resolves to #14161C inside data-theme="dark"
  ink2: { bg: "bg-surface", theme: "dark" },
  cobalt: { bg: "bg-cobalt-500", theme: "cobalt" },
};

export const containerClass = "mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-20";

export default function Section({
  children,
  tone = "white",
  id,
  labelledBy,
  usePaddings = true,
  contained = true,
  className,
  innerClassName,
}: SectionInterface) {
  const t = tones[tone];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={t.theme}
      className={clsx("relative w-full", t.bg, usePaddings && "py-16 md:py-24 lg:py-32", className)}
    >
      {contained ? <div className={clsx(containerClass, innerClassName)}>{children}</div> : children}
    </section>
  );
}
