import { ImageResponse } from "next/og";
import { primitives } from "@/config/tokens";

/**
 * Social card (1200×630) for a route's opengraph-image.tsx: cobalt
 * ground, the mark, an eyebrow and the page headline with an ink accent.
 * Uses next/og's built-in font; next/font files can't be passed in here.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const { cobalt, ink, white } = primitives;

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
    <div style={{ position: "relative", display: "flex", width: size, height: size, borderRadius: 12.5 * u, background: ink }}>
      <div style={pill(18, 7)} />
      <div style={pill(12, 19.5)} />
      <div style={pill(6, 32)} />
    </div>
  );
}

export function ogImage({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: cobalt[500],
          color: white,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark size={64} />
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>Strata</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: cobalt[700],
              fontSize: 26,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -3 }}>
            <span>{title}</span>
            {accent && <span style={{ color: ink }}>{accent}</span>}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
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
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: cobalt[500] }}>
        <div style={pill(18, 7)} />
        <div style={pill(12, 19.5)} />
        <div style={pill(6, 32)} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
