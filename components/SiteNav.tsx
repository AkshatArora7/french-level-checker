"use client";

/**
 * Top navigation bar — aatechax-inspired:
 *  - Compact, sticky, transparent until scroll
 *  - Green-dot logo motif that scales on hover
 *  - Sliding-up hover label on each nav link
 *  - Active route gets a colored emerald dot underneath
 *  - Right-side: skin toggle + sound + Install Extension CTA
 *  - Mobile: hamburger drawer
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSkin } from "./SkinProvider";
import { useSound } from "./SoundProvider";
import { useVocab } from "./VocabProvider";
import { SKINS } from "@/lib/skins";

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Analyser" },
  { href: "/jeu", label: "Wordle" },
  { href: "/mot-du-jour", label: "Mot du jour" },
  { href: "/vocab", label: "Carnet" },
  { href: "/learn", label: "Apprendre" },
  { href: "/blog", label: "Blog" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { skin, cycle } = useSkin();
  const { enabled, setEnabled, play } = useSound();
  const vocab = useVocab();
  const current = SKINS.find((s) => s.id === skin)!;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 85%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
            <span
              className="text-base sm:text-lg font-bold tracking-tight"
              style={{ color: "var(--ink)", letterSpacing: "-0.01em" }}
            >
              FLC
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{ background: "var(--accent)" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={isActive(item.href)}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => {
                play("tock");
                cycle();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{ color: "var(--ink-soft)" }}
              aria-label={`Theme: ${current.label}. Click to cycle.`}
              title={`${current.label} — ${current.hint}`}
            >
              <span
                aria-hidden
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{
                  background: current.swatch,
                  boxShadow: "0 0 0 1.5px var(--surface), 0 0 0 2.5px var(--border)",
                }}
              />
              <span className="hidden xl:inline">{current.label}</span>
            </button>

            <button
              onClick={() => {
                setEnabled(!enabled);
                if (!enabled) play("shimmer");
              }}
              className="p-1.5 rounded-md text-xs transition-colors"
              style={{ color: enabled ? "var(--accent)" : "var(--ink-faint)" }}
              aria-label={enabled ? "Sound on" : "Sound off"}
              title={enabled ? "Sound on" : "Sound off"}
            >
              <SoundIcon on={enabled} />
            </button>

            <Link
              href="/extension"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
                boxShadow: "0 1px 2px rgba(5, 150, 105, 0.18), 0 4px 12px -2px rgba(5, 150, 105, 0.28)",
              }}
            >
              <ChromeIcon />
              Install Extension
            </Link>

            {vocab.dueCount > 0 && (
              <Link
                href="/vocab"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: "color-mix(in srgb, var(--accent) 12%, var(--surface))",
                  color: "var(--accent)",
                  border: "1px solid color-mix(in srgb, var(--accent) 24%, transparent)",
                }}
                title={`${vocab.dueCount} word${vocab.dueCount === 1 ? "" : "s"} due for review`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                {vocab.dueCount} due
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            <Link
              href="/extension"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
              }}
            >
              <ChromeIcon size={12} />
              Install
            </Link>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md"
              style={{ color: "var(--ink-soft)" }}
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--bg) 96%, transparent)",
              backdropFilter: "saturate(140%) blur(12px)",
              WebkitBackdropFilter: "saturate(140%) blur(12px)",
            }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
                    style={{
                      color: active ? "var(--accent)" : "var(--ink)",
                      background: active
                        ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                        : "transparent",
                    }}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => {
                    play("tock");
                    cycle();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium"
                  style={{ color: "var(--ink-soft)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: current.swatch }}
                  />
                  {current.label}
                </button>
                <button
                  onClick={() => {
                    setEnabled(!enabled);
                    if (!enabled) play("shimmer");
                  }}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md text-xs"
                  style={{
                    color: enabled ? "var(--accent)" : "var(--ink-faint)",
                    border: "1px solid var(--border)",
                  }}
                  aria-label={enabled ? "Sound on" : "Sound off"}
                >
                  <SoundIcon on={enabled} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 group inline-flex items-center"
      aria-current={active ? "page" : undefined}
    >
      <span
        className="relative overflow-hidden block"
        style={{ height: "1.25rem" }}
      >
        <span
          className="block text-sm font-medium transition-transform duration-300 group-hover:-translate-y-full"
          style={{ color: active ? "var(--accent)" : "var(--ink-soft)" }}
        >
          {label}
        </span>
        <span
          className="absolute top-full left-0 block text-sm font-medium transition-transform duration-300 group-hover:-translate-y-full"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </span>
      </span>
      {active && (
        <span
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
    </Link>
  );
}

function ChromeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {on ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      )}
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </>
      )}
    </svg>
  );
}
