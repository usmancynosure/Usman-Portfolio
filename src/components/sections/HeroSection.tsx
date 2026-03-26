"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, heroTypingPhrases } from "@/data/portfolio";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Canvas constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 50 : 120;
    const CONNECTION_DIST = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    interface Star {
      x: number; y: number; vx: number; vy: number;
      size: number; brightness: number; pulse: number; isGeo: boolean;
    }
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        isGeo: Math.random() > 0.88,
      });
    }

    const drawGeoStar = (x: number, y: number, size: number, alpha: number) => {
      const r = size * 3;
      const ir = size * 1.5;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const radius = i % 2 === 0 ? r : ir;
        const angle = (i * Math.PI) / 8 - Math.PI / 2;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(212,175,55,${alpha * 0.4})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const loop = () => {
      if (document.hidden) { animId = requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(212,175,55,${(1 - dist / CONNECTION_DIST) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Stars
      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy; s.pulse += 0.02;
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;
        if (s.y < -10) s.y = canvas.height + 10;
        if (s.y > canvas.height + 10) s.y = -10;

        const dx = mouse.x - s.x, dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          s.vx += dx * 0.0002; s.vy += dy * 0.0002;
        }
        s.vx *= 0.99; s.vy *= 0.99;

        const alpha = Math.min(1, s.brightness + Math.sin(s.pulse) * 0.2 + (dist < 200 ? (1 - dist / 200) * 0.4 : 0));
        if (s.isGeo) {
          drawGeoStar(s.x, s.y, s.size, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (1 + (dist < 200 ? (1 - dist / 200) * 0.3 : 0)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212,175,55,${alpha})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onResize = () => { resize(); };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,13,24,0.5)_70%)]" />

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
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Profile picture */}
        <motion.div
          className="mx-auto mb-6 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gold-500 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Replace with your actual image once uploaded */}
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
            onError={(e) => {
              // Fallback to initials if image not found
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML =
                '<div class="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"><span class="font-heading text-5xl font-bold gold-shimmer">UW</span></div>';
            }}
          />
        </motion.div>

        {/* Arabic greeting */}
        <motion.p
          className="font-arabic text-gold-400 text-xl md:text-2xl mb-4 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          السلام عليكم
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider leading-none mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gold-shimmer">USMAN WARIS</span>
        </motion.h1>

        {/* Typewriter title */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="w-12 md:w-16 h-px bg-gold-500/50" />
          <p className="text-sm md:text-base tracking-[0.2em] uppercase text-text-primary">
            <span className="text-gold-300">{typedText}</span>
            <span className={`text-gold-500 font-light ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
          </p>
          <span className="w-12 md:w-16 h-px bg-gold-500/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-text-secondary text-base md:text-lg italic max-w-md mx-auto mb-8"
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
          <a href="#projects" className="btn-primary px-8 py-3.5 rounded-lg text-sm inline-block">
            View My Work
          </a>
          <a href="#contact" className="btn-outline px-8 py-3.5 rounded-lg text-sm inline-block">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
