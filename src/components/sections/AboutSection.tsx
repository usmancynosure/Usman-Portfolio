"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { PROFILE } from "@/lib/content";

const ABOUT_TEXT =
  "I'm an AI Product Engineer who ships production-grade AI end to end — agentic systems and LLM backends on one side, native iOS and Flutter apps on the other. I've put multiple apps live on the App Store with real paying users, so I've felt the whole arc: system design, real-time backends, mobile polish, and the release that follows. I care about products that survive real load — not demos.";

const FACTS = [
  { k: "Based in", v: "Islamabad, PK" },
  { k: "Open to", v: "KSA · UAE" },
  { k: "Education", v: "BSc CS — COMSATS" },
  { k: "Currently", v: "GetSnippet (Dubai)" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#FFFFFF] dot-grid px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-36 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-display font-bold uppercase leading-none tracking-tight text-center"
          style={{ fontSize: "clamp(3rem, 12vw, 150px)" }}
        >
          About me
        </FadeIn>

        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#0A0A0B] font-serif italic text-center leading-relaxed"
            style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.15rem)" }}
          />
        </div>

        {/* Quick facts */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {FACTS.map((f, i) => (
            <FadeIn
              key={f.k}
              delay={i * 0.08}
              y={24}
              className="rounded-2xl border border-[#0A0A0B]/10 bg-[#FAFAF7] px-5 py-6 text-center"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#0A0A0B]/40 mb-2">
                {f.k}
              </p>
              <p className="text-[#0A0A0B] font-display font-medium text-sm sm:text-base">
                {f.v}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} y={20} className="mt-14 flex justify-center">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#0A0A0B]/25 text-[#0A0A0B] font-mono uppercase tracking-widest text-xs px-8 py-4 transition-colors duration-300 hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            Let&apos;s work together
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
