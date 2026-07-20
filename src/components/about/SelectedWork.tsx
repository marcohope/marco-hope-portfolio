"use client";

import { useRef, type ReactNode } from "react";
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
import { Reveal } from "@/components/site/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = (typeof profile.projects)[number];

const STATUS: Record<string, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-accent" },
  shipped: { label: "Shipped", dot: "bg-gold" },
};

// The five flagship builds carry the whole section as full-width hero cards, in
// this deliberate order (Halix leads). The full catalogue — incl. Minoa and the
// hardware / IRL builds — lives on /work. `visit` false = the project's live URL
// is this very site, so the card links its image to the case study instead of
// out; `caseStudy` true adds a "Read case study" action into /work.
const FEATURED: {
  code: string;
  label: string;
  kanji: string;
  visit?: boolean;
  caseStudy?: boolean;
}[] = [
  { code: "HX-001", label: "Main project", kanji: "主作", caseStudy: true },
  { code: "6A-008", label: "Featured build", kanji: "秀作" },
  { code: "NS-007", label: "Signature build", kanji: "名作" },
  { code: "PF-003", label: "This very site", kanji: "雅", visit: false, caseStudy: true },
  { code: "FR-009", label: "Latest build", kanji: "新作" },
];
const featuredProjects = FEATURED.map((f) => ({
  ...f,
  project: profile.projects.find((p) => p.code === f.code)!,
}));

/** A flagship build: a full-width cinematic banner with name/blurb/tech below.
 * `visit` renders an external "Visit project" link (and wires the banner to it);
 * `caseStudy` adds a "Read case study" link into /work. A card with neither
 * would be inert, so when `visit` is off the banner falls back to the case study. */
function MainProjectCard({
  project,
  eyebrow,
  priority = false,
  visit = true,
  caseStudy = false,
}: {
  project: Project;
  eyebrow: ReactNode;
  priority?: boolean;
  visit?: boolean;
  caseStudy?: boolean;
}) {
  const status = STATUS[project.status] ?? STATUS.shipped;
  const caseHref = `/work#${project.code.toLowerCase()}`;

  const banner = (
    <div className="relative aspect-[16/9] overflow-clip rounded-xl border border-border/60 md:aspect-[21/9]">
      <Image
        src={project.image}
        alt={`${project.name} — ${project.kind}`}
        fill
        sizes="(max-width: 768px) 100vw, 1024px"
        placeholder="blur"
        priority={priority}
        className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="rounded-md bg-background/55 px-2.5 py-1 font-mono text-xs tracking-wider text-gold backdrop-blur-sm">
          {project.code}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background/55 px-3 py-1 text-xs font-medium text-foreground/85 backdrop-blur-sm">
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>
    </div>
  );

  return (
    <Reveal className="washi washi-hover group overflow-hidden p-4 md:p-5">
      {visit ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          {banner}
        </a>
      ) : (
        <CurtainLink href={caseHref} className="block">
          {banner}
        </CurtainLink>
      )}

      <div className="px-1 pt-5 md:px-2">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground/55">
          {project.kind}
        </p>
        <p className="mt-3 max-w-2xl text-foreground/70 md:text-lg">
          {project.blurb}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-accent">
            {project.metric}
          </span>
          <span className="flex items-center gap-2.5 text-foreground/55">
            {project.tech.map((slug) => (
              <ToolLogo
                key={slug}
                slug={slug}
                label={TECH_ICONS[slug]?.title ?? slug}
                className="h-4 w-4"
              />
            ))}
          </span>
          {visit && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors hover:text-accent"
            >
              Visit project
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
          {caseStudy && (
            <CurtainLink
              href={caseHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors hover:text-accent"
            >
              Read case study
              <ArrowRight className="h-4 w-4" />
            </CurtainLink>
          )}
        </div>
      </div>
    </Reveal>
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
 * Selected-work showcase for the home page — five full-width flagship hero cards
 * (Halix leads), each a cinematic banner with name/blurb/tech and its actions,
 * revealing in on scroll (GSAP + ScrollTrigger). A GSAP "View all work" CTA
 * closes the section into the /work catalogue.
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
            A few things I&rsquo;ve designed &amp; shipped — from a custom AI
            automation studio to this very site.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {featuredProjects.map(({ code, label, kanji, project, visit, caseStudy }, i) => (
            <MainProjectCard
              key={code}
              project={project}
              eyebrow={
                <>
                  {label} · <span lang="ja">{kanji}</span>
                </>
              }
              priority={i === 0}
              visit={visit ?? true}
              caseStudy={caseStudy ?? false}
            />
          ))}
        </div>
      </div>

      <ViewAllCTA />
    </section>
  );
}
