# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio for **Usman Waris**, a Product & AI Engineer, built to the **@buildwithusman.io** Instagram brand: light world (`#FFFFFF` paper, `#FAFAF7` alternating cream), electric-blue accent used sparingly (`#2563EB`), charcoal text (`#0A0A0B`). Clean + confident (Linear / Apple-keynote feel, now light-mode). Big gradient display headings, a scroll-driven marquee, character-reveal copy, a sticky-stacking projects section, a certifications grid, and an AI "ask me anything" section powered by Claude. Positioning foregrounds **Automation, Agentic AI, Apps, Websites, and Cloud** alongside the core "AI Product Engineer" identity (see `PROFILE.tagline` and `WHAT_I_BUILD` in `content.ts`).

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve production build

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, imported with `@import "tailwindcss"` in `globals.css`)
- **Framer Motion** for all animation (scroll, in-view, transforms)
- **@anthropic-ai/sdk** — server-side, in `src/app/api/ask/route.ts`, for the AI Q&A section

> `package.json` still lists `three` / `@react-three/*` / `nodemailer` / `@emailjs/browser` from the previous design — they are **unused** by the current page and can be pruned.

## Environment

- `ANTHROPIC_API_KEY` — required only for the "Ask my AI" section. Without it, `/api/ask` returns 503 and the UI shows a graceful "not configured" message; the rest of the page works fine. See `.env.local.example`.

## Architecture

Everything renders from `src/app/page.tsx` (a `"use client"` component), wrapped by the fixed `<Navbar />`. Section order is fixed:

`HeroSection → ShowreelSection → MarqueeSection → AboutSection → ServicesSection → ProjectsSection → ExperienceSection → CertificationsSection → AskSection → ContactSection`

Content is Usman's real portfolio: hero/about copy describe a Product & AI Engineer, "Services" (`CAPABILITIES`) are his engineering offerings (agentic AI systems, LLM backends/RAG, real-time architecture, native/cross-platform apps, end-to-end delivery), and ProjectsSection uses his real projects — led by **Taxcore** (AI e-invoicing compliance agent) followed by Tea, Guestlist, FreeSpaces, SpaceFlip, VoiceTale, DayCalc, MedCon AI, Health Passport, Anchor, and voxa — with **local** images/video under `public/images/projects/` and `public/videos/`. ShowreelSection is a phone-mockup gallery (intentionally dark bezels regardless of page theme). CertificationsSection (`CERTIFICATIONS` in `content.ts`) is a curated grid of real certificates — images under `public/images/certifications/` (source screenshots also live in `public/images/course/`).

### The one API route — `src/app/api/ask/route.ts`

`POST /api/ask` streams a Claude answer about Usman as plain text.
- Model **`claude-opus-4-7`**, `effort: "low"` for snappy Q&A, `max_tokens: 1024`, streamed via `client.messages.stream(...)` → a `ReadableStream` of text deltas.
- The system prompt (a `const` in the route) is Usman's bio/projects/skills/contact, sent as a cached system block (`cache_control: {type:"ephemeral"}`). Note: Opus only caches prefixes ≥4096 tokens, so this prompt may not actually hit cache until it grows — the marker is correct placement regardless.
- Accepts `{ messages: {role,content}[] }`, keeps the last 10 valid turns. Returns 503 if `ANTHROPIC_API_KEY` is unset.
- `AskSection.tsx` consumes it with `fetch` + a `ReadableStream` reader, appending deltas to the in-progress assistant message.

### Directories

- `src/components/sections/` — the page sections. Each is a self-contained client component; all section content (nav links, marquee URLs, services, project data, certifications, contact links, AI suggestions) is hardcoded as a `const` (or imported from `content.ts`) at the top of its file.
- `src/components/ui/` — reusable building blocks:
  - `FadeIn` — scroll-triggered fade/slide wrapper. Props: `as` (div/section/h1/h2/p/span/li/nav), `delay`, `duration` (0.7), `x`, `y` (30), `className`, `style`. Animates **once** via `whileInView` with `viewport={{ once: true, margin: "50px", amount: 0 }}`, ease `[0.25, 0.1, 0.25, 1]`. Picks the motion element with `motion[as]`.
  - `Magnet` — mouse-following magnetic hover (hero portrait).
  - `AnimatedText` — character-by-character scroll reveal (`offset: ["start 0.8", "end 0.2"]`). Used for the About paragraph (rendered in Instrument Serif italic).
  - `ContactButton` — the **signature accent CTA**: `bg-[#2563EB]` + white text + blue glow on hover + arrow. Default link `#contact`; pass `href` for `mailto:`.

