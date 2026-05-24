"use client";

interface ContactButtonProps {
  href?: string;
  className?: string;
}

/**
 * Signature CTA — electric-lime fill on charcoal text.
 * The one bright accent, used sparingly.
 */
export function ContactButton({
  href = "#contact",
  className = "",
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#CCFF00] text-[#0A0A0B] font-mono font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-[18px] text-xs sm:text-sm transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] ${className}`}
      style={{ boxShadow: "0 0 0 rgba(204, 255, 0, 0)" }}
    >
      {/* lime glow that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 36px 4px rgba(204, 255, 0, 0.55)" }}
      />
      <span className="relative">Contact Me</span>
      <svg
        className="relative transition-transform duration-300 ease-out group-hover:translate-x-1"
        width="16"
        height="16"
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
    </a>
  );
}
