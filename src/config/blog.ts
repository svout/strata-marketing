import type { BlogSeries, BlogSeriesId } from "@/types/blog";

/**
 * Blog settings. The series are the same three as the LinkedIn post
 * images (marketing/Social Brand and Channels → Visual system), so a
 * reader who saw the post on LinkedIn recognises it here.
 */
export const BLOG_SERIES: Record<BlogSeriesId, BlogSeries> = {
  "build-notes": {
    id: "build-notes",
    label: "Build notes",
    eyebrow: "Build notes",
    surface: "ink",
    description: "Engineering lessons from building a payment core: one problem, told properly.",
  },
  "build-log": {
    id: "build-log",
    label: "Build log",
    eyebrow: "Build log",
    surface: "paper",
    description: "Honest progress: what got done, what broke and what's next.",
  },
  milestone: {
    id: "milestone",
    label: "Milestones",
    eyebrow: "Milestone",
    surface: "cobalt",
    description: "Demos and measured results, when there's something real to show.",
  },
};

export const SERIES_ORDER: BlogSeriesId[] = ["build-notes", "build-log", "milestone"];

/** Posts are written by one person; every post is under his name. */
export const AUTHOR = {
  name: "Ivan Kovalchuk",
  role: "Building Strata",
  /** Personal LinkedIn profile, for the follow CTA and Person.sameAs */
  linkedin: "[LinkedIn profile URL]",
  /** Personal X profile */
  x: "[X profile URL]",
};

export const blogMeta = {
  title: "Blog",
  description:
    "Notes from building Strata, a payment core and spending controls for AI agents: idempotency, ledgers, settlement recovery and honest progress.",
};

export const blogHero = {
  overline: "Blog",
  headline: "Notes from building Strata.",
  headlineAccent: "What works, what broke and why.",
  lede: "The long version of every post from LinkedIn, with the code, the numbers and the parts that didn't fit.",
};

/**
 * UTM tags for links shared from each channel, so analytics can tell
 * which post brought a reader. Canonical URLs never carry them.
 */
export const shareUtm = (channel: "linkedin" | "x" | "telegram", campaign: string) =>
  `utm_source=${channel}&utm_medium=social&utm_campaign=${encodeURIComponent(campaign)}`;
