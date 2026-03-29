"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function DesignShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="design-showcase" className="py-14 md:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gold-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Design Showcase
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 tracking-wide max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          App design concepts brought to life
        </motion.p>

        {/* Video showcase */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Phone mockup frame */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
            {/* Glow behind device */}
            <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gold-500/[0.06] rounded-[3rem] blur-[40px] pointer-events-none" />

            {/* Device frame */}
            <div className="relative bg-navy-800 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-2 border-navy-600 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(206,17,38,0.08)]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 sm:h-6 bg-navy-800 rounded-b-2xl z-20 border-b border-x border-navy-600" />

              {/* Screen content */}
              <div className="relative aspect-[9/19.5] bg-navy-950 overflow-hidden">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  playsInline
                  muted
                  preload="metadata"
                  poster=""
                  onClick={togglePlay}
                >
                  <source src="/designs recording/designdreamsay.mp4" type="video/mp4" />
                </video>

                {/* Play/Pause overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-10 group"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  <motion.div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isPlaying
                        ? "bg-navy-950/0 group-hover:bg-navy-950/60"
                        : "bg-navy-950/70 border-2 border-gold-500 shadow-[0_0_30px_rgba(206,17,38,0.3)]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#CE1126"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#CE1126">
                        <polygon points="8,5 20,12 8,19" />
                      </svg>
                    )}
                  </motion.div>
                </button>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-navy-500 rounded-full z-20" />
            </div>

            {/* Reflection */}
            <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 bg-gradient-to-b from-gold-500/5 to-transparent rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Caption */}
          <motion.div
            className="text-center mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-gold-500 mb-2">
              DesignDreamSay
            </h3>
            <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed px-2">
              A creative app design concept showcasing modern UI/UX patterns, smooth interactions, and thoughtful visual design.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["UI/UX Design", "App Concept", "Mobile First", "Modern Interface"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gold-400 border border-gold-500/30 rounded-full bg-gold-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
