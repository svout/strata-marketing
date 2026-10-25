import clsx from "clsx";
import type { ChipTone } from "@/types/home";

/**
 * Decision chip (Brand Guidelines → Graphic language): pill, tinted
 * background, dark text, a dot carrying the signal colour. The label
 * always says the outcome in words, so colour is never the only cue.
 *
 * Plain markup rather than MUI <Chip>: these are static labels, and MUI's
 * Chip adds focus/click behaviour we don't want here.
 */
const tone: Record<ChipTone, { chip: string; dot: string }> = {
  approve: { chip: "bg-approve-tint text-approve-fg", dot: "bg-approve" },
  review: { chip: "bg-review-tint text-review-fg", dot: "bg-review" },
  block: { chip: "bg-block-tint text-block-fg", dot: "bg-block" },
  recorded: { chip: "bg-recorded-tint text-recorded-fg", dot: "bg-brand" },
  neutral: { chip: "bg-surface text-fg-muted", dot: "bg-mist" },
};

export const outcomeLabel = { approve: "Approved", review: "Review", block: "Blocked", recorded: "Recorded" } as const;

type DecisionChipProps = {
  tone: ChipTone;
  children: React.ReactNode;
  dot?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function DecisionChip({ tone: t, children, dot = true, size = "sm", className }: DecisionChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
        size === "sm" ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-label",
        tone[t].chip,
        className,
      )}
    >
      {dot && <span aria-hidden className={clsx("size-[7px] shrink-0 rounded-full", tone[t].dot)} />}
      {children}
    </span>
  );
}

/** Just the signal dot, for rows that show the label elsewhere. */
export function SignalDot({ tone: t, className }: { tone: ChipTone; className?: string }) {
  return <span aria-hidden className={clsx("inline-block size-2 shrink-0 rounded-full", tone[t].dot, className)} />;
}

export default DecisionChip;
