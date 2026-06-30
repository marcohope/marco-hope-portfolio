// Render strategy per tool for the home "Tools" marquee. Deliberately separate
// from <TechIcon>: the small project tech-tags elsewhere stay monochrome glyphs,
// while the marquee shows full-colour brand logos.
//
// Colour SVGs live in /public/logos and render as <img> — each SVG is an
// isolated resource, so the marquee's duplicated copies never clash on shared
// gradient/clip ids (e.g. arduino's non-namespaced `id="a"`).

export type ToolLogo =
  // Full-colour mark that reads on both the day and night panels.
  | { kind: "color"; src: string }
  // Colour mark with day/night variants, swapped by the about theme.
  // The off-panel variant is hidden via globals.css ([data-theme-variant]).
  | { kind: "themed"; day: string; night: string }
  // Brand is black/white with no colour identity — render the currentColor
  // glyph so it follows the foreground ink and adapts to the theme on its own.
  | { kind: "mono" };

export const TOOL_LOGOS: Record<string, ToolLogo> = {
  typescript: { kind: "color", src: "/logos/typescript.svg" },
  javascript: { kind: "color", src: "/logos/javascript.svg" },
  python: { kind: "color", src: "/logos/python.svg" },
  // React's mark is tuned per background: darker teal for the cream day panel,
  // brighter cyan for the navy night panel.
  react: { kind: "themed", day: "/logos/react-light.svg", night: "/logos/react-dark.svg" },
  tailwind: { kind: "color", src: "/logos/tailwind.svg" },
  gsap: { kind: "color", src: "/logos/gsap.svg" },
  nodejs: { kind: "color", src: "/logos/nodejs.svg" },
  supabase: { kind: "color", src: "/logos/supabase.svg" },
  postgres: { kind: "color", src: "/logos/postgres.svg" },
  stripe: { kind: "color", src: "/logos/stripe.svg" },
  git: { kind: "color", src: "/logos/git.svg" },
  figma: { kind: "color", src: "/logos/figma.svg" },
  electron: { kind: "color", src: "/logos/electron.svg" },
  cpp: { kind: "color", src: "/logos/cpp.svg" },
  arduino: { kind: "color", src: "/logos/arduino.svg" },
  // Monochrome brands — currentColor glyph adapts to day/night automatically.
  nextjs: { kind: "mono" },
  vercel: { kind: "mono" },
  github: { kind: "mono" },
  shadcn: { kind: "mono" },
};
