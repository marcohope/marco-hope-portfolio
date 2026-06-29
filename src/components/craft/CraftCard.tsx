import { ChevronDown } from "lucide-react";

/**
 * Frame for a single Craft (Lab) experiment: a titled card with a live demo
 * stage, the techniques it shows off as tags, and a collapsible "build
 * breakdown" (native <details> — no JS, keyboard-friendly). Each card is
 * self-contained so any one can later be lifted out and open-sourced.
 */
export function CraftCard({
  title,
  summary,
  tags,
  breakdown,
  children,
}: {
  title: string;
  summary: string;
  tags: string[];
  breakdown: string[];
  children: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Live demo stage — the experiment renders here. */}
      <div className="relative h-72 border-b border-border bg-[radial-gradient(120%_120%_at_50%_0%,rgb(167_139_250_/_0.10),transparent_60%)]">
        {children}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
            {summary}
          </p>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-foreground/55"
            >
              {t}
            </li>
          ))}
        </ul>

        <details className="group mt-auto border-t border-border pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:text-foreground [&::-webkit-details-marker]:hidden">
            Build breakdown
            <ChevronDown
              aria-hidden
              className="h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/65">
            {breakdown.map((b, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}
