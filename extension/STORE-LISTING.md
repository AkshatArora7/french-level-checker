# Chrome Web Store — Listing copy

Paste each section into the corresponding field in the Chrome Web Store dev console
(https://chrome.google.com/webstore/devconsole/) when you create the new item.

---

## Item name (45 char max)
French Level Checker — CEFR for any text

## Summary (132 char max — shown in search results)
Highlight French text on any page to see its CEFR level (A1–C2), difficult words, and a simpler version. Free, no signup.

## Category
Productivity

## Language
English (and the site is available in French)

---

## Description (16,000 char max — paste the block below)

**Check the CEFR level of any French text — without leaving the page.**

French Level Checker reads any French text you highlight on a webpage and instantly tells you whether it is A1, A2, B1, B2, C1, or C2 — the standard CEFR levels used by language teachers, schools, and exams worldwide.

It also shows you exactly what makes the text hard: which words you might not know, which grammar features are above level, and a simpler version rewritten one level lower so you can compare side by side.

**What you get**

• **CEFR level (A1–C2)** with a confidence score and a one-sentence explanation in English.
• **Difficult words** highlighted in the text, each with translation, level, and a short note (gendered noun, irregular form, false friend, etc.). Click any word to add it to your personal vocabulary list.
• **Grammar features** that pushed the level up — passé composé, subjonctif, conditionnel, literary tenses, and more — with the exact phrase from your text as an example.
• **A simpler version** of the same text rewritten one CEFR level lower. Great for graded reading.

**Built for French learners and teachers**

• **Find reading material at your level.** Paste an article and immediately see if it is the right difficulty. No more abandoning texts that are too hard or wasting time on ones that are too easy.
• **Check your own writing.** Aiming for a B2 essay? Paste it and see whether it actually scores B2.
• **Build a vocabulary list as you read.** Save flagged words with one click. The companion site at french.aatechax.com includes a built-in spaced-repetition trainer.
• **Plan your lessons.** Teachers can quickly grade reading passages and produce simpler versions for differentiated instruction.

**Privacy by default**

• No account. No login. No tracking cookies.
• Your text is sent over HTTPS to our analysis API and returned to you — we don&apos;t store it.
• Your saved vocabulary lives in your browser only, never on our servers.
• Full policy: https://french.aatechax.com/privacy

**Companion website**

This extension is a quick-action version of the full tool at https://french.aatechax.com, which also includes:

• A daily French Wordle.
• A daily &ldquo;mot du jour&rdquo; flashcard with example sentences.
• A spaced-repetition vocabulary trainer.
• Per-level study guides (A1 through C2).

Free, no signup. Built by Akshat Arora.

---

## Privacy policy URL (required field)
https://french.aatechax.com/privacy

## Homepage URL
https://french.aatechax.com

## Support email
akshat.arora456@gmail.com

---

## Justifications for permissions (Chrome will ask)

**Single-purpose description**
The extension has one purpose: tell you the CEFR level of French text you select on a webpage, with difficult words, grammar features, and a simpler version.

**activeTab justification**
Used to read the user&apos;s current text selection on the active tab when they click the toolbar icon or pick &ldquo;Check French level&rdquo; from the right-click menu. The extension never reads tab content unprompted.

**scripting justification**
Used together with activeTab to grab the selected text from the page when the user triggers the analysis.

**contextMenus justification**
Used to add a single &ldquo;Check French level&rdquo; entry to the right-click menu so users can analyse selected text without opening the popup.

**storage justification**
Used to cache the user&apos;s most recent result and small UI preferences (popup size, last-used skin) locally in chrome.storage. No data is sent anywhere.

**Host permission justification (https://french.aatechax.com/* and https://*.vercel.app/*)**
The extension sends the user&apos;s selected text to our analysis API at the project&apos;s public domain. The Vercel host pattern is needed for preview deployments. No other domains are contacted.

**Remote code use**
The extension does NOT load remote code. All extension JavaScript is bundled inside the package. The only network call is a JSON POST to the analysis API endpoint described above.

---

## Required assets to upload alongside the listing

You need to provide these images yourself in the dev console. Sizes:

1. **Store icon** — 128×128 PNG. Already bundled inside the ZIP at icons/icon-128.png; download it from public/french-level-checker-extension.zip if you need a copy to upload separately.
2. **At least one screenshot** — 1280×800 or 640×400 PNG/JPEG. Suggested shots:
   - The popup with a sample analysis result (open the extension after installing it, take a screenshot of the popup window).
   - The website&apos;s main analyzer showing a result with highlighted words.
   - The Wordle or Mot du jour screen for visual variety.
3. **Optional promotional tile** — 440×280 PNG/JPEG. Improves placement on the Chrome Web Store.

---

## Final checklist before submitting

- [ ] Paid the $5 one-time developer fee (done).
- [ ] Uploaded `public/french-level-checker-extension.zip` (rebuilt with v1.0.0).
- [ ] Pasted the description above.
- [ ] Set Privacy Policy URL to `https://french.aatechax.com/privacy`.
- [ ] Set Homepage URL to `https://french.aatechax.com`.
- [ ] Filled in the permission justifications above.
- [ ] Selected category: Productivity.
- [ ] Uploaded at least one 1280×800 screenshot.
- [ ] Selected &ldquo;This item is **not** designed for children under 13.&rdquo;
- [ ] Submitted for review. Expect 1–3 business days.
