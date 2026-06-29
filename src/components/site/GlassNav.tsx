"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { SkyToggle } from "@/components/ui/sky-toggle";
import { useAboutMode, toggleAboutMode } from "@/components/about/about-mode";
import { useReducedTransparency } from "@/lib/use-reduced-transparency";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Craft", href: "/craft" },
  { label: "Contact", href: "/contact" },
];

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#9e4668] focus-visible:ring-offset-0";

/**
 * Floating glass header for the sakura home. A fixed, inset bar of frosted
 * white glass that lifts (stronger shadow) once you scroll past ~8px. Its ink
 * and fill invert to a plum dark mode driven by the day↔night store — so this
 * bar also *is* the theme toggle (the old floating slider is retired). Lives
 * on `/` only; the inner routes keep <InnerNav>.
 */
export function GlassNav({
  tone = "sakura",
}: {
  tone?: "sakura" | "work" | "contact" | "craft";
}) {
  const isWork = tone === "work";
  const isContact = tone === "contact";
  const isCraft = tone === "craft";
  const aboutNight = useAboutMode() === "night";
  // Work, contact + craft tones are their own fixed schemes — they ignore day/night.
  const isNight = !isWork && !isContact && !isCraft && aboutNight;
  const reduceTransparency = useReducedTransparency();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Home matches only "/"; the inner routes match their prefix.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Lift the bar off the page past a small scroll threshold. Snappy, no delay.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The open menu is a dialog: move focus into it and trap Tab inside, so
  // keyboard/screen-reader users stay within the menu until they close it
  // (Escape, above, or the toggle). The closed menu is `inert`, so this only
  // runs while it's the active surface.
  useEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) return;
    const focusables = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    menu.addEventListener("keydown", onKey);
    return () => menu.removeEventListener("keydown", onKey);
  }, [open]);

  // Glass material — exact rgb per spec; fill/border/shadow swap for dark mode,
  // shadow strengthens when scrolled. backdrop-filter carries the -webkit- prefix.
  // Contact pushes the blur + saturation harder for a true liquid-glass read
  // over the watery Spline scene.
  const blurFx = isContact
    ? "blur(26px) saturate(180%)"
    : "blur(18px) saturate(150%)";
  const glass: React.CSSProperties = {
    backdropFilter: blurFx,
    WebkitBackdropFilter: blurFx,
    background: isWork
      ? "rgb(16 22 38 / 0.55)"
      : isContact
        ? "rgb(255 255 255 / 0.07)"
        : isCraft
          ? "rgb(20 16 32 / 0.5)"
          : isNight
            ? "rgb(30 22 40 / 0.45)"
            : "rgb(255 255 255 / 0.16)",
    border: isWork
      ? "1px solid rgb(120 168 255 / 0.2)"
      : isContact
        ? "1px solid rgb(255 255 255 / 0.4)"
        : isCraft
          ? "1px solid rgb(167 139 250 / 0.22)"
          : isNight
            ? "1px solid rgb(255 255 255 / 0.1)"
            : "1px solid rgb(255 255 255 / 0.32)",
    boxShadow: isContact
      ? scrolled
        ? "inset 0 1px 0 0 rgb(255 255 255 / 0.65), inset 0 0 0 1px rgb(255 255 255 / 0.06), 0 20px 50px -14px rgb(0 0 0 / 0.55)"
        : "inset 0 1px 0 0 rgb(255 255 255 / 0.55), 0 10px 30px -16px rgb(0 0 0 / 0.4)"
      : isWork || isNight || isCraft
        ? scrolled
          ? "inset 0 1px 0 0 rgb(255 255 255 / 0.12), 0 18px 48px -12px rgb(0 0 0 / 0.6)"
          : "inset 0 1px 0 0 rgb(255 255 255 / 0.12), 0 8px 24px -12px rgb(0 0 0 / 0.45)"
        : scrolled
          ? "inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 18px 48px -12px rgb(43 39 51 / 0.45)"
          : "inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 8px 24px -12px rgb(43 39 51 / 0.3)",
  };

  // Menu panel: same material, a touch more transparent + softer blur.
  const menuBlur = isContact
    ? "blur(26px) saturate(180%)"
    : "blur(20px) saturate(150%)";
  const menuGlass: React.CSSProperties = {
    backdropFilter: menuBlur,
    WebkitBackdropFilter: menuBlur,
    background: isWork
      ? "rgb(16 22 38 / 0.72)"
      : isContact
        ? "rgb(255 255 255 / 0.09)"
        : isCraft
          ? "rgb(20 16 32 / 0.72)"
          : isNight
            ? "rgb(30 22 40 / 0.55)"
            : "rgb(255 255 255 / 0.12)",
    border: isWork
      ? "1px solid rgb(120 168 255 / 0.2)"
      : isContact
        ? "1px solid rgb(255 255 255 / 0.35)"
        : isCraft
          ? "1px solid rgb(167 139 250 / 0.22)"
          : isNight
            ? "1px solid rgb(255 255 255 / 0.1)"
            : "1px solid rgb(255 255 255 / 0.28)",
    boxShadow:
      isWork || isNight || isContact || isCraft
        ? "0 18px 48px -16px rgb(0 0 0 / 0.6)"
        : "0 18px 48px -16px rgb(43 39 51 / 0.35)",
  };

  // prefers-reduced-transparency: drop the blur and swap the translucent fill
  // for an opaque one. The dark tones (incl. contact, whose ink is white) get a
  // solid dark bar; the light sakura day bar stays light under its dark ink.
  if (reduceTransparency) {
    const solid =
      isWork
        ? "rgb(15 21 36)"
        : isContact
          ? "rgb(17 23 38)"
          : isCraft
            ? "rgb(17 14 28)"
            : isNight
              ? "rgb(26 19 35)"
              : "rgb(250 246 250)";
    glass.backdropFilter = glass.WebkitBackdropFilter = "none";
    menuGlass.backdropFilter = menuGlass.WebkitBackdropFilter = "none";
    glass.background = menuGlass.background = solid;
  }

  // Ink tokens — work is white-on-blue; sakura inverts light on the plum night.
  const inkStrong = isWork
    ? "text-[#eef2f8]"
    : isContact
      ? "text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.6)]"
      : isCraft
        ? "text-[#f3f1fa]"
        : isNight
          ? "text-[#f2ecf3]"
          : "text-[#2b2733]";
  const inkMuted = isWork
    ? "text-[#c4ccda] hover:text-[#eef2f8]"
    : isContact
      ? "text-white/80 hover:text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.6)]"
      : isCraft
        ? "text-[#b6aecf] hover:text-[#f3f1fa]"
        : isNight
          ? "text-[#bdb1c8] hover:text-[#f2ecf3]"
          : "text-[#4a4452] hover:text-[#2b2733]";

  // Persistent "Let's talk" CTA — a subtle accent-outline pill that tints on
  // hover, with the per-tone accent so it reads against each glass scheme. The
  // wordmark/links stay text; this is the one emphasized action. (Hidden on the
  // contact route, where it would point at the page you're already on.)
  const ctaInk = isWork
    ? "border-[#78a8ff]/45 text-[#eef2f8] hover:bg-[#78a8ff]/15"
    : isCraft
      ? "border-[#a78bfa]/45 text-[#f3f1fa] hover:bg-[#a78bfa]/15"
      : isNight
        ? "border-[#e6a9c0]/45 text-[#f2ecf3] hover:bg-[#e6a9c0]/14"
        : "border-[#9e4668]/45 text-[#2b2733] hover:bg-[#9e4668]/12";

  // Active-page highlight — a soft pill behind the current link (replaces the
  // old underline), with a fainter version on hover. Tone-aware so it reads on
  // both the light sakura bar and the dark inner-route bars.
  const navItem =
    isWork || isContact || isCraft || isNight
      ? { active: "bg-white/10", hover: "hover:bg-white/5" }
      : { active: "bg-[#2b2733]/10", hover: "hover:bg-[#2b2733]/5" };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <nav
        aria-label="Primary"
        style={glass}
        className="mx-auto flex max-w-[1152px] items-center justify-between rounded-2xl px-4 py-3 transition-shadow duration-200 ease-out motion-reduce:transition-none md:px-6"
      >
        {/* Wordmark */}
        <CurtainLink
          href="/"
          aria-label="Marco Hope — home"
          className={`rounded-sm font-serif text-xl leading-none tracking-tight transition-colors ${inkStrong} ${FOCUS_RING}`}
        >
          Marco Hope
        </CurtainLink>

        {/* Desktop cluster */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <CurtainLink
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors motion-reduce:transition-none ${
                      active
                        ? `${inkStrong} ${navItem.active}`
                        : `${inkMuted} ${navItem.hover}`
                    } ${FOCUS_RING}`}
                  >
                    {l.label}
                  </CurtainLink>
                </li>
              );
            })}
          </ul>

          {!isContact && (
            <CurtainLink
              href="/contact"
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${ctaInk} ${FOCUS_RING}`}
            >
              Let&rsquo;s talk
            </CurtainLink>
          )}

          {!isWork && !isContact && !isCraft && (
            <SkyToggle
              checked={isNight}
              onChange={toggleAboutMode}
              label={
                isNight ? "Switch to daytime view" : "Switch to nighttime view"
              }
            />
          )}
        </div>

        {/* Mobile cluster */}
        <div className="flex items-center gap-1 md:hidden">
          {!isWork && !isContact && !isCraft && (
            <SkyToggle
              checked={isNight}
              onChange={toggleAboutMode}
              label={
                isNight ? "Switch to daytime view" : "Switch to nighttime view"
              }
            />
          )}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="home-menu"
            className={`grid h-11 w-11 place-items-center rounded-md transition-colors ${inkMuted} ${FOCUS_RING}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — glass panel dropped 8px below the bar. A focus-trapped
          dialog while open (see effect above); inert while closed. */}
      <div
        id="home-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`mx-auto mt-2 max-w-[1152px] origin-top transition duration-200 ease-out motion-reduce:transition-none md:hidden ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div style={menuGlass} className="rounded-2xl p-2">
          <ul className="flex flex-col">
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <CurtainLink
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base transition-colors motion-reduce:transition-none ${FOCUS_RING} ${
                      active
                        ? `${inkStrong} ${navItem.active}`
                        : `${inkMuted} ${navItem.hover}`
                    }`}
                  >
                    {l.label}
                  </CurtainLink>
                </li>
              );
            })}
          </ul>
          {!isContact && (
            <CurtainLink
              href="/contact"
              onClick={() => setOpen(false)}
              className={`mt-1 block rounded-xl border px-4 py-3 text-center text-base font-semibold transition-colors motion-reduce:transition-none ${ctaInk} ${FOCUS_RING}`}
            >
              Let&rsquo;s talk
            </CurtainLink>
          )}
        </div>
      </div>
    </header>
  );
}
