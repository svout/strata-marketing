import Link from "next/link";
import clsx from "clsx";
import { PatternFrame } from "@/components/elements/PatternFrame";
import { Btn, Chip, Mark, Tag, LogoTile, Lede, type Signal } from "@/components/elements/V2";
import { V2Icons } from "@/components/icons/v2";
import { hero, productWindow as win, type DecisionRow } from "@/constraints/home";

/**
 * W1 · Hero. The cobalt pattern frames a dark container; the header
 * (Layout) sits at the top of it. Announcement pill over the pattern,
 * centred H1, lede, buttons, then the product window (decisions journal)
 * fading into W2.
 */

const decisionTone: Record<DecisionRow["decision"], Signal> = {
  Approved: "approved",
  Review: "review",
  Blocked: "blocked",
};

const riskTone = (r: DecisionRow) => (r.decision === "Review" ? "review" : "info");

const cols = "grid grid-cols-[1.5fr_120px_100px_1.2fr_1fr_120px_80px_90px] items-center gap-3 px-5";

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

/** The decisions journal. Desktop layout inside a box that scrolls sideways (min-width 900). */
function ProductWindow() {
  return (
    <figure className="relative m-0 animate-rise motion-reduce:animate-none">
      <figcaption className="sr-only">
        Sample decisions table: each agent payment with its decision, time, merchant, amount, risk score and ledger entry.
      </figcaption>
      <div
        tabIndex={0}
        role="region"
        aria-label="Sample decisions table (scrolls sideways)"
        className="overflow-x-auto rounded-panel bg-surface-1 shadow-window md:overflow-hidden"
      >
        <div className="min-w-[980px] md:min-w-[900px]" aria-hidden>
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <span className="flex h-8 items-center gap-2 rounded-button bg-surface-2 px-2.5 text-[13px] shadow-[inset_0_0_0_1px_var(--color-line)]">
              <LogoTile size={18} />
              {win.workspace}
              <V2Icons.Down size={14} className="text-text-2" />
            </span>
            <span className="ml-auto flex h-8 items-center rounded-button bg-surface-2 px-2.5 text-[13px] text-text-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
              {win.date}
            </span>
            <span className="flex h-8 items-center gap-2 rounded-button bg-surface-2 px-2.5 text-[13px] text-text-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <V2Icons.Search size={14} /> Search
            </span>
            <span className="flex h-8 items-center gap-2 rounded-button bg-surface-2 px-2.5 text-[13px] text-text-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <V2Icons.Filter size={14} /> Filters
            </span>
          </div>
          <div className="flex items-center gap-1 px-5 pb-3 pt-4">
            <span className="mr-4 text-[16px] font-semibold">{win.title}</span>
            {win.ranges.map((r, i) => (
              <span key={r} className={clsx("rounded-chip px-2.5 py-1 text-[12px]", i === 0 ? "bg-surface-3 text-text-1" : "text-text-2")}>
                {r}
              </span>
            ))}
            <span className="ml-auto flex gap-2">
              {win.totals.map((t) => (
                <Chip key={t.label} tone={t.tone}>
                  {t.label}
                </Chip>
              ))}
            </span>
          </div>
          <div className={clsx(cols, "h-8 text-[12px] text-text-3")}>
            {win.columns.map((c) => (
              <span key={c} className={c === "Amount" ? "text-right" : undefined}>
                {c}
              </span>
            ))}
          </div>
          {win.rows.map((r, i) => (
            <div
              key={r.ledger}
              className={clsx(cols, "h-11 border-t border-line text-[13px]", i >= 4 && "max-md:hidden")}
            >
              <span className="truncate font-mono text-[12px] text-text-1">{r.agent}</span>
              <Chip tone={decisionTone[r.decision]} className="justify-self-start">
                {r.decision}
              </Chip>
              <span className="font-mono text-[12px] text-text-2">{r.time}</span>
              <span>{r.merchant}</span>
              <span className="text-text-2">{r.category}</span>
              <span className="text-right font-mono">{r.amount}</span>
              <Tag tone={riskTone(r)} className="justify-self-start">
                {r.risk}
              </Tag>
              <span className="font-mono text-[12px] text-cobalt-pale">{r.ledger}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Fade the table into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-[linear-gradient(180deg,rgba(8,9,10,0)_0%,#08090a_85%)] md:h-[260px]"
      />
    </figure>
  );
}

export default function Hero() {
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
        <ProductWindow />
      </div>
    </PatternFrame>
  );
}
