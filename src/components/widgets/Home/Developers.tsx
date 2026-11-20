"use client";

import { useState } from "react";
import clsx from "clsx";
import { Btn, GlowTile, Lede, LogoTile, Tag, TwoTone, v2Container } from "@/components/elements/V2";
import { PauseButton, ProgressTabs, Reveal, useAutoTabs } from "@/components/elements/V2/client";
import { V2Icons } from "@/components/icons/v2";
import { developers, type CodeToken } from "@/constraints/home";

/**
 * W6 · Developers. Centred header on a navy gradient, then a 520 px
 * "strata · quickstart" panel with a floating code card, and four tabs
 * (same tabs logic as W3). Language tags switch the snippet language:
 * only Python exists so far; TypeScript and Go show "[coming soon]".
 * The copy icon copies the code to the clipboard.
 */
const MS = 5000;

const tokenClass: Record<NonNullable<CodeToken["k"]> | "plain", string> = {
  comment: "text-text-3",
  string: "text-approved",
  number: "text-review",
  plain: "text-text-1",
};

const asText = (code: CodeToken[][]) => code.map((line) => line.map((t) => t.t).join("")).join("\n");

export default function Developers() {
  const { ref, active, select, cycle, running, reduced, paused, togglePause } = useAutoTabs(developers.snippets.length, MS);
  const [lang, setLang] = useState("python");
  const [copied, setCopied] = useState(false);
  const snippet = developers.snippets[active];
  const ready = developers.languages.find((l) => l.id === lang)?.ready ?? false;

  const copy = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(asText(snippet.code));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="developers" aria-labelledby="dev-title" className="relative overflow-hidden bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(180deg,#101A3F,rgba(16,26,63,0))]" />
      <div className={clsx(v2Container, "relative pb-20 pt-20 md:pb-[110px] md:pt-[120px]")}>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <GlowTile gradient="linear-gradient(180deg,#23252B,#141518)">
            <V2Icons.Code size={26} className="text-cobalt-light" />
          </GlowTile>
          <TwoTone id="dev-title" lines={developers.title} order="white" size="h2-lg" className="mt-2" />
          <Lede className="max-w-[480px]">{developers.lede}</Lede>
          <Btn href={developers.cta.href}>{developers.cta.label}</Btn>
        </Reveal>

        <div ref={ref} className="mt-10 flex flex-col gap-10 md:mt-14">
          <div className="relative flex flex-col rounded-[22px] bg-surface-1 shadow-edge md:h-[520px]">
            <div className="flex items-center gap-2.5 px-6 pt-6">
              <LogoTile size={22} />
              <span className="text-[13px] text-text-2">{developers.window}</span>
              <PauseButton paused={paused} onToggle={togglePause} reduced={reduced} label="quickstart steps" className="ml-auto" />
            </div>
            <div className="flex grow items-center justify-center p-3 md:p-6">
              <div
                id="dev-panel"
                role="tabpanel"
                aria-labelledby={`dev-tab-${active}`}
                className="w-full max-w-[760px] overflow-hidden rounded-panel bg-surface-2 shadow-float"
              >
                <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
                  <div role="group" aria-label="Language" className="flex gap-1.5">
                    {developers.languages.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        aria-pressed={lang === l.id}
                        onClick={() => setLang(l.id)}
                        className={clsx(
                          "h-6 rounded-chip px-2 font-mono text-[11px] transition-colors",
                          lang === l.id ? "bg-surface-3 text-text-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "bg-surface-3/60 text-text-2 hover:text-text-1",
                        )}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={copy}
                    disabled={!ready}
                    aria-label={copied ? "Code copied" : "Copy code"}
                    className="ml-auto flex size-7 items-center justify-center rounded-chip text-text-2 hover:text-text-1 disabled:opacity-40"
                  >
                    {copied ? <V2Icons.Check size={15} /> : <V2Icons.Copy size={15} />}
                  </button>
                  <span className="sr-only" aria-live="polite">
                    {copied ? "Code copied to clipboard" : ""}
                  </span>
                </div>

                <div key={`${active}-${lang}`} className="min-h-[190px] animate-[feature-in_200ms_ease-out_both] overflow-x-auto px-5 py-5 motion-reduce:animate-none" tabIndex={0} role="region" aria-label={`${snippet.title} code`}>
                  {ready ? (
                    <pre className="m-0 font-mono text-[13px] leading-[1.8] md:text-[14px]">
                      <code>
                        {snippet.code.map((line, i) => (
                          <span key={i} className="block whitespace-pre">
                            {line.map((t, j) => (
                              <span key={j} className={tokenClass[t.k ?? "plain"]}>
                                {t.t}
                              </span>
                            ))}
                          </span>
                        ))}
                      </code>
                    </pre>
                  ) : (
                    <p className="font-mono text-[14px] text-text-2">{developers.comingSoon}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-line px-3.5 py-2.5">
                  <span className="text-[12px] text-text-3">Response</span>
                  {snippet.response.map((r) => (
                    <span key={r.k} className="flex h-7 items-center gap-2 rounded-button px-2 font-mono text-[12px] text-text-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
                      {r.k}
                      <Tag tone={r.tone}>{r.v}</Tag>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ProgressTabs
            items={developers.snippets.map(({ title, desc }) => ({ title, desc }))}
            active={active}
            onSelect={select}
            cycle={cycle}
            running={running}
            ms={MS}
            label="Quickstart steps"
            idBase="dev"
          />
        </div>
      </div>
    </section>
  );
}
