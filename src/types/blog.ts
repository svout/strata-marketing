/** The three post series. They match the LinkedIn image system one to one. */
export type BlogSeriesId = "build-notes" | "build-log" | "milestone";

export type BlogSeries = {
  id: BlogSeriesId;
  /** Shown in filters and breadcrumbs */
  label: string;
  /** Eyebrow prefix, as on the LinkedIn image ("BUILD NOTES") */
  eyebrow: string;
  /** Surface the series uses everywhere: ink, paper or cobalt */
  surface: "ink" | "paper" | "cobalt";
  description: string;
};

export type BlogHeading = { id: string; text: string };

/** Frontmatter, as written at the top of each content/blog/*.md file */
export type BlogFrontmatter = {
  title: string;
  /** Second, quieter clause of the headline (optional, two-tone) */
  titleAccent?: string;
  /** One line under the headline: the same line as on the LinkedIn image */
  summary: string;
  /** ≈155 characters for search results and social previews */
  description: string;
  /** Publish date, YYYY-MM-DD */
  date: string;
  updated?: string;
  series: BlogSeriesId;
  /** Series number ("BUILD NOTES · 01"). Build log posts use the date instead. */
  number?: number;
  tags: string[];
  /** URL of the LinkedIn version, once it is live */
  linkedin?: string;
  /** URL of the X thread, once it is live */
  x?: string;
  status: "draft" | "published";
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  /** "BUILD NOTES · 01" or "BUILD LOG · 25 OCT 2026" */
  eyebrow: string;
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  headings: BlogHeading[];
};
