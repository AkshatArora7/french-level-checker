import type { Metadata } from "next";
import VocabPageClient from "./VocabPageClient";

export const metadata: Metadata = {
  title: "Your French Vocabulary — French Level Checker",
  description:
    "Saved French words from your analyses, with built-in spaced-repetition review. Local-only — your list stays in your browser.",
  robots: { index: false, follow: false },
};

export default function VocabPage() {
  return <VocabPageClient />;
}
