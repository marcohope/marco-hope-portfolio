# Marco Hope — Portfolio

A motion-led personal portfolio for **Marco Hope** (Design Engineer / technical co-founder). It's built to _prove_ the craft it describes — UI/UX sensibility and front-end motion — rather than just list it. Each page is its own themed world with an interactive 3D hero, choreographed scroll motion, and an accessibility-first fallback for every effect.

🔗 **Live:** [marcohope.com](https://marcohope.com)

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
│     ├─ work/  craft/  contact/
├─ components/              # feature-grouped (about, work, craft, site, contact, ui, …)
├─ lib/
│  ├─ profile.ts            # ⭐ single source of truth for all portfolio content
│  └─ site.ts               # SEO origin + brand strings
├─ assets/                  # statically-imported imagery (next/image blur + sizing)
└─ types/
```

### Key ideas

- **One content source.** Everything on the site — bio, journey, projects, case studies, skills, awards — is data in [`src/lib/profile.ts`](src/lib/profile.ts). Edit it there and every page updates. SEO strings live in [`src/lib/site.ts`](src/lib/site.ts).
- **Per-page theme system.** A single token set (`globals.css`) is re-skinned per route — `theme-work` (blue), `theme-craft` (violet), `theme-contact` (monochrome glass), and the `theme-about-day` / `theme-about-night` sakura pair with a day↔night toggle. Only the accent surface and ground change; type, spacing, and primitives stay constant.
- **Deep case studies.** The three flagship projects (Halix, this portfolio, Deeds Leisure) render as long-form studies on `/work` — a lead overview, content-summarizing sections, a credits line, and an honest AI-assistance disclosure. The remaining builds are demoted to a compact catalogue list.
- **Motion that earns its keep.** GSAP + ScrollTrigger drive scene transitions, a pinned horizontal work slider, staggered reveals, and themed liquid-glass loading screens. All of it is gated behind `gsap.matchMedia` so reduced-motion users get a calm, static path.

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
- **Performance & quality budget:** Lighthouse CI (`npm run lighthouse`) runs against a production build over `/`, `/work`, `/craft`, and `/contact`, asserting **≥ 0.95** for Performance, Accessibility, Best Practices, and SEO (`lighthouserc.json`).

> **Latest Lighthouse (desktop, production build):** _run `npm run lighthouse` to regenerate — see `lighthouserc.json` for the enforced ≥ 0.95 budget per category._

---

© Marco Hope. Code is MIT-spirited for reference; the imagery, copy, and Spline scenes are not licensed for reuse.
