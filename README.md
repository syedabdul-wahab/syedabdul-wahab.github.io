# Syed Abdul Wahab — Portfolio

Personal portfolio for **Syed Abdul Wahab**, Senior iOS Developer & SwiftUI
Specialist. Pure static site (HTML + CSS + vanilla JS) — no build step, no
dependencies. Deploys free to **GitHub Pages** or **Vercel** with no custom
domain required.

## Preview locally

Just open `index.html` in a browser, or run a tiny server:

```bash
cd wahab-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy — Option A: GitHub Pages (recommended)

Gives you a free URL: **https://syedabdul-wahab.github.io**

1. Create a new repo on GitHub named exactly `syedabdul-wahab.github.io`
   (public, empty — no README).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/syedabdul-wahab/syedabdul-wahab.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages** → confirm Source is `main` branch, `/ (root)`.
4. The site is live at `https://syedabdul-wahab.github.io` within a minute or two.

To update later (e.g. adding screenshots):
```bash
git add . && git commit -m "Add screenshots" && git push
```

## Deploy — Option B: Vercel

Gives you a free URL like **https://wahab-portfolio.vercel.app**

1. Push this folder to any GitHub repo (any name).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New → Project**, import the repo.
3. Framework preset: **Other** (it's plain static). Click **Deploy** — done.

Or without GitHub at all, using the CLI:
```bash
npm i -g vercel
cd wahab-portfolio
vercel --prod
```

## Customizing

- **Screenshots** — see [assets/screenshots/README.md](assets/screenshots/README.md).
  Drop correctly-named images in that folder and they appear automatically.
- **App Store links** — in `index.html`, search for `appstore-link` and replace
  the `href="#"` placeholders with the real App Store URLs (Moneda, IPTV
  Smarter Player, Candy Box).
- **Content** — everything (bio, experience, projects) lives in `index.html`;
  styling in `css/style.css`; interactions in `js/main.js`.

## Structure

```
wahab-portfolio/
├── index.html          # all content
├── css/style.css       # Apple-inspired dark theme
├── js/main.js          # nav, scroll reveals, counters, project filters
└── assets/screenshots/ # drop app screenshots here
```
