// Single source of truth for hero/portfolio content.
// Pulled from resume.md — edit here to update the site.

// Project media (static imports → next/image gets size + blur for free).
import halixLanding from "@/assets/about/halix-solutions/halix-landingpage.png";
import halixDashboard from "@/assets/about/halix-solutions/halix-dashboard.png";
import halixTrend from "@/assets/about/halix-solutions/halix-trendreport-page.png";
import halixClient from "@/assets/about/halix-solutions/halix-client-page.png";
import halixPlans from "@/assets/about/halix-solutions/halix-planspage.png";
import halixSettings from "@/assets/about/halix-solutions/halix-settings.png";
import halixSignin from "@/assets/about/halix-solutions/halix-signin-page.png";
import dlScraper from "@/assets/about/deed-leisure/DL-scraper-UI.png";
import dlApps from "@/assets/about/deed-leisure/DL-apps.png";
import dlLeads from "@/assets/about/deed-leisure/DL-Sample-Lead-List.png";
import minoaNews1 from "@/assets/about/minoa/minoa-newsletter-1.png";
import minoaNews2 from "@/assets/about/minoa/minoa-newsletter-2.png";
import fmRadio from "@/assets/about/fm-radio/irl-picture-of-radio.png";
import plantSetup from "@/assets/about/plantproj/plantproj-setup-main.png";
import plantFlow from "@/assets/about/plantproj/plantproj-flow-chart.png";
import plantGraph from "@/assets/about/plantproj/plantproj-volt-vs-time-graph.png";
import portfolioLanding from "@/assets/about/portfolio-landing-pic.png";
import portfolioWork from "@/assets/about/portfolio-work-page.png";
import portfolioCraft from "@/assets/about/portfolio-craft-page.png";
import portfolioContact from "@/assets/about/portfolio-contact-page.png";
// Award / certificate scans (shown on-demand in the About lightbox).
import certAiDesign from "@/assets/about/certificates/ai-powered-software-and-system-design-cert.png";
import certPython from "@/assets/about/certificates/crash-course-on-python.png";
import awardJuniorDesign from "@/assets/about/certificates/junior-design-oct-7-2023.png";
import awardSeniorDesign from "@/assets/about/certificates/third-place-senior-design-oct-12-2024.png";
import awardDebate from "@/assets/about/certificates/second-place-debate-setp-24-2023.png";

