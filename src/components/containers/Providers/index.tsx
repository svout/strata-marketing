"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/lib/theme";

/**
 * MUI setup for the App Router.
 * - AppRouterCacheProvider collects Emotion styles during server render.
 * - enableCssLayer puts them in `@layer mui`, which globals.css orders
 *   before Tailwind's utilities, so a className always wins over MUI's
 *   defaults without !important.
 * No CssBaseline: Tailwind's preflight is the reset.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
