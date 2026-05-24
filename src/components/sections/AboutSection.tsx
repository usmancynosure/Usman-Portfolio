"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";

const BASE =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7";

const ABOUT_TEXT =
  "I'm a Product & AI Engineer who ships production-ready applications end-to-end — from system design to deployment and iteration. I specialize in LLM systems, agentic workflows, and scalable backends with LangGraph, FastAPI, and microservices, working hands-on with agentic dev tools to compress build cycles. Let's build something incredible together!";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#0A0A0B] min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative corner images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/moon_icon.11395d36.png`} alt="" className="w-full h-auto" />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/lego_icon-1.703bb594.png`} alt="" className="w-full h-auto" />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/p59_1.4659672e.png`} alt="" className="w-full h-auto" />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/Group_134-1.2e04f3ce.png`} alt="" className="w-full h-auto" />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading font-display font-bold uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#F5F5F7] font-serif italic text-center leading-relaxed max-w-[640px]"
            style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}
          />
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
