import type { Metadata } from "next";
import WordleGame from "@/components/WordleGame";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "French Wordle — devine le mot du jour";
const DESCRIPTION =
  "Play a daily French Wordle. Guess the 5-letter word in 6 tries. Free, no signup, accents not required.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/jeu` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/jeu`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Game",
  name: "French Wordle",
  url: `${SITE_URL}/jeu`,
  applicationCategory: "Game",
  inLanguage: "fr",
  description: DESCRIPTION,
};

export default function JeuPage() {
  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest ink-faint">
            Le jeu
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold ink-strong mt-1">
            French Wordle
          </h1>
          <p className="ink-soft mt-2 text-sm max-w-md mx-auto">
            Devine le mot français de 5 lettres en 6 essais. Un mot par jour,
            ou mode aléatoire à volonté.
          </p>
        </header>

        <WordleGame />

        <div className="mt-12 max-w-md mx-auto tactile-card p-5 text-sm">
          <h2 className="text-xs uppercase tracking-wider ink-faint mb-2">
            Règles
          </h2>
          <ul className="space-y-1.5 ink-soft">
            <li>
              <span style={{ color: "#3f9d4a" }}>■</span> Vert : bonne lettre, bonne place.
            </li>
            <li>
              <span style={{ color: "#d97706" }}>■</span> Orange : bonne lettre, mauvaise place.
            </li>
            <li>
              <span className="ink-faint">■</span> Gris : la lettre n’y est pas.
            </li>
            <li>Les accents ne comptent pas — tapez « cafe » pour « café ».</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Link href="/mot-du-jour" className="hover:underline ink-soft text-sm">
            Voir le mot du jour →
          </Link>
        </div>
      </div>
    </main>
  );
}
