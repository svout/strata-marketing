"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal that is safe without JavaScript.
 *
 * `revealed` starts true, so the server HTML shows the finished state.
 * After mount, if the element is still below the fold and motion is
 * allowed, it flips to false and back to true once the element scrolls
 * into view. Reduced-motion visitors never see the hidden state.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) return; // already on screen

    setRevealed(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, revealed] as const;
}