### Brand / design system

- **Colors are inline Tailwind arbitrary values**, not tokens: `#FFFFFF` (paper — page bg), `#FAFAF7` (cream — alternating section bg: Services, Projects' rounded-shelf overlap target, Certifications), `#0A0A0B` (ink — all text, headings, hairline borders/tints via opacity), `#2563EB` (electric-blue accent — used sparingly: brand-mark dot, CTAs, hover accents, live badges, AI section; `#1D4ED8` for darker hover states). `globals.css` also exposes `--color-ink/-paper/-cream/-accent/-accent-dark` in `@theme`.
- **Type stack** (loaded via one Google Fonts `@import` in `globals.css`, before `@import "tailwindcss"`): **Space Grotesk** = display headings & big numbers (`font-display font-bold`); **Inter** = body/default; **JetBrains Mono** = technical labels (`font-mono`: nav, project category, contact labels, CTA text, AI chips); **Instrument Serif** = emotional accent (`font-serif italic`, the About paragraph). `font-black` is not used (Space Grotesk tops out at 700).
- **`.hero-heading`** (in `globals.css`) is the gradient-clipped text (ink → slate) for the big headings ("Hi, i'm usman", "About me", "Project", "Experience", "Certifications", "Contact", "Ask my AI"). Reuse the class; don't reimplement the gradient. `.accent-gradient` (ink → accent blue) is used for emphasis numbers (stats, MoreCard fallback title).
- **Accent rule:** the blue accent reads fine on both white and cream backgrounds, so it's used directly everywhere now (no more "dark-fill + accent-icon" workaround) — hover states fill with `bg-[#2563EB] text-[#FFFFFF]` uniformly (Services arrows, Project card arrows, nav resume button). Keep it sparing: CTAs, live badges, dots, hover states, never large fills.
- **Hover-arrow motion** (Services rows and Project cards): a circular arrow that fills accent-blue (white icon) and rotates `-45°` on `group-hover`, plus a row/card slide. Reuse this pattern for new list/card items.
- **Brand mark:** lowercase `u` (Space Grotesk) + an accent-blue dot, top-left of the hero nav.
- **Fluid type** uses inline `style={{ fontSize: "clamp(...)" }}`; the hero `h1` uses responsive `text-[Nvw]` steps (sized so the full name fits without clipping).
- **Exception:** the ShowreelSection phone bezels (`bg-[#0A0A0B]`) are intentionally dark regardless of page theme — they're a device mockup, not a theme surface. Don't "fix" them to light.

### Images

Plain `<img>` (lazy-loaded), not `next/image`, so external hosts (figma.site, motionsites.ai) and local `/images/...` need no `next.config.ts` config. Keep the `eslint-disable-next-line @next/next/no-img-element` comment.

### MarqueeSection / ProjectsSection mechanics

- Marquee: `offset = (scrollY - sectionTop + innerHeight) * 0.3`; row 1 `translateX(offset - 200)`, row 2 `translateX(-(offset - 200))`. Each row is its image set **tripled**; tiles 420×270; passive scroll listener.
- Projects: parent `useScroll` (`offset: ["start start","end end"]`) feeds each `ProjectCard`; `targetScale = 1 - (total-1-index)*0.03`, `scale = useTransform(progress, [index/total, 1], [1, targetScale])`, card offset `top: index*28px` in an `h-[85vh]` `sticky top-24 md:top-32` container. Adding/removing a project rebalances automatically.

### Path alias

`@/*` maps to `./src/*` (see `tsconfig.json`).

## Notes

- The page is fully client-rendered (`page.tsx` is `"use client"`); `layout.tsx` is the only server component and owns `metadata` and the `#FFFFFF` theme color.
- Nav (`Navbar.tsx`, fixed/floating) is the brand mark + mono links from `NAV_LINKS` → `#showreel`, `#about`, `#projects`, `#experience`, `#certifications`, `#ask`, `#contact` — all have matching section ids. Hero/About CTAs scroll to `#contact`; the one in `ContactSection` is a `mailto:` link.
- No test framework is configured.
