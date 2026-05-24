import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usman · Builds with AI",
  description:
    "Usman · Builds with AI shipping production-ready apps end-to-end. LLM systems, agentic workflows, RAG pipelines, and scalable FastAPI backends with LangGraph.",
  authors: [{ name: "Usman Waris" }],
  openGraph: {
    title: "Usman · Builds with AI",
    description:
      "Product & AI Engineer who ships production-ready AI systems end-to-end.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman · Builds with AI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body>{children}</body>
    </html>
  );
}
