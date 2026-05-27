"use client";

/**
 * NewsletterSignup — lightweight email capture.
 *
 * For now we store the captured address in localStorage so nothing leaks while
 * the production list (ConvertKit / Beehiiv / Buttondown) is being set up.
 * When the partner is chosen, replace the `submit` body with a POST to the
 * relevant API endpoint and remove the localStorage write.
 */

import { useState } from "react";

type Variant = "card" | "inline";

export default function NewsletterSignup({
  title = "Weekly French level tips",
  blurb = "One short email a week: a level-graded reading recommendation, a tricky grammar point, and a learner Q&A. No spam, unsubscribe anytime.",
  variant = "card",
}: {
  title?: string;
  blurb?: string;
  variant?: Variant;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    setError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setState("err");
      setError("That email address doesn't look right.");
      return;
    }
    try {
      // Persist locally until the production list provider is wired up.
      const existing = JSON.parse(
        localStorage.getItem("flc-newsletter") || "[]"
      ) as string[];
      if (!existing.includes(trimmed)) existing.push(trimmed);
      localStorage.setItem("flc-newsletter", JSON.stringify(existing));
      setState("ok");
      setEmail("");
    } catch {
      setState("err");
      setError("Something went wrong — try again in a moment.");
    }
  }

  if (state === "ok") {
    return (
      <div
        className={
          variant === "card"
            ? "tactile-card p-5 text-sm ink-strong"
            : "text-sm ink-strong"
        }
      >
        ✅ You&apos;re on the list. First email arrives Monday.
      </div>
    );
  }

  return (
    <div
      className={
        variant === "card" ? "tactile-card p-5 sm:p-6" : "border-t pt-5 mt-6"
      }
    >
      <p className="font-semibold ink-strong">{title}</p>
      <p className="ink-soft text-sm mt-1 mb-3">{blurb}</p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="flc-newsletter-email">
          Email address
        </label>
        <input
          id="flc-newsletter-email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md text-sm tactile-inset"
          style={{ color: "var(--ink)" }}
          disabled={state === "saving"}
        />
        <button
          type="submit"
          disabled={state === "saving"}
          className="tactile-button px-4 py-2 text-sm font-semibold whitespace-nowrap disabled:opacity-50"
          style={{ color: "var(--accent-ink)" }}
        >
          {state === "saving" ? "…" : "Subscribe"}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-xs" style={{ color: "#c4302b" }}>
          {error}
        </p>
      )}
      <p className="ink-faint text-[11px] mt-2">
        We will never sell your address. Powered by — pending — list provider.
      </p>
    </div>
  );
}
