# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Usman Waris (AI Engineer) called "The Digital Majlis". Single-page Next.js app with an Arabic-Modern fusion design theme (deep navy + gold color palette).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve production build

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss` plugin, imported with `@import "tailwindcss"` in globals.css)
- **Framer Motion** for animations
- **Nodemailer** + **EmailJS** for contact form

## Architecture

Single-page app — all sections render from `src/app/page.tsx` (a client component with `"use client"`).

### Key directories

- `src/components/sections/` — page sections (Hero, About, Skills, Projects, Experience, Certifications, Resume, Testimonials, Blog, GitHub, Contact, Footer)
- `src/components/ui/` — shared UI (Navigation, Preloader, CustomCursor, SectionDivider, Chatbot)
- `src/data/portfolio.ts` — centralized data file for all portfolio content (personal info, skills, projects, experience, etc.)
- `src/app/api/` — two API routes:
  - `contact/route.ts` — contact form via Nodemailer (requires `EMAIL_USER` and `EMAIL_PASS` env vars)
  - `chat/route.ts` — chatbot proxy to OpenAI API (client provides API key)

### Design system (defined in `src/app/globals.css` `@theme` block)

- Colors: `navy-{950..400}`, `gold-{700..100}`, `parchment`, `text-{primary,secondary,muted}`
- Fonts: `--font-heading` (Playfair Display), `--font-body` (Inter), `--font-arabic` (Amiri), `--font-mono` (Fira Code)

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables

- `EMAIL_USER` — Gmail address for contact form SMTP
- `EMAIL_PASS` — Gmail app password for SMTP

## Notes

- Tailwind v4 uses `@theme` directive in CSS (not `tailwind.config.js`) for custom tokens.
- `next.config.ts` allows images from `avatars.githubusercontent.com` (for GitHub section).
- All portfolio content is centralized in `src/data/portfolio.ts` — edit there to update site content.
