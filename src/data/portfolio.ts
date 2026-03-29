// ============================================
// PORTFOLIO DATA - All content in one place
// ============================================

export const personalInfo = {
  name: "Usman Waris",
  title: "AI Engineer | LLM Systems | Backend & Agentic Architect",
  email: "imosmanwaris.tech@gmail.com",
  phone: "+923200787777",
  github: "https://github.com/usmancynosure",
  githubUsername: "usmancynosure",
  linkedin: "https://www.linkedin.com/in/usman-waris-0a9b8c7d/",
  location: "Pakistan — Open to GULF relocation",
  profileImage: "/images/profile/usmanphoto.jpeg",
  bio: `AI Engineer specializing in LLM systems, agentic workflows, and scalable backend architectures. Experienced in designing production-grade AI systems using LangGraph, FastAPI, and microservices. Strong background in RAG pipelines, AI automation platforms, computer vision, and ML classification systems.`,
  bioParagraph2: `Proven ability to design memory-efficient AI agents, anti-automation systems, and human-in-the-loop workflows. Passionate about system design, scalable architectures, and AI-powered product development.`,
  availability: "Available for full-time positions in GULF countries (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman). Open to remote and on-site roles.",
};

export const heroTypingPhrases = [
  "AI Engineer",
  "LLM Systems Architect",
  "Backend & Agentic Developer",
  "Building the Future with AI",
  "Agentic Workflow Designer",
];

