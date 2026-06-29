// Generates a static, dependency-free icon-data file from simple-icons.
// Run: node scripts/gen-tech-icons.mjs
import * as si from "simple-icons";
import { writeFileSync, mkdirSync } from "node:fs";

// slug -> [simple-icons export key, display title]
const WANT = {
  typescript: ["siTypescript", "TypeScript"],
  javascript: ["siJavascript", "JavaScript"],
  python: ["siPython", "Python"],
  react: ["siReact", "React"],
  nextjs: ["siNextdotjs", "Next.js"],
  tailwind: ["siTailwindcss", "Tailwind CSS"],
  gsap: ["siGreensock", "GSAP"],
  nodejs: ["siNodedotjs", "Node.js"],
  supabase: ["siSupabase", "Supabase"],
  postgres: ["siPostgresql", "PostgreSQL"],
  stripe: ["siStripe", "Stripe"],
  vercel: ["siVercel", "Vercel"],
  git: ["siGit", "Git"],
  github: ["siGithub", "GitHub"],
  figma: ["siFigma", "Figma"],
  electron: ["siElectron", "Electron"],
  shadcn: ["siShadcnui", "shadcn/ui"],
  cpp: ["siCplusplus", "C++"],
  arduino: ["siArduino", "Arduino"],
  // socials
  youtube: ["siYoutube", "YouTube"],
};

// Manual fallbacks for glyphs simple-icons no longer ships (e.g. LinkedIn was
// removed for legal reasons). slug -> { title, path, hex }.
const MANUAL = {
  linkedin: {
    title: "LinkedIn",
    hex: "0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
};

const found = {};
const missing = [];
for (const [slug, [key, title]] of Object.entries(WANT)) {
  const icon = si[key];
  if (icon && icon.path) {
    found[slug] = { slug, title, path: icon.path, hex: icon.hex };
  } else {
    missing.push(`${slug} (${key})`);
  }
}
for (const [slug, { title, path, hex }] of Object.entries(MANUAL)) {
  found[slug] = { slug, title, path, hex };
}

const header = `// AUTO-GENERATED from simple-icons v${
  si.siReact ? "16" : "?"
}. Do not edit by hand — run \`node scripts/gen-tech-icons.mjs\`.\n`;
const body =
  header +
  `export type TechIcon = { slug: string; title: string; path: string; hex: string };\n\n` +
  `export const TECH_ICONS: Record<string, TechIcon> = ${JSON.stringify(
    found,
    null,
    2
  )} as const;\n\n` +
  `export const TECH_SLUGS = Object.keys(TECH_ICONS);\n`;

mkdirSync("src/components/tech", { recursive: true });
writeFileSync("src/components/tech/tech-icons.generated.ts", body, "utf8");

console.log(`Wrote ${Object.keys(found).length} icons -> src/components/tech/tech-icons.generated.ts`);
if (missing.length) console.log("MISSING (need manual fallback):", missing.join(", "));
