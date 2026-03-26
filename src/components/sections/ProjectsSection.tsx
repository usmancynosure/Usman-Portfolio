"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects, Project } from "@/data/portfolio";

const filters = [
  { label: "All", value: "all" },
  { label: "AI / LLM", value: "ai" },
  { label: "ML / CV", value: "ml" },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-lg mb-10 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Exhibition Hall
        </motion.p>

        {/* Filters */}
        <motion.div
          className="flex justify-center gap-3 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === f.value
                  ? "bg-gold-500 text-navy-950 font-semibold"
                  : "border border-navy-600 text-text-secondary hover:border-gold-500 hover:text-gold-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group hover:border-gold-500 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                {/* Geo pattern overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23d4af37' stroke-width='0.3' opacity='0.1'/%3E%3C/svg%3E")`,
                }} />

                {/* Project image */}
                <div className="relative h-48 bg-navy-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      t.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"><span class="text-5xl">${project.icon}</span></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                </div>

                <div className="p-5 relative z-[2]">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-full mb-3" />
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium text-gold-400 border border-gold-500/30 rounded-full bg-gold-500/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gold-500 flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                    <span className="text-[8px]">&#9670;</span> View Details
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="relative bg-navy-800 border border-gold-500 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-2xl text-text-secondary hover:text-gold-500 hover:bg-gold-500/10 transition-all"
              >
                &times;
              </button>

              <span className="text-4xl mb-3 block">{selectedProject.icon}</span>
              <h3 className="font-heading text-2xl font-bold text-gold-500 mb-1">{selectedProject.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{selectedProject.subtitle}</p>
              <p className="text-text-secondary leading-relaxed mb-6">{selectedProject.description}</p>

              <h4 className="text-gold-400 font-semibold mb-3">Key Highlights</h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((h) => (
                  <li key={h} className="text-sm text-text-secondary pl-5 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-500 before:text-[8px] before:top-1.5">
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-navy-600">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[11px] font-medium text-gold-400 border border-gold-500/30 rounded-full bg-gold-500/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
