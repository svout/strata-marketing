import { PatternFrame } from "@/components/elements/PatternFrame";
import { Btn, GlowTile, Mark, TwoTone } from "@/components/elements/V2";

/**
 * Closing CTA band, v2 (spec W9): the cobalt pattern frames a dark
 * container (radius 24, 16 px side insets, 72 px down) holding a glow
 * tile with the cobalt-light mark, a two-tone heading and two buttons.
 * Used at the end of every page with that page's own copy.
 */
type Action = { label: string; href: string };

export default function ClosingBand({
  id,
  title,
  primary,
  secondary,
}: {
  id: string;
  title: [string, string];
  primary: Action;
  secondary?: Action;
}) {
  return (
    <PatternFrame id={`${id}-pattern`} variant="band" labelledBy={id}>
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-8 px-5 py-16 text-center md:min-h-[420px]">
        <GlowTile size={56} gradient="linear-gradient(180deg,#23252B,#141518)">
          <Mark size={30} fill="#729EFF" />
        </GlowTile>
        <TwoTone id={id} lines={title} size="cta" />
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Btn href={primary.href}>{primary.label}</Btn>
          {secondary && (
            <Btn href={secondary.href} variant="link">
              {secondary.label}
            </Btn>
          )}
        </div>
      </div>
    </PatternFrame>
  );
}
