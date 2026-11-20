"use client";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CodeBlock } from "@/components/elements/CodeBlock";
import { LogoTile } from "@/components/elements/V2";
import { devHero as hero } from "@/constraints/developers";

/**
 * Developers hero code card (v2): sits to the right of the PageHero copy.
 * Language tabs over one request and its response, in a floating
 * surface-2 card like the Home W6 code card.
 */
export default function DevCodeCard() {
  const [lang, setLang] = useState<string>(hero.samples[0].id);
  const sample = hero.samples.find((s) => s.id === lang) ?? hero.samples[0];

  return (
    <div className="min-w-0 overflow-hidden rounded-panel bg-surface-2 shadow-float">
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <LogoTile size={18} />
        <Tabs value={lang} onChange={(_, v: string) => setLang(v)} aria-label="Language" variant="scrollable" scrollButtons={false}>
          {hero.samples.map((s) => (
            <Tab key={s.id} value={s.id} label={s.label} id={`hero-tab-${s.id}`} aria-controls="hero-code" className="mr-1.5" />
          ))}
        </Tabs>
      </div>
      <div id="hero-code" role="tabpanel" aria-labelledby={`hero-tab-${sample.id}`} className="px-5 py-5">
        <CodeBlock lines={sample.code} label={`${sample.label} request`} />
        <p className="mt-4 border-t border-line pt-3 text-[12px] text-text-3">Response</p>
        <CodeBlock lines={hero.response} label="Response" className="mt-1" />
      </div>
    </div>
  );
}
