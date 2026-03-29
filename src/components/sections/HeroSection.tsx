"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, heroTypingPhrases } from "@/data/portfolio";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter
  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const phrase = heroTypingPhrases[phraseIdx];
      if (isDeleting) {
        charIdx--;
        setTypedText(phrase.substring(0, charIdx));
      } else {
        charIdx++;
        setTypedText(phrase.substring(0, charIdx));
      }

      let speed = isDeleting ? 35 : 70;
      if (!isDeleting && charIdx === phrase.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % heroTypingPhrases.length;
        speed = 400;
      }
      timeout = setTimeout(type, speed);
    };

    const start = setTimeout(type, 3000);
    const cursorBlink = setInterval(() => setShowCursor((p) => !p), 530);

    return () => { clearTimeout(timeout); clearTimeout(start); clearInterval(cursorBlink); };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* === Video background === */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero section video/Herovideo.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/90" />

      {/* Red glow accent - top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(206,17,38,0.12) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Green glow accent - bottom left */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,150,57,0.08) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* 3D Scene overlay */}
      <HeroScene />

      {/* Vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,9,12,0.5)_70%,rgba(7,9,12,0.85)_100%)]" />

      {/* Scattered decorative elements */}
      <motion.div
        className="hidden md:block absolute top-[14%] right-[10%] w-px h-20 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
      <motion.div
        className="hidden md:block absolute bottom-[22%] right-[14%] w-3 h-3 border border-gold-500/20 rotate-45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      />
      <motion.div
        className="hidden lg:block absolute top-[40%] right-[6%] w-2 h-2 rounded-full bg-emerald-500/25"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 3, duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="hidden md:block absolute top-[18%] left-[6%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="w-5 h-px bg-gold-500" />
        <div className="w-px h-5 bg-gold-500 -mt-[10px] ml-[10px]" />
      </motion.div>

      {/* === Content === */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 sm:px-8 py-20">

        {/* Arabic greeting */}
        <motion.p
          className="font-arabic text-gold-400 text-base sm:text-lg md:text-2xl tracking-wide mb-4 sm:mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          السلام عليكم
        </motion.p>

        {/* Profile photo */}
        <motion.div
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-2 border-gold-500/50 overflow-hidden shadow-[0_0_50px_rgba(206,17,38,0.2)] mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML =
                '<div class="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"><span class="font-heading text-2xl sm:text-3xl font-bold gold-shimmer">UW</span></div>';
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-heading text-[2.8rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-extrabold tracking-wider mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gold-shimmer">USMAN WARIS</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="w-6 sm:w-12 md:w-16 h-px bg-gold-500/40 flex-shrink-0" />
          <p className="text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.2em] uppercase text-text-primary min-h-[1.5em]">
            <span className="text-gold-300">{typedText}</span>
            <span className={`text-gold-500 font-light ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
          </p>
          <span className="w-6 sm:w-12 md:w-16 h-px bg-gold-500/40 flex-shrink-0" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-text-secondary text-sm sm:text-base md:text-lg italic max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-7 sm:mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Building the future with AI — from the legacy of innovation
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <a href="#projects" className="btn-primary px-7 sm:px-8 py-3.5 rounded-lg text-xs sm:text-sm text-center">
            View My Work
          </a>
          <a href="#contact" className="btn-outline px-7 sm:px-8 py-3.5 rounded-lg text-xs sm:text-sm text-center">
            Get In Touch
          </a>
        </motion.div>

        {/* Status badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase rounded-full border border-gold-500/20 text-gold-400 bg-gold-500/5 backdrop-blur-sm">
            AI Engineer
          </span>
          <span className="px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase rounded-full border border-emerald-500/20 text-emerald-400 bg-emerald-500/5 backdrop-blur-sm">
            UAE Based
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator - bottom center */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
      >
        <span className="text-[10px] text-gold-500 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  );
}
