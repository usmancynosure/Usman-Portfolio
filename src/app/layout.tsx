import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usman Waris · AI Product Engineer",
  description:
    "Usman Waris — AI Product Engineer shipping production-grade AI end to end: agentic systems (LangGraph), LLM backends (FastAPI, RAG), and native iOS/Flutter apps live on the App Store.",
  authors: [{ name: "Usman Waris" }],
  openGraph: {
    title: "Usman Waris · AI Product Engineer",
    description:
      "Ships production-grade AI end to end — LLM backends to native apps live on the App Store. Open to roles across KSA & UAE.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Waris · AI Product Engineer",
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
