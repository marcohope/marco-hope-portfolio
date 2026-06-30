import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { GlassNav } from "@/components/site/GlassNav";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CodeBlock } from "@/components/craft/CodeBlock";
import { craftItems, craftSlugs, getCraftItem } from "@/lib/craft";

export function generateStaticParams() {
  return craftSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getCraftItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} · Craft`,
    description: item.summary,
    alternates: { canonical: `/craft/${slug}` },
  };
}

export default async function CraftDetail({ params }: Params) {
  const { slug } = await params;
  const item = getCraftItem(slug);
  if (!item) notFound();

  const Demo = item.Demo;
  // Read the real source at build so the code panel never drifts from what runs.
  // Static subfolder + dynamic leaf keeps this statically analyzable under Turbopack.
  const source = readFileSync(
    join(process.cwd(), "src/components/craft", item.sourceFile),
    "utf8",
  ).trimEnd();
  const filename = item.sourceFile;

  const idx = craftItems.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? craftItems[idx - 1] : null;
  const next = idx < craftItems.length - 1 ? craftItems[idx + 1] : null;

  return (
    <div className="theme-craft relative min-h-screen bg-background text-foreground">
      <GlassNav tone="craft" />

      <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <CurtainLink
          href="/craft"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Craft
        </CurtainLink>

        <header className="mt-8">
          <Eyebrow>
            Craft · <span lang="ja">試作</span>
          </Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70">
            {item.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-foreground/55"
              >
                {t}
              </li>
            ))}
          </ul>
        </header>

        {/* Live demo stage */}
        <section className="mt-10">
          <h2 className="sr-only">Live demo</h2>
          <div className="relative h-[24rem] overflow-hidden rounded-2xl border border-border bg-card bg-[radial-gradient(120%_120%_at_50%_0%,rgb(167_139_250_/_0.12),transparent_60%)]">
            <Demo />
          </div>
          <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.22em] text-foreground/45">
            Live · try it with mouse, touch, or keyboard
          </p>
        </section>

        {/* How it's built */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            How it&rsquo;s built
          </h2>
          <ul className="mt-5 space-y-3">
            {item.breakdown.map((b, i) => (
              <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-foreground/80">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Accessibility */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Accessibility
          </h2>
          <ul className="mt-5 space-y-3">
            {item.a11y.map((a, i) => (
              <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-foreground/80">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Source */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight">Source</h2>
          <p className="mt-3 mb-5 text-sm leading-relaxed text-foreground/60">
            The exact component, read straight from the repo at build. Requires{" "}
            <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em]">
              gsap
            </code>{" "}
            and{" "}
            <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em]">
              @gsap/react
            </code>
            .
          </p>
          <CodeBlock code={source} filename={filename} />

          <h3 className="mt-8 font-display text-lg font-bold tracking-tight">
            Usage
          </h3>
          <div className="mt-3">
            <CodeBlock code={item.usage} filename="usage.tsx" />
          </div>
        </section>

        {/* The shared taste rulebook. */}
        <a
          href="https://github.com/marcohope/marco-hope-portfolio/blob/main/skills/motion/SKILL.md"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 flex items-center justify-between gap-6 rounded-2xl border border-dashed border-border p-6 transition-colors hover:border-accent/50"
        >
          <p className="max-w-xl text-sm leading-relaxed text-foreground/65">
            <span className="font-display text-base font-bold text-foreground">
              Why these choices?
            </span>{" "}
            The timing, easing, and reduced-motion rules behind every demo live in
            the motion skill file.
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Read it
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>

        {/* Prev / next */}
        <nav className="mt-14 flex items-stretch justify-between gap-4 border-t border-border pt-8">
          {prev ? (
            <CurtainLink
              href={`/craft/${prev.slug}`}
              className="group flex max-w-[15rem] flex-col gap-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="font-medium text-foreground/85 transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </CurtainLink>
          ) : (
            <span />
          )}
          {next ? (
            <CurtainLink
              href={`/craft/${next.slug}`}
              className="group flex max-w-[15rem] flex-col items-end gap-1 text-right outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50">
                Next
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <span className="font-medium text-foreground/85 transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </CurtainLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
