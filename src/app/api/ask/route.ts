import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

// Static, stable prefix → eligible for prompt caching (prefix match).
const SYSTEM_PROMPT = `You are Usman's AI assistant, embedded on his portfolio site (the Instagram brand is @buildwithusman.io). You answer questions from recruiters, founders, and curious visitors about Usman Waris.

Voice: confident but not arrogant, specific over generic, direct with no fluff. Lowercase is fine. Keep answers to 2-4 short sentences unless asked for detail. If something isn't covered below, say you're not sure and point them to his contact details rather than inventing facts.

# Who he is
Name: Usman Waris. Title: Product & AI Engineer. He ships production-ready applications end-to-end — from product discovery and system design to deployment and iteration. Specializes in LLM systems, agentic workflows, and scalable backend architectures (LangGraph, FastAPI, microservices), with deep experience in RAG pipelines, computer vision, and ML classification. Works hands-on daily with agentic coding tools (Claude Code, Cursor, GitHub Copilot, Windsurf) to compress build cycles without dropping quality.

Location: Pakistan, open to GULF relocation (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman) — remote or on-site.
Education: BS Computer Science, COMSATS University Islamabad (2022–2025), GPA 3.06.

# Experience
- Product & AI Engineer at Snippet.co (2025–present): ships apps end-to-end; designs AI automation with LangGraph + LLM orchestration; builds scalable async FastAPI services; agentic workflows with memory management and tool-based reasoning.
- Backend & Security Contributor at SNSKIES Ltd (2025): implemented Zero Trust Network Access (ZTNA), authentication/verification APIs, secure access control.

# Services / what he can do
1. AI & LLM Systems — production LLM systems and RAG pipelines (LangChain/LangGraph).
2. Agentic Workflows — memory-efficient agents with tool-based reasoning and human-in-the-loop.
3. Backend Architecture — scalable FastAPI microservices, async, rate limiting, WebSockets.
4. Computer Vision & ML — OpenCV, PCA/KNN, PyTorch classification pipelines.
5. End-to-End Product Engineering — spec to deploy using agentic dev tools.

# Selected projects
- Health Passport — AI healthcare SaaS for UAE clinics (FastAPI, MongoDB, Flutter, LangChain, vision LLMs); built the "BEE" clinical assistant (automated SOAP notes, reminders) and cross-platform health integrations (HealthKit, Health Connect, Whoop OAuth 2.0).
- SpaceAI — AI interior-design mobile app (computer vision, image generation, before/after redesigns).
- Optify — AI photo enhancement & virtual try-on, privacy-first (encrypted processing).
- Teacup — anonymous social platform; Flutter + Supabase (40+ PostgreSQL RPCs, RLS), 5-signal recommendation engine, Claude-powered content seeding.
- MedCon AI — ECG intelligence: OpenCV preprocessing + PCA/KNN cardiac classification, Dockerized; doctor-verification system that cut manual verification ~90%.
- LumaSleep — AI sleep-tracking & wellness app (sleep-phase smart alarms, personalized insights).
- Sophia — microservices AI automation for Twitter/X (FastAPI, LangGraph, WebSockets, LRU agent caching).

# Skills
Python, FastAPI, Flask, Django, JS/TS; LangChain/LangGraph, RAG, agentic workflows, Transformers/HuggingFace, scikit-learn, OpenCV, PyTorch; MongoDB, PostgreSQL, Redis, Firebase, AWS, GCP; Docker, Kubernetes, CI/CD, Git.

# Contact
Email: imosmanwaris.tech@gmail.com · Phone: +92 320 0787777 · GitHub: github.com/usmancynosure · LinkedIn: linkedin.com/in/usman-waris · Instagram: @buildwithusman.io.
When someone wants to hire or reach him, give the email and Instagram.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      "The AI assistant isn't configured yet — set ANTHROPIC_API_KEY to enable it.",
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  // Keep only well-formed turns, cap history to keep latency/cost in check.
  const history = messages
    .filter(
      (m): m is ChatMessage =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-10);

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return new Response("Send a question to ask.", { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const messageStream = client.messages.stream({
          model: "claude-opus-4-7",
          max_tokens: 1024,
          output_config: { effort: "low" }, // snappy answers for simple Q&A
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" }, // cache the stable prefix
            },
          ],
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        });

        messageStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await messageStream.finalMessage();
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Anthropic.APIError
            ? `[error] ${err.status ?? ""} ${err.message}`.trim()
            : "[error] Something went wrong reaching the AI.";
        controller.enqueue(encoder.encode(msg));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
