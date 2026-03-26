"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("visited", "true");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* 8-point Islamic Star */}
            <motion.svg
              viewBox="0 0 200 200"
              width="120"
              height="120"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.polygon
                points="100,10 120,80 190,80 135,120 155,190 100,150 45,190 65,120 10,80 80,80"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, fill: "rgba(212,175,55,0.2)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.polygon
                points="100,30 115,80 170,80 125,110 140,170 100,140 60,170 75,110 30,80 85,80"
                fill="none"
                stroke="#f0c75e"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, fill: "rgba(240,199,94,0.15)" }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.svg>

            <motion.p
              className="font-arabic text-gold-500 text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              بسم الله
            </motion.p>

            {/* Loading bar */}
            <div className="w-48 h-0.5 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
