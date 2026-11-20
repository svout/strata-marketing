import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Element, Root } from "hast";
import { BLOG_SERIES } from "@/config/blog";
import type { BlogFrontmatter, BlogHeading, BlogPost, BlogPostMeta } from "@/types/blog";

/**
 * Blog posts live as Markdown in content/blog/<slug>.md, so a draft
 * written in Obsidian (Marketing/Posts) can be copied in unchanged.
 *
 * Drafts (status: draft) appear in `next dev` with a banner and are left
 * out of production builds, the sitemap and the RSS feed. Set
 * BLOG_SHOW_DRAFTS=1 to preview them in a production build.
 *
 * Raw HTML in Markdown is not rendered (remark-rehype drops it), so a
 * post can't inject scripts or styles.
 */
const DIR = path.join(process.cwd(), "content", "blog");

export const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.BLOG_SHOW_DRAFTS === "1";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const isoDate = (v: unknown, field: string, file: string): string => {
  const d = v instanceof Date ? v : new Date(String(v));
  if (Number.isNaN(d.getTime())) throw new Error(`[blog] ${file}: "${field}" must be a date (YYYY-MM-DD)`);
  return d.toISOString().slice(0, 10);
};

export { formatDate } from "./blog-format";

function eyebrowFor(fm: BlogFrontmatter) {
  const series = BLOG_SERIES[fm.series].eyebrow.toUpperCase();
  if (fm.series === "build-log") {
    const d = new Date(`${fm.date}T00:00:00Z`);
    return `${series} · ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }
  return fm.number ? `${series} · ${String(fm.number).padStart(2, "0")}` : series;
}

/** Checks the frontmatter so a typo fails the build with a clear message */
function parseFrontmatter(data: Record<string, unknown>, file: string): BlogFrontmatter {
  const str = (k: string, required = true) => {
    const v = data[k];
    if (v === undefined || v === null || v === "") {
      if (required) throw new Error(`[blog] ${file}: missing "${k}"`);
      return undefined;
    }
    return String(v).trim();
  };
  const series = str("series") as BlogFrontmatter["series"];
  if (!(series in BLOG_SERIES)) {
    throw new Error(`[blog] ${file}: series must be one of ${Object.keys(BLOG_SERIES).join(", ")}`);
  }
  const status = (str("status", false) ?? "draft") as BlogFrontmatter["status"];
  if (status !== "draft" && status !== "published") throw new Error(`[blog] ${file}: status must be draft or published`);
  const description = str("description")!;
  if (description.length > 170) console.warn(`[blog] ${file}: description is ${description.length} chars; aim for ≈155`);
  const url = (k: string) => {
    const v = str(k, false);
    if (v && !/^https:\/\//.test(v)) throw new Error(`[blog] ${file}: "${k}" must be an https:// URL`);
    return v;
  };

  return {
    title: str("title")!,
    titleAccent: str("titleAccent", false),
    summary: str("summary")!,
    description,
    date: isoDate(data.date, "date", file),
    updated: data.updated ? isoDate(data.updated, "updated", file) : undefined,
    series,
    number: data.number !== undefined ? Number(data.number) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    linkedin: url("linkedin"),
    x: url("x"),
    status,
  };
}

const readingMinutes = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 230));

/**
 * rehype plugin: collects h2s for the "On this page" list, makes code
 * blocks keyboard-scrollable and opens external links safely.
 */
function rehypeStrata(headings: BlogHeading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "h2" && node.properties?.id) {
        headings.push({ id: String(node.properties.id), text: toString(node) });
      }
      if (node.tagName === "pre" || node.tagName === "table") {
        node.properties = { ...node.properties, tabIndex: 0 };
      }
      if (node.tagName === "a" && typeof node.properties?.href === "string" && /^https?:\/\//.test(node.properties.href)) {
        node.properties = { ...node.properties, rel: ["noopener", "noreferrer"], target: "_blank" };
      }
    });
  };
}

function render(markdown: string) {
  const headings: BlogHeading[] = [];
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStrata(headings))
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
  return { html, headings };
}

function readFile(slug: string) {
  const file = `${slug}.md`;
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = parseFrontmatter(data, file);
  const meta: BlogPostMeta = { ...fm, slug, eyebrow: eyebrowFor(fm), readingMinutes: readingMinutes(content) };
  return { meta, content };
}

const slugs = () =>
  fs.existsSync(DIR)
    ? fs
        .readdirSync(DIR)
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .map((f) => f.replace(/\.md$/, ""))
    : [];

const visible = (p: BlogPostMeta) => p.status === "published" || SHOW_DRAFTS;

/** Every visible post, newest first */
export function getAllPosts(): BlogPostMeta[] {
  return slugs()
    .map((s) => readFile(s).meta)
    .filter(visible)
    .sort((a, b) => b.date.localeCompare(a.date) || (b.number ?? 0) - (a.number ?? 0));
}

/** Published posts only: for the sitemap, RSS and llms.txt, whatever the environment */
export function getPublishedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.status === "published");
}

export function getPost(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug) || !slugs().includes(slug)) return null;
  const { meta, content } = readFile(slug);
  if (!visible(meta)) return null;
  return { ...meta, ...render(content) };
}

/** Up to `n` other posts: same series first, then the newest */
export function getRelated(post: BlogPostMeta, n = 3): BlogPostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.series === post.series);
  const rest = others.filter((p) => p.series !== post.series);
  return [...same, ...rest].slice(0, n);
}
