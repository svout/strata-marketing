import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { primitives, v2 } from "@/config/tokens";

/**
 * Social cards (1200×630), v2: the cobalt pattern frames a dark rounded
 * container (spec §3 → OG image), with the logo, an eyebrow and the
 * headline in Geist, two-tone. Blog posts use the same frame with their
 * series eyebrow, headline and supporting line.
 *
 * Fonts come from the @fontsource packages (next/og needs raw .woff
 * data). Images are rendered at build time, so the files are read once.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const font = (pkg: string, file: string) =>
  fs.readFileSync(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

type Weight = 400 | 500 | 600 | 700;
type OgFont = { name: string; data: Buffer; weight: Weight; style: "normal" };
let cache: OgFont[] | null = null;
function fonts(): OgFont[] {
  cache ??= [
    ...([400, 500, 700] as const).map((weight) => ({
      name: "Geist",
      data: font("geist-sans", `geist-sans-latin-${weight}-normal.woff`),
      weight,
      style: "normal" as const,
    })),
    { name: "Geist Mono", data: font("geist-mono", "geist-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
    {
      name: "Instrument Sans",
      data: font("instrument-sans", "instrument-sans-latin-600-normal.woff"),
      weight: 600,
      style: "normal",
    },
  ];
  return cache;
}

const { white } = primitives;

/** The pattern: 96 px tile, three pills per tile, drawn as divs (next/og has no SVG patterns) */
function Pattern() {
  const pills: { x: number; y: number }[] = [];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 13; c++) for (const [dx, dy] of [[36, 14], [24, 39], [12, 64]]) pills.push({ x: c * 96 + dx, y: r * 96 + dy });
  const lit = new Set(["132,14", "324,39", "1092,14"]);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", background: "#2B59FF" }}>
      {pills.map((p) => (
        <div
          key={`${p.x},${p.y}`}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: 48,
            height: 18,
            borderRadius: 9,
            background: lit.has(`${p.x},${p.y}`) ? white : "#4169FF",
          }}
        />
      ))}
    </div>
  );
}

function Mark({ size }: { size: number }) {
  const u = size / 48;
  const pill = (x: number, y: number) => ({
    position: "absolute" as const,
    left: (7.68 + x * 0.68) * u,
    top: (7.68 + y * 0.68) * u,
    width: 24 * 0.68 * u,
    height: 9 * 0.68 * u,
    borderRadius: 4.5 * 0.68 * u,
    background: white,
  });
  return (
    <div style={{ position: "relative", display: "flex", width: size, height: size, borderRadius: 12.5 * u, background: v2.cobalt }}>
      <div style={pill(18, 7)} />
      <div style={pill(12, 19.5)} />
      <div style={pill(6, 32)} />
    </div>
  );
}

/** Frame + dark container with the logo; `children` fill the container below the logo */
function Frame({ children, footer }: { children: React.ReactNode; footer?: string }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", fontFamily: "Geist" }}>
      <Pattern />
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 64,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px 56px",
          borderRadius: "28px 28px 0 0",
          background: v2.bg,
          color: v2.text1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Mark size={44} />
            <div style={{ fontFamily: "Instrument Sans", fontSize: 36, fontWeight: 600, letterSpacing: -1.8 }}>strata</div>
          </div>
          {footer && <div style={{ fontFamily: "Geist Mono", fontSize: 20, color: v2.text2 }}>{footer}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Headline({ title, accent, size = 72 }: { title: string; accent?: string; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: -size * 0.05 }}>
      <span>{title}</span>
      {accent && <span style={{ color: v2.text2 }}>{accent}</span>}
    </div>
  );
}

/** A page's social card: eyebrow, then the two-tone headline */
export function ogImage({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 2, color: v2.cobaltLight, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <Headline title={title} accent={accent} />
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: fonts() },
  );
}

/** 180×180 home-screen icon: the favicon mark on cobalt, no rounded corners (iOS masks it). */
export function appleIcon() {
  const pill = (x: number, y: number) => ({
    position: "absolute" as const,
    left: 28.8 + x * 2.55,
    top: 28.8 + y * 2.55,
    width: 24 * 2.55,
    height: 9 * 2.55,
    borderRadius: 4.5 * 2.55,
    background: white,
  });
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: v2.cobalt }}>
        <div style={pill(18, 7)} />
        <div style={pill(12, 19.5)} />
        <div style={pill(6, 32)} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}

/**
 * A blog post's social card: the same frame, with the series eyebrow
 * (as on the LinkedIn image), the headline and the supporting line.
 */
export function postOgImage({
  eyebrow,
  title,
  accent,
  summary,
  author,
}: {
  surface?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  summary: string;
  author: string;
}) {
  return new ImageResponse(
    (
      <Frame footer={author}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 2, color: v2.cobaltLight }}>{eyebrow}</div>
          <Headline title={title} accent={accent} size={62} />
          <div style={{ fontSize: 26, lineHeight: 1.35, color: v2.text2, maxWidth: 940 }}>{summary}</div>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: fonts() },
  );
}
