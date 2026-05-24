"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

interface Project {
  num: string;
  category: string;
  name: string;
  col1: [string, string];
  col2: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    category: "AI · Healthcare",
    name: "Health Passport",
    col1: [
      "/images/projects/Healthpassport/Clean and Modern App Portfolio Mockup Presentation.png",
      "/images/projects/Healthpassport/Clean and Modern App Portfolio Mockup Presentation.png",
    ],
    col2: "/images/projects/Healthpassport/Clean and Modern App Portfolio Mockup Presentation.png",
  },
  {
    num: "02",
    category: "AI · Mobile",
    name: "SpaceAI",
    col1: ["/images/projects/SpaceAi/1.png", "/images/projects/SpaceAi/2.png"],
    col2: "/images/projects/SpaceAi/3.png",
  },
  {
    num: "03",
    category: "AI · Mobile",
    name: "Optify",
    col1: ["/images/projects/Optify/4.png", "/images/projects/Optify/5.png"],
    col2: "/images/projects/Optify/6.png",
  },
  {
    num: "04",
    category: "Social · Flutter",
    name: "Teacup",
    col1: ["/images/projects/teacup/1.png", "/images/projects/teacup/2.png"],
    col2: "/images/projects/teacup/1.png",
  },
  {
    num: "05",
    category: "ML · Healthcare",
    name: "MedCon AI",
    col1: ["/images/projects/Medcon/9.png", "/images/projects/Medcon/10.png"],
    col2: "/images/projects/Medcon/7.png",
  },
  {
    num: "06",
    category: "AI · Wellness",
    name: "LumaSleep",
    col1: ["/images/projects/lumasleep/1.png", "/images/projects/lumasleep/2.png"],
    col2: "/images/projects/lumasleep/3.png",
  },
];

const RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

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
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`group relative w-full max-w-6xl ${RADIUS} border-2 border-[#F5F5F7] bg-[#0A0A0B] p-4 sm:p-6 md:p-8 origin-top transition-colors duration-300 hover:border-[#CCFF00]`}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 sm:mb-7 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="text-[#F5F5F7] font-display font-bold leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[#CCFF00] uppercase tracking-widest text-[0.7rem] sm:text-xs">
                {project.category}
              </span>
              <span
                className="text-[#F5F5F7] font-display font-medium uppercase leading-tight"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {project.name}
              </span>
            </div>
          </div>

          {/* animated arrow accent */}
          <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#F5F5F7]/30 text-[#F5F5F7] transition-all duration-300 ease-out group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#0A0A0B] group-hover:-rotate-45">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Bottom row: image grid */}
        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4 basis-2/5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="basis-3/5 grow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className={`w-full h-full object-cover ${RADIUS}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 bg-[#0A0A0B] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-display font-bold uppercase text-center leading-none tracking-tight mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </FadeIn>

      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.num}
          project={project}
          index={i}
          total={PROJECTS.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}
