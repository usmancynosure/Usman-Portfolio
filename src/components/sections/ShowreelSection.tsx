"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export function ShowreelSection() {
  return (
    <section
      id="showreel"
      className="relative bg-[#0A0A0B] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden"
    >
      {/* Ambient lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <FadeIn
              as="p"
              y={-10}
              className="font-mono uppercase tracking-widest text-[0.65rem] text-[#CCFF00] mb-5"
            >
              ◆ Showreel
            </FadeIn>
            <FadeIn
              as="h2"
              delay={0.08}
              y={40}
              className="hero-heading font-display font-bold uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              Work in motion
            </FadeIn>
            <FadeIn
              as="p"
              delay={0.18}
              y={20}
              className="mt-6 max-w-md mx-auto lg:mx-0 text-[#F5F5F7]/70 font-light leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
            >
              A short reel of the products, interfaces, and systems I&apos;ve been
              building — design and engineering, end to end.
            </FadeIn>
          </div>

          {/* Right: phone-framed vertical video */}
          <FadeIn
            delay={0.25}
            y={30}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* halo glow behind the phone */}
              <div
                aria-hidden
                className="absolute inset-0 -m-8 rounded-[3rem] opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)" }}
              />
              <div className="relative rounded-[2.2rem] border border-[#F5F5F7]/15 bg-[#0A0A0B] p-2 shadow-2xl">
                <video
                  className="block w-[240px] sm:w-[280px] md:w-[300px] h-auto rounded-[1.7rem] select-none"
                  src="/videos/showreel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
