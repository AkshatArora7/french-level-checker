const MENU_ID = "flc-check-selection";
const MENU_PAGE_ID = "flc-check-page";
const MENU_SPEAK_ID = "flc-speak-selection";

const DEFAULT_API = "https://french.aatechax.com/api/analyze";
const BUBBLE_SCRIPT_ID = "flc-bubble";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Check French level — selection",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: MENU_PAGE_ID,
    title: "Check French level — whole page",
    contexts: ["page"],
  });
  chrome.contextMenus.create({
    id: MENU_SPEAK_ID,
    title: "🔊 Speak selection in French",
    contexts: ["selection"],
  });
  await refreshBadge();
  await syncBubbleRegistration();
});

chrome.runtime.onStartup.addListener(async () => {
  await refreshBadge();
  await syncBubbleRegistration();
});

async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
  } catch {
    // tab may be a chrome:// or store page — silently skip
  }
}

async function readSelectionFromTab(tabId) {
  try {
    const [{ result } = {}] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => (window.getSelection ? window.getSelection().toString() : ""),
    });
    return (result || "").trim();
  } catch {
    return "";
  }
}

async function readPageTextFromTab(tabId) {
  try {
    const [{ result } = {}] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const pick =
          document.querySelector("article") ||
          document.querySelector("main") ||
          document.body;
        const raw = (pick?.innerText || "").replace(/\s+/g, " ").trim();
        return raw.slice(0, 3000);
      },
    });
    return (result || "").trim();
  } catch {
    return "";
  }
}

async function pushHistory(entry) {
  const { history = [] } = await chrome.storage.local.get({ history: [] });
  history.unshift({ ...entry, ts: Date.now() });
  await chrome.storage.local.set({ history: history.slice(0, 20) });
}

async function analyzeAndShow(tabId, text, source) {
  if (!text || !tabId) return;
  await injectContentScript(tabId);
  chrome.tabs.sendMessage(tabId, { type: "flc:start", text }).catch(() => {});

  try {
    const { apiUrl = DEFAULT_API } = await chrome.storage.sync.get({
      apiUrl: DEFAULT_API,
    });
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");
    chrome.tabs.sendMessage(tabId, { type: "flc:result", text, result: data }).catch(() => {});
    await pushHistory({ text, result: data, source });
  } catch (e) {
    chrome.tabs
      .sendMessage(tabId, {
        type: "flc:error",
        message: e?.message || "Analysis failed",
      })
      .catch(() => {});
  }
}

async function speakInTab(tabId, text) {
  if (!tabId || !text) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (t) => {
        try {
          if (!("speechSynthesis" in window)) return;
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(t);
          u.lang = "fr-FR";
          u.rate = 0.95;
          const fr = window.speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith("fr"));
          if (fr) u.voice = fr;
          window.speechSynthesis.speak(u);
        } catch {}
      },
      args: [text.slice(0, 1500)],
    });
  } catch {}
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;
  if (info.menuItemId === MENU_ID && info.selectionText) {
    await analyzeAndShow(tab.id, info.selectionText.trim().slice(0, 3000), "context-menu");
  } else if (info.menuItemId === MENU_PAGE_ID) {
    const text = await readPageTextFromTab(tab.id);
    if (text) await analyzeAndShow(tab.id, text, "page");
  } else if (info.menuItemId === MENU_SPEAK_ID && info.selectionText) {
    await speakInTab(tab.id, info.selectionText.trim());
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  if (command === "analyze-selection") {
    const text = await readSelectionFromTab(tab.id);
    if (!text) {
      const pageText = await readPageTextFromTab(tab.id);
      if (pageText) await analyzeAndShow(tab.id, pageText, "shortcut-page");
      return;
    }
    await analyzeAndShow(tab.id, text.slice(0, 3000), "shortcut");
  } else if (command === "speak-selection") {
    const text = await readSelectionFromTab(tab.id);
    if (text) await speakInTab(tab.id, text);
  }
});

