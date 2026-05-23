const MENU_ID = "flc-check-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Check French level",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText || !tab?.id) return;

  const text = info.selectionText.trim().slice(0, 3000);

  // Show an inline floating card in the page with the result.
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  chrome.tabs.sendMessage(tab.id, { type: "flc:start", text });

  try {
    const { apiUrl } = await chrome.storage.sync.get({
      apiUrl: "https://french.aatechax.com/api/analyze",
    });
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");
    chrome.tabs.sendMessage(tab.id, { type: "flc:result", text, result: data });
  } catch (e) {
    chrome.tabs.sendMessage(tab.id, {
      type: "flc:error",
      message: e?.message || "Analysis failed",
    });
  }
});
