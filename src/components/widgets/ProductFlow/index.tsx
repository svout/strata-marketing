import clsx from "clsx";
import Section from "@/components/containers/Section";
import { DecisionChip } from "@/components/elements/DecisionChip";
import { productFlow as flow } from "@/constraints/product";

/**
 * Product · 02 Flow diagram (W2): the whole system in one picture.
 * AI agent → Strata (Mandate, Risk, Ledger, shifted like the logo) → outcomes.
 *
 * Motion (desktop, CSS only, 4.8 s loop, defined in globals.css):
 * a payment dot travels along the first connector, the three layers
 * light up one after another, then the dot leaves along the second
 * connector. Reduced motion: no dot, no lighting; the diagram is static.
 * On mobile the diagram stacks vertically and stays static.
 */
const shift = ["lg:ml-12", "lg:mx-6", "lg:mr-12"];

/** Horizontal connector on desktop, vertical on mobile; carries the dot */
function Connector({ dot }: { dot: "in" | "out" }) {
  return (
    <div aria-hidden className="relative flex h-10 w-0.5 items-center justify-center self-center bg-line lg:h-0.5 lg:w-16">
      <span className={clsx("flow-dot hidden lg:block", dot === "in" ? "flow-dot-in" : "flow-dot-out")} />
    </div>
  );
}

const ProductFlow = () => (
  <Section tone="white" labelledBy="flow-title">
    <h2 id="flow-title" className="sr-only">
      {flow.title}
    </h2>
    <figure className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
      <figcaption className="sr-only">
        An AI agent tries to pay. Strata checks the payment against the mandate, scores its risk and records it on
        the ledger. The payment is then approved and paid, sent to a person to review, or blocked with nothing
        charged.
      </figcaption>

      <div className="flex h-[110px] w-[170px] shrink-0 flex-col items-center justify-center gap-1 rounded-[18px] border-[1.5px] border-fg">
        <span className="text-lg font-semibold">{flow.agent.name}</span>
        <span className="font-mono text-xs text-fg-muted">{flow.agent.note}</span>
      </div>

      <Connector dot="in" />

      <div
        data-theme="dark"
        className="flex w-full max-w-[520px] flex-col gap-2.5 rounded-[26px] bg-ink p-5 md:p-[26px]"
      >
        <span className="font-mono text-xs text-fg-muted">STRATA</span>
        {flow.layers.map((layer, i) => (
          <div
            key={layer}
            className={clsx(
              "flow-layer flex h-[52px] items-center rounded-full bg-cobalt-500 px-[22px] text-[17px] font-semibold text-white",
              shift[i],
            )}
            style={{ animationDelay: `${1.15 + i * 0.6}s` }}
          >
            {layer}
          </div>
        ))}
      </div>

      <Connector dot="out" />

      <ul className="flex flex-col items-center gap-2.5 lg:items-start">
        {flow.outcomes.map((o) => (
          <li key={o.label}>
            <DecisionChip tone={o.tone} dot={false} size="md" className="px-4 py-2.5 text-[15px]">
              {o.label}
            </DecisionChip>
          </li>
        ))}
      </ul>
    </figure>
  </Section>
);

export default ProductFlow;
