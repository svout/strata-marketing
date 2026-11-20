import Link from "next/link";
import clsx from "clsx";
import { BLOG_SERIES } from "@/config/blog";
import { patternColours } from "@/config/tokens";
import { formatDate } from "@/lib/blog-format";
import type { BlogPostMeta } from "@/types/blog";
import { Icons } from "@/components/icons";
import { surfaceLook } from "./surface";

/**
 * A post card that looks like its LinkedIn image: the series surface,
 * the mono eyebrow, the headline, the supporting line. The whole card
 * is one link (the title), with the rest of the card as its hit area.
 *
 * Hover / keyboard focus: no lift or shadow. The card answers in the
 * brand's own language instead: the three pills in the corner tile (the
 * Strata mark) light up one after another, the border takes a cobalt
 * tint and the "Read post" arrow steps forward.
 */

// The corner tile's three pills (the Strata mark), lit top to bottom
const LIT = [
  { x: -40, y: 9, delay: 0 },
  { x: -48, y: 26, delay: 90 },
  { x: -56, y: 43, delay: 180 },
];

// Grid moved in from the corner so the lit mark clears the card's rounded corner
const INSET = "translate(-20 10)";

function CornerPattern({ fill, lit, id }: { fill: string; lit: string; id: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[60%]" focusable="false">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <rect x="24" y="9" width="32" height="12" rx="6" fill={fill} />
          <rect x="16" y="26" width="32" height="12" rx="6" fill={fill} />
          <rect x="8" y="43" width="32" height="12" rx="6" fill={fill} />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        {/* Nested svg at the right edge: the grid starts there, so the lit pills sit on it at any width */}
        <svg x="100%" overflow="visible">
          <g transform={INSET}>
            <rect x={-2000} y={-64} width={2000} height={2000} fill={`url(#${id})`} />
          </g>
        </svg>
      </g>
      <svg x="100%" overflow="visible">
        <g transform={INSET}>
          {LIT.map((p) => (
            <rect
              key={p.x}
              x={p.x}
              y={p.y}
              width="32"
              height="12"
              rx="6"
              fill={lit}
              className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100"
              style={{ transitionDelay: `${p.delay}ms` }}
            />
          ))}
        </g>
      </svg>
    </svg>
  );
}

type BlogCardProps = {
  post: BlogPostMeta;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
};

export function BlogCard({ post, featured = false, headingLevel: H = "h3" }: BlogCardProps) {
  const series = BLOG_SERIES[post.series];
  const look = surfaceLook[series.surface];
  return (
    <article
      data-theme={look.theme}
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-panel-lg border p-6 transition-colors duration-300",
        // Focus ring on the whole card when its link has keyboard focus
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-focus",
        look.bg,
        look.border,
        look.hoverBorder,
        featured ? "md:p-10 lg:min-h-[380px]" : "md:p-8",
      )}
    >
      <CornerPattern fill={patternColours[look.pattern].pill} lit={look.litPill} id={`card-${post.slug}`} />
      <div className="relative flex flex-1 flex-col gap-4">
        <p className={clsx("font-mono text-overline uppercase tracking-[0.1em] md:text-label md:font-medium", look.eyebrow)}>
          {post.eyebrow}
          {post.status === "draft" && <span className="ml-2 rounded-full bg-review-tint px-2 py-0.5 text-review-fg">Draft</span>}
        </p>
        <H
          className={clsx(
            "text-balance font-semibold tracking-[-0.035em] text-fg",
            featured ? "max-w-[760px] text-[32px] leading-[1.02] md:text-[52px]" : "text-[26px] leading-[1.08] md:text-[30px]",
          )}
        >
          <Link href={`/blog/${post.slug}`} className="outline-none after:absolute after:inset-0 after:content-['']">
            {post.title}
            {post.titleAccent && <span className="font-medium text-fg-muted"> {post.titleAccent}</span>}
          </Link>
        </H>
        <p className={clsx("text-fg-muted", featured ? "max-w-[640px] text-body-lg md:text-lg" : "text-body-md")}>{post.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] text-fg-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
            {post.linkedin && (
              <>
                <span aria-hidden>·</span>
                <span>Also on LinkedIn</span>
              </>
            )}
          </p>
          {/* Decorative: the title link already says where the card goes */}
          <span aria-hidden className={clsx("flex shrink-0 items-center gap-1.5 text-[14px] font-semibold", look.eyebrow)}>
            Read post
            <Icons.ArrowRight
              size={18}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-has-[a:focus-visible]:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
