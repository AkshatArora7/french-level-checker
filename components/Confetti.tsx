"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const COLORS = ["#c75d3a", "#e08a5f", "#3f9d4a", "#2b6cb0", "#c9a961", "#7c3aed"];

type Piece = {
  id: number;
  x: number;
  delay: number;
  rot: number;
  dur: number;
  color: string;
  size: number;
  drift: number;
};

export default function Confetti({ count = 36 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const generated: Piece[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.15,
      rot: Math.random() * 720 - 360,
      dur: 1.3 + Math.random() * 0.9,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.round(Math.random() * 8),
      drift: Math.random() * 14 - 7,
    }));
    setPieces(generated);
  }, [count]);

  if (reduce || pieces.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: 800 }}
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: `${p.x}%`, y: "-10%", opacity: 0, rotate: 0 }}
          animate={{
            y: "110%",
            opacity: [0, 1, 1, 0],
            rotate: p.rot,
            x: [`${p.x}%`, `${p.x + p.drift}%`],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: [0.2, 0.7, 0.3, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: 2,
            boxShadow: "0 1px 0 rgba(255,255,255,0.35) inset",
          }}
        />
      ))}
    </div>
  );
}

