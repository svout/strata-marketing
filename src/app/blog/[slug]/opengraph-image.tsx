import { postOgImage } from "@/lib/og";
import { AUTHOR, BLOG_SERIES } from "@/config/blog";
import { getAllPosts, getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const alt = "Strata blog post";

/** The post's social card: its LinkedIn image, landscape. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return postOgImage({
    surface: BLOG_SERIES[post.series].surface,
    eyebrow: post.eyebrow,
    title: post.title,
    accent: post.titleAccent,
    summary: post.summary,
    author: AUTHOR.name,
  });
}
