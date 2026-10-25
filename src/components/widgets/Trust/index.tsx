"use client";

import Link from "next/link";
import clsx from "clsx";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { Icons } from "@/components/icons";
import { useReveal } from "@/hooks/useReveal";
import { trust } from "@/constraints/home";

/**
 * 07 Trust: show proof, not badges. The chain animates on scroll: each
 * block links to the next, then "verified" ticks on. SAMPLE data.
 */
const pillarIcon = { shield: Icons.Shield, pulse: Icons.Pulse, download: Icons.Download } as const;

const Trust = () => {
  const [ref, revealed] = useReveal<HTMLDivElement>(0.4);
  const chain = trust.ledger.chain;

  return (
    <Section tone="paper" labelledBy="trust-title">
      <SectionHeader
        overline={trust.overline}
        title={trust.title}
        titleId="trust-title"
        aside={
          <Link href={trust.link.href} className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-brand-on-subtle hover:underline">
            {trust.link.label} <Icons.ArrowRight size={18} />
          </Link>
        }
      />

      <div className="mt-10 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div
          ref={ref}
          data-theme="dark"
          className="flex flex-col justify-between gap-8 rounded-[24px] bg-ink p-6 md:rounded-[32px] md:p-9"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">{trust.ledger.title}</h3>
              <span className="pt-2 font-mono text-overline text-fg-muted">SAMPLE</span>
            </div>
            <p className="max-w-[520px] text-base text-fg-muted">{trust.ledger.body}</p>
          </div>

          <ol aria-label="Ledger entries, each linked to the one before" className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-0">
            {chain.map((block, i) => {
              const last = i === chain.length - 1;
              const delay = { transitionDelay: revealed ? `${i * 300}ms` : "0ms" };
              return (
                <li key={block.id} className="flex flex-1 items-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={clsx(
                        "hidden h-0.5 w-5 origin-left bg-cobalt-500 transition-transform duration-300 sm:block",
                        revealed ? "scale-x-100" : "scale-x-0",
                      )}
                      style={delay}
                    />
                  )}
                  <div
                    className={clsx(
                      "flex-1 rounded-[16px] p-3.5 font-mono text-xs leading-[1.7] transition-all duration-500",
                      last ? "bg-cobalt-500 text-white" : "border border-line bg-surface text-[#C9CBD1]",
                      revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                    style={delay}
                  >
                    {block.id}
                    <br />
                    <span className={last ? "" : "text-cobalt-300"}>{block.hash}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            className={clsx(
              "flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-approve-tint px-4 py-3.5 transition-opacity duration-500",
              revealed ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: revealed ? `${chain.length * 300}ms` : "0ms" }}
          >
            <span className="flex items-center gap-2 text-[15px] font-semibold text-approve-fg">
              <Icons.Check size={18} /> {trust.ledger.verified}
            </span>
            <span className="font-mono text-xs text-approve-fg">{trust.ledger.checkedAt}</span>
          </div>
        </div>

        <ul className="flex flex-col gap-4 md:gap-5">
          {trust.pillars.map((p) => {
            const Icon = pillarIcon[p.icon];
            return (
              <li key={p.title} className="flex flex-1 items-start gap-4 rounded-[22px] bg-elevated px-6 py-6">
                <Icon size={28} className="shrink-0 text-cobalt-500" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[19px] font-semibold">{p.title}</h3>
                  <p className="text-[15px] text-fg-muted">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};

export default Trust;
