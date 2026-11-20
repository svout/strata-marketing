import clsx from "clsx";
import Section from "@/components/containers/Section";
import { containerClass } from "@/components/containers/Section";
import { Icons } from "@/components/icons";
import { isFilled } from "@/config/company";
import { dataHandling, pillars, securityContact, verify } from "@/constraints/security";

/**
 * Security & ledger, v2. All server-rendered (no interactivity needed).
 *
 * Hero: PageHero (pattern frame), rendered by the page.
 * Pillars: three cards, icon + heading + three bullets.
 * Verify it yourself: a dark crop of the ledger screen.
 * Data handling: a plain table; every value is an [owner] placeholder.
 * Security contact strip.
 */

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
            <li key={p.title} className="flex flex-col gap-3.5 rounded-panel-lg bg-surface-1 p-6 shadow-edge md:p-8">
              <Icon size={30} className="text-cobalt-light" />
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{p.title}</h3>
              <ul className="flex flex-col gap-1.5 pl-[18px] text-[15px] leading-relaxed text-text-2 marker:text-cobalt-light [&>li]:list-disc">
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
            className="text-balance text-h2 font-bold"
          >
            {verify.title}
          </h2>
          <p className="text-body-lg text-text-2 md:text-lg">{verify.body}</p>
        </div>

        {/* Crop of P9 Ledger (v2 dark console) */}
        <figure className="relative min-w-0">
          <figcaption className="sr-only">
            Example from the ledger screen: the chain is verified, with buttons to verify again and export to CSV,
            above recent entries that each store the hash of the entry before.
          </figcaption>
          <div aria-hidden className="rounded-panel-lg bg-surface-1 p-4 shadow-float md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[20px] font-semibold tracking-[-0.02em]">Ledger</span>
                <span className="inline-flex h-[22px] items-center gap-1.5 rounded-chip bg-approved-bg px-2 text-[12px] font-medium text-approved">
                  <Icons.Check size={13} />
                  {verify.badge}
                </span>
              </div>
              <div className="flex gap-2 text-[13px] font-medium">
                <span className="flex h-[34px] items-center rounded-button bg-surface-3 px-3.5 shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                  Verify again
                </span>
                <span className="flex h-[34px] items-center rounded-button bg-white px-3.5 text-bg">Export CSV</span>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-card bg-surface-2 font-mono shadow-[inset_0_0_0_1px_var(--color-line)]">
              <div className="grid grid-cols-[52px_minmax(0,1fr)_76px] gap-2 px-3 py-2.5 text-[10.5px] tracking-[0.06em] text-text-3 md:grid-cols-[60px_150px_minmax(0,1fr)_80px_80px]">
                <span>#</span>
                <span className="hidden md:block">EVENT</span>
                <span>SUBJECT</span>
                <span>HASH</span>
                <span className="hidden md:block">PREV</span>
              </div>
              {verify.rows.map((r) => (
                <div
                  key={r.n}
                  className="grid h-10 grid-cols-[52px_minmax(0,1fr)_76px] items-center gap-2 border-t border-line px-3 text-[12px] md:grid-cols-[60px_150px_minmax(0,1fr)_80px_80px] md:text-[12.5px]"
                >
                  <span className="text-cobalt-pale">{r.n}</span>
                  <span className={clsx("hidden font-medium md:block", eventColour[r.tone as keyof typeof eventColour])}>
                    {r.event}
                  </span>
                  <span className="truncate">{r.subject}</span>
                  <span className="text-text-2">{r.hash}</span>
                  <span className="hidden text-text-3 md:block">{r.prev}</span>
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
          className="text-h2 font-bold"
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
    <section aria-labelledby="contact-title" className="bg-bg pb-24 md:pb-32">
      <div className={containerClass}>
        <div className="flex flex-col gap-3 rounded-panel-lg bg-surface-1 p-6 shadow-edge md:flex-row md:items-center md:justify-between md:p-8">
        <h2 id="contact-title" className="text-[22px] md:text-[26px]">
          {securityContact.title}
        </h2>
        {isFilled(email) ? (
          <a href={`mailto:${email}`} className="rounded-sm font-mono text-base text-cobalt-pale hover:underline">
            {email}
          </a>
        ) : (
          // Placeholder until the address exists: shown, but not a broken link
          <span className="font-mono text-base text-cobalt-pale">{email}</span>
        )}
        </div>
      </div>
    </section>
  );
}
