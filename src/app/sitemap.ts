import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { publishedPosts } from "@/lib/blogs";
import { craftSlugs } from "@/lib/craft";

// Generates /sitemap.xml (Next 16 file convention). Static routes plus one entry
// per published essay. lastModified is stamped once at build time.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/craft", priority: 0.8 },
    { path: "/blogs", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    ...craftSlugs.map((slug) => ({ path: `/craft/${slug}`, priority: 0.6 })),
    ...publishedPosts.map((p) => ({
      path: `/blogs/${p.slug}`,
      priority: 0.6,
    })),
  ];
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
