import type { Metadata } from "next";
import Link from "next/link";
import DailyWordCard from "@/components/DailyWordCard";
import { dailyWord } from "@/lib/daily";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "Mot du jour — Daily French Word";
const DESCRIPTION =
  "A new French word every day with meaning, an example sentence, and one-tap save to your vocabulary list.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/mot-du-jour` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/mot-du-jour`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Re-render this page on each request so the daily word updates at UTC midnight.
export const dynamic = "force-dynamic";

function frenchDateLabel(d: Date) {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function MotDuJourPage() {
  const today = new Date();
  const word = dailyWord(today);
  const label = frenchDateLabel(today);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest ink-faint">
            Carnet quotidien
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold ink-strong mt-1">
            Mot du jour
          </h1>
          <p className="ink-soft mt-2 text-sm max-w-md mx-auto">
            Un nouveau mot français chaque jour, avec sa traduction et un exemple
            en contexte. Touchez la carte pour la retourner.
          </p>
        </header>

        <DailyWordCard word={word} dateLabel={label} />

        <div className="grid sm:grid-cols-2 gap-3 mt-8">
          <Link
            href="/jeu"
            className="tactile-card p-4 text-center hover:no-underline"
          >
            <p className="text-xs uppercase tracking-wider ink-faint">Jeu</p>
            <p className="ink-strong font-semibold mt-1">French Wordle →</p>
            <p className="ink-faint text-xs mt-1">Devine le mot en 6 essais</p>
          </Link>
          <Link
            href="/vocab"
            className="tactile-card p-4 text-center hover:no-underline"
          >
            <p className="text-xs uppercase tracking-wider ink-faint">Carnet</p>
            <p className="ink-strong font-semibold mt-1">Mon vocabulaire →</p>
            <p className="ink-faint text-xs mt-1">Révision avec répétition espacée</p>
          </Link>
        </div>

        <p className="ink-faint text-xs italic text-center mt-8">
          Un nouveau mot apparaît à minuit (UTC).
        </p>
      </div>
    </main>
  );
}
