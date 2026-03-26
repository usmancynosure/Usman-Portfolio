"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleInteractiveEnter = () => setIsHovering(true);
    const handleInteractiveLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMove);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter);
        el.removeEventListener("mouseleave", handleInteractiveLeave);
        el.addEventListener("mouseenter", handleInteractiveEnter);
        el.addEventListener("mouseleave", handleInteractiveLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setup
    document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", handleInteractiveEnter);
      el.addEventListener("mouseleave", handleInteractiveLeave);
    });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - (isHovering ? 12 : 4)}px, ${pos.current.y - (isHovering ? 12 : 4)}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, [isHovering]);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-screen transition-[width,height,background,border] duration-200 ${
        isHovering
          ? "w-6 h-6 bg-gold-500/20 border-[1.5px] border-gold-500"
          : "w-2 h-2 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
      }`}
      style={{ cursor: "none" }}
    />
  );
}
