"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  LetterState,
  WORDLE_ANSWERS,
  isValidGuess,
  normalizeGuess,
  scoreGuess,
} from "@/lib/wordle-words";
import {
  dailyWordleAnswer,
  formatHMS,
  msUntilNextUtcDay,
  utcDateKey,
} from "@/lib/daily";
import { useSound } from "./SoundProvider";
import Confetti from "./Confetti";
import {
  BackspaceIcon,
  BarChartIcon,
  CloseIcon,
  RefreshIcon,
} from "./Icon";

const ROWS = 6;
const COLS = 5;

type Mode = "daily" | "random";
type GameState = "playing" | "won" | "lost";

type DailyProgress = {
  date: string;
  guesses: string[];
  state: GameState;
};

const DAILY_KEY = "flc-wordle-daily";
const STATS_KEY = "flc-wordle-stats";

type Stats = {
  played: number;
  wins: number;
  streak: number;
  bestStreak: number;
  distribution: number[]; // length 6: count of wins per guess#
  lastDate?: string;
};

const EMPTY_STATS: Stats = {
  played: 0,
  wins: 0,
  streak: 0,
  bestStreak: 0,
  distribution: [0, 0, 0, 0, 0, 0],
};

function loadStats(): Stats {
  if (typeof window === "undefined") return EMPTY_STATS;
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return EMPTY_STATS;
    const parsed = JSON.parse(raw) as Stats;
    return { ...EMPTY_STATS, ...parsed };
  } catch {
    return EMPTY_STATS;
  }
}

function saveStats(s: Stats) {
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function loadDaily(): DailyProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyProgress;
  } catch {
    return null;
  }
}

