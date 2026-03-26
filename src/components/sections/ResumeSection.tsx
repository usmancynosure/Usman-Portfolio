"use client";

import { motion } from "framer-motion";

export function ResumeSection() {
  return (
    <section id="resume" className="py-14 md:py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Resume
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-base sm:text-lg mb-8 md:mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Professional Overview
        </motion.p>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Ornate frame */}
          <div className="border-2 border-gold-500 rounded-2xl overflow-hidden relative bg-[linear-gradient(135deg,rgba(245,240,232,0.03),rgba(245,240,232,0.01))]"
            style={{
              backgroundImage: "linear-gradient(135deg, #d4af37 6px, transparent 6px), linear-gradient(225deg, #d4af37 6px, transparent 6px), linear-gradient(315deg, #d4af37 6px, transparent 6px), linear-gradient(45deg, #d4af37 6px, transparent 6px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "top left, top right, bottom right, bottom left",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="p-4 sm:p-6 md:p-10">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b-2 border-gold-500">
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-gold-500 tracking-wider mb-1">USMAN WARIS</h2>
                <p className="text-xs sm:text-sm text-text-secondary mb-1">AI Engineer | LLM Systems | Backend & Agentic Architect</p>
                <p className="text-[11px] sm:text-sm text-text-muted break-all sm:break-normal">
                  imosmanwaris.tech@gmail.com | +923200787777 |{" "}
                  <a href="https://github.com/usmancynosure" target="_blank" className="text-gold-400 hover:underline">GitHub</a> |{" "}
                  <a href="https://www.linkedin.com/in/usman-waris-0a9b8c7d/" target="_blank" className="text-gold-400 hover:underline">LinkedIn</a>
                </p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="font-heading text-sm text-gold-500 uppercase tracking-[0.15em] border-b border-navy-600 pb-1.5 mb-3">Professional Summary</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  AI Engineer specializing in LLM systems, agentic workflows, and scalable backend architectures. Experienced in designing production-grade AI systems using LangGraph, FastAPI, and microservices. Strong background in RAG pipelines, AI automation platforms, computer vision, and ML classification systems.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="font-heading text-sm text-gold-500 uppercase tracking-[0.15em] border-b border-navy-600 pb-1.5 mb-3">Experience</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                    <span className="text-sm"><strong className="text-white">AI Engineer</strong> — Snippet.co</span>
                    <span className="text-xs text-text-muted">2025 — Present</span>
                  </div>
                  <ul className="space-y-0.5">
                    <li className="text-sm text-text-secondary pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[6px] before:top-1.5">Designing AI-powered automation systems using LangGraph and LLM orchestration</li>
                    <li className="text-sm text-text-secondary pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[6px] before:top-1.5">Building scalable FastAPI backend services with async architecture</li>
                    <li className="text-sm text-text-secondary pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[6px] before:top-1.5">Developing agentic workflows with memory management and tool-based reasoning</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                    <span className="text-sm"><strong className="text-white">Backend & Security Contributor</strong> — SNSKIES Ltd</span>
                    <span className="text-xs text-text-muted">2025</span>
                  </div>
                  <ul className="space-y-0.5">
                    <li className="text-sm text-text-secondary pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[6px] before:top-1.5">Implemented Zero Trust Network Access (ZTNA) frameworks</li>
                    <li className="text-sm text-text-secondary pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[6px] before:top-1.5">Contributed to authentication and verification APIs</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="font-heading text-sm text-gold-500 uppercase tracking-[0.15em] border-b border-navy-600 pb-1.5 mb-3">Education</h3>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="text-sm"><strong className="text-white">BS Computer Science</strong> — COMSATS University Islamabad</span>
                  <span className="text-xs text-text-muted">2022 — 2025</span>
                </div>
                <p className="text-sm text-text-secondary">GPA: 3.06</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-heading text-sm text-gold-500 uppercase tracking-[0.15em] border-b border-navy-600 pb-1.5 mb-3">Skills</h3>
                <p className="text-sm text-text-secondary"><strong className="text-text-primary">Programming:</strong> Python, FastAPI, Flask, Django, JavaScript/TypeScript</p>
                <p className="text-sm text-text-secondary"><strong className="text-text-primary">AI/ML:</strong> LangChain, LangGraph, RAG, Transformers, OpenCV, PyTorch, Scikit-Learn</p>
                <p className="text-sm text-text-secondary"><strong className="text-text-primary">Cloud & DevOps:</strong> Docker, Kubernetes, AWS, Google Cloud, CI/CD, MongoDB, PostgreSQL, Redis</p>
              </div>
            </div>
          </div>

          {/* Download button */}
          <a
            href="/resume/usman-waris-resume.pdf"
            download
            className="btn-primary px-8 py-3 rounded-lg text-sm inline-flex items-center gap-2 mt-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </motion.div>
      </div>
    </section>
  );
}
