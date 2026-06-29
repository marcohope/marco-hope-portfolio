"use client";

import Image from "next/image";
import day from "@/assets/about/day.png";
import night from "@/assets/about/night.png";
import { useAboutMode } from "@/components/about/about-mode";

/**
 * Full-bleed, fixed watercolor backdrop for /about. Both the daytime and the
 * moonlit scene are layered and crossfaded on the day↔night toggle; each scene
 * carries its own legibility scrim (lifted top for the nav, deeper bottom for
 * the content washi). Static imports give automatic width/height + blur-up.
 */
export function AboutBackground() {
  const isNight = useAboutMode() === "night";

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      {/* Day scene */}
      <div
        className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
        style={{ opacity: isNight ? 0 : 1 }}
      >
        <Image
          src={day}
          alt=""
          fill
          priority={false}
          fetchPriority="high"
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#efe2d4]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf3ea]/30 to-transparent to-40%" />
      </div>

      {/* Night scene */}
      <div
        className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
        style={{ opacity: isNight ? 1 : 0 }}
      >
        <Image
          src={night}
          alt=""
          fill
          priority={false}
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c1a]/45 via-[#0b0d1c]/12 to-[#0a0c1a]/78" />
      </div>
    </div>
  );
}
