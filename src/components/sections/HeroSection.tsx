"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, heroTypingPhrases } from "@/data/portfolio";

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
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero section video/Herovideo.mp4"
      >
        <source src="/images/hero section video/Herovideo.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-navy-950/60" />

      {/* Radial overlay + ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,13,24,0.7)_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/[0.03] blur-[120px] pointer-events-none" />

      {/* Faint 8-point star watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 200 200" className="w-[500px] h-[500px]">
          <polygon
            points="100,10 120,80 190,80 135,120 155,190 100,150 45,190 65,120 10,80 80,80"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl w-full">
        {/* Profile picture */}
        <motion.div
          className="mx-auto mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-2 border-gold-500 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.25),0_0_120px_rgba(212,175,55,0.1)]"
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
                '<div class="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"><span class="font-heading text-5xl font-bold gold-shimmer">UW</span></div>';
            }}
          />
        </motion.div>

        {/* Arabic greeting */}
        <motion.p
          className="font-arabic text-gold-400 text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          السلام عليكم
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-heading text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wider leading-none mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gold-shimmer">USMAN WARIS</span>
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="w-6 sm:w-12 md:w-16 h-px bg-gold-500/50" />
          <p className="text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-text-primary min-h-[1.5em]">
            <span className="text-gold-300">{typedText}</span>
            <span className={`text-gold-500 font-light ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
          </p>
          <span className="w-6 sm:w-12 md:w-16 h-px bg-gold-500/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-text-secondary text-sm sm:text-base md:text-lg italic max-w-md mx-auto mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Building the future with AI — from the legacy of innovation
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <a href="#projects" className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm inline-block">
            View My Work
          </a>
          <a href="#contact" className="btn-outline px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm inline-block">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
      >
        <span className="text-[10px] text-gold-500 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  );
}
