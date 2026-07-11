"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What does Usman do?",
  "Tell me about his projects",
  "What's his tech stack?",
  "Is he available to hire?",
];

export function AskSection() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text();
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: text || "Sorry — I couldn't answer that right now.",
          };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry — I couldn't reach the AI just now. Try again?",
        };
        return copy;
      });
    } finally {
      setLoading(false);
      requestAnimationFrame(() =>
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
      );
    }
  }

  const started = messages.length > 0;

  return (
    <section
      id="ask"
      className="bg-[#0A0A0B] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 flex flex-col items-center"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-display font-bold uppercase text-center leading-none tracking-tight"
        style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
      >
        Ask my AI
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.1}
        y={20}
        className="font-mono text-[#F5F5F7]/60 uppercase tracking-widest text-[0.7rem] sm:text-xs mt-5 text-center"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-[#CCFF00] mr-2 align-middle" />
        Powered by Claude — ask anything about Usman
      </FadeIn>

      <FadeIn
        delay={0.2}
        y={30}
        className="w-full max-w-2xl mt-10 sm:mt-12"
      >
        <div className="rounded-[28px] sm:rounded-[34px] border-2 border-[#F5F5F7]/15 bg-[#0F0F10] overflow-hidden">
          {/* Messages */}
          <div
            ref={scrollRef}
            className="px-4 sm:px-6 py-6 flex flex-col gap-4 min-h-[220px] max-h-[440px] overflow-y-auto scroll-smooth"
          >
            {!started && (
              <div className="m-auto text-center text-[#F5F5F7]/35 font-light text-sm sm:text-base max-w-sm">
                Ask me about Usman&apos;s work, projects, stack, or how to hire
                him. I&apos;ll answer in real time.
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#CCFF00] text-[#0A0A0B] px-4 py-2.5 text-sm sm:text-base font-medium"
                        : "max-w-[90%] rounded-2xl rounded-bl-md bg-[#1A1A1C] text-[#F5F5F7] px-4 py-2.5 text-sm sm:text-base font-light leading-relaxed whitespace-pre-wrap"
                    }
                  >
                    {m.content || (
                      <span className="inline-flex gap-1 py-1">
                        <Dot delay={0} />
                        <Dot delay={0.15} />
                        <Dot delay={0.3} />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          {!started && (
            <div className="px-4 sm:px-6 pb-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-wider text-[#F5F5F7]/70 border border-[#F5F5F7]/20 rounded-full px-4 py-2.5 min-h-[40px] transition-colors duration-200 hover:border-[#CCFF00] hover:text-[#CCFF00] active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-3 border-t border-[#F5F5F7]/10 px-4 sm:px-5 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Usman…"
              className="flex-1 bg-transparent text-[#F5F5F7] placeholder:text-[#F5F5F7]/30 text-sm sm:text-base outline-none"
              aria-label="Ask the AI a question about Usman"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full bg-[#CCFF00] text-[#0A0A0B] transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Send"
            >
              <svg
                width="18"
                height="18"
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
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block w-1.5 h-1.5 rounded-full bg-[#CCFF00]"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
