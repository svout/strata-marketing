/**
 * The three checks (Mandate → Risk → Ledger). Feeds the SoftwareApplication
 * JSON-LD feature list on Home; the product pages that used the rest of
 * this copy were folded into the one-page Home.
 *
 * Same copy rules as Home: only claims that are true today, no invented
 * statistics. Text in [brackets] is for the owner to fill in.
 */
import type { ProductLayer } from "@/types/product";

export const productLayers: ProductLayer[] = [
  {
    id: "mandate",
    eyebrow: "01 · Mandate",
    title: "Rules each agent must follow.",
    points: [
      "Allowed merchants and categories",
      "Per-payment, daily and monthly caps",
      "Time windows and currencies",
      "Automatic review above a threshold",
    ],
  },
  {
    id: "risk",
    eyebrow: "02 · Risk",
    title: "A second opinion on every payment.",
    points: [
      "Scores each attempt against the agent's normal behaviour",
      "Shows the top reasons behind the score",
      "Unusual payments wait for a person to decide",
      "[Add any real model detail you want to share]",
    ],
  },
  {
    id: "ledger",
    eyebrow: "03 · Ledger",
    title: "A record nobody can quietly edit.",
    points: [
      "Every attempt, decision and override is written down",
      "Each entry is chained to the one before it",
      "Verify the chain and export it at any time",
    ],
  },
];
