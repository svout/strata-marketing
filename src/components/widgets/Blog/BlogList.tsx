"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { BLOG_SERIES, SERIES_ORDER } from "@/config/blog";
import type { BlogPostMeta, BlogSeriesId } from "@/types/blog";
import { BlogCard } from "./BlogCard";

/**
 * Post list with a series filter (All · Build notes · Build log ·
 * Milestones). Every post is in the server-rendered HTML, so search
 * engines see them all; the filter only hides cards. The choice is kept
 * in ?series= so a filtered view can be linked to.
 */
type Filter = "all" | BlogSeriesId;

export function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const available = SERIES_ORDER.filter((s) => posts.some((p) => p.series === s));

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("series") as Filter | null;
    if (s && s in BLOG_SERIES) setFilter(s);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("series");
    else url.searchParams.set("series", f);
    window.history.replaceState(null, "", url);
  };

  const shown = filter === "all" ? posts : posts.filter((p) => p.series === filter);
  const [featured, ...rest] = shown;

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {available.length > 1 && (
        <div role="group" aria-label="Filter by series" className="flex flex-wrap gap-2">
          {(["all", ...available] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => choose(f)}
              className={clsx(
                "h-9 rounded-button px-3.5 text-[14px] transition-colors",
                filter === f ? "bg-surface-3 text-text-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "text-text-2 hover:text-text-1",
              )}
            >
              {f === "all" ? "All posts" : BLOG_SERIES[f].label}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "post" : "posts"}
      </p>

      {featured && <BlogCard post={featured} featured headingLevel="h2" />}
      {rest.length > 0 && (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlogList;
