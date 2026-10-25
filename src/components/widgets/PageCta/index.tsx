import { Button } from "@/components/elements/Button";
import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { containerClass } from "@/components/containers/Section";

/**
 * Closing CTA strip for sub-pages (W2 section 07): ink band, one line on
 * the left, one button on the right; stacks on mobile.
 *
 * Background matches the Home CtaBand: the ink pill pattern with cobalt
 * lit pills. Because the copy and button sit in one row, the scrim is a
 * solid horizontal band through the middle ("band"), so the pattern and
 * the lit pills only show in the strips above and below the content.
 * One cobalt moment per page: a cobalt hero above means this band stays ink.
 */
const lit: LitPill[] = [
  { col: -5, row: 0, colour: "cobalt" },
  { col: 2, row: 1, colour: "cobalt" },
  { col: 6, row: 0, colour: "cobalt" },
  { col: -2, row: 8, colour: "cobalt" },
  { col: 4, row: 8, colour: "cobalt" },
];
const litCompact: LitPill[] = [
  { col: -2, row: 1, colour: "cobalt" },
  { col: 2, row: 0, colour: "cobalt" },
];

type PageCtaProps = {
  id: string;
  title: string;
  action: { label: string; href: string };
};

const PageCta = ({ id, title, action }: PageCtaProps) => (
  <section
    data-theme="dark"
    aria-labelledby={id}
    className="relative overflow-hidden border-b border-elevated bg-ink pb-16 pt-24 md:py-32"
  >
    <PillPattern id={`${id}-pattern`} variant="ink" lit={lit} litCompact={litCompact} scrim="band" />
    <div
      className={`${containerClass} relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between`}
    >
      <h2
        id={id}
        className="text-balance text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
      >
        {title}
      </h2>
      <Button variant="white" size="large" href={action.href} className="h-14 px-7 text-[17px]">
        {action.label}
      </Button>
    </div>
  </section>
);

export default PageCta;
