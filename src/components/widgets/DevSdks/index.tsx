import clsx from "clsx";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { DecisionChip } from "@/components/elements/DecisionChip";
import { CodeBlock } from "@/components/elements/CodeBlock";
import { sdks } from "@/constraints/developers";

/**
 * Developers · 03 SDKs & webhooks (W3). Left: SDK table (language,
 * install line, status). Right: one payment's life as webhook events on
 * a timeline. Statuses, package names and event names stay [placeholders]
 * until the API spec is final. Section id "api" is the target of the
 * "API reference" links.
 */
const dotColour = {
  review: "bg-review",
  recorded: "bg-cobalt-300",
  approve: "bg-approve",
  brand: "bg-cobalt-500",
} as const;

const DevSdks = () => (
  <Section tone="ink" id="api" labelledBy="sdks-title" className="scroll-mt-4">
    <SectionHeader overline={sdks.overline} title={sdks.title} titleId="sdks-title" />

    <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-2">
      {/* SDKs */}
      <div className="flex min-w-0 flex-col gap-1.5 rounded-[24px] border border-line bg-surface p-5 md:rounded-[28px] md:p-7">
        <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[22px] font-semibold">SDKs</h3>
          <span className="text-[13px] text-fg-muted">{sdks.sdkNote}</span>
        </div>
        <table className="w-full text-left">
          <caption className="sr-only">SDKs, how to install them and their status</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Language</th>
              <th scope="col">Install</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sdks.rows.map((r) => (
              <tr key={r.name} className="border-t border-line">
                <th scope="row" className="py-4 pr-3 align-middle text-base font-semibold">
                  {r.name}
                </th>
                <td className="py-4 pr-3 align-middle font-mono text-[12.5px] text-[#C9CBD1] md:text-[13px]">
                  <span className="[overflow-wrap:anywhere]">{r.install}</span>
                </td>
                <td className="py-4 text-right align-middle">
                  <DecisionChip tone={r.tone} dot={false}>
                    {r.status}
                  </DecisionChip>
                </td>
              </tr>
            ))}
            <tr className="border-y border-line">
              <th scope="row" className="py-4 pr-3 text-base font-semibold">
                {sdks.openapi.name}
              </th>
              <td className="py-4 pr-3 font-mono text-[13px] text-[#C9CBD1]">{sdks.openapi.file}</td>
              <td className="py-4 text-right">
                <a href={sdks.openapi.href} className="rounded-sm text-[13px] font-semibold text-cobalt-300 hover:underline">
                  {sdks.openapi.label}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-auto pt-4 text-[13.5px] text-fg-muted">{sdks.missing}</p>
      </div>

      {/* Webhooks */}
      <div className="flex min-w-0 flex-col gap-3.5 rounded-[24px] border border-line bg-surface p-5 md:rounded-[28px] md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[22px] font-semibold">Webhooks</h3>
          <span className="text-[13px] text-fg-muted">{sdks.webhookNote}</span>
        </div>
        <ol className="relative flex flex-1 flex-col pl-[26px]">
          <span aria-hidden className="absolute bottom-2 left-1.5 top-2 w-0.5 bg-line" />
          {sdks.events.map((e, i) => (
            <li key={e.name} className={clsx("relative flex flex-col gap-1.5", i < sdks.events.length - 1 && "pb-5")}>
              <span
                aria-hidden
                className={clsx(
                  "absolute -left-[26px] top-1 size-3.5 rounded-full shadow-[0_0_0_4px_var(--color-surface)]",
                  dotColour[e.tone as keyof typeof dotColour],
                )}
              />
              <div className="flex justify-between gap-3 font-mono text-[13px] md:text-[13.5px]">
                <span className="break-all text-white">{e.name}</span>
                <span className="shrink-0 text-fg-muted">{e.time}</span>
              </div>
              {"payload" in e && e.payload ? (
                <CodeBlock
                  lines={e.payload}
                  label={`${e.name} payload`}
                  className="rounded-[12px] bg-ink px-3.5 py-3 md:text-[12.5px]"
                />
              ) : (
                <span className="text-[13.5px] text-fg-muted">{"note" in e ? e.note : null}</span>
              )}
            </li>
          ))}
        </ol>
        <p className="border-t border-line pt-3.5 text-[13px] text-fg-muted">{sdks.webhookFooter}</p>
      </div>
    </div>
  </Section>
);

export default DevSdks;
