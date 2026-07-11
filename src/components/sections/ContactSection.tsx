"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { PROFILE, RESUMES } from "@/lib/content";

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
  { label: "GitHub", value: PROFILE.githubLabel, href: PROFILE.github },
  { label: "LinkedIn", value: PROFILE.linkedinLabel, href: PROFILE.linkedin },
  { label: "Instagram", value: PROFILE.instagramLabel, href: PROFILE.instagram },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0A0A0B] dot-grid px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 flex flex-col items-center text-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "radial-gradient(circle,#CCFF00 0%,transparent 60%)" }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <FadeIn as="p" y={20} className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F5F7]/40 mb-4">
          Let&apos;s talk
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.05}
          y={40}
          className="hero-heading font-display font-bold uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 150px)" }}
        >
          Contact
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="text-[#F5F5F7]/75 font-light mt-6 sm:mt-8 max-w-[600px] mx-auto"
          style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
        >
          {PROFILE.availability} If you&apos;re building something ambitious with
          AI, I&apos;d love to hear about it.
        </FadeIn>

        {/* Primary CTA + resumes */}
        <FadeIn delay={0.2} y={20} className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#CCFF00] text-[#0A0A0B] font-mono font-medium uppercase tracking-widest text-xs sm:text-sm px-9 py-4 transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 36px 4px rgba(204,255,0,0.5)" }}
            />
            <span className="relative">Email me</span>
            <svg
              className="relative transition-transform duration-300 group-hover:translate-x-1"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </FadeIn>

        {/* Resume downloads */}
        <FadeIn delay={0.28} y={20} className="mt-8 flex flex-wrap justify-center gap-3">
          {RESUMES.map((r) => (
            <a
              key={r.href}
              href={r.href}
              download
              className="group inline-flex items-center gap-3 rounded-2xl border border-[#F5F5F7]/15 bg-[#F5F5F7]/[0.02] px-5 py-3.5 text-left transition-colors duration-300 hover:border-[#CCFF00]/50"
            >
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#CCFF00]/10 text-[#CCFF00] font-mono text-[0.55rem] font-semibold">
                {r.kind}
              </span>
              <span className="flex flex-col">
                <span className="text-[#F5F5F7] text-sm font-medium group-hover:text-[#CCFF00] transition-colors">
                  {r.label} résumé
                </span>
                <span className="text-[#F5F5F7]/45 text-xs">{r.role}</span>
              </span>
              <svg
                className="ml-1 text-[#F5F5F7]/40 group-hover:text-[#CCFF00] transition-colors"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          ))}
        </FadeIn>

        {/* Link grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8 max-w-2xl mx-auto">
          {LINKS.map((link, i) => (
            <FadeIn key={link.label} delay={0.32 + i * 0.06} y={20} className="flex flex-col gap-1">
              <span className="font-mono text-[#F5F5F7]/40 uppercase tracking-widest text-[0.65rem]">
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[#F5F5F7] font-medium text-sm sm:text-base transition-colors duration-200 hover:text-[#CCFF00] break-words"
              >
                {link.value}
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn as="p" delay={0.6} className="mt-20 font-mono text-[0.6rem] uppercase tracking-widest text-[#F5F5F7]/25">
          © {PROFILE.name} — built with Next.js, Tailwind & Claude
        </FadeIn>
      </div>
    </section>
  );
}
