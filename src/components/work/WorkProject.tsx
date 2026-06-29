import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/tech/TechIcon";
import { ScrollScene } from "@/components/site/scroll-scene";
import { WorkGallery } from "@/components/work/WorkGallery";
import { cn } from "@/lib/utils";
import { caseStudies, type Profile } from "@/lib/profile";

type Project = Profile["projects"][number];

const STATUS: Record<string, { label: string; live: boolean }> = {
  live: { label: "Live", live: true },
  shipped: { label: "Shipped", live: false },
};

// Em-dash bullets for a section's supporting points.
const POINTS =
  "mt-3 space-y-1.5 text-sm text-foreground/70 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent/60 [&>li]:before:content-['—']";
const CREDIT_LABEL =
  "shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent";

/**
 * One flagship project as a deep, full-height case study on /work — content held
 * to the left half (the Spline scene fills the right). Reads top-to-bottom:
 * title + credits → gallery → lead overview (big type) → content-summarizing
 * sections → credits + AI disclosure → tech / links. Fades through on scroll.
 * The narrow left column's own py padding clears the fixed nav for deep links.
 */
export function WorkProject({ project }: { project: Project }) {
  const status = STATUS[project.status] ?? STATUS.shipped;
  const study = caseStudies[project.code];

  return (
    <ScrollScene>
      <section
        id={project.code.toLowerCase()}
        className="flex min-h-screen items-center py-24 md:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="pointer-events-auto max-w-xl">
            {/* Title block */}
            <Eyebrow>
              <span className="font-mono">{project.code}</span> · {project.kind}
            </Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {project.name}
            </h2>
            {/* Credits row: status · role · year · metric */}
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/60">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    status.live
                      ? "bg-accent shadow-[0_0_8px_2px] shadow-accent/50"
                      : "bg-foreground/40",
                  )}
                />
                {status.label}
              </span>
              <span aria-hidden>·</span>
              <span>{project.role}</span>
              {project.year ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{project.year}</span>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span className="font-mono text-xs text-gold">{project.metric}</span>
            </p>

            {/* Photos */}
            <div className="mt-7">
              <WorkGallery images={project.images} title={project.name} />
            </div>

            {study ? (
              <>
                {/* Lead overview — large type, set above the sections so the
                    story (not a "Problem" label) leads. */}
                <p className="mt-8 text-pretty font-display text-xl font-medium leading-snug text-foreground/90 md:text-2xl">
                  {study.overview}
                </p>

                {/* Content-summarizing sections — the heading IS the takeaway. */}
                <div className="mt-9 space-y-7">
                  {study.sections.map((s, i) => (
                    <div key={i}>
                      <h3 className="font-display text-lg font-bold leading-snug text-foreground md:text-xl">
                        {s.heading}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                        {s.body}
                      </p>
                      {s.points && s.points.length > 0 ? (
                        <ul className={POINTS}>
                          {s.points.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Credits + honest AI-assistance disclosure. */}
                <dl className="mt-9 space-y-2 border-l border-accent/30 pl-5 text-sm">
                  <div className="flex gap-3">
                    <dt className={CREDIT_LABEL}>Credits</dt>
                    <dd className="text-foreground/70">{study.team}</dd>
                  </div>
                  {study.ai ? (
                    <div className="flex gap-3">
                      <dt className={CREDIT_LABEL}>AI</dt>
                      <dd className="text-foreground/70">{study.ai.contribution}</dd>
                    </div>
                  ) : null}
                </dl>
              </>
            ) : (
              <p className="mt-8 text-foreground/75">{project.blurb}</p>
            )}

            {/* Tech + links */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-2.5 text-foreground/55">
                {project.tech.map((slug) => (
                  <TechIcon key={slug} slug={slug} className="h-4 w-4" />
                ))}
              </span>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  Visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
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
        </div>
      </section>
    </ScrollScene>
  );
}
