const $ = (id) => document.getElementById(id);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function setStatus(msg, isError = false) {
  const s = $("status");
  s.textContent = msg;
  s.className = isError ? "err" : "";
  s.classList.remove("hidden");
}
function clearStatus() {
  $("status").classList.add("hidden");
}

function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  if (props.style) Object.assign(e.style, props.style);
  for (const c of children) {
    if (c == null) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

// ────────────────────────────────────────────────────────────
// Tabs
// ────────────────────────────────────────────────────────────
function activateTab(name) {
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  $$(".panel").forEach((p) => p.classList.toggle("hidden", p.dataset.panel !== name));
  if (name === "history") renderHistory();
  if (name === "saved") renderSaved();
}

// ────────────────────────────────────────────────────────────
// Result rendering
// ────────────────────────────────────────────────────────────
async function renderResult(result, sourceText) {
  const { targetLevel } = await flcGetSettings();
  const root = $("result");
  root.innerHTML = "";
  root.classList.remove("hidden");

  const [light, dark] = FLC_LEVEL_COLORS[result.level] || ["#cbd5e1", "#475569"];

  const medalWrap = el("div", { className: "medal-wrap" }, [
    el("div", {
      className: "medal",
      textContent: result.level,
      style: { background: dark },
    }),
  ]);
  root.appendChild(medalWrap);
  root.appendChild(el("div", { className: "confidence", textContent: `${result.confidence}% confidence · target ${targetLevel}` }));
  root.appendChild(el("p", { className: "summary", textContent: result.summary }));

  // Difficult words filtered to above-target
  const allWords = result.difficult_words || [];
  const wordsToShow = allWords.filter((w) => flcAboveTarget(w.level, targetLevel));
  const finalWords = wordsToShow.length ? wordsToShow : allWords;

  if (finalWords.length) {
    const labelText = wordsToShow.length
      ? `Above ${targetLevel}`
      : "Difficult words";
    root.appendChild(el("div", { className: "section-label", textContent: labelText }));
    const ul = el("ul", { className: "word-list" });
    for (const w of finalWords) {
      ul.appendChild(buildWordRow(w));
    }
    root.appendChild(ul);
  }

  if (result.grammar_features?.length) {
    root.appendChild(el("div", { className: "section-label", textContent: "Grammar" }));
    const ul = el("ul", { className: "word-list" });
    for (const g of result.grammar_features) {
      const li = el("li");
      li.appendChild(el("span", { className: "word", textContent: g.feature }));
      li.appendChild(el("span", { className: "trans", textContent: ` — « ${g.example} »` }));
      ul.appendChild(li);
    }
    root.appendChild(ul);
  }

  if (result.simpler_version) {
    const head = el("div", { className: "section-label-row" }, [
      el("span", { className: "section-label", textContent: "Simpler version" }),
      el("button", {
        className: "ghost icon-only tiny",
        title: "Speak",
        textContent: "🔊",
        onclick: () => flcSpeak(result.simpler_version),
      }),
    ]);
    root.appendChild(head);
    root.appendChild(el("p", { className: "simpler", textContent: result.simpler_version }));
  }

  // Footer actions
  const actions = el("div", { className: "result-actions" }, [
    el("button", {
      className: "ghost small",
      textContent: "Copy",
      onclick: () => copyResult(result),
    }),
    el("button", {
      className: "ghost small",
      textContent: "Open in site",
      onclick: () => openInSite(sourceText),
    }),
  ]);
  root.appendChild(actions);
}

function buildWordRow(w) {
  const [, d] = FLC_LEVEL_COLORS[w.level] || ["#cbd5e1", "#475569"];
  const li = el("li");
  const left = el("div", { className: "word-left" }, [
    el("span", { className: "word", textContent: w.word }),
    document.createTextNode(" "),
    el("span", { className: "trans", textContent: "— " + (w.translation || "") }),
  ]);
  const right = el("div", { className: "word-right" }, [
    el("span", { className: "lvl", textContent: w.level, style: { background: d } }),
    el("button", {
      className: "ghost icon-only tiny",
      title: "Speak",
      textContent: "🔊",
      onclick: () => flcSpeak(w.word),
    }),
    el("button", {
      className: "ghost icon-only tiny",
      title: "Look up on Wiktionary",
      textContent: "📖",
      onclick: () => chrome.tabs.create({ url: flcWiktionaryUrl(w.word) }),
    }),
    el("button", {
      className: "ghost icon-only tiny",
      title: "Save word",
      textContent: "⭐",
      onclick: async (e) => {
        await flcSaveWord({
          word: w.word,
          translation: w.translation,
          level: w.level,
        });
        e.currentTarget.textContent = "✓";
        e.currentTarget.disabled = true;
      },
    }),
  ]);
  li.appendChild(left);
  li.appendChild(right);
  return li;
}

function copyResult(result) {
  const lines = [
    `CEFR level: ${result.level} (${result.confidence}% confidence)`,
    result.summary,
    "",
  ];
  if (result.difficult_words?.length) {
    lines.push("Difficult words:");
    for (const w of result.difficult_words) {
      lines.push(`  • ${w.word} — ${w.translation} [${w.level}]`);
    }
    lines.push("");
  }
  if (result.simpler_version) {
    lines.push("Simpler version:");
    lines.push(result.simpler_version);
  }
  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    setStatus("Copied to clipboard");
    setTimeout(clearStatus, 1200);
  });
}

