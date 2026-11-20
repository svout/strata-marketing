/**
 * Strata design tokens for TypeScript (MUI palette, SVG fills, social
 * images). Mirrors src/app/globals.css; source of truth is
 * docs/design/website-v2/tokens and the project doc "Design System v2".
 * Change both files together.
 */

/** v2 (dark) palette */
export const v2 = {
  bg: "#08090A",
  surface1: "#0E0F11",
  surface2: "#141518",
  surface3: "#1C1D21",
  line: "#1F2125",
  lineStrong: "#2A2C31",
  text1: "#F7F8F8",
  text2: "#8A8F98",
  /** Spec #62666D lifted to pass 4.5:1 (see globals.css) */
  text3: "#7C8089",
  cobalt: "#2B59FF",
  cobaltLight: "#729EFF",
  cobaltPale: "#A1BBFF",
  approved: "#56B683",
  review: "#FFCC00",
  blocked: "#F18169",
} as const;

export const primitives = {
  cobalt: {
    50: "#F0F3FF",
    100: "#DCE4FF",
    200: "#B9C8FF",
    300: "#8FA6FF",
    400: "#5E80FF",
    500: "#2B59FF",
    600: "#2249E8",
    700: "#1A38BF",
    900: "#0F1F66",
  },
  ink: "#08090A",
  white: "#FFFFFF",
  graphite: "#1C1D21",
  slate: "#8A8F98",
  mist: "#8A8F98",
  line: "#1F2125",
  amber: "#FFCC00",
  mint: "#56B683",
} as const;

/** Semantic tokens, mapped onto v2 */
export const semantic = {
  bgCanvas: v2.bg,
  bgSurface: v2.surface1,
  bgElevated: v2.surface2,
  borderDefault: v2.line,
  textPrimary: v2.text1,
  textSecondary: v2.text2,
  brandPrimary: v2.cobalt,
  brandPrimaryHover: "#2249E8",
  signalApprove: v2.approved,
  signalReview: v2.review,
  signalBlock: v2.blocked,
} as const;

/** Shifted-pill pattern colours: base + pill (base +~8% lightness). */
export const patternColours = {
  cobalt: { base: "#2B59FF", pill: "#4169FF" },
  ink: { base: "#08090A", pill: "#161B2E" },
  /** v1 light pattern; in v2 it renders as the ink pattern */
  stone: { base: "#08090A", pill: "#161B2E" },
} as const;

/** Lit-pill colours and what they mean (PatternSystem board). */
export const litColours = {
  white: "#FFFFFF", // payment in flight (on cobalt)
  amber: "#FFCC00", // sent to review, max 1
  ink: "#08090A", // blocked, max 1
  cobalt: "#2B59FF", // active / checked (on ink)
  mint: "#56B683", // 200 OK, developer pages only
} as const;

export const radius = { button: 8, sm: 8, md: 14, lg: 20, pill: 999 } as const;
