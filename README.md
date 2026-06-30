# Marco Hope — Portfolio

A motion-led personal portfolio for **Marco Hope** (Design Engineer / technical co-founder). It's built to _prove_ the craft it describes — UI/UX sensibility and front-end motion — rather than just list it. Each page is its own themed world with an interactive 3D hero, choreographed scroll motion, and an accessibility-first fallback for every effect.

🔗 **Live:** [marcohope.com](https://marcohope.com)

### Highlights

- **[Motion skill file](skills/motion/SKILL.md)** — my interface-motion taste written down as a reusable rulebook (the 300ms ceiling, spring easing, reduced-motion, 60fps) that I hand to AI coding agents. Every interaction in the Craft lab is that rulebook applied.
- **[Craft lab](https://marcohope.com/craft)** — six self-contained micro-interactions, each with a live demo, a build breakdown, accessibility notes, and its real source (copy-in).
- **[Blog](https://marcohope.com/blogs)** — short essays on the reasoning behind the work; one embeds its own live demo inline.

---

## Stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, React Server Components) |
| Language | TypeScript (strict) on React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — CSS-first `@theme` tokens, no `tailwind.config` |
| Motion | [GSAP 3](https://gsap.com) + ScrollTrigger via `@gsap/react` (`useGSAP`) |
| 3D | [Spline](https://spline.design) scenes as page heroes (work, contact) |
| Fonts | Archivo (display), Space Grotesk (sans), Instrument Serif (wordmark) via `next/font` |
| UI primitives | A small set of shadcn/ui-style components (carousel, slot) |
| Content | MDX (`@next/mdx`) for the blog, with a typed post registry |
| Tooling | ESLint 9, Playwright (e2e), Lighthouse CI |
| Deploy | Vercel |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run lighthouse` | Lighthouse CI against a production build (see `lighthouserc.json`) |

## Architecture

```
src/
├─ app/
│  ├─ layout.tsx            # root: fonts, metadata, skip-link, Spline preconnects
│  ├─ page.tsx              # home (sakura day/night about-experience) + JSON-LD
│  ├─ globals.css           # design tokens + per-page themes (Tailwind v4 @theme)
│  ├─ fonts.ts              # next/font definitions
│  ├─ sitemap.ts robots.ts  # file-convention SEO
│  ├─ opengraph-image.tsx … # generated OG / Twitter / icon images
│  └─ (site)/               # route group for the inner pages
│     ├─ work/  contact/
│     ├─ craft/  craft/[slug]/   # component library: gallery + detail pages
│     └─ blogs/  blogs/[slug]/   # blog index + MDX posts
├─ components/              # feature-grouped (about, work, craft, site, contact, ui, …)
├─ content/blogs/           # MDX essays (one file per post)
├─ mdx-components.tsx       # global MDX element styling
├─ lib/
│  ├─ profile.ts            # ⭐ single source of truth for projects, bio, awards
│  ├─ craft.ts              # craft-lab registry (drives /craft + /craft/[slug])
│  ├─ blogs.ts              # blog post registry (drives /blogs + /blogs/[slug])
│  └─ site.ts               # SEO origin + brand strings
├─ assets/                  # statically-imported imagery (next/image blur + sizing)
└─ types/

skills/motion/SKILL.md      # the motion rulebook — a portable, agent-ready skill file
```

### Key ideas

- **One content source.** Everything on the site — bio, journey, projects, case studies, skills, awards — is data in [`src/lib/profile.ts`](src/lib/profile.ts). Edit it there and every page updates. SEO strings live in [`src/lib/site.ts`](src/lib/site.ts).
- **Per-page theme system.** A single token set (`globals.css`) is re-skinned per route — `theme-work` (blue), `theme-craft` (violet), `theme-contact` (monochrome glass), and the `theme-about-day` / `theme-about-night` sakura pair with a day↔night toggle. Only the accent surface and ground change; type, spacing, and primitives stay constant.
- **Deep case studies.** The three flagship projects (Halix, this portfolio, Deeds Leisure) render as long-form studies on `/work` — a lead overview, content-summarizing sections, a credits line, and an honest AI-assistance disclosure. The remaining builds are demoted to a compact catalogue list.
- **Motion that earns its keep.** GSAP + ScrollTrigger drive scene transitions, a pinned horizontal work slider, staggered reveals, and themed liquid-glass loading screens. All of it is gated behind `gsap.matchMedia` so reduced-motion users get a calm, static path.
- **A component library, not just demos.** The Craft lab is driven by a registry ([`src/lib/craft.ts`](src/lib/craft.ts)); each interaction has a detail page at `/craft/[slug]` with its live demo, build breakdown, accessibility notes, and real source read from disk at build — so the code shown always matches the code that runs.
- **Taste as a portable artifact.** [`skills/motion/SKILL.md`](skills/motion/SKILL.md) encodes the motion rules behind every interaction as a rulebook for AI coding agents, with the reasoning written up on the [blog](https://marcohope.com/blogs).

### Accessibility

Accessibility is a default, not a pass at the end:

- **`prefers-reduced-motion`** — every GSAP timeline is gated; CSS transitions collapse to near-instant.
- **`prefers-reduced-transparency`** — glass surfaces swap their backdrop-blur for opaque fills.
- **Hover gating** — hover-only transforms are wrapped in `@media (hover: hover)` so nothing sticks after a tap on touch.
- **Keyboard** — skip-link, visible focus rings, a focus-trapped mobile menu (`role="dialog"`), and keyboard-driven equivalents for every pointer interaction in the Craft lab.
- **No-JS escape hatches** — loading overlays can't trap the page if scripts never run.
- **Live regions** — async results (e.g. click-to-copy) are announced politely.

### Testing & performance

- **End-to-end:** Playwright (`npm run test:e2e`), configured for a reduced-motion context so assertions are deterministic.
- **Performance & quality budget:** Lighthouse CI (`npm run lighthouse`) runs against a production build over the core routes plus representative `/craft/[slug]` and `/blogs/[slug]` pages. Accessibility, Best Practices, and SEO are gated at **≥ 0.95 on every page**; Performance is gated at **≥ 0.95** everywhere except the two Spline-3D pages (`/work`, `/contact`), where the heavy WebGL embed makes a headless perf score unrepresentative — there it's tracked (warn) rather than blocked (`lighthouserc.json`).

> **Latest Lighthouse (desktop, production build):** _run `npm run lighthouse` to regenerate — see `lighthouserc.json` for the enforced ≥ 0.95 budget per category._

---

© Marco Hope. Code is MIT-spirited for reference; the imagery, copy, and Spline scenes are not licensed for reuse.
