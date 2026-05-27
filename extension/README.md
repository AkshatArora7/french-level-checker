# French Level Checker — Chrome Extension

CEFR (A1–C2) for any French text on any webpage. Right-click, keyboard shortcut, or paste-in popup — with a tiny in-page floating card, audio playback, and a saved-word study list.

## Install (unpacked, for development)

1. Open `chrome://extensions`
2. Toggle **Developer mode** on (top right)
3. Click **Load unpacked** and select this `extension/` folder
4. Pin the extension to your toolbar

## Five ways to use it

1. **Keyboard shortcut** — select French text on any page and press **`Alt`+`Shift`+`F`**. If nothing is selected, it analyzes the main article on the page instead.
2. **Right-click → Check French level — selection** — fastest way for short snippets.
3. **Right-click → Check French level — whole page** — analyzes the main `<article>` / `<main>` content.
4. **Popup → ↧ Selection / ⎙ Whole page** — one-click buttons that read the active tab without copy-pasting.
5. **Popup → paste** — drop any text into the textarea (up to 3000 chars).

## What you get back

- The **CEFR level** (A1–C2) with a confidence percentage.
- **Difficult words**, filtered to only show words **above your target level** (configurable in Settings). Each one has a 🔊 speak button (fr-FR) and a ⭐ save button.
- A **simpler version** rewritten down to your level.
- **History** — the last 20 analyses, click any to re-open.
- **Saved words** — your personal study list, with **Export CSV** for Anki / Quizlet / Notion.

## In-page floating card

After any analysis (right-click or shortcut), a small card appears in the top-right of the page. It is:

- **Draggable** by the title bar — position is remembered.
- **Isolated in shadow DOM** so the host page's CSS can't break it.
- Has a 🔊 speak button for the whole text and 🔊/⭐ buttons for each word.
- Has an **"Open in analyzer →"** button that opens the full website with your text pre-filled.

## Settings

Open the popup → **Settings** tab.

- **Target level** (A1–C2) — words above this level are flagged as difficult. Defaults to B1.
- **API URL** — defaults to `https://french.aatechax.com/api/analyze`. Change only when pointing at a preview deploy.
- **Keyboard shortcut** — customize at `chrome://extensions/shortcuts`.

## Files

- `manifest.json` — MV3 manifest. Declares context menus, popup, `commands` keyboard shortcut, host permissions.
- `background.js` — service worker. Handles context menus, the keyboard shortcut, popup ↔ tab bridging for selection/page text, history persistence.
- `content.js` — injected per-tab. Shadow-DOM floating card with drag, TTS, save-word.
- `popup.html` / `popup.css` / `popup.js` — tabbed popup (Analyze / History / Saved / Settings).
- `common.js` — shared helpers used by the popup (settings, history, saved words, TTS, analyze).

## Privacy

The extension only sends text to the analyze endpoint when **you** trigger an analysis. History and saved words are stored in your browser's local storage and never leave your machine.

## To publish to the Chrome Web Store

1. Add 16/48/128 px PNG icons under `extension/icons/` and reference them in `manifest.json`.
2. Zip the contents of `extension/` (not the folder itself).
3. Upload at https://chrome.google.com/webstore/devconsole.
