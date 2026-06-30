import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TechIcon } from "@/components/tech/TechIcon";
import { ToolLogo } from "@/components/tech/ToolLogo";
import { TECH_ICONS } from "@/components/tech/tech-icons.generated";
import type { Profile } from "@/lib/profile";

type Project = Profile["projects"][number];

/**
 * The "lighter list" half of /work: the builds that aren't full case studies
 * (hardware + the Shopify internship) shown as compact horizontal cards —
 * thumbnail, code/year, name, one-line blurb, metric, tech, and a link. Sits
 * after the deep studies so the page leads with depth, then offers breadth.
 */
export function WorkCatalogueList({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <ul className="mt-10 space-y-5">
      {projects.map((p) => (
        <li key={p.code}>
          <article className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur-sm md:flex-row md:items-start md:p-6">
            {p.image ? (
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border border-border/60 md:w-52 lg:w-60">
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.kind}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 15rem"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs tracking-wider text-gold">
                  {p.code}
                </span>
                {p.year ? (
                  <span className="font-mono text-xs text-foreground/55">
                    {p.year}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-foreground">
                {p.name}
              </h3>
              <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground/50">
                {p.kind}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/70">
                {p.blurb}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <span className="font-mono text-xs text-gold">{p.metric}</span>
                <span className="flex items-center gap-2.5 text-foreground/55">
                  {p.tech.map((slug) => (
                    <ToolLogo
                      key={slug}
                      slug={slug}
                      label={TECH_ICONS[slug]?.title ?? slug}
                      className="h-4 w-4"
                    />
                  ))}
                </span>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    Visit
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : null}
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
                  >
                    <TechIcon slug="github" className="h-4 w-4" />
                    Code
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
