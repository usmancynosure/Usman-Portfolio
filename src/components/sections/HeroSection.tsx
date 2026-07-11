"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Magnet } from "@/components/ui/Magnet";
import { PROFILE } from "@/lib/content";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-32"
      style={{ overflowX: "clip" }}
    >
      {/* Ambient lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <FadeIn as="div" delay={0.05} y={-10} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/40 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CCFF00] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CCFF00]" />
                </span>
                <span className="font-mono uppercase tracking-widest text-[0.65rem] text-[#CCFF00]">
                  {PROFILE.title}
                </span>
              </span>
              <span className="font-mono uppercase tracking-widest text-[0.65rem] text-[#F5F5F7]/45">
                {PROFILE.location}
              </span>
            </FadeIn>

            {/* Name */}
            <div className="overflow-hidden">
              <FadeIn
                as="h1"
                delay={0.12}
                y={40}
                className="hero-heading font-display font-bold tracking-tight leading-[0.92]"
                style={{ fontSize: "clamp(3rem, 8.5vw, 8.5rem)" }}
              >
                Hi, I&apos;m Usman
              </FadeIn>
            </div>

            {/* Tagline */}
            <FadeIn
              as="p"
              delay={0.25}
              y={20}
              className="mt-6 max-w-xl text-[#F5F5F7]/75 font-light leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
            >
              {PROFILE.tagline}
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.38} y={20} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 rounded-full bg-[#CCFF00] text-[#0A0A0B] font-mono font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-4 transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 36px 4px rgba(204,255,0,0.5)" }}
                />
                <span className="relative">View my work</span>
                <svg
                  className="relative transition-transform duration-300 ease-out group-hover:translate-x-1"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#F5F5F7]/25 text-[#F5F5F7] font-mono font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-4 transition-colors duration-300 hover:border-[#F5F5F7]/60 hover:bg-[#F5F5F7]/[0.04]"
              >
                Get in touch
              </a>
            </FadeIn>

            {/* Availability line */}
            <FadeIn
              as="p"
              delay={0.5}
              y={16}
              className="mt-8 font-mono text-[0.7rem] sm:text-xs uppercase tracking-widest text-[#F5F5F7]/40"
            >
              <span className="text-[#CCFF00]">◆</span> {PROFILE.availability}
            </FadeIn>
          </div>

          {/* Right: portrait */}
          <FadeIn
            delay={0.35}
            y={30}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* halo ring */}
              <div
                aria-hidden
                className="absolute inset-0 -m-6 rounded-full border border-[#F5F5F7]/10"
              />
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-40 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)" }}
              />
              <Magnet
                padding={120}
                strength={4}
                activeTransition="transform 0.3s ease-out"
                inactiveTransition="transform 0.6s ease-in-out"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROFILE.portrait}
                  alt="Usman Waris — AI Product Engineer"
                  className="relative w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-auto select-none pointer-events-none drop-shadow-2xl"
                  draggable={false}
                />
              </Magnet>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll cue */}
      <FadeIn
        delay={0.7}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 mt-12 lg:mt-16"
      >
        <div className="flex items-center gap-3 text-[#F5F5F7]/30">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest">Scroll</span>
          <span className="h-px w-16 bg-gradient-to-r from-[#F5F5F7]/30 to-transparent" />
        </div>
      </FadeIn>
    </section>
  );
}
