"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { STATS, STACK } from "@/lib/content";

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-2 inline-flex items-center rounded-full border border-[#F5F5F7]/12 bg-[#F5F5F7]/[0.03] px-5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#F5F5F7]/70 whitespace-nowrap">
      {label}
    </span>
  );
}

export function MarqueeSection() {
  return (
    <section className="relative bg-[#0A0A0B] pt-16 sm:pt-20 md:pt-24 pb-14 overflow-hidden">
      {/* Stats strip */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-[#F5F5F7]/10 bg-[#F5F5F7]/[0.06]">
          {STATS.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.08}
              y={20}
              className="bg-[#0A0A0B] px-6 py-8 sm:py-10 flex flex-col gap-2"
            >
              <span
                className="accent-gradient font-display font-bold leading-none"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-widest text-[#F5F5F7]/45 leading-snug">
                {s.label}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Tech-stack ticker */}
      <div className="mt-14 sm:mt-16">
        <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F5F7]/35 mb-6">
          The stack I ship with
        </p>

        <div className="marquee-mask flex flex-col gap-3">
          <div className="marquee-track marquee-left">
            {[...STACK, ...STACK].map((t, i) => (
              <Pill key={`a-${i}`} label={t} />
            ))}
          </div>
          <div className="marquee-track marquee-right">
            {[...[...STACK].reverse(), ...[...STACK].reverse()].map((t, i) => (
              <Pill key={`b-${i}`} label={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
