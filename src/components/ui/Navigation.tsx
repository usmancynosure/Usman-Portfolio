"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      // Scroll spy
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = scrollTop + window.innerHeight / 3;
      let current = "hero";
      sections.forEach((section) => {
        if ((section as HTMLElement).offsetTop <= scrollPos) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const circumference = 2 * Math.PI * 22;
  const offset = circumference - scrollProgress * circumference;

  return (
    <nav className="fixed top-4 right-4 md:top-6 md:right-6 z-[500]">
      {/* Astrolabe button with progress ring */}
      <div className="relative w-[50px] h-[50px]">
        <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="22" fill="none" stroke="#243356" strokeWidth="2" />
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-100"
          />
        </svg>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-800 border-[1.5px] border-gold-500 flex items-center justify-center z-10 hover:bg-navy-700 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col gap-1 w-[18px]">
            <span
              className={`block h-[2px] bg-gold-500 rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-gold-500 rounded transition-all duration-300 ${
                isOpen ? "opacity-0 w-0" : "w-[70%]"
              }`}
            />
            <span
              className={`block h-[2px] bg-gold-500 rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-navy-950/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <ul className="relative z-10 text-center space-y-1 sm:space-y-2 max-h-[80vh] overflow-y-auto py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide transition-all duration-300 relative px-4 py-1.5 sm:py-2 ${
                      activeSection === link.id
                        ? "text-gold-500"
                        : "text-text-secondary hover:text-gold-400"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold-500 rounded-full"
                        layoutId="navIndicator"
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
