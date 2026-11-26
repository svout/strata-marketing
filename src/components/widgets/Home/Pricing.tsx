import { Lede, TwoTone, V2Section } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import Plans from "@/components/widgets/Plans";
import { homePricing } from "@/constraints/home";

/** W8 · Pricing: centred heading and lede, Monthly / Yearly toggle and the plan cards in a wider (1320 px) column (prices in constraints/pricing). */
export default function HomePricing() {
  return (
    <V2Section id="pricing" labelledBy="pricing-title" wide innerClassName="flex flex-col gap-8">
      <Reveal>
        <div className="flex flex-col items-center gap-5 text-center">
          <TwoTone id="pricing-title" lines={homePricing.title} />
          <Lede className="max-w-[560px]">{homePricing.lede}</Lede>
        </div>
      </Reveal>
      <Plans />
      <p className="text-center text-[13px] text-text-3">{homePricing.footnote}</p>
    </V2Section>
  );
}
