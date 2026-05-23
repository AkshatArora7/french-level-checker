"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { SAMPLES } from "@/lib/samples";
import { useSound } from "./SoundProvider";
import CefrMedal from "./CefrMedal";

type DifficultWord = {
  word: string;
  translation: string;
  level: string;
  note: string;
};

type AnalysisResult = {
  level: string;
  confidence: number;
  summary: string;
  difficult_words: DifficultWord[];
  grammar_features: Array<{ feature: string; example: string; level: string }>;
  simpler_version: string | null;
};

const LEVEL_INK: Record<string, string> = {
  A1: "#3f9d4a",
  A2: "#1f8a6b",
  B1: "#2b6cb0",
  B2: "#4338ca",
  C1: "#7c3aed",
  C2: "#c4302b",
};

function levelDot(level: string) {
  return LEVEL_INK[level] || "#6b7280";
}

function HighlightedText({
  text,
  difficultWords,
}: {
  text: string;
  difficultWords: DifficultWord[];
}) {
  const reduce = useReducedMotion();
  const lookup = useMemo(() => {
    const m = new Map<string, DifficultWord>();
    for (const w of difficultWords) {
      const key = w.word.toLowerCase().replace(/[.,;:!?"'()]/g, "");
      if (key) m.set(key, w);
    }
    return m;
  }, [difficultWords]);

  const tokens = text.split(/(\s+)/);
  return (
    <p className="leading-relaxed">
      {tokens.map((tok, i) => {
        const clean = tok.toLowerCase().replace(/[.,;:!?"'()]/g, "");
        const hit = lookup.get(clean);
        if (!hit) return <span key={i}>{tok}</span>;
        return (
          <motion.span
            key={i}
            title={`${hit.translation}${hit.note ? " — " + hit.note : ""} (${hit.level})`}
            whileHover={
              reduce
                ? undefined
                : { y: -2, scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 14 } }
            }
            style={{
              display: "inline-block",
              color: levelDot(hit.level),
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
              cursor: "help",
              borderRadius: "4px",
              padding: "0 2px",
            }}
          >
            {tok}
          </motion.span>
        );
      })}
    </p>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export default function TextAnalyzer() {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function analyze() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'analyse");
      setResult(data);
      play("tink");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Quelque chose s'est mal passé");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        analyze();
      }
    }
    const el = textareaRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, loading]);

  function copyResult() {
    if (!result) return;
    const lines = [
      `Niveau : ${result.level} (${result.confidence}%)`,
      result.summary,
      "",
      "Mots difficiles :",
      ...result.difficult_words.map(
        (w) => `  ${w.word} — ${w.translation} [${w.level}]`
      ),
      "",
      "Grammaire :",
      ...result.grammar_features.map((g) => `  ${g.feature} — "${g.example}"`),
    ];
    if (result.simpler_version) {
      lines.push("", "Version simplifiée :", result.simpler_version);
    }
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    play("tock");
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="w-full max-w-3xl mx-auto" style={{ perspective: 1400 }}>
      {/* Sample chips */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="text-xs ink-faint uppercase tracking-wider mr-1">
          Essayer un exemple
        </span>
        {SAMPLES.map((s, i) => (
          <motion.button
            key={s.label}
            onClick={() => {
              setText(s.text);
              play("tock");
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.15 + i * 0.07,
              type: "spring",
              stiffness: 240,
              damping: 18,
            }}
            whileHover={
              reduce ? undefined : { y: -3, rotateX: 6, transition: { type: "spring", stiffness: 360, damping: 16 } }
            }
            whileTap={reduce ? undefined : { y: 1, rotateX: -2 }}
            style={{ transformStyle: "preserve-3d" }}
            className="tactile-chip text-xs px-3 py-1.5 flex items-center gap-2"
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: levelDot(s.level),
                boxShadow: "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
            <span className="ink-strong">{s.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Textarea card */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.1 }}
        className="tactile-card p-1.5"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Collez votre texte français ici…  (Cmd/Ctrl + Entrée pour analyser)"
          maxLength={3000}
          className="w-full h-48 p-4 bg-transparent resize-none font-mono text-sm ink-strong focus:outline-none placeholder:ink-faint"
        />
        <div className="flex justify-between items-center px-3 pb-2 pt-1">
          <span className="text-xs ink-faint tabular-nums">
            {text.length} / 3000
          </span>
          <motion.button
            onClick={analyze}
            disabled={loading || !text.trim()}
            whileHover={
              reduce || loading || !text.trim()
                ? undefined
                : { y: -2, transition: { type: "spring", stiffness: 400, damping: 16 } }
            }
            whileTap={
              reduce || loading || !text.trim() ? undefined : { y: 2 }
            }
            className="tactile-button px-5 py-2 text-sm"
          >
            {loading ? "Lecture en cours…" : "Révéler le niveau →"}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="mt-4 p-3 rounded text-sm"
            style={{
              background: "color-mix(in srgb, var(--accent) 12%, var(--surface))",
              color: "var(--accent)",
              boxShadow: "var(--shadow-inset)",
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Loading state */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
            className="tactile-card mt-8 p-8 flex flex-col items-center"
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { rotate: 360, scale: [1, 1.08, 1] }
              }
              transition={{
                rotate: { duration: 2.8, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.6, repeat: Infinity },
              }}
              className="w-16 h-16 rounded-full mb-4"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)",
                boxShadow: "var(--shadow-medal)",
              }}
            />
            <p className="ink-soft text-sm italic">Lecture en cours…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
            className="mt-10"
          >
            {/* Hero medal */}
            <CefrMedal level={result.level} confidence={result.confidence} />

            {/* Summary card */}
            <motion.div variants={item} className="tactile-card mt-2 p-5">
              <p className="ink-strong leading-relaxed">{result.summary}</p>
              <div className="flex justify-end mt-3">
                <motion.button
                  onClick={copyResult}
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { y: 1 }}
                  className="tactile-chip text-xs px-3 py-1.5 ink-strong"
                >
                  {copied ? "Copié !" : "Copier le résultat"}
                </motion.button>
              </div>
            </motion.div>

            {result.difficult_words.length > 0 && (
              <motion.section variants={item} className="tactile-card mt-5 p-5">
                <h3 className="text-xs uppercase tracking-wider ink-faint mb-3">
                  Votre texte
                </h3>
                <div className="tactile-inset p-4 text-sm">
                  <HighlightedText
                    text={text}
                    difficultWords={result.difficult_words}
                  />
                </div>
              </motion.section>
            )}

            {result.difficult_words.length > 0 && (
              <motion.section variants={item} className="tactile-card mt-5 p-5">
                <h3 className="text-xs uppercase tracking-wider ink-faint mb-4">
                  Mots difficiles
                </h3>
                <motion.ul
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05 } },
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid sm:grid-cols-2 gap-2"
                >
                  {result.difficult_words.map((w, i) => (
                    <motion.li
                      key={i}
                      variants={item}
                      whileHover={reduce ? undefined : { y: -2 }}
                      className="tactile-inset p-3 text-sm flex items-baseline gap-2"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: levelDot(w.level),
                          boxShadow:
                            "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                          transform: "translateY(-1px)",
                        }}
                      />
                      <div className="min-w-0">
                        <div>
                          <span className="font-mono font-semibold ink-strong">
                            {w.word}
                          </span>
                          <span className="ink-soft"> — {w.translation}</span>
                          <span
                            className="ml-1 text-xs ink-faint tabular-nums"
                            style={{ color: levelDot(w.level) }}
                          >
                            {w.level}
                          </span>
                        </div>
                        {w.note && (
                          <div className="ink-faint italic text-xs mt-0.5">
                            {w.note}
                          </div>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>
            )}

            {result.grammar_features.length > 0 && (
              <motion.section variants={item} className="tactile-card mt-5 p-5">
                <h3 className="text-xs uppercase tracking-wider ink-faint mb-4">
                  Points de grammaire
                </h3>
                <ul className="space-y-2 text-sm">
                  {result.grammar_features.map((g, i) => (
                    <motion.li
                      key={i}
                      variants={item}
                      className="flex items-baseline gap-3"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{
                          background: levelDot(g.level),
                          boxShadow:
                            "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      />
                      <div>
                        <span className="font-semibold ink-strong">
                          {g.feature}
                        </span>
                        <span className="ink-soft"> — </span>
                        <span className="ink-soft italic">
                          &laquo;&nbsp;{g.example}&nbsp;&raquo;
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {result.simpler_version && (
              <motion.section variants={item} className="tactile-card mt-5 p-5">
                <h3 className="text-xs uppercase tracking-wider ink-faint mb-3">
                  Version simplifiée
                </h3>
                <p
                  className="tactile-inset p-4 italic ink-strong leading-relaxed"
                >
                  {result.simpler_version}
                </p>
              </motion.section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
