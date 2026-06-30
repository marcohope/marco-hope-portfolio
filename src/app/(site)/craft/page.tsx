import type { Metadata } from "next";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CraftCard } from "@/components/craft/CraftCard";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { ScrollCue } from "@/components/site/ScrollCue";
import { craftItems } from "@/lib/craft";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "A lab of small, self-contained interactive components — a liquid-glass nav, a drag-to-dismiss sheet, and an origin-aware popover. Each is 60fps, keyboard- and touch-ready, and inspectable with its full source.",
  alternates: { canonical: "/craft" },
};

const COUNT = craftItems.length.toString().padStart(2, "0");

export default function CraftPage() {
  return (
    <div className="theme-craft relative min-h-screen bg-background text-foreground">
      {/* Same floating glass header as the rest of the site, in the violet tone. */}
      <GlassNav tone="craft" />

      {/* Cosmic parallax hero — full viewport. The starfield + horizon are
          decorative; the CRAFT wordmark is the page H1. A scroll cue invites you
          down into the experiments, which fade in on scroll below. */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <CosmicParallaxBg
          head="Craft"
          text="Built, Tuned, Inspectable"
          loop={false}
          className="absolute inset-0"
        />
        {/* Dissolve the cosmic scene into the section below — `to-background`
            matches the content ground, so there's no hard seam at the hero edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background"
        />
        <ScrollCue />
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-20 md:px-10 md:pt-28 lg:px-16">
        {/* Intro (the hero carries the H1, so this leads with the eyebrow). */}
        <Reveal className="max-w-2xl">
          <Eyebrow>
            Craft · <span lang="ja">試作</span>
          </Eyebrow>
          <p className="mt-6 text-lg text-foreground/70">
            A lab of small, self-contained interactions — the kind I build to
            get a feel exactly right: the slide, the spring, the way a thing
            should respond to your hand. Every one runs at 60fps, works on touch
            and keyboard, and opens to its full build breakdown and source.
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
            {COUNT} experiments · interactive &amp; inspectable
          </p>
        </Reveal>

        {/* Experiment grid — driven by the craft registry (src/lib/craft.ts). */}
        <h2 className="sr-only">Experiments</h2>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {craftItems.map((item) => {
            const Demo = item.Demo;
            return (
              <CraftCard
                key={item.slug}
                title={item.title}
                summary={item.summary}
                tags={item.tags}
                breakdown={item.breakdown}
                href={`/craft/${item.slug}`}
              >
                <Demo />
              </CraftCard>
            );
          })}
        </RevealGroup>

        {/* The taste behind the lab, written down — the rulebook I hand my AI
            coding agents so the output feels like everything above. Links to the
            skill file in the repo (the "encode your taste" artifact). */}
        <Reveal className="mt-16">
          <a
            href="https://github.com/marcohope/marco-hope-portfolio/blob/main/skills/motion/SKILL.md"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-display text-lg font-bold tracking-tight">
                The rules behind the lab
              </p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-foreground/65">
                Every interaction here follows one rulebook — timing, easing,
                reduced-motion, 60fps. I wrote it down as a skill file I hand to
                my AI coding agents, so the code they type feels the way I&rsquo;d
                build it by hand.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Read the skill file
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </Reveal>

        {/* Footer mini-nav */}
        <footer className="mt-20">
          <nav className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
              More experiments soon
            </p>
            <div className="flex items-center gap-6">
              <CurtainLink
                href="/work"
                className="group inline-flex items-center gap-1.5 py-2 -my-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
              >
                Work
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
