// Single source of truth for hero/portfolio content.
// Pulled from resume.md — edit here to update the site.

// Project media (static imports → next/image gets size + blur for free).
import nsHome from "@/assets/about/nous-sommes-un/ns-home.png";
import nsMenu from "@/assets/about/nous-sommes-un/ns-menu.png";
import nsReservations from "@/assets/about/nous-sommes-un/ns-reservations.png";
import nsAbout from "@/assets/about/nous-sommes-un/ns-about.png";
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
import sixHero from "@/assets/about/6ix-aesthetics/six-hero.png";
import sixTreatments from "@/assets/about/6ix-aesthetics/six-treatments.png";
import sixResults from "@/assets/about/6ix-aesthetics/six-results.png";
import sixClinic from "@/assets/about/6ix-aesthetics/six-clinic.png";
import sixContact from "@/assets/about/6ix-aesthetics/six-contact.png";
import roseHeroLit from "@/assets/about/field-of-roses/rose-hero-lit.png";
import roseHeroDark from "@/assets/about/field-of-roses/rose-hero-dark.png";
import roseSeasons from "@/assets/about/field-of-roses/rose-seasons.png";
import roseQuotes from "@/assets/about/field-of-roses/rose-quotes.png";
import roseLetters from "@/assets/about/field-of-roses/rose-letters.png";
import hnPortfolioBg from "@/assets/about/honey-notes/hn-portfolio-bg.png";
import hnHome from "@/assets/about/honey-notes/hn-home.png";
import hnTranscript from "@/assets/about/honey-notes/hn-transcript.png";
import hnMeeting from "@/assets/about/honey-notes/hn-meeting.png";
import hnSummary from "@/assets/about/honey-notes/hn-summary.png";
import hnPauseMarker from "@/assets/about/honey-notes/hn-pause-marker.png";
import hnPlayback from "@/assets/about/honey-notes/hn-playback.png";
import hnLibrary from "@/assets/about/honey-notes/hn-library.png";
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
    "I build websites and product interfaces for founders and brands who care how a thing feels — motion and interaction that's actually correct: fast, accessible, reduced-motion-aware, and engineered, not just flashy. Most of that craft has gone into Halix Solutions, a live custom AI automation studio for marketing agencies I co-founded, where I lead the design and front-end across the marketing site and the client-facing systems, and share the client research and workflow with my co-founder.",
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
      code: "NS-007",
      name: "Nous Sommes Un",
      role: "Design + Build",
      kind: "Restaurant Web Experience",
      status: "live",
      year: "2026",
      featured: false,
      blurb:
        "A high-end restaurant site — Paris & Toronto — that sells atmosphere in seconds without sacrificing speed: cinematic, photography-heavy, and dark, built solo end-to-end with a full design-engineer pipeline.",
      metric: "96 PERF · 100 A11Y/SEO",
      href: "https://nous-sommes-un.vercel.app/",
      repo: "https://github.com/marcohope/nous-sommes-un",
      image: nsHome,
      images: [nsHome, nsMenu, nsReservations, nsAbout],
      tech: ["typescript", "nextjs", "react", "tailwind", "framer", "gsap", "figma"],
      problem:
        "High-end restaurants deserve websites that feel like the room itself, but most default to a generic template. The site had to sell atmosphere in seconds while staying fast, legible, and bookable on any device.",
      approach: [
        "Ran a structured design-engineer pipeline: researched luxury restaurant sites, wrote a problem statement, and set a design spec (typography, palette, logo) in Figma before any code.",
        "Built on Next.js (App Router) + TypeScript + Tailwind, using Framer Motion for UI motion and reserving GSAP ScrollTrigger for the pinned, scrubbed scroll sequences Framer's primitives don't handle well.",
        "Skipped a CMS and booking backend on purpose — a spec piece doesn't need infrastructure serving an editor that doesn't exist, so it ships fully static with nothing to break.",
      ],
      outcome: [
        "Shipped a bilingual (EN/FR) six-route site — home, menu, reservations, about, FAQ, contact — with a full 3-step booking flow.",
        "Hit Lighthouse 100 across accessibility, best practices, and SEO, with 96 performance on desktop despite a photography-heavy dark theme.",
      ],
      reflection:
        "Running a Design Intent Interview with Claude Code before writing any code, then iterating UI/UX through many planning rounds, taught me to separate atmosphere from cost — every animation had to earn its place against a hard performance budget.",
    },
    {
      code: "6A-008",
      name: "The 6ix Aesthetics",
      role: "Design + Build",
      kind: "Premium Med Spa Website",
      status: "live",
      year: "2026",
      featured: false,
      blurb:
        "A premium med spa site for a fictional Toronto clinic, built to prove a “$30k agency” feel comes from restraint — one motion identity, generous whitespace, and a single conversion path. Fully static, Lighthouse 98 desktop.",
      metric: "98 PERF · FULLY STATIC",
      href: "https://6ix-aesthetics.vercel.app",
      repo: "",
      image: sixHero,
      images: [sixHero, sixTreatments, sixResults, sixClinic, sixContact],
      tech: ["typescript", "nextjs", "react", "tailwind", "gsap", "framer"],
      problem:
        "Med spa websites are stuck between two failure modes: outdated template builds — teal-and-gold clichés, star-rating carousels, “20% off Botox” urgency — and text-heavy pages that bury the booking action. Both undermine the one thing a med spa sells: trust in a premium, medical-grade experience.",
      approach: [
        "Set the thesis before any design: luxury is communicated through restraint — whitespace, one coherent motion language, quiet exclusivity over urgency, and performance smooth enough to never break the spell.",
        "Built one motion identity, not scattered effects — all parallax on four named depth bands with consistent slow easings, plus a petal motif reused as a system primitive across markers, masks, glyphs, and page transitions.",
        "Architected every page around a single conversion path to one CTA — “Book a Consultation” — with a draggable before/after slider, an interactive clinic map, and a validated form with a sticky mobile CTA.",
      ],
      outcome: [
        "A complete multi-page site — home, treatments (with per-treatment pages), results, about, contact — that ships 100% static: 15 prerendered routes, zero server functions.",
        "Lighthouse 98 desktop / 88 mobile, WCAG 2.1 AA, with prefers-reduced-motion disabling all parallax while keeping the opacity fades.",
      ],
      reflection:
        "The discipline was subtraction: every animation had to earn its place against a hard performance budget, and the premium read came from what I left out — no countdown timers, no urgency, no template tells.",
    },
    {
      code: "FR-009",
      name: "The Field of Roses",
      role: "Design + Build",
      kind: "Interactive Single-Page Experience",
      status: "live",
      year: "2026",
      featured: false,
      blurb:
        "A quiet, single-page reminder that flowers — and people — bloom at different times: a night field of roses that glows where your cursor touches it. A designed object, not a product — no backend, no tracking, ~9 kB of page JavaScript.",
      metric: "100 PERF · 100 A11Y",
      href: "https://field-of-roses.vercel.app",
      repo: "https://github.com/marcohope/field-of-roses",
      image: roseHeroLit,
      images: [roseHeroLit, roseHeroDark, roseSeasons, roseQuotes, roseLetters],
      tech: ["typescript", "nextjs", "react", "tailwind"],
      problem:
        "People who feel behind measure themselves against everyone else's timeline. The site had to deliver one reassurance — your time to bloom will come — as a designed object: no backend, no tracking, nothing to buy.",
      approach: [
        "Built the hover-reveal hero from two layered photographs of the same rose field — dark and lit — with a radial CSS mask that follows the pointer, so visitors light up the field as they move through it.",
        "Made the “Pick a rose” quote generator deal ten hand-picked quotes on patience from a shuffled deck — nothing repeats until every quote has been seen — with a crossfade reveal and one-tap copy.",
        "Stayed deliberately dependency-light: scroll reveals via IntersectionObserver, animations in pure CSS, ~9 kB of page JavaScript on Next.js 15 + React 19 + Tailwind v4.",
      ],
      outcome: [
        "Lighthouse 100 performance / 100 accessibility — prefers-reduced-motion throughout, aria-live quote announcements, semantic blockquote/cite markup, WCAG-AA contrast at every step.",
        "Small details carry the tone: the tab title changes to “The field is still here.” when you leave, and a rose waits in the dev console.",
      ],
      reflection:
        "The restraint is the point — one idea, told slowly. The palette came from the photography itself: near-black night, deep wine reds, rose pink, warm parchment.",
    },
    {
      code: "HX-001",
      name: "Halix Solutions",
      role: "Co-Founder · Design & Front-End",
      kind: "Custom AI Automation Studio",
      status: "live",
      year: "2025 — Present",
      featured: true,
      blurb:
        "A custom AI automation studio for social-media marketing agencies — it automates the back-office busywork so the client-facing creative stays human. Co-founded with Joshua Ali; I lead the design and front-end, and we share the client research and workflow.",
      metric: "0 → 1 · UI/UX + FRONT-END",
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
      tech: ["figma", "typescript", "nextjs", "react", "tailwind", "python", "postgres", "vercel"],
      problem:
        "Social-media marketing agencies lose hours to back-office busywork — lead discovery, scoring, outbound, reporting — non-creative work that scales badly and pulls focus off the client-facing craft that actually sells the agency. Off-the-shelf tools never fit any one agency's workflow.",
      approach: [
        "Co-run the discovery with my co-founder: client meetings that map each agency's workflow and pin down exactly which automations their business needs.",
        "Lead the design and front-end — turning that research into a demo that shows the client what the automation looks like, UI and all, then iterating it into a working prototype deployed on Vercel against UI/UX best practices and the client's direction.",
        "Ship a fully tailored, modular system on a modern stack — Next.js, React, Tailwind, TypeScript up front, PostgreSQL and Python behind it — wired to whatever the workflow needs (Gmail, Apify, Deepgram, Mail Meteor, any API), with the LLM chosen per system.",
      ],
      outcome: [
        "Live, client-owned systems deployed on their own subdomain that cut the non-creative work, with ongoing monitoring and iteration.",
        "One cohesive design language across the marketing site and the client-facing tools — automation that still feels considered, not bolted on.",
      ],
      reflection:
        "The discipline is drawing the line in the right place: automate the busywork, never the creative a client's customers actually see. Co-founding means splitting by strength — Josh and I both sit in the research and shape the workflow, and I take the design and front-end from there.",
    },
    {
      code: "HN-010",
      name: "Honey Notes",
      role: "Design + Build",
      kind: "Local-First Meeting Note Taker",
      status: "shipped",
      year: "2026",
      featured: false,
      blurb:
        "A local-first meeting note taker that doesn't join calls as a bot — it records the mic and the machine's system audio as two separate tracks, transcribes locally with whisper.cpp, and summarizes on demand. Built in three days as Halix Solutions' internal tool.",
      metric: "3 DAYS · 553 TESTS",
      href: "",
      repo: "",
      image: hnPortfolioBg,
      images: [
        hnHome,
        hnTranscript,
        hnMeeting,
        hnSummary,
        hnPauseMarker,
        hnPlayback,
        hnLibrary,
      ],
      tech: ["typescript", "electron", "react", "tailwind", "nodejs"],
      problem:
        "Meeting apps charge monthly for a bot that joins your calls and ships features on someone else's roadmap. Halix needed its own note taker — one that captures the conversation on the machine itself and keeps every recording there.",
      approach: [
        "Captured the mic and the machine's system audio as two separate tracks, never mixed — so speaker attribution comes free, with no diarization model guessing who said what.",
        "Transcribed locally with whisper.cpp and merged the two segment lists by timestamp into one interleaved conversation; summaries are a single MiniMax call, only on an explicit Summarize press.",
        "Split the capture architecture per platform — a Core Audio tap in the main process on macOS, WASAPI loopback in the renderer on Windows — with one function deciding the strategy for both.",
      ],
      outcome: [
        "Feature-complete v1 in two days — record, pause, transcribe, play back, summarize — with the Windows port and Google Calendar landing on day three.",
        "Audio never leaves the machine, and meeting data crosses the network only on an explicit Summarize press.",
      ],
      reflection:
        "The subscription was never about the money — it was about the roadmap. Owning the tool means a wanted feature ships the same day, and the test suite is what makes that pace safe.",
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
      title: "Co-Founder · Design & Front-End",
      org: "Halix Solutions",
      note: "Lead design & front-end for a live custom AI automation studio for marketing agencies; co-own client research & workflow.",
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
  /** Quiet disclosure rendered under the gallery (e.g. demo-data screenshots). */
  mediaNote?: string;
  /** Lead overview paragraph — rendered as large lead type before the sections. */
  overview: string;
  /** Sections whose HEADING is the takeaway (not a generic "Problem/Approach"). */
  sections: { heading: string; body: string; points?: readonly string[] }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "NS-007": {
    outcome:
      "A cinematic, photography-heavy restaurant site that still hits Lighthouse 100 across accessibility, best practices, and SEO — 96 performance on desktop, proving atmosphere and speed aren't a trade-off.",
    team: "Solo — design & direction",
    ai: {
      tool: "Claude Code",
      contribution:
        "Ran a Design Intent Interview with Claude Code before writing any code, then directed it through scaffolding, animation, and polish — reviewing every diff and making every UX call myself.",
    },
    overview:
      "Nous Sommes Un — French for 'we are one' — is a fictional high-end restaurant split across two dining rooms, Paris and Toronto. The brief I set myself: most luxury restaurant sites load like templates, and a five-star room should never feel like one. The site's whole pitch is atmosphere plus speed — cinematic and image-heavy, but instant to load — and that tension drove every decision, from the stack to the animation budget.",
    sections: [
      {
        heading: "A written brief before a single line of code",
        body: "I treated it like a real client brief, not a portfolio sketch. I researched what current luxury restaurant sites do well and where they fail, wrote a problem statement, and only then started brainstorming the restaurant itself — the name symbolizes unity and strength. Before touching Next.js I built a design spec in Figma: typography, colour, logo, visual language. The must-haves stayed non-negotiable throughout: menu, hours, locations, and reservations findable in seconds, a hamburger nav on mobile with one-tap location/email/social, and full SEO and metadata.",
        points: [
          "Researched competitor luxury-restaurant sites before any design work",
          "Figma design spec — typography, palette, logo — preceded the build",
          "Hard requirement: menu/hours/location/reservations findable in seconds, mobile-first nav",
        ],
      },
      {
        heading: "Directing Claude Code through a Design Intent Interview",
        body: "Before Claude Code wrote anything, I gave it the full brief and ran it through a structured Design Intent Interview — iterating on UI/UX intent across many rounds of planning before any implementation. That kept the agent's output aimed at a specific feeling (atmosphere, restraint, premium pacing) instead of generic restaurant-template defaults. From there the build ran as a tracked pipeline: scaffold and dependencies, brand and content data, the shell (header, contact dropdown, mobile menu, footer, six routes), then a static home page built from 19 curated photos across five sections.",
        points: [
          "Design Intent Interview with Claude Code before any code was written",
          "Tracked pipeline: scaffold → brand/data → shell → home → subpages → reservations → animation → SEO/a11y/perf",
          "19 curated photos across 5 home sections",
        ],
      },
      {
        heading: "Framer Motion for UI, GSAP for the scroll choreography that needed it",
        body: "The stack is Next.js (App Router) + TypeScript + Tailwind, with Framer Motion driving interface motion and GSAP ScrollTrigger brought in specifically for the pinned, scrubbed scroll sequences — Framer's scroll primitives aren't built for that. Next.js's static rendering and image optimization are why a photography-heavy dark site could still hit strong Lighthouse scores, which is exactly where most restaurant sites lose. TypeScript because the code is part of the portfolio and has to be inspectable, not just the finished page.",
        points: [
          "Next.js App Router + TypeScript + Tailwind",
          "Framer Motion for UI motion, GSAP ScrollTrigger for pinned/scrubbed scroll sequences",
          "Static rendering + image optimization carried the Lighthouse scores",
        ],
      },
      {
        heading: "No CMS, no booking backend — on purpose",
        body: "It would have been easy to over-build this: a CMS for content, a real backend for reservations. I deliberately skipped both. A spec piece doesn't need infrastructure serving an editor that doesn't exist, so the three-step reservation flow — location, then date and time slots, then guest details — runs fully client-side with a frame-draw confirmation, and the whole site ships static with nothing to break in production. The bilingual EN/FR toggle got the same restraint: real content in both languages, not a translation-library stand-in.",
        points: [
          "3-step reservation flow — location → date/slots → details — with a frame-draw confirmation",
          "Fully static: no CMS, no booking backend, nothing to break",
          "EN / FR language toggle with real bilingual content, not machine translation",
        ],
      },
      {
        heading: "Where the numbers actually landed",
        body: "After the animation pass — Lenis smooth scroll, parallax, a pinned gallery, a preloader, reduced-motion handling, and cleaning up ghost ScrollTriggers — I ran the SEO, accessibility, and performance pass: JSON-LD, sitemap, OG image, a full keyboard sweep. Lighthouse came back 100 on accessibility, best practices, and SEO, with 96 performance on desktop and roughly 85 on mobile for a dark, image-dense site. Then real refinements — bug fixes, parallax edge cases, the EN/FR toggle — before deploying live on Vercel.",
        points: [
          "Lighthouse: 100 a11y / best-practices / SEO, 96 perf desktop, ~85 mobile",
          "Lenis smooth scroll, parallax, pinned gallery, preloader, reduced-motion throughout",
          "Deployed live on Vercel — two fictional rooms, Paris and Toronto",
        ],
      },
    ],
  },
  "6A-008": {
    outcome:
      "A premium med spa site that reads as a “$30k agency” build — one motion identity, a single conversion path, and a fully static architecture that still hits Lighthouse 98 on desktop.",
    team: "Solo — design & direction",
    ai: {
      tool: "Claude Code",
      contribution:
        "Set the brief and the motion system, then directed Claude Code through the build — reviewing every diff and making each design and compliance call myself.",
    },
    overview:
      "The 6ix Aesthetics is a fictional Toronto med spa, built to make one argument: premium design doesn't have to be complicated. Most med spa sites fail in one of two ways — outdated template builds heavy with teal-and-gold clichés and “20% off” urgency, or text-heavy pages that bury the booking action. Both undermine the one thing a med spa actually sells: trust in a premium, medical-grade experience. My thesis was the inverse of the template playbook — luxury is communicated through restraint.",
    sections: [
      {
        heading: "Restraint is the whole product",
        body: "Most med spa sites betray themselves with urgency — countdown timers, star-rating carousels above the fold, “20% off Botox.” That playbook sells discounts, not trust, and trust is the only thing a premium clinic has to sell. So I inverted it: quiet exclusivity instead of pressure, generous whitespace instead of dense service grids, and one calm CTA — “Book a Consultation” — instead of a wall of offers. Every decision after that was a subtraction, not an addition.",
        points: [
          "Quiet exclusivity over urgency — no countdown timers, no “% off”",
          "Generous whitespace as the primary luxury signal",
          "A single calm CTA — “Book a Consultation” — never a discount",
        ],
      },
      {
        heading: "One motion identity, not scattered effects",
        body: "The fastest way to look like a template is to bolt on unrelated animations. Instead I built a single motion language: all parallax runs on four named depth bands — background at 0.3x through floating elements at 1.15x — with the same slow easings (0.4 / 0.8 / 1.4s) everywhere. Nothing snaps or bounces; the motion is deliberate and unhurried, so it reads as part of the brand rather than decoration on top of it. GSAP + ScrollTrigger drives the scroll choreography, Framer Motion handles micro-interactions, and Lenis smooths the whole scroll.",
        points: [
          "Four named depth bands: background 0.3x → floating 1.15x",
          "Consistent slow easings (0.4 / 0.8 / 1.4s) — nothing snaps",
          "GSAP ScrollTrigger + Framer Motion + Lenis, one coherent system",
        ],
      },
      {
        heading: "A petal motif that makes it un-templatable",
        body: "One shape does the structural work across the whole site. The petal shows up as section markers, image masks, list glyphs, and the page-transition mark — all derived from the same primitive. That's what separates a real design from a template: not a unique hero image, but a consistent visual grammar repeated with intent. Once the motif is a system instead of an ornament, the design can't be lifted onto another brand without falling apart.",
        points: [
          "Petal primitive → section markers, image masks, list glyphs, transitions",
          "A repeated visual grammar, not one-off decoration",
        ],
      },
      {
        heading: "Conversion architecture over decoration",
        body: "Premium doesn't mean precious — the site still has to book consultations. Every page funnels to the same action, and the interactions all serve it: a draggable before/after results slider, an interactive clinic map, and a validated consultation form with a sticky CTA on mobile so booking is never more than a thumb away. The treatment copy is suitability-aware and compliance-conscious — physician-directed language, illustrative-content disclosures — because a med spa is a medical context, not just a spa.",
        points: [
          "Single conversion path to one CTA on every page",
          "Draggable before/after slider, interactive clinic map, sticky mobile CTA",
          "Compliance-conscious, physician-directed treatment copy",
        ],
      },
      {
        heading: "Accessibility and speed are part of the luxury read",
        body: "Jank breaks the premium spell, so performance was treated as a design feature, not a cleanup pass. The site ships 100% static — 15 prerendered routes with zero server functions, per-treatment pages generated at build time — on Next.js 16 (App Router, Turbopack), React 19, and Tailwind v4, with MapLibre GL powering the clinic map without an API-key dependency. Accessibility was a hard gate: WCAG 2.1 AA, full keyboard operability on the sliders and menus, and a prefers-reduced-motion path that disables every parallax while keeping the opacity fades. Lighthouse came back 98 on desktop and 88 on mobile.",
        points: [
          "100% static — 15 prerendered routes, zero server functions",
          "Next.js 16 (Turbopack) · React 19 · Tailwind v4 · MapLibre GL",
          "WCAG 2.1 AA, reduced-motion disables parallax, Lighthouse 98 / 88",
        ],
      },
    ],
  },
  "FR-009": {
    outcome:
      "A single-page designed object that ships ~9 kB of JavaScript and hits Lighthouse 100 performance / 100 accessibility — proof that one idea, told slowly, can carry a whole site.",
    team: "Solo — design & direction",
    ai: {
      tool: "Claude + Claude Code + GPT Image",
      contribution:
        "Designed with Claude and built by directing Claude Code — reviewing every diff and making every taste call myself. The rose-field imagery was generated with GPT Image.",
    },
    overview:
      "The Field of Roses is a quiet, single-page reminder that flowers — and people — bloom at different times. I built it for anyone who feels behind: a night field of roses that glows where your cursor touches it, ten hand-picked quotes on patience, and nothing else. It's a designed object rather than a product — no backend, no tracking, nothing to buy — and every technical decision serves that restraint.",
    sections: [
      {
        heading: "A designed object, not a product",
        body: "Most encouragement online arrives wrapped in a funnel — a newsletter to join, a course to buy, a metric to move. This page refuses all of it. There's no backend, no tracking, and nothing for sale; the message is the whole product. That framing set the constraint for everything downstream: if a feature didn't help say 'your time to bloom will come' more quietly or more beautifully, it didn't ship. The result is closer to a printed keepsake than a web app — a page you visit when you need it, that asks nothing back.",
        points: [
          "No backend, no analytics, no conversion path — on purpose",
          "One idea, told slowly, as the entire scope",
        ],
      },
      {
        heading: "Two photographs and a mask make the signature interaction",
        body: "The hero is two layered photographs of the same rose field — one dark, one lit — with a radial CSS mask that follows the pointer. As visitors move through the field, they light it up themselves: the metaphor is the interaction. There's no WebGL, no canvas, no library — just a mask-image driven by two custom properties updated on pointermove. It's the site's whole thesis in one gesture: the field is already full of light; you just haven't moved through it yet.",
        points: [
          "Dark + lit photographs of the same field, layered",
          "Radial CSS mask follows the pointer — no WebGL, no canvas",
          "The visitor lights the field up — the metaphor is the interaction",
        ],
      },
      {
        heading: "Ten quotes, dealt like a deck",
        body: "The 'Pick a rose' generator holds ten hand-picked quotes on patience and perseverance — scripture, Churchill, and other voices that have carried people through slow seasons. They deal from a shuffled deck, so nothing repeats until every quote has been seen, with a crossfade reveal and one-tap copy so a line can leave the page with you. Quote changes announce through an aria-live region, and the markup is semantic blockquote/cite — a quote generator that's honest about being one.",
        points: [
          "Shuffled-deck dealing — no repeats until all ten are seen",
          "Crossfade reveal + one-tap copy",
          "aria-live announcements, semantic blockquote/cite markup",
        ],
      },
      {
        heading: "Dependency-light on purpose",
        body: "The stack is Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4 — and almost nothing else. Scroll reveals run on IntersectionObserver, animations are pure CSS, and the page ships roughly 9 kB of JavaScript. Accessibility was treated as a feature, not a pass: prefers-reduced-motion support throughout, WCAG-AA contrast at every step against a near-black ground. Lighthouse came back 100 performance and 100 accessibility — the quiet page is also the fast one.",
        points: [
          "Next.js 15 + React 19 + TypeScript + Tailwind v4",
          "IntersectionObserver reveals, pure-CSS animation, ~9 kB page JS",
          "Lighthouse 100 perf / 100 a11y, reduced-motion-aware throughout",
        ],
      },
      {
        heading: "The smallest details carry the tone",
        body: "The palette is pulled from the photography itself — near-black night, deep wine reds, rose pink, warm parchment — with Cormorant Garamond as the editorial voice and Jost for structure. Then the details most visitors never notice: the tab title changes to 'The field is still here.' when you leave, a rose waits in the dev console for anyone who opens it, and even text selection and focus rings match the palette. None of it is necessary. All of it is the point — care, applied evenly, down to the corners nobody checks.",
        points: [
          "Palette sampled from the photographs: night, wine, rose, parchment",
          "Cormorant Garamond for voice, Jost for structure",
          "Tab title, console rose, selection + focus rings — all in-world",
        ],
      },
    ],
  },
  "HX-001": {
    outcome:
      "A custom AI automation studio for marketing agencies, taken live — I lead the design and front-end across the marketing site and the client-facing systems, and share the client research and workflow with my co-founder.",
    team: "Co-founded with Joshua Ali — I lead design & front-end; we share the client research and workflow.",
    ai: {
      tool: "Claude Code",
      contribution:
        "Built the interfaces and systems I designed by directing Claude Code — owning the design and front-end and reviewing every diff.",
    },
    overview:
      "Halix Solutions is a custom AI automation studio for social-media marketing agencies, co-founded with Joshua Ali. The premise is one line: the creative stays human, the busywork doesn't. Agencies keep the content, design, and strategy their clients can see; we automate the back-office grind behind it — lead discovery and scoring, outbound, reporting, the workflows that scale badly by hand. Josh and I both sit in the client research and shape each workflow; I lead the design and front-end, from the marketing site to the systems the client actually uses.",
    sections: [
      {
        heading: "The creative stays human. The busywork doesn't.",
        body: "The whole studio runs on one boundary: AI shouldn't touch the work an agency's clients can see. Content, graphics, strategy, brand voice — that stays human. Everything behind it — lead discovery, scoring and filtering, outbound personalization, follow-ups, weekly reporting — gets a system. That line isn't just positioning; it's the design constraint. Every automation we build has to earn its keep by staying firmly on the back-office side of it, so an agency's craft is amplified, never replaced.",
        points: [
          "Client-facing creative stays human; back-office busywork gets automated",
          "The boundary is the product — and the design constraint",
        ],
      },
      {
        heading: "Research first, then a demo they can actually see",
        body: "Nothing gets built off a guess. Josh and I run the discovery together — client meetings that map an agency's real workflow and surface exactly which automations their business needs. From there I take the design and front-end: the research becomes a demo that shows the client what the automation will look like, UI and all, so an abstract ‘we’ll automate your outreach’ turns into something concrete they can react to before a line of production code exists.",
        points: [
          "Client meetings map the workflow and pin down what to automate",
          "Research becomes a visual demo — the UI makes the automation concrete",
        ],
      },
      {
        heading: "Demo → working prototype on Vercel",
        body: "Once the demo lands, I iterate it into a working prototype deployed on Vercel — the point where the client can click through the real thing, not a mockup. That loop is where the UI/UX work concentrates: I research best practices for each surface and fold in the client's direction, so the software ends up as the client intended rather than as the default the tools nudge you toward. Iterating in the open, against a live URL, keeps the feedback honest and the direction correct.",
        points: [
          "Prototype deployed live on Vercel — clickable, not a mockup",
          "UI/UX best practices plus the client's direction on every surface",
        ],
      },
      {
        heading: "A tailored, modular system on a modern stack",
        body: "The final phase hands the client a fully tailored, modular system that cuts the non-creative work for good. It's built on a deliberately modern, well-resourced stack — Next.js, React, Tailwind, and TypeScript on the front, PostgreSQL and Python behind it — and wired to whatever the workflow actually touches: Gmail, Apify, Deepgram, Mail Meteor, Stripe, essentially any service with an API. The LLM is chosen per system, matched to what that particular automation needs rather than forced to one provider. It ships to the client's own subdomain with ongoing monitoring and iteration.",
        points: [
          "Modern stack: Next.js, React, Tailwind, TypeScript · PostgreSQL, Python",
          "Integrates anything with an API — Gmail, Apify, Deepgram, Mail Meteor, Stripe",
          "LLM chosen per system; deployed to the client's own subdomain",
        ],
      },
      {
        heading: "Co-founders, split by strength",
        body: "Halix is two engineers, not a solo act. Joshua Ali (Electrical Engineering) and I (Computer Engineering) co-founded it out of York, and we split the work by where each of us is strongest: we both run the client research and construct the workflow, and I lead the design and front-end from there. That division is why the product holds together — one person owning the way it looks and feels across the marketing site and the client systems, so the whole thing reads as one considered build rather than a stitch of separate parts.",
      },
    ],
  },
  "HN-010": {
    outcome:
      "The meeting note taker built for the Halix team — macOS and Windows, with every recording staying on the machine.",
    team: "Solo — built as an internal tool for Halix Solutions",
    ai: {
      tool: "Claude Code",
      contribution:
        "Designed the system and directed Claude Code through the entire build — reviewing every diff and making every architecture and product call myself.",
    },
    mediaNote:
      "Demo data — the meeting and everyone in it are fictional; the transcripts shown were generated from synthesized speech. No real client call appears here.",
    overview:
      "Honey Notes is a local-first meeting note taker, built for Halix Solutions' own use — because paying a monthly subscription for something buildable overnight felt wrong, and because a wanted feature should ship the same day, not sit on someone else's roadmap. No bot joins the call. It records both halves of the conversation itself — the mic on one track, the other side arriving through the speakers on another — runs whisper.cpp on-device, and summarizes only when asked. One design decision carries the whole app: keep the two sides separate, and speaker attribution comes free.",
    sections: [
      {
        heading: "Three days, because the alternative was a subscription",
        body: "Halix runs on client calls, and a call that isn't captured is a set of decisions that exist only in memory. The market answer is a monthly fee for a bot that joins your meetings. I built the alternative instead: 26–28 July, 25 commits. Day two ended with a feature-complete v1 — record, pause, transcribe, play back, summarize. Day three added the Windows port and Google Calendar. What keeps three days from reading as a warning is the test suite: 37 files, nearly a line of test for every line of source.",
        points: [
          "Feature-complete v1 on day two — record, pause, transcribe, play back, summarize",
          "Day three: the Windows port and Google Calendar",
          "Internal tool for Halix Solutions — nothing for sale",
        ],
      },
      {
        heading: "Two tracks captured separately — speaker attribution comes free",
        body: "Honey Notes never joins a call as a bot. It sits on the machine and captures the meeting the way the machine already hears it: the microphone as one track, the system audio — the other side's voice coming out of the speakers — as a second. The two are never mixed, and that does the work a diarization model normally does: every segment already knows who said it, because it knows which file it came from. On stop, each WAV runs through whisper.cpp locally and the two segment lists merge by timestamp into one interleaved conversation.",
        points: [
          "Mic and system audio captured separately, never mixed — no diarization model anywhere",
          "Two segment lists merged by timestamp into one interleaved conversation",
          "Names snapshot onto the meeting row before the first sample — a rename never rewrites an old transcript",
        ],
      },
      {
        heading: "The same recording, captured backwards on each platform",
        body: "System audio is the hard half, and each OS demanded the opposite answer. On macOS, a Core Audio tap captures it in the main process — Chromium's loopback path returns pure silence there (electron#49607). On Windows, WASAPI loopback through Chromium's getDisplayMedia works, but only in the renderer. So the two platforms run reverse architectures: main captures on one, the window captures on the other. One function in the main process picks the strategy and tells the renderer which side it owns. Both paths append to the same WAV; pause, transcription, and the merge never know the difference.",
        points: [
          "macOS: Core Audio tap in the main process; Windows: WASAPI loopback in the renderer",
          "One function in main decides the strategy — the renderer is told, never guesses",
          "Both paths write the same WAV, so everything downstream is shared",
        ],
      },
      {
        heading: "Privacy by architecture, not policy",
        body: "Audio never leaves the machine: transcription is whisper.cpp running on-device. The transcript crosses the network exactly once — the only call that ever carries meeting data, to MiniMax, and only on an explicit Summarize press, behind a one-time consent gate enforced in the main process so a renderer bug can't skip it. Google Calendar is read-only, and every Google call lives in main, which is why the renderer's CSP names no Google origin. If a change ever needed one added, that's proof a call leaked into the window — the CSP is a tripwire, not configuration.",
        points: [
          "Meeting data crosses the network exactly once — MiniMax, on an explicit Summarize press",
          "Consent gate enforced in the main process — a renderer bug can't skip it",
          "Renderer CSP names no Google origin — a tripwire, not config",
        ],
      },
      {
        heading: "A summary that invents a person is refused",
        body: "Summaries come back in five fixed sections — TL;DR, Decisions, Action Items, Open Questions, Timeline — and an empty section says “None”, so a missing heading always means a malformed response. Then the check that matters: every action item must be owned by one of the two speakers in that meeting. An owner outside that set means the model invented a third person — the hallucination that actually does damage in a meeting summary, because a fabricated name reads exactly as plausibly as a real one. That response is refused, not stored.",
        points: [
          "Every action item must be owned by one of the meeting's two speakers",
          "An owner outside that set means a hallucinated person — refused, not stored",
        ],
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
