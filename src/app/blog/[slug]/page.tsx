import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Containers } from "@/components";
import ClosingBand from "@/components/widgets/ClosingBand";
import { PostBody, PostHero, RelatedPosts } from "@/components/widgets/Blog/Post";
import { AUTHOR, BLOG_SERIES } from "@/config/blog";
import { isFilled } from "@/config/company";
import { absoluteUrl } from "@/config/site";
import { getAllPosts, getPost, getRelated } from "@/lib/blog";
import { articleMetadata } from "@/lib/seo";
import { JsonLd, blogPostingSchema, breadcrumbTrail } from "@/lib/jsonLd";

type Params = { params: Promise<{ slug: string }> };

/** Every post is pre-rendered at build time; unknown slugs are a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return articleMetadata({
    title: post.titleAccent ? `${post.title} ${post.titleAccent}` : post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    date: post.date,
    updated: post.updated,
    author: AUTHOR.name,
    section: BLOG_SERIES[post.series].label,
    tags: post.tags,
    draft: post.status === "draft",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const series = BLOG_SERIES[post.series];
  const url = absoluteUrl(`/blog/${post.slug}`);
  const follow = isFilled(AUTHOR.linkedin) ? AUTHOR.linkedin : undefined;

  return (
    <Containers.Layout>
      <PostHero post={post} />
      <PostBody post={post} shareUrl={url} />
      <RelatedPosts posts={getRelated(post)} />
      <ClosingBand
        id="post-cta-title"
        title={["Follow the build.", "New notes every few weeks."]}
        primary={follow ? { label: "Follow on LinkedIn", href: follow } : { label: "Subscribe by RSS", href: "/blog/rss.xml" }}
        secondary={{ label: "See how Strata works", href: "/product" }}
      />
      <JsonLd
        data={[
          blogPostingSchema({
            slug: post.slug,
            title: post.titleAccent ? `${post.title} ${post.titleAccent}` : post.title,
            description: post.description,
            date: post.date,
            updated: post.updated,
            tags: post.tags,
            section: series.label,
            linkedin: post.linkedin,
          }),
          breadcrumbTrail([
            ["Blog", "/blog"],
            [post.title, `/blog/${post.slug}`],
          ]),
        ]}
      />
    </Containers.Layout>
  );
}
