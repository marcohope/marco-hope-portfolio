"use client";

import { useEffect } from "react";
import { useAboutMode, hydrateAboutMode } from "@/components/about/about-mode";
import { AboutBackground } from "@/components/about/AboutBackground";
import { CherryPetals } from "@/components/about/CherryPetals";

/**
 * Client shell for the sakura home: owns the day/night theme class and paints
 * the fixed watercolor backdrop + drifting petals behind the (server-rendered)
 * content. The day↔night toggle lives in the glass nav (GlassNav). Restores a
 * saved preference after mount (kept out of render so first paint matches the
 * server snapshot).
 */
export function AboutExperience({ children }: { children: React.ReactNode }) {
  const isNight = useAboutMode() === "night";

  useEffect(() => {
    hydrateAboutMode();
  }, []);

  return (
    <div
      className={`${
        isNight ? "theme-about-night" : "theme-about-day"
      } relative min-h-[100svh] text-foreground`}
    >
      <AboutBackground />
      <CherryPetals />
      {children}
    </div>
  );
}
