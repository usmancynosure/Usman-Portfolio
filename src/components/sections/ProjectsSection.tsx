"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { PROJECTS, MORE_WORK, type Project } from "@/lib/content";

const RADIUS = "rounded-[32px] sm:rounded-[44px] md:rounded-[52px]";

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-[#CCFF00] whitespace-nowrap">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
      On the App Store
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#F5F5F7]/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-[#F5F5F7]/55 whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="min-h-[86vh] md:h-[88vh] flex items-start justify-center sticky top-20 md:top-28 pb-6 md:pb-0">
      <motion.div
        style={{ scale, top: `${index * 26}px` }}
        className={`group relative w-full max-w-6xl ${RADIUS} border border-[#F5F5F7]/15 bg-[#0C0C0D] p-4 sm:p-6 md:p-8 origin-top overflow-hidden transition-colors duration-300 hover:border-[#CCFF00]/60`}
      >
        {/* subtle top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full opacity-0 group-hover:opacity-100 blur-[90px] transition-opacity duration-500"
          style={{ background: "radial-gradient(circle,#CCFF00 0%,transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative flex flex-wrap items-start justify-between gap-4 mb-5 sm:mb-6">
          <div className="flex items-start gap-4 sm:gap-6 min-w-0">
            <span
              className="text-[#F5F5F7]/15 font-display font-bold leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 90px)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-2 min-w-0">
              <span className="font-mono text-[#CCFF00] uppercase tracking-widest text-[0.65rem] sm:text-xs">
                {project.category}
              </span>
              <span
                className="text-[#F5F5F7] font-display font-semibold leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.6rem)" }}
              >
                {project.name}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            {project.live && <LiveBadge />}
            <div className="flex flex-shrink-0 items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border border-[#F5F5F7]/25 text-[#F5F5F7] transition-all duration-300 ease-out group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#0A0A0B] group-hover:-rotate-45">
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body: blurb + image */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-5 md:gap-7 items-center">
          <p
            className="text-[#F5F5F7]/70 font-light leading-relaxed order-2 lg:order-1"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
          >
            {project.blurb}
          </p>

          <div
            className={`order-1 lg:order-2 ${RADIUS} overflow-hidden bg-gradient-to-b from-[#141416] to-[#0A0A0B] border border-[#F5F5F7]/8 p-3 sm:p-5 grid place-items-center`}
            style={{ height: "clamp(190px, 34vh, 460px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[0]}
              alt={`${project.name} — app screens`}
              loading="lazy"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MoreCard({ project, delay }: { project: Project; delay: number }) {
  const hasImage = project.images.length > 0;
  return (
    <FadeIn
      delay={delay}
      y={30}
      className={`group relative flex flex-col rounded-3xl border border-[#F5F5F7]/12 bg-[#0C0C0D] overflow-hidden transition-colors duration-300 hover:border-[#CCFF00]/50`}
    >
      <div className="relative h-52 grid place-items-center overflow-hidden bg-gradient-to-b from-[#141416] to-[#0A0A0B] p-4">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.images[0]}
            alt={`${project.name} — app screens`}
            loading="lazy"
            className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#F5F5F7]/30">
            <span
              className="accent-gradient font-display font-bold leading-none"
              style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
            >
              {project.name}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest">
              App Store
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[#CCFF00] uppercase tracking-widest text-[0.6rem]">
            {project.category}
          </span>
          {project.live && (
            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-[#CCFF00]/80">
              ● Live
            </span>
          )}
        </div>
        <h3 className="text-[#F5F5F7] font-display font-semibold text-xl">
          {project.name}
        </h3>
        <p className="text-[#F5F5F7]/55 font-light text-sm leading-relaxed">
          {project.blurb}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0A0A0B] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
    >
      <FadeIn as="p" y={20} className="text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F5F7]/40 mb-4">
        Selected work
      </FadeIn>
      <FadeIn
        as="h2"
        delay={0.05}
        y={40}
        className="hero-heading font-display font-bold uppercase text-center leading-none tracking-tight mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: "clamp(3rem, 12vw, 150px)" }}
      >
        Projects
      </FadeIn>

      {/* Sticky-stacking featured cards */}
      <div ref={containerRef}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {/* More work */}
      <div className="mx-auto max-w-6xl mt-16 sm:mt-24">
        <FadeIn as="h3" y={30} className="font-display font-semibold text-[#F5F5F7] text-2xl sm:text-3xl mb-8 text-center">
          More builds
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MORE_WORK.map((p, i) => (
            <MoreCard key={p.slug} project={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
