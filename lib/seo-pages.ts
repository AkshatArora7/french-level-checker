export type SeoFaq = { q: string; a: string };

export type SeoPage = {
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Short keyword used in copy + breadcrumbs */
  keyword?: string;
  /** Optional FAQ block rendered on the page + as FAQPage JSON-LD */
  faqs?: SeoFaq[];
  /** Other slugs from SEO_PAGES that we should cross-link to */
  related?: string[];
  /** Long-form body (markdown-ish: ## headings, paragraphs) */
  body?: string;
};

const ANALYZER_FAQ: SeoFaq[] = [
  {
    q: "Is the tool really free?",
    a: "Yes. No signup, no credit card, no usage limit beyond a 3,000-character cap per analysis. The tool is funded by optional affiliate links on the Resources page.",
  },
  {
    q: "How is the CEFR level decided?",
    a: "We send the text to a large language model with a strict CEFR rubric that scores vocabulary frequency, grammar complexity, register, and topic abstraction, then forces a single A1–C2 verdict.",
  },
  {
    q: "How accurate is it for short snippets?",
    a: "For texts under 50 words the rating can be off by one level either side. For a full paragraph it is usually within half a level of a human DELF examiner.",
  },
  {
    q: "Does it store the text I paste?",
    a: "No. The request goes to the model and the response goes back to your browser. We do not log or save the body of analysed texts.",
  },
];

