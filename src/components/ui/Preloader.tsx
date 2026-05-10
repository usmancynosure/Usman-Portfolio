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
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Monogram with animated ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              >
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="220 120"
                />
              </motion.svg>

              {/* Inner static ring */}
              <div className="absolute inset-3 rounded-full border border-navy-700" />

              {/* Monogram */}
              <motion.span
                className="font-heading text-3xl font-extrabold gold-shimmer relative z-10"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                UW
              </motion.span>
            </div>

            {/* Loading bar */}
            <div className="w-48 h-0.5 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>

            {/* Subtle label */}
            <motion.p
              className="text-text-muted text-[10px] tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Loading Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
