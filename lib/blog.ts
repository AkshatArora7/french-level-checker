export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "delf-b2-90-day-prep-plan",
    title: "DELF B2 in 90 Days: A Realistic Prep Plan",
    description:
      "A week-by-week 90-day plan to pass DELF B2 â€” reading, writing, listening, and speaking, with hours-per-day estimates and free resources.",
    date: "2026-05-27",
    body: `
DELF B2 has a reputation for being the hardest "ordinary" French exam â€” the one that gets you university entry and most jobs. It is hard, but it is also extremely predictable. If you know what each of the four sections looks like and you spend three months training the right reflexes, you can pass it.

Here is the 90-day plan I recommend to learners who already sit comfortably at low B2 in reading and are short of the bar in writing and speaking. Adjust week 1 if you are coming up from B1.

## What B2 actually tests

The DELF B2 exam has four 25-point sections (production Ã©crite, production orale, comprÃ©hension Ã©crite, comprÃ©hension orale). The pass mark is 50/100, with a minimum of 5/25 per section. Most failures are in Ã©crit and orale production, not comprehension.

The exam is testing two things the level guide does not say out loud: **structured argument** and **density of connectors**. Drilling those is most of the work.

## Days 1â€“30: Input phase

- Read one Le Monde opinion piece a day. Paste each one into the [French Level Checker](/cefr-checker) first â€” if it comes back C1, pick another.
- Listen to one 20-minute *La MÃ©thode Scientifique* (France Culture) episode a day. Transcribe one minute of it word for word, once a week.
- Build a deck of 80 B2 connectors (en revanche, certes / mais, force est de constater, il s'avÃ¨re que). Drill 20 minutes a day.

By day 30 you should comfortably understand newspaper editorials.

## Days 31â€“60: Production phase

- Two essays a week to the official DELF B2 format (250 words, structured: intro â†’ 2 body paragraphs with examples â†’ conclusion).
- One 20-minute speaking session per week with an italki tutor specifically practising the *exposÃ©* + debate format. (See our [Resources page](/resources) for tutor recommendations.)
- Continue reading and listening from phase one but cut listening transcription â€” you do not need it.

The goal of this phase is not to be eloquent. It is to be **structurally predictable**: every essay opens, takes a stance, defends with two distinct arguments, concedes one counter-point, and closes.

## Days 61â€“90: Mock exam phase

- One full mock exam a week, timed, on a Sunday morning.
- One essay correction by an italki teacher per week.
- Drill the *expressions de l'opinion* until they are reflex (selon moi, Ã  mon sens, il me semble que, â€¦).

Most candidates who fail B2 fail because they run out of time or freeze. Mock exams kill both of those problems.

## What to skip

- Don't memorise vocabulary lists. The exam tests usage, not breadth.
- Don't bother with literary tenses (passÃ© simple, etc.). They are not on B2.
- Don't switch grammar books partway through. Pick one and finish it.

## When to register

Book the exam at the start of day 1 of this plan. The deadline pressure does most of the work â€” and there is nothing harder than passing DELF B2 without a date on the calendar.
`,
  },
  {
    slug: "ai-for-french-learners",
    title: "AI for French Learners: 7 Free Tools That Actually Work",
    description:
      "Honest review of the AI tools that genuinely help with French â€” from CEFR level checking to conversation practice â€” and the ones that don't.",
    date: "2026-05-25",
    body: `
There are now a hundred AI apps promising to teach you French. Most are not worth your time. Here are seven that genuinely move the needle, ordered by the part of your routine they belong in.

## 1. CEFR-aware text analysis (us)

The [French Level Checker](/) does one thing: it tells you the CEFR level of any French text and which words push the level up. The biggest mistake intermediate learners make is reading material that is two levels above them. Use any CEFR-aware analyzer (we obviously prefer this one) to pre-screen every article before you commit.

## 2. ChatGPT for grammar drilling

Ask GPT-5 to generate ten fill-in-the-blank questions on the conditionnel passÃ© at B2 level, then mark your answers. Iteration is faster than any textbook. The trick is to specify the CEFR level explicitly in your prompt; without it the model defaults to something around B1.

## 3. DeepL, not Google Translate

DeepL produces noticeably more natural French than Google Translate, especially on informal register. Use it to check your own writing â€” if DeepL's back-translation matches your English intent, your French was good.

## 4. ElevenLabs for pronunciation comparison

Record yourself reading a sentence; have ElevenLabs read the same sentence in a French voice; compare. Cheap, fast, surprisingly effective for unblocking *r*, nasal vowels, and liaison.

## 5. Speechify or Voicepods for reading practice

Paste any French text and have it read aloud while you read along. Helps build the brain wiring that lets you read at speaking speed instead of word-by-word.

## 6. Anki with image cards generated by Midjourney / DALLÂ·E

Anki + AI-generated visuals beats Anki + English glosses for memorability. The image makes the French â†’ meaning link direct.

## 7. Real conversation with an italki tutor

This is not AI but it belongs on the list because nothing else replaces it. AI is a force-multiplier for input and self-correction. Output requires a human. See the [Resources page](/resources) for our tutor recommendations.

## What to skip

- Duolingo's AI features. The free product is decent for A1; the AI add-ons are not worth the upgrade.
- Standalone "AI French teacher" apps. Almost all are GPT wrappers with worse prompts than yours would be.
- Anything that promises fluency in 3 months. The CEFR levels do not bend to marketing.

## The one habit that wraps it all together

Pick one piece of French input a day. Use the [Level Checker](/cefr-checker) to confirm it is at your level. Read it, then ask GPT-5 to summarise it back to you in slightly easier French. You will retain 5Ã— more than from passive reading.
`,
  },
  {
    slug: "reading-french-news-at-b1",
    title: "Reading French News at B1: A Step-by-Step Guide",
    description:
      "Most B1 learners give up on French news within a week. Here is the exact process for working through an article without burning out.",
    date: "2026-05-24",
    body: `
At B1 you can read *Harry Potter Ã  l'Ã©cole des sorciers* with a bit of effort. You cannot read *Le Monde* without the dictionary becoming a second full-time job. That gap demotivates more learners than any other single thing.

The trick is to **choose the right news source** and **read the right way**. Here is the process.

## Step 1: Source selection

In rough order of difficulty:

- **RFI â€” Journal en franÃ§ais facile** (A2â€“B1). Daily, ten minutes, full transcript. This is your daily anchor.
- **1jour1actu** (B1). Print articles for French kids 8â€“13. Topics are adult; grammar is your level.
- **Le Monde â€” section International** (B2). Pick news pieces, not opinion. Use the [Level Checker](/cefr-checker) to confirm before spending half an hour on one.
- **Le Figaro / LibÃ©ration** (B2â€“C1). Skip for now.

If you are still firmly at B1, do RFI six days a week and 1jour1actu once. Once you can read 1jour1actu in 5 minutes without a dictionary, swap two RFI days for Le Monde International.

## Step 2: First-pass reading (5 minutes max)

Read the whole article once without stopping. **Do not** look up words. The goal is to grasp the structure: who, where, what happened, what is the writer's point.

If at the end you can summarise the article in one English sentence, the article was at your level and the next step will work.

If you cannot summarise, the article was too hard. Pick a different one. (This is the most common B1 mistake â€” pushing through articles that are actually C1.)

## Step 3: Vocabulary extraction (10 minutes)

Use a [Vocabulary Extractor](/french-vocabulary-extractor) or just go paragraph by paragraph. For each paragraph: write down at most three unknown words. Not all of them â€” three. Translation and the original sentence go on the same card.

Three new words per paragraph Ã— four paragraphs = twelve new words per article. That is plenty.

## Step 4: Re-read with the words known

Re-read the article a second time. It should feel transformed. The whole point of vocabulary work is this moment.

## Step 5: Output (5 minutes)

Write three sentences summarising the article in French. Use as many of the new connectors and structures as you can. This is what burns the words into long-term memory.

## A realistic weekly load

One article per day Ã— 20 minutes = the entire reading half of B1â†’B2 progress. Add 20 minutes of listening (RFI again works) and 30 minutes of grammar a few times a week, and you have a complete program.

## What kills B1 readers

- Dictionary spiraling. Three lookups per paragraph max.
- Reading at the wrong level. Pre-screen everything with the [Level Checker](/cefr-checker).
- Quitting articles halfway. Always finish, even if you understood 60%. The first-pass habit is what makes reading easier over time.

Stay in the routine three months and Le Monde will stop being out of reach.
`,
  },
  {
    slug: "how-cefr-levels-work-for-french",
    title: "How CEFR Levels Actually Work for French (with Examples)",
    description:
      "A practical guide to what A1, A2, B1, B2, C1 and C2 really mean for French â€” with example sentences at each level.",
    date: "2026-05-23",
    body: `
The CEFR (Common European Framework of Reference) splits language ability into six levels: A1, A2, B1, B2, C1, C2. Every French course, exam (DELF/DALF), and textbook uses it â€” but the labels are vague unless you've seen real text at each level.

This post gives you a working definition of each level for French, with example sentences you can use as anchors.

## A1 â€” Beginner

You can introduce yourself, ask basic questions, and handle predictable everyday exchanges. Grammar is limited to the present tense and a few set phrases.

> *Je m'appelle Marie. J'habite Ã  Lyon. J'aime le cafÃ©.*

If a text uses only present-tense verbs, common nouns, and short sentences, it's probably A1.

## A2 â€” Elementary

You can describe your background, talk about the recent past (passÃ© composÃ©), and handle routine situations like shopping or asking directions.

> *Hier, j'ai mangÃ© au restaurant avec mes amis. C'Ã©tait sympa, mais le service Ã©tait lent.*

A2 introduces the imperfect (*c'Ã©tait*) and connectors like *mais*, *parce que*, *donc*.

## B1 â€” Intermediate

You can handle most situations while traveling, express opinions, and read straightforward articles. Future tense, conditional, and a basic subjunctive show up.

> *Si j'avais plus de temps, je voyagerais en France pour amÃ©liorer mon franÃ§ais.*

B1 is where most learners plateau â€” the jump to B2 is the biggest in the whole framework.

## B2 â€” Upper-intermediate

You can follow abstract discussion, argue a point, and read newspaper opinion pieces without a dictionary. Complex subjunctive, conditional, and nuanced connectors are normal.

> *Bien qu'il soit difficile de prÃ©dire l'avenir, il est probable que les Ã©nergies renouvelables joueront un rÃ´le central.*

B2 is the level required for university study in France and for many work contexts.

## C1 â€” Advanced

You handle long, complex texts with implicit meaning. Idioms, register shifts, and the literary past (*passÃ© simple*) all become accessible.

> *Il eÃ»t Ã©tÃ© prÃ©fÃ©rable qu'elle s'abstÃ®nt de tout commentaire, eu Ã©gard aux circonstances.*

If you see *eÃ»t*, *fÃ»t*, or *-Ã®t* endings, you're firmly in C1+ literary territory.

## C2 â€” Mastery

Effectively native. You catch puns, regionalisms, and stylistic choices. Very few learners (or texts) actually need C2 as a target.

## How to use the levels

Don't try to *be* B2 â€” instead, find material slightly above your current level (the famous "i+1"). Paste any French text into the [French Level Checker](/) to see exactly which level it sits at and which words are pushing it up.
`,
  },
  {
    slug: "free-ways-to-find-french-reading-material",
    title: "5 Free Ways to Find French Reading Material at Your Level",
    description:
      "Stop reading Le Monde at B1. Here are five free sources of level-appropriate French â€” plus how to check the level before you commit.",
    date: "2026-05-23",
    body: `
The single biggest mistake intermediate French learners make is reading material that's too hard. You spend an hour with a dictionary, finish two paragraphs, and learn almost nothing because your brain is overloaded.

Here are five free sources of level-appropriate French, ordered roughly from easiest to hardest.

## 1. RFI â€” Journal en franÃ§ais facile (A2â€“B1)

Radio France Internationale publishes a daily 10-minute news bulletin in slow, simplified French. The full transcript is online and free. Great for A2 finishing up or B1 starting.

## 2. 1jour1actu (A2â€“B2)

A French news site written for kids aged 8â€“13. Don't be put off â€” the topics (climate, politics, sports) are exactly what you want for adult B1/B2 vocabulary, just with simpler grammar.

## 3. Wikipedia in simple French (B1â€“B2)

Many Wikipedia articles have a "Vikidia" or simplified version. Failing that, the *RÃ©sumÃ©* section at the top of most articles is usually one level easier than the full body.

## 4. Reddit r/france and r/AskFrance (B2)

Native-written but conversational. Skip the political threads (heavy slang) and look for everyday questions about life in France. You'll learn current expressions textbooks won't teach you.

## 5. Le Monde, LibÃ©ration, Le Figaro (B2â€“C1)

The big national newspapers. Choose opinion pieces (more predictable structure) over investigative reporting (dense vocabulary). The free articles are enough.

## How to verify the level before you commit

Before you spend 30 minutes on an article, paste a paragraph into the [French Level Checker](/). If it comes back two levels above yours, find something else. If it's one level above â€” perfect, that's the sweet spot for learning.
`,
  },
  {
    slug: "why-intermediate-french-learners-plateau",
    title: "Why Intermediate French Learners Plateau (and How to Break Through)",
    description:
      "The B1 plateau is real. Here's why it happens and three concrete habits that actually move you to B2.",
    date: "2026-05-23",
    body: `
Almost every French learner gets stuck around B1. The first year felt fast â€” you went from nothing to holding basic conversations. Then progress stalled. New vocabulary doesn't stick, your speaking sounds the same as six months ago, and you start to wonder if you're just bad at languages.

You're not. The B1 plateau is structural. Here's what's actually going on and what to do about it.

## Why B1 â†’ B2 is the hardest jump

The CEFR levels are *not* evenly spaced. A1 to A2 doubles your vocabulary (roughly 500 â†’ 1000 words). B1 to B2 doubles it again (2000 â†’ 4000) â€” but those second 2000 words show up far less frequently. You can read a B1 article and miss only 3-4 words per paragraph; you'll see those same words again maybe once a month.

At B1, the input-to-acquisition ratio collapses. You need *much* more exposure to get the same number of new words to stick.

## Habit 1: Read 30 minutes a day at i+1

The single highest-leverage thing you can do is read level-appropriate material every day. Not Le Monde (too hard, gives up). Not your A2 textbook (too easy, no growth). Something where you understand 90-95% and can guess the rest from context.

Use the [French Level Checker](/) on anything you're considering â€” if it comes back at your level or one above, it's a good fit.

## Habit 2: Active recall on the 80 most-common B2 grammar structures

You don't need 4000 new words to *feel* like you've broken out of B1. You need 80 grammar patterns: complex subjunctive triggers, conditional sentences, *dont* vs. *duquel*, *en* + gerund, etc. Get a B2 grammar book, do 10 minutes a day, and your speaking will feel different in a month.

## Habit 3: Output before you feel ready

Most plateaued learners are afraid to speak because they make mistakes. But you cannot move to B2 by inputting more â€” at some point the system needs to produce. iTalki tutors are $10/hr, language exchange is free. Talk for an hour a week, accept the mistakes, and your fluency will jump.

## The shape of the breakthrough

The B1â†’B2 transition doesn't feel like a continuous improvement. It feels like nothing for months, then suddenly you read an article and realize you understood the whole thing. That's how it works. Stay in the daily-input habit and the breakthrough will come.
`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
