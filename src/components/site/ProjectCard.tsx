"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TechIcon } from "@/components/tech/TechIcon";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/profile";

type Project = Profile["projects"][number];

const STATUS: Record<string, { label: string; live: boolean }> = {
  live: { label: "Live", live: true },
  shipped: { label: "Shipped", live: false },
};

/**
 * A "star-catalogue" entry on /work: mono designation, status, metric, tech
 * glyphs, and an inline-expanding mission log (no route change). Featured
 * projects render larger across the full grid row.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const status = STATUS[project.status] ?? STATUS.shipped;
  const featured = project.featured;
  const logId = `log-${project.code}`;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/80 bg-card/80 p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/25 md:p-8",
        className,
      )}
    >
      {/* designation + status */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.25em] text-foreground/45">
          {project.code}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              status.live
                ? "bg-accent shadow-[0_0_8px_2px] shadow-accent/50"
                : "bg-foreground/40",
            )}
            aria-hidden
          />
          {status.label}
        </span>
      </div>

      <h3
        className={cn(
          "mt-4 font-display font-bold leading-tight",
          featured ? "text-3xl md:text-4xl" : "text-2xl",
        )}
      >
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-foreground/55">{project.kind}</p>

      <p
        className={cn(
          "mt-4 text-foreground/70",
          featured ? "max-w-2xl text-base md:text-lg" : "text-sm",
        )}
      >
        {project.blurb}
      </p>

      {/* metric + tech */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-accent">
          {project.metric}
        </span>
        <span className="flex items-center gap-2.5 text-foreground/55">
          {project.tech.map((slug) => (
            <TechIcon key={slug} slug={slug} className="h-4 w-4" />
          ))}
        </span>
      </div>

      {/* mission log toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={logId}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-accent"
      >
        Mission log
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {/* the log — CSS grid-rows trick for a height-animated reveal.
          Framed as Problem → Approach → Outcome → Reflection. */}
      <div
        id={logId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <dl className="space-y-4 overflow-hidden border-l border-accent/30 pl-4 text-sm">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Problem
            </dt>
            <dd className="mt-1 text-foreground/65">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Approach
            </dt>
            <dd className="mt-1">
              <ul className="space-y-1 text-foreground/65 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent/60 [&>li]:before:content-['—']">
                {project.approach.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Outcome
            </dt>
            <dd className="mt-1">
              <ul className="space-y-1 text-foreground/65 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent/60 [&>li]:before:content-['—']">
                {project.outcome.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Reflection
            </dt>
            <dd className="mt-1 text-foreground/65">{project.reflection}</dd>
          </div>
        </dl>
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Launch
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}
    </Card>
  );
}
