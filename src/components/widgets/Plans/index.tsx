"use client";

import { useState } from "react";
import clsx from "clsx";
import { Btn, Chip, Tag } from "@/components/elements/V2";
import { V2Icons } from "@/components/icons/v2";
import { PRICES, extraPlans, plans, type Plan } from "@/constraints/pricing";

/**
 * Plan cards, v2 (spec W8), with the prices from constraints/pricing.
 * Three cards (gap 16): surface-1, radius 20, padding 28. Strata agents
 * is the highlighted middle card (cobalt inset border and glow) with a
 * "Platform included" chip instead of a popularity claim we can't back.
 * Sandbox (free) and Enterprise (custom) sit in a slim row underneath.
 *
 * Monthly / Yearly toggle: yearly prices aren't decided, so Yearly shows
 * the [placeholders] from PRICES until they are. Prices live in data.
 */
const order: Plan["id"][] = ["platform", "agents", "custom"];

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const featured = plan.featured;
  // A one-off build has no yearly price
  const price = yearly && plan.id !== "custom" ? PRICES.yearlyPrice : plan.price;
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={clsx(
        "flex flex-col rounded-panel-lg bg-surface-1 p-6 md:p-7",
        featured
          ? "shadow-[inset_0_0_0_1px_#2B59FF,0_0_60px_rgba(43,89,255,0.25)]"
          : "shadow-edge",
      )}
    >
      <div className="flex min-h-[26px] flex-wrap items-center justify-between gap-2">
        <h3 id={`plan-${plan.id}`} className="text-[17px] font-semibold">
          {plan.name}
        </h3>
        {plan.badge && <Chip tone="info">{plan.badge}</Chip>}
      </div>
      <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
        <span className="text-[40px] font-bold leading-none tracking-[-0.05em] md:text-[44px]">{price}</span>
        <span className="text-[14px] text-text-2">{plan.priceUnit}</span>
      </p>
      <p className="mt-5 min-h-[44px] text-[14px] text-text-2">{plan.forWho}</p>
      <p className="mt-1 text-[13px] text-text-3">{plan.priceNote}</p>
      <Btn href={plan.cta.href} variant={featured ? "primary" : "ghost"} className="mt-6 w-full" srLabel={`(${plan.name})`}>
        {plan.cta.label}
      </Btn>
      <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] text-text-2">
            <V2Icons.Check size={16} className="mt-0.5 shrink-0 text-approved" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Plans({ showToggle = true }: { showToggle?: boolean }) {
  const [yearly, setYearly] = useState(false);
  const ordered = order.map((id) => plans.find((p) => p.id === id)!);

  return (
    <div className="flex flex-col gap-10">
      {showToggle && (
        <div role="group" aria-label="Billing period" className="mx-auto flex gap-1 rounded-[10px] bg-surface-1 p-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              aria-pressed={yearly === y}
              onClick={() => setYearly(y)}
              className={clsx(
                "flex h-8 items-center gap-2 rounded-[7px] px-3.5 text-[14px] transition-colors",
                yearly === y ? "bg-surface-3 text-text-1" : "text-text-2 hover:text-text-1",
              )}
            >
              {y ? "Yearly" : "Monthly"}
              {y && <Tag tone="approved">{PRICES.yearlyDiscount}</Tag>}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {ordered.map((p) => (
          <PlanCard key={p.id} plan={p} yearly={yearly} />
        ))}
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {extraPlans.map((x) => (
          <li
            key={x.name}
            className="flex flex-col gap-4 rounded-panel-lg bg-surface-1 p-6 shadow-edge sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <h3 className="flex items-baseline gap-3 text-[17px] font-semibold">
                {x.name}
                <span className="text-[15px] font-medium text-cobalt-light">{x.price}</span>
              </h3>
              <p className="max-w-[420px] text-[14px] text-text-2">{x.body}</p>
            </div>
            <Btn href={x.cta.href} variant="ghost" srLabel={`(${x.name})`}>
              {x.cta.label}
            </Btn>
          </li>
        ))}
      </ul>
    </div>
  );
}
