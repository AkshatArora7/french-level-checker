import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { SkinProvider } from "@/components/SkinProvider";
import { SoundProvider } from "@/components/SoundProvider";
import SkinToggle from "@/components/SkinToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free CEFR Level Checker for French Text`,
    template: `%s`,
  },
  description:
    "Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult, and get a simpler version. Free, no signup.",
  openGraph: {
    title: `${SITE_NAME} — Free CEFR Level Checker for French Text`,
    description:
      "Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult, and get a simpler version.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult, and get a simpler version.",
  },
};

// Inline script: read the saved skin BEFORE first paint so we don't flash the default.
const skinBootstrap = `
(function(){try{var s=localStorage.getItem('flc-skin');if(s==='cafe'||s==='atelier'||s==='metro'){document.documentElement.setAttribute('data-skin',s)}else{document.documentElement.setAttribute('data-skin','cafe')}}catch(e){document.documentElement.setAttribute('data-skin','cafe')}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-skin="cafe"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skinBootstrap }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SkinProvider>
          <SoundProvider>
            <SkinToggle />
            {children}
            <footer className="mt-auto py-8 px-8 text-sm ink-faint border-t" style={{ borderColor: "var(--border)" }}>
              <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-between">
                <span>© {new Date().getFullYear()} {SITE_NAME}</span>
                <nav className="flex gap-4">
                  <Link href="/" className="hover:opacity-80">Accueil</Link>
                  <Link href="/blog" className="hover:opacity-80">Blog</Link>
                  <Link href="/cefr-checker" className="hover:opacity-80">CEFR</Link>
                  <Link href="/french-reading-level" className="hover:opacity-80">Lecture</Link>
                </nav>
              </div>
            </footer>
            <Analytics />
          </SoundProvider>
        </SkinProvider>
      </body>
    </html>
  );
}
