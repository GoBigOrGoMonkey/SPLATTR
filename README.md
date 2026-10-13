# SPLATTR! website (static)

Plain HTML, CSS and JavaScript — no build step, no dependencies. This is the
current SPLATTR! design (forest hero, three feature columns, dev updates,
Discord link, mobile menu) ported from the React/TanStack version so it
deploys on Vercel without a build

## Files
- `index.html` — the page (all copy lives here)
- `style.css` — design tokens and all styling
- `script.js` — mobile menu toggle
- `404.html` — "Page not found" page
- `assets/forest-arena.jpg` — hero image
- `favicon.svg`, `robots.txt`, `vercel.json`

## Preview locally
Open `index.html` in a browser.

## Deploy to Vercel
1. Make sure the repo contains **only these files at its top level**, with
   `index.html` at the root (not inside a subfolder). If the repo still has
   files from the React version — `package.json`, `bun.lock`, `vite.config.ts`,
   `src/`, `public/`, `tsconfig.json` and so on — delete them first. Leftover
   build files make Vercel try to run a build.
2. Commit and push. Vercel redeploys automatically.
3. If Vercel complains about a Build Command or Output Directory, open
   **Settings → Build and Development Settings**, set Framework Preset to
   **Other**, and clear any Build Command / Output Directory overrides.

## Editing
- Change text in `index.html`.
- Change colours in the `:root` block at the top of `style.css`.
