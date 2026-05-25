"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useVocab } from "@/components/VocabProvider";
import { useSound } from "@/components/SoundProvider";
import {
  VocabItem,
  Grade,
  dueItems,
  formatDue,
  toCSV,
} from "@/lib/vocab";

const LEVEL_INK: Record<string, string> = {
  A1: "#3f9d4a",
  A2: "#1f8a6b",
  B1: "#2b6cb0",
  B2: "#4338ca",
  C1: "#7c3aed",
  C2: "#c4302b",
};

function dot(level: string) {
  return LEVEL_INK[level] || "#6b7280";
}

type SortKey = "added" | "due" | "level" | "alpha";

function sortItems(items: VocabItem[], key: SortKey) {
  const copy = [...items];
  switch (key) {
    case "added":
      return copy.sort((a, b) => b.addedAt - a.addedAt);
    case "due":
      return copy.sort((a, b) => a.due - b.due);
    case "level":
      return copy.sort((a, b) => a.level.localeCompare(b.level));
    case "alpha":
      return copy.sort((a, b) => a.word.localeCompare(b.word, "fr"));
  }
}

function downloadBlob(name: string, type: string, content: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function VocabPageClient() {
  const { ready, items, dueCount, remove, gradeItem, clearAll, replaceAll } =
    useVocab();
  const { play } = useSound();
  const reduce = useReducedMotion();
  const [sort, setSort] = useState<SortKey>("added");
  const [filter, setFilter] = useState("");
  const [reviewing, setReviewing] = useState(false);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const base = q
      ? items.filter(
          (i) =>
            i.word.toLowerCase().includes(q) ||
            i.translation.toLowerCase().includes(q) ||
            i.level.toLowerCase() === q
        )
      : items;
    return sortItems(base, sort);
  }, [items, sort, filter]);

  function exportJSON() {
    downloadBlob(
      "french-vocab.json",
      "application/json",
      JSON.stringify({ version: 1, items }, null, 2)
    );
    play("tock");
  }

  function exportCSV() {
    downloadBlob("french-vocab.csv", "text/csv", toCSV(items));
    play("tock");
  }

  async function importJSON(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming: VocabItem[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.items)
        ? parsed.items
        : [];
      if (!incoming.length) {
        alert("No items found in file.");
        return;
      }
      const merged = [...items];
      const seen = new Set(merged.map((i) => i.word.toLowerCase()));
      for (const it of incoming) {
        if (!it?.word || seen.has(String(it.word).toLowerCase())) continue;
        seen.add(String(it.word).toLowerCase());
        merged.push({
          id:
            it.id ||
            `${it.word}-${Date.now().toString(36)}-${Math.random()
              .toString(36)
              .slice(2, 6)}`,
          word: String(it.word),
          translation: String(it.translation || ""),
          level: String(it.level || "B1"),
          note: String(it.note || ""),
          addedAt: typeof it.addedAt === "number" ? it.addedAt : Date.now(),
          due: typeof it.due === "number" ? it.due : Date.now(),
          interval: typeof it.interval === "number" ? it.interval : 0,
          ease: typeof it.ease === "number" ? it.ease : 2.5,
          reps: typeof it.reps === "number" ? it.reps : 0,
          lapses: typeof it.lapses === "number" ? it.lapses : 0,
          source: it.source,
        });
      }
      replaceAll(merged);
      play("tink");
    } catch {
      alert("Could not read that file. Expected JSON exported from this app.");
    }
  }

  if (!ready) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto ink-faint">Chargement…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wider ink-faint">
            Carnet de vocabulaire
          </p>
          <h1 className="text-3xl font-semibold ink-strong mt-1">
            Your French vocabulary
          </h1>
          <p className="ink-soft mt-2 text-sm">
            {items.length === 0
              ? "Save difficult words from any analysis to build a personal list. Review with spaced repetition right here."
              : `${items.length} word${items.length === 1 ? "" : "s"} saved · ${dueCount} due for review.`}{" "}
            Everything is stored locally in your browser.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="tactile-card p-8 text-center">
            <p className="ink-soft mb-4">
              You haven&apos;t saved any words yet.
            </p>
            <Link href="/" className="tactile-button px-5 py-2 text-sm inline-block">
              Analyze some French →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <motion.button
                onClick={() => {
                  setReviewing(true);
                  play("shimmer");
                }}
                disabled={dueCount === 0}
                whileHover={reduce || dueCount === 0 ? undefined : { y: -2 }}
                whileTap={reduce || dueCount === 0 ? undefined : { y: 1 }}
                className="tactile-button px-5 py-2 text-sm"
              >
                {dueCount > 0
                  ? `Review ${dueCount} word${dueCount === 1 ? "" : "s"} →`
                  : "Nothing due right now"}
              </motion.button>
              <div className="flex-1" />
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter…"
                className="tactile-inset text-sm px-3 py-1.5 ink-strong focus:outline-none"
                style={{ minWidth: 140 }}
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="tactile-inset text-sm px-2 py-1.5 ink-strong focus:outline-none"
                aria-label="Sort by"
              >
                <option value="added">Newest</option>
                <option value="due">Due soonest</option>
                <option value="level">CEFR level</option>
                <option value="alpha">A → Z</option>
              </select>
            </div>

            <ul className="space-y-2">
              {filtered.map((it) => (
                <motion.li
                  key={it.id}
                  layout
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="tactile-card p-3 flex items-baseline gap-3"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: dot(it.level),
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                      transform: "translateY(-1px)",
                    }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-mono font-semibold ink-strong">
                        {it.word}
                      </span>
                      <span className="ink-soft">— {it.translation}</span>
                      <span
                        className="text-xs tabular-nums"
                        style={{ color: dot(it.level) }}
                      >
                        {it.level}
                      </span>
                      <span className="text-xs ink-faint tabular-nums">
                        · {formatDue(it.due)} · {it.reps} review
                        {it.reps === 1 ? "" : "s"}
                      </span>
                    </div>
                    {it.note && (
                      <div className="ink-faint italic text-xs mt-0.5">
                        {it.note}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${it.word}" from your list?`))
                        remove(it.id);
                    }}
                    className="tactile-chip text-xs px-2 py-1 ink-soft flex-shrink-0"
                    aria-label={`Remove ${it.word}`}
                    title="Remove"
                  >
                    ×
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2 items-center">
              <button onClick={exportJSON} className="tactile-chip text-xs px-3 py-1.5 ink-strong">
                Export JSON
              </button>
              <button onClick={exportCSV} className="tactile-chip text-xs px-3 py-1.5 ink-strong">
                Export CSV
              </button>
              <label className="tactile-chip text-xs px-3 py-1.5 ink-strong cursor-pointer">
                Import JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) importJSON(f);
                    e.target.value = "";
                  }}
                />
              </label>
              <div className="flex-1" />
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Delete ALL saved words? This cannot be undone."
                    )
                  ) {
                    clearAll();
                    play("tock");
                  }
                }}
                className="tactile-chip text-xs px-3 py-1.5"
                style={{ color: "var(--accent)" }}
              >
                Clear all
              </button>
            </div>
          </>
        )}

        <AnimatePresence>
          {reviewing && (
            <ReviewOverlay
              onClose={() => setReviewing(false)}
              onGrade={(id, g) => gradeItem(id, g)}
              items={items}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ReviewOverlay({
  items,
  onGrade,
  onClose,
}: {
  items: VocabItem[];
  onGrade: (id: string, g: Grade) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [queue] = useState<VocabItem[]>(() => dueItems(items));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const card = queue[index];

  function handleGrade(g: Grade) {
    if (!card) return;
    onGrade(card.id, g);
    play(g === "again" ? "tock" : "tink");
    setDone((n) => n + 1);
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  const finished = !card;

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
      aria-label="Review flashcards"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="tactile-card p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider ink-faint">
            {finished
              ? "Done!"
              : `Card ${index + 1} of ${queue.length}`}
          </span>
          <button
            onClick={onClose}
            className="tactile-chip text-xs px-2 py-1 ink-soft"
            aria-label="Close review"
          >
            ×
          </button>
        </div>

        {finished ? (
          <div className="text-center py-6">
            <p className="text-2xl mb-2 ink-strong">🎉</p>
            <p className="ink-strong font-semibold mb-1">
              {done > 0
                ? `You reviewed ${done} word${done === 1 ? "" : "s"}.`
                : "Nothing to review."}
            </p>
            <p className="ink-soft text-sm mb-4">
              Come back later — spaced repetition will surface them again when
              it&apos;s time.
            </p>
            <button
              onClick={onClose}
              className="tactile-button px-5 py-2 text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="tactile-inset p-6 text-center mb-4 min-h-[160px] flex flex-col items-center justify-center">
              <span
                className="inline-block w-2 h-2 rounded-full mb-3"
                style={{
                  background: dot(card.level),
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(0,0,0,0.2)",
                }}
                aria-hidden
              />
              <p className="font-mono text-2xl font-semibold ink-strong">
                {card.word}
              </p>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mt-3"
                >
                  <p className="ink-soft">{card.translation}</p>
                  {card.note && (
                    <p className="ink-faint italic text-xs mt-1">
                      {card.note}
                    </p>
                  )}
                  {card.source && (
                    <p className="ink-faint text-xs mt-2 italic">
                      &ldquo;{card.source.length > 120
                        ? card.source.slice(0, 120) + "…"
                        : card.source}&rdquo;
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {!revealed ? (
              <button
                onClick={() => {
                  setRevealed(true);
                  play("tock");
                }}
                className="tactile-button w-full py-2 text-sm"
              >
                Show translation
              </button>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleGrade("again")}
                  className="tactile-chip text-xs py-2"
                  style={{ color: "var(--accent)" }}
                  title="Forgot it — show again soon"
                >
                  Again
                </button>
                <button
                  onClick={() => handleGrade("hard")}
                  className="tactile-chip text-xs py-2 ink-strong"
                  title="Got it but it was hard"
                >
                  Hard
                </button>
                <button
                  onClick={() => handleGrade("good")}
                  className="tactile-chip text-xs py-2 ink-strong"
                  title="Recalled correctly"
                >
                  Good
                </button>
                <button
                  onClick={() => handleGrade("easy")}
                  className="tactile-chip text-xs py-2 ink-strong"
                  title="Too easy"
                >
                  Easy
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
