import clsx from "clsx";

/**
 * v2 button classes, for links and buttons that aren't MUI Buttons.
 * All 40 px high, radius 8, 16 px side padding, Geist 14/500.
 *
 * - primary: white with dark text
 * - accent:  cobalt with white text (at most once per section)
 * - ghost:   surface-3 with a line-strong inset border
 * - link:    text-1 followed by a grey › (add <LinkArrow /> or use `btnLink`)
 */
export type BtnVariant = "primary" | "accent" | "ghost" | "link";

const base =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-button text-[14px] font-medium leading-none transition-colors";

const variants: Record<BtnVariant, string> = {
  primary: "bg-white px-4 text-bg hover:bg-[#E6E8EB]",
  accent: "bg-cobalt px-4 text-white hover:bg-cobalt-600",
  ghost: "bg-surface-3 px-4 text-text-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:bg-[#24262B]",
  link: "px-1 text-text-1 hover:text-white",
};

export function btn(variant: BtnVariant = "primary", className?: string, size: "md" | "sm" = "md") {
  return clsx(base, variants[variant], size === "sm" && "h-[34px] text-[13px]", className);
}
