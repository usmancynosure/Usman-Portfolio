"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/portfolio";
import { TiltCard } from "@/components/3d/TiltCard";

export function ExperienceSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-14 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-gold-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-base sm:text-lg mb-8 md:mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Journey
        </motion.p>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto py-6">
          {/* Center line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-600 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-gold-500 to-gold-700 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <TimelineItem key={exp.id} experience={exp} index={i} isLeft={isLeft} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience: exp, index, isLeft }: { experience: typeof experiences[0]; index: number; isLeft: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative mb-8 md:mb-12 ${
        isLeft ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
      } pl-12 md:pl-0`}
    >
      {/* Diamond node */}
      <div
        className={`absolute top-6 w-4 h-4 border-2 border-gold-500 rotate-45 z-10 left-[13px] md:left-1/2 md:-translate-x-1/2 transition-all duration-500 ${
          inView ? "bg-gold-500 shadow-[0_0_15px_rgba(206,17,38,0.6)]" : "bg-navy-950"
        }`}
        style={inView ? { animation: "diamondPulse 2s ease-in-out infinite" } : {}}
      />

      {/* Card */}
      <TiltCard className="relative">
      <motion.div
        className="glass-card rounded-2xl p-4 sm:p-6 hover:border-gold-500 hover:shadow-[0_4px_20px_rgba(206,17,38,0.15)] transition-all duration-500"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">{exp.role}</h3>
        <span className="text-base font-semibold text-gold-500 block mb-1">{exp.company}</span>
        <span className="text-sm text-text-muted block mb-1">{exp.period}</span>
        {exp.badge && (
          <span className="inline-block px-3 py-0.5 text-[11px] font-semibold text-gold-400 border border-gold-500/30 bg-gold-500/10 rounded-full mb-3">
            {exp.badge}
          </span>
        )}

        <ul className={`space-y-1.5 ${isLeft ? "md:text-left" : ""}`}>
          {exp.responsibilities.map((r) => (
            <li key={r} className="text-sm text-text-secondary pl-5 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[7px] before:top-1.5">
              {r}
            </li>
          ))}
        </ul>
      </motion.div>
      </TiltCard>
    </div>
  );
}
