import { useState } from "react";

export const useScrolled = (threshold: number = 40) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = (node: HTMLElement | null) => {
    if (!node) return;
    let el: HTMLElement | null = node.parentElement;
    const isScrollable = (e: HTMLElement) => {
      const style = window.getComputedStyle(e);
      return (
        /(auto|scroll)/.test(style.overflowY) && e.scrollHeight > e.clientHeight
      );
    };
    while (el && !isScrollable(el)) {
      el = el.parentElement;
    }

    const handleScroll = () => {
      const winY = window.scrollY || window.pageYOffset || 0;
      const elY = el ? el.scrollTop : 0;
      setIsScrolled(winY > threshold || elY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    el?.addEventListener(
      "scroll",
      handleScroll as EventListener,
      { passive: true } as AddEventListenerOptions
    );

    return () => {
      window.removeEventListener("scroll", handleScroll as EventListener);
      el?.removeEventListener("scroll", handleScroll as EventListener);
    };
  };

  return { isScrolled, ref } as const;
};
