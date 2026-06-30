// Single source of truth for the /blogs essays — listing order, SEO metadata,
// and which posts are live. The prose itself lives in src/content/blogs/<slug>.mdx;
// this file is the index the route reads. Mirrors the profile.ts pattern.
//
// NOTE: the essays below are first drafts written in Marco's voice from facts
// already on the work pages — review/edit them before relying on them in
// interviews, and flip `draft: true` to pull any from the live index + sitemap
// (the page stays reachable by URL for preview, but is noindex'd while draft).

export type Post = {
  /** URL segment: /blogs/<slug>. Must match the MDX filename. */
  slug: string;
  title: string;
  /** One-line summary for the index card + meta description. */
  summary: string;
  /** ISO date (yyyy-mm-dd) — used for <time> and sorting. */
  date: string;
  /** Rough read time in minutes, shown on the card. */
  readingMinutes: number;
  tags: readonly string[];
  /** Hidden from the index + sitemap and noindex'd while true. */
  draft?: boolean;
};

// Newest first — this is the display order.
export const posts: readonly Post[] = [
  {
    slug: "why-a-toggle-should-overshoot",
    title: "Why a toggle should overshoot",
    summary:
      "Reverse-engineering one switch — what a spring ease, a little squash, and 14% of overshoot do that a linear slide can't.",
    date: "2026-06-20",
    readingMinutes: 5,
    tags: ["Motion", "GSAP", "Craft"],
    draft: true,
  },
  {
    slug: "directing-ai-coding-agents",
    title: "How I direct AI coding agents",
    summary:
      "Agents type; I decide what gets typed and what gets rejected. The judgment that doesn't delegate — and the skill file that makes my taste portable.",
    date: "2026-06-12",
    readingMinutes: 6,
    tags: ["AI", "Workflow", "Craft"],
    draft: true,
  },
  {
    slug: "halix-zero-to-one-solo",
    title: "Taking a SaaS from 0 to 1, solo",
    summary:
      "Sole technical owner of a live, paying B2B product — two surfaces, one design system, and the parts of the job that aren't code.",
    date: "2026-05-28",
    readingMinutes: 6,
    tags: ["Case study", "0 → 1", "Product"],
    draft: true,
  },
];

/** Live posts only — for the index list and sitemap. */
export const publishedPosts = posts.filter((p) => !p.draft);

/** Every slug (incl. drafts) — drafts stay reachable by URL for preview. */
export const allSlugs = posts.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Locale-stable date format (no Intl → no SSR/client drift). "June 20, 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
