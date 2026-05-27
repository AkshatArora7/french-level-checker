/**
 * Lightweight tool framings of the same analyzer. Each tool reuses TextAnalyzer
 * but presents a different intro, FAQ angle, and SEO target.
 */

export type Tool = {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  intro: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "level-checker",
    name: "CEFR Level Checker",
    short: "Get an A1–C2 verdict on any French text.",
    title: "French CEFR Level Checker — Free, Instant",
    description:
      "Paste any French text to get its exact CEFR level (A1–C2), with reasoning and confidence score.",
    intro:
      "The flagship tool: paste any French text and get a single A1–C2 verdict, plus a per-word and per-grammar-feature breakdown.",
  },
  {
    slug: "simplifier",
    name: "Sentence Simplifier",
    short: "Rewrite hard French at one CEFR level below.",
    title: "French Sentence Simplifier — AI-Powered, Free",
    description:
      "Get a French sentence rewritten at one CEFR level below — same meaning, simpler vocabulary and grammar.",
    intro:
      "Hard French sentence in front of you? Drop it in and you'll get the same meaning at one CEFR level easier — perfect for teachers and self-learners.",
  },
  {
    slug: "vocab-extractor",
    name: "Vocabulary Extractor",
    short: "Pull every hard word out of a French text.",
    title: "French Vocabulary Extractor — Free Study List Builder",
    description:
      "Paste a French text and get a clean list of the difficult words with English translations and CEFR levels.",
    intro:
      "Build study lists fast: paste an article and the tool will pull out every word above your level with a translation, CEFR level, and short usage note.",
  },
  {
    slug: "grammar-spotter",
    name: "Grammar Spotter",
    short: "Find which CEFR-level grammar features a text uses.",
    title: "French Grammar Spotter — Identify CEFR Grammar Features",
    description:
      "See exactly which grammar features (subjunctive, conditional, gerund, passé simple…) appear in a French text, and what CEFR level each one belongs to.",
    intro:
      "Some texts look A2 but slip in B2 grammar. Paste yours below and the tool will list every grammar feature it actually uses, with the CEFR level for each.",
  },
  {
    slug: "homework-checker",
    name: "Homework Level Checker",
    short: "Confirm your French essay hits the target level.",
    title: "French Homework Level Checker — Did You Really Write at B1?",
    description:
      "Paste your French essay and see whether it matches the CEFR level your teacher asked for, with concrete suggestions to push it up or down a level.",
    intro:
      "Wrote a French essay aimed at A2/B1/B2? Paste it below to see whether it actually hits that level, and which sentences are too simple or too advanced.",
  },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
