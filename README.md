# Saiduzzaman Md. — Portfolio

A single-page portfolio site built from CV content: experience, research & publications,
education, certifications, and skills. Plain HTML/CSS/JS — no build step, no dependencies.

## Preview locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages (free hosting)

1. **Create a repository** on GitHub (e.g. `saiduzzaman.github.io` for a root domain,
   or any name like `portfolio` for a project page).
2. **Upload these files** to the repository, keeping the folder structure:
   ```
   index.html
   README.md
   assets/
     headshot.png
     Saiduzzaman_Md_CV.pdf
   ```
   Easiest way: on the repo's GitHub page, click **Add file → Upload files**, drag in
   the whole folder contents, and commit.
   Or via git:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. **Turn on Pages**: repo → **Settings → Pages** → under "Build and deployment",
   set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. GitHub gives you a live URL after a minute, usually:
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`), or
   - `https://<your-username>.github.io/<repo-name>/` (for any other repo name).

## Customizing

- **Photo**: replace `assets/headshot.png` with a new image of the same filename, or
  update the `src` in the `<img>` tag inside the hero section of `index.html`.
- **Downloadable CV**: replace `assets/Saiduzzaman_Md_CV.pdf` with an updated version
  (keep the same filename, or update the "Download full CV" link in `index.html`).
- **Links**: add LinkedIn, GitHub, Google Scholar, or ORCID links in the contact section
  and hero actions — search `index.html` for `<div class="contact-grid">` and
  `hero-actions`.
- **Colors / fonts**: all design tokens are CSS variables at the top of the `<style>`
  block in `index.html` (`--bg`, `--amber`, `--teal`, `--serif`, `--mono`, etc.) — change
  those to restyle the whole page.
- **Publication #6**: your CV listed a 6th publication entry with no details yet — once
  you have the title, authors, venue, and status, copy one of the existing `.pub` blocks
  in the "Research & publications" section of `index.html` and fill it in.
- **Custom domain**: if you own a domain, add a `CNAME` file at the repo root containing
  just your domain name, then configure DNS per
  [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Structure

```
index.html   — all markup, styles, and behavior (self-contained, single file)
assets/      — headshot image + downloadable CV PDF
README.md    — this file
```
