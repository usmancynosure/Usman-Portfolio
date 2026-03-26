"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="diamond" />
    </motion.div>
  );
}
