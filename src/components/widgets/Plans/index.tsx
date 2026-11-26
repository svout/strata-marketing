"use client";

import { useState } from "react";
import clsx from "clsx";
import { Btn, Tag } from "@/components/elements/V2";
import { V2Icons } from "@/components/icons/v2";
import { PRICES, extraPlans, plans, type Plan } from "@/constraints/pricing";

/**
 * Plan cards (W8), styled after scope360's pricing row: three equal cards
 * with a tab badge on the top edge, plan name, big price + unit, a short
 * description, a hairline, an "Everything in … plus:" line, a checklist,
 * a full-width button pinned to the bottom and a small note under it.
 * Strata agents is the highlighted card: cobalt badge and a navy-to-cobalt
 * gradient. Its badge says "Platform included", not a popularity claim we
 * can't back. Enterprise sits in a slim row underneath.
 *
 * Colours sampled from scope360's pricing cards: card #1A1B1D → #0F1011
 * with a #242527 edge; featured #1B2436 → #192C51 with a #293241 edge;
 * plan name #B5B5B5, ticks #6FB487, dark button #202022. Badge blue is
 * #2C6CEC (scope's #3478F6 is 4.1:1 with white text, under 4.5:1). Notes use
 * text-3 rather than scope's #4B4C4C so they pass 4.5:1.
 *
 * Monthly / Yearly toggle: yearly prices aren't decided, so Yearly shows
 * the [placeholders] from PRICES until they are. Prices live in data.
 */

/** Plans whose price is the same monthly or yearly (a one-off build) */
const fixedPrice: Plan["id"][] = ["custom"];

const card = "bg-[linear-gradient(180deg,#1A1B1D_0%,#0F1011_100%)] shadow-[inset_0_0_0_1px_#242527]";
const featuredCard = "bg-[linear-gradient(180deg,#1B2436_0%,#192C51_100%)] shadow-[inset_0_0_0_1px_#293241]";

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const featured = plan.featured;
  const price = yearly && !fixedPrice.includes(plan.id) ? PRICES.yearlyPrice : plan.price;
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={clsx(
        "relative flex flex-col rounded-[20px] p-6 md:p-8",
        featured ? featuredCard : card,
      )}
    >
      {plan.badge && (
        <span
          className={clsx(
            "absolute -top-3.5 left-5 inline-flex h-8 items-center rounded-[8px] px-3 text-[14px] font-medium md:left-7",
            featured ? "bg-[#2C6CEC] text-white" : "bg-[#FAFAFA] text-bg",
          )}
        >
          {plan.badge}
        </span>
      )}

      <h3 id={`plan-${plan.id}`} className="plain text-[17px] font-normal text-[#B5B5B5]">
        {plan.name}
      </h3>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 lg:min-h-[76px] xl:min-h-[46px]">
        <span
          className={clsx(
            "text-[40px] font-bold leading-none tracking-[-0.04em] text-text-1",
            // A range ("£99–£349") stays at 40 px so its unit fits on the same line
            price.length <= 6 && "xl:text-[46px]",
          )}
        >
          {price}
        </span>
        <span className="text-[15px] text-text-2 xl:text-[16px]">{plan.priceUnit}</span>
      </p>
      <p className="mt-5 text-[16px] leading-normal text-text-2 lg:min-h-[48px]">{plan.forWho}</p>

      <div className={clsx("mt-6 h-px", featured ? "bg-[#2D384C]" : "bg-[#28292B]")} />

      {plan.includes && <p className="mt-6 text-[16px] text-text-2">{plan.includes}</p>}
      <ul className={clsx("flex flex-col gap-3", plan.includes ? "mt-4" : "mt-6")}>
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[16px] leading-snug text-text-1">
            <V2Icons.Check size={16} className="mt-1 shrink-0 text-[#6FB487]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-stretch gap-4 pt-10">
        <Btn
          href={plan.cta.href}
          variant="primary"
          className="h-12 w-full text-[16px]"
          srLabel={`(${plan.name})`}
        >
          {plan.cta.label}
        </Btn>
        <p className={clsx("text-center text-[14px]", featured ? "text-[#8D9DBE]" : "text-text-3")}>{plan.note}</p>
      </div>
    </article>
  );
}

export default function Plans({ showToggle = true }: { showToggle?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      {showToggle && (
        <div
          role="group"
          aria-label="Billing period"
          className="mx-auto flex gap-1 rounded-[12px] bg-[#1C1C1F] p-1 shadow-[inset_0_0_0_1px_#27272B]"
        >
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              aria-pressed={yearly === y}
              onClick={() => setYearly(y)}
              className={clsx(
                "flex h-10 items-center gap-2 rounded-[9px] px-4 text-[15px] transition-colors",
                yearly === y ? "bg-[#101213] text-text-1 shadow-[inset_0_0_0_1px_#27272B]" : "text-text-2 hover:text-text-1",
              )}
            >
              {y ? "Yearly" : "Monthly"}
              {y && <Tag tone="approved">{PRICES.yearlyDiscount}</Tag>}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-6 gap-y-10 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} yearly={yearly} />
        ))}
      </div>

      <ul className="flex flex-col gap-4">
        {extraPlans.map((x) => (
          <li
            key={x.name}
            className={clsx("flex flex-col gap-4 rounded-[20px] p-6 sm:flex-row sm:items-center sm:justify-between md:px-8", card)}
          >
            <div className="flex flex-col gap-1">
              <h3 className="plain flex items-baseline gap-3 text-[17px] font-normal text-[#B5B5B5]">
                {x.name}
                <span className="text-[16px] font-semibold text-text-1">{x.price}</span>
              </h3>
              <p className="max-w-[560px] text-[15px] text-text-2">{x.body}</p>
            </div>
            <Btn href={x.cta.href} variant="ghost" className="h-12 bg-[#202022] text-[16px] hover:bg-[#2A2A2D]" srLabel={`(${x.name})`}>
              {x.cta.label}
            </Btn>
          </li>
        ))}
      </ul>
    </div>
  );
}
