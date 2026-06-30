---
name: motion-craft
description: >-
  Marco Hope's interface-motion taste, encoded for AI coding agents. Apply when
  building or reviewing any web animation, micro-interaction, transition,
  gesture, or hover/focus effect — GSAP-first, 60fps, accessible by default.
  Triggers: "animate", "transition", "micro-interaction", "hover effect",
  "spring", "drag", "scroll reveal", "make it feel good".
license: MIT
---

# Motion Craft — the rules I hand my agents

I direct AI coding agents (Claude Code) to build interactive interfaces. The code
gets typed by an agent; the taste calls are mine. This file is how I make that
taste portable — it's the literal rulebook I give an agent before it writes a
single tween, so the output feels the way I'd build it by hand.

It's distilled from the components on [marcohope.com/craft](https://marcohope.com/craft),
where every rule below is running in production. None of this is theory.

> The goal isn't motion. The goal is *invisible correctness* — interactions that
> feel right and that you'd never notice were designed. Emil Kowalski quoting Paul
> Graham: "a thousand barely audible voices all singing in tune." If a user
> *notices* the animation, it's usually too much.

---

## 0. The one-line philosophy

**Motion is feedback, not decoration.** Every animation must answer a question the
user is already asking ("did that register?", "where did this come from?", "can I
drag this?"). Motion that doesn't answer a question gets cut.

---

## 1. Timing — the 300ms ceiling

- **UI feedback lands in under ~300ms.** Past that it stops feeling like a
  response and starts feeling like a wait. The liquid-glass nav pill tweens in
  **~280ms** on purpose — deliberately under the perceived-instant ceiling.
- **Default ease is `power3.out`** for functional movement: fast out of the gate,
  gentle arrival. Things should *decelerate into* their resting state, never ease
  in slowly (ease-in on entrances reads as sluggish).
- **Stagger is small** — 0.08–0.12s between siblings. Enough to read as sequence,
  not enough to make anyone wait for item six.

## 2. Performance is a feature, not an afterthought

- **Animate `transform` and `opacity` only.** They're GPU-composited and skip
  layout/paint. The one exception in my work — animating `width` on the nav pill —
  is a conscious trade I verified holds 60fps. If you must animate a layout
  property, prove the frame budget first.
- **Never allocate a tween inside a high-frequency handler.** For anything driven
  by `pointermove` (magnetic button, cursor parallax), use **`gsap.quickTo`**
  prebuilt setters. Allocating a tween per move is the #1 cause of jank under a
  fast flick.
- **`will-change: transform` is a scalpel, not a blanket.** Apply it only to the
  handful of elements actually animating continuously (marquee track, starfield
  layers, draggable thumb). Slapping it everywhere defeats it.
- **Seed your randomness.** Generative visuals (starfields, particles) use a
  deterministic PRNG (`mulberry32`) so the server and client render the same first
  frame — no hydration mismatch, no first-paint pop.

## 3. Physicality — make it feel like an object

Linear motion feels dead. Real things have momentum, overshoot, and squash.

- **Spring eases for anything that "snaps" into place.** The toggle thumb rides a
  `back.out(2.4)` so it overshoots the far edge and rebounds — *that settle is what
  sells the click.* Icon pops use `back.out(3)`. A magnetic element releases on
  `elastic.out`.
- **Squash along the direction of travel.** The toggle thumb squashes ~14% as it
  moves and rounds back out at rest. Tiny, but it's the difference between a sticker
  and a switch.
- **Parallax = depth.** When two layers move together, the foreground travels
  *further* than the background (magnetic button: body ≈0.4× cursor offset, label a
  touch more). The eye reads the difference as dimension.
- **Clamp it.** The magnetic button leans toward the cursor but is clamped to
  ±40px so it never chases the pointer off its own card. Effects need limits or
  they look broken at the extremes.

## 4. Gestures — earn the drag

- **Hand-roll on Pointer Events with `setPointerCapture`.** Capturing the pointer
  means the gesture survives the cursor/finger leaving the grabber — mouse and
  touch through one code path.
- **Decide on distance *and* velocity.** The drag-sheet dismisses if you cross 40%
  of its height **or** flick it fast (velocity in px/ms from event timestamps). A
  slow short drag springs back; a fast flick lets go. Honour intent, not just
  position.
- **Rubber-band past the bounds.** Pulling the sheet up past rest is damped to 25%
  of finger travel — resistance tells the user "this is the edge" without a hard
  stop.
- **`touch-action: none` on the draggable** so the page doesn't scroll out from
  under the gesture.

## 5. Spatial honesty — motion comes *from* somewhere

- **Reveals grow from their origin.** A popover sets its `transform-origin` to the
  *trigger's* centre (measured in px at open time) so it unfolds from the button
  you actually pressed, not from some arbitrary corner.
- **Position and animate in the same layout effect** (GSAP `useGSAP`/layout pass)
  so the element is never painted in the wrong place for a frame before it animates.
- **Measure on open, re-measure on resize.** Cached geometry goes stale; the nav
  pill re-aligns to its target on `resize`.

## 6. Accessibility is the design, not a fallback

These aren't compromises bolted on at the end. They're release gates.

- **`prefers-reduced-motion` is a first-class path, designed deliberately.** Every
  effect has a no-motion equivalent: the pill *jumps* instead of tweening, the
  toggle *snaps* with no overshoot, the magnet *sits still*, the marquee becomes a
  *static centred grid*. Read the preference **at call time**, not module load, so
  toggling the OS setting takes effect without a reload. *An animation that ignores
  reduced-motion is a bug, not a feature.*
- **Keyboard parity with pointer.** Focus drives the *exact same* motion as hover
  (the nav pill moves on focus too). Enter/Space activates, Escape closes and
  **restores focus to the trigger**, focus moves into opened dialogs/sheets and
  back out on close. Every interactive demo is a real `<button>` / `role="switch"`
  / `role="dialog"`, never a div with an onClick.
- **Don't animate keyboard-driven opens.** A popover opened by mouse scales in from
  its origin; opened by keyboard it appears *instantly* — animating UI the user
  summoned via keyboard is disorienting, not delightful.
- **Announce async results politely.** Copy-to-clipboard reports through an
  `aria-live="polite"` status region so screen-reader users hear "Copied" without
  focus jumping.
- **Respect `prefers-reduced-transparency`.** Glass/blur surfaces swap to opaque
  fills computed from the gradient's top stop.
- **Gate pointer-only flourishes** behind `@media (hover: hover) and (pointer:
  fine)` so nothing sticks after a tap on touch.

## 7. Restraint — the rules about *not* animating

- One signature motion per surface. If everything moves, nothing reads as
  intentional.
- No animation on the critical path. Content and core actions never wait on a
  flourish to finish.
- When in doubt, cut it or shorten it. The instinct that something is "a bit much"
  is almost always right.

---

## Agent checklist (paste this into the task)

Before you call an interaction done, every box must be true:

- [ ] Feedback completes in **< 300ms**; ease is `*.out` (decelerate-in).
- [ ] Only `transform`/`opacity` animate (or a measured, justified exception).
- [ ] High-frequency handlers use `quickTo` — **zero tweens allocated per move**.
- [ ] `prefers-reduced-motion` has a deliberate, tested degraded path.
- [ ] Full keyboard operation: focus = hover motion, Enter/Space, Escape + focus
      restore.
- [ ] It's a semantic element with the right `role`/`aria-*`, not a div.
- [ ] Holds **60fps** on a mid-range laptop under fast/repeated input.
- [ ] Works on touch; pointer-only effects are gated and never stick.

---

## Provenance

Every rule here is implemented and inspectable:

| Rule | Lives in |
| --- | --- |
| 300ms ceiling, animate transform/width only | Liquid-glass nav |
| `quickTo`, parallax depth, clamping | Magnetic button |
| `back.out` overshoot, squash, `role="switch"` | Spring toggle |
| Pointer-capture, velocity, rubber-band | Drag-to-dismiss sheet |
| `transform-origin`, keyboard-instant open | Origin-aware popover |
| Clipboard API + `aria-live` | Click-to-copy email |
| Seeded PRNG, surgical `will-change` | Cosmic parallax background |

— Marco Hope · [marcohope.com](https://marcohope.com)
