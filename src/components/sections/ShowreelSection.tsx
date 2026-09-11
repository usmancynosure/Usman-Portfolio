"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const REELS = [
  {
    src: "/videos/tea.mp4",
    label: "Tea",
    caption: "Social + moderation console",
    lift: "lg:-translate-y-6",
  },
  {
    src: "/videos/voicetale.mp4",
    label: "Voicetale",
    caption: "AI voice storytelling",
    lift: "lg:translate-y-4",
  },
  {
    src: "/videos/Ripple.mp4",
    label: "Ripple",
    caption: "Realtime social app",
    lift: "lg:translate-y-4",
  },
  {
    src: "/videos/optify.mp4",
    label: "Optify",
    caption: "Optimization product",
    lift: "lg:-translate-y-6",
  },
];

export function ShowreelSection() {
  return (
    <section
      id="showreel"
      className="relative bg-[#0A0A0B] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden"
    >
      {/* Ambient lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.09] blur-[150px]"
        style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
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
            className="mt-6 max-w-xl mx-auto text-[#F5F5F7]/70 font-light leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            A short reel of the products, interfaces, and systems I&apos;ve been
            building — design and engineering, end to end.
          </FadeIn>
        </div>

        {/* Phone gallery */}
        <div className="flex flex-col items-center gap-12 sm:flex-row sm:flex-wrap sm:justify-center sm:items-start sm:gap-8 lg:gap-10">
          {REELS.map((reel, i) => (
            <FadeIn
              key={reel.src}
              delay={0.25 + i * 0.12}
              y={40}
              className={`group flex flex-col items-center transition-transform duration-500 ${reel.lift}`}
            >
              <div className="relative">
                {/* halo glow behind the phone */}
                <div
                  aria-hidden
                  className="absolute inset-0 -m-6 rounded-[3rem] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)" }}
                />
                <div className="relative rounded-[2.2rem] border border-[#F5F5F7]/15 bg-[#0A0A0B] p-2 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  {/* notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-1.5 w-14 rounded-full bg-[#F5F5F7]/20" />
                  <video
                    className="block w-[220px] sm:w-[230px] md:w-[250px] h-auto rounded-[1.7rem] select-none"
                    src={reel.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>

              {/* label */}
              <div className="mt-6 text-center">
                <p className="font-display font-bold text-[#F5F5F7] text-lg">
                  {reel.label}
                </p>
                <p className="font-mono uppercase tracking-widest text-[0.6rem] text-[#F5F5F7]/50 mt-1">
                  {reel.caption}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
