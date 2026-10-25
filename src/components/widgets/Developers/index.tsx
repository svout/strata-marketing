"use client";

import { useState } from "react";
import clsx from "clsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Section from "@/components/containers/Section";
import { SectionHeader } from "@/components/elements/SectionHeader";
import { Button } from "@/components/elements/Button";
import { developers } from "@/constraints/home";
import type { CodeLine } from "@/types/home";

/**
 * 06 Developers: request on the left, the three layers in between,
 * response on the right. Language tabs (MUI Tabs: arrow-key navigation,
 * proper tab/tabpanel roles) switch the request pane.
 */
const tokenColour = {
  plain: "text-[#C9CBD1]",
  comment: "text-mist",
  str: "text-mint",
  num: "text-amber",
  key: "text-cobalt-300",
} as const;

function Code({ lines, label }: { lines: CodeLine[]; label: string }) {
  return (
    <pre
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.85] md:px-7 md:py-6 md:text-[14.5px]"
    >
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line.map(([text, kind], j) => (
              <span key={j} className={tokenColour[kind]}>
                {text}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}

const layers = [
  { label: "✓ Mandate", className: "bg-approve-tint text-approve-fg lg:ml-6" },
  { label: "▲ Risk", className: "bg-review-tint text-review-fg lg:mx-3" },
  { label: "● Ledger", className: "bg-recorded-tint text-recorded-fg lg:mr-6" },
];

const Developers = () => {
  const [lang, setLang] = useState(developers.samples[0].id);
  const sample = developers.samples.find((s) => s.id === lang) ?? developers.samples[0];

  return (
    <Section tone="ink" labelledBy="dev-title">
      <SectionHeader
        overline={developers.overline}
        title={developers.title}
        titleId="dev-title"
        aside={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="large" href={developers.primary.href}>
              {developers.primary.label}
            </Button>
            <Button variant="outline" size="large" href={developers.secondary.href}>
              {developers.secondary.label}
            </Button>
          </div>
        }
      />

      <div className="mt-10 overflow-hidden rounded-[22px] border border-line bg-surface md:mt-12 md:rounded-[28px]">
        <div className="flex items-center gap-3 border-b border-line px-3 py-2.5 md:px-4">
          <Tabs
            value={lang}
            onChange={(_, v: string) => setLang(v)}
            aria-label="Language"
            variant="scrollable"
            scrollButtons={false}
          >
            {developers.samples.map((s) => (
              <Tab key={s.id} value={s.id} label={s.label} id={`code-tab-${s.id}`} aria-controls="code-panel" />
            ))}
          </Tabs>
          <span className="ml-auto hidden font-mono text-xs text-mist sm:inline">{developers.endpoint}</span>
        </div>

        <div
          id="code-panel"
          role="tabpanel"
          aria-labelledby={`code-tab-${sample.id}`}
          className="grid lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)]"
        >
          <div className="min-w-0">
            <Code lines={sample.request} label={`${sample.label} request`} />
            {sample.illustrative && (
              <p className="px-5 pb-4 font-mono text-[11px] text-mist md:px-7">Illustrative. [{sample.label} SDK status]</p>
            )}
          </div>
          <ol
            aria-label="Layers the request passes through"
            className="flex gap-2 border-y border-line px-5 py-4 lg:flex-col lg:justify-center lg:gap-2.5 lg:border-x lg:border-y-0 lg:px-5"
          >
            {layers.map((l) => (
              <li
                key={l.label}
                className={clsx(
                  "flex h-10 flex-1 items-center rounded-full px-3.5 text-[13px] font-semibold lg:flex-none",
                  l.className,
                )}
              >
                {l.label}
              </li>
            ))}
          </ol>
          <Code lines={developers.response} label="Response" />
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-4">
        {developers.tiles.map((t) => (
          <li key={t.title} className="flex flex-col gap-1.5 rounded-[20px] border border-line px-5 py-5">
            <span className="text-[17px] font-semibold">{t.title}</span>
            <span className="font-mono text-[12.5px] text-fg-muted">{t.detail}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Developers;
