import { ArrowRight, ChevronDown } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/tech/TechIcon";
import { ProfilePortrait } from "@/components/about/ProfilePortrait";
import { HankoSeal } from "@/components/site/HankoSeal";
import { Timeline } from "@/components/site/Timeline";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { ScrollScene } from "@/components/site/scroll-scene";
import { ProjectsCarousel } from "@/components/about/ProjectsCarousel";
import { profile } from "@/lib/profile";

// Teasers for the closing CTAs — derived from the project list so the home
// hint can't drift from the actual /work catalogue.
const featured =
  profile.projects.find((p) => p.featured) ?? profile.projects[0];
const moreCount = profile.projects.length - 1;

/**
 * The sakura day-and-night portrait experience: headshot, name, and intro over
 * the open sky, followed by the washi content stack (bio, journey, tools,
 * awards, certifications) and the closing CTAs into /work and /contact.
 * Rendered inside <AboutExperience>, which supplies the day↔night theme,
 * watercolor backdrop, drifting petals, and the toggle.
 */
export function SakuraProfile() {
  return (
    <div className="relative z-10">
      {/* ── Hero: the name + value-prop over the open sky, day or moonlit. The
          portrait is demoted to a small photo beside the bio below, so the
          name/value-prop is the hero's center of gravity. ───────────────── */}
      {/* Leave-only: the hero is visible on load; this just fades it away
          as the work section scrolls up to take its place. */}
      <ScrollScene enter={false}>
      <section className="mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center gap-6 px-6 py-28 text-center">
        <Reveal y={16} className="flex flex-col items-center gap-4">
          <Eyebrow className="hero-ink-soft justify-center">
            About · <span lang="ja">人物</span>
          </Eyebrow>
          <h1 className="hero-ink font-display text-[clamp(2.8rem,11vw,6rem)] font-bold leading-[0.92] tracking-tight">
            Marco Hope
          </h1>
          <p className="hero-ink-soft max-w-2xl text-pretty font-display text-lg font-semibold text-foreground/90 md:text-2xl">
            Design engineer — I design and build AI-powered web products that
            feel as good as they look.
          </p>
          <p className="hero-ink-soft text-foreground/75 md:text-lg">
            Computer Engineering @ York · Co-Founder @ Halix Solutions
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/55">
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

      {/* ── Selected work: a scroll-pinned horizontal slider through the
          catalogue — the section pins and the cards slide past as you scroll,
          then it releases into the content stack below. ──────────────────── */}
      <ProjectsCarousel />

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
            <div className="relative grid items-start gap-8 md:grid-cols-[1.5fr_auto]">
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
              {/* Demoted portrait — a small photo beside the bio, plus the seal. */}
              <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-7">
                <ProfilePortrait variant="compact" />
                <HankoSeal />
              </div>
            </div>
          </section>
        </ScrollScene>

        {/* Journey */}
        <ScrollScene>
          <section className="washi washi-hover p-7 md:p-10">
            <h2 className="sr-only">Journey</h2>
            <Eyebrow>
              Journey · <span lang="ja">歩み</span>
            </Eyebrow>
            <Timeline items={profile.journey} />
          </section>
        </ScrollScene>

        {/* Tools */}
        <ScrollScene>
          <section className="washi washi-hover p-7 md:p-10">
            <h2 className="sr-only">Skills and tools</h2>
            <Eyebrow>
              Tools · <span lang="ja">道具</span>
            </Eyebrow>
            <RevealGroup
              className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
              stagger={0.04}
              y={16}
            >
              {profile.allTech.map((slug) => (
                <div
                  key={slug}
                  className="group flex items-center justify-center rounded-lg border border-border/70 bg-elevated/30 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <TechIcon
                    slug={slug}
                    className="h-7 w-7 text-foreground/65 transition-colors group-hover:text-accent"
                  />
                </div>
              ))}
            </RevealGroup>
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
                <ul className="mt-6 space-y-3">
                  {profile.awards.map((a) => (
                    <li
                      key={a}
                      className="flex gap-3 text-sm text-foreground/75"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>
                  Certifications · <span lang="ja">資格</span>
                </Eyebrow>
                <ul className="mt-6 space-y-3">
                  {profile.certs.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-sm text-foreground/75"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
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
              Let&rsquo;s build something.
            </p>
            <p className="mt-3 max-w-prose text-foreground/75">
              {profile.location} · open to 2026 roles &amp; freelance. Drop a
              line and I&rsquo;ll get back fast.
            </p>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 transition-colors group-hover:text-accent">
              Get in touch
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