export const stats = [
  { number: 6, suffix: "+", label: "Projects Delivered" },
  { number: 2, suffix: "+", label: "Companies" },
  { number: 5, suffix: "", label: "Certifications" },
  { number: 3.06, suffix: "", label: "GPA", isDecimal: true },
];

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    icon: "💻",
    color: "#CE1126",
    skills: [
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 90 },
      { name: "Flask", level: 80 },
      { name: "Django", level: 75 },
      { name: "JavaScript/TypeScript", level: 78 },
      { name: "RESTful API Design", level: 92 },
    ],
  },
  {
    name: "AI & Data Science",
    icon: "🧠",
    color: "#F05060",
    skills: [
      { name: "LangChain / LangGraph", level: 92 },
      { name: "RAG Pipelines", level: 88 },
      { name: "Agentic Workflows", level: 90 },
      { name: "Transformers / HuggingFace", level: 82 },
      { name: "Scikit-Learn (PCA, KNN)", level: 80 },
      { name: "OpenCV", level: 78 },
      { name: "PyTorch", level: 72 },
    ],
  },
  {
    name: "Databases & Cloud",
    icon: "☁️",
    color: "#E8384F",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 78 },
      { name: "Firebase / Firestore", level: 80 },
      { name: "AWS", level: 72 },
      { name: "Google Cloud", level: 68 },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: "🔧",
    color: "#9B0D1E",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 65 },
      { name: "Git / Version Control", level: 90 },
      { name: "CI/CD Pipelines", level: 75 },
      { name: "Node.js", level: 72 },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: "ai" | "ml" | "backend" | "mobile";
  highlights: string[];
  icon: string;
  image: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "spaceai",
    title: "SpaceAI",
    subtitle: "AI-Powered Interior Design Mobile App",
    description:
      "An intelligent interior design application that uses AI to analyze rooms, generate design suggestions, and provide before/after visualizations. Users can upload room photos, get AI-powered redesign recommendations across styles (Modern, Natural, Art Deco), and manage multiple design projects with a full profile and settings system.",
    tags: ["AI/ML", "Computer Vision", "Mobile App", "Interior Design", "Image Generation"],
    category: "ai",
    highlights: [
      "AI-powered room analysis and redesign suggestions",
      "Before/after visualization with multiple design styles",
      "Project management with design history tracking",
      "Dark and light mode with full user profile system",
    ],
    icon: "🏠",
    image: "/images/projects/SpaceAi/1.png",
    images: [
      "/images/projects/SpaceAi/1.png",
      "/images/projects/SpaceAi/2.png",
      "/images/projects/SpaceAi/3.png",
      "/images/projects/project review.jpeg",
    ],
  },
  {
    id: "optify",
    title: "Optify",
    subtitle: "AI Photo Enhancement & Virtual Try-On Platform",
    description:
      "A comprehensive AI-powered photo enhancement and virtual try-on mobile application. Features professional photo editing with AI-driven enhancements, virtual clothing try-on using advanced image processing, identity-protected face transformations, and a magic studio for creative photo manipulation. Designed with privacy-first architecture ensuring photos are encrypted and used only for processing.",
    tags: ["AI/ML", "Computer Vision", "Virtual Try-On", "Image Processing", "Mobile App"],
    category: "ai",
    highlights: [
      "AI-powered virtual clothing try-on with realistic results",
      "Professional photo enhancement beyond standard filters",
      "Privacy-first design with encrypted photo processing",
      "Magic studio for creative AI-driven transformations",
    ],
    icon: "📸",
    image: "/images/projects/Optify/4.png",
    images: [
      "/images/projects/Optify/4.png",
      "/images/projects/Optify/5.png",
      "/images/projects/Optify/6.png",
    ],
  },
  {
    id: "health-passport",
    title: "Health Passport",
    subtitle: "AI-Powered Healthcare SaaS Platform (UAE Clinics)",
    description:
      "Contributed to a full-stack healthcare management system using FastAPI, MongoDB, and Flutter, enabling secure patient management, real-time messaging, appointment scheduling, and cross-platform health data integration (HealthKit, Health Connect, Whoop OAuth 2.0). Built the BEE AI clinical assistant using LangChain and vision LLMs to automate SOAP notes, reminders, and patient workflows through intelligent tool-calling, context-aware reasoning, and secure JWT-based architecture.",
    tags: ["FastAPI", "MongoDB", "Flutter", "LangChain", "OAuth 2.0", "JWT", "Vision LLMs"],
    category: "ai",
    highlights: [
      "Full-stack healthcare SaaS serving UAE clinics",
      "BEE AI clinical assistant with LangChain + Vision LLMs",
      "Cross-platform health data integration (HealthKit, Health Connect, Whoop)",
      "Secure JWT-based architecture with OAuth 2.0",
    ],
    icon: "🏥",
    image: "/images/projects/Healthpassport/Clean and Modern App Portfolio Mockup Presentation.png",
    images: [
      "/images/projects/Healthpassport/Clean and Modern App Portfolio Mockup Presentation.png",
    ],
  },
  {
    id: "sophia",
    title: "Sophia",
    subtitle: "AI-Powered Twitter/X Automation Platform",
    description:
      "Designed a microservices-based AI automation platform using FastAPI and LangGraph that enables contextual tweet engagement with tool-based reasoning and human-in-the-loop workflows. Optimized production reliability with LRU-based agent caching, anti-automation delay strategies, rate limiting, and WebSocket-based real-time execution tracking.",
    tags: ["FastAPI", "LangGraph", "Microservices", "WebSocket", "AI Agents", "Redis"],
    category: "ai",
    highlights: [
      "Microservices-based AI automation platform",
      "Human-in-the-loop agentic workflows with LangGraph",
      "LRU-based agent caching for production reliability",
      "Real-time WebSocket execution tracking",
    ],
    icon: "🤖",
    image: "/images/projects/Medcon/9.png",
  },
  {
    id: "medcon",
    title: "MedCon AI Systems",
    subtitle: "ECG Intelligence & Doctor Verification Platform",
    description:
      "Built an end-to-end AI healthcare system including ECG image preprocessing (OpenCV), PCA + KNN-based cardiac classification, and automated clinician-ready PDF reporting, fully containerized with Docker. Engineered a real-time doctor verification system integrating Playwright-based PMDC validation, intelligent identity matching, Firestore logging, and automated notifications—reducing manual verification by 90%.",
    tags: ["OpenCV", "Scikit-Learn", "Docker", "Playwright", "Firestore", "PCA", "KNN"],
    category: "ml",
    highlights: [
      "ECG image preprocessing with OpenCV",
      "PCA + KNN cardiac classification pipeline",
      "Reduced manual doctor verification by 90%",
      "Fully containerized with Docker",
    ],
    icon: "🫀",
    image: "/images/projects/Medcon/7.png",
    images: [
      "/images/projects/Medcon/7.png",
      "/images/projects/Medcon/8.png",
      "/images/projects/Medcon/9.png",
      "/images/projects/Medcon/10.png",
    ],
  },
  {
    id: "teacup",
    title: "Teacup",
    subtitle: "Anonymous Relationship Advice & Community Verdict Platform",
    description:
      "Teacup solves the problem of having no safe, anonymous place to get honest relationship advice. People in messy relationship situations — cheating, red flags, breakups, situationships — often can't talk openly to friends or family without judgment, gossip, or bias. Teacup lets users share their situation anonymously, get a community verdict from unbiased strangers (Red Flag, Green Flag, Dump Them, Work It Out), and feel safe doing it with built-in rules against callouts, name-dropping, and screenshots. A crowdsourced relationship reality check without social consequences.",
    tags: ["Mobile App", "Community", "Anonymous", "Social Platform", "UI/UX"],
    category: "mobile",
    highlights: [
      "Fully anonymous posting — no real names, photos, or identity",
      "Community verdict system (Red Flag, Green Flag, Dump Them, Work It Out)",
      "Built-in safety rules against callouts and screenshots",
      "Crowdsourced unbiased relationship advice from strangers",
    ],
    icon: "🍵",
    image: "/images/projects/teacup/8.png",
    images: [
      "/images/projects/teacup/8.png",
      "/images/projects/teacup/9.png",
      "/images/projects/teacup/10.png",
      "/images/projects/teacup/11.png",
    ],
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "current" | "past" | "education";
  responsibilities: string[];
  badge?: string;
}