export const SEO_PAGES: Record<string, SeoPage> = {
  /* ───────────── core analyzer framings ───────────── */

  "cefr-checker": {
    h1: "French CEFR Checker",
    title: "Free French CEFR Checker — Test Any Text's Level (A1–C2)",
    description:
      "Check the CEFR level (A1–C2) of any French text. Free, no signup. AI-powered, used by 30,000+ learners.",
    intro:
      "Paste any French text below to find out its exact CEFR level (A1 to C2), see which words and grammar push the level up, and get an easier rewrite at one level below.",
    keyword: "CEFR checker",
    faqs: ANALYZER_FAQ,
    related: ["french-text-analyzer", "french-reading-level", "french-cefr-test", "french-difficulty-checker"],
  },

  "french-text-analyzer": {
    h1: "French Text Analyzer",
    title: "French Text Analyzer — CEFR Level, Grammar, Vocabulary",
    description:
      "Analyze any French text: CEFR level, key grammar features, difficult vocabulary, and an easier rewrite. Free.",
    intro:
      "Drop any French text in to see its CEFR level, the grammar features that make it hard, the vocabulary you might not know, and a simpler version at one level below.",
    keyword: "French text analyzer",
    faqs: ANALYZER_FAQ,
    related: ["cefr-checker", "french-readability-score", "french-vocabulary-extractor"],
  },

  "french-reading-level": {
    h1: "French Reading Level Analyzer",
    title: "French Reading Level Analyzer — Free CEFR Tool",
    description:
      "Analyze the reading level of any French text. Get CEFR rating, difficult-word breakdown, and a simpler rewrite.",
    intro:
      "Trying to find French reading material at your level? Paste any text here and we'll tell you exactly how hard it is and which words to learn first.",
    keyword: "French reading level",
    related: ["cefr-checker", "french-text-analyzer", "french-readability-score"],
  },

  "french-difficulty-checker": {
    h1: "French Text Difficulty Checker",
    title: "French Text Difficulty Checker — Free CEFR Tool",
    description:
      "Measure how hard a French text is. Free CEFR rating, difficult-word list, and a simpler rewrite at one level below.",
    intro:
      "Wondering if a French article is too hard for you? Paste it below for an instant difficulty rating and a simpler version you can actually read.",
    keyword: "French difficulty",
    related: ["cefr-checker", "french-text-analyzer"],
  },

  "french-cefr-test": {
    h1: "French CEFR Test (Text-Based)",
    title: "French CEFR Test — Analyze Any Text Instantly",
    description:
      "Test the CEFR level of any French text instantly. Free, AI-powered, no signup.",
    intro:
      "Not a multiple-choice quiz — paste real French (an article, a song lyric, your own writing) and get its CEFR level with reasoning.",
    keyword: "CEFR test",
    related: ["cefr-checker", "french-text-analyzer", "delf-b1-sample-text"],
  },

  "french-readability-score": {
    h1: "French Readability Score",
    title: "French Readability Score — Free CEFR Reading Difficulty Tool",
    description:
      "Get a readability score for any French text on the CEFR scale (A1–C2), plus the vocabulary and grammar that push the score up.",
    intro:
      "A real readability score for French — built on the CEFR scale instead of English-only formulas like Flesch–Kincaid. Paste a paragraph to get a level, a confidence number, and a per-word breakdown.",
    keyword: "French readability",
    related: ["french-reading-level", "cefr-checker", "french-text-analyzer"],
  },

  "french-sentence-simplifier": {
    h1: "French Sentence Simplifier",
    title: "French Sentence Simplifier — Rewrite at A1, A2, B1 or B2",
    description:
      "Paste a hard French sentence and get a simpler version at one CEFR level below — perfect for teachers, parents, and self-learners.",
    intro:
      "Some French sentences are too dense to learn from. Drop one in below and the tool will rewrite it one CEFR level easier without changing the meaning.",
    keyword: "French simplifier",
    related: ["french-text-simplifier-ai", "cefr-checker", "french-text-analyzer"],
  },

  "french-text-simplifier-ai": {
    h1: "AI French Text Simplifier",
    title: "AI French Text Simplifier — One Click, One Level Easier",
    description:
      "Use AI to rewrite any French text at one CEFR level below — same meaning, simpler vocabulary and grammar.",
    intro:
      "Built for learners and teachers: paste a complex French passage and get a simpler version aimed at the next CEFR level down. Includes a per-word difficulty breakdown so you know what changed and why.",
    keyword: "AI French simplifier",
    related: ["french-sentence-simplifier", "cefr-checker"],
  },

  "french-vocabulary-extractor": {
    h1: "French Vocabulary Extractor",
    title: "French Vocabulary Extractor — Pull the Hard Words from Any Text",
    description:
      "Paste a French text and get a clean list of the difficult words with translations, CEFR levels, and short usage notes.",
    intro:
      "Stop scrolling through articles with a dictionary open. This tool pulls every word above your target level out into a tidy study list with English glosses.",
    keyword: "vocabulary extractor",
    related: ["french-text-analyzer", "cefr-checker", "french-grammar-checker-cefr"],
  },

  "french-grammar-checker-cefr": {
    h1: "French Grammar Difficulty Checker",
    title: "French Grammar Difficulty Checker — Which CEFR Level Does It Use?",
    description:
      "Find out which CEFR-level grammar a French text actually uses: subjunctive, conditional, passé simple, gerund, and more.",
    intro:
      "Some texts look A2 but quietly slip in B2 grammar. Paste yours below and see exactly which grammar features appear and what CEFR level each one belongs to.",
    keyword: "French grammar level",
    related: ["french-text-analyzer", "cefr-checker"],
  },

  "translate-french-text-level": {
    h1: "Translate French Text and Check Its Level",
    title: "Translate French Text + Check Its CEFR Level (Free)",
    description:
      "Get the CEFR level (A1–C2) of any French text and an English-glossed list of every difficult word.",
    intro:
      "Two tools in one: a CEFR level for the passage as a whole, and an English translation for each hard word so you can read the text without leaving the page.",
    keyword: "translate French",
    related: ["french-vocabulary-extractor", "cefr-checker"],
  },

  "check-french-homework-level": {
    h1: "Check the Level of Your French Homework",
    title: "Check the CEFR Level of Your French Homework — Free",
    description:
      "Paste your French homework or assignment and instantly see whether it really matches the level you're aiming for (A1, A2, B1, B2, C1, or C2).",
    intro:
      "Wrote a French essay for school? Paste it below to confirm it actually hits the CEFR level your teacher asked for — and see exactly which sentences are too simple or too advanced.",
    keyword: "French homework level",
    related: ["french-text-analyzer", "cefr-checker", "is-this-french-b1"],
  },

  /* ───────────── "is this X" framings ───────────── */

  "is-this-french-a1": {
    h1: "Is This French A1 Level?",
    title: "Is This Text A1 French? Free Level Checker",
    description:
      "Check if a French text is at A1 (beginner) level. Free, instant, no signup.",
    intro:
      "A1 French uses only the present tense, ~500 common words, and concrete topics. Paste a text below to see if it matches A1 — or if it's secretly A2.",
    keyword: "A1 French",
    related: ["cefr-checker", "is-this-french-a2"],
  },
  "is-this-french-a2": {
    h1: "Is This French A2 Level?",
    title: "Is This Text A2 French? Free Level Checker",
    description:
      "Check if a French text is at A2 (elementary) level. Free, no signup.",
    intro:
      "A2 French means you can handle simple, everyday topics in the past and present. Paste a text to see if it matches A2 — or if it's secretly harder.",
    keyword: "A2 French",
    related: ["cefr-checker", "is-this-french-b1", "delf-a2-sample-text"],
  },
  "is-this-french-b1": {
    h1: "Is This French B1 Level?",
    title: "Is This Text B1 French? Free Level Checker",
    description:
      "Find out if a French text is at B1 level (intermediate). Free instant analysis.",
    intro:
      "B1 is the intermediate French level — you can hold a conversation, read simple articles, and handle most everyday situations. Paste a text to check if it matches B1.",
    keyword: "B1 French",
    related: ["cefr-checker", "is-this-french-b2", "delf-b1-sample-text"],
  },
  "is-this-french-b2": {
    h1: "Is This French B2 Level?",
    title: "Is This Text B2 French? Free Level Checker",
    description:
      "Check if a French text is at B2 (upper-intermediate) level. Free instant analysis.",
    intro:
      "B2 French covers abstract topics, opinions, and complex grammar like the subjunctive and conditional. Paste a text to confirm if it's really B2.",
    keyword: "B2 French",
    related: ["cefr-checker", "is-this-french-c1", "delf-b2-sample-text"],
  },
  "is-this-french-c1": {
    h1: "Is This French C1 Level?",
    title: "Is This Text C1 French? Free Level Checker",
    description:
      "Check if a French text is at C1 (advanced) level. Free, AI-powered.",
    intro:
      "C1 French handles long complex texts with implicit meaning, idioms, and even literary tenses. Paste a text below to see if it really sits at C1.",
    keyword: "C1 French",
    related: ["cefr-checker", "is-this-french-c2", "dalf-c1-sample-text"],
  },
  "is-this-french-c2": {
    h1: "Is This French C2 Level?",
    title: "Is This Text C2 French? Free Level Checker",
    description:
      "Check if a French text is at C2 (mastery) level. Free, AI-powered.",
    intro:
      "C2 is effective native mastery. Paste a text below to see whether it really belongs at C2 — most published prose actually tops out at C1.",
    keyword: "C2 French",
    related: ["cefr-checker", "is-this-french-c1"],
  },

  /* ───────────── DELF/DALF sample-text framings ───────────── */

  "delf-a2-sample-text": {
    h1: "DELF A2 Sample Text Checker",
    title: "DELF A2 Sample Text Checker — Match the Real Exam Level",
    description:
      "Paste any French text and see if it matches the DELF A2 exam difficulty (CEFR A2).",
    intro:
      "DELF A2 reading passages are short, present/past-tense, everyday topics. Use this tool to check whether a text you're studying is at the real exam level.",
    keyword: "DELF A2",
    related: ["is-this-french-a2", "cefr-checker"],
  },
  "delf-b1-sample-text": {
    h1: "DELF B1 Sample Text Checker",
    title: "DELF B1 Sample Text Checker — Match the Real Exam Level",
    description:
      "Paste any French text and see if it matches the DELF B1 exam difficulty (CEFR B1).",
    intro:
      "DELF B1 reading passages run 300–500 words on everyday topics with simple opinion and narrative. Paste a candidate text below to confirm the level.",
    keyword: "DELF B1",
    related: ["is-this-french-b1", "cefr-checker"],
  },
  "delf-b2-sample-text": {
    h1: "DELF B2 Sample Text Checker",
    title: "DELF B2 Sample Text Checker — Match the Real Exam Level",
    description:
      "Paste any French text and see if it matches the DELF B2 exam difficulty (CEFR B2).",
    intro:
      "DELF B2 reading passages are opinion articles with abstract topics and complex grammar (subjunctive, conditional, gerund). Paste yours below to confirm.",
    keyword: "DELF B2",
    related: ["is-this-french-b2", "cefr-checker"],
  },
  "dalf-c1-sample-text": {
    h1: "DALF C1 Sample Text Checker",
    title: "DALF C1 Sample Text Checker — Match the Real Exam Level",
    description:
      "Paste any French text and see if it matches the DALF C1 exam difficulty (CEFR C1).",
    intro:
      "DALF C1 reading passages assume implicit meaning, idiom recognition, and ease with complex sentences. Paste a text below to confirm it sits at C1.",
    keyword: "DALF C1",
    related: ["is-this-french-c1", "cefr-checker"],
  },

  /* ───────────── question-phrased landing pages (search intent) ───────────── */

  "what-cefr-level-is-this-french-text": {
    h1: "What CEFR Level Is This French Text?",
    title: "What CEFR Level Is This French Text? — Free Checker",
    description:
      "Paste any French text and get the exact CEFR level (A1–C2), with reasoning.",
    intro:
      "Search for 'what level is this French' brings most people here. Paste your text below and you'll get a single A1–C2 verdict plus the words and grammar that drive it.",
    keyword: "what CEFR level",
    related: ["cefr-checker", "french-text-analyzer"],
  },
  "how-hard-is-this-french-text": {
    h1: "How Hard Is This French Text?",
    title: "How Hard Is This French Text? — Free CEFR Difficulty Tool",
    description:
      "Find out how difficult any French text is on the CEFR scale, with a per-word breakdown.",
    intro:
      "A simple question deserves a simple answer. Drop your French text in and get a clear CEFR level, a confidence score, and the specific words and grammar that make it hard.",
    keyword: "how hard is French",
    related: ["french-difficulty-checker", "cefr-checker"],
  },
  "rewrite-french-text-easier": {
    h1: "Rewrite French Text in Easier French",
    title: "Rewrite French Text in Easier French — Free AI Tool",
    description:
      "Get any French text rewritten at one CEFR level below — same meaning, simpler words and grammar.",
    intro:
      "Pick any French text and the tool will rewrite it one CEFR level easier so you can actually read it. Useful for teachers, parents, and self-learners stuck on hard material.",
    keyword: "rewrite French easier",
    related: ["french-sentence-simplifier", "french-text-simplifier-ai"],
  },
};

export const SEO_SLUGS = Object.keys(SEO_PAGES);
