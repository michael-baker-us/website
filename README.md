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

Deploys to GitHub Pages automatically via `.github/workflows/deploy.yml`
on every push to `main`.

First-time setup on a fresh GitHub repo:

1. Create the repo on GitHub (empty, no README/license/gitignore).
2. Add it as a remote and push:
   ```sh
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source** →
   select **GitHub Actions**. (One-time setting — the workflow handles
   every deploy after that.)
4. The Actions tab will show the `Deploy to GitHub Pages` run; once green,
   the site is live at `https://<you>.github.io/<repo>/`.

To use a custom domain instead, add a `CNAME` file at the repo root
containing the domain, and point its DNS at GitHub Pages.
