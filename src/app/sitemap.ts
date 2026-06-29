import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Generates /sitemap.xml (Next 16 file convention). Static four-route portfolio.
// lastModified is stamped once at build time.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/craft", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
