"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { profile } from "@/lib/profile";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/tech/TechIcon";
import { CurtainLink } from "@/components/transition/CurtainLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = (typeof profile.projects)[number];

// Per-project kanji + status presentation for the fallback cover tile (shown
// until a real screenshot is dropped into the project's `image` slot). Keeps the
// card on-brand with the /work "star catalogue" rather than using stock photos.
const KANJI: Record<string, string> = {
  "HX-001": "創", // found / create
  "PF-003": "雅", // miyabi — elegance / refinement (this site)
  "DL-002": "集", // gather (lead-gen)
  "MN-004": "形", // form / shape
  "FM-005": "波", // wave (radio)
  "AW-006": "水", // water
};

const STATUS: Record<string, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-accent" },
  shipped: { label: "Shipped", dot: "bg-gold" },
};

// The home track is a curated subset — the strongest product-UI work, in
// catalogue order — so the homepage stays tight. The full six (incl. the
// hardware / IRL builds) live on /work.
const HOME_CODES = new Set(["HX-001", "PF-003", "DL-002"]);
const homeProjects = profile.projects.filter((p) => HOME_CODES.has(p.code));
const totalCount = profile.projects.length;

// Shared across the project cards and the trailing "view all" card so the
// track's slot width can't drift between them. Widths are ~1.5× the original
// gallery slot for larger, more immersive cards (mobile stays near full-width).
const CARD_WIDTH =
  "w-[82vw] shrink-0 snap-start sm:w-[84vw] md:w-[66vw] lg:w-[39rem]";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** A single project card: real image if provided, else a themed cover tile. */
