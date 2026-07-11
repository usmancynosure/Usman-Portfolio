"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { EXPERIENCE } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#0A0A0B] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn as="p" y={20} className="text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F5F7]/40 mb-4">
          The path so far
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.05}
          y={40}
          className="hero-heading font-display font-bold uppercase text-center leading-none tracking-tight mb-16 sm:mb-20"
          style={{ fontSize: "clamp(2.6rem, 11vw, 140px)" }}
        >
          Experience
        </FadeIn>

        <div className="relative">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#CCFF00]/50 via-[#F5F5F7]/15 to-transparent"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {EXPERIENCE.map((item, i) => (
              <FadeIn key={item.org} delay={i * 0.1} y={30} className="relative pl-8 sm:pl-12">
                {/* node */}
                <span className="absolute left-0 top-1.5 grid place-items-center">
                  <span className="w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 border-[#CCFF00] bg-[#0A0A0B]" />
                  <span className="absolute w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[#F5F5F7] font-display font-semibold text-xl sm:text-2xl">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-widest text-[#CCFF00]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-[#F5F5F7]/70 font-medium text-sm sm:text-base">
                  {item.org} <span className="text-[#F5F5F7]/40">· {item.meta}</span>
                </p>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-[#F5F5F7]/60 font-light text-sm sm:text-[0.95rem] leading-relaxed">
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#CCFF00]/50" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
