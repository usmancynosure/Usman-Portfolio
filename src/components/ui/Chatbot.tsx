"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotSystemPrompt, personalInfo, projects, skillCategories, experiences, certifications } from "@/data/portfolio";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickReplies = [
  { label: "Skills", icon: "lightning", message: "What are Usman's key skills?" },
  { label: "Projects", icon: "folder", message: "Tell me about his projects" },
  { label: "Experience", icon: "briefcase", message: "What is his work experience?" },
  { label: "Contact", icon: "mail", message: "How can I contact Usman?" },
  { label: "Resume", icon: "document", message: "Can I see his resume?" },
  { label: "Certifications", icon: "badge", message: "What certifications does he have?" },
];

function getFallback(q: string): string {
  const l = q.toLowerCase();

  // Skills
  if (l.includes("skill") || l.includes("tech") || l.includes("stack") || l.includes("language") || l.includes("framework")) {
    const allSkills = skillCategories.map(cat =>
      `<strong class="text-gold-400">${cat.icon} ${cat.name}:</strong> ${cat.skills.map(s => s.name).join(", ")}`
    ).join("<br/><br/>");
    return `Here's Usman's full skill set:<br/><br/>${allSkills}`;
  }

  // Specific project
  for (const p of projects) {
    if (l.includes(p.id) || l.includes(p.title.toLowerCase())) {
      return `<strong class="text-gold-400">${p.icon} ${p.title}</strong> &mdash; ${p.subtitle}<br/><br/>${p.description}<br/><br/><strong>Key Highlights:</strong><br/>${p.highlights.map(h => `&bull; ${h}`).join("<br/>")}`;
    }
  }

  // Projects general
  if (l.includes("project") || l.includes("portfolio") || l.includes("built") || l.includes("work on")) {
    const projList = projects.map(p =>
      `<strong class="text-gold-400">${p.icon} ${p.title}</strong> &mdash; ${p.subtitle}`
    ).join("<br/>");
    return `Usman has built ${projects.length} major projects:<br/><br/>${projList}<br/><br/>Ask me about any specific project for details!`;
  }

  // Experience
  if (l.includes("experience") || l.includes("work") || l.includes("job") || l.includes("company") || l.includes("career")) {
    const expList = experiences.map(e =>
      `<strong class="text-gold-400">${e.role}</strong> at ${e.company} (${e.period})${e.badge ? ` <span class="text-emerald-400">[${e.badge}]</span>` : ""}<br/>${e.responsibilities.slice(0, 2).map(r => `&bull; ${r}`).join("<br/>")}`
    ).join("<br/><br/>");
    return expList;
  }

  // Contact
  if (l.includes("contact") || l.includes("email") || l.includes("hire") || l.includes("reach") || l.includes("phone")) {
    return `<strong class="text-gold-400">Get in touch with Usman:</strong><br/><br/>` +
      `<strong>Email:</strong> <a href="mailto:${personalInfo.email}" class="text-gold-400 underline">${personalInfo.email}</a><br/>` +
      `<strong>Phone:</strong> ${personalInfo.phone}<br/>` +
      `<strong>LinkedIn:</strong> <a href="${personalInfo.linkedin}" target="_blank" class="text-gold-400 underline">View Profile</a><br/>` +
      `<strong>GitHub:</strong> <a href="${personalInfo.github}" target="_blank" class="text-gold-400 underline">${personalInfo.githubUsername}</a><br/><br/>` +
      `<em>${personalInfo.availability}</em>`;
  }

  // Resume
  if (l.includes("resume") || l.includes("cv") || l.includes("download")) {
    return `Sure! Here's Usman's latest resume:<br/><br/>` +
      `<a href="/resume/usmanwarisCV.pdf" download="Usman-Waris-CV.pdf" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 mt-1 mb-2 rounded-lg bg-gradient-to-br from-gold-600 to-gold-500 text-white font-semibold no-underline hover:from-gold-500 hover:to-gold-400 transition-all">` +
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>` +
      `Download Resume (PDF)` +
      `</a><br/>` +
      `<span class="text-xs text-text-muted">You can also <a href="#resume" class="text-gold-400 underline">view it in the Resume section</a> on this page.</span>`;
  }

  // Certifications
  if (l.includes("certif") || l.includes("certificate") || l.includes("course")) {
    const certList = certifications.map(c =>
      `<strong class="text-gold-400">${c.logo}</strong> ${c.title} (${c.issuer})`
    ).join("<br/>");
    return `Usman holds ${certifications.length} certifications:<br/><br/>${certList}`;
  }

  // Education
  if (l.includes("education") || l.includes("degree") || l.includes("university") || l.includes("gpa") || l.includes("college")) {
    return `<strong class="text-gold-400">BS Computer Science</strong><br/>COMSATS University Islamabad (2022-2025)<br/>GPA: 3.06<br/><br/>Focused on AI/ML, software engineering, and system design.`;
  }

  // Location / Gulf / Relocation
  if (l.includes("available") || l.includes("gulf") || l.includes("relocat") || l.includes("location") || l.includes("where") || l.includes("uae") || l.includes("saudi")) {
    return `Usman is based in <strong>Pakistan</strong> and is <strong class="text-emerald-400">actively seeking opportunities in GULF countries</strong> (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman).<br/><br/>Open to both remote and on-site roles.`;
  }

  // About / Who
  if (l.includes("who") || l.includes("about") || l.includes("tell me") || l.includes("yourself") || l.includes("usman")) {
    return `<strong class="text-gold-400">${personalInfo.name}</strong> &mdash; ${personalInfo.title}<br/><br/>${personalInfo.bio}<br/><br/>${personalInfo.bioParagraph2}`;
  }

  // Greeting
  if (l.match(/^(hi|hello|hey|assalam|salam|greet|good\s)/)) {
    return `Wa Alaikum Assalam! Welcome to <strong class="text-gold-400">The Digital Majlis</strong>. I'm here to help you learn about Usman's work. What would you like to know?`;
  }

  // Default
  return `I can help you learn about Usman! Try asking about:<br/><br/>` +
    `&bull; <strong>Skills</strong> &mdash; Technical expertise<br/>` +
    `&bull; <strong>Projects</strong> &mdash; What he's built<br/>` +
    `&bull; <strong>Experience</strong> &mdash; Work history<br/>` +
    `&bull; <strong>Contact</strong> &mdash; How to reach him<br/>` +
    `&bull; <strong>Resume</strong> &mdash; Download his CV<br/><br/>` +
    `For AI-powered responses, add your OpenAI API key in settings.`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Assalamu Alaikum! I'm the <strong class='text-gold-400'>Digital Majlis</strong> AI assistant. Ask me anything about Usman's skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("openai_api_key");
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const saveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setShowSettings(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "API key saved! You'll now get AI-powered responses.", timestamp: new Date() },
      ]);
    }
  };

  const clearKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "API key removed. Using built-in responses now.", timestamp: new Date() },
    ]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    const key = localStorage.getItem("openai_api_key");
    if (key) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages.slice(-10), { role: userMsg.role, content: userMsg.content }],
            apiKey: key,
          }),
        });
        const data = await res.json();
        setIsTyping(false);
        const reply = data.reply || "Sorry, something went wrong. Please try again.";
        setMessages((m) => [...m, { role: "assistant", content: reply, timestamp: new Date() }]);
        if (!isOpen) setUnread((u) => u + 1);
      } catch {
        setIsTyping(false);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Connection error. Please check your API key and try again.", timestamp: new Date() },
        ]);
      }
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((m) => [...m, { role: "assistant", content: getFallback(text), timestamp: new Date() }]);
        if (!isOpen) setUnread((u) => u + 1);
      }, 400 + Math.random() * 400);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnread(0);
  };

  return (
    <div className="chatbot-wrapper fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[900]">
      {/* Floating toggle button */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group"
          style={{ animation: "lanternGlow 3s ease-in-out infinite" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-gold-500/20 animate-ping" style={{ animationDuration: "3s" }} />
          {/* Button bg */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500 group-hover:border-gold-400 transition-colors" />
          {/* Icon */}
          <svg className="relative z-10" viewBox="0 0 40 40" width="28" height="28">
            <path d="M20 4 L26 12 L26 28 Q26 34 20 36 Q14 34 14 28 L14 12 Z" fill="none" stroke="#CE1126" strokeWidth="2" />
            <circle cx="20" cy="20" r="4" fill="#CE1126" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1="17" y1="4" x2="23" y2="4" stroke="#CE1126" strokeWidth="2" />
            <line x1="20" y1="1" x2="20" y2="4" stroke="#CE1126" strokeWidth="1.5" />
          </svg>
          {/* Unread badge */}
          {unread > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-navy-950 text-[10px] font-bold flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {unread}
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-32px)] sm:h-[600px] sm:max-h-[calc(100vh-120px)] bg-navy-900 border-0 sm:border border-navy-600 sm:rounded-2xl flex flex-col overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(206,17,38,0.1)]"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header with gradient */}
            <div className="relative overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800 to-navy-900" />
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-emerald-500/5" />
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

              <div className="relative px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">UW</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg text-gold-500 leading-tight">Digital Majlis</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] text-emerald-400">Online</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-gold-500 hover:bg-white/5 transition-all"
                      aria-label="Settings"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-gold-500 hover:bg-white/5 transition-all"
                      aria-label="Close"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="px-4 py-3 bg-navy-800/80 backdrop-blur-sm border-b border-navy-600"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-sm text-gold-500 font-semibold mb-2">API Configuration</h4>
                  <label className="text-xs text-text-secondary block mb-1">OpenAI API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 bg-navy-900 border border-navy-600 rounded-lg text-sm text-text-primary outline-none focus:border-gold-500 transition-colors mb-2"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveKey} className="btn-primary px-4 py-1.5 rounded-lg text-xs">
                      Save Key
                    </button>
                    {apiKey && (
                      <button onClick={clearKey} className="px-4 py-1.5 rounded-lg text-xs border border-navy-600 text-text-secondary hover:border-gold-500 hover:text-gold-400 transition-colors">
                        Remove Key
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted mt-2">
                    Your key is stored locally in your browser only. Without a key, the chatbot uses built-in responses.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:var(--color-navy-600)_transparent]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[10px] font-bold text-white">UW</span>
                    </div>
                  )}
                  <div className={`max-w-[82%] space-y-1 ${msg.role === "user" ? "items-end" : ""}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/20 rounded-br-md"
                          : "bg-navy-800 border border-navy-700 rounded-bl-md"
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                    <span className={`text-[10px] text-text-muted block ${msg.role === "user" ? "text-right" : ""}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex gap-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">UW</span>
                  </div>
                  <div className="bg-navy-800 border border-navy-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-gold-500"
                        style={{ animation: `typingDot 1.4s ease-in-out infinite ${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-3 pb-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.message)}
                    className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-navy-600 rounded-full hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-400 transition-all whitespace-nowrap shrink-0"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="flex gap-2 p-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3 border-t border-navy-700 bg-navy-800/80 backdrop-blur-sm">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Ask about Usman..."
                className="flex-1 px-4 py-2.5 bg-navy-900 border border-navy-600 rounded-xl text-sm text-text-primary outline-none focus:border-gold-500 placeholder:text-text-muted transition-colors"
              />
              <motion.button
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-600 to-gold-500 text-white flex items-center justify-center shrink-0 hover:from-gold-500 hover:to-gold-400 transition-all disabled:opacity-40"
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
