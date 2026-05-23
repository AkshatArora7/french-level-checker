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

  function el(tag, props = {}, children = []) {
    const e = document.createElement(tag);
    Object.assign(e, props);
    if (props.style) Object.assign(e.style, props.style);
    for (const c of children) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return e;
  }

  function ensurePanel() {
    let host = document.getElementById("flc-host");
    if (host) return host.shadowRoot.querySelector(".flc-panel");

    host = document.createElement("div");
    host.id = "flc-host";
    host.style.cssText =
      "all: initial; position: fixed; top: 16px; right: 16px; z-index: 2147483647;";
    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .flc-panel {
        all: initial;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        width: 360px;
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
        padding: 16px;
        animation: flc-in 0.4s cubic-bezier(0.2, 0.9, 0.2, 1.2);
      }
      @keyframes flc-in {
        from { opacity: 0; transform: translateY(-8px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .flc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .flc-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #9a8472; }
      .flc-close {
        all: unset; cursor: pointer; font-size: 18px; color: #6b4f3f; line-height: 1; padding: 4px;
      }
      .flc-close:hover { color: #3a2418; }
      .flc-medal {
        display: flex; align-items: center; justify-content: center;
        width: 80px; height: 80px; margin: 0 auto 12px;
        border-radius: 50%; color: #fff8ee;
        font-weight: 800; font-size: 36px;
        box-shadow:
          0 2px 0 rgba(255, 255, 255, 0.45) inset,
          0 -4px 0 rgba(0, 0, 0, 0.18) inset,
          0 0 0 4px #fbf5e6,
          0 0 0 5px rgba(58, 36, 24, 0.28),
          0 8px 16px rgba(58, 36, 24, 0.18);
        text-shadow: 0 2px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.2);
      }
      .flc-confidence { text-align: center; font-size: 12px; color: #6b4f3f; margin-bottom: 12px; }
      .flc-summary { font-size: 14px; line-height: 1.5; margin: 0 0 12px; }
      .flc-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9a8472; margin: 12px 0 6px; }
      .flc-word-list { margin: 0; padding: 0; list-style: none; font-size: 13px; }
      .flc-word-list li { padding: 4px 0; border-top: 1px solid rgba(58,36,24,0.08); }
      .flc-word-list li:first-child { border-top: none; }
      .flc-word { font-weight: 600; font-family: "SF Mono", Menlo, monospace; }
      .flc-trans { color: #6b4f3f; }
      .flc-lvl-pill {
        display: inline-block; margin-left: 6px; padding: 1px 6px; border-radius: 4px;
        font-size: 10px; font-weight: 600;
      }
      .flc-simpler { background: #fff; padding: 10px; border-radius: 8px; font-style: italic; font-size: 13px; line-height: 1.5; }
      .flc-loading { text-align: center; padding: 20px 0; color: #6b4f3f; font-size: 13px; }
      .flc-spinner {
        width: 32px; height: 32px; margin: 0 auto 12px; border-radius: 50%;
        background: conic-gradient(from 0deg, #c75d3a, #e08a5f, #c75d3a);
        animation: flc-spin 1.2s linear infinite;
      }
      @keyframes flc-spin { to { transform: rotate(360deg); } }
      .flc-err { color: #c4302b; font-size: 13px; padding: 12px; background: rgba(196,48,43,0.08); border-radius: 8px; }
    `;
    shadow.appendChild(style);

    const panel = el("div", { className: "flc-panel" });
    shadow.appendChild(panel);
    document.documentElement.appendChild(host);
    return panel;
  }

  function renderLoading() {
    const panel = ensurePanel();
    panel.innerHTML = "";
    const head = el("div", { className: "flc-head" }, [
      el("span", { className: "flc-title", textContent: "French Level Checker" }),
      el("button", { className: "flc-close", textContent: "×", onclick: () => closePanel() }),
    ]);
    panel.appendChild(head);
    const wrap = el("div", { className: "flc-loading" });
    wrap.appendChild(el("div", { className: "flc-spinner" }));
    wrap.appendChild(el("div", { textContent: "Lecture en cours…" }));
    panel.appendChild(wrap);
  }

  function renderError(msg) {
    const panel = ensurePanel();
    panel.innerHTML = "";
    const head = el("div", { className: "flc-head" }, [
      el("span", { className: "flc-title", textContent: "French Level Checker" }),
      el("button", { className: "flc-close", textContent: "×", onclick: () => closePanel() }),
    ]);
    panel.appendChild(head);
    panel.appendChild(el("div", { className: "flc-err", textContent: msg }));
  }

  function renderResult(result) {
    const panel = ensurePanel();
    panel.innerHTML = "";
    const [light, dark] = LEVEL_COLORS[result.level] || ["#cbd5e1", "#475569"];

    const head = el("div", { className: "flc-head" }, [
      el("span", { className: "flc-title", textContent: "French Level Checker" }),
      el("button", { className: "flc-close", textContent: "×", onclick: () => closePanel() }),
    ]);
    panel.appendChild(head);

    const medal = el("div", {
      className: "flc-medal",
      textContent: result.level,
      style: { background: `radial-gradient(circle at 30% 25%, ${light} 0%, ${dark} 80%)` },
    });
    panel.appendChild(medal);

    panel.appendChild(
      el("div", { className: "flc-confidence", textContent: `${result.confidence}% confidence` })
    );
    panel.appendChild(el("p", { className: "flc-summary", textContent: result.summary }));

    if (result.difficult_words?.length) {
      panel.appendChild(el("div", { className: "flc-section-label", textContent: "Difficult words" }));
      const ul = el("ul", { className: "flc-word-list" });
      for (const w of result.difficult_words) {
        const [, d] = LEVEL_COLORS[w.level] || ["#cbd5e1", "#475569"];
        const li = el("li");
        li.appendChild(el("span", { className: "flc-word", textContent: w.word }));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(el("span", { className: "flc-trans", textContent: "— " + w.translation }));
        const pill = el("span", {
          className: "flc-lvl-pill",
          textContent: w.level,
          style: { background: d, color: "#fff" },
        });
        li.appendChild(pill);
        ul.appendChild(li);
      }
      panel.appendChild(ul);
    }

    if (result.simpler_version) {
      panel.appendChild(el("div", { className: "flc-section-label", textContent: "Simpler version" }));
      panel.appendChild(el("p", { className: "flc-simpler", textContent: result.simpler_version }));
    }
  }

  function closePanel() {
    const host = document.getElementById("flc-host");
    if (host) host.remove();
    window.__flcInjected = false;
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "flc:start") renderLoading();
    else if (msg.type === "flc:result") renderResult(msg.result);
    else if (msg.type === "flc:error") renderError(msg.message);
  });
})();
