# michael.baker — personal site

Personal site / engineering identity page. Dark, terminal-inflected, single page.

## Stack

Plain HTML + CSS + vanilla JS. No framework, no build step, no dependencies.

- `index.html` — all content lives here
- `styles.css` — theme is driven by CSS variables in `:root` (change `--accent` to re-skin the whole site)
- `main.js` — hero typing effect, scroll-reveal, footer year

## Run locally

Open `index.html` in a browser. That's it. (Or `python3 -m http.server` if you want a real origin.)

## Deploy

Made for GitHub Pages: push to `main`, then enable Pages on the repo
(Settings → Pages → Deploy from branch → `main` / root).
