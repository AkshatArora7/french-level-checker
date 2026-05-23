export type SeoPage = {
  h1: string;
  title: string;
  description: string;
  intro: string;
};

export const SEO_PAGES: Record<string, SeoPage> = {
  "cefr-checker": {
    h1: "French CEFR Checker",
    title: "Free French CEFR Checker — Test Any Text's Level",
    description:
      "Check the CEFR level (A1-C2) of any French text. Free, no signup. Powered by AI.",
    intro:
      "Paste any French text below to find out its exact CEFR level (A1 to C2), see which words and grammar push the level up, and get an easier rewrite.",
  },
  "is-this-french-b1": {
    h1: "Is This French B1 Level?",
    title: "Is This Text B1 French? Free Level Checker",
    description:
      "Find out if a French text is at B1 level (intermediate). Free instant analysis.",
    intro:
      "B1 is the intermediate French level — you can hold a conversation, read simple articles, and handle most everyday situations. Paste a text to check if it matches B1.",
  },
  "french-reading-level": {
    h1: "French Reading Level Analyzer",
    title: "French Reading Level Analyzer — Free Tool",
    description:
      "Analyze the reading level of any French text. Get CEFR rating and difficult word breakdown.",
    intro:
      "Trying to find French reading material at your level? Paste any text here and we'll tell you exactly how hard it is and which words to learn first.",
  },
  "french-difficulty-checker": {
    h1: "French Text Difficulty Checker",
    title: "French Text Difficulty Checker — Free CEFR Tool",
    description:
      "Measure how hard a French text is. Free CEFR rating, difficult-word list, and simpler rewrite.",
    intro:
      "Wondering if a French article is too hard for you? Paste it below for an instant difficulty rating and a simpler version you can actually read.",
  },
  "french-text-analyzer": {
    h1: "French Text Analyzer",
    title: "French Text Analyzer — CEFR Level, Grammar, Vocabulary",
    description:
      "Analyze any French text: CEFR level, key grammar features, difficult vocabulary, and an easier rewrite.",
    intro:
      "Drop any French text in to see its CEFR level, the grammar features that make it hard, the vocabulary you might not know, and a simpler version at one level below.",
  },
  "is-this-french-a2": {
    h1: "Is This French A2 Level?",
    title: "Is This Text A2 French? Free Level Checker",
    description:
      "Check if a French text is at A2 (elementary) level. Free, no signup.",
    intro:
      "A2 French means you can handle simple, everyday topics in the past and present. Paste a text to see if it matches A2 — or if it's secretly harder.",
  },
  "is-this-french-b2": {
    h1: "Is This French B2 Level?",
    title: "Is This Text B2 French? Free Level Checker",
    description:
      "Check if a French text is at B2 (upper-intermediate) level. Free instant analysis.",
    intro:
      "B2 French covers abstract topics, opinions, and complex grammar like the subjunctive and conditional. Paste a text to confirm if it's really B2.",
  },
  "french-cefr-test": {
    h1: "French CEFR Test (Text-Based)",
    title: "French CEFR Test — Analyze Any Text",
    description:
      "Test the CEFR level of any French text instantly. Free, AI-powered, no signup.",
    intro:
      "Not a multiple-choice quiz — paste real French (an article, a song lyric, your own writing) and get its CEFR level with reasoning.",
  },
};
