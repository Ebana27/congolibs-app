# CongoLibs — Quick Start & Integration Notes

This document helps any developer (Windows, macOS, Linux) get the project running quickly and explains how to integrate Ionic/Capacitor with a Django backend without breaking architecture.

## Quick Start (Any OS)

1. Clone the repo and open a terminal in the project folder.
2. Install dependencies (if not already installed):

   ```bash
   npm install
   ```

3. Start the dev server (Vite):

   ```bash
   npm run dev
   ```

4. Open the app in a browser at `http://localhost:5173` (Vite default).

Or use the helper scripts in the repo:
- Windows: run `run-project.bat` (double-click or run in CMD/Powershell)
- macOS / Linux: run `./run-project.sh` (make executable: `chmod +x run-project.sh`)

## Notes about Routing and SPA behavior

- This project uses a simple hash-based router (`src/router.js`). Links should use hash URLs like `#home`, `#books`, `#results`, etc. If links point to file paths (e.g. `/books.html`) the browser will perform a full navigation and may load the default onboarding route.
- To make the navbar work as SPA navigation, use `href="#route"` and add `data-nav-link="route"` to the anchor so the router can highlight the active item.
- If you prefer history-based routing (no `#`), you must configure the dev server and production server to always return `index.html` for unknown paths.

## Adding Capacitor / Ionic to an existing frontend project

1. Install Capacitor dependencies locally:

   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init "CongoLibs" com.example.congolibs
   ```

2. Add a native platform (Android example):

   ```bash
   npx cap add android
   npx cap sync
   npx cap open android
   ```

3. During development you can point Capacitor to the running dev server (Vite): set `server.url` in `capacitor.config.json` to `http://localhost:5173` and `npx cap open android` will load the live site.

## Integrating Ionic/Capacitor with Django (two safe approaches)

Option A — Frontend as separate SPA + Django API (recommended)

- Keep Django as a pure backend API (Django REST Framework). The Ionic/Capacitor app is a separate repository or folder and talks to Django via HTTP API endpoints.
- Advantages: clear separation of concerns, independent deploys, easier scaling and mobile packaging.
- Steps:
  1. Implement APIs in Django (auth, books, results) and enable CORS (e.g., `django-cors-headers`).
  2. In the Ionic app, set base API URL in an environment variable (e.g. `API_URL=https://api.example.com`).
  3. Build the web app for production (`npm run build`) and deploy to static host / Netlify if needed.

Option B — Serve built SPA from Django static files (single deploy)

- Build the Ionic web app (`npm run build`) which produces static files (e.g., `dist/`). Copy the build output into Django `static/` (or configure Django `STATICFILES_DIRS`).
- Configure Django URLs to serve `index.html` for the SPA entry point (use a catch-all view for client-side routing).
- Advantages: single deployment artifact and one domain (simpler CORS); Disadvantages: intertwines frontend and backend deployments.

How to avoid breaking Django architecture

- Do not replace Django templates blindly — treat the SPA as static assets served by Django.
- Keep API under a clear prefix (e.g. `/api/`) so SPA and Django views are separable.
- Use versioning for API endpoints and document expected contract (JSON schema).

## Adding Django to an Ionic project (embedding Django dev server)

- For local combined development, run both servers:
  - `npm run dev` (Vite) — frontend
  - `python manage.py runserver` — backend API
- Configure the frontend to use the Django API URL (e.g. `http://localhost:8000/api`).
- For production, prefer Option A/B above depending on deployment strategy.

## Router hint (specific to this project)

- The simple router in `src/router.js` defaults to the `onboarding` route when the hash is empty. If you want the app to open `#home` by default, change the default in `handleRoute()`:

  ```js
  const raw = window.location.hash.slice(1) || 'home';
  ```

## Troubleshooting

- If clicking navbar links always returns to `onboarding`, ensure links use `href="#route"` (not file paths) and that `src/router.js` is loaded in the base page.
- Ensure `id="bottom-nav"` is present on the floating nav so the router can hide it on the onboarding route.

---
If you want, I can also:
- extract the navbar/header into a single fragment to include only on specific pages,
- update all pages to use the new header layout (2 left / 1 right),
- or add a small Django + Express mock example to demonstrate the integration.
