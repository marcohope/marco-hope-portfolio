"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer tracker for the home-hero text glow. It doesn't render anything
 * visible — it finds the `.hero-glow` letters in the hero `<section>` (its
 * parent) and, on hover, lights them up radially around the cursor: each
 * element is filled with a radial gradient clipped to its glyphs (see
 * `.hero-glow` in globals.css), and this updates each one's `--mx`/`--my` to the
 * pointer position relative to that element. Letters within the gradient's
 * radius pick up the accent; the rest stay the base ink. Hover / pointer-fine
 * only (skipped on touch); rAF-throttled.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    // A cursor spotlight makes no sense on touch / coarse pointers.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>(".hero-glow"),
    );
    if (!targets.length) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    const apply = () => {
      raf = 0;
      for (const t of targets) {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--mx", `${cx - r.left}px`);
        t.style.setProperty("--my", `${cy - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onEnter = () => targets.forEach((t) => t.classList.add("is-active"));
    const onLeave = () => targets.forEach((t) => t.classList.remove("is-active"));

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={ref} hidden aria-hidden />;
}
