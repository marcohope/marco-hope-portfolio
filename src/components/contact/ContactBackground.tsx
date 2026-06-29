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
 * against it. Reduced-motion gets the poster with no scroll work. Below `md`
 * the scene can't sit centered, so the page is content-only and the scene
 * doesn't mount at all (no heavy WebGL load on phones).
 */
export function ContactBackground() {
  const [mm, setMm] = useState({ ready: false, reduced: false, mobile: false });
  const scene = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // `md` breakpoint (768px). Below it the page goes content-only.
    const phone = window.matchMedia("(max-width: 767px)");
    const sync = () =>
      setMm({ ready: true, reduced: motion.matches, mobile: phone.matches });
    sync();
    motion.addEventListener("change", sync);
    phone.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      phone.removeEventListener("change", sync);
    };
  }, []);

  // On mobile there's no scene to stream in, so tell the loading screen we're
  // "ready" — otherwise it waits on the Spline's load-complete and only clears
  // at its 8s fallback. rAF so the loader has mounted its listener; harmless if
  // it already finished.
  useEffect(() => {
    if (!mm.ready || !mm.mobile) return;
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event("hero:scene-ready")),
    );
    return () => cancelAnimationFrame(id);
  }, [mm.ready, mm.mobile]);

  // Frost the scene as the hero scrolls away — crisp at the top, fully blurred
  // and dimmed by the time the content section is in view (one viewport later).
  useEffect(() => {
    if (!mm.ready || mm.reduced || mm.mobile) return;
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
  }, [mm.ready, mm.reduced, mm.mobile]);

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      {/* The scene itself — crisp in the hero, blurred on scroll via the tween. */}
      <div ref={scene} className="absolute inset-0 will-change-[filter]">
        {mm.ready && !mm.mobile && (
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
