"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const ITEMS = ["Home", "Work", "Craft", "About"];

/**
 * Liquid-glass nav with a single shared "spotlight" pill that glides under the
 * hovered or focused item and settles back on the selected one. The pill is one
 * element animated by transform/width only (no layout thrash), so it holds 60fps.
 * Keyboard: focus drives the same motion; Enter/Space selects. Reduced motion →
 * the pill jumps instantly.
 */
export function LiquidGlassNavDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selected, setSelected] = useState(0);
  // The index the pill is currently parked under (selected, or hovered/focused).
  const shownRef = useRef(0);

  const moveTo = useCallback((index: number, instant = false) => {
    const track = trackRef.current;
    const pill = pillRef.current;
    const btn = btnRefs.current[index];
    if (!track || !pill || !btn) return;
    shownRef.current = index;
    const x = btn.offsetLeft;
    const width = btn.offsetWidth;
    gsap.to(pill, {
      x,
      width,
      duration: instant || prefersReducedMotion() ? 0 : 0.28,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  // Park the pill under the initial selection, and keep it aligned on resize.
  useGSAP(
    () => {
      moveTo(selected, true);
      const onResize = () => moveTo(shownRef.current, true);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: trackRef, dependencies: [] },
  );

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <nav
        aria-label="Demo navigation"
        onPointerLeave={() => moveTo(selected)}
        className="relative isolate"
        style={{
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
        }}
      >
        <div
          ref={trackRef}
          className="relative flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] p-1.5 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.18),0_18px_40px_-20px_rgb(0_0_0_/_0.7)]"
        >
          {/* Shared spotlight pill — sits behind the labels (-z-10). */}
          <span
            ref={pillRef}
            aria-hidden
            className="absolute left-0 top-1.5 -z-10 h-[calc(100%-0.75rem)] rounded-full bg-gradient-to-b from-white/25 to-white/10 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.4)]"
          />
          {ITEMS.map((label, i) => {
            const active = selected === i;
            return (
              <button
                key={label}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                type="button"
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => moveTo(i)}
                onFocus={() => moveTo(i)}
                onBlur={() => moveTo(selected)}
                onClick={() => {
                  setSelected(i);
                  moveTo(i);
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/70 ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
