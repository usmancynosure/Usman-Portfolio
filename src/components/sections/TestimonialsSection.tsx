"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/portfolio";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 geo-pattern">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-lg mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          What People Say
        </motion.p>

        {/* Testimonial card */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="glass-card rounded-3xl p-8 md:p-10 text-center relative"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Quotation mark */}
              <span className="absolute top-4 left-6 font-arabic text-[80px] text-gold-500/20 leading-none select-none">&ldquo;</span>

              <p className="text-lg md:text-xl text-text-primary italic leading-relaxed mb-8 relative z-10 pt-6">
                {testimonials[active].text}
              </p>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-navy-700 border-2 border-gold-500 flex items-center justify-center font-heading font-bold text-gold-500 text-lg">
                  {testimonials[active].name.charAt(0)}
                </div>
                <span className="font-semibold text-white">{testimonials[active].name}</span>
                <span className="text-sm text-gold-400">{testimonials[active].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Diamond dots */}
        <div className="flex justify-center gap-4 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 ${
                i === active
                  ? "bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "bg-navy-600 hover:bg-gold-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
