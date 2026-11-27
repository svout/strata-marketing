import fs from "node:fs";
import path from "node:path";

/**
 * Animated SVG visuals (src/visuals/*.svg), read at build time and placed
 * inline by <Visual>, so they use the page's Geist fonts, can wait until
 * they scroll into view and follow reduced motion. Server-only (uses fs):
 * load them in server components (e.g. app/page.tsx) and pass them down.
 *
 * Edit the .svg files directly (Figma, Illustrator or a text editor): text
 * is live, animations are CSS in each file's <style>.
 */
export type VisualSource = { svg: string; label: string };

const dir = path.join(process.cwd(), "src/visuals");

export function loadVisual(name: string): VisualSource {
  const raw = fs.readFileSync(path.join(dir, `${name}.svg`), "utf8");
  const svg = raw.replace(/<\?xml[^>]*>\s*/, "").replace(/<!--[\s\S]*?-->\s*/g, "");
  const title = /<title>([\s\S]*?)<\/title>/.exec(svg)?.[1] ?? "";
  const label = title
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
  return { svg, label };
}

export function loadVisuals<K extends string>(names: Record<K, string>): Record<K, VisualSource> {
  return Object.fromEntries(Object.entries(names).map(([k, file]) => [k, loadVisual(file as string)])) as Record<K, VisualSource>;
}
