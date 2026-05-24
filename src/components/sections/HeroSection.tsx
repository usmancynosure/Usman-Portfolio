"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Magnet } from "@/components/ui/Magnet";
import { ContactButton } from "@/components/ui/ContactButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Ask AI", href: "#ask" },
  { label: "Contact", href: "#contact" },
];
const PORTRAIT =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

export function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        {/* Brand mark: lowercase u + lime .io dot */}
        <a href="#" className="flex items-end gap-1 select-none" aria-label="buildwithusman.io">
          <span className="font-display font-bold lowercase leading-none text-[#F5F5F7] text-2xl md:text-3xl">
            u
          </span>
          <span className="mb-1 inline-block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#CCFF00]" />
        </a>

        <div className="flex items-center gap-5 sm:gap-8 md:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[#F5F5F7] uppercase tracking-widest text-[0.65rem] sm:text-xs md:text-sm transition-colors duration-200 hover:text-[#CCFF00] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Hero heading */}
      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading font-display font-bold uppercase tracking-tight leading-none whitespace-nowrap w-full mt-6 sm:mt-4 md:-mt-5 text-[12.5vw] sm:text-[13vw] md:text-[13.5vw] lg:text-[14vw]"
        >
          Hi, i&apos;m usman
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="text-[#F5F5F7] font-light uppercase tracking-wide leading-snug max-w-[220px] sm:max-w-[300px] md:max-w-[360px]"
          style={{ fontSize: "clamp(1rem, 2vw, 2.1rem)" }}
        >
          a product &amp; ai engineer shipping striking, production-ready ai systems end-to-end
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero portrait */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT}
            alt="Usman — 3D creator portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}
