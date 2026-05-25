"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DailyWord } from "@/lib/daily-words";
import { useVocab } from "./VocabProvider";
import { useSound } from "./SoundProvider";

const LEVEL_INK: Record<string, string> = {
  A1: "#3f9d4a",
  A2: "#1f8a6b",
  B1: "#2b6cb0",
  B2: "#4338ca",
  C1: "#7c3aed",
  C2: "#c4302b",
};

export default function DailyWordCard({
  word,
  dateLabel,
  compact = false,
}: {
  word: DailyWord;
  dateLabel: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const vocab = useVocab();
  const [flipped, setFlipped] = useState(false);
  const saved = useMemo(() => vocab.has(word.word), [vocab, word.word]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
        play("tock");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  const accent = LEVEL_INK[word.level] || "#6b7280";

  function flip() {
    setFlipped((f) => !f);
    play("tock");
  }

  function save() {
    if (saved) return;
    const ok = vocab.add({
      word: word.word,
      translation: word.translation,
      level: word.level,
      note: word.example,
      source: word.example,
    });
    if (ok) play("tink");
  }

  return (
    <div
      className="w-full"
      style={{ perspective: 1600, perspectiveOrigin: "50% 30%" }}
    >
      <motion.div
        onClick={flip}
        role="button"
        tabIndex={0}
        aria-label={`Daily word card: ${word.word}. Press to ${
          flipped ? "see the word" : "reveal meaning and example"
        }.`}
        className="relative w-full cursor-pointer select-none"
        style={{
          transformStyle: "preserve-3d",
          minHeight: compact ? 220 : 280,
        }}
        animate={reduce ? undefined : { rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        whileHover={reduce ? undefined : { y: -3 }}
      >
        {/* FRONT */}
        <Face hidden={false}>
          <div className="tactile-card p-6 flex flex-col items-center justify-center text-center h-full">
            <p className="text-xs uppercase tracking-widest ink-faint">
              Mot du jour Â· {dateLabel}
            </p>
            <p
              className="font-serif italic text-4xl sm:text-5xl mt-3 ink-strong"
              style={{ fontFamily: "var(--font-geist-mono), ui-serif, Georgia" }}
            >
              {word.word}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: accent,
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                }}
              />
              <span
                className="text-xs tabular-nums font-semibold"
                style={{ color: accent }}
              >
                {word.level}
              </span>
              <span className="ink-faint text-xs">Â· {word.pos}</span>
            </div>
            <p className="ink-faint text-xs mt-6">
              {compact ? "Tap to reveal â†’" : "Tap card Â· or press space"}
            </p>
          </div>
        </Face>

        {/* BACK */}
        <Face hidden={true}>
          <div className="tactile-card p-6 h-full flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
              <p
                className="font-serif italic text-2xl ink-strong"
                style={{ fontFamily: "var(--font-geist-mono), ui-serif, Georgia" }}
              >
                {word.word}
              </p>
              <span
                className="text-xs tabular-nums font-semibold"
                style={{ color: accent }}
              >
                {word.level}
              </span>
            </div>
            <p className="ink-soft mt-1 text-sm">{word.translation}</p>
            <div className="tactile-inset p-3 mt-4">
              <p className="ink-strong italic leading-relaxed">
                Â« {word.example} Â»
              </p>
              <p className="ink-faint text-sm mt-2">{word.exampleTranslation}</p>
            </div>
            <div className="flex-1" />
            <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={save}
                disabled={saved}
                className="tactile-chip text-xs px-3 py-1.5 ink-strong"
                style={saved ? { opacity: 0.55, cursor: "default" } : undefined}
              >
                {saved ? "✓ Dans le carnet" : "+ Ajouter au carnet"}
              </button>
              <button
                onClick={flip}
                className="tactile-chip text-xs px-3 py-1.5 ink-soft"
              >
                â†º Retourner
              </button>
            </div>
          </div>
        </Face>
      </motion.div>
    </div>
  );
}

function Face({
  hidden,
  children,
}: {
  hidden: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: hidden ? "absolute" : "relative",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: hidden ? "rotateY(180deg)" : undefined,
        height: hidden ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  );
}
