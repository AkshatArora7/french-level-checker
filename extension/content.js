(() => {
  if (window.__flcInjected) return;
  window.__flcInjected = true;

  const LEVEL_COLORS = {
    A1: ["#a8e6a3", "#3f9d4a"],
    A2: ["#7fd8b8", "#1f8a6b"],
    B1: ["#8ec6ff", "#2b6cb0"],
    B2: ["#a99dff", "#4338ca"],
    C1: ["#d7a8ff", "#7c3aed"],
    C2: ["#ffb3c1", "#c4302b"],
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        width: 380px;
        max-height: 80vh;
        overflow: auto;
        background: #fbf5e6;
        color: #3a2418;
        border-radius: 16px;
        box-shadow:
          0 1px 0 rgba(255, 248, 235, 0.9) inset,
          0 -2px 0 rgba(58, 36, 24, 0.06) inset,
          0 4px 8px rgba(58, 36, 24, 0.12),
          0 24px 60px rgba(58, 36, 24, 0.32);
        padding: 14px 16px 16px;
        animation: flc-in 0.4s cubic-bezier(0.2, 0.9, 0.2, 1.2);
      }
      @keyframes flc-in {
        from { opacity: 0; transform: translateY(-8px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .flc-head {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 12px; cursor: grab; user-select: none;
      }
      .flc-head:active { cursor: grabbing; }
      .flc-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9a8472; }
      .flc-head-actions { display: flex; gap: 4px; align-items: center; }
      .flc-iconbtn {
        all: unset; cursor: pointer; font-size: 14px; color: #6b4f3f;
        padding: 3px 7px; border-radius: 6px;
      }
      .flc-iconbtn:hover { background: rgba(58,36,24,0.06); color: #3a2418; }
      .flc-close { font-size: 18px; line-height: 1; }
      .flc-medal {
        display: flex; align-items: center; justify-content: center;
        width: 76px; height: 76px; margin: 0 auto 10px;
        border-radius: 50%; color: #fff8ee;
        font-weight: 800; font-size: 32px;
        box-shadow:
          0 2px 0 rgba(255, 255, 255, 0.45) inset,
          0 -4px 0 rgba(0, 0, 0, 0.18) inset,
          0 0 0 4px #fbf5e6,
          0 0 0 5px rgba(58, 36, 24, 0.28),
          0 8px 16px rgba(58, 36, 24, 0.18);
        text-shadow: 0 2px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.2);
      }
      .flc-confidence { text-align: center; font-size: 11px; color: #6b4f3f; margin-bottom: 10px; }
      .flc-summary { font-size: 13px; line-height: 1.5; margin: 0 0 10px; }
      .flc-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #9a8472; margin: 10px 0 4px; }
      .flc-word-list { margin: 0; padding: 0; list-style: none; font-size: 13px; }
      .flc-word-list li {
        padding: 5px 0; border-top: 1px solid rgba(58,36,24,0.08);
        display: flex; justify-content: space-between; align-items: center; gap: 6px;
      }
      .flc-word-list li:first-child { border-top: none; }
      .flc-word-left { flex: 1; min-width: 0; }
      .flc-word-right { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
      .flc-word { font-weight: 600; font-family: "SF Mono", Menlo, monospace; }
      .flc-trans { color: #6b4f3f; font-size: 12px; }
      .flc-lvl-pill {
        display: inline-block; padding: 1px 6px; border-radius: 4px;
        font-size: 10px; font-weight: 700; color: #fff;
      }
      .flc-simpler {
        background: #fff; padding: 10px; border-radius: 8px;
        font-style: italic; font-size: 13px; line-height: 1.5;
        border: 1px solid rgba(58,36,24,0.08);
      }
      .flc-loading { text-align: center; padding: 20px 0; color: #6b4f3f; font-size: 13px; }
      .flc-spinner {
        width: 32px; height: 32px; margin: 0 auto 12px; border-radius: 50%;
        background: conic-gradient(from 0deg, #c75d3a, #e08a5f, #c75d3a);
        animation: flc-spin 1.2s linear infinite;
      }
      @keyframes flc-spin { to { transform: rotate(360deg); } }
      .flc-err { color: #c4302b; font-size: 13px; padding: 12px; background: rgba(196,48,43,0.08); border-radius: 8px; }
      .flc-footer {
        display: flex; gap: 6px; margin-top: 14px;
        justify-content: flex-end; flex-wrap: wrap;
      }
      .flc-cta {
        all: unset; cursor: pointer; font-size: 11px; font-weight: 600;
        padding: 5px 10px; border-radius: 999px;
        background: #fff; border: 1px solid rgba(58,36,24,0.14); color: #3a2418;
      }
      .flc-cta:hover { background: rgba(199,93,58,0.08); }
      .flc-cta.primary {
        background: linear-gradient(180deg, #e08a5f, #c75d3a);
        color: #fff8ee; border: none;
      }
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
      style: { background: `radial-gradient(circle at 30% 25%, ${light} 0%, ${dark} 80%)` },
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
