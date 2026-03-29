"use client";

export function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-700 py-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <span className="font-heading text-2xl sm:text-3xl font-extrabold text-gold-gradient">UW</span>
        <p className="text-xs sm:text-sm text-text-muted mt-2 tracking-wide">Crafting AI Solutions for Tomorrow</p>
        <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-4 sm:my-5" />
        <p className="text-sm text-text-muted">
          &copy; 2025 Usman Waris. Designed with <span className="text-gold-500">&#9830;</span> — The Digital Majlis
        </p>
        <p className="font-arabic text-lg text-gold-500/30 mt-4">بسم الله الرحمن الرحيم</p>
      </div>
    </footer>
  );
}
