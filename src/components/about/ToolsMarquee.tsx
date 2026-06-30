"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { profile } from "@/lib/profile";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ToolLogo } from "@/components/tech/ToolLogo";
import { TECH_ICONS } from "@/components/tech/tech-icons.generated";

gsap.registerPlugin(useGSAP);

// Split the full stack into two rows that drift in opposite directions. The
// split is interleaved (even / odd) so each row reads as a balanced mix of the
// stack rather than "first half / second half".
const ALL = profile.allTech;
const ROW_A = ALL.filter((_, i) => i % 2 === 0);
const ROW_B = ALL.filter((_, i) => i % 2 === 1);

// Render each row's slugs this many times back-to-back, then shift the track by
// exactly one copy (SHIFT% of its own width) — seamless because copy N+1 lands
// where copy N began. The loop only stays gap-free while (COPIES − 1) copies are
// at least as wide as the visible row; a single ~10-chip copy is narrower than
// the panel at its widest, so two copies flashed a sliver at the wrap. Three
// clears it with margin (max panel inner ≈ max-w-5xl).
const COPIES = 3;
const SHIFT = -100 / COPIES; // xPercent: one copy-width to the left
const repeat = (slugs: readonly string[]) =>
  Array.from({ length: COPIES }, () => slugs).flat();

/** A single tool chip — same tile vocabulary as the rest of /about (border +
 *  faint elevated fill). Holds a full-colour brand logo (ToolLogo); the tile
 *  border brightens and the mark lifts on hover. */
function Chip({ slug }: { slug: string }) {
  return (
    <li className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-elevated/30 transition-colors duration-200 hover:border-accent/50">
      <ToolLogo slug={slug} className="h-7 w-7 group-hover:scale-110" />
    </li>
  );
}

/**
 * Auto-scrolling, dual-row tool marquee for the home page. The two rows drift in
 * opposite directions over a washi panel; hovering pauses the drift so a chip
 * can be read. Each row's slugs are rendered a few times back-to-back (see
 * COPIES), so shifting the track left by one copy loops seamlessly — the next
 * copy lands exactly where the previous began.
 *
 * Reduced-motion users get a deliberate static alternate — a centered, wrapping
 * grid of the same chips, no motion — toggled purely in CSS (`motion-safe:` /
 * `motion-reduce:`), so the GSAP loop never runs against a hidden, unmeasured
 * track. The visual rows are `aria-hidden` (the duplication would double-read);
 * an `sr-only` list carries the real tool names for assistive tech.
 */
export function ToolsMarquee() {
  const region = useRef<HTMLDivElement>(null);
  const rowA = useRef<HTMLUListElement>(null);
  const rowB = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only drive the loop when motion is welcome — this matches the CSS that
      // reveals the marquee block, so we never animate the hidden static fallback.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const a = rowA.current;
        const b = rowB.current;
        if (!a || !b) return;

        // Shift each track left by one copy (SHIFT%) and repeat — the identical
        // next copy makes the wrap invisible. Row B starts a copy in and drifts
        // back to 0 (rightward). Slightly different durations keep the two rows
        // from visually syncing into a single block.
        const tweens = [
          gsap.to(a, { xPercent: SHIFT, duration: 38, ease: "none", repeat: -1 }),
          gsap.fromTo(
            b,
            { xPercent: SHIFT },
            { xPercent: 0, duration: 46, ease: "none", repeat: -1 },
          ),
        ];

        // Pause on hover so a chip can be read mid-drift.
        const el = region.current;
        if (!el) return;
        const pause = () => tweens.forEach((t) => t.pause());
        const play = () => tweens.forEach((t) => t.resume());
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", play);
        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", play);
        };
      });
    },
    { scope: region },
  );

  return (
    <section ref={region} className="washi p-7 md:p-10">
      <h2 className="sr-only">Skills and tools</h2>
      <Eyebrow>
        Tools · <span lang="ja">道具</span>
      </Eyebrow>

      {/* Motion path: two opposite-drifting rows, edges masked to fade. */}
      <div
        aria-hidden
        className="mt-7 hidden flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-safe:flex"
      >
        <div className="overflow-hidden">
          <ul ref={rowA} className="flex w-max gap-4 will-change-transform">
            {repeat(ROW_A).map((slug, i) => (
              <Chip key={`a-${slug}-${i}`} slug={slug} />
            ))}
          </ul>
        </div>
        <div className="overflow-hidden">
          <ul ref={rowB} className="flex w-max gap-4 will-change-transform">
            {repeat(ROW_B).map((slug, i) => (
              <Chip key={`b-${slug}-${i}`} slug={slug} />
            ))}
          </ul>
        </div>
      </div>

      {/* Reduced-motion path: the same chips, static and centered. */}
      <ul
        aria-hidden
        className="mt-7 flex flex-wrap justify-center gap-4 motion-safe:hidden"
      >
        {ALL.map((slug) => (
          <Chip key={`static-${slug}`} slug={slug} />
        ))}
      </ul>

      {/* Accessible name list — the visual rows are aria-hidden. */}
      <ul className="sr-only">
        {ALL.map((slug) => (
          <li key={`label-${slug}`}>{TECH_ICONS[slug]?.title ?? slug}</li>
        ))}
      </ul>
    </section>
  );
}
