export type LearnLevel = {
  slug: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  tagline: string;
  hours: string;
  vocab: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  cando: string[];
  grammar: { name: string; example: string }[];
  vocabulary: { word: string; gloss: string }[];
  sample: string;
  sampleNote: string;
  pitfalls: string[];
  nextLevel?: "A2" | "B1" | "B2" | "C1" | "C2";
};

export const LEARN_LEVELS: LearnLevel[] = [
  {
    slug: "a1-french",
    level: "A1",
    title: "A1 French — The Beginner Level",
    tagline: "First contact: greetings, present tense, concrete topics.",
    hours: "~80 hours of study",
    vocab: "~500 words",
    metaTitle: "A1 French — What It Is, What You Can Do, How to Reach It",
    metaDescription:
      "Everything you need to know about A1 French: grammar, vocabulary anchors, sample text, common pitfalls, and what comes next.",
    overview:
      "A1 is your first real foothold in French. You can introduce yourself, ask basic questions, and handle predictable everyday exchanges if the other person speaks slowly. Grammar is limited to the present tense and a handful of set phrases.",
    cando: [
      "Introduce yourself and ask someone else's name, age, country",
      "Order food and drinks in a café",
      "Understand prices, numbers, and times",
      "Use simple present-tense verbs to describe your routine",
      "Read very short messages, signs, and menus",
    ],
    grammar: [
      { name: "Present tense — regular -er verbs", example: "Je parle, tu parles, il parle" },
      { name: "Articles (le, la, les / un, une, des)", example: "le café, une baguette" },
      { name: "Subject pronouns", example: "je, tu, il, elle, nous, vous, ils, elles" },
      { name: "Negation with ne…pas", example: "Je ne fume pas." },
      { name: "Yes/no questions with est-ce que", example: "Est-ce que tu aimes le café ?" },
    ],
    vocabulary: [
      { word: "bonjour / au revoir", gloss: "hello / goodbye" },
      { word: "s'il vous plaît / merci", gloss: "please / thank you" },
      { word: "manger, boire, aimer", gloss: "to eat, to drink, to like" },
      { word: "lundi → dimanche", gloss: "days of the week" },
      { word: "un, deux, trois… cent", gloss: "numbers 1-100" },
    ],
    sample:
      "Bonjour, je m'appelle Sophie. J'ai vingt-cinq ans et j'habite à Paris. J'aime le café et les croissants. Le matin, je vais au travail en métro.",
    sampleNote:
      "Notice: only present tense, simple sentences, concrete vocabulary. No subordinate clauses.",
    pitfalls: [
      "Saying 'je suis 25 ans' instead of 'j'ai 25 ans' (age uses avoir, not être)",
      "Forgetting that all nouns have a gender — learn each noun with its article",
      "Pronouncing the final consonant of verbs (it's usually silent)",
    ],
    nextLevel: "A2",
  },
  {
    slug: "a2-french",
    level: "A2",
    title: "A2 French — Elementary",
    tagline: "Past tense, simple connectors, everyday topics handled with confidence.",
    hours: "~180 hours of study",
    vocab: "~1000 words",
    metaTitle: "A2 French — What It Is, What You Can Do, How to Reach It",
    metaDescription:
      "Everything you need about A2 French: grammar (passé composé, imparfait basics), vocabulary, sample text, and the jump to B1.",
    overview:
      "A2 is where French stops being a survival language and starts being useful. You can describe your background, talk about what happened yesterday, and handle routine situations like shopping or making plans. The passé composé and basic connectors (mais, parce que, donc) appear constantly.",
    cando: [
      "Describe your background, family, and job",
      "Talk about the recent past with passé composé",
      "Make and accept invitations, give directions",
      "Read short articles on familiar topics",
      "Write a postcard or short personal email",
    ],
    grammar: [
      { name: "Passé composé (avoir + most verbs)", example: "J'ai mangé, tu as vu, il a pris" },
      { name: "Passé composé (être + movement / pronominaux)", example: "Je suis allée, tu es venu" },
      { name: "Imparfait (introduction)", example: "C'était sympa, il faisait beau" },
      { name: "Near future (futur proche)", example: "Je vais partir demain." },
      { name: "Comparatives", example: "plus grand que, moins cher que" },
    ],
    vocabulary: [
      { word: "hier, aujourd'hui, demain", gloss: "yesterday, today, tomorrow" },
      { word: "mais, parce que, donc, alors", gloss: "core connectors" },
      { word: "rencontrer, partir, rester, devenir", gloss: "essential verbs" },
      { word: "tôt, tard, souvent, parfois", gloss: "time/frequency adverbs" },
    ],
    sample:
      "Hier, j'ai mangé au restaurant avec mes amis. C'était sympa, mais le service était lent. Je vais y retourner la semaine prochaine, parce que les desserts sont délicieux.",
    sampleNote:
      "A mix of passé composé (j'ai mangé), imparfait (c'était), and futur proche (je vais y retourner). Connectors carry the logic.",
    pitfalls: [
      "Choosing avoir vs. être as the auxiliary in passé composé",
      "Confusing passé composé (single events) with imparfait (background / habits)",
      "Forgetting agreement of the past participle with être verbs",
    ],
    nextLevel: "B1",
  },
  {
    slug: "b1-french",
    level: "B1",
    title: "B1 French — Intermediate",
    tagline: "Opinions, narratives, travel, simple subjunctive. The threshold level.",
    hours: "~350 hours of study",
    vocab: "~2000 words",
    metaTitle: "B1 French — What It Is, What You Can Do, and the B1 Plateau",
    metaDescription:
      "Everything about B1 French: grammar (futur, conditionnel, subjonctif intro), vocab, sample text, and why the jump to B2 is hard.",
    overview:
      "B1 is the 'threshold' level — you can independently handle most situations a traveler or new resident faces. You express opinions, narrate experiences, and follow conversation on familiar topics. The futur simple, conditionnel, and an early subjunctive appear regularly.",
    cando: [
      "Hold a real conversation on familiar topics",
      "Read straightforward articles, blog posts, and short stories",
      "Write a personal letter or a structured email",
      "Watch French TV with subtitles and follow the plot",
      "Express opinions and justify them with simple arguments",
    ],
    grammar: [
      { name: "Futur simple", example: "Je voyagerai en France l'année prochaine." },
      { name: "Conditionnel présent", example: "Je voudrais un café, s'il vous plaît." },
      { name: "Subjonctif (early triggers)", example: "Il faut que tu viennes." },
      { name: "Relative pronouns qui / que / où", example: "le livre que j'ai lu" },
      { name: "Si-clauses (type 1 & 2)", example: "Si j'avais le temps, je voyagerais." },
    ],
    vocabulary: [
      { word: "à mon avis, selon moi", gloss: "in my opinion" },
      { word: "il faut que, il est nécessaire que", gloss: "subjonctif triggers" },
      { word: "néanmoins, cependant, pourtant", gloss: "intermediate connectors" },
      { word: "réussir, échouer, apprendre, comprendre", gloss: "process verbs" },
    ],
    sample:
      "Quand j'étais petite, ma famille partait toujours en vacances au bord de la mer. Si je pouvais revivre un moment de mon enfance, ce serait sûrement ces étés-là, car ils m'ont laissé des souvenirs inoubliables.",
    sampleNote:
      "Imparfait of repetition (partait), si + imparfait → conditionnel, narrative cohesion. This is squarely B1.",
    pitfalls: [
      "Treating the conditionnel as a 'soft future' — it has its own rules",
      "Mixing up the si-clause patterns (si + présent → futur, si + imparfait → conditionnel)",
      "Plateauing because most input is suddenly two levels too hard or too easy",
    ],
    nextLevel: "B2",
  },
  {
    slug: "b2-french",
    level: "B2",
    title: "B2 French — Upper-Intermediate",
    tagline: "Abstract topics, complex subjunctive, newspaper opinion pieces without a dictionary.",
    hours: "~600 hours of study",
    vocab: "~4000 words",
    metaTitle: "B2 French — Upper-Intermediate Skills and the DELF B2 Exam",
    metaDescription:
      "Everything about B2 French: complex grammar, abstract vocabulary, sample text, and what DELF B2 actually tests.",
    overview:
      "B2 is the level required for university study in France and for many work contexts. You can follow abstract discussion, defend a point of view, and read newspaper opinion pieces without a dictionary. Complex subjunctive triggers, the conditional past, and nuanced connectors are normal.",
    cando: [
      "Defend a point of view in a debate",
      "Read a Le Monde opinion piece end-to-end without a dictionary",
      "Write a structured argumentative essay",
      "Watch French films without subtitles (with effort)",
      "Understand long, complex announcements and lectures",
    ],
    grammar: [
      { name: "Subjonctif (full range of triggers)", example: "Bien qu'il soit difficile, je vais essayer." },
      { name: "Conditionnel passé", example: "J'aurais voulu venir, mais je n'ai pas pu." },
      { name: "Plus-que-parfait", example: "Quand je suis arrivé, ils étaient déjà partis." },
      { name: "Passive voice", example: "Le projet a été annulé." },
      { name: "Gérondif (en + -ant)", example: "En lisant le journal, j'ai appris la nouvelle." },
    ],
    vocabulary: [
      { word: "en revanche, en effet, par ailleurs", gloss: "argumentative connectors" },
      { word: "remettre en question, mettre en évidence", gloss: "abstract verbs" },
      { word: "enjeu, défi, atout, contrainte", gloss: "essay vocabulary" },
      { word: "il s'avère que, force est de constater que", gloss: "advanced opening phrases" },
    ],
    sample:
      "Bien qu'il soit difficile de prédire l'avenir avec certitude, il est probable que les énergies renouvelables joueront un rôle central dans les prochaines décennies, à condition que les gouvernements maintiennent leurs engagements.",
    sampleNote:
      "Subjonctif (soit, maintiennent), abstract noun phrases, complex connectors. Textbook B2.",
    pitfalls: [
      "Knowing the subjonctif forms but not the triggers (bien que, pour que, avant que, …)",
      "Treating B2 as 'just more B1' — it's a real shift in register and density",
      "Trying to read fiction before you can comfortably read journalism",
    ],
    nextLevel: "C1",
  },
  {
    slug: "c1-french",
    level: "C1",
    title: "C1 French — Advanced",
    tagline: "Literary tenses, idioms, nuance, register-switching at will.",
    hours: "~1000 hours of study",
    vocab: "~8000 words",
    metaTitle: "C1 French — Advanced Skills, Literary Tenses, DALF C1",
    metaDescription:
      "Everything about C1 French: passé simple, passé antérieur, subjonctif imparfait, idioms, and DALF C1 prep.",
    overview:
      "At C1 you handle long, complex texts with implicit meaning. Idioms, register shifts, and the literary past (passé simple, passé antérieur, subjonctif imparfait) become accessible — at least in reading. You speak fluently and almost without searching.",
    cando: [
      "Read 19th- and 20th-century French literature comfortably",
      "Give a structured oral presentation on a complex topic",
      "Catch jokes, sarcasm, and cultural references",
      "Write in different registers (formal, journalistic, literary)",
      "Argue your case in a meeting on equal footing with natives",
    ],
    grammar: [
      { name: "Passé simple (recognition)", example: "Il prit son chapeau et sortit." },
      { name: "Subjonctif imparfait (literary)", example: "Il eût fallu qu'elle vînt plus tôt." },
      { name: "Plus-que-parfait du subjonctif", example: "Bien qu'il eût été averti…" },
      { name: "Inversion in formal writing", example: "Peut-être avez-vous raison." },
      { name: "Nominalization", example: "La mise en œuvre du projet a été retardée." },
    ],
    vocabulary: [
      { word: "appréhender, escompter, conjuguer", gloss: "elevated synonyms" },
      { word: "moult, jadis, naguère", gloss: "literary archaisms" },
      { word: "être au fait de, prendre acte de", gloss: "formal set expressions" },
      { word: "couler / verser / déverser", gloss: "register shades of 'to pour'" },
    ],
    sample:
      "Bien que les enjeux climatiques fassent désormais l'objet d'un consensus scientifique quasi unanime, force est de constater que la classe politique peine à traduire cette urgence en mesures concrètes. Il eût été préférable d'agir en amont, plutôt que de se contenter de réactions ponctuelles.",
    sampleNote:
      "Subjonctif passé (eût été), nominalization (mise en œuvre), formal set phrases. Squarely C1.",
    pitfalls: [
      "Refusing to read literary tenses because they're not 'used anymore' — they're everywhere in books",
      "Speaking like a textbook instead of picking up real register shifts",
      "Plateauing because you stopped seeking out genuinely hard input",
    ],
    nextLevel: "C2",
  },
  {
    slug: "c2-french",
    level: "C2",
    title: "C2 French — Mastery",
    tagline: "Effectively native: puns, regionalisms, stylistic intent.",
    hours: "~1500+ hours of study",
    vocab: "~15,000+ words",
    metaTitle: "C2 French — Native-Level Mastery and DALF C2",
    metaDescription:
      "What C2 French really means: stylistic mastery, regional awareness, the DALF C2 exam, and why very few learners actually need it.",
    overview:
      "C2 is effective native mastery. You catch puns, regional expressions, and stylistic choices. You can write in a deliberate, recognizable style. Very few learners (or texts) actually require C2 as a target — B2/C1 is enough for nearly all academic and professional purposes.",
    cando: [
      "Read and discuss any French text, including poetry and complex theory",
      "Switch register seamlessly between casual, formal, and literary",
      "Write publishable French in your chosen register",
      "Understand regional accents (Marseille, Lyon, Québec) with little effort",
      "Pass for a fluent non-native in any professional setting",
    ],
    grammar: [
      { name: "Full mastery of all tenses, including literary ones", example: "Productive use of passé simple in writing" },
      { name: "Stylistic devices: anaphora, chiasmus, ellipsis", example: "deployed deliberately" },
      { name: "Regional grammar variation", example: "Belgian/Swiss/Québécois forms" },
    ],
    vocabulary: [
      { word: "argot, verlan, langage soutenu", gloss: "full register awareness" },
      { word: "idioms by domain (sport, finance, politics)", gloss: "specialized fluency" },
      { word: "regional vocabulary", gloss: "septante, octante, déjeuner-vs-petit-déjeuner" },
    ],
    sample:
      "Eût-il consenti à modérer son propos, peut-être eût-on évité ce désastre dont nul, à ce jour, ne saurait mesurer l'ampleur — sinon en convoquant ces métaphores éculées dont la presse a, hélas, le secret.",
    sampleNote:
      "Inversion (eût-il), literary subjunctive, dense rhetorical figures, an aside that doubles as commentary. This is C2 territory.",
    pitfalls: [
      "Treating C2 as a target when B2/C1 is what you actually need",
      "Reading only canonical literature and missing modern register",
      "Never being corrected because you sound 'too good to correct'",
    ],
  },
];

export function getLearnLevel(slug: string) {
  return LEARN_LEVELS.find((l) => l.slug === slug);
}
