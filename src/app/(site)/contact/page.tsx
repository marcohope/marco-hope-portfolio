import type { Metadata } from "next";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactBackground } from "@/components/contact/ContactBackground";
import { SceneLoader } from "@/components/intro/SceneLoader";
import { ScrollCue } from "@/components/site/ScrollCue";
import { GlassNav } from "@/components/site/GlassNav";
import { Reveal } from "@/components/site/reveal";
import { FlipLinks, type FlipLinkItem } from "@/components/ui/flip-links";
import { CopyEmail } from "@/components/ui/copy-email";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Work with Marco Hope — a design engineer building high-craft, motion-led websites for startups and premium brands. Available for freelance projects.",
  alternates: { canonical: "/contact" },
};

// "Work with me" email opens with a prefilled subject so the draft isn't blank.
const PROJECT_MAILTO = `${profile.links.email}?subject=${encodeURIComponent(
  "Let's work together",
)}`;

// The contact destinations, rendered as big "flip" links (see flip-links.tsx).
// (No "Website" row — it would point back to this very portfolio.)
const socials: FlipLinkItem[] = [
  { label: "Email", href: PROJECT_MAILTO },
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
];

// Channels that don't exist yet — shown as disabled "Soon" pills so the set
// reads as intentional rather than missing. No real links (see decisions).
const soon = ["YouTube", "X"];

const EMAIL = profile.links.email.replace("mailto:", "");

export default function ContactPage() {
  return (
    <div className="theme-contact relative bg-background text-foreground">
      {/* Liquid-glass loading screen — counts up while the scene streams in. */}
      <SceneLoader themeClass="theme-contact" />

      {/* Floating liquid-glass header (same bar as home, in the contact tone). */}
      <GlassNav tone="contact" />

      {/* Fixed liquid-glass Spline scene with a cursor-following distortion bubble. */}
      <ContactBackground />

      <div className="relative z-10">
        {/* Hero — the Spline scene stands alone; just a cue to scroll for the
            rest. The copy lives in the section below so it arrives on scroll.
            Desktop only: below `md` the liquid-glass scene can't sit centered,
            so we drop the hero (and the scene, in ContactBackground) and lead
            straight with the content. */}
        <section className="relative hidden min-h-[100svh] flex-col justify-end px-6 pb-24 md:flex md:px-10 md:pb-28">
          <ScrollCue />
        </section>

        {/* Content — revealed on scroll behind the hero on desktop; the whole
            page on mobile, so it gets top padding there to clear the nav. */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-0">
          <Reveal className="max-w-2xl [text-shadow:_0_2px_28px_rgb(0_0_0_/_0.55)]">
            <Eyebrow>Contact · Get in touch</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(3rem,12vw,6rem)] font-bold leading-[0.95] tracking-tight">
              Let&rsquo;s work together.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-foreground/70">
              {profile.location} · available for freelance projects. Tell me
              your vision and I&rsquo;ll get back fast.
            </p>
            <p className="mt-2 max-w-xl text-sm text-foreground/55">
              Also open to Winter 2027 co-op roles.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur-md">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/60"
              />
              Available for new work
            </span>
          </Reveal>

          <div className="mt-14">
            <h2 className="sr-only">Ways to reach me</h2>
            <Reveal>
              <FlipLinks
                items={socials}
                itemClassName="text-4xl sm:text-6xl md:text-7xl [text-shadow:_0_2px_28px_rgb(0_0_0_/_0.55)]"
              />
            </Reveal>
            {/* Click-to-copy address (the Email flip-link above handles the
                mailto: click; this is the no-app-switch path). */}
            <div className="mt-8">
              <CopyEmail email={EMAIL} />
            </div>

            {/* Channels that aren't live yet — disabled "Soon" pills. */}
            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {soon.map((label) => (
                <li key={label}>
                  <span
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-foreground/40"
                  >
                    {label}
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/35">
                      Soon
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

        {/* Footer mini-nav */}
        <nav className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.22em] text-foreground/55">
              Thanks for stopping by
            </p>
            <p className="text-xs tracking-wide text-foreground/55">
              &copy; {new Date().getFullYear()} Marco Hope
            </p>
          </div>
          <div className="flex items-center gap-6">
            <CurtainLink
              href="/work"
              className="group inline-flex items-center gap-1.5 py-2 -my-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              Work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </CurtainLink>
            <CurtainLink
              href="/"
              className="group inline-flex items-center gap-1.5 py-2 -my-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              Home
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </CurtainLink>
          </div>
        </nav>
        </section>
      </div>
    </div>
  );
}
