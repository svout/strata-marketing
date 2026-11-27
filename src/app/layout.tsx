import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/containers/Providers";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/jsonLd";
import { COMPANY, isFilled } from "@/config/company";
import { IS_INDEXABLE, SITE_URL } from "@/config/site";
import "./globals.css";

// Design System v2 → Type: Geist for everything, Geist Mono for data and
// code, Instrument Sans 600 only for the "strata" wordmark.
// All three are self-hosted (the `geist` package and @fontsource), so the
// build never fetches Google Fonts. next/font/google + Turbopack fails on
// Geist's Google URL ("queries have exactly one entry").
const wordmark = localFont({
  src: "../../node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-instrument-sans",
  display: "swap",
});

const title = `${COMPANY.name}: spending controls for AI agent payments`;

/**
 * Site-wide defaults. Pages override title, description, canonical and
 * social tags through lib/seo `pageMetadata`; images come from each
 * route's opengraph-image.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${COMPANY.name}` },
  description: COMPANY.seoDescription,
  applicationName: COMPANY.name,
  ...(isFilled(COMPANY.legalName) && { publisher: COMPANY.legalName }),
  formatDetection: { telephone: false, email: false, address: false },
  robots: IS_INDEXABLE
    ? { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "en_GB",
    title,
    description: COMPANY.seoDescription,
  },
  twitter: { card: "summary_large_image", title, description: COMPANY.seoDescription },
  // [Search Console]: add `verification: { google: "…" }` or verify by DNS
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable} ${wordmark.variable}`}>
      <body>
        {/* Without JavaScript nothing marks the animated SVGs as seen, so let them play */}
        <noscript>
          <style>{".visual-paused .v-a,.visual-paused .v-dot{animation-play-state:running}"}</style>
        </noscript>
        <Providers>{children}</Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