function saveDaily(p: DailyProgress) {
  try {
    window.localStorage.setItem(DAILY_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

const AZERTY = [
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  ["ENTER", "w", "x", "c", "v", "b", "n", "BACK"],
];

function letterColor(state: LetterState | undefined) {
  switch (state) {
    case "correct":
      return { bg: "#3f9d4a", fg: "#fff8ee", border: "#2f7d3a" };
    case "present":
      return { bg: "#d97706", fg: "#fff8ee", border: "#a25d05" };
    case "absent":
      return {
        bg: "color-mix(in srgb, var(--ink) 35%, var(--surface))",
        fg: "color-mix(in srgb, var(--ink-faint) 80%, var(--surface))",
        border: "color-mix(in srgb, var(--ink) 25%, transparent)",
      };
    default:
      return null;
  }
}

export default function WordleGame() {
  const reduce = useReducedMotion();
  const { play } = useSound();

  const [mode, setMode] = useState<Mode>("daily");
  const today = useMemo(() => utcDateKey(), []);
  const dailyAnswer = useMemo(() => dailyWordleAnswer(), []);

  const [randomAnswer, setRandomAnswer] = useState<string>(() =>
    WORDLE_ANSWERS[Math.floor(Math.random() * WORDLE_ANSWERS.length)]
  );

  const answer = mode === "daily" ? dailyAnswer : randomAnswer;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [state, setState] = useState<GameState>("playing");
  const [error, setError] = useState<string>("");
  const [shaking, setShaking] = useState(false);
  const [revealedRow, setRevealedRow] = useState(-1);
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [countdown, setCountdown] = useState(msUntilNextUtcDay());
  const lockRef = useRef(false);

  // Initial load: stats + saved daily progress if matching today
  useEffect(() => {
    setStats(loadStats());
    setStatsLoaded(true);
    const saved = loadDaily();
    if (saved && saved.date === today) {
      setGuesses(saved.guesses);
      setState(saved.state);
      setRevealedRow(saved.guesses.length - 1);
    }
  }, [today]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(msUntilNextUtcDay()), 1000);
    return () => clearInterval(t);
  }, []);

  // Persist daily progress
  useEffect(() => {
    if (mode !== "daily" || !statsLoaded) return;
    saveDaily({ date: today, guesses, state });
  }, [guesses, state, mode, today, statsLoaded]);

  const startNewRandom = useCallback(() => {
    setRandomAnswer(
      WORDLE_ANSWERS[Math.floor(Math.random() * WORDLE_ANSWERS.length)]
    );
    setGuesses([]);
    setCurrent("");
    setState("playing");
    setError("");
    setRevealedRow(-1);
    lockRef.current = false;
  }, []);

  const switchMode = useCallback(
    (next: Mode) => {
      setMode(next);
      setError("");
      lockRef.current = false;
      if (next === "daily") {
        const saved = loadDaily();
        if (saved && saved.date === today) {
          setGuesses(saved.guesses);
          setState(saved.state);
          setRevealedRow(saved.guesses.length - 1);
        } else {
          setGuesses([]);
          setState("playing");
          setRevealedRow(-1);
        }
        setCurrent("");
      } else {
        startNewRandom();
      }
    },
    [today, startNewRandom]
  );

  const flashError = useCallback(
    (msg: string) => {
      setError(msg);
      setShaking(true);
      play("tock");
      window.setTimeout(() => setShaking(false), 450);
      window.setTimeout(() => setError(""), 1600);
    },
    [play]
  );

  const submit = useCallback(() => {
    if (state !== "playing" || lockRef.current) return;
    const g = normalizeGuess(current);
    if (g.length !== COLS) {
      flashError("5 lettres requises");
      return;
    }
    if (!isValidGuess(g)) {
      flashError("Mot non reconnu");
      return;
    }

    const newGuesses = [...guesses, g];
    setGuesses(newGuesses);
    setCurrent("");
    setRevealedRow(newGuesses.length - 1);
    lockRef.current = true;
    play("tink");

    // Determine outcome after reveal animation
    const revealDelay = reduce ? 0 : 5 * 0.13 * 1000 + 250;
    window.setTimeout(() => {
      lockRef.current = false;
      if (g === normalizeGuess(answer)) {
        setState("won");
        play("shimmer");
        if (mode === "daily" && statsLoaded) {
          setStats((prev) => {
            const updated: Stats = {
              ...prev,
              played: prev.played + 1,
              wins: prev.wins + 1,
              streak:
                prev.lastDate &&
                isYesterdayUtc(prev.lastDate, today) === false &&
                prev.lastDate !== today
                  ? 1
                  : prev.streak + 1,
              bestStreak: 0,
              distribution: [...prev.distribution],
              lastDate: today,
            };
            updated.streak =
              prev.lastDate === today
                ? prev.streak
                : isYesterdayUtc(prev.lastDate || "", today)
                ? prev.streak + 1
                : 1;
            updated.bestStreak = Math.max(prev.bestStreak, updated.streak);
            updated.distribution[newGuesses.length - 1] += 1;
            saveStats(updated);
            return updated;
          });
          window.setTimeout(() => setShowStats(true), 700);
        } else if (mode === "random") {
          window.setTimeout(() => setShowStats(false), 0);
        }
      } else if (newGuesses.length >= ROWS) {
        setState("lost");
        play("tock");
        if (mode === "daily" && statsLoaded) {
          setStats((prev) => {
            const updated: Stats = {
              ...prev,
              played: prev.played + 1,
              streak: 0,
              lastDate: today,
            };
            saveStats(updated);
            return updated;
          });
          window.setTimeout(() => setShowStats(true), 700);
        }
      }
    }, revealDelay);
  }, [
    answer,
    current,
    flashError,
    guesses,
    mode,
    play,
    reduce,
    state,
    statsLoaded,
    today,
  ]);

  // Keyboard handling
  const handleKey = useCallback(
    (key: string) => {
      if (state !== "playing" || lockRef.current) return;
      if (key === "ENTER") {
        submit();
        return;
      }
      if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1));
        play("tock");
        return;
      }
      if (current.length >= COLS) return;
      const n = normalizeGuess(key);
      if (n.length === 1) {
        setCurrent((c) => (c.length < COLS ? c + n : c));
        play("tock");
      }
    },
    [current.length, play, state, submit]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (showStats) return;
      if (e.key === "Enter") {
        e.preventDefault();
        handleKey("ENTER");
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        handleKey("BACK");
        return;
      }
      if (e.key.length === 1) {
        const n = normalizeGuess(e.key);
        if (n.length === 1) handleKey(n);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey, showStats]);

  // Per-letter keyboard heatmap
  const keyHeat = useMemo(() => {
    const map: Record<string, LetterState> = {};
    const rank: Record<LetterState, number> = {
      absent: 1,
      present: 2,
      correct: 3,
    };
    for (const g of guesses) {
      const s = scoreGuess(answer, g);
      const n = normalizeGuess(g);
      for (let i = 0; i < n.length; i++) {
        const prev = map[n[i]];
        if (!prev || rank[s[i]] > rank[prev]) map[n[i]] = s[i];
      }
    }
    return map;
  }, [guesses, answer]);

  return (
    <div className="w-full max-w-md mx-auto" style={{ perspective: 1400 }}>
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex tactile-inset p-1 rounded-full">
          <ModeChip
            active={mode === "daily"}
            onClick={() => switchMode("daily")}
          >
            Mode du jour
          </ModeChip>
          <ModeChip
            active={mode === "random"}
            onClick={() => switchMode("random")}
          >
            Aléatoire
          </ModeChip>
        </div>
        {mode === "random" ? (
          <motion.button
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { y: 1 }}
            onClick={startNewRandom}
            className="tactile-chip text-xs px-3 py-1.5 ink-strong inline-flex items-center gap-1.5"
            aria-label="New random word"
          >
            <RefreshIcon size={13} />
            Nouveau
          </motion.button>
        ) : (
          <motion.button
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { y: 1 }}
            onClick={() => setShowStats(true)}
            className="tactile-chip text-xs px-3 py-1.5 ink-strong inline-flex items-center gap-1.5"
            aria-label="Open statistics"
          >
            <BarChartIcon size={13} />
            Stats
          </motion.button>
        )}
      </div>

      <motion.div
        animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto"
        style={{ width: COLS * 60 + (COLS - 1) * 8, maxWidth: "100%" }}
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: ROWS }).map((_, r) => {
            const isCurrent = r === guesses.length && state === "playing";
            const guess = guesses[r];
            const states = guess ? scoreGuess(answer, guess) : null;
            const reveal = r <= revealedRow;
            return Array.from({ length: COLS }).map((_, c) => {
              const ch = guess ? guess[c] : isCurrent ? current[c] : "";
              const st = states ? states[c] : undefined;
              return (
                <Tile
                  key={`${r}-${c}`}
                  letter={ch || ""}
                  state={reveal ? st : undefined}
                  flipDelay={reveal ? c * 0.13 : 0}
                  shouldFlip={reveal && !!states}
                  hasInput={!!ch && !states}
                />
              );
            });
          })}
        </div>

        <AnimatePresence>
          {state === "won" && <Confetti />}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-3 text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {state !== "playing" && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="tactile-card mt-5 p-4 text-center"
        >
          <p className="ink-strong font-semibold">
            {state === "won"
              ? `🎉 Bravo ! En ${guesses.length} essai${guesses.length === 1 ? "" : "s"}.`
              : "Pas cette fois."}
          </p>
          <p className="ink-soft text-sm mt-1">
            Le mot était{" "}
            <span
              className="font-mono font-bold ink-strong"
              style={{ letterSpacing: 1 }}
            >
              {answer.toUpperCase()}
            </span>
          </p>
          {mode === "daily" ? (
            <p className="ink-faint text-xs mt-3 tabular-nums">
              Prochain mot dans {formatHMS(countdown)}
            </p>
          ) : (
            <motion.button
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { y: 1 }}
              onClick={startNewRandom}
              className="tactile-button mt-3 px-5 py-2 text-sm"
            >
              Rejouer â†’
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Keyboard */}
      <div className="mt-6 space-y-1.5">
        {AZERTY.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map((key) => {
              const isAction = key === "ENTER" || key === "BACK";
              const heat = isAction ? undefined : keyHeat[key];
              const colors = heat ? letterColor(heat) : null;
              return (
                <motion.button
                  key={key}
                  onClick={() => handleKey(key)}
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { y: 1 }}
                  className="tactile-chip text-sm font-semibold"
                  style={{
                    height: 44,
                    minWidth: isAction ? 60 : 30,
                    flex: isAction ? "0 0 auto" : "1 1 0",
                    padding: isAction ? "0 10px" : "0",
                    color: colors?.fg || "var(--ink)",
                    background: colors?.bg || undefined,
                    borderColor: colors?.border,
                    fontSize: isAction ? 11 : 14,
                  }}
                >
                  {key === "BACK" ? (
                    <BackspaceIcon size={18} />
                  ) : key === "ENTER" ? (
                    "ENTRÉE"
                  ) : (
                    key.toUpperCase()
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="ink-faint text-xs text-center mt-6 italic">
        Devine le mot français de 5 lettres en 6 essais. Les accents ne comptent pas.
      </p>

      <AnimatePresence>
        {showStats && (
          <StatsOverlay
            stats={stats}
            state={state}
            guesses={guesses}
            answer={answer}
            mode={mode}
            countdown={countdown}
            onClose={() => setShowStats(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function isYesterdayUtc(prev: string, today: string) {
  if (!prev) return false;
  try {
    const [py, pm, pd] = prev.split("-").map(Number);
    const [ty, tm, td] = today.split("-").map(Number);
    const a = Date.UTC(py, pm - 1, pd);
    const b = Date.UTC(ty, tm - 1, td);
    return b - a === 86_400_000;
  } catch {
    return false;
  }
}

function ModeChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
      style={
        active
          ? {
              background: "var(--accent)",
              color: "var(--accent-ink)",
              boxShadow: "var(--shadow-button-pressed)",
            }
          : { color: "var(--ink-soft)" }
      }
    >
      {children}
    </button>
  );
}

function Tile({
  letter,
  state,
  flipDelay,
  shouldFlip,
  hasInput,
}: {
  letter: string;
  state?: LetterState;
  flipDelay: number;
  shouldFlip: boolean;
  hasInput: boolean;
}) {
  const reduce = useReducedMotion();
  const colors = state ? letterColor(state) : null;
  return (
    <div
      className="relative"
      style={{
        aspectRatio: "1",
        perspective: 800,
      }}
    >
      <motion.div
        animate={
          reduce
            ? { backgroundColor: colors?.bg || "var(--surface)" }
            : shouldFlip
            ? { rotateX: [0, 90, 0] }
            : { scale: hasInput ? [1, 1.06, 1] : 1 }
        }
        transition={
          shouldFlip
            ? { duration: 0.55, delay: flipDelay, ease: [0.2, 0.7, 0.3, 1] }
            : hasInput
            ? { duration: 0.18, ease: "easeOut" }
            : { duration: 0.16, type: "spring", stiffness: 380, damping: 20 }
        }
        className="absolute inset-0 flex items-center justify-center font-bold uppercase rounded-md"
        style={{
          fontSize: 26,
          background: colors?.bg || "var(--surface)",
          color: colors?.fg || "var(--ink)",
          border: `2px solid ${
            colors?.border ||
            (letter ? "var(--border-strong)" : "var(--border)")
          }`,
          boxShadow: state
            ? "0 1px 0 rgba(255,255,255,0.25) inset, 0 2px 4px rgba(0,0,0,0.18)"
            : letter
            ? "var(--shadow-inset)"
            : "var(--shadow-inset)",
          transformStyle: "preserve-3d",
        }}
      >
        {letter.toUpperCase()}
      </motion.div>
    </div>
  );
}

function StatsOverlay({
  stats,
  state,
  guesses,
  answer,
  mode,
  countdown,
  onClose,
}: {
  stats: Stats;
  state: GameState;
  guesses: string[];
  answer: string;
  mode: Mode;
  countdown: number;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(1, ...stats.distribution);
  const winRate = stats.played
    ? Math.round((stats.wins / stats.played) * 100)
    : 0;
  const lastWinRow = state === "won" ? guesses.length - 1 : -1;

  function share() {
    const head = `French Wordle — ${mode === "daily" ? "Mode du jour" : "Aléatoire"} ${
      state === "won" ? `${guesses.length}/6` : "X/6"
    }`;
    const lines = guesses.map((g) => {
      const s = scoreGuess(answer, g);
      return s
        .map((x) => (x === "correct" ? "🟩" : x === "present" ? "🟨" : "⬛"))
        .join("");
    });
    const text = `${head}\n${lines.join("\n")}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "color-mix(in srgb, var(--ink) 55%, transparent)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="tactile-card p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs uppercase tracking-wider ink-faint">
            Statistiques
          </h3>
          <button
            onClick={onClose}
            className="tactile-chip ink-soft inline-flex items-center justify-center"
            style={{ width: 28, height: 28, padding: 0 }}
            aria-label="Close stats"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <Stat label="Joués" value={stats.played} />
          <Stat label="Réussite" value={`${winRate}%`} />
          <Stat label="Série" value={stats.streak} />
          <Stat label="Meilleure" value={stats.bestStreak} />
        </div>

        <h4 className="text-xs uppercase tracking-wider ink-faint mt-5 mb-2">
          Distribution
        </h4>
        <div className="space-y-1.5">
          {stats.distribution.map((n, i) => {
            const pct = (n / max) * 100;
            const highlight = i === lastWinRow && state === "won";
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs tabular-nums ink-faint w-3">
                  {i + 1}
                </span>
                <div
                  className="flex-1 rounded"
                  style={{ background: "var(--surface-2)", height: 18 }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(pct, n > 0 ? 8 : 0)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: highlight ? "#3f9d4a" : "var(--accent)",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 6,
                      color: "var(--accent-ink)",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {n > 0 ? n : ""}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {mode === "daily" && state !== "playing" && (
          <>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs ink-faint">Prochain mot</p>
                <p className="font-mono tabular-nums ink-strong text-lg">
                  {formatHMS(countdown)}
                </p>
              </div>
              <button
                onClick={share}
                className="tactile-button px-4 py-2 text-sm"
              >
                Partager
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="tactile-inset p-2">
      <p className="text-lg font-semibold ink-strong tabular-nums">{value}</p>
      <p className="text-[10px] uppercase tracking-wider ink-faint">{label}</p>
    </div>
  );
}
