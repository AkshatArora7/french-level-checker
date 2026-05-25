"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useSkin } from "./SkinProvider";
import { useSound } from "./SoundProvider";
import { SKINS } from "@/lib/skins";

export default function SkinToggle() {
  const { skin, cycle } = useSkin();
  const { enabled, setEnabled, play } = useSound();
  const reduce = useReducedMotion();
  const current = SKINS.find((s) => s.id === skin)!;

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
      <motion.button
        onClick={() => {
          play("tock");
          cycle();
        }}
        whileHover={reduce ? undefined : { scale: 1.06, rotate: -3 }}
        whileTap={reduce ? undefined : { scale: 0.92, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="tactile-chip px-3 py-2 flex items-center gap-2 text-xs font-medium"
        aria-label={`Skin: ${current.label}. Click to cycle.`}
        title={`${current.label} — ${current.hint}`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={reduce ? undefined : { rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={reduce ? undefined : { rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{
              background: current.swatch,
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.5) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 1px 2px rgba(0,0,0,0.25)",
            }}
          />
        </AnimatePresence>
        <span className="ink-strong">{current.label}</span>
      </motion.button>

      <motion.button
        onClick={() => {
          setEnabled(!enabled);
          if (!enabled) play("shimmer");
        }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="tactile-chip px-3 py-2 text-xs font-medium"
        aria-label={enabled ? "Sound on" : "Sound off"}
        title={enabled ? "Sound on — click to mute" : "Sound off — click to enable"}
      >
        <span aria-hidden className="inline-block w-3.5 text-center">
          {enabled ? "♪" : "·"}
        </span>
      </motion.button>
    </div>
  );
}
