import type { ComponentType } from "react";
import { LiquidGlassNavDemo } from "@/components/craft/LiquidGlassNavDemo";
import { DragSheetDemo } from "@/components/craft/DragSheetDemo";
import { OriginPopoverDemo } from "@/components/craft/OriginPopoverDemo";
import { CopyEmailDemo } from "@/components/craft/CopyEmailDemo";
import { MagneticButtonDemo } from "@/components/craft/MagneticButtonDemo";
import { SpringToggleDemo } from "@/components/craft/SpringToggleDemo";

// Single source of truth for the Craft lab. The /craft index maps over this to
// render the gallery; /craft/[slug] reads the same entry for the detail page
// (live demo, breakdown, real source, a11y). Each demo is self-contained — see
// the `sourceFile`, which the detail route reads from disk at build time so the
// code shown is always the code that runs. Motion rules → skills/motion/SKILL.md.

export type CraftItem = {
  /** URL segment: /craft/<slug>. */
  slug: string;
  title: string;
  /** One-liner for the card + detail lead + meta description. */
  summary: string;
  /** Techniques, shown as pills. */
  tags: readonly string[];
  /** "How it's built" — the implementation decisions, verbatim on both views. */
  breakdown: readonly string[];
  /** Accessibility + reduced-motion guarantees, called out on the detail page. */
  a11y: readonly string[];
  /** The live demo component (client). */
  Demo: ComponentType;
  /** Source filename under src/components/craft — read at build for the code panel. */
  sourceFile: string;
  /** Minimal copy-in usage snippet. */
  usage: string;
};

