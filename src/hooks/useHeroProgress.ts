"use client";

import { useEffect } from "react";

/**
 * Drives the hero → page transition (after scope360's hero): as the page
 * scrolls through its first HERO_FILL_PX, a progress value eases from 0 to
 * 1 and is written to CSS custom properties on <html>:
 *
 * - `--hero-p`: 0 at the top, 1 once filled. The hero's dark fill
 *   (PatternFrame `.hero-fill`) shrinks its offset, side insets and corner
 *   radius by (1 − p) until it covers the cobalt frame edge to edge; the
 *   header's glass background and bottom line fade in with p.
 * - `--header-top`: where the header sits, so it rides on the top edge of
 *   the fill (frame offset × (1 − p) − scrollY) and then sticks at 0.
 *
 * The value chases the scroll position with a short exponential ease
 * (~90 ms), so the motion stays smooth on coarse wheel steps. Reduced
 * motion: it follows the scroll directly, no easing. No React state: only
 * CSS variables change, so nothing re-renders.
 */
const HERO_FILL_PX = 220;
const EASE_MS = 90;

export function useHeroProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    let p = 0;
    let raf = 0;
    let last = 0;

    const target = () => Math.min(1, Math.max(0, window.scrollY / HERO_FILL_PX));
    const write = () => {
      const frameTop = wide.matches ? 72 : 56;
      root.style.setProperty("--hero-p", p.toFixed(4));
      root.style.setProperty("--header-top", `${Math.max(0, frameTop * (1 - p) - window.scrollY).toFixed(2)}px`);
    };

    const tick = (now: number) => {
      const t = target();
      const dt = last ? now - last : 16;
      last = now;
      p += (t - p) * (1 - Math.exp(-dt / EASE_MS));
      if (Math.abs(t - p) < 0.001) p = t;
      write();
      raf = p === t ? 0 : requestAnimationFrame(tick);
      if (!raf) last = 0;
    };

    const onScroll = () => {
      if (reduced.matches) {
        p = target();
        write();
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
      else write(); // keep the header glued to the fill between frames
    };

    // The page may load already scrolled (reload, anchor link): no animation
    p = target();
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", write);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", write);
    };
  }, []);
}
