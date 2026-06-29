"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSpline } from "@/components/hero/HeroSpline";

gsap.registerPlugin(ScrollTrigger);

// Liquid-glass scene with a cursor-following distortion bubble (built in Spline).
// Bump `?v=` whenever the scene is re-published so the CDN serves the new build.
const CONTACT_SCENE =
  "https://prod.spline.design/jRozrW0fooVONF0S/scene.splinecode?v=2";

/**
 * Fixed full-viewport liquid-glass Spline scene behind the /contact content.
 * The scene tracks the cursor globally (events-target="global" in HeroSpline),
 * so its distortion bubble still follows the pointer even with the form on top.
 * The hero shows the scene crisp and scrim-free; as the user scrolls into the
 * content section the scene frosts over (scrubbed blur + dim) so the copy reads
 * against it. Reduced-motion gets the poster with no scroll work.
 */
export function ContactBackground() {
  const [mm, setMm] = useState({ ready: false, reduced: false });
  const scene = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMm({ ready: true, reduced: q.matches });
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  // Frost the scene as the hero scrolls away — crisp at the top, fully blurred
  // and dimmed by the time the content section is in view (one viewport later).
  useEffect(() => {
    if (!mm.ready || mm.reduced) return;
    const ctx = gsap.context(() => {
      const scrub = {
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight * 0.9,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
        ease: "none" as const,
      };
      gsap.fromTo(
        scene.current,
        { filter: "blur(0px) saturate(100%)" },
        { filter: "blur(22px) saturate(125%)", ...scrub },
      );
      gsap.fromTo(dim.current, { autoAlpha: 0 }, { autoAlpha: 1, ...scrub });
    });
    return () => ctx.revert();
  }, [mm.ready, mm.reduced]);

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      {/* The scene itself — crisp in the hero, blurred on scroll via the tween. */}
      <div ref={scene} className="absolute inset-0 will-change-[filter]">
        {mm.ready && (
          <HeroSpline url={CONTACT_SCENE} reducedMotion={mm.reduced} />
        )}
      </div>
      {/* A soft dim that fades in with the blur so the content section reads.
          Starts invisible so the hero stays scrim-free. */}
      <div
        ref={dim}
        className="absolute inset-0 bg-background/55 opacity-0"
      />
    </div>
  );
}
