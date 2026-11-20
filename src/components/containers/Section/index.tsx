import clsx from "clsx";
import { SectionInterface, SectionTone } from "@/types/section";

/**
 * A full-bleed page section. v2 is dark everywhere: every tone sits on
 * the page background and sections are told apart by spacing. `cobalt`
 * is kept for the rare cobalt surface. The content column is 1200 px (v2 spec).
 */
const tones: Record<SectionTone, { bg: string; theme?: string }> = {
  white: { bg: "bg-bg" },
  paper: { bg: "bg-bg" },
  stone: { bg: "bg-bg" },
  ink: { bg: "bg-bg" },
  ink2: { bg: "bg-bg" },
  cobalt: { bg: "bg-cobalt-500", theme: "cobalt" },
};

export const containerClass = "mx-auto w-full max-w-[1240px] px-5";

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
      className={clsx("relative w-full", t.bg, usePaddings && "py-20 md:py-[110px]", className)}
    >
      {contained ? <div className={clsx(containerClass, innerClassName)}>{children}</div> : children}
    </section>
  );
}
