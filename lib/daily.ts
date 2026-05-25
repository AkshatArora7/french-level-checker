import { WORDLE_ANSWERS } from "./wordle-words";
import { DAILY_WORDS, DailyWord } from "./daily-words";

/**
 * Day index in UTC since Unix epoch. Stable across timezones.
 */
export function dayIndex(date: Date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / 86_400_000);
}

/**
 * Tiny deterministic hash. Mixes the index so consecutive days
 * don't read like a sequential scan through the list.
 */
function mix(seed: number, salt: number): number {
  let x = (seed ^ salt) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  x = (x ^ (x >>> 16)) >>> 0;
  return x;
}

export function dailyWordleAnswer(date: Date = new Date()): string {
  const idx = mix(dayIndex(date), 0x9e3779b1) % WORDLE_ANSWERS.length;
  return WORDLE_ANSWERS[idx];
}

export function dailyWord(date: Date = new Date()): DailyWord {
  const idx = mix(dayIndex(date), 0x12345678) % DAILY_WORDS.length;
  return DAILY_WORDS[idx];
}

/**
 * ISO date key in UTC, e.g. "2026-05-23". Used as a localStorage key
 * so progress on today's puzzle survives reloads but resets at UTC midnight.
 */
export function utcDateKey(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Milliseconds until next UTC midnight. Used for "next puzzle in…" timer.
 */
export function msUntilNextUtcDay(now: Date = new Date()): number {
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );
  return next - now.getTime();
}

export function formatHMS(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
