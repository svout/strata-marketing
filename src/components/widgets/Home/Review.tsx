import clsx from "clsx";
import { Btn, GlowTile, Lede, Mark, TwoTone, v2Container } from "@/components/elements/V2";
import { Reveal } from "@/components/elements/V2/client";
import { Visual } from "@/components/elements/Visual";
import { review } from "@/constraints/home";
import type { VisualSource } from "@/lib/visuals";

/**
 * W4 · Review. Approval as a conversation, as an animated SVG
 * (src/visuals/review-chat.svg, and review-chat-mobile.svg on phones).
 * When it scrolls into view the three messages arrive one by one, each
 * after a short typing indicator; the timing is CSS inside the SVG. The
 * panel is drawn at its full size from the start, so it never changes
 * height. Reduced motion: all three messages shown at once.
 */
export default function Review({ chat, chatMobile }: { chat: VisualSource; chatMobile: VisualSource }) {
  return (
    <section id="review" aria-labelledby="review-title" className="relative overflow-hidden bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,#111A3D,rgba(17,26,61,0))]" />
      <div className={clsx(v2Container, "relative pb-20 pt-20 md:pb-[110px] md:pt-[120px]")}>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <GlowTile>
            <Mark size={40} />
          </GlowTile>
          <TwoTone id="review-title" lines={review.title} size="h2-lg" className="mt-2" />
          <Lede className="max-w-[520px]">{review.lede}</Lede>
          <Btn href={review.cta.href}>{review.cta.label}</Btn>
        </Reveal>

        <div className="mx-auto mt-10 max-w-[1120px]">
          <Visual source={chat} className="hidden md:block" />
          <Visual source={chatMobile} className="mx-auto max-w-[420px] md:hidden" />
        </div>
      </div>
    </section>
  );
}
