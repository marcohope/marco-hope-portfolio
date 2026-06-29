import type { Metadata } from "next";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { ArrowRight } from "lucide-react";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CraftCard } from "@/components/craft/CraftCard";
import { LiquidGlassNavDemo } from "@/components/craft/LiquidGlassNavDemo";
import { DragSheetDemo } from "@/components/craft/DragSheetDemo";
import { OriginPopoverDemo } from "@/components/craft/OriginPopoverDemo";
import { CopyEmailDemo } from "@/components/craft/CopyEmailDemo";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "A lab of small, self-contained interactive components — a liquid-glass nav, a drag-to-dismiss sheet, and an origin-aware popover. Each is 60fps, keyboard- and touch-ready, and inspectable.",
  alternates: { canonical: "/craft" },
};

export default function CraftPage() {
  return (
    <div className="theme-craft relative min-h-screen bg-background text-foreground">
      {/* Same floating glass header as the rest of the site, in the violet tone. */}
      <GlassNav tone="craft" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 md:px-10 md:pt-36 lg:px-16">
        {/* Intro */}
        <Reveal className="max-w-2xl">
          <Eyebrow>
            Craft · <span lang="ja">試作</span>
          </Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(3rem,12vw,6rem)] font-bold leading-[0.95] tracking-tight">
            Craft
          </h1>
          <p className="mt-5 text-lg text-foreground/70">
            A lab of small, self-contained interactions — the kind I build to
            get a feel exactly right: the slide, the spring, the way a thing
            should respond to your hand. Every one runs at 60fps, works on touch
            and keyboard, and you can open the build breakdown to see how.
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
            04 experiments · interactive &amp; inspectable
          </p>
        </Reveal>

        {/* Experiment grid */}
        <h2 className="sr-only">Experiments</h2>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          <CraftCard
            title="Liquid Glass nav"
            summary="One shared spotlight pill glides under whatever you hover or focus, then settles back on the selected item — a single animated element, not a fade per link."
            tags={["GSAP", "Shared element", "Keyboard"]}
            breakdown={[
              "The pill is one absolutely-positioned span; on hover/focus I measure the target button's offsetLeft + width and tween x/width with power3.out (~280ms — under the 300ms perceived-instant ceiling).",
              "Only transform and width animate — no layout per frame — so it holds 60fps.",
              "Focus drives the exact same motion as hover, and Enter/Space selects; the pill re-aligns on resize.",
              "Reduced motion → the pill jumps instantly instead of tweening.",
            ]}
          >
            <LiquidGlassNavDemo />
          </CraftCard>

          <CraftCard
            title="Drag-to-dismiss sheet"
            summary="A bottom sheet you can fling away. Drag past 40% of its height — or flick it down fast — to dismiss; anything less springs back. Pulling up rubber-bands."
            tags={["GSAP", "Pointer Events", "Gesture"]}
            breakdown={[
              "Dragging is hand-rolled on Pointer Events with setPointerCapture, so the gesture survives the pointer leaving the grabber (mouse + touch alike).",
              "Release reads distance and velocity (px/ms from event timestamps): past the threshold it dismisses, otherwise GSAP springs it back to rest.",
              "Upward pulls past rest are damped to 25% for a rubber-band feel; touch-action:none stops the page scrolling under the drag.",
              "Keyboard users get an explicit Close button and Escape; focus moves into the sheet on open and back to the trigger on close.",
            ]}
          >
            <DragSheetDemo />
          </CraftCard>

          <CraftCard
            title="Origin-aware popover"
            summary="The panel grows out of the button that opened it — its transform-origin points at the trigger's centre, so it unfolds from the right spot every time."
            tags={["GSAP", "transform-origin", "A11y"]}
            breakdown={[
              "On open I measure the trigger, clamp the panel within the stage, and set transform-origin to the trigger's centre in px.",
              "Mouse opens with a quick scale(0.96)+fade from that origin; keyboard opens instantly — animating keyboard-driven UI is disorienting.",
              "Positioning + the tween run in a GSAP layout effect, so the panel never flashes unpositioned.",
              "Escape closes and restores focus to the trigger; an outside pointerdown closes without stealing focus.",
            ]}
          >
            <OriginPopoverDemo />
          </CraftCard>

          <CraftCard
            title="Click-to-copy email"
            summary="Tap the address and it's on your clipboard — the icon pops to a check and the button confirms 'Copied', then settles back. The same control ships on the contact page."
            tags={["GSAP", "Clipboard API", "A11y"]}
            breakdown={[
              "Copy goes through the async Clipboard API, with a hidden-textarea + execCommand fallback for older or insecure contexts so it still works everywhere.",
              "On success the icon swaps Copy → Check and pops with a GSAP back.out(3) scale; the address itself stays select-all for manual copy.",
              "The result is announced through a polite aria-live status region, so screen-reader users hear 'Copied' without focus moving.",
              "Reduced motion → the icon swaps instantly with no pop.",
            ]}
          >
            <CopyEmailDemo />
          </CraftCard>
        </RevealGroup>

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
