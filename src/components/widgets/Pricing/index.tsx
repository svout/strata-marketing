import Link from "next/link";
import { Btn, Lede, Tag, TwoTone, V2Section } from "@/components/elements/V2";
import { V2Icons } from "@/components/icons/v2";
import Plans from "@/components/widgets/Plans";
import { catalogue, comparison, customBuild, plans } from "@/constraints/pricing";

/**
 * Pricing page sections, v2: plans (shared with Home W8) + comparison
 * table → Strata agents catalogue → custom development. The hero, FAQ
 * and closing band come from shared widgets (see app/pricing/page.tsx).
 *
 * The model: a Strata agent subscription includes the platform; teams
 * with their own agents pay a monthly platform fee; custom builds are a
 * one-off project, then billed like a Strata agent.
 */

const order = ["platform", "agents", "custom"] as const;
const planFor = (id: (typeof order)[number]) => plans.find((p) => p.id === id)!;
// comparison.rows values are in constraints order (agents, platform, custom)
const valueIndex = { agents: 0, platform: 1, custom: 2 } as const;

function Included({ v }: { v: string }) {
  return v === "✓" ? (
    <>
      <V2Icons.Check size={16} className="text-approved" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>{v}</>
  );
}

export const PricingPlans = () => (
  <V2Section id="plans" labelledBy="plans-title" innerClassName="flex flex-col gap-10 md:pt-[100px]">
    <TwoTone id="plans-title" lines={["Three ways to start.", "All of them check every payment."]} className="text-center" />
    <Plans />

    {/* Comparison: a real table on wide screens, one block per plan on phones */}
    <div className="mt-6 md:mt-10">
      <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{comparison.title}</h3>
      <div className="mt-6 hidden md:block">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[28%] py-3.5 pr-6">
                <span className="sr-only">Feature</span>
              </th>
              {order.map((id) => (
                <th key={id} scope="col" className="py-3.5 pr-6 text-[15px] font-semibold">
                  {planFor(id).name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((r) => (
              <tr key={r.label} className="border-b border-line align-top">
                <th scope="row" className="py-3.5 pr-6 font-medium">
                  {r.label}
                </th>
                {order.map((id) => (
                  <td key={id} className="py-3.5 pr-6 text-text-2">
                    <Included v={r.values[valueIndex[id]]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 md:hidden">
        {order.map((id) => (
          <div key={id} className="rounded-panel-lg bg-surface-1 p-5 shadow-edge">
            <p className="mb-2 text-[16px] font-semibold">{planFor(id).name}</p>
            <dl>
              {comparison.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 border-t border-line py-2.5 text-[14px]">
                  <dt className="font-medium">{r.label}</dt>
                  <dd className="text-right text-text-2">
                    {r.values[valueIndex[id]] === "✓" ? "Included" : r.values[valueIndex[id]]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  </V2Section>
);

export const PricingAgents = () => (
  <V2Section id="agents" labelledBy="agents-title" hairline>
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light">{catalogue.overline}</p>
      <TwoTone id="agents-title" lines={[catalogue.title, catalogue.titleAccent]} className="max-w-[760px]" />
      <Lede className="max-w-[620px]">{catalogue.lede}</Lede>
    </div>
    <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
      {catalogue.agents.map((a) => (
        <li key={a.name} className="flex flex-col gap-4 rounded-panel-lg bg-surface-1 p-6 shadow-edge md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{a.name}</h3>
            <Tag>{a.status}</Tag>
          </div>
          <p className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold leading-none tracking-[-0.05em]">{a.price}</span>
            <span className="text-[13px] text-text-2">per month, platform included</span>
          </p>
          <p className="text-[14px] text-text-2">{a.job}</p>
          <div className="mt-auto rounded-card bg-surface-2 p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-3">Sample mandate</p>
            <p className="mt-1.5 font-mono text-[13px] leading-relaxed">{a.sampleMandate}</p>
          </div>
        </li>
      ))}
    </ul>
    <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px]">
      <span className="text-text-2">{catalogue.more}</span>
      <Link href="#custom" className="inline-flex items-center gap-1 rounded-sm font-medium text-text-1 hover:text-white">
        Custom development <span aria-hidden className="text-text-2">›</span>
      </Link>
    </p>
  </V2Section>
);

export const PricingCustom = () => (
  <section id="custom" aria-labelledby="custom-title" className="relative overflow-hidden bg-bg">
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[linear-gradient(180deg,#101A3F,rgba(16,26,63,0))]" />
    <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-20 md:pb-[110px] md:pt-[120px]">
      <div className="flex flex-col gap-5">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light">{customBuild.overline}</p>
        <TwoTone id="custom-title" lines={[customBuild.title, customBuild.titleAccent]} className="max-w-[760px]" />
        <Lede className="max-w-[640px]">{customBuild.lede}</Lede>
      </div>
      <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
        {customBuild.steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-3 rounded-panel-lg bg-surface-1 p-6 shadow-edge">
            <span className="font-mono text-[13px] text-cobalt-light">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="text-[14px] text-text-2">{s.body}</p>
          </li>
        ))}
      </ol>
      <Btn href={customBuild.cta.href} className="mt-10">
        {customBuild.cta.label}
      </Btn>
    </div>
  </section>
);
