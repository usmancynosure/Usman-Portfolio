"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { CERTIFICATIONS, type Certification } from "@/lib/content";

function CertCard({ cert, delay }: { cert: Certification; delay: number }) {
  const href = cert.verifyUrl ?? cert.image;
  return (
    <FadeIn
      delay={delay}
      y={24}
      className="group relative flex flex-col rounded-3xl border border-[#0A0A0B]/10 bg-[#FFFFFF] shadow-lg shadow-black/[0.03] overflow-hidden transition-all duration-300 hover:border-[#2563EB]/40 hover:-translate-y-1"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${cert.name} certificate`}
        className="absolute inset-0 z-20"
      />
      <div className="relative h-40 grid place-items-center overflow-hidden bg-[#FAFAF7] p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.image}
          alt={`${cert.name} certificate`}
          loading="lazy"
          className="max-w-full max-h-full object-contain rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className="font-mono text-[#2563EB] uppercase tracking-widest text-[0.6rem]">
          {cert.issuer}
        </span>
        <h3 className="text-[#0A0A0B] font-display font-semibold text-base leading-snug">
          {cert.name}
        </h3>
        <span className="font-mono text-[#0A0A0B]/40 uppercase tracking-widest text-[0.6rem]">
          {cert.date}
        </span>
      </div>
    </FadeIn>
  );
}

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative bg-[#FAFAF7] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn as="p" y={20} className="text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#0A0A0B]/40 mb-4">
          Verified learning
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.05}
          y={40}
          className="hero-heading font-display font-bold uppercase text-center leading-none tracking-tight mb-6"
          style={{ fontSize: "clamp(2.6rem, 11vw, 140px)" }}
        >
          Certifications
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.12}
          y={20}
          className="text-[#0A0A0B]/65 font-light text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
        >
          Ongoing, hands-on study in agentic AI, automation, and cloud — on top
          of daily production work.
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.slug} cert={cert} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
