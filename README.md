# Dream Media v2.1 — Installable Web App (PWA)

This ZIP contains a complete static Progressive Web App. Keep the folder contents together:

- `index.html` — Dream Media library and picker
- `manifest.webmanifest` — installation metadata
- `sw.js` — app-shell offline support
- `icons/` — Dream Media icons for desktop and mobile

## Install from a hosted URL (recommended)

Upload the **contents of this folder** to an HTTPS-enabled static host, e.g. GitHub Pages, Netlify, or Cloudflare Pages. Keep `index.html`, `manifest.webmanifest`, `sw.js`, and `icons/` at the same relative level. Open the resulting HTTPS URL in your browser.

- **Windows / Mac (Chrome / Edge):** use the address bar's install icon or the browser menu's **Install Dream Media** / **Install this site as an app** action.
- **Android (Chrome):** browser menu → **Install app** or **Add to Home screen**.
- **iPhone / iPad:** browser Share menu → **Add to Home Screen**. In-app install prompts are not supported on iOS.

The Settings tab includes installation guidance and an Install button when the browser offers it.

## Local test on your computer

With Python installed, open a terminal inside this folder and run:

```
python -m http.server 8000
```

Then visit `http://localhost:8000/` using Chrome or Edge. **Do not double-click `index.html` to test installation:** `file://` cannot register the service worker or be promoted as an installable PWA.

A local-server installation depends on that localhost address. To use the app reliably across devices, host it on an HTTPS URL.

## Data and offline support

**Back up your library before moving.** In the previous Dream Media version, go to Settings → **Backup JSON**. In the hosted v2.1 app, go to Settings → **Restore JSON**. Browser storage is separated by origin, and installing from another URL does not automatically copy entries or TMDB credentials. Your library is not stored in the ZIP.

Once the app has successfully loaded while online, the main interface, saved library, notes, statuses, and progress can be used offline on that browser/device. Catalog searches (TMDB, AniList, Open Library, Wikidata, TVmaze) and remote cover images need internet. Browser data can still be cleared, so keep JSON backups.

The TMDB token is **not included** in this package. Connect it inside Settings on the installed app as needed. Avoid sharing or committing a personally configured HTML file containing secrets.

## What changed from v2.0

- Removed both circled floating sparkle illustrations from the dashboard hero and collection panel.
- Added full app branding icons, install manifest, service worker and offline app shell.
- Added a small Install Dream Media guide/status area inside Settings.
- Preserved all previous library, dashboard, progress and universal random picker functionality.
