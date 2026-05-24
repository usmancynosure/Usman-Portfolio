"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Tag = "div" | "section" | "h1" | "h2" | "p" | "span" | "li" | "nav";

interface FadeInProps {
  as?: Tag;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * Scroll-triggered fade/slide-in wrapper.
 * Animates once when it enters the viewport.
 */
export function FadeIn({
  as = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  children,
}: FadeInProps) {
  const Motion = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Motion
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </Motion>
  );
}
