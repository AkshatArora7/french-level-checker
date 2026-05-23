# French Level Checker — Chrome Extension

Right-click any French text on a webpage to see its CEFR level (A1–C2), difficult words, and a simpler version. Also includes a popup for pasting text directly.

## Install (unpacked, for development)

1. Open `chrome://extensions`
2. Toggle **Developer mode** on (top right)
3. Click **Load unpacked** and select this `extension/` folder
4. Pin the extension to your toolbar

## Use

- **Right-click flow:** Select French text on any page → right-click → **Check French level**. A floating card appears in the top-right with the result.
- **Popup flow:** Click the extension icon → paste text → **Révéler le niveau**.

## Configure the API endpoint

The extension calls `https://french.aatechax.com/api/analyze` by default. To point it elsewhere (e.g. a Vercel preview deploy), open the popup → **Settings** → change **API URL** → **Save**.

## Files

- `manifest.json` — MV3 manifest, declares the context menu, popup, and host permissions
- `background.js` — service worker; registers the context menu, calls the API on selection
- `content.js` — injects a shadow-DOM card on the page with the result (no CSS leakage)
- `popup.html` / `popup.css` / `popup.js` — paste-in popup UI

## To publish to the Chrome Web Store

1. Add 16/48/128 px PNG icons under `extension/icons/` and reference them in `manifest.json`
2. Zip the contents of `extension/` (not the folder itself)
3. Upload at https://chrome.google.com/webstore/devconsole