function openInSite(text) {
  const url = new URL(FLC_SITE_URL);
  if (text) url.searchParams.set("sample", text.slice(0, 1500));
  chrome.tabs.create({ url: url.toString() });
}

// ────────────────────────────────────────────────────────────
// Analyze flow
// ────────────────────────────────────────────────────────────
async function analyze(textOverride) {
  const text = (textOverride ?? $("text").value).trim();
  if (!text) return;
  $("text").value = text;
  $("count").textContent = `${text.length} / 3000`;
  $("result").classList.add("hidden");
  $("go").disabled = true;
  setStatus("Lecture en cours…");

  try {
    const data = await flcAnalyze(text);
    clearStatus();
    await renderResult(data, text);
    await flcPushHistory({ text, result: data, source: "popup" });
    chrome.storage.session?.set?.({ lastText: text, lastResult: data });
  } catch (e) {
    setStatus(e.message || "Something went wrong", true);
  } finally {
    $("go").disabled = false;
  }
}

async function grabSelection() {
  setStatus("Reading selection…");
  try {
    const resp = await chrome.runtime.sendMessage({ type: "flc:request-selection" });
    const text = (resp?.text || "").trim();
    if (!text) {
      setStatus("Nothing selected on the active tab.", true);
      return;
    }
    clearStatus();
    await analyze(text);
  } catch (e) {
    setStatus(e?.message || "Could not read selection", true);
  }
}

async function grabPage() {
  setStatus("Reading page…");
  try {
    const resp = await chrome.runtime.sendMessage({ type: "flc:request-page-text" });
    const text = (resp?.text || "").trim();
    if (!text) {
      setStatus("No readable text on the active tab.", true);
      return;
    }
    clearStatus();
    await analyze(text);
  } catch (e) {
    setStatus(e?.message || "Could not read page", true);
  }
}

// ────────────────────────────────────────────────────────────
// History
// ────────────────────────────────────────────────────────────
async function renderHistory() {
  const list = $("history-list");
  const empty = $("history-empty");
  list.innerHTML = "";
  const history = await flcGetHistory();
  if (!history.length) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  for (const h of history) {
    const [light, dark] = FLC_LEVEL_COLORS[h.result?.level] || ["#cbd5e1", "#475569"];
    const li = el("li", { className: "history-row" });
    const badge = el("span", {
      className: "lvl big",
      textContent: h.result?.level || "?",
      style: { background: dark },
    });
    const body = el("div", { className: "history-body" }, [
      el("p", { className: "history-text", textContent: (h.text || "").slice(0, 120) + ((h.text || "").length > 120 ? "…" : "") }),
      el("p", { className: "history-meta", textContent: new Date(h.ts).toLocaleString() }),
    ]);
    li.appendChild(badge);
    li.appendChild(body);
    li.onclick = async () => {
      activateTab("analyze");
      $("text").value = h.text || "";
      $("count").textContent = `${(h.text || "").length} / 3000`;
      await renderResult(h.result, h.text);
    };
    list.appendChild(li);
  }
}