// Popup ↔ background bridge
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === "flc:request-selection") {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return sendResponse({ text: "" });
      const text = await readSelectionFromTab(tab.id);
      sendResponse({ text, tabId: tab.id });
    })();
    return true;
  }
  if (msg?.type === "flc:request-page-text") {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return sendResponse({ text: "" });
      const text = await readPageTextFromTab(tab.id);
      sendResponse({ text, tabId: tab.id });
    })();
    return true;
  }
  if (msg?.type === "flc:show-in-page") {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return sendResponse({ ok: false });
      await injectContentScript(tab.id);
      chrome.tabs
        .sendMessage(tab.id, { type: "flc:result", text: msg.text, result: msg.result })
        .catch(() => {});
      sendResponse({ ok: true });
    })();
    return true;
  }
  if (msg?.type === "flc:bubble-analyze") {
    const tabId = sender.tab?.id;
    if (tabId && msg.text) analyzeAndShow(tabId, msg.text.slice(0, 3000), "bubble");
    return false;
  }
  if (msg?.type === "flc:bubble-save" || msg?.type === "flc:save-word") {
    (async () => {
      if (!msg.word?.word) return;
      const { savedWords = [] } = await chrome.storage.local.get({ savedWords: [] });
      const key = (w) => `${(w.word || "").toLowerCase()}|${w.level || ""}`;
      if (!savedWords.some((w) => key(w) === key(msg.word))) {
        savedWords.unshift({ ...msg.word, ts: Date.now() });
        await chrome.storage.local.set({ savedWords: savedWords.slice(0, 500) });
        await refreshBadge();
      }
    })();
    return false;
  }
  if (msg?.type === "flc:refresh-badge") {
    refreshBadge();
    return false;
  }
  if (msg?.type === "flc:bubble-toggle") {
    syncBubbleRegistration().then(() => sendResponse({ ok: true }));
    return true;
  }
});

// Toolbar badge — shows the number of saved words above your target level
async function refreshBadge() {
  try {
    const [{ savedWords = [] }, { targetLevel = "B1", badgeEnabled = true }] = await Promise.all([
      chrome.storage.local.get({ savedWords: [] }),
      chrome.storage.sync.get({ targetLevel: "B1", badgeEnabled: true }),
    ]);
    if (!badgeEnabled) {
      chrome.action.setBadgeText({ text: "" });
      return;
    }
    const RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
    const target = RANK[targetLevel] || 3;
    const count = savedWords.filter((w) => (RANK[w.level] || 0) > target).length;
    const text = count > 99 ? "99+" : count > 0 ? String(count) : "";
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: "#c75d3a" });
    if (chrome.action.setBadgeTextColor) {
      chrome.action.setBadgeTextColor({ color: "#fff8ee" });
    }
  } catch {}
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (
    (area === "local" && changes.savedWords) ||
    (area === "sync" && (changes.targetLevel || changes.badgeEnabled))
  ) {
    refreshBadge();
  }
});

// Selection-bubble registration: declarative content script registered only
// when the user opts in AND has granted <all_urls>. Persists across browser
// restarts via chrome.scripting.getRegisteredContentScripts.
async function syncBubbleRegistration() {
  try {
    const { bubbleEnabled = false } = await chrome.storage.sync.get({ bubbleEnabled: false });
    const has = await chrome.permissions.contains({ origins: ["<all_urls>"] });
    const existing = await chrome.scripting.getRegisteredContentScripts({ ids: [BUBBLE_SCRIPT_ID] }).catch(() => []);
    const shouldRegister = bubbleEnabled && has;
    if (shouldRegister && existing.length === 0) {
      await chrome.scripting.registerContentScripts([
        {
          id: BUBBLE_SCRIPT_ID,
          js: ["selection-bubble.js"],
          matches: ["<all_urls>"],
          runAt: "document_idle",
          allFrames: false,
        },
      ]);
    } else if (!shouldRegister && existing.length > 0) {
      await chrome.scripting.unregisterContentScripts({ ids: [BUBBLE_SCRIPT_ID] });
    }
  } catch {}
}
