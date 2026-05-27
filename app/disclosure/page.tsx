import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Affiliate Disclosure — ${SITE_NAME}`,
  description:
    "How French Level Checker is funded, which links are affiliate links, and what that means for you.",
  alternates: { canonical: `${SITE_URL}/disclosure` },
};

export default function Disclosure() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Disclosure" }]} />
        <h1 className="text-4xl font-bold ink-strong">Affiliate disclosure</h1>
        <p className="ink-soft leading-relaxed">
          {SITE_NAME} is free to use. To stay that way without ads, the site
          earns a small commission when readers sign up to certain partners
          through the recommendations on the{" "}
          <Link href="/resources" className="underline">
            Resources page
          </Link>
          .
        </p>
        <p className="ink-soft leading-relaxed">
          We only recommend products we have personally used or that have a
          long-standing reputation among serious French learners. Links flagged
          as <em>affiliate</em> are tagged with <code>rel=&quot;sponsored&quot;</code> in
          the HTML for full transparency with both readers and search engines.
        </p>
        <p className="ink-soft leading-relaxed">
          You always pay the same price as you would going to the partner
          directly. Removing or replacing affiliate links never changes editorial
          ranking — the order on the Resources page reflects how useful we
          believe each product is for the targeted CEFR level.
        </p>
        <p className="ink-soft leading-relaxed">
          Questions? Email{" "}
          <a href="mailto:hello@aatechax.com" className="underline">
            hello@aatechax.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
