"use client";

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-700 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="font-heading text-3xl font-extrabold text-gold-gradient">UW</span>
        <p className="text-sm text-text-muted mt-2">Crafting AI Solutions for Tomorrow</p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-4" />
        <p className="text-sm text-text-muted">
          &copy; 2025 Usman Waris. Designed with <span className="text-gold-500">&#9830;</span> — The Digital Majlis
        </p>
        <p className="font-arabic text-lg text-gold-500/30 mt-3">بسم الله الرحمن الرحيم</p>
      </div>
    </footer>
  );
}
