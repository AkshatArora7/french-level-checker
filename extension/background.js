const MENU_ID = "flc-check-selection";
const MENU_PAGE_ID = "flc-check-page";

const DEFAULT_API = "https://french.aatechax.com/api/analyze";

chrome.runtime.onInstalled.addListener(() => {
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

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;
  if (info.menuItemId === MENU_ID && info.selectionText) {
    await analyzeAndShow(tab.id, info.selectionText.trim().slice(0, 3000), "context-menu");
  } else if (info.menuItemId === MENU_PAGE_ID) {
    const text = await readPageTextFromTab(tab.id);
    if (text) await analyzeAndShow(tab.id, text, "page");
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "analyze-selection") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  const text = await readSelectionFromTab(tab.id);
  if (!text) {
    // No selection: fall back to whole page so the shortcut never feels broken.
    const pageText = await readPageTextFromTab(tab.id);
    if (pageText) await analyzeAndShow(tab.id, pageText, "shortcut-page");
    return;
  }
  await analyzeAndShow(tab.id, text.slice(0, 3000), "shortcut");
});

// Popup ↔ background bridge so the popup can trigger the in-page panel
// without duplicating fetch logic.
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
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
});
