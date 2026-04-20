# Threej.in Chrome Extension

This extension shows the live game catalog from `https://threej.in` and opens the selected game directly.

## Load it in Chrome

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select the folder:
   - `game-portal/chrome-extension`

## How it works

- Popup fetches `https://threej.in/api/games`
- Shows all games with cover images and titles
- Clicking a game opens:
  - `https://threej.in/play/<slug>`

## Files

- `manifest.json`
- `popup.html`
- `popup.css`
- `popup.js`
