import { ReactNode } from "react";
import Link from "next/link";
import Menu, { type HeaderTone } from "@/components/elements/Menu";
import { Footer } from "@/components/elements/Footer";
import { Logo } from "@/components/elements/Logo";

/**
 * Page shell: skip link, header over the first section, <main>, footer.
 * `headerTone` matches the hero the page opens with.
 *
 * `variant="focus"` is for single-task pages (Request demo, W5): a plain
 * header with the logo and "Back to site" instead of the full nav, and
 * no footer, so the form is the only thing on the page.
 */
export default function Layout({
  children,
  headerTone = "onCobalt",
  variant = "site",
}: {
  children: ReactNode;
  headerTone?: HeaderTone;
  variant?: "site" | "focus";
}) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-50 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
      >
        Skip to content
      </a>
      {variant === "site" ? (
        <Menu tone={headerTone} />
      ) : (
        <header data-theme="cobalt" className="absolute inset-x-0 top-0 z-30">
          <div className="mx-auto flex h-[60px] max-w-[1440px] items-center px-5 md:h-20 md:px-10 xl:px-20">
            <Link href="/" aria-label="Strata home" className="rounded-md">
              <Logo tone="onCobalt" size={30} />
            </Link>
            <Link href="/" className="ml-auto rounded-sm text-[15px] font-medium text-fg hover:underline">
              ← Back to site
            </Link>
          </div>
        </header>
      )}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      {variant === "site" && <Footer />}
    </div>
  );
}