// ────────────────────────────────────────────────────────────
// Saved words
// ────────────────────────────────────────────────────────────
async function renderSaved() {
  const list = $("saved-list");
  const empty = $("saved-empty");
  list.innerHTML = "";
  const saved = await flcGetSavedWords();
  if (!saved.length) {
    empty.classList.remove("hidden");
    $("study-mode").disabled = true;
    return;
  }
  empty.classList.add("hidden");
  $("study-mode").disabled = false;
  for (const w of saved) {
    const li = buildWordRow(w);
    li.querySelectorAll("button").forEach((b) => {
      if (b.textContent === "⭐" || b.textContent === "✓") {
        b.textContent = "✕";
        b.title = "Remove";
        b.onclick = async (e) => {
          await flcRemoveSavedWord(w);
          renderSaved();
          e.stopPropagation();
        };
      }
    });
    list.appendChild(li);
  }
}

// ────────────────────────────────────────────────────────────
// Flashcard study mode
// ────────────────────────────────────────────────────────────
let flashDeck = [];
let flashIndex = 0;
let flashFlipped = false;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function startFlashcards() {
  const saved = await flcGetSavedWords();
  if (!saved.length) return;
  flashDeck = shuffle(saved);
  flashIndex = 0;
  $("flashcard").classList.remove("hidden");
  $("saved-list").classList.add("hidden");
  renderFlash();
}

function closeFlashcards() {
  $("flashcard").classList.add("hidden");
  $("saved-list").classList.remove("hidden");
}

function renderFlash() {
  if (!flashDeck.length) return;
  const card = flashDeck[flashIndex];
  flashFlipped = false;
  const [, d] = FLC_LEVEL_COLORS[card.level] || ["#cbd5e1", "#475569"];
  $("flash-word").textContent = card.word || "";
  const lvl = $("flash-lvl");
  lvl.textContent = card.level || "?";
  lvl.style.background = d;
  $("flash-translation").textContent = card.translation || "(no translation saved)";
  $("flash-back").classList.add("hidden");
  $("flash-card").querySelector(".flash-front").classList.remove("hidden");
  $("flash-progress").textContent = `${flashIndex + 1} / ${flashDeck.length}`;
}

function flipFlash() {
  if (!flashDeck.length) return;
  flashFlipped = !flashFlipped;
  $("flash-back").classList.toggle("hidden", !flashFlipped);
  $("flash-card").querySelector(".flash-front").classList.toggle("hidden", flashFlipped);
}

function nextFlash() {
  if (!flashDeck.length) return;
  flashIndex = (flashIndex + 1) % flashDeck.length;
  renderFlash();
}

function prevFlash() {
  if (!flashDeck.length) return;
  flashIndex = (flashIndex - 1 + flashDeck.length) % flashDeck.length;
  renderFlash();
}

