import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { Button } from "@/components/elements/Button";
import Title from "@/components/elements/Title";
import { containerClass } from "@/components/containers/Section";
import { cta } from "@/constraints/home";

/**
 * 10 CTA band: bookends the hero. Same pattern, ink version, cobalt lit
 * pills. One cobalt moment per page: cobalt hero → ink CTA.
 */
const lit: LitPill[] = [
  { col: -6, row: 3, colour: "cobalt" },
  { col: 5, row: 2, colour: "cobalt" },
  { col: 4, row: 10, colour: "cobalt" },
  { col: -5, row: 9, colour: "cobalt" },
];
const litCompact: LitPill[] = [
  { col: -2, row: 1, colour: "cobalt" },
  { col: 2, row: 0, colour: "cobalt" },
];

const CtaBand = () => (
  <section
    data-theme="dark"
    aria-labelledby="cta-title"
    className="relative overflow-hidden border-t border-elevated bg-ink py-20 md:py-32"
  >
    <PillPattern id="cta" variant="ink" lit={lit} litCompact={litCompact} scrim="radial-wide" />
    <div className={`${containerClass} relative flex flex-col items-start gap-7 md:items-center md:text-center`}>
      <Title as="h2" variant="h1" id="cta-title" className="md:text-[60px] md:leading-[1.02] md:tracking-[-0.045em]">
        {cta.title}
        <br className="hidden md:block" /> <span className="text-cobalt-300">{cta.titleAccent}</span>
      </Title>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button variant="primary" size="large" href={cta.primary.href} className="h-[52px] px-7 text-[17px] md:h-14">
          {cta.primary.label}
        </Button>
        <Button variant="outline" size="large" href={cta.secondary.href} className="h-[52px] px-7 text-[17px] md:h-14">
          {cta.secondary.label}
        </Button>
      </div>
    </div>
  </section>
);

export default CtaBand;
