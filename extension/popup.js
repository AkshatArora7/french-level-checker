const DEFAULT_API = "https://french.aatechax.com/api/analyze";
const SITE_URL = "https://french.aatechax.com";

const LEVEL_COLORS = {
  A1: ["#a8e6a3", "#3f9d4a"],
  A2: ["#7fd8b8", "#1f8a6b"],
  B1: ["#8ec6ff", "#2b6cb0"],
  B2: ["#a99dff", "#4338ca"],
  C1: ["#d7a8ff", "#7c3aed"],
  C2: ["#ffb3c1", "#c4302b"],
};

const $ = (id) => document.getElementById(id);

async function getApiUrl() {
  const { apiUrl } = await chrome.storage.sync.get({ apiUrl: DEFAULT_API });
  return apiUrl;
}

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
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

function renderResult(result) {
  const root = $("result");
  root.innerHTML = "";
  root.classList.remove("hidden");

  const [light, dark] = LEVEL_COLORS[result.level] || ["#cbd5e1", "#475569"];

  const medal = el("div", {
    className: "medal",
    textContent: result.level,
    style: { background: `radial-gradient(circle at 30% 25%, ${light} 0%, ${dark} 80%)` },
  });
  root.appendChild(medal);

  root.appendChild(el("div", { className: "confidence", textContent: `${result.confidence}% confidence` }));
  root.appendChild(el("p", { className: "summary", textContent: result.summary }));

  if (result.difficult_words?.length) {
    root.appendChild(el("div", { className: "section-label", textContent: "Difficult words" }));
    const ul = el("ul", { className: "word-list" });
    for (const w of result.difficult_words) {
      const [, d] = LEVEL_COLORS[w.level] || ["#cbd5e1", "#475569"];
      const li = el("li");
      li.appendChild(el("span", { className: "word", textContent: w.word }));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(el("span", { className: "trans", textContent: "— " + w.translation }));
      li.appendChild(el("span", { className: "lvl", textContent: w.level, style: { background: d } }));
      ul.appendChild(li);
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
    root.appendChild(el("div", { className: "section-label", textContent: "Simpler version" }));
    root.appendChild(el("p", { className: "simpler", textContent: result.simpler_version }));
  }
}

async function analyze() {
  const text = $("text").value.trim();
  if (!text) return;
  $("result").classList.add("hidden");
  $("go").disabled = true;
  setStatus("Lecture en cours…");

  try {
    const apiUrl = await getApiUrl();
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Échec de l'analyse");
    clearStatus();
    renderResult(data);
    chrome.storage.session?.set?.({ lastText: text, lastResult: data });
  } catch (e) {
    setStatus(e.message || "Something went wrong", true);
  } finally {
    $("go").disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  $("open-site").href = SITE_URL;
  $("api-url").value = await getApiUrl();

  $("text").addEventListener("input", (e) => {
    $("count").textContent = `${e.target.value.length} / 3000`;
  });
  $("text").addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      analyze();
    }
  });
  $("go").addEventListener("click", analyze);

  $("save-settings").addEventListener("click", async () => {
    const v = $("api-url").value.trim() || DEFAULT_API;
    await chrome.storage.sync.set({ apiUrl: v });
    $("saved").classList.remove("hidden");
    setTimeout(() => $("saved").classList.add("hidden"), 1200);
  });

  // Restore last analysis within the same session if popup is reopened.
  const cached = await chrome.storage.session?.get?.(["lastText", "lastResult"]);
  if (cached?.lastResult) {
    $("text").value = cached.lastText || "";
    $("count").textContent = `${($("text").value).length} / 3000`;
    renderResult(cached.lastResult);
  }
});
