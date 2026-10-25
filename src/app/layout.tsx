import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Providers from "@/components/containers/Providers";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/jsonLd";
import { COMPANY, isFilled } from "@/config/company";
import { IS_INDEXABLE, SITE_URL } from "@/config/site";
import "./globals.css";

// Brand Guidelines → Typography: Instrument Sans 400/500/600, Plex Mono for data
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
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
  themeColor: "#2B59FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${instrumentSans.variable} ${plexMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
