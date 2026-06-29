"use client";

import { useEffect, useRef } from "react";

// `?v=` is a cache-buster — bump it whenever you re-publish the scene in Spline
// so browsers/CDN fetch the new build instead of the cached one.
const SCENE =
  "https://prod.spline.design/ZkiEcsFtYXOLwhvr/scene.splinecode?v=2";
const VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
const SCRIPT_ID = "spline-viewer-script";

type Props = {
  reducedMotion: boolean;
  /** Scene to load. Defaults to the home/work hero scene; pass another to reuse
   *  the viewer for a different page (e.g. the contact liquid-glass scene). */
  url?: string;
};

/**
 * Spline scene via the official <spline-viewer> web component with the loading
 * animation disabled (loading-anim-type="none"). The viewer script is injected
 * once on the client. Reduced-motion users get a static poster (no WebGL).
 */
export function HeroSpline({ reducedMotion, url = SCENE }: Props) {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (customElements.get("spline-viewer")) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "module";
    script.src = VIEWER_SRC;
    document.head.appendChild(script);
  }, [reducedMotion]);

  // Signal the loading screen when the scene becomes visible (load-complete) or
  // the GL context is lost. The viewer has no bare "load"/error event — listen on
  // the element (events don't bubble); the loader has its own timeout backstop too.
  useEffect(() => {
    if (reducedMotion) return;
    const el = viewerRef.current;
    if (!el) return;
    let signaled = false;
    const signal = () => {
      if (signaled) return;
      signaled = true;
      window.dispatchEvent(new Event("hero:scene-ready"));
    };
    el.addEventListener("load-complete", signal);
    el.addEventListener("context-loss", signal);
    return () => {
      el.removeEventListener("load-complete", signal);
      el.removeEventListener("context-loss", signal);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className="hero-poster absolute inset-0" aria-hidden />;
  }

  return (
    // events-target="global" lets the scene's hover / look-at-mouse events
    // respond to the pointer across the whole page, even though the canvas is a
    // background layer behind the orbital overlay.
    <spline-viewer
      ref={viewerRef}
      url={url}
      loading-anim-type="none"
      events-target="global"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
