"use client";

import { Sun, Moon } from "lucide-react";
import { useAboutMode, toggleAboutMode } from "@/components/about/about-mode";

/**
 * Persistent sun↔moon switch for the /about day/night experience. Fixed bottom-
 * right so the scene can be flipped from anywhere on the page. The knob morphs
 * (sun → moon) and slides; the inactive side shows a faint hint icon.
 */
export function DayNightToggle() {
  const isNight = useAboutMode() === "night";

  return (
    <button
      type="button"
      onClick={toggleAboutMode}
      aria-pressed={isNight}
      aria-label={isNight ? "Switch to daytime view" : "Switch to nighttime view"}
      title={isNight ? "Daytime" : "Nighttime"}
      className="washi group fixed bottom-5 right-5 z-30 flex h-10 w-[4.5rem] items-center rounded-full px-1 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:bottom-7 md:right-7"
    >
      <Sun
        aria-hidden
        className="pointer-events-none absolute left-2 h-4 w-4 text-gold/60"
      />
      <Moon
        aria-hidden
        className="pointer-events-none absolute right-2 h-4 w-4 text-[#9aa6dd]/70"
      />
      <span
        className={`relative z-10 grid h-8 w-8 place-items-center rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNight
            ? "translate-x-8 bg-gradient-to-br from-[#cdd6ff] to-[#8a93c8]"
            : "translate-x-0 bg-gradient-to-br from-[#ffd76b] to-[#e8a13a]"
        }`}
      >
        {isNight ? (
          <Moon className="h-4 w-4 text-[#1c2039]" />
        ) : (
          <Sun className="h-4 w-4 text-white" />
        )}
      </span>
    </button>
  );
}
