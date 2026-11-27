import Link from "next/link";
import { PatternFrame } from "@/components/elements/PatternFrame";
import { Btn, Mark, Lede } from "@/components/elements/V2";
import { Visual } from "@/components/elements/Visual";
import { hero } from "@/constraints/home";
import type { VisualSource } from "@/lib/visuals";

/**
 * W1 · Hero. The cobalt pattern frames a dark container; the header
 * (Layout) sits at the top of it. Announcement pill over the pattern,
 * centred H1, lede, buttons, then the product window (decisions journal,
 * an animated SVG) fading into W2.
 */

function Announcement() {
  return (
    <Link
      href={hero.announcement.href}
      className="flex h-9 max-w-full items-center gap-2.5 whitespace-nowrap rounded-[10px] bg-[rgba(8,9,10,0.55)] px-1.5 text-[13px] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] transition-colors hover:bg-[rgba(8,9,10,0.7)]"
    >
      <span className="flex h-[26px] items-center gap-2 rounded-[7px] bg-white/[0.14] px-2.5">
        <Mark size={14} />
        {hero.announcement.tag}
      </span>
      <span className="truncate">{hero.announcement.text}</span>
      <span aria-hidden className="pr-2 text-white/70">
        ›
      </span>
    </Link>
  );
}

/**
 * The decisions journal: src/visuals/hero-decisions.svg (rows rise in one
 * by one). Phones: shown at 900 px in a box that scrolls sideways, cropped
 * to the first rows and faded out.
 */
function ProductWindow({ source }: { source: VisualSource }) {
  return (
    <figure className="relative m-0 animate-rise motion-reduce:animate-none">
      <div
        tabIndex={0}
        role="region"
        aria-label="Sample decisions table (scrolls sideways)"
        className="overflow-x-auto rounded-panel shadow-window md:overflow-hidden"
      >
        <Visual source={source} playOnView={false} className="min-w-[900px] max-md:h-[420px] max-md:overflow-hidden" />
      </div>
      {/* Fade the table into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,#08090a_85%)] md:h-[260px]"
      />
    </figure>
  );
}

export default function Hero({ table }: { table: VisualSource }) {
  return (
    <PatternFrame id="home-hero" labelledBy="hero-title" above={<Announcement />}>
      <div className="flex flex-col items-center gap-6 px-5 pb-0 pt-[136px] text-center md:pt-[168px]">
        <h1 id="hero-title" className="text-balance text-display font-bold">
          {hero.headline}
          <br />
          {hero.headlineAccent}
        </h1>
        <Lede hero className="mx-auto max-w-[600px]">
          {hero.lede}
        </Lede>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-5">
          <Btn href={hero.primary.href} variant="accent">
            {hero.primary.label}
          </Btn>
          <Btn href={hero.secondary.href} variant="link">
            {hero.secondary.label}
          </Btn>
        </div>
      </div>
      <div className="mt-14 px-3 md:mt-[72px] md:px-[68px]">
        <ProductWindow source={table} />
      </div>
    </PatternFrame>
  );
}
