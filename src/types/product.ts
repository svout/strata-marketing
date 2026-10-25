/** Shared shapes for the Product page content (src/constraints/product.ts). */

export type LayerId = "mandate" | "risk" | "ledger";

export type ProductLayer = {
  id: LayerId;
  /** "01 · Mandate" style eyebrow */
  eyebrow: string;
  title: string;
  points: string[];
};

export type FaqItem = { question: string; answer: string };
