"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { CAPABILITIES } from "@/lib/content";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#FAFAF7] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn as="p" y={20} className="text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#0A0A0B]/40 mb-4">
          What I do
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.05}
          y={40}
          className="text-[#0A0A0B] font-display font-bold uppercase text-center mb-14 sm:mb-20 md:mb-24 leading-none tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 11vw, 150px)" }}
        >
          Capabilities
        </FadeIn>

        <div className="max-w-5xl mx-auto border-b border-[#0A0A0B]/15">
          {CAPABILITIES.map((s, i) => (
            <FadeIn
              key={s.num}
              delay={i * 0.06}
              y={30}
              className="group block border-t border-[#0A0A0B]/15 cursor-default"
            >
              <div className="flex items-center gap-5 sm:gap-8 md:gap-12 py-7 sm:py-9 md:py-11 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-4">
                <span
                  className="flex-shrink-0 w-[70px] sm:w-[120px] md:w-[170px] text-[#0A0A0B] font-display font-bold leading-none"
                  style={{ fontSize: "clamp(2.2rem, 7vw, 110px)" }}
                >
                  {s.num}
                </span>

                <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
                  <h3
                    className="text-[#0A0A0B] font-display font-medium uppercase leading-tight"
                    style={{ fontSize: "clamp(1.05rem, 2.4vw, 2.2rem)" }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-[#0A0A0B]/60 font-light leading-relaxed max-w-2xl"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.2rem)" }}
                  >
                    {s.desc}
                  </p>
                </div>

                {/* animated arrow */}
                <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#0A0A0B]/20 text-[#0A0A0B] transition-all duration-300 ease-out group-hover:border-[#0A0A0B] group-hover:bg-[#0A0A0B] group-hover:text-[#CCFF00] group-hover:-rotate-45">
                  <svg
                    width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
