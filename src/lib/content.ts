/**
 * Single source of truth for portfolio content.
 * Everything here is grounded in Usman's real resumes (AI Product Engineer +
 * Mobile App Developer). Keep it truthful — the /api/ask assistant and every
 * section read from the same facts.
 */

export const PROFILE = {
  name: "Usman Waris",
  firstName: "Usman",
  title: "AI Product Engineer",
  // one-liner used in the hero
  tagline:
    "I design, build, and ship production-grade AI products end to end — from LLM-powered backends to native apps live on the App Store.",
  location: "Islamabad, Pakistan",
  availability: "Open to AI Product Engineer roles across KSA & UAE — remote or on-site.",
  email: "imosmanwaris.tech@gmail.com",
  phone: "+92 320 078 7777",
  phoneHref: "tel:+923200787777",
  github: "https://github.com/usmancynosure",
  githubLabel: "github.com/usmancynosure",
  linkedin: "https://www.linkedin.com/in/usman-waris-0a9b8c7d/",
  linkedinLabel: "linkedin.com/in/usman-waris",
  instagram: "https://instagram.com/buildwithusman.io",
  instagramLabel: "@buildwithusman.io",
  portrait: "/images/profile/usmanphoto-removebg-preview.png",
} as const;

/** Headline metrics — verifiable, no fluff. */
export const STATS: { value: string; label: string }[] = [
  { value: "5+", label: "Apps live on the App Store" },
  { value: "End-to-end", label: "LLM backend → native app" },
  { value: "Real", label: "Paying users in production" },
  { value: "2025", label: "Shipping at GetSnippet (Dubai)" },
];

/** Two downloadable resumes. */
export const RESUMES: { label: string; role: string; href: string; kind: string }[] = [
  {
    label: "AI Product Engineer",
    role: "Agentic systems · LLM backends · RAG",
    href: "/resume/Usman-Waris-AI-Product-Engineer.pdf",
    kind: "PDF",
  },
  {
    label: "Mobile App Developer",
    role: "Flutter · SwiftUI · shipped iOS apps",
    href: "/resume/Usman-Waris-Mobile-App-Developer.docx",
    kind: "DOCX",
  },
];

/** Tech-stack ticker — real tools, grouped for rhythm. */
export const STACK: string[] = [
  "Python",
  "FastAPI",
  "LangGraph",
  "LangChain",
  "RAG Pipelines",
  "Agentic Workflows",
  "Swift",
  "SwiftUI",
  "SwiftData",
  "Flutter",
  "Dart",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Supabase",
  "Docker",
  "Kubernetes",
  "GCP",
  "AWS",
  "WebSockets",
  "SSE",
  "OpenCV",
  "PyTorch",
  "Claude Code",
];

/** What he does — capability rows. */
export const CAPABILITIES: { num: string; name: string; desc: string }[] = [
  {
    num: "01",
    name: "Agentic AI Systems",
    desc: "Production agents built with LangGraph — memory, tool orchestration, and human-in-the-loop controls engineered to survive real load, not just demos.",
  },
  {
    num: "02",
    name: "LLM Backends & RAG",
    desc: "High-performance async FastAPI services with RAG pipelines, structured outputs, and multimodal reasoning (text + vision), tuned for cost, latency, and accuracy.",
  },
  {
    num: "03",
    name: "Real-Time Architecture",
    desc: "Event-driven systems over SSE and WebSockets for live execution tracking — with rate limiting, retries, caching, and observability baked in for reliability.",
  },
  {
    num: "04",
    name: "Native & Cross-Platform Apps",
    desc: "Shipping iOS in SwiftUI (SwiftData, WidgetKit, Apple Watch, BLE) and cross-platform in Flutter — from first pixel to App Store release and subscription monetization.",
  },
  {
    num: "05",
    name: "End-to-End Product Delivery",
    desc: "Owning products spec-to-ship with agentic dev tools (Claude Code, Cursor) — secure auth (JWT/OTP), CI/CD, and paywall optimization that moves trial-to-paid.",
  },
];

export interface Project {
  slug: string;
  num: string;
  name: string;
  category: string;
  blurb: string;
  tags: string[];
  images: string[];
  /** Badge shown when the app is live on the App Store. */
  live?: boolean;
  /** Optional real URL — leave undefined until the App Store link is known. */
  url?: string;
}

/**
 * Featured work — the big sticky-stacking cards.
 * NOTE: App Store `url`s are intentionally left undefined; paste the real
 * apps.apple.com links here to make the "Live" badges clickable.
 */
