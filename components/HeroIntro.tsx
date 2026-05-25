"use client";

import { motion, useReducedMotion } from "motion/react";

export default function HeroIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div style={{ perspective: 1200 }} className="mb-10">
      <motion.h1
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16, rotateX: -35 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 16, mass: 0.8 }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight ink-strong"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, type: "spring", stiffness: 160, damping: 18 }}
        className="ink-soft mt-3 text-base sm:text-lg leading-relaxed max-w-xl"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
