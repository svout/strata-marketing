import Link from "next/link";
import { Logo } from "../Logo";
import { footerNav, type NavLink } from "@/config/navigation";

/**
 * Footer, v2 (spec W9 → Footer). On bg with a cobalt radial glow at the
 * bottom. Grid: 1.6fr brand column + four link columns; two columns on
 * phones. A link without a destination yet renders as plain text.
 */
function FooterLink({ link }: { link: NavLink }) {
  if (!link.href) return <span className="text-text-3">{link.label}</span>;
  const external = /^https?:\/\//.test(link.href);
  return external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-sm text-text-2 transition-colors hover:text-text-1">
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={link.href} className="rounded-sm text-text-2 transition-colors hover:text-text-1">
      {link.label}
    </Link>
  );
}

export const Footer = () => (
  <footer className="relative overflow-hidden bg-bg">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(43,89,255,0.35),transparent_70%)]"
    />
    <div className="relative mx-auto max-w-[1240px] px-5 pb-8 pt-16 md:pt-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))] md:gap-8">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
          <Logo tone="dark" size={48} />
          <p className="text-[15px] text-text-2">{footerNav.tagline}</p>
        </div>
        {footerNav.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="plain mb-4 text-[14px] font-medium text-text-1">{col.title}</h2>
            <ul className="flex flex-col gap-3 text-[14px]">
              {col.links.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-text-3 md:mt-[200px] md:flex-row md:items-center md:justify-between">
        <p>{footerNav.copyright}</p>
        <p className="flex flex-wrap items-center gap-x-1.5">
          {footerNav.legal.map((l) => (
            <span key={l.label} className="flex items-center gap-x-1.5">
              <FooterLink link={l} />
              <span aria-hidden>·</span>
            </span>
          ))}
          <span>{footerNav.locale}</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
