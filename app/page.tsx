import TextAnalyzer from "@/components/TextAnalyzer";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const faqs = [
  {
    q: "What does the tool actually do?",
    a: "It reads any French text you paste and tells you its CEFR level (A1 to C2), highlights the difficult words and grammar, and rewrites it one level lower.",
  },
  {
    q: "Is it really free?",
    a: "Yes — no signup, no credit card, no limits beyond a 3000-character cap per analysis.",
  },
  {
    q: "How accurate is the level rating?",
    a: "It uses a large language model trained on multilingual text and a strict CEFR rubric. For short texts (under 50 words) it can be off by one level; for paragraphs it's usually right on the money.",
  },
  {
    q: "What can I use it for?",
    a: "Find reading material at your level, check if your own French writing matches the level you're aiming for, build a vocabulary list of words you don't know, or generate easier versions of articles to study.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free tool that analyzes French text and returns its CEFR level (A1-C2), highlights difficult vocabulary and grammar, and produces a simpler version.",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">French Level Checker</h1>
        <p className="text-gray-600 mb-8">
          Paste any French text. Get its CEFR level (A1-C2), see what makes it
          difficult, and get a simpler version. Free, no signup.
        </p>
        <TextAnalyzer />

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Popular checks</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-blue-600">
            <li><Link href="/cefr-checker" className="hover:underline">French CEFR checker</Link></li>
            <li><Link href="/french-reading-level" className="hover:underline">French reading level analyzer</Link></li>
            <li><Link href="/is-this-french-a2" className="hover:underline">Is this French A2?</Link></li>
            <li><Link href="/is-this-french-b1" className="hover:underline">Is this French B1?</Link></li>
            <li><Link href="/is-this-french-b2" className="hover:underline">Is this French B2?</Link></li>
            <li><Link href="/french-text-analyzer" className="hover:underline">French text analyzer</Link></li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">From the blog</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link href="/blog/how-cefr-levels-work-for-french" className="hover:underline">How CEFR levels actually work for French</Link></li>
            <li><Link href="/blog/free-ways-to-find-french-reading-material" className="hover:underline">5 free ways to find French reading material at your level</Link></li>
            <li><Link href="/blog/why-intermediate-french-learners-plateau" className="hover:underline">Why intermediate French learners plateau</Link></li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
          <dl className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border-b pb-4">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="text-gray-700 mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