export const PROJECTS: Project[] = [
  {
    slug: "freespaces",
    num: "01",
    name: "FreeSpaces",
    category: "iOS Utility · Swipe to Clean",
    blurb:
      "A swipe-to-clean photo utility — swipe left to delete, right to keep. Gesture-driven batch photo-library operations, review queues, storage analytics, and a referral-based free-usage flow. Shipped to real users.",
    tags: ["SwiftUI", "Photos", "StoreKit", "Batch Ops"],
    images: ["/images/projects/freespaces/1.png"],
    live: true,
  },
  {
    slug: "spaceflip",
    num: "02",
    name: "SpaceFlip",
    category: "Interior AI Design · iOS",
    blurb:
      "Redesigns any room from a single photo through a generative image pipeline — before/after in seconds. Subscription monetization with paywall optimization, serving paying subscribers.",
    tags: ["SwiftUI", "Generative Vision", "FastAPI", "StoreKit"],
    images: ["/images/projects/spaceflip/1.png"],
    live: true,
  },
  {
    slug: "voicetale",
    num: "03",
    name: "VoiceTale",
    category: "AI Bedtime Stories · iOS",
    blurb:
      "Generates personalized narrated bedtime stories — LLM story generation fused with text-to-speech voice models, so any tale can sound like it's read just for you.",
    tags: ["LLM", "Text-to-Speech", "SwiftUI", "RAG"],
    images: ["/images/projects/voicetale/1.png"],
    live: true,
  },
  {
    slug: "daycalc",
    num: "04",
    name: "DayCalc",
    category: "Budgeting · iPhone · Watch · Widgets",
    blurb:
      "A native budgeting app centered on one always-visible number: spend left today. Spans iPhone, Apple Watch, and home-screen widgets via a SwiftData + App Group architecture, with on-device speech entry and receipt scanning.",
    tags: ["SwiftUI", "SwiftData", "WidgetKit", "watchOS"],
    images: [
      "/images/projects/daycalc/1.png",
      "/images/projects/daycalc/watch.png",
    ],
  },
  {
    slug: "medcon",
    num: "05",
    name: "MedCon AI",
    category: "ECG Intelligence · ML Platform",
    blurb:
      "An end-to-end ECG classification system (OpenCV preprocessing, PCA + KNN) with automated clinician-ready PDF reporting — plus real-time Playwright-based doctor verification that cut manual effort by 90%. Fully containerized.",
    tags: ["OpenCV", "scikit-learn", "Docker", "Playwright"],
    images: ["/images/projects/medcon/1.png"],
  },
  {
    slug: "healthpassport",
    num: "06",
    name: "Health Passport",
    category: "AI Health Platform · Web + Mobile",
    blurb:
      "A healthcare platform pairing a clinician web dashboard with a patient mobile app — health insights, connected-device data, and wearable integrations surfaced through an AI-assisted interface.",
    tags: ["FastAPI", "MongoDB", "Flutter", "LLM"],
    images: ["/images/projects/healthpassport/1.png"],
  },
  {
    slug: "anchor",
    num: "07",
    name: "Anchor",
    category: "BLE Wearable · Stay Connected",
    blurb:
      "A companion app for an 'anchor' bracelet: tap to drop an anchor and a loved one feels it in real time. Built on a resilient BLE service (pairing, auto-reconnect, write-command queue), background connectivity across the app lifecycle, and offline history with timezone-aware notifications.",
    tags: ["Flutter", "BLE / CoreBluetooth", "Hive", "Background Tasks"],
    images: ["/images/projects/anchor/1.png"],
  },
];

/** Secondary builds shown in a compact grid. */
export const MORE_WORK: Project[] = [
  {
    slug: "lumasleep",
    num: "08",
    name: "LumaSleep",
    category: "Sleep & Wellness AI · iOS",
    blurb:
      "An AI sleep app — generative soundscapes, a community sound library, and sleep tracking synced with HealthKit to help users drift off and wake smarter.",
    tags: ["SwiftUI", "HealthKit", "Generative Audio"],
    images: ["/images/projects/lumasleep/1.png"],
  },
  {
    slug: "optify",
    num: "09",
    name: "Optify",
    category: "AI Photo Editor · iOS",
    blurb:
      "An AI photo-editing app integrating generative image models for automated enhancement, virtual try-on, and creative edits — privacy-first. Published live to the App Store.",
    tags: ["SwiftUI", "Generative Vision", "StoreKit"],
    images: ["/images/projects/optify/1.png"],
    live: true,
  },
];

export interface ExperienceItem {
  role: string;
  org: string;
  meta: string;
  period: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "AI Product Engineer",
    org: "GetSnippet",
    meta: "FreeZone LLC · Dubai — Remote",
    period: "2025 — Present",
    points: [
      "Own and ship production AI systems end to end — agentic platforms, voice assistants, and automated trading — used by real, paying users.",
      "Build high-performance async FastAPI backends handling real-time streams, concurrent workloads, and latency-sensitive operations.",
      "Engineer agentic systems with LangGraph: memory, tool orchestration, and human-in-the-loop controls for reliable automation.",
      "Ship four apps live on the App Store (FreeSpaces, Optify, SpaceFlip, VoiceTale) with subscription monetization and paywall optimization.",
    ],
  },
  {
    role: "Backend & Security Contributor",
    org: "SNSKIES Ltd",
    meta: "Pakistan",
    period: "Sep 2024",
    points: [
      "Implemented Zero Trust Network Access (ZTNA) frameworks to strengthen organizational security posture.",
      "Contributed to authentication and verification APIs with role-based authorization and secure token handling.",
    ],
  },
  {
    role: "BSc, Computer Science",
    org: "COMSATS University Islamabad",
    meta: "GPA 3.06 / 4.00",
    period: "Jan 2022 — Dec 2025",
    points: [
      "Certifications: Introduction to Generative AI (Google), Agentic AI Bootcamp (Udemy), AI Engineering Bootcamp (Udemy), Claude Certifications (Anthropic).",
    ],
  },
];

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Ask AI", href: "#ask" },
  { label: "Contact", href: "#contact" },
];
