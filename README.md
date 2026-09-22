# Saiduzzaman Md. — Ph.D. Applicant Portfolio

A single-page academic portfolio: fixed sidebar with photo, contact info, and a
CV download; a scrolling content column for Research Interests, Education,
Research Experience, Projects, Publications, Professional Experience, Skills,
and Certifications.

No build step — three plain files plus assets.

```
index.html
style.css
script.js
assets/
  profile.jpg
  Saiduzzaman_CV.pdf
```

## Deploy on GitHub Pages

1. Create a new repository (e.g. `saiduzzaman.github.io` for a user site, or
   any name for a project site).
2. Add these files to the repository root and push to `main`.
3. In the repo, go to **Settings → Pages**, set **Source** to `main` /
   `(root)`, and save.
4. GitHub gives you a URL a minute or two later — for a repo named
   `username.github.io` that's `https://username.github.io/`; for any other
   repo name it's `https://username.github.io/repo-name/`.

## Updating content later

- **CV**: replace `assets/Saiduzzaman_CV.pdf` with the same filename, or
  update the `href` on the "Download CV" button in `index.html` if you rename
  it.
- **Photo**: replace `assets/profile.jpg` (keep it portrait-oriented — the
  frame is fixed at roughly 4:5).
- **Text**: every section in `index.html` is plain HTML with clear `id`s
  matching the sidebar nav — find the section, edit the text.
- **New publication**: copy an existing `<li>` inside `.pub-list`, update the
  citation, and add a `pub-status presented` or `pub-status submitted` tag.

## Notes

- Fonts (Spectral, IBM Plex Sans, IBM Plex Mono) load from Google Fonts —
  the page still works offline, just falls back to system fonts.
- The trace graphic above the intro paragraph is generated at runtime in
  `script.js` (`signalSvg` block) — a row of baseline points with one
  highlighted, a small nod to the anomaly-detection subject matter itself.
- Respects `prefers-reduced-motion`.
