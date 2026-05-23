import TextAnalyzer from "@/components/TextAnalyzer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">French Level Checker</h1>
        <p className="text-gray-600 mb-8">
          Paste any French text. Get its CEFR level (A1-C2), see what makes it difficult,
          and get a simpler version. Free, no signup.
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
      </div>
    </main>
  );
}
