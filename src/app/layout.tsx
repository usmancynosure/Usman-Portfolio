import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usman Waris | Product & AI Engineer — End-to-End Production Systems",
  description:
    "Portfolio of Usman Waris, Product & AI Engineer who ships production-ready apps end-to-end. Specialized in LLM systems, agentic workflows, and scalable backends with LangGraph, FastAPI, Claude Code, and Cursor.",
  keywords: [
    "Product Engineer",
    "AI Engineer",
    "Machine Learning",
    "LLM",
    "LangGraph",
    "FastAPI",
    "Claude Code",
    "Cursor",
    "Agentic Development",
    "Gulf",
    "Saudi Arabia",
    "UAE",
    "Qatar",
    "Portfolio",
  ],
  authors: [{ name: "Usman Waris" }],
  openGraph: {
    title: "Usman Waris | Product & AI Engineer",
    description: "Product & AI Engineer who ships production-ready apps end-to-end with agentic dev tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Waris | Product & AI Engineer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0A0E1A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Usman Waris",
              jobTitle: "Product & AI Engineer",
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
