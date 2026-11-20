import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { PatternFrame } from "@/components/elements/PatternFrame";
import { Btn, Lede } from "@/components/elements/V2";

/**
 * Hero for every page other than Home, v2: the cobalt pattern frame, a
 * mono eyebrow, a two-tone H1 (claim in white, follow-on in grey), a lede
 * and actions. Optional `anchors` render as ghost buttons that jump to
 * sections; `aside` sits to the right on wide screens (e.g. a code card);
 * `below` spans the container under the copy.
 */
type Action = { label: string; href: string };

type PageHeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: ReactNode;
  primary?: Action;
  secondary?: Action;
  anchors?: readonly { id: string; label: string }[];
  anchorsLabel?: string;
  align?: "left" | "center";
  aside?: ReactNode;
  below?: ReactNode;
};

export default function PageHero({
  id,
  eyebrow,
  title,
  accent,
  lede,
  primary,
  secondary,
  anchors,
  anchorsLabel = "On this page",
  align = "left",
  aside,
  below,
}: PageHeroProps) {
  const center = align === "center" && !aside;
  return (
    <PatternFrame id={`${id}-pattern`} labelledBy={id}>
      <div
        className={clsx(
          "mx-auto grid max-w-[1240px] gap-12 px-5 pb-16 pt-[120px] md:pb-24 md:pt-[168px]",
          aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center lg:gap-16",
        )}
      >
        <div className={clsx("flex min-w-0 flex-col gap-6", center ? "items-center text-center" : "items-start")}>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light">{eyebrow}</p>
          <h1 id={id} className={clsx("text-balance text-h1 font-bold", center ? "max-w-[900px]" : "max-w-[820px]")}>
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-text-2">{accent}</span>
              </>
            )}
          </h1>
          {lede && (
            <Lede hero className="max-w-[600px]">
              {lede}
            </Lede>
          )}
          {(primary || secondary) && (
            <div className="mt-2 flex flex-wrap items-center gap-5">
              {primary && (
                <Btn href={primary.href} variant="accent">
                  {primary.label}
                </Btn>
              )}
              {secondary && (
                <Btn href={secondary.href} variant="link">
                  {secondary.label}
                </Btn>
              )}
            </div>
          )}
          {anchors && (
            <nav aria-label={anchorsLabel} className="mt-2">
              <ul className={clsx("flex flex-wrap gap-2.5", center && "justify-center")}>
                {anchors.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`#${a.id}`}
                      className="inline-flex h-10 items-center rounded-button bg-surface-3 px-4 text-[14px] font-medium text-text-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors hover:bg-[#24262B]"
                    >
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
        {below && <div className="min-w-0 lg:col-span-full">{below}</div>}
      </div>
    </PatternFrame>
  );
}
