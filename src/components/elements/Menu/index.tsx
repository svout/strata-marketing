"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { config } from "./_menu.config";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Icons } from "@/components/icons";
import { useScrolled } from "@/hooks/useScrolled";

/**
 * Site header, fixed to the top of the viewport.
 * At the top of the page it is transparent and takes the hero's tone:
 * `onCobalt` (Home, Product, Demo), `onInk` (Developers) or `light`
 * (Security). Once the page scrolls it fades to a white bar with ink
 * text, a hairline and a soft shadow, and extra vertical padding
 * (72 px mobile, 84 px desktop).
 * The logo cross-fades between the hero's version and the light one.
 * Desktop: logo · nav · Sign in (ghost) + Request demo (pill).
 * Below md: logo + menu button opening an MUI Drawer, which handles the
 * focus trap, Escape and returning focus to the button.
 */
export type HeaderTone = "onCobalt" | "onInk" | "light";
type MenuProps = { tone?: HeaderTone };

// Section theme and logo version while the header sits on the hero
const topLook: Record<HeaderTone, { theme?: string; logo: "onCobalt" | "dark" | "light" }> = {
  onCobalt: { theme: "cobalt", logo: "onCobalt" },
  onInk: { theme: "dark", logo: "dark" },
  light: { logo: "light" },
};

const Menu = ({ tone = "onCobalt" }: MenuProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  // The hero's look applies only until the header turns white
  const top = topLook[tone];
  const onHero = !scrolled;
  const onCobalt = tone === "onCobalt" && onHero;

  return (
    <header
      data-theme={onHero ? top.theme : undefined}
      className={clsx(
        "fixed inset-x-0 top-0 z-30 border-b transition-[background-color,border-color,box-shadow,color] duration-300 ease-out",
        scrolled
          ? "border-line bg-elevated/90 shadow-[0_8px_20px_rgb(11_13_18/0.06)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-[1440px] items-center gap-10 px-5 transition-[height] duration-300 ease-out md:px-10 xl:px-20",
          // Scrolled bar gets extra vertical padding so it doesn't feel cramped
          scrolled ? "h-[72px] md:h-[84px]" : "h-[60px] md:h-20",
        )}
      >
        <Link href="/" aria-label="Strata home" className="relative rounded-md">
          {/* Both logo versions stacked; the opacity swap is the animation */}
          <Logo
            tone={top.logo}
            size={30}
            className={clsx("transition-opacity duration-300", onHero ? "opacity-100" : "opacity-0")}
          />
          <Logo
            tone="light"
            size={30}
            className={clsx(
              "absolute left-0 top-0 transition-opacity duration-300",
              onHero ? "opacity-0" : "opacity-100",
            )}
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-7 text-[15px] font-medium">
            {config.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="rounded-sm text-fg underline-offset-4 transition-colors duration-300 hover:underline aria-[current=page]:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <Button variant="ghost" href={config.signIn.href} size="medium" className="text-[15px] font-medium transition-colors duration-300">
            {config.signIn.label}
          </Button>
          <Button
            variant={onCobalt ? "white" : "primary"}
            href={config.cta.href}
            size="medium"
            className="h-[42px] px-5 transition-colors duration-300"
          >
            {config.cta.label}
          </Button>
        </div>

        <IconButton
          className="-mr-2.5 ml-auto text-fg transition-colors duration-300 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Icons.Menu size={22} />
        </IconButton>
      </div>

      <Drawer
        id="mobile-menu"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { className: "bg-cobalt-500 text-white", "aria-label": "Menu" } }}
      >
        <div data-theme="cobalt" className="flex h-full flex-col px-5 pb-8">
          <div className="flex h-[60px] items-center justify-between">
            <Logo tone="onCobalt" size={28} />
            <IconButton className="-mr-2.5" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icons.Close size={22} />
            </IconButton>
          </div>
          <nav aria-label="Main" className="mt-6">
            <ul className="flex flex-col">
              {config.links.map((link) => (
                <li key={link.href} className="border-t border-white/20">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={clsx("flex h-14 items-center text-2xl font-semibold tracking-[-0.02em]")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-white/20">
                <a href={config.signIn.href} className="flex h-14 items-center text-2xl font-semibold tracking-[-0.02em]">
                  {config.signIn.label}
                </a>
              </li>
            </ul>
          </nav>
          <Button variant="white" size="large" href={config.cta.href} className="mt-auto h-[52px]" fullWidth onClick={() => setOpen(false)}>
            {config.cta.label}
          </Button>
        </div>
      </Drawer>
    </header>
  );
};

export default Menu;
