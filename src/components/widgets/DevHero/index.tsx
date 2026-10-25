"use client";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { Button } from "@/components/elements/Button";
import { CodeBlock } from "@/components/elements/CodeBlock";
import { containerClass } from "@/components/containers/Section";
import { devHero as hero } from "@/constraints/developers";

/**
 * Developers · 01 hero (W3). Ink pill pattern (developer pages use the
 * ink version), copy on the left, a code window on the right with
 * language tabs over one request and its response.
 * Lit pills: cobalt only, on the right, clear of the code window.
 * The page's one cobalt moment is the CTA band at the bottom.
 */
const lit: LitPill[] = [
  { col: 2, row: 4, colour: "cobalt" },
  { col: 6, row: 6, colour: "cobalt" },
  { col: 7, row: 17, colour: "cobalt" },
  { col: 4, row: 2, colour: "cobalt" },
];
const litCompact: LitPill[] = [
  { col: 1, row: 3, colour: "cobalt" },
  { col: -2, row: 4, colour: "cobalt" },
];

const DevHero = () => {
  const [lang, setLang] = useState<string>(hero.samples[0].id);
  const sample = hero.samples.find((s) => s.id === lang) ?? hero.samples[0];

  return (
    <section
      data-theme="dark"
      aria-labelledby="dev-hero-title"
      className="relative overflow-hidden bg-ink pb-16 pt-[120px] md:pb-28 md:pt-[180px]"
    >
      <PillPattern id="dev-hero" variant="ink" lit={lit} litCompact={litCompact} scrim="left" />

      <div className={`${containerClass} relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
        <div className="flex flex-col items-start gap-5 md:gap-6">
          <p className="font-mono text-label font-medium uppercase tracking-[0.1em] text-cobalt-300">{hero.overline}</p>
          <h1
            id="dev-hero-title"
            className="text-balance text-[clamp(2.75rem,1.4rem+4.6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]"
          >
            {hero.headline}
          </h1>
          <p className="max-w-[560px] text-body-lg text-[#C9CBD1] md:text-[19px]">{hero.lede}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary" size="large" href={hero.primary.href} className="h-[52px] px-6">
              {hero.primary.label}
            </Button>
            <Button variant="outline" size="large" href={hero.secondary.href} className="h-[52px] px-6">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_60px_rgb(0_0_0/0.5)]">
          <div className="border-b border-line px-3 py-2.5">
            <Tabs
              value={lang}
              onChange={(_, v: string) => setLang(v)}
              aria-label="Language"
              variant="scrollable"
              scrollButtons={false}
            >
              {hero.samples.map((s) => (
                <Tab key={s.id} value={s.id} label={s.label} id={`hero-tab-${s.id}`} aria-controls="hero-code" />
              ))}
            </Tabs>
          </div>
          <div id="hero-code" role="tabpanel" aria-labelledby={`hero-tab-${sample.id}`} className="px-5 py-5 md:px-6">
            <CodeBlock lines={sample.code} label={`${sample.label} request`} />
            <CodeBlock lines={hero.response} label="Response" className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevHero;
