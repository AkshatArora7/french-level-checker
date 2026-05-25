export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type VocabItem = {
  id: string;
  word: string;
  translation: string;
  level: string;
  note: string;
  addedAt: number;
  due: number;
  interval: number;
  ease: number;
  reps: number;
  lapses: number;
  source?: string;
};

export type VocabStore = {
  version: 1;
  items: VocabItem[];
};

export const VOCAB_STORAGE_KEY = "flc-vocab";
export const VOCAB_EVENT = "flc-vocab-change";

export type Grade = "again" | "hard" | "good" | "easy";

function normalize(word: string) {
  return word
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,;:!?"'()«»\s]+/g, "")
    .trim();
}

export function makeId(word: string) {
  return `${normalize(word)}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function loadVocab(): VocabItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VOCAB_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VocabStore | VocabItem[];
    if (Array.isArray(parsed)) return parsed;
    if (parsed && parsed.version === 1) return parsed.items;
    return [];
  } catch {
    return [];
  }
}

export function saveVocab(items: VocabItem[]) {
  if (typeof window === "undefined") return;
  try {
    const store: VocabStore = { version: 1, items };
    window.localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new CustomEvent(VOCAB_EVENT));
  } catch {
    // ignore quota errors
  }
}

export function hasWord(items: VocabItem[], word: string) {
  const key = normalize(word);
  if (!key) return false;
  return items.some((i) => normalize(i.word) === key);
}

export function addWord(
  items: VocabItem[],
  input: { word: string; translation: string; level: string; note?: string; source?: string }
): VocabItem[] {
  if (hasWord(items, input.word)) return items;
  const now = Date.now();
  const item: VocabItem = {
    id: makeId(input.word),
    word: input.word.trim(),
    translation: input.translation.trim(),
    level: input.level || "B1",
    note: (input.note || "").trim(),
    addedAt: now,
    due: now,
    interval: 0,
    ease: 2.5,
    reps: 0,
    lapses: 0,
    source: input.source,
  };
  return [item, ...items];
}

export function removeWord(items: VocabItem[], id: string) {
  return items.filter((i) => i.id !== id);
}

const DAY = 24 * 60 * 60 * 1000;
const TEN_MIN = 10 * 60 * 1000;

export function grade(item: VocabItem, g: Grade, now = Date.now()): VocabItem {
  let { interval, ease, reps, lapses } = item;
  switch (g) {
    case "again": {
      lapses += 1;
      reps = 0;
      interval = 0;
      ease = Math.max(1.3, ease - 0.2);
      return { ...item, interval, ease, reps, lapses, due: now + TEN_MIN };
    }
    case "hard": {
      ease = Math.max(1.3, ease - 0.15);
      interval = reps === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
      reps += 1;
      return { ...item, interval, ease, reps, due: now + interval * DAY };
    }
    case "good": {
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 3;
      else interval = Math.max(1, Math.round(interval * ease));
      reps += 1;
      return { ...item, interval, ease, reps, due: now + interval * DAY };
    }
    case "easy": {
      ease = ease + 0.15;
      if (reps === 0) interval = 4;
      else interval = Math.max(1, Math.round(interval * ease * 1.3));
      reps += 1;
      return { ...item, interval, ease, reps, due: now + interval * DAY };
    }
  }
}

export function dueItems(items: VocabItem[], now = Date.now()) {
  return items
    .filter((i) => i.due <= now)
    .sort((a, b) => a.due - b.due);
}

export function dueCount(items: VocabItem[], now = Date.now()) {
  let n = 0;
  for (const i of items) if (i.due <= now) n++;
  return n;
}

export function toCSV(items: VocabItem[]) {
  const esc = (s: string) => `"${(s || "").replace(/"/g, '""')}"`;
  const head = "word,translation,level,note,added_at,due_at,interval,ease,reps,lapses";
  const rows = items.map((i) =>
    [
      esc(i.word),
      esc(i.translation),
      esc(i.level),
      esc(i.note),
      new Date(i.addedAt).toISOString(),
      new Date(i.due).toISOString(),
      i.interval,
      i.ease.toFixed(2),
      i.reps,
      i.lapses,
    ].join(",")
  );
  return [head, ...rows].join("\n");
}

export function formatDue(due: number, now = Date.now()) {
  const diff = due - now;
  if (diff <= 0) return "due now";
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `in ${hours}h`;
  const days = Math.round(hours / 24);
  return `in ${days}d`;
}
