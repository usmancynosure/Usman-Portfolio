"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotSystemPrompt, personalInfo } from "@/data/portfolio";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  { label: "Skills", message: "What are Usman's key skills?" },
  { label: "Projects", message: "Tell me about his projects" },
  { label: "Experience", message: "What is his work experience?" },
  { label: "Contact", message: "How can I contact Usman?" },
];

function getFallback(q: string): string {
  const l = q.toLowerCase();
  if (l.includes("skill") || l.includes("tech"))
    return `Usman's key skills: <strong>Python, FastAPI, LangChain, LangGraph</strong> (AI/backend), <strong>Docker, AWS, MongoDB, PostgreSQL</strong> (infrastructure), <strong>OpenCV, PyTorch, Scikit-Learn</strong> (ML/CV). He specializes in LLM systems and agentic workflows.`;
  if (l.includes("project"))
    return `Usman built: <strong>Health Passport</strong> (AI Healthcare SaaS for UAE clinics), <strong>Sophia</strong> (AI Twitter automation with LangGraph), and <strong>MedCon AI</strong> (ECG intelligence reducing manual verification by 90%).`;
  if (l.includes("experience") || l.includes("work"))
    return `Currently <strong>AI Engineer at Snippet.co</strong> building AI automation with LangGraph. Previously <strong>Backend & Security Contributor at SNSKIES Ltd</strong> implementing ZTNA frameworks. BS Computer Science from COMSATS (GPA: 3.06).`;
  if (l.includes("contact") || l.includes("email") || l.includes("hire"))
    return `Reach Usman at: <strong>${personalInfo.email}</strong> or <strong>${personalInfo.phone}</strong>. Connect on <a href="${personalInfo.linkedin}" target="_blank" class="text-gold-400 underline">LinkedIn</a> or <a href="${personalInfo.github}" target="_blank" class="text-gold-400 underline">GitHub</a>.`;
  if (l.includes("certif"))
    return `Certifications: <strong>Introduction to Generative AI</strong> (Google), <strong>AI Engineering Bootcamp</strong> (Udemy), <strong>Agentic AI Bootcamp</strong> (Udemy).`;
  if (l.includes("available") || l.includes("gulf") || l.includes("relocat"))
    return `Usman is <strong>actively seeking opportunities in GULF countries</strong> (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman). Open to remote and on-site roles.`;
  return `I can tell you about Usman's <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, or <strong>contact info</strong>. For AI-powered responses, add your OpenAI API key in settings.`;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Assalamu Alaikum! 👋 I'm Usman's AI assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
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
      setMessages((m) => [...m, { role: "assistant", content: "API key saved! You can now chat with AI-powered responses." }]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
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
            messages: [...messages.slice(-10), userMsg],
            apiKey: key,
          }),
        });
        const data = await res.json();
        setIsTyping(false);
        setMessages((m) => [...m, { role: "assistant", content: data.reply || "Sorry, something went wrong." }]);
      } catch {
        setIsTyping(false);
        setMessages((m) => [...m, { role: "assistant", content: "Error connecting. Please check your API key." }]);
      }
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((m) => [...m, { role: "assistant", content: getFallback(text) }]);
      }, 600);
    }
  };

  return (
    <div className="chatbot-wrapper fixed bottom-6 right-6 z-[900]">
      {/* Toggle */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-navy-800 border-2 border-gold-500 flex items-center justify-center hover:scale-110 hover:shadow-[0_8px_40px_rgba(212,175,55,0.3)] transition-all duration-300"
          style={{ animation: "lanternGlow 3s ease-in-out infinite" }}
          whileHover={{ scale: 1.1 }}
          aria-label="Open AI Assistant"
        >
          <svg viewBox="0 0 40 40" width="26" height="26">
            <path d="M20 4 L26 12 L26 28 Q26 34 20 36 Q14 34 14 28 L14 12 Z" fill="none" stroke="#d4af37" strokeWidth="2" />
            <circle cx="20" cy="20" r="4" fill="#d4af37" opacity="0.6" />
            <line x1="17" y1="4" x2="23" y2="4" stroke="#d4af37" strokeWidth="2" />
            <line x1="20" y1="1" x2="20" y2="4" stroke="#d4af37" strokeWidth="1.5" />
          </svg>
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-32px)] h-[550px] max-h-[calc(100vh-120px)] bg-navy-900 border border-gold-500 rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.15)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="relative bg-navy-800 px-4 py-3 border-b border-navy-600">
              <h3 className="font-heading text-lg text-gold-500">Digital Majlis</h3>
              <p className="text-xs text-text-muted">Ask me anything about Usman</p>
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => setShowSettings(!showSettings)} className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-gold-500 hover:bg-gold-500/10 transition-all" aria-label="Settings">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-gold-500 hover:bg-gold-500/10 transition-all" aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
            </div>

            {/* Settings */}
            {showSettings && (
              <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
                <h4 className="text-sm text-gold-500 font-semibold mb-2">API Configuration</h4>
                <label className="text-xs text-text-secondary block mb-1">OpenAI API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-navy-900 border border-navy-600 rounded-lg text-sm text-text-primary outline-none focus:border-gold-500 mb-2"
                />
                <button onClick={saveKey} className="btn-primary px-4 py-1.5 rounded-lg text-xs">Save Key</button>
                <p className="text-[11px] text-text-muted mt-1">Stored locally, never sent except to OpenAI.</p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:thin] [scrollbar-color:var(--color-navy-600)_transparent]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`} style={{ animation: "fadeInUp 0.3s ease" }}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-navy-700 border border-gold-500 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-gold-gradient">UW</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold-500/15 border border-gold-500/20 rounded-br-sm"
                        : "bg-navy-700 rounded-bl-sm"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-navy-700 border border-gold-500 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-gold-gradient">UW</span>
                  </div>
                  <div className="flex gap-1 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-gold-500" style={{ animation: `typingDot 1.4s ease-in-out infinite ${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr.label}
                  onClick={() => sendMessage(qr.message)}
                  className="px-3 py-1.5 text-xs font-medium text-gold-400 border border-gold-500/30 rounded-full hover:bg-gold-500/10 hover:border-gold-500 transition-all"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 pt-2 border-t border-navy-600 bg-navy-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about Usman..."
                className="flex-1 px-4 py-2.5 bg-navy-900 border border-navy-600 rounded-full text-sm text-text-primary outline-none focus:border-gold-500 placeholder:text-text-muted"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shrink-0 hover:bg-gold-400 hover:scale-105 transition-all"
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
