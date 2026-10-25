"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Tracks whether an element is on screen. With `once: false` it keeps
 * observing, so a looping animation can pause while scrolled away.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.2, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView] as const;
}
