"use client";

import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Logo } from "../Logo";
import { Icons } from "@/components/icons";
import { footer } from "@/constraints/home";
import { COMPANY } from "@/config/company";

/**
 * Footer: every page + legal. Desktop: brand column + three link
 * columns. Mobile (W6): the columns collapse into MUI Accordions.
 */
export const Footer = () => {
  return (
    <footer data-theme="dark" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16 xl:px-20">
        <div className="grid gap-10 md:grid-cols-[2fr_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="flex flex-col gap-3.5">
            <Logo tone="dark" size={30} />
            <p className="text-body-md text-fg-muted">{COMPANY.tagline}</p>
          </div>

          {/* Desktop columns */}
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="hidden md:block">
              <h2 className="mb-3 text-body-md font-semibold">{col.title}</h2>
              <ul className="flex flex-col gap-2.5 text-body-md text-[#C9CBD1]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="rounded-sm hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Mobile accordion */}
          <div className="border-b border-line md:hidden">
            {footer.columns.map((col) => (
              <Accordion key={col.title}>
                <AccordionSummary expandIcon={<Icons.ChevronDown size={20} className="text-fg-muted" />} className="text-fg">
                  <span className="text-[15px] font-semibold">{col.title}</span>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="flex flex-col gap-3 text-[15px] text-[#C9CBD1]">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>

        <p className="mt-12 font-mono text-xs text-fg-muted">{footer.legal}</p>
      </div>
    </footer>
  );
};

export default Footer;
