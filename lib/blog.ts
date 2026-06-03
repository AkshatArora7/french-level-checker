export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
  readingTime?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-cefr-level-is-le-petit-prince",
    title: "What CEFR level is Le Petit Prince in French?",
    description:
      "Is Le Petit Prince really a beginner French book? I ran it through a CEFR analyzer. The honest answer: A2 vocab, B1+ grammar, C1 in spots.",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "what CEFR level is Le Petit Prince",
    secondaryKeywords: [
      "Le Petit Prince French level",
      "Le Petit Prince CEFR",
      "first French book",
      "easy French books for beginners",
      "Le Petit Prince difficulty",
    ],
    body: `
The myth I hear most often when someone asks me what to read in French is this: *start with Le Petit Prince — it's basically a children's book*. I followed that advice. I bought the orange paperback, opened it on the Métro, and was lost on page three.

So later, when I'd built [the level checker](/), I did what I should have done first: I pasted entire chapters into it and looked at what came back. The verdict surprised me, and it complicates the "easy first book" advice in ways nobody on Reddit seems to mention.

Here is what is actually going on.

## What the analyzer says, chapter by chapter

I ran the first six chapters through the checker, one at a time. The pattern was consistent:

- **Chapter 1** (the elephant-inside-the-boa drawing) — comes back **A2/B1**. Narrator voice, passé composé and imparfait, concrete vocabulary.
- **Chapter 2** (the pilot crashes in the desert, meets the prince) — **B1**. A few words push it up: *panne*, *naufragé*.
- **Chapters 3–5** (the prince's planet, the baobabs) — **B1**, with isolated **B2** sentences when Saint-Exupéry gets philosophical.
- **Chapter 21** (the famous fox passage) — **B2 leaning C1**. The grammar is simple but the meaning density is brutal: *« On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux. »*

So at the sentence level, most of the book sits at A2–B1. But there are sustained passages — the fox, the snake, the closing chapters — that the analyzer flags as B2+. Not because of vocabulary, but because of abstract metaphor stacked on abstract metaphor, often dropped into the subjunctive.

If a passage in your copy looks suspicious to you, paste it into the [reading-level tool](/french-reading-level) yourself. Don't trust me. The point of the tool is that you can second-guess any blog post — including this one — in ten seconds.

## Why people call it "easy"

The "Le Petit Prince is your first French book" advice isn't wrong, exactly. It's based on real observations:

1. **The vocabulary is small.** Saint-Exupéry uses maybe 2,000 distinct words across the whole book. That's solid A2 range.
2. **Sentences are short.** Compare it to Proust — there's no contest.
3. **The themes are universal.** You already know the story, or you can guess it. That carries you across gaps.

This matters more than people give it credit for. Reading in a foreign language is mostly pattern-matching against meaning you already have. A book whose plot you can predict from English-language osmosis is genuinely easier than a book at the same linguistic level whose plot you can't.

That's the half of the advice that's right.

## The hard parts nobody warns you about

Here's the half that isn't.

**The subjunctive shows up early and often.** *Il faut que le mouton mange les fleurs* (chapter 7) is grammatically simple — present subjunctive, regular verb — but if you haven't learned the trigger *il faut que*, you're stuck. The subjunctive is technically introduced in late A2, but it doesn't become comfortable until B1. If you're A1, you will bounce off this.

**Passé simple appears.** Not constantly — the narrator uses passé composé most of the time — but in flashback and storytelling sections, Saint-Exupéry slips into the literary past: *il s'écria*, *elle répondit*, *il prit*. These forms are introduced at B2 in most curricula and aren't expected to be active until C1. As a reader, you only need to recognise them, not produce them, but that recognition itself takes practice. (I had to look up *il s'enquit* the first time — it's the passé simple of *s'enquérir*, "to inquire.")

**The metaphors break the analyzer's logic.** *« Les hommes n'ont plus le temps de rien connaître. Ils achètent des choses toutes faites chez les marchands. »* Each word is A1. The meaning is graduate-level philosophy. No CEFR tool catches that, mine included.

So the right way to think about Le Petit Prince is: **A2 in form, B1 in grammar, C1 in what it is actually saying.**

## Who should actually read it

After running the numbers and a year of recommending the book to friends, my honest take:

- **Don't start here at A1.** The subjunctive and the abstract passages will demoralise you. Finish your A2 textbook first.
- **A2 finishers can try it**, but should plan on 8–10 lookups per chapter and skim the philosophical bits without panicking.
- **B1 is the sweet spot.** You'll understand 85% on first read, and the famous passages will land emotionally instead of just confusing you. If you're somewhere in B1, the [B1 study guide](/learn/b1-french) is a good check on whether you're really ready.
- **B2+** can read it for pleasure in an afternoon and notice things they missed the first time, which is the whole point.

## Three alternative first books at different levels

If Le Petit Prince isn't right for you yet, here's what I'd reach for instead:

**A1–A2: *Le Petit Nicolas* (Sempé and Goscinny).** Short stories told by a child narrator, almost entirely in the present and passé composé. Vocabulary is concrete — school, family, friends, getting in trouble. Each story is four pages. You will finish one. That feeling is more important at A1 than the book itself.

**A2–B1: any *Petit Nicolas* sequel, or a graded reader from CLE International rated A2/B1.** Short-chapter formats keep the cognitive load low. Don't be embarrassed by graded readers — the publishers know exactly what they are doing.

**B1–B2: *L'Étranger* (Camus).** Famously written almost entirely in passé composé — Camus skipped the passé simple on purpose — so the grammar is more accessible than the reputation suggests. The themes are C1, but the sentences are short and you can read it in a week. This is the book I'd actually recommend after Le Petit Prince, not before.

For more, the [Resources page](/resources) lists graded readers and audio editions that pair well with each level.

## How to use this practically

If you have a copy of Le Petit Prince sitting on your shelf, do this before you commit:

1. Open to chapter 21 (the fox).
2. Copy a paragraph into the [level checker](/).
3. If it comes back at your level or one level above, the book is for you right now.
4. If it comes back two or more levels above, shelve it for six months and pick one of the alternatives above.

This is the workflow I wish someone had given me when I bought the book. Two weeks of frustration would have been two weeks of finishable A2 stories instead.

Paste any French text into the [level checker](/) and you'll see the same chapter-by-chapter breakdown I used for this post.
`,
  },
  {
    slug: "what-is-b1-french",
    title: "B1 French explained: what you can actually do",
    description:
      "What B1 French really means in practice — concrete skills, grammar markers, vocabulary size, and how long it realistically takes to reach.",
    date: "2026-06-03",
    readingTime: "5 min read",
    primaryKeyword: "what is B1 French",
    secondaryKeywords: [
      "B1 French level",
      "intermediate French",
      "CEFR B1",
      "B1 French grammar",
    ],
    body: `
The CEFR description of B1 reads like an HR competency framework. "Can deal with most situations likely to arise while travelling in an area where the language is spoken." Helpful, in the way that "Can use a computer" is helpful.

Here is what B1 actually looks like in real life, based on a year of being squarely at this level and a few months of climbing out of it.

## What B1 means in plain language

At B1, you can:

- Order a meal, explain a dietary restriction, and politely complain that the steak is overcooked.
- Open a bank account in French — slowly, with one or two *« désolé, vous pouvez répéter ? »* interventions.
- Handle an unexpected situation: missed train, lost wallet, doctor visit for a non-serious illness.
- Follow a slow-spoken podcast on a familiar topic (travel, food, work, news in slow French).
- Read a kids' news article or a graded reader without a dictionary.
- Write a 150-word personal email — what you did last weekend, why you can't make Saturday.

What you cannot yet do reliably:

- Follow a normal-speed France Inter podcast.
- Read *Le Monde* without ten or more lookups per article.
- Argue a nuanced position out loud.
- Watch a French film without subtitles.

If most of the first list sounds like "yeah, I can do that" and most of the second feels out of reach, you're B1.

## The grammar markers of B1

You don't get to B1 without these. Conversely, if you've got these, you're probably there:

- **Passé composé**, fluent and automatic. *J'ai mangé*, *je suis allé*, agreement with être verbs.
- **Imparfait** for background and description. The big one is the passé composé / imparfait contrast — see my post on [which to pick](/blog/passe-compose-vs-imparfait) if it still trips you up.
- **Futur simple**: *je partirai*, *tu finiras*. (Futur proche, *je vais partir*, is A2.)
- **Conditionnel présent**: *je voudrais*, *je pourrais*. Politeness alone gets you a long way at B1.
- **Subjunctive after *il faut que***. Just this one trigger is enough to count as B1.
- Pronouns *y* and *en*, used correctly more often than not.

You do not need full mastery of the subjunctive, the conditional past, or the passé simple. Those are B2+.

## Vocabulary size at B1

Estimates I trust put B1 at roughly **2,000 active words** and 4,000+ passive. By comparison, A2 is around 1,000 active, B2 is around 4,000 active.

Active = you can use it in a sentence under time pressure. Passive = you understand it when you read or hear it.

The active number matters more than people think. A B1 speaker with 1,500 active words who recycles them well sounds more competent than someone who knows 3,000 words but freezes searching for the perfect one.

## The intermediate plateau starts here, not at B2

The popular framing is that the plateau hits at B2. I'd push back. B2 is where the *recognised* plateau hits because that's when learners realise they've stopped progressing.

The plateau actually starts at B1. From A0 to B1, every hour of input yields visible progress because the words are common. From B1 onwards, the next batch of words shows up far less often. You can read a B1 article and meet a B2 word maybe once a chapter — and again three weeks later in a different context. Acquisition slows because exposure slows.

If you've been at B1 for six months and you feel stuck: that's the math, not your ability.

The escape is volume. The [B1 study guide](/learn/b1-french) walks through the routine I used to break out.

## How long it takes to reach B1

Hard numbers:

- **Alliance Française** estimates 200–350 contact hours of class time for an Anglophone adult.
- **FSI** (US State Department) puts French in Category I — about 600–750 hours to professional B2. Roughly half of that gets you to B1, so ~300–375 hours.

Those are *contact* hours. In practice, you spend 2–3× that in self-study around the classes.

In real terms:

- Full immersion (move to France, work in French): 3–6 months to B1.
- Intensive course (15 hours/week): 6–9 months.
- Casual self-study (30 min/day): 12–24 months.
- Duolingo only: probably never, honestly.

The number that matters more than total hours is **consecutive days of contact**. A learner doing 25 minutes a day every day will beat a learner doing 4 hours every Sunday.

## How to know you've actually arrived

Paste a paragraph from a B1-labelled graded reader into the [level checker](/) and see if it comes back at your level. Then read it cold. If you understood 85% without lookups, you're B1. If you understood 95%, you're already above and should be hunting for slightly harder material.

A quick second test: take a paragraph of your own writing and run it through [the B1 detector](/is-this-french-b1). If your own French registers as B1, you're at least productively B1.

## What to do next

Don't try to "be B2." Try to widen your B1 — read more, listen more, write a short paragraph in French most days. The level changes around you.
`,
  },
  {
    slug: "delf-vs-tef-vs-tcf",
    title: "DELF vs TEF vs TCF: which French exam to take",
    description:
      "DELF, TEF, and TCF compared — what each exam is for, costs, validity, and how to pick based on your goal (immigration, university, or work).",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "DELF vs TEF vs TCF",
    secondaryKeywords: [
      "French exams",
      "TEF Canada",
      "DELF B2",
      "TCF Canada",
      "French certification",
    ],
    body: `
I sat the TEF Canada in 2024 because I was applying for permanent residence under Express Entry, and I genuinely could not figure out from any single article online whether I should have taken the DELF instead. The three exams are constantly conflated and recommended interchangeably by people who took only one of them.

This is the comparison I wished existed before I paid the registration fee.

**One quick disclaimer up front:** exam formats, fees, and recognition all change. Verify every detail on the official site for your country and your intended use before you book. This post is direction-setting, not a substitute for the registration page.

## What each exam actually is

**DELF / DALF.** The classic. Issued by France Éducation International (the body inside the French Ministry of Education). The DELF covers A1, A2, B1, B2 as separate exams. The DALF covers C1 and C2. You pick a level, you sit it, you either pass (≥ 50/100 with a minimum per section) or you don't. **Valid for life.** Universally recognised by French universities, French employers, and most immigration bodies that take French exams at all.

**TEF.** *Test d'évaluation de français*, issued by the CCI Paris Île-de-France. Score-based, not pass/fail — you get a result that maps to a CEFR band. Comes in several flavours: **TEF Canada** (used for Canadian immigration), **TEF Études** (university), **TEF Naturalisation** (French citizenship), **TEF IRN** (French residence). **Valid for 2 years.** Heavily used in the Canadian immigration system because the result format slots cleanly into the IRCC points grid.

**TCF.** *Test de connaissance du français*, issued by France Éducation International (same body as DELF). Also score-based, also CEFR-mapped. Flavours include **TCF tout public**, **TCF Canada**, **TCF Québec**, **TCF DAP** (for university entry in France via the *Demande d'Admission Préalable*), **TCF ANF / IRN** for naturalisation and residence. **Valid for 2 years.**

So in shape: DELF/DALF is the level certificate you get once. TEF and TCF are score-based snapshots you renew.

## Decision matrix

If your goal is:

- **Canadian permanent residence (Express Entry, PNP, etc.)** — TEF Canada or TCF Canada. Both accepted. TEF Canada is more common; TCF Canada often has shorter wait times. Pick by test-centre availability.
- **Quebec immigration (Arrima, PEQ)** — TEF Canada or TCF Québec, depending on stream. Verify on the MIFI site.
- **French citizenship (naturalisation)** — DELF B2 (lifetime cert), or TEF Naturalisation / TCF ANF (2-year cert). If you only need it once, take the 2-year version; it's cheaper and faster. If you might want it again later, DELF B2 saves a re-take.
- **French residence card** — TEF IRN or TCF IRN at A2.
- **University study in France (DAP procedure)** — TCF DAP. Specific format. DELF B2 also accepted by many institutions but not all.
- **University study at master's level or for general academic use** — DELF B2 or DALF C1. Lifetime validity matters here; you don't want to re-sit during a three-year programme.
- **Adding French to your CV with no immigration angle** — DELF B2 or DALF C1. Recognised, lifetime, doesn't expire while you job-hunt.

If you have no specific goal yet but want a certificate: take the DELF. Lifetime validity is worth a lot.

## Cost and duration

Costs vary by country, but rough ranges I've seen:

- **DELF B1 / B2**: €120–250.
- **DALF C1 / C2**: €150–300.
- **TEF Canada**: CAD 350–450 typically.
- **TCF Canada**: CAD 300–400.
- **TCF DAP** in France: €70–150.

Sitting time is roughly:

- DELF/DALF: 2.5–4 hours plus a separate 15–20 minute oral.
- TEF / TCF: 2–3 hours plus a short oral.

The DELF is longer in elapsed time because productions (writing, speaking) carry more weight.

## Format differences that matter

The TCF and TEF lean heavily on **multiple-choice questions** for listening and reading. If you test well in MCQ formats, those exams play to your strengths. The DELF/DALF leans on **production** — you write longer essays and give a structured oral *exposé*. If you're stronger in production than in close-reading speed, the DELF rewards you.

I scored higher on the TEF than I expected partly because MCQ saved me on the listening section. I'd have lost points in a DELF-style transcription task.

## Which level to sit

For each exam, aim for the lowest level that meets your requirement. Sitting above your level wastes money and risks a sub-50 score. If you're targeting B2 for naturalisation, study a [DELF B2 sample text](/delf-b2-sample-text) and a [DALF C1 sample text](/dalf-c1-sample-text) and check which one you understand without effort. If C1 feels comfortable, B2 will be a calm afternoon. If B2 feels stretched, you need more prep, not a different exam.

For B1, walk through the [DELF B1 sample text](/delf-b1-sample-text) before you book, and use the [B2 study guide](/learn/b2-french) when you're ready to move up.

## How long to prep

Reasonable estimates assuming you're already roughly at the target level:

- **DELF B1**: 4–8 weeks of focused prep.
- **DELF B2**: 8–12 weeks. This is the exam most learners underestimate.
- **DALF C1**: 12 weeks plus.
- **TEF / TCF**: 4–6 weeks of format-specific drilling on top of your existing level.

The exams test format as much as language. A B2 speaker can fail DELF B2 by ignoring the essay structure expectations.

## The mistake nearly everyone makes

Booking the wrong version of the right exam. TEF Canada is not interchangeable with TEF IRN. TCF Québec is not interchangeable with TCF Canada. The exam name on your certificate has to match the version your immigration form lists. Triple-check before you pay.

## Bottom line

If you want one sentence: **for immigration, take whichever 2-year exam your specific application lists; for everything else, take the DELF.**
`,
  },
  {
    slug: "inner-french-podcast-level",
    title: "Inner French podcast: what CEFR level do you need?",
    description:
      "Hugo Cotton says Inner French is for B1–B2. Honest verdict after pasting transcripts into a CEFR analyzer: B1 vocabulary, slow B1 pace, B2 topics.",
    date: "2026-06-03",
    readingTime: "5 min read",
    primaryKeyword: "Inner French podcast level",
    secondaryKeywords: [
      "Inner French CEFR",
      "Hugo Cotton",
      "French podcasts for learners",
      "intermediate French podcast",
      "Inner French difficulty",
    ],
    body: `
Inner French was the first podcast I stuck with as a French learner. Hugo Cotton — the host — has a calm, deliberate voice and a knack for choosing topics that make you forget you're studying. The widely-quoted line is that the show is "for B1 to B2 learners." I want to refine that.

After listening to roughly 50 episodes and pasting half a dozen transcripts into [the level checker](/), here is where Inner French actually sits.

## What Inner French is

For people new to it: Inner French is a monologue podcast hosted by Hugo Cotton, a French teacher based in Lyon. Episodes are 25–35 minutes. Hugo speaks slowly and clearly, picks one topic per episode (often cultural, historical, or philosophical), and explains it in straightforward but adult French. Free transcripts are available on his site; a paid membership gets you study guides and exercises.

There is no co-host, no fast banter, no slang, no music interruptions. That's the format choice that makes the show work as study material.

## The level, in three parts

People treat "CEFR level" like a single number. For a podcast it really has three:

**Vocabulary level: B1.** I pasted three full transcripts into the analyzer. Two came back B1 with B2 spikes; one came back solidly B2 (it was an episode on French politics). The core vocabulary across episodes is everyday adult French. Hugo deliberately avoids slang and rare words.

**Speech pace: slow B1.** Hugo's words-per-minute rate is well under native speed. He pauses at clause boundaries. He repeats key phrases. If you've been listening to native speakers and bouncing off, Inner French will feel like someone slowed the world down.

**Topic / conceptual complexity: B2.** This is where the show jumps. Episodes on existentialism, on the French education system, on the *gilets jaunes* — the language is B1 but the *ideas* require B2-level engagement. You can know every word and still need to rewind because the argument is dense.

So when Hugo says "B1 to B2", he's right — but in a specific way: the *language* is reachable from late B1, the *content* needs early B2 to feel comfortable.

## When you're ready for it

Concrete signs you're ready:

- You can read a B1-graded reader chapter in one sitting without using a dictionary.
- You can paste a *Le Monde International* article into the [reading-level tool](/french-reading-level), see B2 come back, and read it with maybe five lookups.
- You've finished a B1 grammar book — past tenses fluent, conditional and subjunctive at least introduced.
- You can follow *News in Slow French* (intermediate edition) without rewinding.

If those four are true, start Inner French at episode 1 (not the latest — the curve is gentler at the beginning).

## If it's still too hard

The single most common Inner French failure mode is starting too early. Symptoms: you've understood maybe 40% of an episode, you've zoned out twice, and you feel worse about your French than before.

The fix isn't to push harder. It's to step down:

- **News in Slow French (intermediate edition).** Slower than Inner French, shorter episodes, news topics with predictable structure. Three months of daily News in Slow French is a great runway.
- **Coffee Break French (season 3–4).** Drilled, structured, slower again. Less interesting if you're already adult-fluent in your native language, but effective.
- **One Thing in a French Day.** Five-minute episodes, conversational, slice-of-life. The shortness alone makes it less intimidating.

When you can follow News in Slow French without effort, Inner French becomes accessible.

## A reading-first trick

Hugo publishes transcripts. Use them. The technique I'd recommend: read the transcript first, look up the 4–5 words you don't know, then listen to the episode without the transcript. You'll understand 90% and the listening practice is what cements the comprehension.

Don't read along while listening. That's hybrid practice, not real listening; you're training your eyes, not your ears.

## What to graduate from and to

A rough podcast ladder I followed:

1. **Coffee Break French** (A2–B1)
2. **News in Slow French**, intermediate (B1)
3. **One Thing in a French Day** (B1)
4. **Inner French** (B1 → B2)
5. **Hugo Décrypte** (B2+, fast native, YouTube as well)
6. **France Culture, *La Méthode Scientifique*** (B2 → C1)
7. **General France Inter podcasts** (C1)

Hugo Décrypte is the natural next step from Inner French because the format is similar — explained current affairs — but at full native speed. Once Hugo Décrypte feels comfortable, you're firmly B2 and can fan out into any France Culture show.

## How to use Inner French effectively

The mistake is treating it as background noise. The format rewards active listening: one episode per study session, eyes closed for 30 minutes, then a 10-minute pause to summarise the episode aloud in French. That hour will move you more than three hours of half-attention listening.

If you want a structure to fit Inner French into, the [B1 study guide](/learn/b1-french) has a daily routine that uses one episode every other day. The [Resources page](/resources) lists a few more podcasts at adjacent levels.

## One final note

Inner French is the rare learning resource that gets harder as you improve, in a good way. The early episodes feel like beginner material once you're solid B2; the late episodes will challenge you all the way to C1. Stay with it long enough and you'll hear your own French improve in how you understand Hugo's.
`,
  },
  {
    slug: "passe-compose-vs-imparfait",
    title: "Passé composé or imparfait? The one question",
    description:
      "Stop memorising five rules for passé composé vs imparfait. One decision question handles 90% of cases — here it is, with examples.",
    date: "2026-06-03",
    readingTime: "5 min read",
    primaryKeyword: "passé composé vs imparfait",
    secondaryKeywords: [
      "French past tense",
      "imparfait usage",
      "passé composé usage",
      "French grammar",
      "B1 French grammar",
    ],
    body: `
Every grammar book gives you the same five rules for choosing between passé composé and imparfait: completed action, repeated action, description, simultaneous action, interruption. I learned those rules. I still got it wrong constantly.

What finally worked was reducing the five rules to one question. Here it is, with the examples that made it click.

## The one question

Before every past-tense verb, ask:

> Am I describing a discrete event with a beginning and an end, or a state, background, or ongoing situation?

Discrete event → **passé composé**. State / background / ongoing → **imparfait**.

That's 90% of cases. The other 10% are the interesting edge cases, which I'll cover at the end.

## Examples in pairs

The same verb takes either tense depending on context. This is the part that breaks most learners.

**Manger:**
- *Hier soir, j'ai mangé une pizza.* — Last night I ate a pizza. (Discrete event. Started, finished.)
- *Quand j'étais petit, je mangeais une pizza tous les vendredis.* — When I was little, I used to eat a pizza every Friday. (Ongoing / habitual.)

**Vivre:**
- *J'ai vécu trois ans à Paris.* — I lived in Paris for three years. (Bounded duration, completed.)
- *Je vivais à Paris quand j'ai rencontré ma femme.* — I was living in Paris when I met my wife. (Background state, plus a discrete event in the middle.)

**Pleuvoir:**
- *Il a plu pendant deux heures.* — It rained for two hours. (Bounded, completed.)
- *Il pleuvait quand je suis sorti.* — It was raining when I went out. (Ongoing background.)

**Être:**
- *J'ai été content de te voir.* — I was glad to see you. (Often: a specific moment of reaction.)
- *J'étais content à cette époque.* — I was happy at that time. (State, ongoing.)

The first time I read examples like these I thought the choice was arbitrary. It is not. The speaker's intent — *am I framing this as one moment or as a backdrop* — is real and detectable.

## Signal words

Some words almost always pull one tense or the other:

- **Passé composé pullers:** *soudain*, *tout à coup*, *d'un coup*, *un jour*, *à ce moment-là*, *hier*, *la semaine dernière*, *pendant X années* with a bounded number.
- **Imparfait pullers:** *toujours*, *souvent*, *d'habitude*, *tous les* + day, *pendant que* (when describing two ongoing actions), *chaque*, *parfois*.

These aren't laws. They're tilts. *Pendant que je travaillais, le téléphone a sonné* — *pendant que* takes imparfait (ongoing), but the second clause is passé composé (discrete event). Both happen in one sentence because they're doing different jobs.

## The interrupted action pattern

This is the single most common B1 grammar pattern in spoken French:

> *Je [imparfait] quand [passé composé].*

*Je dormais quand le tremblement de terre a commencé.* — I was sleeping when the earthquake started.

*Elle marchait dans la rue quand elle a vu son ex.* — She was walking down the street when she saw her ex.

The imperfect sets the stage; the passé composé delivers the event. Learn this shape and half your past-tense sentences write themselves.

## The trickier cases

**Habitual past.** *Quand j'étais petit, j'allais à la mer chaque été.* — Imperfect for habits. English uses "would" or "used to" here. If you can translate it as "used to", it's imparfait.

**State changes.** *J'ai eu peur* (I got scared — moment of reaction) versus *J'avais peur* (I was scared — ongoing state). The same verb shifts meaning depending on tense. *Savoir* does the same: *J'ai su qu'il mentait* = "I found out he was lying"; *Je savais qu'il mentait* = "I knew he was lying."

**Description versus event in narration.** *Il faisait beau. Les enfants jouaient. Soudain, un chien a aboyé.* — Three imparfaits set the scene; one passé composé moves the action. Whole short stories are built on this rhythm.

## How to drill this

Three exercises that worked for me, in order of efficiency:

1. **Pair-tense rewriting.** Take any imparfait sentence and rewrite it as passé composé. *Je travaillais dans une banque.* → *J'ai travaillé dans une banque pendant cinq ans.* The act of forcing the rewrite teaches you what each tense is *for*.
2. **Story retelling.** Pick a 200-word story in English, retell it aloud in French past tenses. Record yourself. Listen back. Every wrong choice will be obvious in playback in a way it never is in your head.
3. **Targeted Anki cards.** Front: an English sentence in the past. Back: the correct French version with the tense flagged. Avoid grammar drills where you fill in a blank — those train pattern matching, not the decision.

For more drilling material the [A2 study guide](/learn/a2-french) walks through the passé composé refresher, and the [B1 study guide](/learn/b1-french) covers the imperfect introduction and the interrupted-action pattern in more depth. The [glossary](/glossary) has short definitions of both tenses if you want a single-line reference.

## The reflex you're training

The end state is not "I can apply the rules quickly." The end state is "I don't think about it." A French speaker picks the tense the same way English speakers pick "I ate" versus "I was eating" — entirely by feel, in service of what they mean.

You get to that reflex through volume. Pasting your own writing into [the level checker](/) is a useful sanity check — if your sentences come back at a weird level because of tense choices, you'll see it.

Past tenses are the hardest grammar in French, and the most worth nailing. Get them right and your output sounds like a B1 speaker instead of a beginner.
`,
  },
  {
    slug: "how-long-to-reach-b2-in-french",
    title: "How long does it really take to reach B2 in French?",
    description:
      "FSI says 600–800 hours to B2 French. That's optimistic for self-learners. Honest timelines based on hours per day, background, and method.",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "how long to reach B2 in French",
    secondaryKeywords: [
      "B2 French timeline",
      "learn French to B2",
      "French fluency timeline",
      "FSI French hours",
      "how long to learn French",
    ],
    body: `
The first answer you'll find online is "600 to 750 hours." That number comes from the US State Department's Foreign Service Institute, which trains diplomats. It's accurate for what FSI does and misleading for what most people are actually doing.

Here is the honest version of the timeline question, based on too much research and a moderate amount of personal pain.

## The numbers people cite

**FSI** classifies French as a Category I language (alongside Spanish, Italian, Portuguese, Romanian) and estimates **600–750 hours** to "general professional proficiency" (≈ B2 / C1). This is full-time classroom instruction, ~25 hours a week, with native instructors.

**Alliance Française** publishes its own hour estimates per CEFR level: roughly 80–100 hours for A1, 80–100 for A2, 100–150 for B1, and 150–200 to get from B1 to B2. Total to B2 by their estimate: **400–600 hours**.

Both numbers are real and both come from organisations that do this professionally. The reason a self-learner can put in 600 hours and still test below B2 isn't that the numbers are wrong — it's that the *kind of hour* matters.

## Why FSI and Alliance numbers are optimistic for self-learners

An hour at FSI looks like this: a native teacher leads a small group, every minute is productive, errors are corrected in real time, you're forced to speak.

An hour of Duolingo looks like this: 80% review of words you already know, 15% mild productive challenge, 5% confusing sentence reordering, all in a closed system that never makes you generate spontaneous language.

Both count as "an hour of French." They are not the same.

A useful conversion: **one FSI hour ≈ two intensive self-study hours ≈ four casual self-study hours.** Rough, but it explains why the official numbers feel low.

## Realistic timelines by context

Adjusting for what people actually do:

- **Full immersion + 4 hours/day of class** (e.g., a language school in Lyon): **6–9 months to B2** for an Anglophone with no Romance-language background.
- **Intensive course, 15 hours/week, plus self-study**: **12–18 months.**
- **Weekly class (3 hours) + 30 min daily self-study**: **2.5–4 years.**
- **Self-study only, 30 min daily, mix of apps and reading**: **3–5 years**, and that's assuming you actually do the 30 minutes every day.
- **App-only (Duolingo, Babbel, no other input)**: probably never reach B2 cleanly. You'll hit a soft A2 / low B1 ceiling.

The last point isn't snark. Apps optimise for retention and feel-good progress, not for the spontaneous production you need at B2.

## The variables that move the timeline most

In rough order of impact:

1. **Hours of comprehensible input per week.** Reading and listening at i+1. Below 5 hours a week, progress stalls.
2. **Hours of output per week.** You need a real human and you need a regular slot. Even one hour weekly with an italki tutor doubles the rate at which you cement new structures.
3. **Background languages.** Spanish, Italian, Portuguese cut your timeline by maybe 30%. German cuts it by maybe 10–15%. Mandarin, very little. Other Romance languages help you guess vocabulary and recognise grammar shapes.
4. **Consistency.** Daily 25-minute sessions beat weekly 3-hour sessions, by a wide margin. Brains consolidate during sleep; spreading exposure across more nights builds more.
5. **Age, sleep, stress, attention.** Hard to change. Worth noticing.

The first three matter much more than people think. The next two matter much more than people pretend.

## A self-assessment

You're closer to B2 than you think if you can:

- Read a 600-word *Le Monde* opinion piece and explain the writer's argument in English without re-reading.
- Hold a 20-minute conversation about a non-routine topic (a film you saw, an opinion on a current event) with a French speaker who is not a teacher.
- Watch a French TV show with French subtitles and follow the plot.
- Write a one-page email about a complex situation without using a translator.

If three of those four are true, you are probably scoring B2 already. Try a [B2 sample text](/is-this-french-b2) to confirm, and use the [B2 study guide](/learn/b2-french) to fill any gaps.

## The honest opinion

Most people who self-identify as B2 in French are B1.

The asymmetry comes from two places. First, language schools and apps inflate level claims because it sells courses. Second, learners measure themselves by their best moments ("I had this great conversation last week") rather than their worst ("I bombed the phone call to the doctor"). The CEFR levels are baseline-skill levels, not peak-performance levels.

A useful gut check: take a random French text you've never seen, paste it into [the level checker](/), and read it. If B2 texts feel sometimes uncomfortable, you are not yet B2. You are well-developed B1, which is genuinely good and not the same thing.

## The shape of the path

The progression is not linear. A1 → A2 → B1 each feel like clear steps. B1 → B2 feels like flat ground that gets steeper and then drops you on a plateau. You don't see the plateau end; you only notice afterwards that you've cleared it.

The plateau is shortest for learners who:

- Add input volume, not just intensity.
- Output regularly to a human.
- Resist switching methods every two months.

The [Resources page](/resources) lists the tutoring options and graded readers I lean on when planning a 12-month push.

## What to take away

If you have a deadline (immigration exam, course start, job): work backwards from the exam date with a 12-month buffer, not 6. If you don't have a deadline: stop tracking hours and start tracking *consecutive days of contact*. That's the metric that maps to outcome.
`,
  },
  {
    slug: "what-level-is-harry-potter-in-french",
    title: "What level is Harry Potter in French?",
    description:
      "Harry Potter in French is widely recommended to intermediate learners. Honest CEFR breakdown by book, with practical reading advice.",
    date: "2026-06-03",
    readingTime: "5 min read",
    primaryKeyword: "what level is Harry Potter in French",
    secondaryKeywords: [
      "Harry Potter French CEFR",
      "Harry Potter à l'école des sorciers",
      "French novels for intermediate learners",
      "first French novel",
      "Harry Potter French level",
    ],
    body: `
If you ask in any French-learning forum what to read after your first graded reader, half the replies say *Harry Potter à l'école des sorciers*. It's the most-recommended first novel in the language. The advice is decent. The level claim is consistently low by about half a band.

Here's the actual breakdown after running passages from each book through [the level checker](/) and reading the first four cover to cover.

## Book 1: *Harry Potter à l'école des sorciers*

The narration sits at **late B1 to early B2**. Sentence structure is straightforward. Vocabulary is mostly accessible — household, school, food, basic emotions — but Rowling reaches for occasional B2 verbs (*ricaner*, *hocher la tête*, *bredouiller*) where a graded reader would have used something simpler.

Passages I tested:

- Chapter 1 (the Dursleys waking up): **B1.** Description-heavy, present-imperfect, simple.
- The Sorting Hat scene: **B2.** Faster pace, more verbs, more dialogue tags.
- Quidditch chapter: **B2 with C1 spikes.** Magic-specific vocabulary (*Vif d'or*, *Cognard*, *Cogneur*) pushes the analyzer up, but it's not really "C1" in the meaningful sense — it's invented vocabulary you only need to learn once.

Net: solid mid-B1 reader, comfortable; late-B1 reader, learnable; B2 reader, easy.

## Books 2–4

The series gets harder. Rowling's English prose ages with her protagonists; the French translation tracks that.

- **Book 2** (*La Chambre des secrets*): essentially the same level as Book 1. Safe step up.
- **Book 3** (*Le Prisonnier d'Azkaban*): noticeably harder. Longer paragraphs, more abstract themes, more passé simple in narration.
- **Book 4** (*La Coupe de feu*): B2 throughout. The wedding, the press scenes, the political subplots reach C1 in places.

## Books 5–7

These are **B2 to C1** in their entirety. The political and emotional complexity of the later books shifts the narration from "fantasy novel" to "epic with subplots", and the French translation reflects that. They're rewarding reads but they aren't first-novel material.

## Why dialogue is easier than narration

A pattern across the whole series: **the dialogue is roughly one CEFR band easier than the narration.**

Harry, Ron, and Hermione speak in everyday French — present tense, passé composé, futur proche, lots of *je crois que*, *peut-être*, *t'inquiète pas*. The narrator, on the other hand, leans on the literary tenses: passé simple (*il dit*, *elle s'écria*, *ils partirent*) and longer descriptive sentences.

This matters because it means **you can read dialogue with much less effort than a flat CEFR rating suggests**. If a chapter is heavy on dialogue, your subjective experience will be closer to B1. If it's heavy on description, expect B2.

If you're new to recognising passé simple, you'll bounce off the first few description-heavy pages. That's normal. By chapter 3 your eye starts to skip past *il dit* without thinking about it.

## Comparison to other "starter" novels

A loose ladder of first French novels:

- **Le Petit Nicolas** (Sempé/Goscinny). A2–B1. Short stories, child narrator, almost no passé simple. The best true first-novel for early learners.
- **Le Petit Prince** (Saint-Exupéry). A2 in form, B1 in grammar, C1 in meaning. Comfortable for B1+ readers. See my [Petit Prince post](/blog/what-cefr-level-is-le-petit-prince) for why the "easy first book" advice is often half-wrong.
- **Astérix** (Goscinny/Uderzo). Marketed as kids' material, *deceptively* hard. Puns, regional accents, Latin jokes, archaic vocabulary. I'd put it at B2+, not the A2 the comic-book format suggests.
- **Harry Potter Book 1**. Late B1 to early B2.
- **L'Étranger** (Camus). Written almost entirely in passé composé, so the grammar is easier than the reputation. Themes are C1. Net level: late B1 / early B2 for readers willing to sit with the existentialism.

So Harry Potter sits roughly at the same level as L'Étranger, harder than Petit Prince, much harder than Petit Nicolas, and easier than Astérix despite Astérix looking like a comic for kids.

## How to actually read Book 1

The strategy I'd recommend, having now both succeeded and failed at this:

1. **Read chapter 1 with the English version open** in a second window. Read each paragraph in French first, then check English. Don't skip the French.
2. **From chapter 2, close the English.** Read paragraph by paragraph. Allow yourself one dictionary lookup per page. No more.
3. **Skim the description-heavy paragraphs.** If you hit a paragraph that's all setting and your brain is sliding off, accept the 70% comprehension and move on. The plot stays comprehensible.
4. **Don't restart if you stall.** If you put the book down for two weeks, pick up where you left off, not from the beginning.

Before you commit, paste the first page into the [reading-level tool](/french-reading-level). If it comes back at your level or one above, the book is for you right now.

## What to do if Book 1 is still too hard

Don't move to *Petit Prince* as a substitute — same level overall, but harder in the philosophical passages. Move down to **Le Petit Nicolas** or a graded reader rated B1. The [Resources page](/resources) has a few publisher recommendations (CLE International and Hachette FLE are the safe defaults).

When you can finish a B1 graded reader without much effort, Harry Potter will feel like a treat instead of a chore.

## The bigger point

Reading a real novel in French is a turning point — you stop "studying French" and start "consuming French content that happens to be in French." Pick the first novel that lands you on the easy side of that turning point, not the hardest one you can technically read.

For most learners that's *Petit Nicolas* or graded readers first, *Harry Potter* second. Skip *Le Petit Prince* until B1+ and skip *Astérix* until B2.
`,
  },
  {
    slug: "french-subjunctive-when-to-use",
    title: "The French subjunctive: when it's actually required",
    description:
      "The French subjunctive in plain English — six trigger patterns covering 95% of uses, plus the irregular forms worth memorising.",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "French subjunctive when to use",
    secondaryKeywords: [
      "subjonctif français",
      "French subjunctive triggers",
      "il faut que subjunctive",
      "French subjunctive rules",
      "B1 French grammar",
    ],
    body: `
Most grammar books introduce the French subjunctive with a list of 30+ triggers and a tone implying you should already feel bad. The truth is calmer: six trigger patterns handle the overwhelming majority of subjunctive uses in modern French, and once you've internalised them the mood becomes routine.

This is the explanation I wish I'd been given before I had to start using it.

## What the subjunctive actually is

The subjunctive is a **mood**, not a tense. Tense tells you when; mood tells you how the speaker is framing the action.

The indicative (*je vais*) frames an action as fact. The subjunctive (*que j'aille*) frames it as something happening inside someone's wish, doubt, emotion, or required condition — not as plain fact.

Practical version: subjunctive shows up after certain trigger phrases. Memorise the triggers and the mood mostly takes care of itself.

## Trigger 1: il faut que (necessity)

The most common subjunctive trigger in everyday French.

*Il faut que je parte.* — I need to leave.
*Il faut que tu finisses tes devoirs.* — You need to finish your homework.
*Il faut qu'elle soit là à huit heures.* — She needs to be there at 8.

If you only learn one trigger, learn this one. It alone gets you over the recognition threshold of B1.

Related necessity phrases that work the same way: *il est nécessaire que*, *il est important que*, *il vaut mieux que*.

## Trigger 2: expressions of emotion

*Je suis content que tu sois là.* — I'm glad you're here.
*Elle est triste qu'il parte.* — She's sad he's leaving.
*Nous avons peur qu'il pleuve.* — We're afraid it'll rain.

If the main clause expresses a feeling about a subordinate action, the subordinate verb goes in the subjunctive. *Avoir peur que*, *être content/triste/surpris que*, *regretter que*, *adorer que* — same pattern.

## Trigger 3: doubt and possibility

*Je doute qu'il vienne.* — I doubt he'll come.
*Il est possible qu'elle ait raison.* — It's possible she's right.
*Je ne crois pas qu'il sache la réponse.* — I don't think he knows the answer.

Doubt and possibility are inherently non-factual, so the language reaches for the non-factual mood.

Important nuance: the affirmative *je crois que* and *je pense que* take the **indicative**, not the subjunctive. Belief is treated as fact in French. Only the negative or interrogative forms (*je ne pense pas que*, *penses-tu que*) flip into subjunctive.

## Trigger 4: certain conjunctions

A short list of conjunctions that always trigger the subjunctive:

- *avant que* — before
- *bien que* — although
- *pour que* / *afin que* — so that
- *jusqu'à ce que* — until
- *à condition que* — on condition that
- *sans que* — without (action)
- *à moins que* — unless

*Je travaille pour que mes enfants aient une bonne vie.* — I work so that my children have a good life.
*Bien qu'il soit fatigué, il continue.* — Although he's tired, he keeps going.

Memorise these conjunctions as a unit. They are absolute — no exceptions in modern French.

## Trigger 5: negated certainties

When you negate a verb of certainty, the subordinate clause shifts to subjunctive:

- *Il est certain qu'elle vient* → *Il n'est pas certain qu'elle vienne.*
- *Je pense qu'il a raison* → *Je ne pense pas qu'il ait raison.*

The pattern: if negating the main verb introduces doubt, the subordinate verb shifts to subjunctive.

## Trigger 6: wishes and requests

*Je veux que tu viennes.* — I want you to come.
*Elle souhaite que je sois heureux.* — She wishes me to be happy.
*Nous demandons qu'il parle plus fort.* — We're asking him to speak louder.

*Vouloir que*, *souhaiter que*, *demander que*, *exiger que*, *préférer que* — all take subjunctive in the subordinate clause.

A counter-example worth flagging: *espérer que* ("to hope that") takes the **indicative** in modern French (*j'espère qu'il viendra*), against the pattern. Some grammar books still teach subjunctive here, but native usage has moved.

## The irregular forms to memorise

Most subjunctive forms are predictable: take the third-person plural of the indicative, drop *-ent*, add *-e / -es / -e / -ions / -iez / -ent*. The exceptions are concentrated in a handful of very common verbs. Burn these into memory:

- **être**: que je sois, que tu sois, qu'il soit, que nous soyons, que vous soyez, qu'ils soient.
- **avoir**: que j'aie, que tu aies, qu'il ait, que nous ayons, que vous ayez, qu'ils aient.
- **aller**: que j'aille, que tu ailles, qu'il aille, que nous allions, que vous alliez, qu'ils aillent.
- **faire**: que je fasse, que tu fasses, qu'il fasse, que nous fassions, que vous fassiez, qu'ils fassent.
- **pouvoir**: que je puisse, …
- **savoir**: que je sache, …
- **vouloir**: que je veuille, …

These are the verbs you'll need to produce 80% of the time. Drilling them with Anki for two weeks is enough.

## What to ignore until later

A small number of subjunctive forms exist that you do not need in normal conversation:

- **Imparfait du subjonctif** (*qu'il fût*, *qu'elle eût*). Literary only. Recognise it in 19th-century novels; do not produce it.
- **Plus-que-parfait du subjonctif.** Same — literary, mostly dead in speech.
- **Subjonctif passé** (*qu'il ait fait*). This one you will need at B2, but it's a regular construction (subjunctive of *avoir / être* + past participle). Worry about it after you've nailed the present subjunctive.

If you're solid on the six triggers above and the seven irregular verbs, you'll handle 95% of modern French subjunctive use. That's enough for B1 and most of B2. See the [B1 study guide](/learn/b1-french) and [B2 study guide](/learn/b2-french) for where the subjunctive fits into the broader grammar progression. The [glossary](/glossary) has short definitions if you need a quick reference while writing.

## How to drill it

Two exercises, in order:

1. **Trigger-recognition flashcards.** Front: a French sentence with the trigger phrase in bold. Back: the verb in the correct form. Drill until the trigger automatically pulls subjunctive forms out of you.
2. **Forced-output writing.** Pick a B1 topic (a wish, a regret, a necessity in your life). Write five sentences using *il faut que*, *je veux que*, *bien que*. Paste it into [the level checker](/) — if your French registers at the level you intended, the structures are working.

## The reflex you're training

The end state isn't "I can list the triggers." It's "the subjunctive forms appear when I hit one." For most learners that takes three months of conscious use after the initial week of memorisation. After that it stops being something you think about.
`,
  },
  {
    slug: "a2-to-b1-french",
    title: "A2 to B1 French: the exact gap and how to close it",
    description:
      "What separates solid A2 from real B1 — by skill, with a four-week bridge plan if you study one hour a day.",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "A2 to B1 French",
    secondaryKeywords: [
      "A2 to B1 transition",
      "A2 French plateau",
      "intermediate French",
      "B1 French",
      "French study plan",
    ],
    body: `
A2 → B1 is the first real plateau in French learning. The first one was A0 → A1, which was steep but short. A1 → A2 felt like progress. A2 → B1 feels like nothing — for months — and then suddenly it doesn't.

Here is a concrete map of the gap and a four-week bridge plan to cross it.

## The gap, by skill

**Reading.**
- A2: can read short, simple texts on familiar topics. Restaurant menus, postcards, basic news headlines.
- B1: can read straightforward factual articles, follow the plot of a graded novel, get the gist of a news piece if the topic is familiar.
- The jump: from word-level decoding to paragraph-level comprehension. You stop reading word by word and start reading by clauses.

**Writing.**
- A2: can write short personal notes, a brief email about something you did.
- B1: can write a connected paragraph, narrate a past event with multiple steps, give your opinion in two or three sentences.
- The jump: connectors. *Donc, parce que, alors que, en revanche.* If your writing is a series of short sentences glued with *et*, you're A2. If it has logical flow with *mais*, *cependant*, *par contre*, you're moving into B1.

**Listening.**
- A2: understands slow, clear speech on familiar topics.
- B1: follows the main ideas of a podcast or news bulletin in standard speech if the topic is somewhat familiar.
- The jump: tolerating speed. A2 speech is around 110 words per minute; B1 input is at 140–160 wpm.

**Speaking.**
- A2: can describe routine, family, hobbies. Past tense in fragments.
- B1: can sustain a 5-minute conversation on a familiar topic, narrate a past event, express a preference with a reason.
- The jump: holding a conversational turn for more than two sentences without freezing.

## Grammar checklist

You're A2 transitioning if you can produce, on demand:

- Passé composé with all common verbs, including être verbs and reflexives. *Je suis allée, elle s'est levée.*
- Imperfect introduced. *Quand j'étais petit…*
- Futur simple. *Demain je partirai à huit heures.*
- *Si* clauses, hypothesis-1: *si* + present, then future. *Si j'ai le temps, je viendrai.*
- Pronoms COD/COI: *je le vois, je lui parle.*
- Comparatives and superlatives: *plus grand que, le plus intelligent.*

You're entering B1 if you also have:

- The passé composé / imparfait contrast working in narration. (See my post on [passé composé vs imparfait](/blog/passe-compose-vs-imparfait).)
- Conditional present for politeness: *je voudrais, je pourrais.*
- Subjunctive after *il faut que* — even just this one trigger.
- Pronouns *y* and *en*, used more often correctly than not.
- Relative pronouns *qui, que, où*.

If most of the first list is solid and you're inconsistent on the second, you're squarely A2-plus, on the threshold.

## Vocabulary jump

A2 is roughly 1,000 active words; B1 is roughly 2,000. The B1 add is mostly:

- Verbs of opinion: *penser, croire, estimer, considérer.*
- Connectors: *cependant, néanmoins, par contre, en revanche, autrement dit.*
- Abstract nouns: *l'avis, l'opinion, la décision, la raison, la cause.*
- Past-time markers: *autrefois, à l'époque, jusqu'à ce que.*

Notice what's missing from this list: not many concrete nouns. The A2 → B1 vocabulary jump is largely about adding the language of opinion and connection, not about doubling your stock of names for things.

## Listening: from scripted to real

The single best A2 → B1 listening transition is **News in Slow French**. Slower than native, but read with real intonation. After two months of daily News in Slow French, *Inner French* becomes accessible — see my [Inner French level post](/blog/inner-french-podcast-level) for what to expect there.

Don't skip the slow-input stage. Going from scripted A2 dialogues straight to native podcasts is the single most common cause of "I quit listening practice."

## A four-week bridge plan

Assuming roughly one hour a day, five days a week.

**Week 1: lock down the imperfect.**
- 15 min/day: imparfait drills. Form, then meaning, then contrast with passé composé.
- 25 min/day: read a B1 graded reader (CLE International A2/B1).
- 20 min/day: News in Slow French, one episode, with transcript.

**Week 2: opinions.**
- 15 min/day: vocabulary deck of B1 opinion verbs and connectors (20 cards/day).
- 20 min/day: writing — two short paragraphs per day giving an opinion on something (a film, a meal, the weather), using at least two connectors each.
- 25 min/day: continue B1 reader and News in Slow French on alternating days.

**Week 3: subjunctive trigger 1.**
- 10 min/day: drill *il faut que* with different subjects and verbs.
- 20 min/day: italki or language-exchange conversation, 30 minutes twice in the week.
- 30 min/day: read B1 graded reader.

**Week 4: integration.**
- 30 min/day: full B1 podcast episode (Inner French or News in Slow French), one per day.
- 20 min/day: 100-word writing prompt, including imperfect, conditional, and *il faut que*.
- 10 min/day: review the week's vocabulary.

End of week 4, paste your own writing into [the B1 detector](/is-this-french-b1). If it comes back B1, you've crossed.

## The trap of "feeling stuck"

A2 → B1 has a peculiar shape: you cross the line before you notice. People feel A2-stuck for months while actually being B1, because the input they consume is mostly above their level. They never get the satisfaction of "I understood that without effort" because they keep choosing things at the wrong difficulty.

The fix is to deliberately read material *below* your current level once a week. Pick up a B1 graded reader. If you breeze through it, you've crossed. Then go back to harder material with the confidence that you're not actually stuck.

## When to bother sitting an exam

DELF B1 confirms the level externally, which matters for some jobs and immigration paths. For most learners, the exam is overkill at this stage — it's worth more at B2 (the level employers and universities ask for).

The [A2 study guide](/learn/a2-french) and [B1 study guide](/learn/b1-french) walk through the longer routine, and [the level checker](/) is the fastest way to verify any text you're reading is at the right difficulty.

## Bottom line

A2 → B1 is not about adding 1,000 words. It's about adding the *connective tissue* — connectors, opinion verbs, the imperfect, *il faut que* — that lets you build longer thoughts. Cross that, and B1 is yours.
`,
  },
  {
    slug: "quebec-french-vs-france-french",
    title: "Quebec French vs France French: the actual differences",
    description:
      "Quebec French vs France French in plain terms — pronunciation, vocabulary, expressions, mutual intelligibility, and which one to learn.",
    date: "2026-06-03",
    readingTime: "6 min read",
    primaryKeyword: "Quebec French vs France French",
    secondaryKeywords: [
      "Québécois French",
      "Canadian French",
      "French dialects",
      "TEF Canada French",
      "joual",
    ],
    body: `
I'm in Waterloo, two hours west of Montreal. My French teachers were Parisians; my partner's family is from Saguenay. I have spent two years caught between the two registers and quietly making notes. Most articles on this topic are written by Europeans who flew through Montreal once. This is the local version.

## What people mean by "Quebec French"

A small disambiguation first. "Quebec French" usually means standard urban Québécois — the French of Montreal news anchors, Quebec novelists, the *téléjournal*. It is more conservative than the spoken French of the regions (Saguenay, Lac-Saint-Jean, Gaspésie), which has thicker accents and more divergent vocabulary. When people complain "I can't understand Quebec French," they often mean regional Quebec, not Montreal Quebec.

For learners, the version you'll encounter on TV, in cinema, and in most workplaces is Montreal Quebec. That's the one this post is about.

## Pronunciation: the real differences

This is where the two are most distinct. The grammar is essentially identical (with a couple of exceptions); the sound is not.

**Vowels.** Quebec French keeps several distinctions that have collapsed in Paris: *brun / brin* are distinct (in Paris they sound the same), and *patte / pâte* are distinct (in Paris many speakers no longer distinguish them). Quebec also nasalises differently — *banc* in Montreal has a more open vowel than in Paris.

**Diphthongs.** Quebec French diphthongises long vowels: *père* sounds closer to *paèr*, *fête* closer to *faète*. Parisian French keeps these as pure long vowels. This is the single feature that screams "Quebec" to a French listener.

**Affrication.** *t* before *i* or *u* becomes *ts*; *d* before *i* or *u* becomes *dz*. *Petit* sounds like *p'tsi*, *dur* like *dzur*. Once you've noticed this you can't unnotice it.

**Contraction in fast speech.** *Tu es* → *t'es*. *Sur la* → *sa*. *Dans le* → *dans l'*. *Il est* → *y'est* or just *é*. *Je suis* → *chu*. Conversational Montreal sounds nothing like a textbook.

## Grammar: tiny differences

Mostly the same. The notable wrinkles:

- *Tu* as a question marker. In informal Quebec speech, you'll hear *t'as-tu vu ça?* — the second *tu* is not a pronoun, it's a casual question particle. Listen for it; you don't need to produce it.
- Anglicisms used as verbs more freely (*je vais checker*). Quebec writing actively resists this; Quebec speech absorbs it.

For DELF purposes, none of this matters — DELF tests standard French and both varieties qualify.

## Vocabulary: the 20 words that catch you out

Real differences. Quebec column first, France column second.

- *char* / *voiture* — car
- *blonde* / *petite amie* — girlfriend
- *chum* / *petit ami* — boyfriend (also "friend" in some contexts)
- *dépanneur* / *épicerie de quartier* — convenience store
- *magasiner* / *faire les magasins* — to shop
- *piastre* (informal *piasse*) / *euro* — dollar
- *bienvenue* (response to *merci*) / *je vous en prie* — you're welcome
- *présentement* / *actuellement* — currently
- *céduler* (a meeting) / *fixer / planifier* — to schedule
- *placoter* / *bavarder* — to chat
- *jaser* / *discuter* — to talk casually
- *liqueur* / *boisson gazeuse* / *soda* — soft drink
- *barrer (la porte)* / *fermer à clé* — to lock
- *fin de semaine* / *week-end* — weekend
- *bibitte* / *insecte* — bug
- *traversier* / *ferry* — ferry boat
- *suçon* / *sucette* — lollipop (and watch: *sucette* in Quebec can mean a hickey)
- *gomme* / *chewing-gum* — gum (in France *gomme* is an eraser)
- *char d'assaut* / *tank* — tank (military)
- *patente* / *truc / machin* — thing / gizmo

Most of these are recognisable in context. A few — *suçon* in particular — get learners in genuine trouble.

## Expressions you'll meet in Quebec

- *Tabarnak* / *câlisse* / *crisse* — the famous Quebec *sacres*, religious curse words. Cultural baggage. Useful to recognise, dangerous to use as a learner unless you know the room.
- *C'est-tu correct?* — Is that OK? (The *tu* is the question particle, not "you.")
- *Pantoute* — not at all.
- *Faque* (from *ça fait que*) — so / therefore. Used like *donc*.
- *T'sais* (from *tu sais*) — y'know. Filler word, frequent.

## Mutual intelligibility

- **Written.** Near-identical. A Quebec newspaper and a French newspaper differ in maybe 5% of vocabulary, and the differences are usually transparent.
- **Slow spoken Quebec.** Most French speakers from France understand it without effort.
- **Fast spoken regional Quebec.** Genuinely hard for Parisians. Quebec films are sometimes subtitled when shown in France for this reason. The asymmetry runs the other way too: rural French regional accents (Marseille, Picardy) can stump Québécois.
- **For learners.** Spending a year in one variety, you'll need maybe a month to fully tune your ear to the other. Reading transfers immediately.

## Which to learn

If your goal is **Canadian PR, Quebec immigration, or working in Quebec**: learn standard Quebec French, but don't obsess over it. The TEF Canada and TCF Canada accept either variety. Quebec workplaces are increasingly bilingual and tolerant of Parisian accents.

If your goal is **France-side immigration, university in France, or general European travel**: learn standard European French. Quebec accents are understood; Quebec slang isn't always.

If your goal is **just general fluency and you're not sure where life will take you**: learn standard European French first, then add Quebec exposure once you're at B1+. The grammar transfers cleanly; the vocabulary additions are small.

The [B1 study guide](/learn/b1-french) and [B2 study guide](/learn/b2-french) are variety-neutral. The [Resources page](/resources) lists both Radio-Canada and France Inter podcasts so you can build exposure on either side.

## A practical exposure mix

For a learner aiming at Quebec immigration, my rough mix:

- 60% standard European input (grammar, podcasts, graded readers — most material is European-French by volume).
- 30% Quebec input (Radio-Canada news, *Tout le monde en parle*, a Québécois podcast like *Plus on est de fous, plus on lit*).
- 10% conversation with Québécois speakers.

After six months of that, the accent shifts on its own.

## The bottom line

Quebec French and France French are dialects of one language, with a real but contained set of differences. Worry about them less than the internet suggests. Pick the variety closest to your life, learn it well, and the other variety opens up with a few weeks of focused exposure. Anywhere you can paste a paragraph and want to verify the level, [the checker](/) works the same for both.
`,
  },
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
