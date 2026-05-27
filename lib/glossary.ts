export type GlossaryEntry = {
  term: string;
  slug: string;
  definition: string;
  see_also?: string[];
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "CEFR",
    slug: "cefr",
    definition:
      "The Common European Framework of Reference for Languages — a six-level scale (A1, A2, B1, B2, C1, C2) used to describe language ability. Almost every French course, textbook, and exam aligns with it.",
    see_also: ["a1", "c2", "delf", "dalf"],
  },
  {
    term: "A1",
    slug: "a1",
    definition:
      "Beginner. ~500 words, present tense, predictable everyday exchanges. You can introduce yourself and order food.",
  },
  {
    term: "A2",
    slug: "a2",
    definition:
      "Elementary. ~1,000 words, the passé composé and basic imperfect, simple connectors. You can describe your background and the recent past.",
  },
  {
    term: "B1",
    slug: "b1",
    definition:
      "Intermediate (the 'threshold' level). ~2,000 words, futur simple, conditionnel, early subjunctive. You can hold a conversation and read straightforward articles.",
  },
  {
    term: "B2",
    slug: "b2",
    definition:
      "Upper-intermediate. ~4,000 words, the full subjunctive, conditionnel passé, plus-que-parfait. The level required for university study in France.",
  },
  {
    term: "C1",
    slug: "c1",
    definition:
      "Advanced. ~8,000 words, comfortable with idioms, register shifts, and even literary tenses like the passé simple. Effective fluent use.",
  },
  {
    term: "C2",
    slug: "c2",
    definition:
      "Mastery. Effectively native command of register, regionalisms, and style. Very few learners actually need C2 as a target.",
  },
  {
    term: "DELF",
    slug: "delf",
    definition:
      "Diplôme d'études en langue française. Official French ministry of education exams certifying levels A1, A2, B1, and B2. Lifetime-valid.",
    see_also: ["dalf", "cefr"],
  },
  {
    term: "DALF",
    slug: "dalf",
    definition:
      "Diplôme approfondi de langue française. The advanced sister of DELF, certifying C1 and C2. Lifetime-valid.",
    see_also: ["delf", "cefr"],
  },
  {
    term: "TCF / TEF",
    slug: "tcf-tef",
    definition:
      "Multiple-choice French level tests used for immigration (TEF Canada) and university entry (TCF). Both deliver a CEFR result but unlike DELF/DALF the certificate expires after two years.",
  },
  {
    term: "Passé composé",
    slug: "passe-compose",
    definition:
      "The everyday past tense of spoken French. Formed with avoir or être + past participle. Appears from A2 onward.",
  },
  {
    term: "Imparfait",
    slug: "imparfait",
    definition:
      "The 'background' or 'habitual' past tense. Used for ongoing situations, descriptions, and repeated actions. A2 in recognition, B1 to use correctly against passé composé.",
  },
  {
    term: "Subjonctif",
    slug: "subjonctif",
    definition:
      "A mood used after certain triggers (vouloir que, il faut que, bien que, pour que…) to mark uncertainty, desire, or subjectivity. Introduced at B1, mastered at B2.",
  },
  {
    term: "Passé simple",
    slug: "passe-simple",
    definition:
      "Literary past tense. Almost never spoken; pervasive in novels, news, and history writing. C1 to read comfortably.",
  },
  {
    term: "i+1",
    slug: "i-plus-one",
    definition:
      "Stephen Krashen's input hypothesis: language is best acquired from material that is just slightly above the learner's current level. The sweet spot for French reading is text where you understand 90–95% unaided.",
  },
];

export function getGlossaryEntry(slug: string) {
  return GLOSSARY.find((g) => g.slug === slug);
}
