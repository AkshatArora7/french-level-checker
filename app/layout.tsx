import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { SkinProvider } from "@/components/SkinProvider";
import { SoundProvider } from "@/components/SoundProvider";
import { VocabProvider } from "@/components/VocabProvider";
import SiteNav from "@/components/SiteNav";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free CEFR Checker for French`,
    template: `%s`,
  },
  description:
    "Paste any French text and get its CEFR level (A1-C2), the words and grammar that make it hard, and a simpler version you can actually read. Free, no signup, instant.",
  openGraph: {
    title: `${SITE_NAME} — Free CEFR Checker for French`,
    description:
      "Paste any French text and get its CEFR level (A1-C2), the words and grammar that make it hard, and a simpler version you can actually read. Free, no signup.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Paste any French text and get its CEFR level (A1-C2), the words and grammar that make it hard, and a simpler version you can actually read. Free, no signup.",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/blog/feed.xml`,
    },
  },
  verification: {
    // Paste your Search Console verification code here (Settings → Verification → HTML tag)
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// Inline script: read the saved skin BEFORE first paint so we don't flash the default.
const skinBootstrap = `
(function(){try{var s=localStorage.getItem('flc-skin');if(s==='aatech'||s==='cafe'||s==='atelier'||s==='metro'){document.documentElement.setAttribute('data-skin',s)}else{document.documentElement.setAttribute('data-skin','aatech')}}catch(e){document.documentElement.setAttribute('data-skin','aatech')}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-skin="aatech"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skinBootstrap }} />
        {ADSENSE_CLIENT && (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {ADSENSE_CLIENT && (
          <Script
            id="adsense-loader"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
        <SkinProvider>
          <SoundProvider>
            <VocabProvider>
              <SiteNav />
              <div className="h-14 sm:h-16" aria-hidden />
              {children}
              <footer
                className="mt-auto"
                style={{
                  background: "color-mix(in srgb, var(--ink) 96%, transparent)",
                  color: "color-mix(in srgb, var(--accent-ink) 80%, var(--ink-faint))",
                }}
              >
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 60%, transparent), transparent)",
                  }}
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                    <div className="max-w-sm">
                      <Link href="/" className="inline-flex items-center gap-2 group">
                        <span
                          className="text-xl font-bold tracking-tight"
                          style={{ fontFamily: "var(--font-poppins), system-ui", color: "#fff" }}
                        >
                          FLC
                        </span>
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                          style={{ background: "var(--accent)" }}
                        />
                      </Link>
                      <p className="text-sm leading-relaxed mt-3 opacity-70">
                        French CEFR level checker, daily Wordle, daily word, and a personal
                        vocabulary trainer. Free, no signup.
                      </p>
                    </div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">Analyser</Link>
                      <Link href="/jeu" className="opacity-70 hover:opacity-100 transition-opacity">Wordle</Link>
                      <Link href="/mot-du-jour" className="opacity-70 hover:opacity-100 transition-opacity">Mot du jour</Link>
                      <Link href="/vocab" className="opacity-70 hover:opacity-100 transition-opacity">Carnet</Link>
                      <Link href="/learn" className="opacity-70 hover:opacity-100 transition-opacity">Apprendre</Link>
                      <Link href="/blog" className="opacity-70 hover:opacity-100 transition-opacity">Blog</Link>
                      <Link href="/extension" className="opacity-70 hover:opacity-100 transition-opacity">Extension</Link>
                      <Link href="/privacy" className="opacity-70 hover:opacity-100 transition-opacity">Privacy</Link>
                    </nav>
                  </div>
                  <div
                    className="mt-10 pt-6 text-xs opacity-60 flex flex-wrap items-center justify-between gap-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span>© {new Date().getFullYear()} {SITE_NAME}</span>
                    <span>Built with Next.js, Tailwind & Motion</span>
                  </div>
                </div>
              </footer>
              <Analytics />
            </VocabProvider>
          </SoundProvider>
        </SkinProvider>
      </body>
    </html>
  );
}
