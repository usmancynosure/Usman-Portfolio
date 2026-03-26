import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usman Waris | AI Engineer — LLM Systems & Agentic Architect",
  description:
    "Portfolio of Usman Waris, AI Engineer specializing in LLM systems, agentic workflows, and scalable backend architectures. Available for opportunities in the Gulf region.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LLM",
    "LangGraph",
    "FastAPI",
    "Gulf",
    "Saudi Arabia",
    "UAE",
    "Qatar",
    "Portfolio",
  ],
  authors: [{ name: "Usman Waris" }],
  openGraph: {
    title: "Usman Waris | AI Engineer",
    description: "AI Engineer specializing in LLM systems, agentic workflows, and scalable backend architectures.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Waris | AI Engineer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0a1628" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Usman Waris",
              jobTitle: "AI Engineer",
              email: "imosmanwaris.tech@gmail.com",
              sameAs: [
                "https://github.com/usmancynosure",
                "https://www.linkedin.com/in/usman-waris-0a9b8c7d/",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-navy-950 text-text-primary antialiased">{children}</body>
    </html>
  );
}
