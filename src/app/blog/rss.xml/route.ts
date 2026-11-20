import { AUTHOR, blogMeta } from "@/config/blog";
import { COMPANY } from "@/config/company";
import { absoluteUrl } from "@/config/site";
import { getPublishedPosts } from "@/lib/blog";

/**
 * /blog/rss.xml: RSS 2.0 feed of published posts (drafts never appear).
 * Feed readers, newsletters (e.g. RSS-to-email) and some LinkedIn and X
 * scheduling tools can pick new posts up from here.
 */
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const posts = getPublishedPosts();
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      const title = p.titleAccent ? `${p.title} ${p.titleAccent}` : p.title;
      return [
        "    <item>",
        `      <title>${esc(title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${esc(p.description)}</description>`,
        `      <dc:creator>${esc(AUTHOR.name)}</dc:creator>`,
        ...p.tags.map((t) => `      <category>${esc(t)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`${COMPANY.name} blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${esc(blogMeta.description)}</description>
    <language>en-gb</language>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].updated ?? posts[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
