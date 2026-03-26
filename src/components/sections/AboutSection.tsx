"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { personalInfo, stats } from "@/data/portfolio";

function CountUp({ target, suffix = "", isDecimal = false }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(isDecimal ? parseFloat((target * eased).toFixed(2)) : Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, isDecimal]);

  return (
    <span ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-gold-500">
      {isDecimal ? count.toFixed(2) : count}
      <span className="text-gold-400 text-2xl">{suffix}</span>
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-lg mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The mind behind the machine
        </motion.p>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
          {/* Photo with Islamic arch */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[260px] h-[350px] md:w-[280px] md:h-[380px]">
              {/* Arch SVG frame */}
              <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 300 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b8941e" />
                    <stop offset="50%" stopColor="#f0c75e" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M10,400 L10,180 Q10,10 150,10 Q290,10 290,180 L290,400"
                  fill="none"
                  stroke="url(#archGold)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>

              {/* Photo */}
              <div className="absolute top-4 left-4 right-4 bottom-1 overflow-hidden" style={{ clipPath: "path('M5,385 L5,170 Q5,5 130,5 Q255,5 255,170 L255,385 Z')" }}>
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  width={280}
                  height={380}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    t.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-b from-navy-800 to-navy-900 flex items-center justify-center border border-navy-600"><span class="font-heading text-6xl font-extrabold gold-shimmer">UW</span></div>';
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <div>
            <motion.h3
              className="font-heading text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I&apos;m <span className="text-gold-500">Usman Waris</span>
            </motion.h3>

            <motion.p
              className="text-text-secondary leading-relaxed mb-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.p
              className="text-text-secondary leading-relaxed mb-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {personalInfo.bioParagraph2}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-navy-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <CountUp target={stat.number} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  <span className="block text-sm text-text-secondary mt-1">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="#resume"
              className="btn-primary px-8 py-3 rounded-lg text-sm inline-flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
