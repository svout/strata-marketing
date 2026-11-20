import { Btn, TwoTone, V2Section } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import Plans from "@/components/widgets/Plans";
import { homePricing } from "@/constraints/home";

/** W8 · Pricing: centred heading, Monthly / Yearly toggle and the plan cards (prices in constraints/pricing). */
export default function HomePricing() {
  return (
    <V2Section id="pricing" labelledBy="pricing-title" innerClassName="flex flex-col gap-8">
      <Reveal>
        <TwoTone id="pricing-title" lines={homePricing.title} className="text-center" />
      </Reveal>
      <Plans />
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-[13px] text-text-3">{homePricing.footnote}</p>
        <Btn href={homePricing.more.href} variant="link">
          {homePricing.more.label}
        </Btn>
      </div>
    </V2Section>
  );
}
