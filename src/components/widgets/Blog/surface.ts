import type { BlogSeries } from "@/types/blog";
import type { HeaderTone } from "@/components/elements/Menu";

/**
 * One surface per series, as on the LinkedIn images: Build notes on ink,
 * Build log on paper, Milestone on cobalt. Everything that shows a post
 * (card, hero, header, social image) reads its look from here.
 */
type Look = {
  bg: string;
  theme?: "dark" | "cobalt";
  pattern: "ink" | "stone" | "cobalt";
  eyebrow: string;
  header: HeaderTone;
  border: string;
  /** Card hover: border tint, and the colour the corner pills light up in */
  hoverBorder: string;
  litPill: string;
};

export const surfaceLook: Record<BlogSeries["surface"], Look> = {
  // v2: Build notes and Build log both sit on dark cards, told apart by
  // the eyebrow; Milestones keep the cobalt card (rare, so it stands out).
  ink: {
    bg: "bg-surface-1",
    theme: "dark",
    pattern: "ink",
    eyebrow: "text-cobalt-light",
    header: "onInk",
    border: "border-transparent shadow-edge",
    hoverBorder: "hover:shadow-[inset_0_0_0_1px_rgba(114,158,255,0.45)] has-[a:focus-visible]:shadow-[inset_0_0_0_1px_rgba(114,158,255,0.45)]",
    litPill: "#2B59FF",
  },
  paper: {
    bg: "bg-surface-1",
    theme: "dark",
    pattern: "ink",
    eyebrow: "text-text-2",
    header: "onInk",
    border: "border-transparent shadow-edge",
    hoverBorder: "hover:shadow-[inset_0_0_0_1px_rgba(114,158,255,0.45)] has-[a:focus-visible]:shadow-[inset_0_0_0_1px_rgba(114,158,255,0.45)]",
    litPill: "#2B59FF",
  },
  cobalt: {
    bg: "bg-cobalt-500",
    theme: "cobalt",
    pattern: "cobalt",
    eyebrow: "text-cobalt-100",
    header: "onCobalt",
    border: "border-cobalt-400",
    hoverBorder: "hover:border-cobalt-200 has-[a:focus-visible]:border-cobalt-200",
    litPill: "#FFFFFF",
  },
};