export const profile = {
  name: "Marco Hope",
  fullName: "Marco Mateo Hope",
  location: "Toronto, ON",

  // Two-paragraph bio (used on /about).
  bio: [
    "I build websites and product interfaces for founders and brands who care how a thing feels — motion and interaction that's actually correct: fast, accessible, reduced-motion-aware, and engineered, not just flashy. Most of that craft has gone into Halix Solutions, a live, paying B2B AI SaaS, where I own the full UI/UX across the marketing site and the in-app workspace and contribute across full-stack and go-to-market.",
    "I ship production software end-to-end by directing AI coding agents, and I care about UI/UX craft and translating technical work for non-technical stakeholders.",
    "I came to the web from the hardware side — a from-scratch FM radio, a closed-loop plant-waterer — and that habit of caring how a thing actually works, down to the wiring, is still how I approach an interface.",
  ],

  links: {
    site: "https://marcohope.com",
    siteLabel: "marcohope.com",
    email: "mailto:marcomateohope@gmail.com",
    youtube: "https://youtube.com/@iburntokens",
    github: "https://github.com/marcohope",
    linkedin: "https://www.linkedin.com/in/marco-hope/",
  },

  // Project "star catalogue". `image` is the card cover (a real screenshot or
  // null → themed kanji tile); `images` is the full gallery. Each entry is
  // framed as Problem → Approach → Outcome → Reflection (draft copy — edit me).
  projects: [
    {
      code: "HX-001",
      name: "Halix Solutions",
      role: "Co-Founder · Technical",
      kind: "B2B AI SaaS Platform",
      status: "live",
      year: "2025 — Present",
      featured: true,
      blurb:
        "An AI-powered B2B SaaS for digital marketing agencies — taken from zero to a live, paying product. I owned the full UI/UX and contributed across full-stack and go-to-market as a technical co-founder.",
      metric: "0 → 1 · FULL UI/UX",
      href: "https://halixsolutions.com",
      repo: "",
      image: halixLanding,
      images: [
        halixLanding,
        halixDashboard,
        halixTrend,
        halixClient,
        halixPlans,
        halixSettings,
        halixSignin,
      ],
      tech: ["typescript", "nextjs", "react", "supabase", "stripe", "tailwind"],
      problem:
        "Digital marketing agencies burn hours on manual market research and trend analysis, with no affordable tool to turn raw signals into client-ready insight at scale.",
      approach: [
        "Owned the full UI/UX — the marketing site and the authenticated, multi-tenant workspace — from flows and wireframes to the visual system and component library.",
        "Contributed across the full stack, directing AI coding agents (Claude Code) to build features on Next.js and Supabase (Postgres, Auth, Row-Level Security), with Stripe billing wired via webhooks.",
        "Shaped brand and go-to-market — the landing narrative, positioning, and marketing assets.",
      ],
      outcome: [
        "Helped take the product from 0 → 1: a live, paying B2B SaaS.",
        "Delivered one cohesive design system spanning the marketing site and the in-app workspace.",
      ],
      reflection:
        "Co-founding meant wearing several hats — design, full-stack, and marketing — and learning to make pragmatic trade-offs under real constraints alongside a small team.",
    },
    {
      code: "PF-003",
      name: "This Portfolio",
      role: "Design + Build",
      kind: "Portfolio Site",
      status: "live",
      year: "2026",
      featured: false,
      blurb:
        "The site you're on — a motion-led portfolio designed and built from scratch with Next.js, GSAP, and interactive Spline 3D scenes.",
      metric: "DESIGN · BUILD",
      href: "https://marcohope.com",
      repo: "",
      image: portfolioLanding,
      images: [portfolioLanding, portfolioWork, portfolioCraft, portfolioContact],
      tech: ["typescript", "nextjs", "react", "tailwind", "gsap", "figma"],
      problem:
        "A portfolio should prove the craft it claims — so it had to demonstrate UI/UX sensibility and front-end motion work, not just describe it.",
      approach: [
        "Designed it from scratch and built it by directing AI coding agents on Next.js (App Router) and Tailwind v4, with a per-page theme system (sakura day/night, work, craft, contact) sharing one token set.",
        "Choreographed the motion in GSAP + ScrollTrigger — scroll-driven scene transitions, staggered reveals, and themed liquid-glass loading screens.",
        "Embedded interactive Spline 3D scenes as page heroes, with cursor-reactive distortion and reduced-motion fallbacks throughout.",
      ],
      outcome: [
        "A cohesive, fast, motion-led site that doubles as a live demonstration of the design and front-end work it describes.",
        "Accessible by default — reduced-motion paths, keyboard-friendly navigation, and no-JS escape hatches on every overlay.",
      ],
      reflection:
        "Being my own client meant every detail was a judgment call with no brief to hide behind — it sharpened my taste and my sense for where motion actually earns its keep.",
    },
    {
      code: "MN-004",
      name: "Minoa Home",
      role: "UX/UI & Digital Marketing Intern",
      kind: "Shopify UX / SEO",
      status: "shipped",
      year: "2024 – 2025",
      featured: false,
      blurb:
        "A Shopify storefront audit and content system across B2B and B2C journeys for a sustainable-luxury brand.",
      metric: "UX · SEO AUDIT",
      href: "https://minoahome.com",
      repo: "",
      image: minoaNews1,
      images: [minoaNews1, minoaNews2],
      tech: ["figma"],
      problem:
        "Minoa's storefront needed stronger UX, on-brand marketing assets, and a repeatable content system that new recruits could follow across B2B and B2C journeys.",
      approach: [
        "Audited and optimized the Shopify storefront for UX flow, UI consistency, and SEO.",
        "Produced converting marketing assets — reels, promotional stills, and newsletters — on-brand with Minoa's fonts, colours, and tone.",
        "Authored a newsletter guide to onboard new marketing recruits and standardize output.",
      ],
      outcome: [
        "Refined content strategy from customer insights and analytics to lift engagement and retention.",
        "Left behind a documented system the team could reuse after the internship.",
      ],
      reflection:
        "Working inside an established brand taught me to design within constraints and to make my process repeatable, so the impact outlived my time there.",
    },
    {
      code: "DL-002",
      name: "Deeds Leisure — Lead-Gen Tool",
      role: "Python/AI Scraper & Sales Intern",
      kind: "Desktop Automation",
      status: "shipped",
      year: "Jan – Mar 2026",
      featured: false,
      blurb:
        "A desktop lead-generation tool that automated outreach research across 25 Ontario cities and 43 business categories.",
      metric: "~75% TIME SAVED",
      href: "",
      repo: "",
      image: dlScraper,
      images: [dlScraper, dlApps, dlLeads],
      tech: ["python", "electron", "nodejs", "figma"],
      problem:
        "The sales team manually prospected across dozens of Ontario cities and business categories — slow, repetitive work that scaled poorly.",
      approach: [
        "Built a ~1,000-line Python scraping pipeline (DuckDuckGo Search, BeautifulSoup, regex extraction).",
        "Wrapped it in an Electron desktop app with a custom frameless UI designed in Figma so non-technical staff could run it.",
        "Improved lead relevance with quality scoring (0–100), franchise filtering, and domain blocklisting; packaged as .dmg / .exe via PyInstaller + electron-builder.",
      ],
      outcome: [
        "Automated outreach research across 25 cities and 43 categories, cutting manual prospecting time by roughly 75%.",
        "Handed the sales team a self-serve tool they could run without engineering support.",
      ],
      reflection:
        "Shipping for non-technical users made me value packaging and UX as much as the scraper itself — the tool only mattered once someone could actually run it.",
    },
    {
      code: "FM-005",
      name: "FM Radio Module",
      role: "Embedded Systems · Hardware",
      kind: "Embedded Systems",
      status: "shipped",
      year: "",
      featured: false,
      blurb:
        "A functional FM radio built from an Arduino Due and a TEA5756 module — tune stations, read the frequency live, and hear it through an amp and speaker.",
      metric: "LIVE FM TUNING",
      href: "",
      repo: "https://github.com/marcohope/FM-Radio-Module",
      image: fmRadio,
      images: [fmRadio],
      tech: ["cpp", "arduino"],
      problem:
        "Build a working FM receiver from discrete components — tuning, a live display, and clean audio — while learning low-level hardware interfacing end-to-end.",
      approach: [
        "Drove a TEA5756 FM module with an Arduino Due, using a rotary encoder to tune and an OLED to show the current frequency in real time.",
        "Wrote the firmware in C++ to handle hardware interaction and signal flow between components.",
        "Planned the system with a Tinkercad schematic and a flowchart mapping how the radio responds to user input.",
      ],
      outcome: [
        "A complete, tunable FM radio that displays station frequency and outputs clear audio through an amplifier and speaker.",
      ],
      reflection:
        "Working at the hardware level made the cost of every abstraction concrete — timing, wiring, and signal noise are unforgiving in a way software rarely is.",
    },
    {
      code: "AW-006",
      name: "Auto Plant Watering System",
      role: "Embedded Systems · Course Project",
      kind: "Arduino + MATLAB",
      status: "shipped",
      year: "",
      featured: false,
      blurb:
        "An Arduino + MATLAB rig that reads soil moisture and waters a plant automatically — only when the soil actually runs dry.",
      metric: "AUTO-WATERS ON DRY",
      href: "",
      repo: "",
      image: plantSetup,
      images: [plantSetup, plantFlow, plantGraph],
      tech: ["arduino"],
      problem:
        "Plants are easy to over- or under-water by hand — people guess, wasting water or stressing the plant. Could the soil itself decide when to water?",
      approach: [
        "Wired an Arduino (Grove Beginner Kit) to a soil-moisture sensor and a water pump switched through a MOSFET board.",
        "Wrote MATLAB to read the moisture level, plot a live voltage-vs-time graph, and drive the pump against a dry/wet threshold.",
        "Mapped the sense → decide → pump loop as a flowchart before building.",
      ],
      outcome: [
        "The pump runs when dry soil is detected and stops once the soil reads wet, with an accurate live moisture readout confirming each cycle.",
      ],
      reflection:
        "My first taste of closed-loop control — sense, decide, act. Rebuilding it, I'd distribute the water output evenly across the soil instead of a single point.",
    },
  ],

  // Career / education timeline (used on /about). Ongoing roles first, then
  // most recent; education anchors the bottom.
  journey: [
    {
      period: "2025 — Present",
      title: "Co-Founder · Technical",
      org: "Halix Solutions",
      note: "Owned full UI/UX, plus full-stack & marketing on a live, paying B2B AI SaaS.",
    },
    {
      period: "Jan — Mar 2026",
      title: "Python/AI Scraper & Sales Intern",
      org: "Deeds Leisure",
      note: "Desktop lead-gen tool — ~75% less manual prospecting.",
    },
    {
      period: "Oct 2024 — May 2025",
      title: "UX/UI & Digital Marketing Intern",
      org: "Minoa Home",
      note: "Shopify UX / UI / SEO audit + content strategy.",
    },
    {
      period: "2022 — Present",
      title: "BASc Computer Engineering (Hons.)",
      org: "York University",
      note: "Engineering competition placements (design + debate).",
    },
  ],

  // `image` = a certificate/award scan shown on-demand in the About lightbox;
  // null = no scan (rendered as a plain bullet).
  awards: [
    {
      label: "York Engineering Competition — 2nd Place, Junior Design (2023)",
      image: awardJuniorDesign,
    },
    {
      label: "York Engineering Competition — 3rd Place, Senior Design (2024)",
      image: awardSeniorDesign,
    },
    {
      label: "York Engineering Competition — 2nd Place, Debate (2023)",
      image: awardDebate,
    },
  ],

  certs: [
    {
      label: "AI-Powered Software & System Design — DeepLearning.AI (2026)",
      image: certAiDesign,
    },
    {
      label: "Crash Course on Python — Google (2026)",
      image: certPython,
    },
    {
      label: "Standard First Aid with CPR-C — Lifesaving Society (2023)",
      image: null,
    },
  ],

  // Full stack for the skills sections.
  allTech: [
    "typescript",
    "javascript",
    "python",
    "react",
    "nextjs",
    "tailwind",
    "gsap",
    "nodejs",
    "supabase",
    "postgres",
    "stripe",
    "vercel",
    "git",
    "github",
    "figma",
    "electron",
    "shadcn",
    "cpp",
    "arduino",
  ],
} as const;

