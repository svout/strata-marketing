import { Btn, Lede, TwoTone, V2Section } from "@/components/elements/V2";
import { V2Icons } from "@/components/icons/v2";
import type { FaqItem } from "@/types/product";
import type { SectionTone } from "@/types/section";

/**
 * FAQ, v2 (spec W7). Grid 420px | 1fr. Left: two-tone heading, lede and
 * "Talk to us" (ghost) + "Read the docs" (link). Right: an accordion of
 * native <details>/<summary> rows (keyboard and screen-reader support
 * built in, answers stay in the HTML for crawlers). Each row has a 1 px
 * top line and 22 px vertical padding; "+" turns into "×" when open.
 * The first row is open by default. Pages add FAQPage JSON-LD for the
 * answered questions only (lib/jsonLd `faqSchema`).
 */
type FaqProps = {
  id: string;
  /** One string, or the two lines of a two-tone heading */
  title: string | [string, string];
  lede?: string;
  items: FaqItem[];
  actions?: boolean;
  /** v1 prop, ignored: v2 sections are all on bg */
  tone?: SectionTone;
};

const defaultLede = "Can't find what you need? Talk to the people building Strata.";

const Faq = ({ id, title, lede = defaultLede, items, actions = true }: FaqProps) => (
  <V2Section id={id} labelledBy={`${id}-title`}>
    <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-20">
      <div className="flex flex-col items-start gap-6">
        {Array.isArray(title) ? (
          <TwoTone id={`${id}-title`} lines={title} />
        ) : (
          <h2 id={`${id}-title`} className="text-balance text-h2 font-bold">
            {title}
          </h2>
        )}
        <Lede className="max-w-[360px]">{lede}</Lede>
        {actions && (
          <div className="flex flex-wrap items-center gap-3.5">
            <Btn href="/demo" variant="ghost">
              Talk to us
            </Btn>
            <Btn href="/#developers" variant="link">
              See the API
            </Btn>
          </div>
        )}
      </div>

      <div className="border-b border-line">
        {items.map((item, i) => (
          <details key={item.question} open={i === 0} className="group border-t border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-[22px] [&::-webkit-details-marker]:hidden">
              <h3 className="text-[17px] font-medium leading-snug">{item.question}</h3>
              <V2Icons.Plus size={18} className="shrink-0 text-text-2 transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <p className="-mt-1.5 max-w-[560px] pb-[22px] text-[15px] leading-[1.6] text-text-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </V2Section>
);

export default Faq;
