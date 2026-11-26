import { COMPANY, isFilled } from "@/config/company";
import { AUTHOR } from "@/config/blog";

/**
 * Site navigation (Website v2 spec → W1 nav and W9 footer).
 *
 * Header: Product · How it works · Developers · FAQ · Pricing. All five
 * are sections of the one-page Home; Security, Blog and Demo are pages.
 * A link with no `href` has no destination yet: it renders as plain text,
 * so nobody lands on a dead "#" link.
 */
export type NavLink = { label: string; href?: string };

export const headerNav = {
  links: [
    { label: "Product", href: "/#product" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Developers", href: "/#developers" },
    { label: "FAQ", href: "/#faq" },
    { label: "Pricing", href: "/#pricing" },
  ] satisfies NavLink[],
  /** Shown once the console URL is filled in config/company.ts */
  logIn: isFilled(COMPANY.appUrl) ? { label: "Log in", href: COMPANY.appUrl } : null,
  cta: { label: "Get started", href: "/#pricing" },
};

const filled = (url: string) => (isFilled(url) ? url : undefined);

export const footerNav = {
  tagline: "Spending controls for AI agents.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Mandates", href: "/#product" },
        { label: "Risk scoring", href: "/#how-it-works" },
        { label: "Human review", href: "/#review" },
        { label: "Ledger", href: "/#product" },
        { label: "Security", href: "/security" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Quickstart", href: "/#developers" },
        { label: "Docs" /* [docs URL] */ },
        { label: "API reference" /* [API reference URL] */ },
        { label: "Status" /* [status page URL] */ },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About" /* [about page] */ },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/demo" },
        { label: "Design partners", href: "/demo" },
      ],
    },
    {
      title: "Join us",
      links: [
        { label: "LinkedIn", href: filled(AUTHOR.linkedin) },
        { label: "X", href: filled(AUTHOR.x) },
        { label: "GitHub" /* [GitHub URL] */ },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
  copyright: "© 2026 Strata · All rights reserved",
  legal: [{ label: "Terms" /* [terms] */ }, { label: "Privacy" /* [privacy policy] */ }] satisfies NavLink[],
  locale: "United Kingdom (English)",
};
