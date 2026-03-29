"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send. Please email directly." });
      }
    } catch {
      setStatus({ type: "error", message: `Network error. Please email directly at ${personalInfo.email}` });
    }
    setSending(false);
    setTimeout(() => setStatus({ type: "", message: "" }), 6000);
  };

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-base sm:text-lg mb-8 md:mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Let&apos;s build something extraordinary together
        </motion.p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field} className="relative group">
                <input
                  type={field === "email" ? "email" : "text"}
                  value={formState[field]}
                  onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                  required={field !== "subject"}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-navy-600 pb-2 pt-5 text-text-primary outline-none focus:border-gold-500 transition-colors duration-300"
                />
                <label className="absolute left-0 top-5 text-text-muted pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold-500 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gold-500 capitalize">
                  {field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Subject"}
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-all duration-500 peer-focus:w-full" />
              </div>
            ))}

            <div className="relative group">
              <textarea
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                required
                rows={5}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-navy-600 pb-2 pt-5 text-text-primary outline-none focus:border-gold-500 transition-colors duration-300 resize-y min-h-[120px]"
              />
              <label className="absolute left-0 top-5 text-text-muted pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold-500 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gold-500">
                Your Message
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-all duration-500 peer-focus:w-full" />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-primary px-8 py-3.5 rounded-lg text-sm inline-flex items-center gap-2 disabled:opacity-50"
            >
              <span>{sending ? "Sending..." : "Send Message"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>

            {status.message && (
              <p className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {status.message}
              </p>
            )}
          </motion.form>

          {/* Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                title: "Email",
                value: personalInfo.email,
                href: `mailto:${personalInfo.email}`,
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                title: "Phone",
                value: "+92 320 078 7777",
                href: `tel:${personalInfo.phone}`,
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CE1126" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                title: "Location",
                value: "Pakistan — Open to GULF relocation",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-gold-500/30 hover:translate-x-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-text-secondary hover:text-gold-400 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm text-text-secondary">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social hexagons */}
            <div className="flex gap-4 pt-3">
              {[
                { href: personalInfo.github, label: "GitHub", path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
                { href: personalInfo.linkedin, label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 bg-navy-700 border border-navy-600 flex items-center justify-center text-text-secondary hover:bg-gold-500/15 hover:text-gold-500 hover:rotate-[10deg] hover:scale-110 transition-all duration-300"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
