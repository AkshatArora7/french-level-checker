"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SAMPLES } from "@/lib/samples";

type DifficultWord = {
  word: string;
  translation: string;
  level: string;
  note: string;
};

type AnalysisResult = {
  level: string;
  confidence: number;
  summary: string;
  difficult_words: DifficultWord[];
  grammar_features: Array<{ feature: string; example: string; level: string }>;
  simpler_version: string | null;
};

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-green-100 text-green-800 border-green-300",
  A2: "bg-emerald-100 text-emerald-800 border-emerald-300",
  B1: "bg-blue-100 text-blue-800 border-blue-300",
  B2: "bg-indigo-100 text-indigo-800 border-indigo-300",
  C1: "bg-purple-100 text-purple-800 border-purple-300",
  C2: "bg-rose-100 text-rose-800 border-rose-300",
};

function levelClass(level: string) {
  return LEVEL_COLORS[level] || "bg-gray-100 text-gray-800 border-gray-300";
}

function HighlightedText({
  text,
  difficultWords,
}: {
  text: string;
  difficultWords: DifficultWord[];
}) {
  const lookup = useMemo(() => {
    const m = new Map<string, DifficultWord>();
    for (const w of difficultWords) {
      const key = w.word.toLowerCase().replace(/[.,;:!?"'()]/g, "");
      if (key) m.set(key, w);
    }
    return m;
  }, [difficultWords]);

  const tokens = text.split(/(\s+)/);
  return (
    <p className="leading-relaxed">
      {tokens.map((tok, i) => {
        const clean = tok.toLowerCase().replace(/[.,;:!?"'()]/g, "");
        const hit = lookup.get(clean);
        if (!hit) return <span key={i}>{tok}</span>;
        return (
          <span
            key={i}
            title={`${hit.translation}${hit.note ? " — " + hit.note : ""} (${hit.level})`}
            className={`underline decoration-dotted decoration-2 cursor-help underline-offset-4 ${
              hit.level === "C2" || hit.level === "C1"
                ? "decoration-rose-500"
                : hit.level === "B2" || hit.level === "B1"
                ? "decoration-blue-500"
                : "decoration-emerald-500"
            }`}
          >
            {tok}
          </span>
        );
      })}
    </p>
  );
}

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function analyze() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        analyze();
      }
    }
    const el = textareaRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, loading]);

  function copyResult() {
    if (!result) return;
    const lines = [
      `Level: ${result.level} (${result.confidence}% confidence)`,
      result.summary,
      "",
      "Difficult words:",
      ...result.difficult_words.map(
        (w) => `  ${w.word} — ${w.translation} [${w.level}]`
      ),
      "",
      "Grammar:",
      ...result.grammar_features.map((g) => `  ${g.feature} — "${g.example}"`),
    ];
    if (result.simpler_version) {
      lines.push("", "Simpler version:", result.simpler_version);
    }
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-gray-500 self-center mr-1">
          Try a sample:
        </span>
        {SAMPLES.map((s) => (
          <button
            key={s.label}
            onClick={() => setText(s.text)}
            className={`text-xs px-2 py-1 rounded border ${levelClass(s.level)} hover:opacity-80`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste any French text here... (Cmd/Ctrl+Enter to analyze)"
        className="w-full h-48 p-4 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={3000}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{text.length}/3000</span>
        <button
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Check Level"}
        </button>
      </div>

      {error && (
        <p className="text-red-600 mt-4 p-3 bg-red-50 rounded border border-red-200">
          {error}
        </p>
      )}

      {loading && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 animate-pulse">
          <div className="h-12 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span
                className={`inline-flex items-center justify-center text-4xl font-bold px-4 py-1 rounded-lg border ${levelClass(result.level)}`}
              >
                {result.level}
              </span>
              <span className="text-gray-600">
                {result.confidence}% confidence
              </span>
            </div>
            <button
              onClick={copyResult}
              className="text-xs px-3 py-1.5 border rounded hover:bg-white"
            >
              {copied ? "Copied!" : "Copy result"}
            </button>
          </div>
          <p className="mb-6">{result.summary}</p>

          {result.difficult_words.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">
                Your text (hover the highlighted words)
              </h3>
              <div className="p-3 bg-white border rounded text-sm">
                <HighlightedText
                  text={text}
                  difficultWords={result.difficult_words}
                />
              </div>
            </div>
          )}

          {result.difficult_words.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Difficult words</h3>
              <ul className="space-y-1">
                {result.difficult_words.map((w, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-mono font-semibold">{w.word}</span>
                    <span className="text-gray-600"> — {w.translation}</span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs border ${levelClass(w.level)}`}
                    >
                      {w.level}
                    </span>
                    {w.note && (
                      <span className="text-gray-500 italic"> · {w.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.grammar_features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Grammar features</h3>
              <ul className="space-y-1 text-sm">
                {result.grammar_features.map((g, i) => (
                  <li key={i}>
                    <span className="font-semibold">{g.feature}</span>
                    <span className="text-gray-600">
                      {" "}
                      — &quot;{g.example}&quot;
                    </span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs border ${levelClass(g.level)}`}
                    >
                      {g.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.simpler_version && (
            <div>
              <h3 className="font-semibold mb-2">Simpler version</h3>
              <p className="italic p-3 bg-white border rounded">
                {result.simpler_version}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
