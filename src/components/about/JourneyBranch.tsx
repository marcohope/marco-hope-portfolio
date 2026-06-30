"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import type { Profile } from "@/lib/profile";
import { PETAL_PATH, PETAL_VIEWBOX, blossomPetalPaths } from "@/lib/sakura";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Physics2DPlugin);

// Marker column / blossom geometry. The bough SVG and each blossom SVG share
// the same column width and are both centred in it, so the bough always runs
// dead-centre through every blossom with zero pixel-tuning (layout-driven).
const COL = "3.5rem"; // marker column width
const BLOSSOM_VB = 80; // blossom viewBox is 0 0 80 80
const C = BLOSSOM_VB / 2; // blossom centre
const PETALS = blossomPetalPaths(C, C, 0.72); // five petals per blossom
const BURST = 16; // pooled finale petals (capped harder on mobile)

/**
 * The Journey as one hand-inked sakura bough ("Hitoeda" — one branch, four
 * seasons). A gold brush-line draws down the panel scrubbed to scroll; as it
 * reaches each role a blossom unfurls from the branch (petals scale out from
 * their shared centre), a crimson hanko seal stamps at the heart, and the
 * entry's text rises in. The final, oldest entry bursts — releasing the same
 * petals that drift across the whole site, so the branch is revealed as their
 * source.
 *
 * Built on transform/opacity + a single scrubbed DrawSVG line (compositor-
 * friendly); colour comes entirely from theme tokens so day↔night carries for
 * free. Reduced-motion / no-JS: a finished painting — bough fully inked, every
 * blossom open, every seal lit, all text present (the static default render).
 */
