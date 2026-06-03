import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { EXTENSION_VERSION } from "@/lib/extension-version";

const TITLE = `Extension changelog — French Level Checker`;
const DESCRIPTION =
  "Release notes for every version of the French Level Checker Chrome extension.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/extension/changelog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/extension/changelog`,
    siteName: SITE_NAME,
  },
};

type Release = {
  version: string;
  date: string;
  highlights: string[];
};

const RELEASES: Release[] = [
  {
    version: "1.2.0",
    date: "2026-06-03",
    highlights: [
      "New: floating selection bubble on any page (opt-in) with Analyze / Speak / Save shortcuts",
      "New: flashcard study mode for your saved words — press Space to flip, arrows to navigate",
      "New: ‘Speak French’ context menu and Alt+Shift+S keyboard shortcut",
      "New: Wiktionary lookup button on every word row",
      "New: toolbar badge counts saved words above your target level",
      "UI: full rebrand to emerald green to match the website",
      "UI: minimal flat design — white surfaces, subtle borders, no heavy shadows",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-05-29",
    highlights: [
      "New: Alt+Shift+F keyboard shortcut analyzes selection (or the whole page)",
      "New: tabbed popup — Analyze / History / Saved / Settings",
      "New: ‘Whole page’ analyze button and right-click menu",
      "New: per-word fr-FR text-to-speech and ⭐ save buttons",
      "New: Saved words tab with Anki-friendly CSV export",
      "New: target CEFR level setting — only flag words above your level",
      "New: in-page floating card is now draggable and remembers its position",
      "New: ‘Open in analyzer’ button deep-links to the website with your text pre-filled",
      "New: history of the last 20 analyses, click to restore",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-24",
    highlights: [
      "Initial release — right-click any French text to see its CEFR level (A1–C2), difficult words, and a simpler version.",
      "Paste-in popup for ad-hoc analysis.",
    ],
  },
];

export default function ExtensionChangelogPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <p className="text-xs mb-3" style={{ color: "var(--ink-faint)" }}>
          <Link href="/extension" className="hover:underline">
            ← Back to extension
          </Link>
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
          style={{
            fontFamily: "var(--font-poppins), system-ui",
            letterSpacing: "-0.02em",
          }}
        >
          Extension changelog
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--ink-soft)" }}>
          Current version:{" "}
          <span
            className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
            }}
          >
            v{EXTENSION_VERSION}
          </span>
        </p>

        <ol className="space-y-10 list-none p-0">
          {RELEASES.map((r) => (
            <li key={r.version}>
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-poppins), system-ui",
                    color: "var(--ink)",
                  }}
                >
                  v{r.version}
                </h2>
                <span
                  className="text-xs"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {r.date}
                </span>
                {r.version === EXTENSION_VERSION && (
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <ul className="space-y-2 text-sm leading-relaxed">
                {r.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                      •
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
