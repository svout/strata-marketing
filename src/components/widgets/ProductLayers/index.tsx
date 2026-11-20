import clsx from "clsx";
import Section from "@/components/containers/Section";
import { productLayers } from "@/constraints/product";
import type { LayerId } from "@/types/product";
import type { SectionTone } from "@/types/section";
import { LedgerChain, MandateEditorCrop, ReviewQueueCrop } from "./visuals";

/**
 * Product · 03–05 one section per layer (W2). Text and a product crop
 * side by side, alternating sides: Mandate (stone, text left), Risk
 * (white, crop left), Ledger (ink, text left, chain as linked blocks).
 * On mobile the text always comes first.
 *
 * Each section's id (#mandate, #risk, #ledger) is a target of the hero
 * pills and the sticky bar; scroll-mt leaves room for the header + bar.
 */
const layout: Record<LayerId, { tone: SectionTone; visual: () => React.ReactElement; visualFirst: boolean }> = {
  mandate: { tone: "stone", visual: MandateEditorCrop, visualFirst: false },
  risk: { tone: "white", visual: ReviewQueueCrop, visualFirst: true },
  ledger: { tone: "ink", visual: LedgerChain, visualFirst: false },
};

const ProductLayers = () => (
  <>
    {productLayers.map((layer) => {
      const l = layout[layer.id];
      const Visual = l.visual;
      return (
        <Section
          key={layer.id}
          id={layer.id}
          tone={l.tone}
          labelledBy={`${layer.id}-title`}
          className="scroll-mt-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={clsx("flex flex-col gap-5", l.visualFirst && "lg:order-2")}>
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light">
                {layer.eyebrow}
              </p>
              <h2
                id={`${layer.id}-title`}
                className="text-balance text-h2 font-bold"
              >
                {layer.title}
              </h2>
              <ul className="flex flex-col gap-2 pl-5 text-body-lg text-fg-muted marker:text-cobalt-light [&>li]:list-disc">
                {layer.points.map((p) => (
                  <li key={p} className="pl-1">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx(l.visualFirst && "lg:order-1")}>
              <Visual />
            </div>
          </div>
        </Section>
      );
    })}
  </>
);

export default ProductLayers;
