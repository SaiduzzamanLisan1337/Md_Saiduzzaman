# Md. Saiduzzaman — Academic Portfolio

A responsive, static academic portfolio inspired by the editorial layout and research-first storytelling of the L1NNA Research Lab website.

## Run locally

Open `index.html` in a browser, or run a local static server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

Upload the contents of this folder to the root of the `Md_Saiduzzaman` repository and enable GitHub Pages from the repository's `main` branch and root folder.

## Included files

- `index.html` — portfolio content and page structure
- `styles.css` — responsive design system, layout, and motion styling
- `script.js` — navigation, scroll progress, reveal effects, and counters
- `assets/` — profile photo, CV, and presentation certificates

The site has no build step or package dependencies. Google Fonts are loaded from Google Fonts when a network connection is available; system font fallbacks are included.


## Portfolio v3 visual updates
- Added a 400 × 400 px square JPEG profile avatar (`assets/profile-avatar.jpg`) displayed circularly in the sticky navigation.
- Applied the requested responsive typography scale: desktop H1 48–72 px, H2 32–40 px, H3 20–24 px; mobile H1 32–40 px, H2 24–28 px, body copy 16 px.
- Reduced the hero portrait footprint and adjusted its crop.
- Standardized publication entries into a single content column per status group to prevent alignment drift.
