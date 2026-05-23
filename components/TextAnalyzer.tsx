"use client";

import { useState } from "react";

type AnalysisResult = {
  level: string;
  confidence: number;
  summary: string;
  difficult_words: Array<{ word: string; translation: string; level: string; note: string }>;
  grammar_features: Array<{ feature: string; example: string; level: string }>;
  simpler_version: string | null;
};

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    if (!text.trim()) return;
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
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste any French text here..."
        className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
        maxLength={3000}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{text.length}/3000</span>
        <button
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Check Level"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-5xl font-bold">{result.level}</span>
            <span className="text-gray-600">{result.confidence}% confidence</span>
          </div>
          <p className="mb-6">{result.summary}</p>

          {result.difficult_words.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Difficult words</h3>
              <ul className="space-y-1">
                {result.difficult_words.map((w, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-mono font-semibold">{w.word}</span>
                    <span className="text-gray-600"> — {w.translation}</span>
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                      {w.level}
                    </span>
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
                    <span className="text-gray-600"> — &quot;{g.example}&quot;</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.simpler_version && (
            <div>
              <h3 className="font-semibold mb-2">Simpler version</h3>
              <p className="italic">{result.simpler_version}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