function ProjectCard({ project }: { project: Project }) {
  const status = STATUS[project.status] ?? STATUS.shipped;

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-clip rounded-lg border border-border/60">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} — ${project.kind}`}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 32vw"
            placeholder="blur"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          // Fallback cover: gradient ground + giant faint kanji.
          <div className="relative h-full w-full bg-gradient-to-br from-elevated/80 via-surface/50 to-background/40 transition duration-500 group-hover:scale-[1.04]">
            <span
              aria-hidden
              lang="ja"
              className="pointer-events-none absolute -right-2 bottom-[-1.5rem] select-none font-display text-[9rem] leading-none text-foreground/[0.07]"
            >
              {KANJI[project.code] ?? project.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Top row: mono code + status pill. */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-md bg-background/55 px-2 py-1 font-mono text-[0.7rem] tracking-wider text-gold backdrop-blur-sm">
            {project.code}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/55 px-2.5 py-1 text-[0.7rem] font-medium text-foreground/85 backdrop-blur-sm">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Bottom row: headline metric. */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <span className="rounded-md bg-background/55 px-2 py-1 font-mono text-[0.7rem] tracking-wider text-foreground/85 backdrop-blur-sm">
            {project.metric}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
          {project.kind}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/70">
          {project.blurb}
        </p>

        <div className="mt-4 flex items-center gap-2.5">
          {project.tech.slice(0, 5).map((slug) => (
            <TechIcon
              key={slug}
              slug={slug}
              className="h-4 w-4 text-foreground/45 transition-colors group-hover:text-accent"
            />
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors group-hover:text-accent">
          {isExternal(project.href) ? "Visit project" : "Read more"}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );

  const cardClass =
    "washi washi-hover group flex h-full flex-col overflow-hidden p-4";

  return isExternal(project.href) ? (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cardClass}
    >
      {body}
    </a>
  ) : (
    <CurtainLink href={`/work#${project.code.toLowerCase()}`} className={cardClass}>
      {body}
    </CurtainLink>
  );
}

/**
 * Trailing "view all" card — the slider's end-cap that hands the operator off
 * to the full /work catalogue. Styled to echo the project cards (gold mono pill,
 * giant faint kanji, bottom-anchored CTA) so it reads as the natural finale of
 * the track rather than a foreign element.
 */
function ViewAllCard() {
  return (
    <CurtainLink
      href="/work"
      className="washi washi-hover group relative flex h-full flex-col justify-between overflow-hidden p-4"
    >
      {/* Giant faint kanji — 全 (zen): "all / complete" — centered as the card's
          focal motif, standing in for the project cards' cover image. */}
      <span
        aria-hidden
        lang="ja"
        className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[13rem] leading-none text-foreground/[0.07]"
      >
        全
      </span>

      <div className="relative flex items-center justify-between px-1 pt-1">
        <span className="rounded-md bg-background/55 px-2 py-1 font-mono text-[0.7rem] tracking-wider text-gold backdrop-blur-sm">
          全 · {totalCount}
        </span>
        <ArrowUpRight className="size-4 text-foreground/45 transition-colors group-hover:text-accent" />
      </div>

      <div className="relative px-1 pb-1">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
          Catalogue
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
          View all work
        </h3>
        <p className="mt-2 max-w-[24ch] text-sm text-foreground/70">
          Every build in full — {totalCount} projects, from product UI to
          hardware.
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors group-hover:text-accent">
          Open the catalogue
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </CurtainLink>
  );
}

/**
 * Featured-work showcase for the home page. On desktop (and when motion is
 * allowed) the section PINS and the card track slides horizontally, scrubbed to
 * scroll — so the user scrolls "through" the selected work, then the page
 * releases into the content stack below. Mobile and reduced-motion users get the
 * same track as a native horizontal scroll (no scroll hijack).
 *
 * Themed to the sakura day/night system (washi cards, gold mono codes,
 * font-display headings) and driven by the real `profile.projects` catalogue.
 */
export function ProjectsCarousel() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const sectionEl = section.current;
      const viewportEl = viewport.current;
      const trackEl = track.current;
      if (!sectionEl || !viewportEl || !trackEl) return;

      const mm = gsap.matchMedia();

      // Desktop + motion-OK: pin the section and slide the track horizontally,
      // scrubbed to scroll. (Mobile / reduced-motion fall through to the markup's
      // native overflow-x-auto — no pin, no hijack.)
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // The slide ends with the LAST card (the "view all" end-cap) centered
          // in the viewport, then the pin releases into natural scroll. distance()
          // is the exact horizontal travel for that, and it also drives the pin
          // length (end) and the progress bar, so all three stay in lock-step.
          const distance = () => {
            const cards = gsap.utils.toArray<HTMLElement>(
              "[data-project-card]",
              trackEl,
            );
            const first = cards[0];
            const last = cards[cards.length - 1];
            if (!first || !last) return 0;
            const rel = last.offsetLeft - first.offsetLeft;
            return Math.max(
              0,
              rel + last.offsetWidth / 2 - viewportEl.clientWidth / 2,
            );
          };

          // GSAP owns the horizontal position now, so clip the off-screen cards.
          gsap.set(viewportEl, { overflow: "hidden" });

          // One scrubbed timeline drives BOTH the track and the progress bar, so
          // the indicator shares the cards' playhead and both revert with the
          // matchMedia context. scrub is tied DIRECTLY to scroll (no eased lag):
          // a lagged scrub would let the pin release before the slide finished,
          // so the last card never reached center and the tail of the animation
          // played out over the next section.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          tl.to(trackEl, { x: () => -distance(), ease: "none" }, 0);
          if (progress.current)
            tl.to(progress.current, { scaleX: 1, ease: "none" }, 0);

          // Keyboard support: Tabbing to a card that's translated off-screen would
          // otherwise set the clipped viewport's scrollLeft (desyncing from the
          // GSAP transform). Instead, drive the pin's scroll so the focused card
          // slides into view in sync. Cards already in view are left alone.
          const st = tl.scrollTrigger;
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-project-card]",
            trackEl,
          );
          const firstLeft = cards[0]?.offsetLeft ?? 0;
          const onFocusIn = (e: FocusEvent) => {
            const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(
              "[data-project-card]",
            );
            if (!card || !st) return;
            const r = card.getBoundingClientRect();
            if (r.left >= 0 && r.right <= viewportEl.clientWidth) return;
            const max = distance();
            if (max <= 0) return;
            viewportEl.scrollLeft = 0; // cancel the browser's competing reveal
            const p = gsap.utils.clamp(0, 1, (card.offsetLeft - firstLeft) / max);
            window.scrollTo({ top: st.start + (st.end - st.start) * p });
          };
          trackEl.addEventListener("focusin", onFocusIn);
          return () => trackEl.removeEventListener("focusin", onFocusIn);
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative z-10 py-20"
    >
      {/* Heading — aligned to the page's max-w-5xl container. */}
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
        <Eyebrow>
          Work · <span lang="ja">制作</span>
        </Eyebrow>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Selected work.
          </h2>
          <CurtainLink
            href="/work"
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-accent md:text-base"
          >
            View the full catalogue
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </CurtainLink>
        </div>
      </div>

      {/* The horizontal track, constrained to the same max-w-5xl band as the
          rest of the page so the section's side margins are consistent with the
          content stack below. overflow-x-auto is the mobile / reduced-motion
          fallback; on desktop the effect sets overflow:hidden and drives x. The
          first card sits flush with the band's left edge, lining up with the
          heading above. */}
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
        <div
          ref={viewport}
          className="mt-10 overflow-x-auto py-10 [scrollbar-width:none] md:mt-14"
        >
          <div
            ref={track}
            className="flex w-max snap-x snap-proximity gap-5 pr-6 md:gap-6 md:pr-10"
          >
            {homeProjects.map((project) => (
              <div key={project.code} data-project-card className={CARD_WIDTH}>
                <ProjectCard project={project} />
              </div>
            ))}
            {/* End-cap: the slide settles with this centered, then releases. */}
            <div data-project-card className={CARD_WIDTH}>
              <ViewAllCard />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-through progress bar — only shown when the pin actually runs
          (desktop + motion-safe), so it's never a dead bar under reduced motion. */}
      <div className="mx-auto mt-2 hidden w-full max-w-5xl px-6 md:px-8 md:motion-safe:block">
        <span className="block h-0.5 w-full overflow-hidden rounded-full bg-border/60">
          <span
            ref={progress}
            className="block h-full w-full origin-left rounded-full bg-accent/70 [transform:scaleX(0)]"
          />
        </span>
      </div>
    </section>
  );
}
