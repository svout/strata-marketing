import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { SignalDot } from "@/components/elements/DecisionChip";
import { reliability as rel } from "@/constraints/developers";

/**
 * Developers · 04 Reliability (W3): a plain "what if" table. Every value
 * in [brackets] is for the owner to fill with measured or decided values.
 * Desktop: a three-column table. Mobile: each row becomes a small card,
 * with the column names repeated as labels.
 */
const Reliability = () => (
  <Section tone="ink2" id="reliability" labelledBy="reliability-title">
    <SectionHeader
      overline={rel.overline}
      title={rel.title}
      titleId="reliability-title"
      aside={<p className="max-w-[340px] text-body-lg text-fg-muted">{rel.aside}</p>}
    />

    <div className="mt-10 overflow-hidden rounded-[24px] border border-line bg-ink md:mt-12 md:rounded-[28px]">
      <table className="w-full text-left">
        <caption className="sr-only">What Strata does when something goes wrong, and what you control</caption>
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-line font-mono text-[11.5px] uppercase tracking-[0.08em] text-fg-muted">
            {rel.columns.map((c) => (
              <th key={c} scope="col" className="px-7 py-4 font-normal">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rel.rows.map((r, i) => (
            <tr
              key={r.when}
              className={`flex flex-col gap-2 px-5 py-5 md:table-row md:p-0 ${i < rel.rows.length - 1 ? "border-b border-elevated" : ""}`}
            >
              <th scope="row" className="text-base font-semibold md:w-[280px] md:px-7 md:py-5">
                {r.when}
              </th>
              <td className="text-base text-[#C9CBD1] md:px-7 md:py-5">{r.then}</td>
              <td className="font-mono text-[13px] text-cobalt-300 md:w-[300px] md:px-7 md:py-5">
                <span className="mr-2 font-sans text-xs uppercase tracking-[0.06em] text-fg-muted md:hidden">You control</span>
                {r.control}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
      {rel.tiles.map((t) => (
        <li key={t.title} className="flex items-center gap-3.5 rounded-[18px] border border-line px-5 py-[18px]">
          <SignalDot tone="approve" className="size-2.5" />
          <span className="flex flex-col">
            <span className="text-base font-semibold">{t.title}</span>
            <span className={t.mono ? "font-mono text-[13px] text-fg-muted" : "text-[13.5px] text-fg-muted"}>{t.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  </Section>
);

export default Reliability;
