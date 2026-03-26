"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 md:py-28 geo-pattern">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-lg mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Continuous Learning
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} delay={i * 0.15} />
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
      className="h-[280px] cursor-pointer"
      style={{ perspective: 1000 }}
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
        <div className="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-gold-500 transition-all duration-300" style={{ backfaceVisibility: "hidden" }}>
          <svg viewBox="0 0 60 60" className="w-12 h-12 mb-4">
            <circle cx="30" cy="30" r="28" fill="none" stroke="#d4af37" strokeWidth="2" />
            <polygon points="30,8 34,22 48,22 37,30 41,44 30,36 19,44 23,30 12,22 26,22" fill="#d4af37" opacity="0.2" />
            <text x="30" y="35" textAnchor="middle" fill="#d4af37" fontSize="16" fontFamily="serif" fontWeight="bold">{cert.logo}</text>
          </svg>
          <h3 className="font-heading text-lg text-white mb-1">{cert.title}</h3>
          <p className="text-sm text-gold-500 font-semibold">{cert.issuer}</p>
          <p className="text-xs text-text-muted absolute bottom-4">Click to view details</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-navy-700 border border-gold-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <h4 className="font-heading text-lg text-gold-500 mb-4">Certificate Details</h4>
          <div className="space-y-2 w-full text-left">
            <p className="text-sm text-text-secondary"><strong className="text-text-primary">Issuer:</strong> {cert.issuer}</p>
            <p className="text-sm text-text-secondary"><strong className="text-text-primary">Topic:</strong> {cert.topic}</p>
            <p className="text-sm text-text-secondary"><strong className="text-text-primary">Skills:</strong> {cert.skills}</p>
          </div>
          <p className="text-xs text-text-muted absolute bottom-4">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
