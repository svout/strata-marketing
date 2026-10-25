import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { Button } from "@/components/elements/Button";
import { containerClass } from "@/components/containers/Section";

/**
 * Centred closing band on the pill pattern, for sub-pages whose one
 * cobalt moment is the CTA (Developers: ink hero → cobalt CTA, W3 note 05).
 * Same build as the Home CtaBand, with the variant and copy as props.
 * Lit pills: white on cobalt, cobalt on ink.
 */
type PatternCtaProps = {
  id: string;
  variant: "cobalt" | "ink";
  title: string;
  titleAccent?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const litFor = (colour: LitPill["colour"]): { lit: LitPill[]; litCompact: LitPill[] } => ({
  lit: [
    { col: -6, row: 3, colour },
    { col: 5, row: 2, colour },
    { col: 4, row: 10, colour },
    { col: -5, row: 9, colour },
  ],
  litCompact: [
    { col: -2, row: 1, colour },
    { col: 2, row: 0, colour },
  ],
});

const PatternCta = ({ id, variant, title, titleAccent, primary, secondary }: PatternCtaProps) => {
  const cobalt = variant === "cobalt";
  const { lit, litCompact } = litFor(cobalt ? "white" : "cobalt");
  return (
    <section
      data-theme={cobalt ? "cobalt" : "dark"}
      aria-labelledby={id}
      className={`relative overflow-hidden py-20 md:py-32 ${cobalt ? "bg-cobalt-500" : "border-t border-elevated bg-ink"}`}
    >
      <PillPattern id={`${id}-pattern`} variant={variant} lit={lit} litCompact={litCompact} scrim="radial-wide" />
      <div className={`${containerClass} relative flex flex-col items-start gap-7 md:items-center md:text-center`}>
        <h2
          id={id}
          className="text-balance text-h1 md:text-[60px] md:leading-[1.02] md:tracking-[-0.045em]"
        >
          {title}
          {titleAccent && (
            <>
              <br className="hidden md:block" />{" "}
              <span className={cobalt ? "text-ink" : "text-cobalt-300"}>{titleAccent}</span>
            </>
          )}
        </h2>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant={cobalt ? "white" : "primary"}
            size="large"
            href={primary.href}
            className="h-[52px] px-7 text-[17px] md:h-14"
          >
            {primary.label}
          </Button>
          {secondary && (
            <Button
              variant={cobalt ? "ink" : "outline"}
              size="large"
              href={secondary.href}
              className="h-[52px] px-7 text-[17px] md:h-14"
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PatternCta;
