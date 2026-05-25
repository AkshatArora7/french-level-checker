import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "Privacy Policy — French Level Checker";
const DESCRIPTION =
  "What data the French Level Checker website and Chrome extension collect, and what we do with it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "May 24, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold tracking-tight mt-10 mb-3"
      style={{
        color: "var(--ink)",
        fontFamily: "var(--font-poppins), system-ui",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="leading-relaxed"
      style={{ color: "var(--ink-soft)" }}
    >
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--ink-faint)" }}
          >
            Privacy
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mt-1"
            style={{
              fontFamily: "var(--font-poppins), system-ui",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--ink-faint)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <P>
          This policy covers the {SITE_NAME} website at{" "}
          <Link href="/" style={{ color: "var(--accent)" }}>
            {SITE_URL.replace(/^https?:\/\//, "")}
          </Link>{" "}
          and the matching Chrome browser extension (&ldquo;the Service&rdquo;).
          The Service is operated by Akshat Arora.
        </P>

        <H2>Short version</H2>
        <P>
          No account. No tracking cookies. No selling data. Text you submit is
          sent to our analysis API to score its CEFR level and returned to you.
          We don&apos;t store that text. Privacy-preserving traffic counts come
          from Vercel Analytics.
        </P>

        <H2>What we collect</H2>
        <P>
          <strong>Text you submit for analysis.</strong> When you paste text on
          the website or select text via the extension and trigger an analysis,
          the text is sent over HTTPS to our backend (
          <code>/api/analyze</code>) and forwarded to Groq, our language-model
          provider, to produce a CEFR level, difficult-word list, and a simpler
          version. We do <strong>not</strong> persist this text in any database,
          log it to disk, or associate it with you.
        </P>
        <P>
          <strong>Vocabulary saved by you.</strong> If you save words to your
          personal vocabulary list, those entries are stored locally in your
          browser&apos;s <code>localStorage</code> only. They never leave your
          device. Clearing browser data erases them.
        </P>
        <P>
          <strong>Anonymous usage analytics.</strong> The website uses Vercel
          Analytics, which counts page views without cookies and without
          identifying individual users. See{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Vercel&apos;s analytics privacy policy
          </a>{" "}
          for details.
        </P>

        <H2>What we don&apos;t collect</H2>
        <ul
          className="list-disc list-outside ml-5 space-y-1 mt-2"
          style={{ color: "var(--ink-soft)" }}
        >
          <li>We don&apos;t use third-party tracking cookies.</li>
          <li>We don&apos;t fingerprint your browser.</li>
          <li>We don&apos;t require an account, an email, or a password.</li>
          <li>We don&apos;t sell or share your data with advertisers.</li>
          <li>
            The extension only reads page text when you explicitly trigger it
            (via the toolbar icon or context menu) on the active tab.
          </li>
        </ul>

        <H2>Chrome extension permissions</H2>
        <P>
          The extension declares the following permissions, used solely to
          provide the feature you triggered:
        </P>
        <ul
          className="list-disc list-outside ml-5 space-y-1 mt-2"
          style={{ color: "var(--ink-soft)" }}
        >
          <li>
            <code>activeTab</code> / <code>scripting</code>: read the text you
            selected on the current tab when you click the extension or use the
            context menu.
          </li>
          <li>
            <code>contextMenus</code>: add the &ldquo;Check French level&rdquo;
            right-click option.
          </li>
          <li>
            <code>storage</code>: remember small UI preferences (e.g. last
            result) on your device.
          </li>
          <li>
            <code>host_permissions</code> (this site only): send the selected
            text to the analysis API at this site.
          </li>
        </ul>

        <H2>Data transfer to Groq</H2>
        <P>
          The analysis is produced by <strong>Groq</strong> (
          <a
            href="https://groq.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Groq privacy policy
          </a>
          ). The text you submit is forwarded to Groq&apos;s API for inference.
          Per Groq&apos;s policy at the time of writing, requests are not used
          to train their models.
        </P>

        <H2>Children</H2>
        <P>
          The Service is intended for general audiences and is not directed at
          children under 13. We don&apos;t knowingly collect data from children.
        </P>

        <H2>Changes to this policy</H2>
        <P>
          If this policy changes meaningfully, the &ldquo;Last updated&rdquo;
          date above will change. Changes are not retroactive.
        </P>

        <H2>Contact</H2>
        <P>
          Questions? Email{" "}
          <a
            href="mailto:akshat.arora456@gmail.com"
            style={{ color: "var(--accent)" }}
          >
            akshat.arora456@gmail.com
          </a>
          .
        </P>

        <div
          className="mt-12 pt-6 text-sm"
          style={{ borderTop: "1px solid var(--border)", color: "var(--ink-faint)" }}
        >
          <Link href="/" style={{ color: "var(--accent)" }}>
            ← Back to {SITE_NAME}
          </Link>
        </div>
      </div>
    </main>
  );
}
