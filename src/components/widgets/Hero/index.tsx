import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { Button } from "@/components/elements/Button";
import Title from "@/components/elements/Title";
import { containerClass } from "@/components/containers/Section";
import { hero } from "@/constraints/home";

/**
 * 01 Hero (W1 / W6). Full-bleed cobalt pattern, centred, one idea.
 * The live decision panel (next section) overlaps its bottom edge, so
 * the hero reserves that space with extra bottom padding.
 *
 * Lit pills sit outside the copy column (Pattern system: never under the
 * headline, the buttons or the product card): 6 on the desktop grid,
 * 3 on the mobile grid. All white: no ink or amber pills in the hero.
 */
const lit: LitPill[] = [
  { col: -6, row: 4, colour: "white" },
  { col: -5, row: 13, colour: "white" },
  { col: -7, row: 20, colour: "white" },
  { col: 4, row: 3, colour: "white" },
  { col: 5, row: 11, colour: "white" },
  { col: 6, row: 16, colour: "white" },
];
// Mobile: only in the band between the header and the label (y ≈ 60–110)
const litCompact: LitPill[] = [
  { col: 1, row: 3, colour: "white" },
  { col: -2, row: 4, colour: "white" },
  { col: 2, row: 3, colour: "white" },
];

/** The three shifted lines of the mark, used as the label's icon */
const MarkLines = () => (
  <span aria-hidden className="flex flex-col gap-0.5">
    <span className="ml-1.5 h-[3px] w-3.5 rounded-full bg-white" />
    <span className="ml-[3px] h-[3px] w-3.5 rounded-full bg-white" />
    <span className="h-[3px] w-3.5 rounded-full bg-white" />
  </span>
);

const Hero = () => (
  <section
    data-theme="cobalt"
    aria-labelledby="hero-title"
    className="relative overflow-hidden bg-cobalt-500 pb-40 pt-[120px] md:pb-[300px] md:pt-[184px]"
  >
    <PillPattern id="hero" variant="cobalt" lit={lit} litCompact={litCompact} />

    <div className={`${containerClass} relative flex flex-col items-start gap-5 md:items-center md:gap-7 md:text-center`}>
      <p className="inline-flex items-center gap-2.5 rounded-full bg-cobalt-700 px-4 py-2 text-sm font-medium">
        <MarkLines />
        {hero.label}
      </p>
      <Title as="h1" variant="display" id="hero-title" className="max-w-[17ch] md:max-w-none">
        {hero.headline}
        <br className="hidden md:block" /> <span className="text-ink">{hero.headlineAccent}</span>
      </Title>
      <p className="max-w-[620px] text-body-lg text-fg-muted md:text-[21px]">{hero.lede}</p>
      <div className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button variant="white" size="large" href={hero.primary.href} className="h-[52px] px-7 text-[17px] md:h-14">
          {hero.primary.label}
        </Button>
        <Button variant="ink" size="large" href={hero.secondary.href} className="h-[52px] px-7 text-[17px] md:h-14">
          {hero.secondary.label}
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
