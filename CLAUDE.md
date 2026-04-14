# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
hugo server          # Dev server at http://localhost:1313/ with live reload
hugo                 # Production build → public/
hugo --minify        # Production build with minification (used by CI)
```

No test runner, linter, or package manager. This is a pure Hugo static site with no Node/npm.

## Architecture

Hugo static site for [Unusual Technologies](https://unusualtechnologies.github.io/ut-hugo-site/). No server-side code, no database.

**Content flows from three sources into HTML:**

1. `content/` — Markdown files with YAML front matter. Projects live in `content/projects/<slug>/index.md` (page bundles). Each project front matter drives the case study page and the projects grid card.
2. `data/*.yaml` — Shared structured data (team, clients, awards, testimonials, values, contact CTAs). Each file has a top-level `items` list. Templates access these via `.Site.Data.<filename>.items`.
3. `hugo.toml` — Site-wide settings: title, email, phone, social URLs, booking URLs, nav menus. Not editable through the CMS.

**Templates (`layouts/`):**
- `_default/baseof.html` — Shell: loads `css/style.css` and `js/main.js`, renders header/footer partials, defines the `main` block
- `index.html` — Homepage
- `projects/list.html` — Projects grid with JS tag filter (`js/projects-filter.js`)
- `projects/single.html` — Individual case study page
- `about/list.html`, `contact/list.html`, `concept-and-design/list.html` — Section pages
- `partials/` — `header.html`, `footer.html`, `hero-text.html`, `flip-box.html`

**CMS:** Sveltia CMS (`static/admin/`). Config in `static/admin/config.yml` defines the editable collections and maps them to content/data files. On the live site the CMS authenticates via GitHub and commits directly to `main`.

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and deploys to GitHub Pages. The site currently serves from the `/ut-hugo-site/` subpath at `https://unusualtechnologies.github.io/ut-hugo-site/`.

## Image path workaround

Hugo's `relURL` doesn't prepend the base subpath when the input starts with `/`. Any template that outputs an image path from front matter or data files (where values start with `/`) must strip the leading slash first:

```
{{ .Params.featured_image | strings.TrimPrefix "/" | relURL }}
```

This workaround is present in `about/list.html`, `projects/list.html`, and `projects/single.html`. Hardcoded template strings like `"images/logo.png"` (no leading slash) work correctly with plain `relURL` and don't need TrimPrefix.

**Remove all TrimPrefix workarounds if/when the site is moved to a custom domain** (served from `/` rather than a subpath).

## Project front matter fields

Key fields for `content/projects/*/index.md`:
- `type` — must always be `"projects"`
- `tags` — slug format: lowercase with hyphens (e.g. `science-and-research`)
- `prominence` — integer; higher = appears first on projects list; negative = pushed to end
- `featured_image` — path starting with `/images/projects/...`
- `overview_video_id` — YouTube video ID only (not full URL)
- `banner_image` — optional hero banner (different from featured_image)
- `try_it`, `overview_image`, `client`, `testimonial` — optional nested objects
