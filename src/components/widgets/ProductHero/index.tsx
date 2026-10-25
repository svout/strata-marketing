import Link from "next/link";
import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { containerClass } from "@/components/containers/Section";
import { productHero as hero } from "@/constraints/product";

/**
 * Product · 01 Sub-page hero (W2). Same cobalt pattern as Home, shorter,
 * left-aligned, no product card. The scrim fades left to right so the
 * copy sits on solid cobalt and the pattern shows on the right.
 *
 * The three pills jump to the layer sections. Once they scroll away, the
 * same links reappear in the sticky bar (ProductNav).
 * Lit pills: right side only, all white (no ink or amber), as on Home.
 */
const lit: LitPill[] = [
  { col: 3, row: 6, colour: "white" },
  { col: 5, row: 11, colour: "white" },
  { col: 6, row: 3, colour: "white" },
  { col: 4, row: 16, colour: "white" },
];
const litCompact: LitPill[] = [
  { col: 1, row: 3, colour: "white" },
  { col: -2, row: 4, colour: "white" },
  { col: 2, row: 3, colour: "white" },
];

const ProductHero = () => (
  <section
    data-theme="cobalt"
    aria-labelledby="product-title"
    className="relative overflow-hidden bg-cobalt-500 pb-16 pt-[120px] md:pb-24 md:pt-[170px]"
  >
    <PillPattern id="product-hero" variant="cobalt" lit={lit} litCompact={litCompact} scrim="left" />

    <div className={`${containerClass} relative`}>
      <div className="flex max-w-[760px] flex-col items-start gap-5 md:gap-6">
        <p className="font-mono text-label font-medium uppercase tracking-[0.1em] text-cobalt-100">{hero.overline}</p>
        <h1
          id="product-title"
          className="text-balance text-[clamp(2.75rem,1.4rem+5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
        >
          {hero.headline} <span className="text-ink">{hero.headlineAccent}</span>
        </h1>
        <p className="max-w-[620px] text-body-lg text-fg-muted md:text-xl">{hero.lede}</p>
        <nav aria-label="Jump to a check" id="product-anchors" className="mt-2">
          <ul className="flex flex-wrap gap-2.5">
            {hero.anchors.map((a) => (
              <li key={a.id}>
                <Link
                  href={`#${a.id}`}
                  className="inline-flex h-12 items-center rounded-full bg-white px-5 font-semibold text-ink transition-colors hover:bg-cobalt-50"
                >
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </section>
);

export default ProductHero;
