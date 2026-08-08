# Esmee Group Innovations — Website

A multidisciplinary design and construction company website for **Esmee Group Innovations Ltd** (Nairobi, Kenya). Plain HTML/CSS/JS — no build step, no framework, no dependencies.

## Structure

```
├── index.html               Home
├── about.html                About / vision / mission / team
├── services.html             All 5 services
├── projects.html             Portfolio listing
├── project-residency.html    "The Residency" project detail page
├── contact.html               Contact form + info
├── css/style.css              All styles
├── js/main.js                  Nav, scroll reveal, stats counter, contact form
└── images/                     Logo + project photography
```

## Running locally

No build tools needed. Either:
- Open `index.html` directly in a browser, or
- Use VS Code's **Live Server** extension for auto-reload while editing.

## Deployment

Static site — deployable to GitHub Pages, Netlify, or Vercel as-is.

## Contact form

The form in `contact.html` currently has a placeholder `action`. To make it functional, connect it to a form backend (e.g. [Formspree](https://formspree.io)) and update the `action` attribute — see comments in `contact.html` and `js/main.js`.

## Brand

- **Colors:** Black `#0d0d0d`, Orange `#f0a336`, White, Light Grey `#f5f3f0`
- **Tagline:** Design • Build • Innovate
- **Fonts:** Playfair Display (headings), Inter (body), Barlow Condensed (labels/stats)
