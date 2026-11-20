import type { Metadata } from "next";
import Link from "next/link";
import { Containers } from "@/components";
import PageHero from "@/components/widgets/PageHero";
import { containerClass } from "@/components/containers/Section";
import { BlogList } from "@/components/widgets/Blog/BlogList";
import { Icons } from "@/components/icons";
import { AUTHOR, blogHero, blogMeta } from "@/config/blog";
import { isFilled } from "@/config/company";
import { getAllPosts } from "@/lib/blog";
import { blogFeed, pageMetadata } from "@/lib/seo";
import { JsonLd, blogSchema, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata: Metadata = {
  ...pageMetadata({ ...blogMeta, path: "/blog" }),
  alternates: { canonical: "/blog", types: blogFeed },
};

/**
 * Blog index, v2: pattern-frame hero, then every post as a card with its
 * series eyebrow. Newest post is featured. Each card matches the post's
 * LinkedIn image.
 */
export default function BlogIndexPage() {
  const posts = getAllPosts();
  const follow = isFilled(AUTHOR.linkedin) ? AUTHOR.linkedin : undefined;

  return (
    <Containers.Layout>
      <PageHero
        id="blog-title"
        eyebrow={blogHero.overline}
        title={blogHero.headline}
        accent={blogHero.headlineAccent}
        lede={blogHero.lede}
        primary={follow ? { label: "Follow on LinkedIn", href: follow } : undefined}
        secondary={{ label: "RSS feed", href: "/blog/rss.xml" }}
      />

      <section aria-label="Posts" className="bg-bg pb-20 pt-4 md:pb-28">
        <div className={containerClass}>
          {posts.length ? (
            <BlogList posts={posts} />
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-panel-lg bg-surface-1 p-8 shadow-edge md:p-12">
              <h2 className="text-[26px]">The first notes are on their way.</h2>
              <p className="max-w-[560px] text-body-lg text-fg-muted">
                Engineering notes from building Strata&apos;s payment core will appear here, alongside their LinkedIn versions.
              </p>
              <Link href="/product" className="mt-2 inline-flex items-center gap-1.5 rounded-sm font-semibold text-brand hover:underline">
                See how Strata works <Icons.ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <JsonLd data={[blogSchema(posts.filter((p) => p.status === "published")), breadcrumbSchema("Blog", "/blog")]} />
    </Containers.Layout>
  );
}
