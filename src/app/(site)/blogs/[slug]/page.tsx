import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { allSlugs, getPost, formatDate } from "@/lib/blogs";

// Pre-render every known slug; unknown slugs 404 (no on-demand rendering).
export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blogs/${slug}`,
      type: "article",
    },
    // Drafts stay reachable for preview but never get indexed.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Dynamic import keyed by slug — the bundler builds a context over
  // src/content/blogs/*.mdx; dynamicParams=false guarantees slug is valid.
  const { default: Body } = await import(`@/content/blogs/${slug}.mdx`);

  return (
    <div className="theme-craft relative min-h-screen bg-background text-foreground">
      <GlassNav tone="craft" />

      <article className="mx-auto w-full max-w-2xl px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <CurtainLink
          href="/blogs"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Blogs
        </CurtainLink>

        <header className="mt-8 border-b border-border pb-8">
          <Eyebrow>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {post.title}
          </h1>
        </header>

        {/* Authored prose — styled globally via src/mdx-components.tsx. */}
        <div className="mt-4">
          <Body />
        </div>

        <footer className="mt-16 border-t border-border pt-8">
          <CurtainLink
            href="/blogs"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All blogs
          </CurtainLink>
        </footer>
      </article>
    </div>
  );
}
