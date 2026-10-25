"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` px.
 * One passive listener, state only changes when the boolean flips.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update(); // page may load already scrolled (reload, anchor link)
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