function exportCsv() {
  flcGetSavedWords().then((rows) => {
    if (!rows.length) return;
    const csv = [
      "word,translation,level,saved_at",
      ...rows.map((r) =>
        [r.word, r.translation, r.level, new Date(r.ts).toISOString()]
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    chrome.downloads
      ? chrome.downloads.download({ url, filename: "french-saved-words.csv" })
      : window.open(url, "_blank");
  });
}

// ────────────────────────────────────────────────────────────
// Settings
// ────────────────────────────────────────────────────────────
async function loadSettings() {
  const s = await flcGetSettings();
  $("api-url").value = s.apiUrl;
  $("target-level").value = s.targetLevel;
  $("badge-enabled").checked = !!s.badgeEnabled;
  // bubble-enabled reflects both the user setting AND whether the perm is granted.
  const hasPerm = await chrome.permissions.contains({ origins: ["<all_urls>"] }).catch(() => false);
  $("bubble-enabled").checked = !!s.bubbleEnabled && !!hasPerm;
}

async function saveSettings() {
  const apiUrl = $("api-url").value.trim() || FLC_DEFAULTS.apiUrl;
  const targetLevel = $("target-level").value || "B1";
  const badgeEnabled = $("badge-enabled").checked;
  await flcSetSettings({ apiUrl, targetLevel, badgeEnabled });
  chrome.runtime.sendMessage({ type: "flc:refresh-badge" }).catch(() => {});
  $("saved-msg").classList.remove("hidden");
  setTimeout(() => $("saved-msg").classList.add("hidden"), 1200);
}

async function toggleBubble(want) {
  if (want) {
    let granted = false;
    try {
      granted = await chrome.permissions.request({ origins: ["<all_urls>"] });
    } catch {}
    if (!granted) {
      $("bubble-enabled").checked = false;
      setStatus("Permission denied — selection bubble stays off.", true);
      setTimeout(clearStatus, 2200);
      return;
    }
    await flcSetSettings({ bubbleEnabled: true });
  } else {
    await flcSetSettings({ bubbleEnabled: false });
    // Don't auto-revoke the host permission — keep it for next time the user toggles back on.
  }
  await chrome.runtime.sendMessage({ type: "flc:bubble-toggle" }).catch(() => {});
}

// ────────────────────────────────────────────────────────────
// Wire-up
// ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  $("open-site").href = FLC_SITE_URL;
  await loadSettings();

  // Tabs
  $$(".tab").forEach((t) => t.addEventListener("click", () => activateTab(t.dataset.tab)));

  // Analyze tab
  $("text").addEventListener("input", (e) => {
    $("count").textContent = `${e.target.value.length} / 3000`;
  });
  $("text").addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      analyze();
    }
  });
  $("go").addEventListener("click", () => analyze());
  $("clear-text").addEventListener("click", () => {
    $("text").value = "";
    $("count").textContent = "0 / 3000";
    $("result").classList.add("hidden");
    clearStatus();
  });
  $("grab-selection").addEventListener("click", grabSelection);
  $("grab-page").addEventListener("click", grabPage);
  $("speak-input").addEventListener("click", () => {
    const t = $("text").value.trim();
    if (t) flcSpeak(t);
  });

  // Settings
  $("save-settings").addEventListener("click", saveSettings);
  $("open-shortcuts").addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  });
  $("bubble-enabled").addEventListener("change", (e) => toggleBubble(e.target.checked));

  // History / Saved actions
  $("clear-history").addEventListener("click", async () => {
    await flcClearHistory();
    renderHistory();
  });
  $("clear-saved").addEventListener("click", async () => {
    await chrome.storage.local.set({ savedWords: [] });
    closeFlashcards();
    renderSaved();
    chrome.runtime.sendMessage({ type: "flc:refresh-badge" }).catch(() => {});
  });
  $("export-csv").addEventListener("click", exportCsv);

  // Flashcards
  $("study-mode").addEventListener("click", startFlashcards);
  $("flash-close").addEventListener("click", closeFlashcards);
  $("flash-card").addEventListener("click", flipFlash);
  $("flash-card").addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipFlash(); }
    else if (e.key === "ArrowRight") nextFlash();
    else if (e.key === "ArrowLeft") prevFlash();
  });
  $("flash-next").addEventListener("click", nextFlash);
  $("flash-prev").addEventListener("click", prevFlash);
  $("flash-speak").addEventListener("click", () => {
    const card = flashDeck[flashIndex];
    if (card?.word) flcSpeak(card.word);
  });
  $("flash-wikt").addEventListener("click", () => {
    const card = flashDeck[flashIndex];
    if (card?.word) chrome.tabs.create({ url: flcWiktionaryUrl(card.word) });
  });

  // Restore last analysis within the same session if popup is reopened.
  const cached = await chrome.storage.session?.get?.(["lastText", "lastResult"]);
  if (cached?.lastResult) {
    $("text").value = cached.lastText || "";
    $("count").textContent = `${($("text").value).length} / 3000`;
    await renderResult(cached.lastResult, cached.lastText);
  }
});
