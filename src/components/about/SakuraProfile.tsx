import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProfilePortrait } from "@/components/about/ProfilePortrait";
import { HeroSpotlight } from "@/components/about/HeroSpotlight";
import { CredentialList } from "@/components/about/CredentialList";
import { JourneyBranch } from "@/components/about/JourneyBranch";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { ScrollScene } from "@/components/site/scroll-scene";
import { SelectedWork } from "@/components/about/SelectedWork";
import { ToolsMarquee } from "@/components/about/ToolsMarquee";
import { profile } from "@/lib/profile";
import marcoReading from "@/assets/about/marco-reading.jpg";
import marcoRiverbank from "@/assets/about/marco-riverbank.jpg";

// Teasers for the closing CTAs — derived from the project list so the home
// hint can't drift from the actual /work catalogue.
const featured =
  profile.projects.find((p) => p.featured) ?? profile.projects[0];
const moreCount = profile.projects.length - 1;

/**
 * The sakura day-and-night portrait experience: headshot, name, and intro over
 * the open sky, then the tools marquee and selected work, followed by the washi
 * content stack (bio, journey, awards, certifications) and the closing CTAs into
 * /work and /contact.
 * Rendered inside <AboutExperience>, which supplies the day↔night theme,
 * watercolor backdrop, drifting petals, and the toggle.
 */
