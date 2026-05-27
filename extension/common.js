// Shared helpers used by popup.js and content.js. Loaded via <script src="common.js">
// in popup.html, and inlined into content.js (kept tiny to avoid duplication).

const FLC_DEFAULTS = {
  apiUrl: "https://french.aatechax.com/api/analyze",
  targetLevel: "B1",
};

const FLC_LEVEL_COLORS = {
  A1: ["#a8e6a3", "#3f9d4a"],
  A2: ["#7fd8b8", "#1f8a6b"],
  B1: ["#8ec6ff", "#2b6cb0"],
  B2: ["#a99dff", "#4338ca"],
  C1: ["#d7a8ff", "#7c3aed"],
  C2: ["#ffb3c1", "#c4302b"],
};

const FLC_LEVEL_RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

const FLC_SITE_URL = "https://french.aatechax.com";

async function flcGetSettings() {
  return chrome.storage.sync.get(FLC_DEFAULTS);
}

async function flcSetSettings(patch) {
  return chrome.storage.sync.set(patch);
}

async function flcGetHistory() {
  const { history = [] } = await chrome.storage.local.get({ history: [] });
  return history;
}

async function flcPushHistory(entry) {
  const history = await flcGetHistory();
  history.unshift({ ...entry, ts: Date.now() });
  const trimmed = history.slice(0, 20);
  await chrome.storage.local.set({ history: trimmed });
  return trimmed;
}

async function flcClearHistory() {
  return chrome.storage.local.set({ history: [] });
}

async function flcGetSavedWords() {
  const { savedWords = [] } = await chrome.storage.local.get({ savedWords: [] });
  return savedWords;
}

async function flcSaveWord(word) {
  const list = await flcGetSavedWords();
  const key = (w) => `${(w.word || "").toLowerCase()}|${w.level || ""}`;
  if (list.some((w) => key(w) === key(word))) return list;
  list.unshift({ ...word, ts: Date.now() });
  const trimmed = list.slice(0, 500);
  await chrome.storage.local.set({ savedWords: trimmed });
  return trimmed;
}

async function flcRemoveSavedWord(word) {
  const list = await flcGetSavedWords();
  const next = list.filter(
    (w) => !((w.word || "").toLowerCase() === (word.word || "").toLowerCase() && w.level === word.level)
  );
  await chrome.storage.local.set({ savedWords: next });
  return next;
}

async function flcAnalyze(text) {
  const { apiUrl } = await flcGetSettings();
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Échec de l'analyse");
  return data;
}

function flcSpeak(text, opts = {}) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = opts.rate ?? 0.95;
    const voices = window.speechSynthesis.getVoices();
    const fr = voices.find((v) => v.lang?.toLowerCase().startsWith("fr"));
    if (fr) u.voice = fr;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore — no TTS available
  }
}

function flcAboveTarget(wordLevel, targetLevel) {
  return (FLC_LEVEL_RANK[wordLevel] || 0) > (FLC_LEVEL_RANK[targetLevel] || 0);
}

function flcFilterWordsByTarget(words, targetLevel) {
  if (!Array.isArray(words)) return [];
  return words.filter((w) => flcAboveTarget(w.level, targetLevel));
}
