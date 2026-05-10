# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Usman Waris (Product & AI Engineer). Single-page Next.js app with a modern dark + electric-blue theme (deep slate background, blue/cyan accents).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve production build

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss` plugin, imported with `@import "tailwindcss"` in globals.css)
- **Framer Motion** for animations
- **React Three Fiber** + **drei** + **three** for 3D scenes
- **Nodemailer** + **EmailJS** for contact form

## Architecture

Single-page app — all sections render from `src/app/page.tsx` (a client component with `"use client"`).

### Key directories

- `src/components/sections/` — page sections (Hero, About, Skills, Projects, Experience, Certifications, Resume, Testimonials, Blog, DesignShowcase, GitHub, Contact, Footer). Order is fixed in `page.tsx` with `<SectionDivider />` between each.
- `src/components/ui/` — shared UI (Navigation, Preloader, CustomCursor, SectionDivider, Chatbot)
- `src/components/3d/` — React Three Fiber scenes (HeroScene, FloatingOrbs, SkillsGlobe, TiltCard). Used inside section components; keep them client-only.
- `src/data/portfolio.ts` — centralized data file for all portfolio content (personal info, skills, projects, experience, etc.)
- `src/app/api/` — two API routes:
  - `contact/route.ts` — contact form via Nodemailer (requires `EMAIL_USER` and `EMAIL_PASS` env vars)
  - `chat/route.ts` — chatbot proxy to OpenAI API (client provides API key)

### Design system (defined in `src/app/globals.css` `@theme` block)

- Colors: `navy-{950..400}` (deep slate ramp, `navy-900` = `#0A0E1A` is the page background), `gold-{700..100}` (**named "gold" for backwards-compat but actually electric blue** — `gold-500` = `#3B82F6`), `emerald-{700..300}` (**now cyan**, not green — `emerald-500` = `#06B6D4`), `parchment`, `text-{primary,secondary,muted}`. The `gold-*` / `emerald-*` names are intentionally preserved so that retheming again is a one-file change in `globals.css`.
- Fonts: `--font-heading` (Playfair Display), `--font-body` (Inter), `--font-mono` (JetBrains Mono → Fira Code fallback). No Arabic font — religious/cultural Arabic motifs were removed.

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables

- `EMAIL_USER` — Gmail address for contact form SMTP
- `EMAIL_PASS` — Gmail app password for SMTP

### Custom CSS utilities (in `globals.css`)

Reusable classes beyond Tailwind: `.glass-card` (glassmorphism), `.gold-shimmer` (animated gradient text), `.btn-primary`, `.btn-outline`, `.geo-pattern` (SVG background), `.section-divider`.

### Chatbot widget

`src/components/ui/Chatbot.tsx` is a floating chat widget. The OpenAI API key is provided by the end-user in the browser and passed to `src/app/api/chat/route.ts`, which proxies it to OpenAI (gpt-3.5-turbo). The system prompt is generated from `chatbotSystemPrompt` in `portfolio.ts`.

### SEO / Metadata

`src/app/layout.tsx` configures OpenGraph, Twitter cards, and JSON-LD structured data (Person schema). Theme color is `#0d1117`.

## Notes

- Tailwind v4 uses `@theme` directive in CSS (not `tailwind.config.js`) for custom tokens. **Google Fonts `@import` must come before `@import "tailwindcss"`** in `globals.css` or the build emits a CSS-ordering warning.
- `next.config.ts` allows images from `avatars.githubusercontent.com` (for GitHub section).
- All portfolio content is centralized in `src/data/portfolio.ts` — edit there to update site content.
- No test framework is configured — there are no test files in this project.
- Fonts are loaded via `@import url()` in `globals.css` (Playfair Display, Inter, JetBrains Mono) and referenced as CSS variables in the `@theme` block.
- The entire app is client-rendered: `page.tsx` has `"use client"` at the top, so all section and UI components are client components. There are no React Server Components except `layout.tsx` (which exports metadata).
- `globals.css` includes `@media (prefers-reduced-motion)` and `@media print` rules — respect these when adding new animations or UI elements.
