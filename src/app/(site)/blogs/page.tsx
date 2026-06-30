import type { Metadata } from "next";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { ArrowRight } from "lucide-react";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ComingSoonClouds } from "@/components/blogs/ComingSoonClouds";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes on interface motion, directing AI coding agents, and shipping product — coming soon.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <div className="theme-blogs relative min-h-screen overflow-hidden bg-background text-foreground">
      <GlassNav tone="blogs" />

      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        {/* Animated cloudy SVG backdrop (decorative, reduced-motion safe). */}
        <ComingSoonClouds />

        <div className="relative z-10 flex max-w-2xl flex-col items-center">
          <Eyebrow>
            Blog · <span lang="ja">記</span>
          </Eyebrow>

          <h1 className="mt-7 font-display text-[clamp(3rem,12vw,7rem)] font-bold leading-[0.95] tracking-tight text-foreground [text-shadow:0_2px_30px_rgb(255_255_255_/_0.55)]">
            Coming soon
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/75">
            Notes on interface motion, directing AI coding agents, and shipping
            product end-to-end — the reasoning behind the craft. Landing shortly.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
              In the meantime
            </span>
            <CurtainLink
              href="/craft"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 transition-colors hover:text-accent"
            >
              Craft lab
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </CurtainLink>
            <CurtainLink
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 transition-colors hover:text-accent"
            >
              Work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </CurtainLink>
          </div>
        </div>
      </section>
    </div>
  );
}
