import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files act as pages and be imported as components (used by /blogs).
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    // Watercolor backgrounds compress best as AVIF (gradient-heavy); WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit qualities allowlist; 90 keeps the large
    // /about backgrounds crisp, 75 stays the default for everything else.
    qualities: [75, 90],
  },
};

// Default MDX compiler — no remark/rehype plugins, so it works under Turbopack
// (which can't yet take JS-function plugins). Element styling lives in
// src/mdx-components.tsx; post metadata lives in src/lib/blogs.ts.
const withMDX = createMDX({});

export default withMDX(nextConfig);
