import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "Install the Chrome Extension — French Level Checker";
const DESCRIPTION =
  "Get the French Level Checker as a Chrome extension. Highlight any French text on any webpage to see its CEFR level, difficult words, and a simpler version.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/extension` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/extension`,
    siteName: SITE_NAME,
  },
};

const ZIP_PATH = "/french-level-checker-extension.zip";

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
        style={{
          background: "var(--accent)",
          color: "var(--accent-ink)",
          boxShadow:
            "0 2px 6px -1px color-mix(in srgb, var(--accent) 50%, transparent)",
        }}
      >
        {n}
      </span>
      <div>
        <h3
          className="font-semibold mb-1"
          style={{
            color: "var(--ink)",
            fontFamily: "var(--font-poppins), system-ui",
          }}
        >
          {title}
        </h3>
        <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
          {children}
        </div>
      </div>
    </li>
  );
}

export default function ExtensionPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--accent) 10%, var(--surface))",
              color: "var(--accent)",
              border:
                "1px solid color-mix(in srgb, var(--accent) 24%, transparent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Chrome / Edge / Brave
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
            style={{
              fontFamily: "var(--font-poppins), system-ui",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Install the French Level Checker extension
          </h1>
          <p
            style={{ color: "var(--ink-soft)" }}
            className="leading-relaxed"
          >
            Highlight French text on any webpage to instantly see its CEFR
            level, difficult words, and a simpler version. No signup, no
            tracking.
          </p>
        </div>

        <a
          href={ZIP_PATH}
          download
          className="block w-full text-center rounded-lg px-6 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{
            background: "var(--accent)",
            color: "var(--accent-ink)",
            boxShadow:
              "0 1px 2px rgba(5,150,105,0.2), 0 8px 24px -4px color-mix(in srgb, var(--accent) 40%, transparent)",
          }}
        >
          ⬇ Download Extension (.zip)
        </a>
        <p
          className="text-xs text-center mt-2"
          style={{ color: "var(--ink-faint)" }}
        >
          Then follow the steps below to load it into your browser.
        </p>

        <section className="mt-12">
          <h2
            className="text-xs uppercase tracking-widest mb-5"
            style={{ color: "var(--ink-faint)" }}
          >
            Installation (one-time, ~30 seconds)
          </h2>
          <ol className="space-y-6">
            <Step n={1} title="Unzip the download">
              Right-click the downloaded{" "}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: "var(--surface-2)" }}
              >
                french-level-checker-extension.zip
              </code>{" "}
              and extract it. Keep the resulting folder somewhere stable —
              Chrome loads the extension from this folder, so don&apos;t delete
              it.
            </Step>
            <Step n={2} title="Open the Extensions page">
              In Chrome, Edge, or Brave: paste{" "}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: "var(--surface-2)" }}
              >
                chrome://extensions
              </code>{" "}
              into the address bar (or open the menu → Extensions → Manage
              Extensions).
            </Step>
            <Step n={3} title="Turn on Developer mode">
              Flip the <strong>Developer mode</strong> toggle in the top-right
              of the Extensions page.
            </Step>
            <Step n={4} title="Load the extension">
              Click <strong>Load unpacked</strong> and pick the folder you
              extracted in step 1. The extension appears in your toolbar.
            </Step>
            <Step n={5} title="Pin it (optional)">
              Click the puzzle-piece icon in the toolbar and pin{" "}
              <em>French Level Checker</em> so it&apos;s one click away.
            </Step>
          </ol>
        </section>

        <section
          className="mt-14 p-5 rounded-xl"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="font-semibold mb-2 text-sm"
            style={{ color: "var(--ink)" }}
          >
            How to use it
          </h3>
          <ul
            className="text-sm space-y-1.5"
            style={{ color: "var(--ink-soft)" }}
          >
            <li>
              <span style={{ color: "var(--accent)" }}>•</span> Select any
              French text on a webpage.
            </li>
            <li>
              <span style={{ color: "var(--accent)" }}>•</span> Right-click and
              choose <em>Check French level</em>, or click the toolbar icon.
            </li>
            <li>
              <span style={{ color: "var(--accent)" }}>•</span> See the CEFR
              level, difficult words, and a simpler version in a popup.
            </li>
          </ul>
        </section>

        <section
          className="mt-10 text-sm"
          style={{ color: "var(--ink-soft)" }}
        >
          <details className="group">
            <summary
              className="cursor-pointer font-medium"
              style={{ color: "var(--ink)" }}
            >
              Why isn&apos;t it on the Chrome Web Store?
            </summary>
            <p className="mt-2 leading-relaxed">
              It will be. The Web Store review process takes a few days; until
              then, &ldquo;Load unpacked&rdquo; is the fastest way to try it.
              The source is in the project&apos;s <code>extension/</code>{" "}
              folder.
            </p>
          </details>
          <details className="group mt-3">
            <summary
              className="cursor-pointer font-medium"
              style={{ color: "var(--ink)" }}
            >
              Does it send my text anywhere?
            </summary>
            <p className="mt-2 leading-relaxed">
              The extension sends the selected text to{" "}
              <code>{SITE_URL}/api/analyze</code> to score it — same backend as
              this site. No accounts, no tracking, no storage on our side.
            </p>
          </details>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm"
            style={{ color: "var(--accent)" }}
          >
            ← Back to the analyzer
          </Link>
        </div>
      </div>
    </main>
  );
}
