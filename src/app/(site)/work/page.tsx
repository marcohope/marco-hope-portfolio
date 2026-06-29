import type { Metadata } from "next";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { ArrowRight } from "lucide-react";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { WorkBackground } from "@/components/work/WorkBackground";
import { WorkHoverHint } from "@/components/work/WorkHoverHint";
import { WorkProject } from "@/components/work/WorkProject";
import { WorkCatalogueList } from "@/components/work/WorkCatalogueList";
import { SceneLoader } from "@/components/intro/SceneLoader";
import { profile, caseStudies } from "@/lib/profile";

// /work leads with the flagship case studies (those with a long-form entry in
// `caseStudies`), each a full scroll-scene, then lists the rest of the
// catalogue in brief.
const deepProjects = profile.projects.filter((p) => caseStudies[p.code]);
const liteProjects = profile.projects.filter((p) => !caseStudies[p.code]);

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects: Halix Solutions (B2B AI SaaS), a Python/Electron lead-gen tool, a Shopify UX/SEO audit, and an Arduino FM radio.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="theme-work relative min-h-screen bg-background text-foreground">
      {/* Themed liquid-glass loading screen — waits for the Spline scene. */}
      <SceneLoader themeClass="theme-work" />

      {/* Same floating glass header as the home page, in the blue work tone. */}
      <GlassNav tone="work" />

      {/* Fixed Spline scene — its 3D detail sits on the right half. */}
      <WorkBackground />

      {/* Nudge the user to hover the interactive scene on the right. */}
      <WorkHoverHint />

      {/* pointer-events-none so empty areas (the right half) stay click-through
          to the Spline; interactive content re-enables it on its own column. */}
      <div className="pointer-events-none relative z-10">
        {/* Intro */}
        <section className="flex min-h-[88svh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="pointer-events-auto max-w-xl">
              <Eyebrow>
                Selected Work · <span lang="ja">制作</span>
              </Eyebrow>
              <h1 className="mt-6 font-display text-[clamp(3rem,12vw,6rem)] font-bold leading-[0.95] tracking-tight">
                Work
              </h1>
              <p className="mt-5 text-lg text-foreground/70">
                Things I&rsquo;ve designed and shipped. The flagship builds are
                full case studies — scroll through each — with the rest of the
                catalogue in brief below.
              </p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
                {String(deepProjects.length).padStart(2, "0")} case studies ·{" "}
                {String(liteProjects.length).padStart(2, "0")} more · scroll to
                begin
              </p>
            </Reveal>
          </div>
        </section>

        {/* One scene per flagship project, fading through on scroll. */}
        <h2 className="sr-only">Selected case studies</h2>
        {deepProjects.map((p) => (
          <WorkProject key={p.code} project={p} />
        ))}

        {/* The rest of the catalogue — compact cards, not full scroll-scenes. */}
        <section className="pointer-events-auto mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Eyebrow>
            More from the catalogue · <span lang="ja">他</span>
          </Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Also in the workshop.
          </h2>
          <p className="mt-3 max-w-xl text-foreground/70">
            Hardware and earlier client work — shorter to tell, but they shaped
            how I build.
          </p>
          <div className="max-w-3xl">
            <WorkCatalogueList projects={liteProjects} />
          </div>
        </section>

        {/* Footer mini-nav */}
        <footer className="pointer-events-auto mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
          <nav className="flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
              End of catalogue
            </p>
            <div className="flex items-center gap-6">
              <CurtainLink
                href="/"
                className="group inline-flex items-center gap-1.5 py-2 -my-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
              >
                Home
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </CurtainLink>
              <CurtainLink
                href="/contact"
                className="group inline-flex items-center gap-1.5 py-2 -my-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
              >
                Contact
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </CurtainLink>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
}