export const craftItems: readonly CraftItem[] = [
  {
    slug: "liquid-glass-nav",
    title: "Liquid Glass nav",
    summary:
      "One shared spotlight pill glides under whatever you hover or focus, then settles back on the selected item — a single animated element, not a fade per link.",
    tags: ["GSAP", "Shared element", "Keyboard"],
    breakdown: [
      "The pill is one absolutely-positioned span; on hover/focus I measure the target button's offsetLeft + width and tween x/width with power3.out (~280ms — under the 300ms perceived-instant ceiling).",
      "Only transform and width animate — no layout per frame — so it holds 60fps.",
      "Focus drives the exact same motion as hover, and Enter/Space selects; the pill re-aligns on resize.",
      "Reduced motion → the pill jumps instantly instead of tweening.",
    ],
    a11y: [
      "Focus produces the same motion as hover — keyboard and pointer are first-class.",
      "Reduced motion → the pill jumps to position with no tween.",
    ],
    Demo: LiquidGlassNavDemo,
    sourceFile: "LiquidGlassNavDemo.tsx",
    usage: `import { LiquidGlassNavDemo } from "@/components/craft/LiquidGlassNavDemo";

<LiquidGlassNavDemo />`,
  },
  {
    slug: "drag-to-dismiss-sheet",
    title: "Drag-to-dismiss sheet",
    summary:
      "A bottom sheet you can fling away. Drag past 40% of its height — or flick it down fast — to dismiss; anything less springs back. Pulling up rubber-bands.",
    tags: ["GSAP", "Pointer Events", "Gesture"],
    breakdown: [
      "Dragging is hand-rolled on Pointer Events with setPointerCapture, so the gesture survives the pointer leaving the grabber (mouse + touch alike).",
      "Release reads distance and velocity (px/ms from event timestamps): past the threshold it dismisses, otherwise GSAP springs it back to rest.",
      "Upward pulls past rest are damped to 25% for a rubber-band feel; touch-action:none stops the page scrolling under the drag.",
      "Keyboard users get an explicit Close button and Escape; focus moves into the sheet on open and back to the trigger on close.",
    ],
    a11y: [
      "Explicit Close button + Escape — the gesture is an enhancement, not the only way out.",
      "Focus moves into the sheet on open and returns to the trigger on close.",
    ],
    Demo: DragSheetDemo,
    sourceFile: "DragSheetDemo.tsx",
    usage: `import { DragSheetDemo } from "@/components/craft/DragSheetDemo";

<DragSheetDemo />`,
  },
  {
    slug: "origin-aware-popover",
    title: "Origin-aware popover",
    summary:
      "The panel grows out of the button that opened it — its transform-origin points at the trigger's centre, so it unfolds from the right spot every time.",
    tags: ["GSAP", "transform-origin", "A11y"],
    breakdown: [
      "On open I measure the trigger, clamp the panel within the stage, and set transform-origin to the trigger's centre in px.",
      "Mouse opens with a quick scale(0.96)+fade from that origin; keyboard opens instantly — animating keyboard-driven UI is disorienting.",
      "Positioning + the tween run in a GSAP layout effect, so the panel never flashes unpositioned.",
      "Escape closes and restores focus to the trigger; an outside pointerdown closes without stealing focus.",
    ],
    a11y: [
      "Keyboard opens render instantly — no disorienting motion on UI you summoned.",
      "Escape closes and restores focus to the trigger.",
    ],
    Demo: OriginPopoverDemo,
    sourceFile: "OriginPopoverDemo.tsx",
    usage: `import { OriginPopoverDemo } from "@/components/craft/OriginPopoverDemo";

<OriginPopoverDemo />`,
  },
  {
    slug: "click-to-copy-email",
    title: "Click-to-copy email",
    summary:
      "Tap the address and it's on your clipboard — the icon pops to a check and the button confirms 'Copied', then settles back. The same control ships on the contact page.",
    tags: ["GSAP", "Clipboard API", "A11y"],
    breakdown: [
      "Copy goes through the async Clipboard API, with a hidden-textarea + execCommand fallback for older or insecure contexts so it still works everywhere.",
      "On success the icon swaps Copy → Check and pops with a GSAP back.out(3) scale; the address itself stays select-all for manual copy.",
      "The result is announced through a polite aria-live status region, so screen-reader users hear 'Copied' without focus moving.",
      "Reduced motion → the icon swaps instantly with no pop.",
    ],
    a11y: [
      "Result announced via a polite aria-live region — no focus move needed.",
      "Address stays select-all for manual copy; reduced motion → instant icon swap.",
    ],
    Demo: CopyEmailDemo,
    sourceFile: "CopyEmailDemo.tsx",
    usage: `import { CopyEmailDemo } from "@/components/craft/CopyEmailDemo";

<CopyEmailDemo />`,
  },
  {
    slug: "magnetic-button",
    title: "Magnetic button",
    summary:
      "Move near it and the button leans toward your cursor — its label drifting a little further for depth — then springs back the moment you leave.",
    tags: ["GSAP", "quickTo", "Pointer"],
    breakdown: [
      "On pointermove I read the cursor's offset from the button's centre and translate the button a fraction of it (≈0.4×, clamped to ±40px) so it leans toward you without chasing the cursor off the card.",
      "Both axes run through prebuilt gsap.quickTo setters — no tween is allocated per move — so it holds 60fps under a fast flick.",
      "The label sits in its own layer and travels a touch further than the button, for a parallax sense of depth.",
      "Leaving springs everything back to rest with elastic.out. It's a real button (keyboard-focusable, Enter/Space activates); the magnet is pointer-only, and reduced motion → it sits still.",
    ],
    a11y: [
      "A real, keyboard-focusable button — Enter/Space activates.",
      "The magnet is pointer-only; reduced motion → it sits still.",
    ],
    Demo: MagneticButtonDemo,
    sourceFile: "MagneticButtonDemo.tsx",
    usage: `import { MagneticButtonDemo } from "@/components/craft/MagneticButtonDemo";

<MagneticButtonDemo />`,
  },
  {
    slug: "spring-loaded-toggle",
    title: "Spring-loaded toggle",
    summary:
      "A switch whose thumb overshoots the far edge and settles back — squashing a little as it travels — so flipping it feels physical, not linear.",
    tags: ["GSAP", "back.out", "A11y"],
    breakdown: [
      "The thumb travels on a GSAP back.out(2.4) spring, so it overshoots the far edge and rebounds — that little settle is what sells the 'click'.",
      "As it moves the thumb squashes ~14% along its direction of travel, then rounds back out at rest, like a physical switch.",
      "The track colour crossfades neutral ↔ accent in lockstep with the throw.",
      "It's a real role=switch — aria-checked, Tab to focus, Space/Enter to flip, with a visible focus ring; reduced motion snaps it with no overshoot.",
    ],
    a11y: [
      'Real role="switch" with aria-checked — Tab to focus, Space/Enter to flip, visible focus ring.',
      "Reduced motion snaps it with no overshoot.",
    ],
    Demo: SpringToggleDemo,
    sourceFile: "SpringToggleDemo.tsx",
    usage: `import { SpringToggleDemo } from "@/components/craft/SpringToggleDemo";

<SpringToggleDemo />`,
  },
];

export const craftSlugs = craftItems.map((c) => c.slug);

export function getCraftItem(slug: string): CraftItem | undefined {
  return craftItems.find((c) => c.slug === slug);
}
