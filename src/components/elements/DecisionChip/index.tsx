import clsx from "clsx";
import type { ChipTone } from "@/types/home";

/**
 * Decision chip, v2: radius 6, tinted background, signal-colour text and
 * dot (Design System v2 → chips). The label
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
  neutral: { chip: "bg-neutral-bg text-text-2", dot: "bg-text-2" },
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
        "inline-flex items-center gap-1.5 rounded-chip font-medium whitespace-nowrap",
        size === "sm" ? "h-[22px] px-2 text-[12px]" : "px-3 py-1.5 text-[13px]",
        tone[t].chip,
        className,
      )}
    >
      {dot && <span aria-hidden className={clsx("size-1.5 shrink-0 rounded-full", tone[t].dot)} />}
      {children}
    </span>
  );
}

/** Just the signal dot, for rows that show the label elsewhere. */
export function SignalDot({ tone: t, className }: { tone: ChipTone; className?: string }) {
  return <span aria-hidden className={clsx("inline-block size-2 shrink-0 rounded-full", tone[t].dot, className)} />;
}

export default DecisionChip;
