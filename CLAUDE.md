# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio for **Usman Waris**, a Product & AI Engineer, built to the **@buildwithusman.io** Instagram brand: charcoal world (`#0A0A0B`), electric-lime accent used sparingly (`#CCFF00`), warm off-white text (`#F5F5F7`). Dark + cinematic (Linear / Apple-keynote feel). Big gradient display headings, a scroll-driven marquee, character-reveal copy, a sticky-stacking projects section, and an AI "ask me anything" section powered by Claude.

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

Everything renders from `src/app/page.tsx` (a `"use client"` component). Section order is fixed:

`HeroSection → MarqueeSection → AboutSection → ServicesSection → ProjectsSection → ContactSection → AskSection`

Content is Usman's real portfolio: hero/about copy describe a Product & AI Engineer, "Services" are his engineering offerings (AI/LLM systems, agentic workflows, backend, CV/ML, end-to-end product), and ProjectsSection uses his real projects (Health Passport, SpaceAI, Optify, Teacup, MedCon AI, LumaSleep) with **local** images under `public/images/projects/`. The MarqueeSection GIFs remain decorative external assets from the template.

### The one API route — `src/app/api/ask/route.ts`

`POST /api/ask` streams a Claude answer about Usman as plain text.
- Model **`claude-opus-4-7`**, `effort: "low"` for snappy Q&A, `max_tokens: 1024`, streamed via `client.messages.stream(...)` → a `ReadableStream` of text deltas.
- The system prompt (a `const` in the route) is Usman's bio/projects/skills/contact, sent as a cached system block (`cache_control: {type:"ephemeral"}`). Note: Opus only caches prefixes ≥4096 tokens, so this prompt may not actually hit cache until it grows — the marker is correct placement regardless.
- Accepts `{ messages: {role,content}[] }`, keeps the last 10 valid turns. Returns 503 if `ANTHROPIC_API_KEY` is unset.
- `AskSection.tsx` consumes it with `fetch` + a `ReadableStream` reader, appending deltas to the in-progress assistant message.

### Directories

- `src/components/sections/` — the seven page sections. Each is a self-contained client component; all section content (nav links, marquee URLs, services, project data, contact links, AI suggestions) is hardcoded as a `const` at the top of its file.
- `src/components/ui/` — reusable building blocks:
  - `FadeIn` — scroll-triggered fade/slide wrapper. Props: `as` (div/section/h1/h2/p/span/li/nav), `delay`, `duration` (0.7), `x`, `y` (30), `className`, `style`. Animates **once** via `whileInView` with `viewport={{ once: true, margin: "50px", amount: 0 }}`, ease `[0.25, 0.1, 0.25, 1]`. Picks the motion element with `motion[as]`.
  - `Magnet` — mouse-following magnetic hover (hero portrait).
  - `AnimatedText` — character-by-character scroll reveal (`offset: ["start 0.8", "end 0.2"]`). Used for the About paragraph (rendered in Instrument Serif italic).
  - `ContactButton` — the **signature lime CTA**: `bg-[#CCFF00]` + charcoal text + lime glow on hover + arrow. Default link `#contact`; pass `href` for `mailto:`.

### Brand / design system

- **Colors are inline Tailwind arbitrary values**, not tokens: `#0A0A0B` (charcoal bg), `#F5F5F7` (off-white text), `#CCFF00` (lime accent — used sparingly: brand-mark dot, CTAs, hover accents, AI section), `#FAFAF7` (cream — the Services section background). `globals.css` also exposes `--color-ink/-mist/-cream/-lime` in `@theme`.
- **Type stack** (loaded via one Google Fonts `@import` in `globals.css`, before `@import "tailwindcss"`): **Space Grotesk** = display headings & big numbers (`font-display font-bold`); **Inter** = body/default; **JetBrains Mono** = technical labels (`font-mono`: nav, project category, contact labels, CTA text, AI chips); **Instrument Serif** = emotional accent (`font-serif italic`, the About paragraph). `font-black` is not used (Space Grotesk tops out at 700).
- **`.hero-heading`** (in `globals.css`) is the gradient-clipped text for the big headings ("Hi, i'm usman", "About me", "Project", "Contact", "Ask my AI"). Reuse the class; don't reimplement the gradient.
- **Accent rule:** lime reads well on charcoal (hero/projects/contact/ask) but **not** on the light Services section — there the hover accent is a charcoal fill with a lime icon inside the arrow circle. Keep lime off light backgrounds except as a small icon/dot.
- **Hover-arrow motion** (Services rows and Project cards): a circular arrow that fills the accent and rotates `-45°` on `group-hover`, plus a row/card slide. Reuse this pattern for new list/card items.
- **Brand mark:** lowercase `u` (Space Grotesk) + a lime dot, top-left of the hero nav.
- **Fluid type** uses inline `style={{ fontSize: "clamp(...)" }}`; the hero `h1` uses responsive `text-[Nvw]` steps (sized so the full name fits without clipping).

### Images

Plain `<img>` (lazy-loaded), not `next/image`, so external hosts (figma.site, motionsites.ai) and local `/images/...` need no `next.config.ts` config. Keep the `eslint-disable-next-line @next/next/no-img-element` comment.

### MarqueeSection / ProjectsSection mechanics

- Marquee: `offset = (scrollY - sectionTop + innerHeight) * 0.3`; row 1 `translateX(offset - 200)`, row 2 `translateX(-(offset - 200))`. Each row is its image set **tripled**; tiles 420×270; passive scroll listener.
- Projects: parent `useScroll` (`offset: ["start start","end end"]`) feeds each `ProjectCard`; `targetScale = 1 - (total-1-index)*0.03`, `scale = useTransform(progress, [index/total, 1], [1, targetScale])`, card offset `top: index*28px` in an `h-[85vh]` `sticky top-24 md:top-32` container. Adding/removing a project rebalances automatically.

### Path alias

`@/*` maps to `./src/*` (see `tsconfig.json`).

## Notes

- The page is fully client-rendered (`page.tsx` is `"use client"`); `layout.tsx` is the only server component and owns `metadata` ("Usman · Builds with AI") and the `#0A0A0B` theme color.
- Nav (hero) is the brand mark + 5 mono links → `#about`, `#services`, `#projects`, `#ask`, `#contact` — all have matching section ids. Hero/About `ContactButton`s scroll to `#contact`; the one in `ContactSection` is a `mailto:` link.
- No test framework is configured.
