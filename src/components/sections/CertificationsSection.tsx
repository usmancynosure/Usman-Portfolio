"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-14 md:py-20 lg:py-28 geo-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gold-gradient">
            Certifications
          </h2>
          <p className="text-text-secondary text-lg tracking-wide">
            Continuous Learning
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, delay }: { cert: typeof certifications[0]; delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="h-[230px] sm:h-[260px] md:h-[300px] cursor-pointer group"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass-card rounded-2xl overflow-hidden hover:border-gold-500 hover:shadow-[0_8px_30px_rgba(206,17,38,0.15)] transition-all duration-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          {cert.image ? (
            <div className="w-full h-full relative">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-8 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-full mb-2.5" />
                <h3 className="font-heading text-base font-bold text-white mb-1 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm text-gold-400 font-semibold">{cert.issuer}</p>
              </div>

              {/* Flip hint */}
              <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-medium text-gold-400 bg-navy-900/70 backdrop-blur-sm rounded-full border border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to flip
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-4">
                <span className="font-heading text-2xl font-bold text-gold-500">{cert.logo}</span>
              </div>
              <h3 className="font-heading text-lg text-white mb-1.5 leading-snug">{cert.title}</h3>
              <p className="text-sm text-gold-400 font-semibold">{cert.issuer}</p>
              <p className="text-[11px] text-text-muted mt-auto">Click to view details</p>
            </div>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, rgba(33, 38, 45, 0.9) 0%, rgba(22, 27, 34, 0.95) 100%)",
            border: "1px solid var(--color-gold-500)",
          }}
        >
          {/* Decorative top element */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#CE1126" strokeWidth="2">
              <path d="M12 15l-3-3m0 0l3-3m-3 3h12M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h4 className="font-heading text-lg text-gold-500 font-bold mb-5">Certificate Details</h4>

          <div className="space-y-3 w-full text-left">
            <div className="flex items-start gap-2">
              <span className="text-gold-500 text-[8px] mt-1.5 shrink-0">&#9670;</span>
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Issuer:</strong> {cert.issuer}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold-500 text-[8px] mt-1.5 shrink-0">&#9670;</span>
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Topic:</strong> {cert.topic}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold-500 text-[8px] mt-1.5 shrink-0">&#9670;</span>
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Skills:</strong> {cert.skills}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-text-muted mt-auto pt-3">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
