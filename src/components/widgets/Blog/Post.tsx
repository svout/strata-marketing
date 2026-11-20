import Link from "next/link";
import clsx from "clsx";
import { PatternFrame } from "@/components/elements/PatternFrame";
import { containerClass } from "@/components/containers/Section";
import { Icons } from "@/components/icons";
import { AUTHOR, BLOG_SERIES } from "@/config/blog";
import { isFilled } from "@/config/company";
import { formatDate } from "@/lib/blog-format";
import type { BlogPost, BlogPostMeta } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { Share } from "./Share";
import { surfaceLook } from "./surface";

/**
 * A blog post (Build notes, Build log or Milestone). The hero is the
 * post's LinkedIn image in page form: same surface, eyebrow, headline
 * and supporting line. Then the article, a short "On this page" list
 * and share links, the LinkedIn discussion, and related posts.
 */

export function PostHero({ post }: { post: BlogPost }) {
  const series = BLOG_SERIES[post.series];
  const look = surfaceLook[series.surface];
  return (
    <PatternFrame id="post-hero-pattern" labelledBy="post-title">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-5 px-5 pb-14 pt-[120px] md:gap-6 md:pb-20 md:pt-[168px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[14px] text-text-2">
            <li>
              <Link href="/blog" className="rounded-sm hover:text-text-1">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/blog?series=${series.id}`} className="rounded-sm hover:text-text-1">
                {series.label}
              </Link>
            </li>
          </ol>
        </nav>
        <p className={clsx("font-mono text-[12px] uppercase tracking-[0.1em]", look.eyebrow === "text-cobalt-100" ? "text-cobalt-light" : look.eyebrow)}>
          {post.eyebrow}
        </p>
        <h1 id="post-title" className="max-w-[920px] text-balance text-h1 font-bold">
          {post.title}
          {post.titleAccent && <span className="text-text-2"> {post.titleAccent}</span>}
        </h1>
        <p className="max-w-[720px] text-lede text-text-2">{post.summary}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] text-text-2">
          <span className="text-text-1">{AUTHOR.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </p>
      </div>
    </PatternFrame>
  );
}

/** Shown on draft posts only (they never reach a production build). */
function DraftBanner({ post, shareUrl }: { post: BlogPost; shareUrl: string }) {
  const campaign = post.slug;
  return (
    <div role="note" className="mb-10 rounded-panel border border-review bg-review-tint p-5 text-[14px] text-review-fg">
      <p className="font-semibold">Draft: only visible in development.</p>
      <p className="mt-1">
        Rewrite it in your own voice, set <code>status: published</code>, and add the LinkedIn URL once that post is live.
      </p>
      <p className="mt-3 break-all font-mono text-[12.5px]">
        Link for the LinkedIn post: {shareUrl}?utm_source=linkedin&amp;utm_medium=social&amp;utm_campaign={campaign}
      </p>
    </div>
  );
}

function Toc({ post }: { post: BlogPost }) {
  if (post.headings.length < 2) return null;
  return (
    <nav aria-labelledby="toc-title" className="flex flex-col gap-3">
      <h2 id="toc-title" className="font-mono text-overline uppercase tracking-[0.1em] text-fg-muted md:text-label">
        On this page
      </h2>
      <ol className="flex flex-col gap-2 border-l border-line text-[14px]">
        {post.headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-4 text-fg-muted hover:border-cobalt-500 hover:text-fg">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The LinkedIn conversation: where the comments are, or a follow link until the post is live. */
function Discuss({ post }: { post: BlogPost }) {
  const discuss = post.linkedin;
  const follow = isFilled(AUTHOR.linkedin) ? AUTHOR.linkedin : undefined;
  const href = discuss ?? follow;
  if (!href) return null;
  return (
    <div
      className="flex flex-col gap-4 rounded-panel-lg bg-surface-1 p-6 shadow-edge sm:flex-row sm:items-center sm:justify-between md:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-surface-2 text-cobalt-light">
          <Icons.LinkedIn size={22} />
        </span>
        <div className="flex flex-col gap-1">
          <h2 id="discuss-title" className="text-[20px] font-semibold tracking-[-0.02em]">
            {discuss ? "Join the discussion on LinkedIn." : "Follow the build on LinkedIn."}
          </h2>
          <p className="text-body-md text-fg-muted">
            {discuss
              ? "This post started there. Questions, pushback and war stories are welcome in the comments."
              : `${AUTHOR.name} posts the short version of every note there first.`}
          </p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-button bg-white px-4 text-[14px] font-medium text-bg hover:bg-[#E6E8EB]"
      >
        {discuss ? "Open the post" : "Follow"}
        <Icons.ArrowRight size={18} />
        <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
      </a>
    </div>
  );
}

export function PostBody({ post, shareUrl }: { post: BlogPost; shareUrl: string }) {
  return (
    <section aria-label="Article" className="bg-bg py-14 md:py-20">
      <div className={clsx(containerClass, "grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20")}>
        <div className="min-w-0 max-w-[720px]">
          {post.status === "draft" && <DraftBanner post={post} shareUrl={shareUrl} />}
          {/* Rendered from Markdown at build time; raw HTML in posts is dropped */}
          <article className="prose-strata" dangerouslySetInnerHTML={{ __html: post.html }} />

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8">
            <p className="text-[15px] font-semibold">Share this post</p>
            <Share url={shareUrl} title={post.title} campaign={post.slug} />
          </div>
          <div className="mt-10">
            <Discuss post={post} />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-10">
            <Toc post={post} />
            {post.tags.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="font-mono text-overline uppercase tracking-[0.1em] text-fg-muted md:text-label">Topics</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <li key={t} className="rounded-tag bg-neutral-bg px-2 py-0.5 font-mono text-[12px] text-text-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-title" className="bg-bg py-14 md:py-20">
      <div className={clsx(containerClass, "flex flex-col gap-8")}>
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-title" className="text-h2">
            Keep reading
          </h2>
          <Link href="/blog" className="hidden items-center gap-1.5 rounded-sm text-[15px] font-semibold text-brand hover:underline sm:inline-flex">
            All posts <Icons.ArrowRight size={18} />
          </Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