export function JourneyBranch({ items }: { items: Profile["journey"] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const nodes = gsap.utils.toArray<HTMLElement>(".journey-node", el);
      // The blossoms reverse on scroll-up, but the finale petal storm is a
      // one-shot — never re-fire it when the user scrolls back down past it.
      let stormFired = false;

      // ── The bough inks itself down, scrubbed to scroll ──────────────────
      gsap.fromTo(
        el.querySelector(".bough-fill"),
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );

      // ── Each role blooms as the line reaches it (discrete, not scrubbed) ──
      nodes.forEach((node, i) => {
        const petals = node.querySelectorAll(".blossom-petal");
        const heart = node.querySelectorAll(".blossom-heart");
        const lines = node.querySelectorAll(".journey-line");

        // Hidden start state. svgOrigin pins every petal's scale to the shared
        // blossom centre, so scaling 0→1 reads as an unfurl from the branch.
        gsap.set(petals, { scale: 0, svgOrigin: `${C} ${C}` });
        gsap.set(heart, { scale: 0, svgOrigin: `${C} ${C}` });
        gsap.set(lines, { autoAlpha: 0, y: 14 });

        ScrollTrigger.create({
          trigger: node,
          start: "top 80%",
          onEnter: () => {
            // hanko seal stamps first, with overshoot…
            gsap.to(heart, {
              scale: 1,
              duration: 0.45,
              ease: "back.out(2.4)",
            });
            // …then the petals unfurl around it…
            gsap.to(petals, {
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.7)",
              stagger: 0.05,
            });
            // …and the text rises in.
            gsap.to(lines, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
            });
            if (i === nodes.length - 1 && !stormFired) {
              stormFired = true;
              releasePetals(el, node, isMobile);
            }
          },
          onLeaveBack: () => {
            gsap.to(petals, {
              scale: 0,
              duration: 0.3,
              ease: "power2.in",
              stagger: { each: 0.03, from: "end" },
            });
            gsap.to(heart, { scale: 0, duration: 0.3, ease: "power2.in" });
            gsap.to(lines, { autoAlpha: 0, y: 14, duration: 0.3 });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-10">
      {/* The bough — a faint full-height track with the gold draw over it. Both
          paths share one geometry; preserveAspectRatio="none" lets the column
          stretch to the content height while the gentle wave is preserved. */}
      <svg
        aria-hidden
        className="journey-bough pointer-events-none absolute left-0 top-0 h-full"
        style={{ width: COL }}
        viewBox="0 0 56 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="bough-track"
          d="M28 6 C 19 180, 38 360, 26 540 C 16 700, 38 870, 28 998"
        />
        <path
          className="bough-fill"
          d="M28 6 C 19 180, 38 360, 26 540 C 16 700, 38 870, 28 998"
        />
      </svg>

      {/* Pooled finale petals — released from the last blossom into the page. */}
      <div className="petal-burst-layer pointer-events-none absolute inset-0 overflow-visible">
        {Array.from({ length: BURST }).map((_, i) => (
          <svg
            key={i}
            aria-hidden
            className="burst-petal petal"
            width="18"
            height="22"
            viewBox={PETAL_VIEWBOX}
            fill="currentColor"
          >
            <path d={PETAL_PATH} />
          </svg>
        ))}
      </div>

      <ol className="relative space-y-12">
        {items.map((j) => (
          <li
            key={`${j.org}-${j.period}`}
            className="journey-node grid items-start gap-4"
            style={{ gridTemplateColumns: `${COL} 1fr` }}
          >
            {/* Marker cell: the blossom, centred over the bough. */}
            <span className="relative h-14">
              <svg
                aria-hidden
                className="blossom absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2"
                viewBox={`0 0 ${BLOSSOM_VB} ${BLOSSOM_VB}`}
                fill="none"
              >
                {PETALS.map((d, pi) => (
                  <path key={pi} className="blossom-petal" d={d} />
                ))}
                {/* hanko seal: soft accent halo + solid crimson heart */}
                <circle className="blossom-heart blossom-glow" cx={C} cy={C} r={9} />
                <circle className="blossom-heart blossom-pistil" cx={C} cy={C} r={4.5} />
              </svg>
            </span>

            {/* Entry text — staggers in as the blossom opens. */}
            <div className="pt-0.5">
              <p className="journey-line font-mono text-xs uppercase tracking-[0.18em] text-gold">
                {j.period}
              </p>
              <h3 className="journey-line mt-1 font-display text-xl font-bold">
                {j.title}
              </h3>
              <p className="journey-line text-sm text-foreground/60">{j.org}</p>
              <p className="journey-line mt-1.5 max-w-prose text-sm text-foreground/70">
                {j.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Finale: fling the pooled petals up and out from the last blossom, then let
 * Physics2D gravity carry them down past the panel — the same silhouette and
 * theme colour as the ambient field, so they read as its source. Fires once.
 */
function releasePetals(root: HTMLElement, node: HTMLElement, isMobile: boolean) {
  const layer = root.querySelector<HTMLElement>(".petal-burst-layer");
  const blossom = node.querySelector<HTMLElement>(".blossom");
  if (!layer || !blossom) return;

  const rRoot = root.getBoundingClientRect();
  const rB = blossom.getBoundingClientRect();
  const ox = rB.left - rRoot.left + rB.width / 2;
  const oy = rB.top - rRoot.top + rB.height / 2;

  const petals = gsap.utils.toArray<HTMLElement>(".burst-petal", layer);
  const n = isMobile ? 5 : petals.length;

  petals.slice(0, n).forEach((p) => {
    gsap.set(p, {
      x: ox,
      y: oy,
      scale: gsap.utils.random(0.5, 1.05),
      rotation: gsap.utils.random(0, 360),
      opacity: 0,
    });
    gsap
      .timeline()
      .to(p, { opacity: 1, duration: 0.25 }, 0)
      .to(
        p,
        {
          duration: gsap.utils.random(1.8, 2.8),
          physics2D: {
            velocity: gsap.utils.random(130, 280),
            angle: gsap.utils.random(-120, -60), // up-and-outward
            gravity: 260,
          },
          rotation: `+=${gsap.utils.random(180, 540)}`,
          ease: "none",
        },
        0,
      )
      .to(p, { opacity: 0, duration: 0.9 }, ">-1");
  });
}
