/**
 * Curated resources for French learners. This is a plain editorial list — no
 * affiliate links, no commissions. Update freely as the recommendations evolve.
 *
 * Categories are stable; the order within a category is the rendered order.
 */

export type Resource = {
  name: string;
  blurb: string;
  url: string;
  best_for: string;
  price: string;
};

export type ResourceCategory = {
  id: string;
  title: string;
  summary: string;
  resources: Resource[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "tutors",
    title: "1-on-1 tutors",
    summary:
      "Hands-down the fastest way to break the B1 plateau. Find a community tutor for $8–15/hour or a certified teacher for more.",
    resources: [
      {
        name: "italki",
        blurb:
          "The largest marketplace for French tutors. Book trial lessons for under $10 and keep the ones you click with.",
        url: "https://www.italki.com/teachers/french",
        best_for: "Conversation practice at any level",
        price: "$8–25 / hour",

      },
      {
        name: "Preply",
        blurb:
          "Similar to italki with a slightly more structured course-style approach. Strong for learners who like a fixed weekly schedule.",
        url: "https://preply.com/en/online/french-tutors",
        best_for: "Structured weekly sessions",
        price: "$10–30 / hour",

      },
    ],
  },
  {
    id: "apps",
    title: "Apps & courses",
    summary:
      "Use these for the daily grammar/vocab grind. Pair with real reading and conversation; none of them, on their own, will get you to B2.",
    resources: [
      {
        name: "Babbel",
        blurb:
          "Best grammar progression of the big apps. Pays for itself if you finish the A2 + B1 tracks before moving to native input.",
        url: "https://www.babbel.com/learn-french",
        best_for: "Beginner → low B1",
        price: "$7–14 / month",

      },
      {
        name: "Kwiziq",
        blurb:
          "Adaptive grammar drills mapped to CEFR. The best app for hitting the gaps that hold you back from B2 / C1.",
        url: "https://french.kwiziq.com/",
        best_for: "B1 → C1 grammar gap-filling",
        price: "Free tier + $14/mo Premium",

      },
      {
        name: "LingQ",
        blurb:
          "Reading-first SRS. Import any article and look up unknown words inline; the app tracks what you actually know.",
        url: "https://www.lingq.com/en/learn-french-online/",
        best_for: "Extensive reading at A2+",
        price: "Free tier + $13/mo Premium",

      },
      {
        name: "Duolingo",
        blurb:
          "Honest take: great for streak motivation, weak for actual French progress past A2. Use as supplement, not as your main course.",
        url: "https://www.duolingo.com/course/fr/en/Learn-French",
        best_for: "Daily habit, A1 only",
        price: "Free / $10 mo Super",
      },
    ],
  },
  {
    id: "books",
    title: "Books that actually work",
    summary:
      "Battle-tested grammar and reading material. Pick one grammar book and finish it.",
    resources: [
      {
        name: "Grammaire Progressive du Français (Niveau Intermédiaire)",
        blurb:
          "The single most-recommended grammar workbook for A2–B1 learners. Clear explanations, real exercises, answer key included.",
        url: "https://www.amazon.com/dp/2090381183",
        best_for: "A2 → B1 grammar foundation",
        price: "~$25",

      },
      {
        name: "Le Petit Nicolas — Sempé / Goscinny",
        blurb:
          "The classic first-French-book. Short chapters, child narrator, sneaky grammar workout in B1 territory.",
        url: "https://www.amazon.com/dp/2070612775",
        best_for: "First novel at B1",
        price: "~$10",

      },
      {
        name: "L'étranger — Albert Camus",
        blurb:
          "Plain, deceptive prose at B2. The book most learners successfully finish without translating every sentence.",
        url: "https://www.amazon.com/dp/2070360024",
        best_for: "First real novel at B2",
        price: "~$10",

      },
    ],
  },
  {
    id: "free",
    title: "100% free resources",
    summary:
      "Everything below is free with no caveats — bookmark and use daily.",
    resources: [
      {
        name: "RFI — Journal en français facile",
        blurb:
          "Daily 10-minute news bulletin in slow, simplified French with full transcript. The single best A2–B1 listening source on the internet.",
        url: "https://francaisfacile.rfi.fr/",
        best_for: "A2–B1 listening + reading",
        price: "Free",
      },
      {
        name: "1jour1actu",
        blurb:
          "French news written for kids 8–13. Topics are adult; grammar is B1. Use the print version to get short, contained articles.",
        url: "https://www.1jour1actu.com/",
        best_for: "B1 reading",
        price: "Free",
      },
      {
        name: "TV5MONDE — Apprendre",
        blurb:
          "Free graded videos with comprehension exercises at every CEFR level. Run by the world's largest French-language TV network.",
        url: "https://apprendre.tv5monde.com/",
        best_for: "Listening + structured exercises",
        price: "Free",
      },
      {
        name: "Lawless French (Laura K. Lawless)",
        blurb:
          "Best free grammar reference site for English-speaking French learners. Searchable and consistent.",
        url: "https://www.lawlessfrench.com/",
        best_for: "Grammar reference",
        price: "Free",
      },
    ],
  },
];
