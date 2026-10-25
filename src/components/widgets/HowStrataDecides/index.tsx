"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import Section from "@/components/containers/Section";
import { Overline } from "@/components/elements/Overline";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { decides } from "@/constraints/home";
import { decisionSceneSvg, SCENE_DURATION_S, SCENE_POSTER_AT } from "./scene";

/**
 * 03 How Strata decides (board 03B; spec: design/Home Section 03 Handoff.md).
 *
 * Centred header → macOS-style app window playing a 12 s loop of three
 * sample payments → three short columns (Mandate · Risk · Ledger).
 *
 * The window is the board's inline SVG, untouched (see ./scene.ts). Its
 * SMIL animation is controlled with the SVG element's own timeline API:
 * - frozen on its first frame until the section scrolls into view, then
 *   played from 0:00; paused again while it is off screen;
 * - with prefers-reduced-motion: frozen on the £9,800 review frame
 *   (t ≈ 0.6) with all three ledger blocks shown, never animated.
 * The H2 and the column copy are real HTML text, not part of the SVG.
 */

const windowShadow =
  "0 0 0 1px rgba(11,13,18,.12), 0 40px 80px -24px rgba(11,13,18,.35), 0 18px 36px -18px rgba(11,13,18,.3)";

const HowStrataDecides = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrapper = sceneRef.current;
    const svg = wrapper?.querySelector("svg");
    // pauseAnimations is missing in very old engines; the loop then just plays
    if (!wrapper || !svg || typeof svg.pauseAnimations !== "function") return;

    if (reduced) {
      svg.pauseAnimations();
      svg.setCurrentTime(SCENE_DURATION_S * SCENE_POSTER_AT);
      wrapper.classList.add("is-still");
      return;
    }

    wrapper.classList.remove("is-still");
    svg.pauseAnimations();
    svg.setCurrentTime(0); // blank start state until it is seen

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started) {
            svg.setCurrentTime(0); // first view: play from the beginning
            started = true;
          }
          svg.unpauseAnimations();
        } else {
          svg.pauseAnimations(); // off screen: stop, resume where it was
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Section tone="white" id="how-it-decides" labelledBy="decides-title">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:gap-16">
        <header className="flex flex-col items-center gap-5 text-center">
          <Overline>{decides.overline}</Overline>
          <h2
            id="decides-title"
            className="max-w-[980px] text-balance text-[clamp(34px,4.6vw,56px)] font-medium leading-[1.06] tracking-[-0.03em]"
          >
            {decides.title} <span className="text-fg-muted">{decides.titleRest}</span>
          </h2>
        </header>

        {/* App window: 1200 × 795 viewBox, scales to the container width */}
        <div
          ref={sceneRef}
          className={clsx("decide-scene overflow-hidden rounded-[10px] md:rounded-[14px]", reduced && "is-still")}
          style={{ boxShadow: windowShadow }}
          // Static, trusted markup from the design board (no user input)
          dangerouslySetInnerHTML={{ __html: decisionSceneSvg }}
        />

        <ul className="grid gap-8 min-[980px]:grid-cols-3 min-[980px]:gap-10">
          {decides.checks.map((c) => (
            <li key={c.id} className="flex flex-col gap-2">
              <h3 className="font-mono text-[13px] font-normal text-brand-on-subtle">{c.label}</h3>
              <p className="text-body-lg text-fg-muted">
                <strong className="font-semibold text-fg">{c.lead}</strong> {c.rest}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default HowStrataDecides;
