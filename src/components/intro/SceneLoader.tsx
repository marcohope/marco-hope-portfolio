"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MIN_MS = 3000; // floor — the screen is always seen for at least this long
const ROOT_ID = "scene-loader";

type Props = {
  /** Theme class applied to the overlay so its ground / ink / accent match the
   *  page (e.g. "theme-work", "theme-contact", "theme-about-day"). */
  themeClass: string;
  /** Wait for the Spline `hero:scene-ready` event before finishing (8s fallback).
   *  When false (pages with no 3D scene) it completes at the 3s floor. */
  waitForScene?: boolean;
  /** Small label above the counter. */
  label?: string;
};

/**
 * Liquid-glass loading screen. A frosted card slides in and counts 0 → 100%,
 * then the whole screen slides up and away to reveal the page. Held for at least
 * 3s so it always gets a beat; with `waitForScene` it also waits on the scene to
 * stream in. Colors follow `themeClass`. Skipped for reduced-motion. Shares the
 * `hero:scene-ready` signal with the route curtain.
 */
export function SceneLoader({
  themeClass,
  waitForScene = true,
  label = "Loading scene",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const start = performance.now();

    const progress = { v: 0 };
    const sync = () => setPct(Math.round(progress.v));

    // Slide-in entrance for the glass card.
    gsap.fromTo(
      card.current,
      { y: 48, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    );

    // Creep toward 92% across the minimum hold so the bar keeps moving.
    const creep = gsap.to(progress, {
      v: 92,
      duration: MIN_MS / 1000,
      ease: "power1.out",
      onUpdate: sync,
    });

    let minTimer = 0;
    const runComplete = () => {
      creep.kill();
      gsap.to(progress, {
        v: 100,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: sync,
        onComplete: () => {
          // Slide the whole screen up and off to reveal the page.
          gsap.to(root.current, {
            yPercent: -100,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = prevOverflow;
              // Honor a deep-link hash (e.g. /work#hx-001) that our initial
              // scrollTo(0,0) overrode while the loader held the page.
              const id = decodeURIComponent(window.location.hash.slice(1));
              if (id) document.getElementById(id)?.scrollIntoView();
              ScrollTrigger.refresh();
              setDone(true);
            },
          });
        },
      });
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      // Hold until the 3s floor even if the scene is ready (or cached) sooner.
      const remaining = Math.max(0, MIN_MS - (performance.now() - start));
      minTimer = window.setTimeout(runComplete, remaining);
    };

    let fallback = 0;
    if (waitForScene) {
      window.addEventListener("hero:scene-ready", finish, { once: true });
      fallback = window.setTimeout(finish, 8000); // backstop — no error event
    } else {
      finish(); // nothing to wait on — complete at the 3s floor
    }

    return () => {
      creep.kill();
      window.removeEventListener("hero:scene-ready", finish);
      clearTimeout(fallback);
      clearTimeout(minTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [waitForScene]);

  if (done) return null;

  return (
    <>
      {/* If JS never runs, don't let the overlay trap the page. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>#${ROOT_ID}{display:none!important}</style>`,
        }}
      />
      <div
        id={ROOT_ID}
        ref={root}
        aria-hidden
        className={`${themeClass} fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-2xl`}
      >
        <div
          ref={card}
          className="relative w-[min(86vw,360px)] overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/[0.05] p-8 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.55)] backdrop-blur-xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            {label}
          </p>
          <div className="mt-5 flex items-end gap-1">
            <span className="font-display text-6xl font-bold leading-none tabular-nums text-foreground">
              {pct}
            </span>
            <span className="mb-1.5 text-2xl font-medium text-foreground/45">
              %
            </span>
          </div>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
