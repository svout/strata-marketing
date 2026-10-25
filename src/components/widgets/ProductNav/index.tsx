"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { containerClass } from "@/components/containers/Section";
import { productHero } from "@/constraints/product";

/**
 * Product · sticky "on this page" bar (W2 note: the hero's three pills
 * "stick to the top on scroll").
 *
 * The hero's pills can't stick outside the hero, so this bar takes over:
 * it fades in under the fixed site header once the hero pills have
 * scrolled away, highlights the layer you're reading, and fades out after
 * the Ledger section. It has zero height in the layout (sticky, h-0), so
 * showing or hiding it never shifts the page.
 *
 * Place it as the first child of the wrapper around the flow diagram and
 * the three layer sections: sticky elements only stick inside their parent.
 */
const BAR_H = 56;

const ProductNav = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 72;
      const heroPills = document.getElementById("product-anchors");
      const wrapper = anchorRef.current?.parentElement;
      if (!heroPills || !wrapper) return;

      const pillsGone = heroPills.getBoundingClientRect().bottom < headerH;
      const wrapperLeft = wrapper.getBoundingClientRect().bottom < headerH + BAR_H + 40;
      setVisible(pillsGone && !wrapperLeft);

      // Active = last layer whose top has passed the bar
      let current: string | null = null;
      for (const a of productHero.anchors) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= headerH + BAR_H + 80) current = a.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Matches the scrolled header height: 72 px mobile, 84 px desktop
    <div ref={anchorRef} className="sticky top-[72px] z-20 h-0 md:top-[84px]">
      <nav
        aria-label="On this page"
        aria-hidden={!visible}
        className={clsx(
          "absolute inset-x-0 top-0 border-b border-line bg-elevated/90 backdrop-blur-md transition-[opacity,transform] duration-300",
          visible ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
        style={{ height: BAR_H }}
      >
        <ul className={`${containerClass} flex h-full items-center gap-2 overflow-x-auto`}>
          {productHero.anchors.map((a) => (
            <li key={a.id} className="shrink-0">
              <Link
                href={`#${a.id}`}
                aria-current={active === a.id ? "location" : undefined}
                className={clsx(
                  "inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors",
                  active === a.id ? "bg-cobalt-500 text-white" : "bg-surface text-fg hover:bg-canvas",
                )}
              >
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductNav;