export type Profile = typeof profile;

// Codes shown on /about as "engineering roots" (hardware origins) and kept OFF
// the /work catalogue, so the work page stays focused on client-facing builds.
export const ENGINEERING_ROOT_CODES: readonly string[] = ["FM-005", "AW-006"];

// ── Long-form case studies for the flagship projects ──────────────────────────
// Rendered as deep studies on /work, keyed by project `code`. Projects without
// an entry here render as compact catalogue cards in the "More from the
// catalogue" list. Kept OUT of `profile.projects` so the rich nested content
// doesn't fight `as const` inference (and so the catalogue stays scannable).
export type CaseStudy = {
  /** One-line outcome — the result, surfaced in a banner above the overview. */
  outcome: string;
  /** Short team / collaborators note for the credits line. */
  team: string;
  /** Honest AI-assistance disclosure — only where AI coding agents built it. */
  ai?: { tool: string; contribution: string };
  /** Lead overview paragraph — rendered as large lead type before the sections. */
  overview: string;
  /** Sections whose HEADING is the takeaway (not a generic "Problem/Approach"). */
  sections: { heading: string; body: string; points?: readonly string[] }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "HX-001": {
    outcome:
      "From zero to a live, paying B2B AI SaaS — designed, built, and owned end-to-end as the sole technical owner.",
    team: "Sole technical owner — no separate engineering team",
    ai: {
      tool: "Claude Code",
      contribution:
        "Directed Claude Code across the entire codebase while owning the architecture, reviewing every diff, and making each technical decision myself.",
    },
    overview:
      "Halix Solutions is an AI-powered B2B SaaS for digital marketing agencies. As technical co-founder, I took it from zero to a live, paying product — and I was the sole technical owner, with no separate engineering team behind me. I owned the full UI/UX across two surfaces: the public marketing site and the authenticated, multi-tenant in-app workspace. Behind the interface sit a multi-stage LLM research pipeline, Stripe billing, and security hardening. The stakes were plain: ship something agencies would actually pay for, then keep it running in production.",
    sections: [
      {
        heading: "Sole technical owner, directing the agents that wrote the code",
        body: "I built the entire codebase without a separate engineering team. The model: I directed AI coding agents (Claude Code) and owned the parts that don't delegate — architecture, code review, and every technical decision. The agents typed; I decided what got typed and what got rejected. That meant reading every diff, drawing the system boundaries, and choosing the stack. Next.js (App Router), React, TypeScript, Tailwind, and shadcn/ui on the front; Supabase for Postgres, Auth, and Row-Level Security behind it. It's a different way to ship software, and it scales one person across a full product without lowering the bar on what actually merges.",
        points: [
          "Architecture, code review, and technical calls stayed with me",
          "Frontend: Next.js, React, TypeScript, Tailwind, shadcn/ui",
          "Data layer: Supabase — Postgres, Auth, Row-Level Security",
        ],
      },
      {
        heading: "Two surfaces, one design system",
        body: "The product lives in two places: a public marketing site that has to sell, and an authenticated, multi-tenant workspace that has to work. I owned the UI/UX for both — user flows, wireframes, the visual system, and a reusable component library shared across them. One token set, one component vocabulary, so a button on the landing page and a button inside the app read as the same product. Multi-tenant meant designing for accounts, not just users: clean separation of who sees what, with Row-Level Security enforcing that boundary underneath the interface rather than trusting the UI to hide it.",
        points: [
          "Flows and wireframes through to the visual system",
          "One reusable component library across both surfaces",
          "Multi-tenant separation backed by RLS, not just UI state",
        ],
      },
      {
        heading: "A research pipeline with no research team behind it",
        body: "The core feature is automated market research: competitor intent-gap analysis and trend reports, built for agencies who'd otherwise do this work by hand. Under the hood it's a multi-stage LLM pipeline — background jobs orchestrated with Inngest so long-running analysis doesn't block a request, writing results into Supabase. I designed the prompts and the end-to-end analysis flow: how raw signals move through each stage and come out as a client-ready report. The hard part was never calling a model once. It was staging the work so it stays reliable when a single job runs long.",
        points: [
          "Inngest orchestrates multi-stage background jobs",
          "Owned prompt design and the full LLM analysis flow",
          "Outputs: competitor intent-gap analysis and automated trend reports",
        ],
      },
      {
        heading: "Billing and security weren't an afterthought",
        body: "Money and safety are easy to skip in a 0-to-1 and expensive to retrofit, so I wired both in early. Billing runs on Stripe — subscription tiers plus usage-based token-pack pricing, kept in sync through webhooks. Security got real attention: OWASP-style audits, rate limiting, Row-Level Security policies, and secure-by-default function permissions, so the database refuses bad access instead of trusting the app to ask politely. It all ships through Vercel with CI/CD that runs automated test and security gates and applies database migrations before anything reaches production.",
        points: [
          "Stripe: subscription tiers + usage-based token packs via webhooks",
          "RLS, rate limiting, OWASP-style audits, locked-down function perms",
          "Vercel CI/CD: test + security gates and migrations on every deploy",
        ],
      },
      {
        heading: "Shaping the story, not just the software",
        body: "A technical co-founder who only writes code leaves the product half-sold. I also shaped brand and go-to-market — the landing narrative, the positioning, and the marketing assets that carry them. That work fed straight back into the design: the same read on who the agency buyer is drove both the pitch on the marketing site and the flows inside the app. It's the throughline of the whole project — one person holding the product, the engineering direction, and the story it tells, together, and carrying it from zero to a live, paying SaaS.",
      },
    ],
  },
  "PF-003": {
    outcome:
      "A motion-led site that ships at 0 WCAG A/AA violations (axe-verified) and stays fully reduced-motion-aware — proof of the craft it claims.",
    team: "Solo — design & direction",
    ai: {
      tool: "Claude Code",
      contribution:
        "Designed the site and directed Claude Code to write the build — owning the architecture, motion design, theme system, and every taste call.",
    },
    overview:
      "This is the site you're reading. A motion-led portfolio I designed and built from scratch, with one job: prove the craft it claims instead of describing it. If I say I have a UI/UX eye and can choreograph front-end motion, the site itself has to be the evidence. So every page is its own themed world — sakura day and night, work, contact, craft — sharing one token set, with interactive 3D heroes and scroll-driven motion. Being my own client meant no brief to hide behind, and no one else to blame for a lazy decision.",
    sections: [
      {
        heading: "A portfolio has to pass its own audition",
        body: "A portfolio claiming UI/UX sensibility and front-end motion can't just list those skills — the page has to be the demo. That set the bar: the build is the argument. I was also my own client, which cut both ways. Total freedom, and nobody else's brief to blame when a decision came out lazy. Every spacing choice, every transition, every theme was a judgment call I had to defend to myself. It sharpened my taste and forced one question onto each interaction — does this earn its place, or is it motion for its own sake? Cuts came easy once that was the test.",
      },
      {
        heading: "One token set drives five themed worlds",
        body: "Each page is its own world — sakura day and night, work, contact, craft — but they aren't five separate builds. They share a single token set defined CSS-first in Tailwind v4, so a theme is a swap of variables, not a fork of the styling. That keeps the system honest: colour, type, and spacing stay consistent while the mood changes per route. Next.js App Router structures the pages; the theme layer rides on top. The payoff is range without drift. Each route can take its mood somewhere new while still reading as the same site by the same hand.",
        points: [
          "Tailwind v4, CSS-first tokens — one source of truth",
          "Day and night sakura variants from the same variables",
          "Per-route themes, not per-route rewrites",
        ],
      },
      {
        heading: "Motion only where it earns its keep",
        body: "Motion is choreographed in GSAP and ScrollTrigger, not sprinkled on. Scroll drives scene transitions; the work page pins into a horizontal slider; reveals stagger in as sections enter view. Loading isn't dead time either — themed liquid-glass loaders hold the frame while interactive Spline 3D scenes spin up as page heroes. Those scenes react to the cursor with distortion, so the hero feels handled rather than decorative. The rule throughout: every animation answers to the content. If a transition doesn't clarify where you are or where you're headed, it gets cut. That's the line between a site that moves and a site that's just busy.",
        points: [
          "Pinned horizontal work slider via ScrollTrigger",
          "Cursor-reactive Spline 3D heroes",
          "Liquid-glass loaders themed per page",
        ],
      },
      {
        heading: "Reduced-motion and no-JS are first-class paths",
        body: "None of the motion is allowed to trap anyone. Every overlay has a no-JS escape hatch, navigation works from the keyboard, and a reduced-motion path runs throughout — not a stripped fallback, a deliberate alternate. The site also respects prefers-reduced-transparency, so the liquid-glass surfaces dial down for people who need them to. I treated accessibility as part of the design, not a compliance pass at the end. A motion-led site is exactly the kind that breaks for people on the edges, so the edges got designed first — alongside the showpiece interactions, not bolted on after them.",
        points: [
          "Reduced-motion paths as deliberate alternates",
          "Keyboard-friendly navigation, no-JS escape hatches on every overlay",
          "Respects prefers-reduced-transparency",
        ],
      },
      {
        heading: "I made every call; agents wrote the code",
        body: "Honest scope: I designed this and directed AI coding agents (Claude Code) to build it. The architecture, the motion design, the theme system, and every taste call are mine — the agents typed under direction. That's how I work now, and it's the point, not a caveat. Directing the build well takes its own skill: holding the whole system in your head, specifying intent precisely, and rejecting output that's close-but-wrong. The design decisions are where the craft lives, and those didn't get delegated. What you're looking at is that loop made visible — me deciding, agents executing, me judging the result, then doing it again.",
      },
    ],
  },
  "DL-002": {
    outcome:
      "Cut the sales team's manual prospecting time by roughly 75% — and handed them a tool they could run without engineering support.",
    team: "Solo build, embedded on the sales team",
    overview:
      "Deeds Leisure's sales team prospected by hand — searching city by city, category by category, copying out contact details one search at a time. As a Python/AI scraper and sales intern, I built the tool that replaced that grind: a desktop app that researches outreach targets across 25 Ontario cities and 43 business categories on demand. The people running it weren't technical, so it had to feel like a product, not a script. I sat on the sales team it was built for, which kept the requirements honest and the test loop short.",
    sections: [
      {
        heading: "I was a user of the tool I was building",
        body: "My title had two halves — scraper and sales — and that turned out to be the point. I did the manual prospecting myself before I automated it, so I knew which steps were tedious and which fields the team actually used. Outreach research meant working through 25 Ontario cities and 43 business categories, one search at a time. Building for a team I sat on meant I could test a change at my own desk and watch whether it saved real minutes, not hypothetical ones. The estimated ~75% cut in prospecting time came from removing work I had personally felt.",
        points: [
          "Built the tool while doing the manual prospecting myself",
          "~75% less manual prospecting time (estimated)",
        ],
      },
      {
        heading: "A thousand lines of Python, no API to lean on",
        body: "There was no clean data source to call, so the pipeline assembled one. Roughly a thousand lines of Python: DuckDuckGo Search to surface candidate businesses per city and category, BeautifulSoup to parse the pages it found, and regex to pull contact details out of messy HTML. Each city–category pair fanned out into its own search, then folded back into one lead list. Scraping is brittle by nature — layouts vary, pages break — so much of the work was the unglamorous part: handling the cases where extraction returned nothing useful and keeping the run moving instead of stalling on a bad page.",
        points: [
          "~1,000-line pipeline: DuckDuckGo Search + BeautifulSoup + regex",
          "Fan-out across 25 cities x 43 categories, merged into one list",
        ],
      },
      {
        heading: "Scoring kept the team from chasing dead ends",
        body: "A raw scrape gives you volume, not quality — and a sales team that wastes calls on bad leads stops trusting the tool. So the pipeline scored every lead 0–100 instead of dumping everything it found. Franchises got filtered out, since national chains weren't the target. A domain blocklist caught directories, aggregators, and other noise that kept resurfacing. The point wasn't a perfect score; it was a list someone could work top-down with reasonable confidence. Ranking changed how the output got used — the team could trust the top of the list and stop second-guessing every row.",
        points: [
          "0–100 lead quality scoring",
          "Franchise filtering + domain blocklisting",
        ],
      },
      {
        heading: "The scraper only counted once someone could double-click it",
        body: "A Python script is useless to a sales team that won't open a terminal. So I designed a frameless desktop UI in Figma and wrapped the pipeline in an Electron app, with Node bridging the interface to the Python underneath. Then I packaged it as a .dmg and .exe with PyInstaller and electron-builder, so installing it was a double-click on whatever machine someone had. That last mile taught me the most: the engineering was only as valuable as the moment a non-technical colleague could run it alone, without me on a call walking them through Python. Packaging was the feature.",
        points: [
          "Frameless desktop UI designed in Figma, wrapped in Electron",
          "Shipped as .dmg and .exe via PyInstaller + electron-builder",
        ],
      },
    ],
  },
  "MN-004": {
    outcome:
      "Audited and tightened a live Shopify storefront across B2B and B2C, and left behind a documented content system the team still runs.",
    team: "Embedded on Minoa's marketing team",
    overview:
      "Minoa Home is a sustainable-luxury brand selling across two very different journeys — wholesale B2B buyers and direct B2C shoppers — on one Shopify storefront. As a UX/UI and digital-marketing intern, I worked inside an established brand rather than a blank canvas: audit the storefront for UX, UI consistency, and SEO; produce marketing assets that stay on-brand; and turn a one-off content push into a repeatable system the team could run after I left. The constraint was the point — every change had to respect Minoa's existing fonts, colours, and tone.",
    sections: [
      {
        heading: "One storefront, two audiences to keep straight",
        body: "Minoa sells to wholesale buyers and retail customers from the same Shopify storefront, and the two journeys want different things — B2B wants catalogue clarity and trust signals, B2C wants story and desire. I audited the storefront for UX flow, UI consistency, and SEO with both paths in mind, looking for where the experience blurred between them or dropped basic on-page SEO. The work was less 'redesign everything' and more 'find the friction and inconsistencies an established store accumulates,' then fix them without breaking the brand.",
        points: [
          "UX / UI / SEO audit across the B2B and B2C journeys",
          "Worked within Minoa's existing brand system, not a rebuild",
        ],
      },
      {
        heading: "On-brand assets that had to convert, not just look good",
        body: "Alongside the storefront I produced the marketing assets that drive traffic to it — reels, promotional stills, and newsletters — each held to Minoa's fonts, colours, and tone so the whole funnel reads as one brand. The bar wasn't 'pretty'; it was assets that move someone from a feed to the store, and from the store toward a purchase. Designing inside a tight brand system taught me to make taste calls within constraints, which is most of what real client work actually is.",
        points: [
          "Reels, promotional stills, and newsletters, all on-brand",
          "Tied top-of-funnel content back to the storefront",
        ],
      },
      {
        heading: "I left a system, not just deliverables",
        body: "An intern's output disappears when the intern leaves — unless it's a system. So I authored a newsletter guide that onboards new marketing recruits and standardises how the team produces content, and I refined the content strategy from customer insights and analytics rather than guesswork. The goal was leverage: a repeatable process that keeps producing on-brand, engagement-driven content after my term ended. The most valuable thing I left behind wasn't any single asset — it was the documentation that let the next person hit the same bar.",
        points: [
          "Authored a newsletter guide to onboard new recruits",
          "Content strategy refined from insights + analytics",
        ],
      },
    ],
  },
};
