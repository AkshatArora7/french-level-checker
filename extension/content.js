(() => {
  if (window.__flcInjected) return;
  window.__flcInjected = true;

  const LEVEL_COLORS = {
    A1: ["#86efac", "#16a34a"],
    A2: ["#6ee7b7", "#059669"],
    B1: ["#7dd3fc", "#0284c7"],
    B2: ["#c4b5fd", "#6d28d9"],
    C1: ["#f0abfc", "#a21caf"],
    C2: ["#fda4af", "#be123c"],
  };
  const LEVEL_RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
  const SITE_URL = "https://french.aatechax.com";

  let lastText = "";

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

  function speak(text) {
    try {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((v) => v.lang?.toLowerCase().startsWith("fr"));
      if (fr) u.voice = fr;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  function saveWord(word) {
    try {
      chrome.runtime.sendMessage({ type: "flc:save-word", word });
    } catch {}
    // Also push to local storage as a fallback in case message handler isn't wired
    try {
      chrome.storage?.local.get({ savedWords: [] }, ({ savedWords }) => {
        const key = (w) => `${(w.word || "").toLowerCase()}|${w.level || ""}`;
        if (savedWords.some((w) => key(w) === key(word))) return;
        savedWords.unshift({ ...word, ts: Date.now() });
        chrome.storage.local.set({ savedWords: savedWords.slice(0, 500) });
      });
    } catch {}
  }

  async function getTargetLevel() {
    try {
      const { targetLevel = "B1" } = await chrome.storage.sync.get({ targetLevel: "B1" });
      return targetLevel;
    } catch {
      return "B1";
    }
  }

  function ensurePanel() {
    let host = document.getElementById("flc-host");
    if (host) return host.shadowRoot.querySelector(".flc-panel");

    host = document.createElement("div");
    host.id = "flc-host";

    // Restore last position if any
    let top = 16, right = 16, useRight = true, left = null;
    try {
      const saved = JSON.parse(localStorage.getItem("flc-panel-pos") || "null");
      if (saved && typeof saved.top === "number") {
        top = saved.top;
        if (typeof saved.left === "number") { left = saved.left; useRight = false; }
        else if (typeof saved.right === "number") { right = saved.right; }
      }
    } catch {}

    host.style.cssText =
      `all: initial; position: fixed; top: ${top}px; ${useRight ? `right: ${right}px;` : `left: ${left}px;`} z-index: 2147483647;`;
    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .flc-panel {
        all: initial;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        width: 340px;
        max-height: 80vh;
        overflow: auto;
        background: #ffffff;
        color: #0f172a;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06);
        padding: 14px 16px 16px;
        animation: flc-in 0.18s ease-out;
      }
      @keyframes flc-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .flc-head {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 12px; cursor: grab; user-select: none;
      }
      .flc-head:active { cursor: grabbing; }
      .flc-title {
        font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
        color: #94a3b8; font-weight: 600;
        display: inline-flex; align-items: center; gap: 7px;
      }
      .flc-title::before {
        content: ""; width: 7px; height: 7px; border-radius: 50%;
        background: #059669;
      }
      .flc-head-actions { display: flex; gap: 2px; align-items: center; }
      .flc-iconbtn {
        all: unset; cursor: pointer; font-size: 13px; color: #475569;
        padding: 3px 7px; border-radius: 4px; line-height: 1;
      }
      .flc-iconbtn:hover { background: #f1f5f9; color: #0f172a; }
      .flc-close { font-size: 18px; line-height: 1; }
      .flc-medal {
        display: flex; align-items: center; justify-content: center;
        width: 56px; height: 56px; margin: 0 auto 10px;
        border-radius: 50%; color: #fff;
        font-weight: 700; font-size: 20px; letter-spacing: -0.02em;
      }
      .flc-confidence {
        text-align: center; font-size: 10px; color: #94a3b8;
        margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.06em;
      }
      .flc-summary {
        font-size: 13px; line-height: 1.55; margin: 0 0 12px;
        color: #475569;
      }
      .flc-section-label {
        font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
        color: #94a3b8; margin: 14px 0 6px; font-weight: 600;
      }
      .flc-word-list { margin: 0; padding: 0; list-style: none; font-size: 12px; }
      .flc-word-list li {
        padding: 7px 0; border-top: 1px solid #f1f5f9;
        display: flex; justify-content: space-between; align-items: center; gap: 8px;
      }
      .flc-word-list li:first-child { border-top: none; }
      .flc-word-left { flex: 1; min-width: 0; }
      .flc-word-right { display: flex; gap: 3px; align-items: center; flex-shrink: 0; }
      .flc-word {
        font-weight: 600; color: #0f172a;
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
      }
      .flc-trans { color: #475569; font-size: 12px; }
      .flc-lvl-pill {
        display: inline-block; padding: 2px 6px; border-radius: 4px;
        font-size: 10px; font-weight: 600; color: #fff;
      }
      .flc-simpler {
        background: #f8fafc; padding: 10px 12px; border-radius: 6px;
        font-size: 12px; line-height: 1.55;
        border: 1px solid #e2e8f0; color: #475569;
      }
      .flc-loading {
        text-align: center; padding: 24px 0; color: #475569; font-size: 12px;
      }
      .flc-spinner {
        width: 24px; height: 24px; margin: 0 auto 10px; border-radius: 50%;
        border: 2px solid #e2e8f0; border-top-color: #059669;
        animation: flc-spin 0.8s linear infinite;
      }
      @keyframes flc-spin { to { transform: rotate(360deg); } }
      .flc-err {
        color: #dc2626; font-size: 12px; padding: 10px 12px;
        background: #fef2f2; border-radius: 6px; border: 1px solid #fecaca;
      }
      .flc-footer {
        display: flex; gap: 6px; margin-top: 14px;
        justify-content: flex-end; flex-wrap: wrap;
      }
      .flc-cta {
        all: unset; cursor: pointer; font-size: 11px; font-weight: 500;
        padding: 5px 10px; border-radius: 6px;
        background: #fff; border: 1px solid #e2e8f0; color: #475569;
        transition: background 0.12s ease, color 0.12s ease;
      }
      .flc-cta:hover { background: #f8fafc; color: #0f172a; }
      .flc-cta.primary {
        background: #059669; color: #fff; border-color: #059669;
      }
      .flc-cta.primary:hover { background: #10b981; border-color: #10b981; }
    `;
    shadow.appendChild(style);

    const panel = el("div", { className: "flc-panel" });
    shadow.appendChild(panel);
    document.documentElement.appendChild(host);
    enableDrag(host);
    return panel;
  }

  function enableDrag(host) {
    let down = null;
    host.addEventListener("mousedown", (e) => {
      const target = e.composedPath()[0];
      if (!(target instanceof Element)) return;
      if (!target.closest(".flc-head") || target.closest(".flc-iconbtn")) return;
      const rect = host.getBoundingClientRect();
      down = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
      if (!down) return;
      const left = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - down.dx));
      const top = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - down.dy));
      host.style.left = left + "px";
      host.style.right = "auto";
      host.style.top = top + "px";
    });
    window.addEventListener("mouseup", () => {
      if (!down) return;
      down = null;
      try {
        const rect = host.getBoundingClientRect();
        localStorage.setItem(
          "flc-panel-pos",
          JSON.stringify({ top: Math.round(rect.top), left: Math.round(rect.left) })
        );
      } catch {}
    });
  }

  function buildHead(extras = []) {
    const actions = el("div", { className: "flc-head-actions" }, [
      ...extras,
      el("button", {
        className: "flc-iconbtn flc-close",
        textContent: "×",
        title: "Close",
        onclick: () => closePanel(),
      }),
    ]);
    return el("div", { className: "flc-head" }, [
      el("span", { className: "flc-title", textContent: "French Level Checker — drag to move" }),
      actions,
    ]);
  }

  function renderLoading() {
    const panel = ensurePanel();
    panel.innerHTML = "";
    panel.appendChild(buildHead());
    const wrap = el("div", { className: "flc-loading" });
    wrap.appendChild(el("div", { className: "flc-spinner" }));
    wrap.appendChild(el("div", { textContent: "Lecture en cours…" }));
    panel.appendChild(wrap);
  }

  function renderError(msg) {
    const panel = ensurePanel();
    panel.innerHTML = "";
    panel.appendChild(buildHead());
    panel.appendChild(el("div", { className: "flc-err", textContent: msg }));
  }

  async function renderResult(result) {
    const panel = ensurePanel();
    panel.innerHTML = "";
    const targetLevel = await getTargetLevel();
    const [light, dark] = LEVEL_COLORS[result.level] || ["#cbd5e1", "#475569"];

    const speakBtn = el("button", {
      className: "flc-iconbtn",
      textContent: "🔊",
      title: "Speak text",
      onclick: () => speak(lastText || result.summary || ""),
    });
    panel.appendChild(buildHead([speakBtn]));

    const medal = el("div", {
      className: "flc-medal",
      textContent: result.level,
      style: { background: dark },
    });
    panel.appendChild(medal);

    panel.appendChild(
      el("div", {
        className: "flc-confidence",
        textContent: `${result.confidence}% confidence · target ${targetLevel}`,
      })
    );
    panel.appendChild(el("p", { className: "flc-summary", textContent: result.summary }));

    const allWords = result.difficult_words || [];
    const filtered = allWords.filter(
      (w) => (LEVEL_RANK[w.level] || 0) > (LEVEL_RANK[targetLevel] || 0)
    );
    const words = filtered.length ? filtered : allWords;

    if (words.length) {
      panel.appendChild(
        el("div", {
          className: "flc-section-label",
          textContent: filtered.length ? `Above ${targetLevel}` : "Difficult words",
        })
      );
      const ul = el("ul", { className: "flc-word-list" });
      for (const w of words) {
        const [, d] = LEVEL_COLORS[w.level] || ["#cbd5e1", "#475569"];
        const li = el("li");
        li.appendChild(
          el("div", { className: "flc-word-left" }, [
            el("span", { className: "flc-word", textContent: w.word }),
            document.createTextNode(" "),
            el("span", { className: "flc-trans", textContent: "— " + (w.translation || "") }),
          ])
        );
        const right = el("div", { className: "flc-word-right" }, [
          el("span", {
            className: "flc-lvl-pill",
            textContent: w.level,
            style: { background: d },
          }),
          el("button", {
            className: "flc-iconbtn",
            textContent: "🔊",
            title: "Speak",
            onclick: () => speak(w.word),
          }),
          el("button", {
            className: "flc-iconbtn",
            textContent: "📖",
            title: "Wiktionary",
            onclick: () => {
              const u = `https://en.wiktionary.org/wiki/${encodeURIComponent((w.word || "").toLowerCase().trim())}#French`;
              window.open(u, "_blank", "noopener");
            },
          }),
          el("button", {
            className: "flc-iconbtn",
            textContent: "⭐",
            title: "Save word",
            onclick: (e) => {
              saveWord({ word: w.word, translation: w.translation, level: w.level });
              e.currentTarget.textContent = "✓";
            },
          }),
        ]);
        li.appendChild(right);
        ul.appendChild(li);
      }
      panel.appendChild(ul);
    }

    if (result.simpler_version) {
      panel.appendChild(el("div", { className: "flc-section-label", textContent: "Simpler version" }));
      panel.appendChild(el("p", { className: "flc-simpler", textContent: result.simpler_version }));
    }

    const footer = el("div", { className: "flc-footer" }, [
      el("button", {
        className: "flc-cta",
        textContent: "Copy",
        onclick: () => {
          const text = [
            `${result.level} (${result.confidence}%)`,
            result.summary,
            result.simpler_version ? `Simpler: ${result.simpler_version}` : null,
          ].filter(Boolean).join("\n");
          navigator.clipboard.writeText(text);
        },
      }),
      el("button", {
        className: "flc-cta primary",
        textContent: "Open in analyzer →",
        onclick: () => {
          const url = new URL(SITE_URL);
          if (lastText) url.searchParams.set("sample", lastText.slice(0, 1500));
          window.open(url.toString(), "_blank", "noopener");
        },
      }),
    ]);
    panel.appendChild(footer);
  }

  function closePanel() {
    const host = document.getElementById("flc-host");
    if (host) host.remove();
    window.__flcInjected = false;
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "flc:start") {
      lastText = msg.text || "";
      renderLoading();
    } else if (msg.type === "flc:result") {
      lastText = msg.text || lastText;
      renderResult(msg.result);
    } else if (msg.type === "flc:error") {
      renderError(msg.message);
    }
  });
})();
