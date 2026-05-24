"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ContactButton } from "@/components/ui/ContactButton";

const EMAIL = "imosmanwaris.tech@gmail.com";

const LINKS = [
  {
    label: "Instagram",
    value: "@buildwithusman.io",
    href: "https://instagram.com/buildwithusman.io",
  },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Phone", value: "+92 320 0787777", href: "tel:+923200787777" },
  { label: "GitHub", value: "github.com/usmancynosure", href: "https://github.com/usmancynosure" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/usman-waris",
    href: "https://www.linkedin.com/in/usman-waris-0a9b8c7d/",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#0A0A0B] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 flex flex-col items-center text-center"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-display font-bold uppercase leading-none tracking-tight"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Contact
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.1}
        y={20}
        className="text-[#F5F5F7] font-light mt-6 sm:mt-8 max-w-[560px]"
        style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
      >
        Open to full-time roles in the GULF (Saudi Arabia, UAE, Qatar, Kuwait,
        Bahrain, Oman) — remote or on-site. Let&apos;s build something together.
      </FadeIn>

      <FadeIn delay={0.2} y={20} className="mt-10 sm:mt-12">
        <ContactButton href={`mailto:${EMAIL}`} />
      </FadeIn>

      <div className="mt-14 sm:mt-16 grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-20">
        {LINKS.map((link, i) => (
          <FadeIn
            key={link.label}
            delay={0.25 + i * 0.08}
            y={20}
            className="flex flex-col gap-1"
          >
            <span className="font-mono text-[#F5F5F7]/50 uppercase tracking-widest text-[0.7rem] sm:text-xs">
              {link.label}
            </span>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[#F5F5F7] font-medium text-sm sm:text-lg transition-colors duration-200 hover:text-[#CCFF00] break-all"
            >
              {link.value}
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
