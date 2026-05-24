"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const SERVICES = [
  {
    num: "01",
    name: "AI & LLM Systems",
    desc: "Production LLM systems and RAG pipelines built with LangChain and LangGraph — from retrieval and prompt design to evaluation and deployment.",
  },
  {
    num: "02",
    name: "Agentic Workflows",
    desc: "Memory-efficient AI agents with tool-based reasoning and human-in-the-loop checkpoints, designed to survive real production load.",
  },
  {
    num: "03",
    name: "Backend Architecture",
    desc: "Scalable FastAPI microservices with async architecture, rate limiting, retry strategies, and real-time WebSocket execution tracking.",
  },
  {
    num: "04",
    name: "Computer Vision & ML",
    desc: "Image preprocessing and classification pipelines using OpenCV, PCA/KNN, and PyTorch — turning raw visual data into clinical-grade output.",
  },
  {
    num: "05",
    name: "End-to-End Product Engineering",
    desc: "Shipping apps from product spec to deployment using agentic dev tools — Claude Code, Cursor, Copilot — to compress build cycles without dropping quality.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#FAFAF7] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="text-[#0A0A0B] font-display font-bold uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </FadeIn>

      <div className="max-w-5xl mx-auto border-b border-[#0A0A0B]/15">
        {SERVICES.map((s, i) => (
          <FadeIn
            key={s.num}
            delay={i * 0.08}
            y={30}
            className="group block border-t border-[#0A0A0B]/15 cursor-pointer"
          >
            <div className="flex items-center gap-5 sm:gap-8 md:gap-12 py-7 sm:py-9 md:py-11 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-4">
              <span
                className="flex-shrink-0 w-[78px] sm:w-[130px] md:w-[180px] text-[#0A0A0B] font-display font-bold leading-none"
                style={{ fontSize: "clamp(2.5rem, 8vw, 120px)" }}
              >
                {s.num}
              </span>

              <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
                <h3
                  className="text-[#0A0A0B] font-display font-medium uppercase leading-tight"
                  style={{ fontSize: "clamp(1.05rem, 2.4vw, 2.2rem)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[#0A0A0B]/60 font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {s.desc}
                </p>
              </div>

              {/* animated arrow */}
              <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#0A0A0B]/20 text-[#0A0A0B] transition-all duration-300 ease-out group-hover:border-[#0A0A0B] group-hover:bg-[#0A0A0B] group-hover:text-[#CCFF00] group-hover:-rotate-45">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
