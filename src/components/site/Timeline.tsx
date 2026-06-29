"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/lib/profile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Career timeline whose gold "brushstroke" line DRAWS as you scroll through it
 * (scaleY scrubbed to scroll position) over a faint static track — connecting
 * each entry in turn. The crimson seal nodes light up and the entries rise in as
 * the drawing line reaches them. Reduced-motion → static, fully-drawn, all nodes
 * lit and visible.
 */
export function Timeline({ items }: { items: Profile["journey"] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set(".timeline-line-fill", { scaleY: 1 });
        nodes.forEach((n) =>
          n.querySelector(".timeline-dot")?.classList.add("is-active"),
        );
        return;
      }

      // The connective line draws with scroll (scrubbed), linking the entries.
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            end: "bottom 72%",
            scrub: true,
          },
        },
      );

      // Each entry rises in and its node lights as the line reaches it; content
      // stays put once revealed, node dims again on the way back up.
      nodes.forEach((node) => {
        const dot = node.querySelector<HTMLElement>(".timeline-dot");
        gsap.set(node, { autoAlpha: 0, x: 16 });
        ScrollTrigger.create({
          trigger: node,
          start: "top 82%",
          onEnter: () => {
            gsap.to(node, {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              overwrite: true,
            });
            dot?.classList.add("is-active");
          },
          onLeaveBack: () => dot?.classList.remove("is-active"),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-10 pl-8">
      {/* Faint full-height track, then the scroll-drawn fill over it. */}
      <span
        aria-hidden
        className="absolute bottom-2 left-0 top-2 w-0.5 bg-gold/15"
      />
      <span
        aria-hidden
        className="timeline-line-fill absolute bottom-2 left-0 top-2 w-0.5 origin-top bg-gold/60 [transform:scaleY(0)]"
      />
      <ol className="space-y-10">
        {items.map((j) => (
          <li key={`${j.org}-${j.period}`} className="timeline-node relative">
            <span
              aria-hidden
              className="timeline-dot absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full bg-accent/40 ring-4 ring-card transition-[background-color,transform,box-shadow] duration-300"
            />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
              {j.period}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold">{j.title}</h3>
            <p className="text-sm text-foreground/60">{j.org}</p>
            <p className="mt-1.5 max-w-prose text-sm text-foreground/70">
              {j.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
