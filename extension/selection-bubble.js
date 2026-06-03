// Floating selection bubble — appears near any text selection ≥ 2 chars and
// offers Analyze / Speak / Save shortcuts. Injected only on domains the user
// has opted into via the popup Settings (uses optional_host_permissions).
(() => {
  if (window.__flcBubble) return;
  window.__flcBubble = true;

  const HOST_ID = "flc-bubble-host";
  const MIN_LEN = 2;
  const MAX_LEN = 3000;
  let hideTimer = null;

  function getHost() {
    let host = document.getElementById(HOST_ID);
    if (host) return host;
    host = document.createElement("div");
    host.id = HOST_ID;
    host.style.cssText =
      "all: initial; position: absolute; z-index: 2147483647; top: 0; left: 0; display: none;";
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      .b {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        display: inline-flex; gap: 0; align-items: center;
        background: #ffffff; color: #0f172a;
        border: 1px solid #e2e8f0;
        border-radius: 8px; padding: 3px;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(15, 23, 42, 0.06);
        animation: in 0.14s ease-out;
      }
      @keyframes in { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: none; } }
      button {
        all: unset; cursor: pointer; font-size: 12px; line-height: 1;
        padding: 6px 9px; border-radius: 5px;
        display: inline-flex; align-items: center; gap: 4px;
        font-weight: 500; color: #475569;
        transition: background 0.1s ease, color 0.1s ease;
      }
      button:hover { background: #f1f5f9; color: #0f172a; }
      button[data-act="analyze"] { color: #059669; font-weight: 600; }
      button[data-act="analyze"]:hover { background: #ecfdf5; color: #047857; }
      .sep { width: 1px; height: 14px; background: #e2e8f0; margin: 0 1px; }
      .brand {
        font-size: 10px; font-weight: 700; color: #fff;
        background: #059669; padding: 4px 7px; border-radius: 5px;
        letter-spacing: 0.02em; line-height: 1;
      }
    `;
    shadow.appendChild(style);
    const root = document.createElement("div");
    root.className = "b";
    root.innerHTML = `
      <span class="brand">Fr</span>
      <button data-act="analyze" title="Analyze CEFR level">🎯 Level</button>
      <span class="sep"></span>
      <button data-act="speak" title="Speak in French">🔊</button>
      <span class="sep"></span>
      <button data-act="save" title="Save to vocabulary">⭐</button>
    `;
    shadow.appendChild(root);
    document.documentElement.appendChild(host);

    root.addEventListener("mousedown", (e) => e.preventDefault());
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const act = btn.dataset.act;
      const text = window.__flcLastSelection || "";
      if (!text) return;
      handleAction(act, text);
    });
    return host;
  }

  function handleAction(act, text) {
    if (act === "analyze") {
      try {
        chrome.runtime.sendMessage({ type: "flc:bubble-analyze", text: text.slice(0, MAX_LEN) });
      } catch {}
      hide();
    } else if (act === "speak") {
      try {
        window.speechSynthesis?.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "fr-FR";
        u.rate = 0.95;
        const fr = window.speechSynthesis?.getVoices().find((v) => v.lang?.toLowerCase().startsWith("fr"));
        if (fr) u.voice = fr;
        window.speechSynthesis?.speak(u);
      } catch {}
      // Keep bubble for repeat-clicks.
    } else if (act === "save") {
      try {
        chrome.runtime.sendMessage({
          type: "flc:bubble-save",
          word: { word: text.slice(0, 80), translation: "", level: "?" },
        });
      } catch {}
      flashSaved();
    }
  }

  function flashSaved() {
    const host = document.getElementById(HOST_ID);
    if (!host) return;
    const btn = host.shadowRoot.querySelector('button[data-act="save"]');
    if (!btn) return;
    const prev = btn.textContent;
    btn.textContent = "✓";
    setTimeout(() => (btn.textContent = prev), 900);
  }

  function show(rect) {
    const host = getHost();
    host.style.display = "block";
    // Position centered above selection, falling back to below if no room.
    const margin = 8;
    const bw = 200; // approximate
    const bh = 36;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    let top = rect.top + scrollY - bh - margin;
    if (top < scrollY + 4) top = rect.bottom + scrollY + margin;
    let left = rect.left + scrollX + rect.width / 2 - bw / 2;
    left = Math.max(scrollX + 4, Math.min(left, scrollX + document.documentElement.clientWidth - bw - 4));
    host.style.top = top + "px";
    host.style.left = left + "px";
  }

  function hide() {
    const host = document.getElementById(HOST_ID);
    if (host) host.style.display = "none";
  }

  function onMouseUp() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      const sel = window.getSelection();
      const text = (sel?.toString() || "").trim();
      if (!text || text.length < MIN_LEN) {
        hide();
        return;
      }
      // Don't show on our own UI
      if (sel.anchorNode && (sel.anchorNode.parentElement?.closest?.(`#${HOST_ID}, #flc-host`))) return;
      window.__flcLastSelection = text;
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect || (!rect.width && !rect.height)) return;
      show(rect);
    }, 80);
  }

  function onScrollOrResize() {
    hide();
  }

  document.addEventListener("mouseup", onMouseUp, true);
  document.addEventListener("selectionchange", () => {
    const text = (window.getSelection()?.toString() || "").trim();
    if (!text) hide();
  });
  window.addEventListener("scroll", onScrollOrResize, true);
  window.addEventListener("resize", onScrollOrResize);
  document.addEventListener("mousedown", (e) => {
    const host = document.getElementById(HOST_ID);
    if (host && e.composedPath().includes(host)) return;
    hide();
  });
})();
