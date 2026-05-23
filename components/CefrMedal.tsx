"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const LEVEL_GRADIENTS: Record<string, [string, string]> = {
  A1: ["#a8e6a3", "#3f9d4a"],
  A2: ["#7fd8b8", "#1f8a6b"],
  B1: ["#8ec6ff", "#2b6cb0"],
  B2: ["#a99dff", "#4338ca"],
  C1: ["#d7a8ff", "#7c3aed"],
  C2: ["#ffb3c1", "#c4302b"],
};

export default function CefrMedal({
  level,
  confidence,
}: {
  level: string;
  confidence: number;
}) {
  const reduce = useReducedMotion();
  const [light, dark] = LEVEL_GRADIENTS[level] || ["#cbd5e1", "#475569"];

  // Mouse-tilt parallax (disabled for reduced motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 180,
    damping: 14,
  });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 180,
    damping: 14,
  });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      const t = (performance.now() - t0) / 1000;
      mx.set(Math.sin(t * 0.6) * 0.18);
      my.set(Math.cos(t * 0.5) * 0.12);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my, reduce]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <div
      onMouseMove={onMove}
      style={{ perspective: 800 }}
      className="flex flex-col items-center py-6"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.4, rotateY: 180, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 14,
          mass: 0.9,
          delay: 0.05,
        }}
        style={{
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformStyle: "preserve-3d",
          background: `radial-gradient(circle at 30% 25%, ${light} 0%, ${dark} 80%)`,
          color: "#fff8ee",
          boxShadow: "var(--shadow-medal)",
        }}
        className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center select-none"
      >
        {/* Top inner highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 35% 18%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)",
          }}
        />
        {/* Bottom rim shadow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 95%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%)",
          }}
        />
        <span
          className="relative text-6xl sm:text-7xl font-extrabold tracking-tight"
          style={{
            textShadow:
              "0 2px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.25)",
          }}
        >
          {level}
        </span>
      </motion.div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 18 }}
        className="mt-5 text-sm ink-soft"
      >
        Niveau · {confidence}% de confiance
      </motion.div>
    </div>
  );
}
