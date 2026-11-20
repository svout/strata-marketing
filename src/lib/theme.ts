import { createTheme } from "@mui/material/styles";
import { v2, radius } from "@/config/tokens";

/**
 * MUI theme, v2 (dark). MUI owns interactive components (Button, Tabs,
 * Drawer, Accordion) and their states and accessibility; Tailwind owns
 * layout and one-off styling.
 *
 * Button variants (v2 spec, all 40 px high, radius 8, Geist 14/500):
 * - white:   v2 "primary", white with dark text
 * - primary: v2 "accent", cobalt with white text (at most once a section)
 * - outline: v2 "ghost", surface-3 with a line-strong inset border
 * - ghost:   v2 "link", text with a grey › after it
 * - ink:     kept for v1 call sites; same as white on the dark page
 */
const v = (name: string) => `var(--color-${name})`;

const focusRing = { outline: `2px solid ${v("focus")}`, outlineOffset: 2 };

const white = {
  backgroundColor: "#FFFFFF",
  color: v2.bg,
  "&:hover": { backgroundColor: "#E6E8EB" },
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: v2.cobalt, dark: "#1A38BF", light: v2.cobaltLight, contrastText: "#FFFFFF" },
    secondary: { main: "#FFFFFF", contrastText: v2.bg },
    success: { main: v2.approved },
    warning: { main: v2.review },
    error: { main: v2.blocked },
    text: { primary: v2.text1, secondary: v2.text2 },
    background: { default: v2.bg, paper: v2.surface1 },
    divider: v2.line,
  },
  shape: { borderRadius: radius.md },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    button: { textTransform: "none", fontWeight: 500, letterSpacing: 0 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
      styleOverrides: { root: { "&.Mui-focusVisible": focusRing } },
    },
    MuiButton: {
      defaultProps: { variant: "white", size: "medium", disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radius.button,
          whiteSpace: "nowrap",
          boxShadow: "none",
          gap: 6,
          transition: "background-color .15s, box-shadow .15s, color .15s",
          "&.Mui-disabled": { opacity: 0.4 },
          variants: [
            {
              props: { variant: "primary" },
              style: {
                backgroundColor: v2.cobalt,
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#2249E8" },
                "&:active": { backgroundColor: "#1A38BF" },
              },
            },
            { props: { variant: "white" }, style: white },
            { props: { variant: "ink" }, style: white },
            {
              props: { variant: "outline" },
              style: {
                backgroundColor: v2.surface3,
                color: v2.text1,
                boxShadow: `inset 0 0 0 1px ${v2.lineStrong}`,
                "&:hover": { backgroundColor: "#24262B" },
              },
            },
            {
              props: { variant: "ghost" },
              style: {
                backgroundColor: "transparent",
                color: v2.text1,
                paddingLeft: 4,
                paddingRight: 4,
                "&::after": { content: '"›"', color: v2.text2, marginLeft: 2 },
                "&:hover": { backgroundColor: "transparent", color: "#FFFFFF" },
              },
            },
          ],
        },
        sizeLarge: { height: 40, padding: "0 16px", fontSize: 14 },
        sizeMedium: { height: 40, padding: "0 16px", fontSize: 14 },
        sizeSmall: { height: 34, padding: "0 14px", fontSize: 13 },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { color: "inherit", width: 40, height: 40, borderRadius: radius.button } },
    },
    MuiTabs: {
      styleOverrides: { root: { minHeight: 0 }, indicator: { display: "none" } },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 0,
          minWidth: 0,
          height: 24,
          padding: "0 8px",
          borderRadius: 6,
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          fontSize: 11,
          fontWeight: 400,
          color: v2.text2,
          backgroundColor: v2.surface3,
          "&.Mui-selected": { color: v2.text1, boxShadow: `inset 0 0 0 1px ${v2.lineStrong}` },
        },
      },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: true },
      styleOverrides: {
        root: {
          background: "transparent",
          color: "inherit",
          borderTop: `1px solid ${v("line")}`,
          "&::before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: { styleOverrides: { root: { padding: 0, minHeight: 52 } } },
    MuiAccordionDetails: { styleOverrides: { root: { padding: "0 0 16px" } } },
    MuiDrawer: {
      styleOverrides: {
        paper: { width: "min(100vw, 360px)", backgroundColor: v2.bg, backgroundImage: "none", color: v2.text1 },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
