"use client";

import { useRef, useState, useCallback } from "react";

interface MagnetProps {
  children: React.ReactNode;
  /** Distance (px) outside the element edge at which the magnet activates. */
  padding?: number;
  /** Higher = weaker pull (offset is divided by this). */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Mouse-following magnetic hover effect. Tracks the cursor relative to the
 * element center and translates the element toward it while the cursor is
 * within `padding` of the element's edges.
 */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const within =
        Math.abs(distX) < rect.width / 2 + padding &&
        Math.abs(distY) < rect.height / 2 + padding;

      if (within) {
        setActive(true);
        setPos({ x: distX / strength, y: distY / strength });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    },
    [padding, strength]
  );

  const handleLeave = useCallback(() => {
    setActive(false);
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
