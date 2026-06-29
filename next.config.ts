import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Watercolor backgrounds compress best as AVIF (gradient-heavy); WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit qualities allowlist; 90 keeps the large
    // /about backgrounds crisp, 75 stays the default for everything else.
    qualities: [75, 90],
  },
};

export default nextConfig;
