import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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
    title: `${SITE_NAME}`,
    description:
      "Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult, and get a simpler version.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="mt-auto py-8 px-8 text-sm text-gray-500 border-t">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-between">
            <span>© {new Date().getFullYear()} French Level Checker</span>
            <nav className="flex gap-4">
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <Link href="/blog" className="hover:text-gray-900">Blog</Link>
              <Link href="/cefr-checker" className="hover:text-gray-900">CEFR</Link>
              <Link href="/french-reading-level" className="hover:text-gray-900">Reading level</Link>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
