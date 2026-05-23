"use client";

import { motion } from "framer-motion";

export default function HeroIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ perspective: 1000 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20, rotateX: -40 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
        className="text-4xl font-bold mb-2"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 mb-8"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
