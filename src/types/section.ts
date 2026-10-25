import { ReactNode } from "react";

/** Section background. Each tone sets data-theme so tokens flip inside. */
/** ink2 = raised ink (#14161C), alternating with ink on dark pages */
export type SectionTone = "white" | "paper" | "stone" | "ink" | "ink2" | "cobalt";

export interface SectionInterface {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  /** id of the section's heading, for aria-labelledby */
  labelledBy?: string;
  /** Default vertical padding (64 mobile → 128 desktop). Off for heroes. */
  usePaddings?: boolean;
  /** Wrap children in the 1280 px content container */
  contained?: boolean;
  className?: string;
  innerClassName?: string;
}
