"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, RESUMES } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setResumeOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#0A0A0B]/70 border-b border-[#F5F5F7]/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-5 sm:px-8 md:px-10 py-4">
          {/* Brand mark: lowercase u + lime dot */}
          <a href="#top" className="flex items-end gap-1 select-none" aria-label="Usman Waris — home">
            <span className="font-display font-bold lowercase leading-none text-[#F5F5F7] text-2xl md:text-3xl">
              u
            </span>
            <span className="mb-1 inline-block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#CCFF00]" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[#F5F5F7] uppercase tracking-widest text-xs transition-colors duration-200 hover:text-[#CCFF00]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume button + dropdown (desktop) */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setResumeOpen((v) => !v)}
              onBlur={() => setTimeout(() => setResumeOpen(false), 150)}
              className="group inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/60 text-[#CCFF00] font-mono uppercase tracking-widest text-xs px-5 py-2.5 transition-colors duration-200 hover:bg-[#CCFF00] hover:text-[#0A0A0B]"
              aria-haspopup="true"
              aria-expanded={resumeOpen}
            >
              Resume
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${resumeOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute right-0 mt-3 w-72 rounded-2xl border border-[#F5F5F7]/12 bg-[#0F0F10]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/60"
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#F5F5F7]/40 px-3 pt-2 pb-1">
                    Download résumé
                  </p>
                  {RESUMES.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      download
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-[#F5F5F7]/[0.06]"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#CCFF00]/10 text-[#CCFF00] font-mono text-[0.6rem] font-semibold">
                        {r.kind}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[#F5F5F7] text-sm font-medium group-hover:text-[#CCFF00] transition-colors">
                          {r.label}
                        </span>
                        <span className="text-[#F5F5F7]/45 text-xs">{r.role}</span>
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-6 bg-[#F5F5F7] transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#F5F5F7] transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#F5F5F7] transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-[#0A0A0B]/95 border-b border-[#F5F5F7]/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[#F5F5F7] uppercase tracking-widest text-sm hover:text-[#CCFF00]"
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-[#F5F5F7]/10 my-1" />
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#F5F5F7]/40">
                Download résumé
              </p>
              {RESUMES.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#CCFF00]/10 text-[#CCFF00] font-mono text-[0.55rem] font-semibold">
                    {r.kind}
                  </span>
                  <span className="text-[#F5F5F7] text-sm font-medium">{r.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
