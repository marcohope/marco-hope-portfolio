"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { profile } from "@/lib/profile";
import { prefersReducedMotion } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ToolLogo } from "@/components/tech/ToolLogo";
import { TECH_ICONS } from "@/components/tech/tech-icons.generated";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { Reveal, RevealGroup } from "@/components/site/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = (typeof profile.projects)[number];

// Per-project kanji for the fallback cover tile (only shown if a project has no
// real screenshot). Keeps the card on-brand with the /work "star catalogue".
const KANJI: Record<string, string> = {
  "HX-001": "創", // found / create
  "PF-003": "雅", // miyabi — elegance / refinement (this site)
  "DL-002": "集", // gather (lead-gen)
};

const STATUS: Record<string, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-accent" },
  shipped: { label: "Shipped", dot: "bg-gold" },
};

// The home grid is a curated subset — the strongest product-UI work, in
// catalogue order. The full six (incl. the hardware / IRL builds) live on /work.
const HOME_CODES = new Set(["HX-001", "PF-003", "MN-004"]);
const homeProjects = profile.projects.filter((p) => HOME_CODES.has(p.code));

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** A single project card: real screenshot if provided, else a themed cover tile. */
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
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 340px"
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
            <ToolLogo
              key={slug}
              slug={slug}
              label={TECH_ICONS[slug]?.title ?? slug}
              className="h-4 w-4"
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
    <CurtainLink
      href={`/work#${project.code.toLowerCase()}`}
      className={cardClass}
    >
      {body}
    </CurtainLink>
  );
}

/**
 * The "View all work" call-to-action below the grid. GSAP-driven: it rises +
 * fades in as it scrolls into view, and its arrow glides on hover via a prebuilt
 * `quickTo` (buttery, no per-hover tween allocation). Reduced-motion users get
 * the static pill with the CSS colour hover only.
 */
function ViewAllCTA() {
  const root = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);
  const arrowTo = useRef<((value: number) => void) | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (arrow.current) {
        arrowTo.current = gsap.quickTo(arrow.current, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
      }
      gsap.from(root.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
        clearProps: "transform,opacity,visibility",
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-14 flex justify-center px-6 md:mt-20">
      <CurtainLink
        href="/work"
        onMouseEnter={() => arrowTo.current?.(8)}
        onMouseLeave={() => arrowTo.current?.(0)}
        className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground/[0.05] px-7 py-3.5 font-display text-lg font-semibold text-foreground shadow-[0_18px_50px_-28px_rgb(0_0_0/0.55)] backdrop-blur-md transition-[color,border-color,background-color] duration-300 hover:border-accent/55 hover:bg-foreground/[0.08] hover:text-accent md:text-xl"
      >
        View all work
        <span ref={arrow} aria-hidden className="inline-flex">
          <ArrowRight className="h-5 w-5" />
        </span>
      </CurtainLink>
    </div>
  );
}

/**
 * Selected-work showcase for the home page — a three-card grid of the strongest
 * product-UI builds, modelled on a featured-posts layout: a title + description
 * header, then the cards, which stagger in on scroll (GSAP + ScrollTrigger). A
 * GSAP "View all work" CTA closes the section into the /work catalogue.
 *
 * Themed to the sakura day/night system (washi cards, gold mono codes,
 * font-display headings) and driven by the real `profile.projects` catalogue.
 */
export function SelectedWork() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
        <Reveal>
          <Eyebrow>
            Work · <span lang="ja">制作</span>
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Selected work.
          </h2>
          <p className="mt-3 max-w-xl text-foreground/70">
            A few things I&rsquo;ve designed &amp; shipped — from a live, paying
            B2B SaaS to this very site.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {homeProjects.map((project) => (
            <div key={project.code}>
              <ProjectCard project={project} />
            </div>
          ))}
        </RevealGroup>
      </div>

      <ViewAllCTA />
    </section>
  );
}