export function SakuraProfile() {
  return (
    <div className="relative z-10">
      {/* ── Hero: portrait over the open sky, day or moonlit ───────────── */}
      {/* Leave-only: the hero is visible on load; this just fades it away
          as the work section scrolls up to take its place. */}
      <ScrollScene enter={false}>
      <section className="mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <HeroSpotlight />
        <ProfilePortrait />

        <Reveal y={16} className="flex flex-col items-center gap-4">
          <Eyebrow className="hero-ink-soft justify-center">
            About · <span lang="ja">人物</span>
          </Eyebrow>
          <h1
            data-text="Marco Hope"
            className="hero-glow hero-ink font-display text-[clamp(3.4rem,13vw,7.5rem)] font-bold leading-[0.92] tracking-tight"
          >
            Marco Hope
          </h1>
          <p
            data-text="I design and build high-craft, motion-led websites for startups and premium brands."
            className="hero-glow hero-ink-soft max-w-3xl text-pretty font-display text-xl font-semibold text-foreground/90 md:text-3xl"
          >
            I design and build high-craft, motion-led websites for startups and
            premium brands.
          </p>
          <p className="hero-ink-soft text-lg text-foreground/75 md:text-xl">
            Design engineer · Computer Engineering @ York · built Halix, a live
            AI SaaS
          </p>
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-foreground/55">
            {profile.location}
          </p>
        </Reveal>

        <span
          aria-hidden
          className="hero-ink-soft mt-6 motion-safe:animate-bounce text-foreground/50"
        >
          <ChevronDown className="h-6 w-6" />
        </span>
      </section>
      </ScrollScene>

      {/* ── Tools: the full stack as a two-row, auto-scrolling marquee, set
          just before the work it powers. ─────────────────────────────────── */}
      <ScrollScene>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10 md:px-8 md:py-16">
          <ToolsMarquee />
        </div>
      </ScrollScene>

      {/* ── Selected work: a three-card grid of the strongest product-UI
          builds (featured-posts layout, sakura-themed), closing into /work via
          a GSAP "View all work" CTA. ─────────────────────────────────────── */}
      <SelectedWork />

      {/* ── Content stack: washi panels floating over the scene ─────────── */}
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-32 md:px-8">
        {/* Bio */}
        <ScrollScene>
          <section className="washi washi-hover relative overflow-hidden p-7 md:p-10">
            <span
              aria-hidden
              lang="ja"
              className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[clamp(6rem,22vw,13rem)] leading-none text-foreground/[0.06]"
            >
              人
            </span>
            <h2 className="sr-only">Bio</h2>
            <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <Eyebrow>
                  Profile · <span lang="ja">紹介</span>
                </Eyebrow>
                <p className="font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl">
                  Design with intent. Ship with discipline.
                </p>
                {profile.bio.map((p, i) => (
                  <p key={i} className="max-w-prose text-foreground/75">
                    {p}
                  </p>
                ))}
              </div>
              {/* Candid photos — a small stacked pair. Responsive by
                  construction: a side column on desktop, stacking full-width
                  under the bio on mobile. Each image is w-full / h-auto (no fixed
                  dimensions), so it never overflows a small screen and holds its
                  aspect ratio (no layout shift). */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.5)]">
                  <Image
                    src={marcoReading}
                    alt="Marco Hope sitting on a rocky riverbank at dusk, reading a magazine"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.5)]">
                  <Image
                    src={marcoRiverbank}
                    alt="Marco Hope in a black hoodie at dusk by the rocky riverbank"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </ScrollScene>

        {/* Journey */}
        <ScrollScene>
          <section className="washi washi-hover relative p-7 md:p-10">
            {/* Watermark clipped to the panel via its own wrapper, so the
                section itself stays unclipped and the finale petal storm can
                drift down out of the panel into the page. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <span
                lang="ja"
                className="absolute -right-2 -top-8 select-none font-display text-[clamp(6rem,22vw,13rem)] leading-none text-foreground/[0.06]"
              >
                歩
              </span>
            </div>
            <h2 className="sr-only">Journey</h2>
            <Eyebrow>
              Journey · <span lang="ja">歩み</span>
            </Eyebrow>
            <JourneyBranch items={profile.journey} />
          </section>
        </ScrollScene>

        {/* Awards + certifications */}
        <ScrollScene>
          <section className="washi washi-hover p-7 md:p-10">
            <h2 className="sr-only">Awards and certifications</h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <Eyebrow>
                  Awards · <span lang="ja">受賞</span>
                </Eyebrow>
                <CredentialList items={profile.awards} />
              </div>
              <div>
                <Eyebrow>
                  Certifications · <span lang="ja">資格</span>
                </Eyebrow>
                <CredentialList items={profile.certs} />
              </div>
            </div>
          </section>
        </ScrollScene>

        {/* ── Closing CTAs: hint at the work and the conversation ─────────── */}
        <RevealGroup
          className="grid gap-5 md:grid-cols-2 md:gap-6"
          stagger={0.08}
        >
          {/* Work teaser */}
          <CurtainLink
            href="/work"
            className="washi washi-hover group relative flex flex-col overflow-hidden p-7 md:p-9"
          >
            <span
              aria-hidden
              lang="ja"
              className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[clamp(5rem,18vw,10rem)] leading-none text-foreground/[0.06]"
            >
              制
            </span>
            <Eyebrow>
              Work · <span lang="ja">制作</span>
            </Eyebrow>
            <p className="mt-4 font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              Things I&rsquo;ve designed &amp; shipped.
            </p>
            <p className="mt-3 max-w-prose text-foreground/75">
              From {featured.name} — a {featured.kind.toLowerCase()} taken{" "}
              <span className="font-mono text-sm text-gold">0 → 1</span> — to{" "}
              {moreCount} more builds in the catalogue.
            </p>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors group-hover:text-accent">
              View the work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </CurtainLink>

          {/* Contact teaser */}
          <CurtainLink
            href="/contact"
            className="washi washi-hover group relative flex flex-col overflow-hidden p-7 md:p-9"
          >
            <span
              aria-hidden
              lang="ja"
              className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[clamp(5rem,18vw,10rem)] leading-none text-foreground/[0.06]"
            >
              縁
            </span>
            <Eyebrow>
              Contact · <span lang="ja">連絡</span>
            </Eyebrow>
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-elevated/30 px-3 py-1 text-xs font-medium text-foreground/80">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_2px] shadow-accent/50"
              />
              Available for new work
            </span>
            <p className="mt-4 font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              Let&rsquo;s work together.
            </p>
            <p className="mt-3 max-w-prose text-foreground/75">
              Got a site or product that needs to feel premium? Tell me your
              vision and I&rsquo;ll get back fast.
            </p>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors group-hover:text-accent">
              Work with me
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </CurtainLink>
        </RevealGroup>

        {/* Footer end-stamp */}
        <div className="pt-2 text-center">
          <p className="hero-ink-soft font-mono text-xs uppercase tracking-[0.24em] text-gold">
            <span lang="ja">終</span> · End
          </p>
          <p className="mt-2 font-mono text-[0.7rem] tracking-wide text-foreground/55">
            &copy; {new Date().getFullYear()} Marco Hope
          </p>
        </div>
      </div>
    </div>
  );
}
