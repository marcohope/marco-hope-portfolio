Stack (Next.js portfolio at /Users/marcohope/marco-hope-portfolio):

Layer	Tech
Framework	Next.js 15.3+ (App Router/RSC), migrated from Vite
UI	React 19.1
Lang	TypeScript 5.7 (strict)
Styles	Tailwind v4 (CSS-first @theme, @tailwindcss/postcss)
Animation	GSAP 3.15 (Framer Motion ripped out — motion uninstalled)
Content	@next/mdx 3.1 + remark-frontmatter / remark-mdx-frontmatter
Images	sharp 0.34, @svgr/webpack (custom optimize-bg.mjs → avif/webp)
Deploy	Vercel target
CI	Lighthouse CI (@95 gate, .github/workflows)
Scripts: dev / build / start / lint / typecheck / optimize:bg. Predev+prebuild auto-run bg optimizer.
