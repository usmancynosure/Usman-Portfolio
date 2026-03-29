"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/portfolio";
import { TiltCard } from "@/components/3d/TiltCard";
import dynamic from "next/dynamic";

const SkillsGlobe = dynamic(
  () => import("@/components/3d/SkillsGlobe").then((m) => ({ default: m.SkillsGlobe })),
  { ssr: false }
);

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="text-xs font-semibold text-gold-400">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: "linear-gradient(135deg, #9B0D1E, #CE1126, #F05060, #CE1126, #9B0D1E)",
            backgroundSize: "200% 100%",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-14 md:py-20 lg:py-28 geo-pattern relative overflow-hidden">
      {/* 3D Globe background */}
      <SkillsGlobe className="absolute inset-0 opacity-40" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-base sm:text-lg mb-8 md:mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Scholar&apos;s Library
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.6 }}
            >
            <TiltCard className="relative" glareColor={`${cat.color}25`}>
            <div
              className="glass-card rounded-2xl p-4 sm:p-6 hover:border-gold-500 hover:shadow-[0_4px_20px_rgba(206,17,38,0.2)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-heading text-xl text-gold-500">{cat.name}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                ))}
              </div>
            </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