export const experiences: Experience[] = [
  {
    id: "snippet",
    role: "AI Engineer",
    company: "Snippet.co",
    period: "2025 — Present",
    type: "current",
    badge: "Current",
    responsibilities: [
      "Designing and implementing AI-powered automation systems using LangGraph and LLM orchestration",
      "Building scalable FastAPI backend services with async architecture",
      "Developing agentic workflows with memory management and tool-based reasoning",
      "Architecting microservices-based systems for AI execution and backend orchestration",
      "Implementing rate-limiting, retry strategies, and production-grade monitoring",
      "Working on system design decisions rather than only feature implementation",
    ],
  },
  {
    id: "snskies",
    role: "Backend & Security Contributor",
    company: "SNSKIES Ltd",
    period: "2025",
    type: "past",
    responsibilities: [
      "Implemented Zero Trust Network Access (ZTNA) frameworks",
      "Contributed to authentication and verification APIs",
      "Strengthened secure backend access control mechanisms",
    ],
  },
  {
    id: "education",
    role: "BS Computer Science",
    company: "COMSATS University Islamabad",
    period: "2022 — 2025",
    type: "education",
    responsibilities: [
      "GPA: 3.06",
      "Focused on AI/ML, software engineering, and system design",
      "Built multiple AI/ML projects during coursework",
    ],
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  logo: string;
  topic: string;
  skills: string;
  image?: string;
}

export const certifications: Certification[] = [
  {
    id: "google-digital-marketing",
    title: "Attract and Engage Customers with Digital Marketing",
    issuer: "Google",
    logo: "G",
    topic: "Digital Marketing Strategy",
    skills: "SEO, Content Marketing, Customer Engagement",
    image: "/images/certifications/1.PNG",
  },
  {
    id: "google-ecommerce",
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    logo: "G",
    topic: "Digital Marketing & E-commerce Fundamentals",
    skills: "E-commerce, Digital Marketing, Analytics",
    image: "/images/certifications/2.PNG",
  },
  {
    id: "meta-frontend",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    logo: "M",
    topic: "Front-End Web Development",
    skills: "HTML, CSS, JavaScript, React Basics",
    image: "/images/certifications/3.PNG",
  },
  {
    id: "google-cloud-flutter",
    title: "Material Components for Flutter Basics",
    issuer: "Google Cloud",
    logo: "G",
    topic: "Flutter UI Development",
    skills: "Flutter, Material Design, Dart",
    image: "/images/certifications/4.PNG",
  },
  {
    id: "hackerrank-problem-solving",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    logo: "H",
    topic: "Algorithms & Data Structures",
    skills: "Problem Solving, Algorithms, Data Structures",
    image: "/images/certifications/5.PNG",
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tech Lead",
    role: "Senior Engineer at Snippet.co",
    text: "Usman brings exceptional technical depth to every project. His ability to architect complex AI systems with LangGraph while maintaining clean, production-ready code is remarkable.",
  },
  {
    id: 2,
    name: "Project Manager",
    role: "Health Passport Team",
    text: "Working with Usman on the Healthcare SaaS platform was a great experience. He delivered the BEE AI clinical assistant that genuinely transformed our workflow.",
  },
  {
    id: 3,
    name: "Colleague",
    role: "SNSKIES Ltd",
    text: "Usman's contribution to our security infrastructure was invaluable. He implemented ZTNA frameworks with precision and helped strengthen our entire authentication pipeline.",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "rag-pipelines",
    title: "Building Production-Grade RAG Pipelines",
    excerpt: "Lessons learned from building scalable RAG systems with LangChain and vector databases for real-world AI applications.",
    date: "2025",
    readTime: "5 min read",
    icon: "🧠",
    category: "AI/ML",
  },
  {
    id: "agentic-workflows",
    title: "Agentic Workflows with LangGraph",
    excerpt: "How to design memory-efficient AI agents with tool-based reasoning and human-in-the-loop patterns.",
    date: "2025",
    readTime: "7 min read",
    icon: "🤖",
    category: "AI Agents",
  },
  {
    id: "microservices-ai",
    title: "Microservices Architecture for AI Systems",
    excerpt: "Designing scalable backend architectures for AI-powered platforms with FastAPI, Redis, and WebSockets.",
    date: "2025",
    readTime: "6 min read",
    icon: "🏗️",
    category: "Architecture",
  },
];

export const chatbotSystemPrompt = `You are the AI assistant on Usman Waris's portfolio website - "The Digital Majlis".
Your role is to help recruiters and visitors learn about Usman.
Be professional, friendly, and concise.

Name: ${personalInfo.name}
Title: ${personalInfo.title}
Summary: ${personalInfo.bio}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
Location: ${personalInfo.location}
Education: BS Computer Science from COMSATS University Islamabad (2022-2025, GPA: 3.06)

Experience:
- AI Engineer at Snippet.co (2025 - Present): Designing AI-powered automation systems using LangGraph and LLM orchestration. Building scalable FastAPI services.
- Backend & Security Contributor at SNSKIES Ltd (2025): Implemented ZTNA frameworks, authentication APIs.

Projects:
- SpaceAI - AI-Powered Interior Design Mobile App (Computer Vision, Image Generation)
- Optify - AI Photo Enhancement & Virtual Try-On Platform (Computer Vision, Image Processing)
- Health Passport - AI-Powered Healthcare SaaS for UAE Clinics (FastAPI, MongoDB, Flutter, LangChain)
- Sophia - AI-Powered Twitter/X Automation Platform (FastAPI, LangGraph, Microservices)
- MedCon AI Systems - ECG Intelligence & Doctor Verification (OpenCV, Scikit-Learn, Docker)

Key Skills: Python, FastAPI, LangChain, LangGraph, RAG Pipelines, Agentic Workflows, Docker, MongoDB, PostgreSQL, Redis, AWS, OpenCV, PyTorch, Transformers

Certifications: Attract and Engage Customers with Digital Marketing (Google), Foundations of Digital Marketing and E-commerce (Google), Introduction to Front-End Development (Meta), Material Components for Flutter Basics (Google Cloud), Problem Solving Basic (HackerRank)

Availability: ${personalInfo.availability}

Respond concisely (2-3 sentences max). If asked something not about Usman, politely redirect.`;
