import clsx from "clsx";
import Section from "@/components/containers/Section";
import { containerClass } from "@/components/containers/Section";
import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { Icons } from "@/components/icons";
import { isFilled } from "@/config/company";
import { dataHandling, pillars, securityContact, securityHero as hero, verify } from "@/constraints/security";

/**
 * Security & ledger (W4), all server-rendered (no interactivity needed).
 *
 * 01 Hero: stone pattern, the calmest variant. Lit pills step down
 *    diagonally like a chain of ledger entries (cobalt only).
 * 02 Pillars: three cards, icon + heading + three bullets.
 * 03 Verify it yourself: ink band with a crop of the P9 Ledger screen.
 * 04 Data handling: a plain table; every value is an [owner] placeholder.
 * 05 Security contact strip.
 */

const lit: LitPill[] = [
  { col: 4, row: 3, colour: "cobalt" },
  { col: 5, row: 7, colour: "cobalt" },
  { col: 6, row: 11, colour: "cobalt" },
];
const litCompact: LitPill[] = [
  { col: 0, row: 3, colour: "cobalt" },
  { col: 1, row: 4, colour: "cobalt" },
  { col: 2, row: 5, colour: "cobalt" },
];

export function SecurityHero() {
  return (
    <section
      aria-labelledby="security-title"
      className="relative overflow-hidden bg-surface pb-16 pt-[120px] md:pb-24 md:pt-[160px]"
    >
      <PillPattern id="security-hero" variant="stone" lit={lit} litCompact={litCompact} scrim="left" />
      <div className={`${containerClass} relative`}>
        <div className="flex max-w-[900px] flex-col items-start gap-5 md:gap-6">
          <p className="font-mono text-label font-medium uppercase tracking-[0.1em] text-brand-on-subtle">
            {hero.overline}
          </p>
          <h1
            id="security-title"
            className="text-balance text-[clamp(2.75rem,1.4rem+4.6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]"
          >
            {hero.headline}
          </h1>
          <p className="max-w-[680px] text-body-lg text-fg-muted md:text-xl">{hero.lede}</p>
        </div>
      </div>
    </section>
  );
}

const pillarIcon = { ledger: Icons.Ledger, shield: Icons.Shield, pulse: Icons.Pulse } as const;

export function SecurityPillars() {
  return (
    <Section tone="white" labelledBy="pillars-title">
      <h2 id="pillars-title" className="sr-only">
        How Strata protects your data and decisions
      </h2>
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {pillars.map((p) => {
          const Icon = pillarIcon[p.icon];
          return (
            <li key={p.title} className="flex flex-col gap-3.5 rounded-[22px] bg-surface p-6 md:p-8">
              <Icon size={36} className="text-cobalt-500" />
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] md:text-[26px]">{p.title}</h3>
              <ul className="flex flex-col gap-1.5 pl-[18px] text-base leading-relaxed text-graphite marker:text-cobalt-500 [&>li]:list-disc">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

const eventColour = {
  edit: "text-recorded-fg",
  block: "text-block-fg",
  review: "text-review-fg",
  approve: "text-approve-fg",
} as const;

export function SecurityVerify() {
  return (
    <Section tone="ink" labelledBy="verify-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2
            id="verify-title"
            className="text-balance text-[clamp(2rem,1.2rem+2.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
          >
            {verify.title}
          </h2>
          <p className="text-body-lg text-[#C9CBD1] md:text-lg">{verify.body}</p>
        </div>

        {/* Crop of P9 Ledger: light console UI on the ink band */}
        <figure className="relative min-w-0">
          <figcaption className="sr-only">
            Example from the ledger screen: the chain is verified, with buttons to verify again and export to CSV,
            above recent entries that each store the hash of the entry before.
          </figcaption>
          <div aria-hidden data-theme="light" className="rounded-[22px] bg-white p-4 text-ink shadow-pop md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[22px] font-semibold tracking-[-0.03em]">Ledger</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F5EF] px-3 py-1.5 text-xs font-semibold text-[#0A6B52] md:text-[13px]">
                  <Icons.Check size={14} />
                  {verify.badge}
                </span>
              </div>
              <div className="flex gap-2 text-[13px] font-semibold">
                <span className="flex h-9 items-center rounded-full border-[1.5px] border-[#DEDCD5] px-3.5">Verify again</span>
                <span className="flex h-9 items-center rounded-full bg-ink px-3.5 text-white">Export CSV</span>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#DEDCD5] font-mono">
              <div className="grid grid-cols-[52px_minmax(0,1fr)_76px] gap-2 bg-[#F7F6F2] px-3 py-2.5 text-[10.5px] tracking-[0.06em] text-[#55575E] md:grid-cols-[60px_150px_minmax(0,1fr)_80px_80px]">
                <span>#</span>
                <span className="hidden md:block">EVENT</span>
                <span>SUBJECT</span>
                <span>HASH</span>
                <span className="hidden md:block">PREV</span>
              </div>
              {verify.rows.map((r) => (
                <div
                  key={r.n}
                  className="grid h-10 grid-cols-[52px_minmax(0,1fr)_76px] items-center gap-2 border-t border-[#EEECE6] px-3 text-[12px] md:grid-cols-[60px_150px_minmax(0,1fr)_80px_80px] md:text-[12.5px]"
                >
                  <span className="text-[#55575E]">{r.n}</span>
                  <span className={clsx("hidden font-medium md:block", eventColour[r.tone as keyof typeof eventColour])}>
                    {r.event}
                  </span>
                  <span className="truncate">{r.subject}</span>
                  <span className="text-[#1A38BF]">{r.hash}</span>
                  <span className="hidden text-[#55575E] md:block">{r.prev}</span>
                </div>
              ))}
            </div>
          </div>
          <span aria-hidden className="mt-3 block font-mono text-overline text-fg-muted">
            SAMPLE
          </span>
        </figure>
      </div>
    </Section>
  );
}

export function SecurityData() {
  return (
    <Section tone="white" labelledBy="data-title">
      <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
        <h2
          id="data-title"
          className="text-[clamp(2rem,1.2rem+2.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
        >
          {dataHandling.title}
        </h2>
        <dl className="flex flex-col text-base">
          {dataHandling.rows.map((r) => (
            <div key={r.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[260px_minmax(0,1fr)] sm:gap-4">
              <dt className="font-semibold">{r.label}</dt>
              <dd className="text-fg-muted">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export function SecurityContact() {
  const email = securityContact.email;
  return (
    <section aria-labelledby="contact-title" className="bg-surface py-14 md:py-16">
      <div className={`${containerClass} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
        <h2 id="contact-title" className="text-[24px] font-semibold tracking-[-0.03em] md:text-[28px]">
          {securityContact.title}
        </h2>
        {isFilled(email) ? (
          <a href={`mailto:${email}`} className="rounded-sm font-mono text-base text-brand-on-subtle hover:underline">
            {email}
          </a>
        ) : (
          // Placeholder until the address exists: shown, but not a broken link
          <span className="font-mono text-base text-brand-on-subtle">{email}</span>
        )}
      </div>
    </section>
  );
}
