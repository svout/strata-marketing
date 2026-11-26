"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { headerNav } from "@/config/navigation";
import { Logo } from "../Logo";
import { Icons } from "@/components/icons";
import { useHeroProgress } from "@/hooks/useHeroProgress";
import { btn } from "@/lib/ui";

/**
 * Site header, v2 (spec W1 → Nav).
 *
 * At the top of a page it sits inside the hero's dark container: 72 px
 * high, 72 px down (56 on phones) and 16 px in from both sides, so it
 * reads as the top of that container. As the page scrolls it moves with
 * the container's top edge while the container fills the frame, widening
 * to full width and fading in an rgba(8,9,10,.8) background, 12 px blur
 * and a bottom line (.site-header + useHeroProgress, scope360-style).
 *
 * Desktop: logo · centred links (text-2, 14 px, 32 px apart) · Log in
 * (link) + Get started (white). Below 900 px the links collapse into a
 * menu button that opens an MUI Drawer (focus trap, Escape, focus return).
 *
 * `focus` (Request demo): logo and "Back to site" only.
 */
export type HeaderTone = "onCobalt" | "onInk" | "light";

const currentFor = (pathname: string, href?: string) =>
  !href || href.includes("#")
    ? undefined
    : pathname === href
      ? ("page" as const)
      : pathname.startsWith(`${href}/`)
        ? ("true" as const)
        : undefined;

const Menu = ({ variant = "site" }: { variant?: "site" | "focus"; tone?: HeaderTone }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useHeroProgress();

  return (
    <header
      className="site-header fixed z-30"
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-10 px-4 md:h-[72px] md:px-8">
        <Link href="/" aria-label="Strata home" className="rounded-md">
          <Logo tone="dark" size={26} />
        </Link>

        {variant === "focus" ? (
          <Link href="/" className={btn("link", "ml-auto")}>
            ← Back to site
          </Link>
        ) : (
          <>
            <nav aria-label="Main" className="mx-auto hidden min-[900px]:block">
              <ul className="flex gap-8 text-[14px]">
                {headerNav.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={currentFor(pathname, link.href)}
                      className="rounded-sm text-text-2 transition-colors hover:text-text-1 [&[aria-current]]:text-text-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto hidden items-center gap-2 min-[900px]:ml-0 min-[900px]:flex">
              {headerNav.logIn && (
                <a href={headerNav.logIn.href} className={btn("link", "h-9")}>
                  {headerNav.logIn.label}
                </a>
              )}
              <Link href={headerNav.cta.href} className={btn("primary", "h-9")}>
                {headerNav.cta.label}
              </Link>
            </div>

            <IconButton
              className="-mr-2 ml-auto text-text-1 min-[900px]:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Icons.Menu size={22} />
            </IconButton>
          </>
        )}
      </div>

      {variant === "site" && (
        <Drawer
          id="mobile-menu"
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{ paper: { "aria-label": "Menu" } }}
        >
          <div className="flex h-full flex-col px-5 pb-8">
            <div className="flex h-16 items-center justify-between">
              <Logo tone="dark" size={26} />
              <IconButton className="-mr-2" aria-label="Close menu" onClick={() => setOpen(false)}>
                <Icons.Close size={22} />
              </IconButton>
            </div>
            <nav aria-label="Main" className="mt-4">
              <ul className="flex flex-col">
                {headerNav.links.map((link) => (
                  <li key={link.label} className="border-t border-line">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={currentFor(pathname, link.href)}
                      className="flex h-14 items-center text-[22px] font-semibold tracking-[-0.03em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {headerNav.logIn && (
                  <li className="border-t border-line">
                    <a href={headerNav.logIn.href} className="flex h-14 items-center text-[22px] font-semibold tracking-[-0.03em]">
                      {headerNav.logIn.label}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
            <Link href={headerNav.cta.href} onClick={() => setOpen(false)} className={btn("primary", "mt-auto w-full")}>
              {headerNav.cta.label}
            </Link>
          </div>
        </Drawer>
      )}
    </header>
  );
};

export default Menu;
