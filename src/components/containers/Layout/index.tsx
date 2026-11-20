import { ReactNode } from "react";
import Menu, { type HeaderTone } from "@/components/elements/Menu";
import { Footer } from "@/components/elements/Footer";

/**
 * Page shell (v2): skip link, the fixed header, <main>, footer.
 * Every page opens with a PatternFrame hero, so the header sits inside
 * the hero's dark container until the page scrolls.
 *
 * `variant="focus"` is for single-task pages (Request demo): the header
 * shows only the logo and "Back to site", and there is no footer.
 * `headerTone` is kept for v1 call sites; v2 has one header look.
 */
export default function Layout({
  children,
  variant = "site",
}: {
  children: ReactNode;
  headerTone?: HeaderTone;
  variant?: "site" | "focus";
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg">
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-50 rounded-button bg-white px-4 py-2.5 text-sm font-medium text-bg"
      >
        Skip to content
      </a>
      <Menu variant={variant} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      {variant === "site" && <Footer />}
    </div>
  );
}
