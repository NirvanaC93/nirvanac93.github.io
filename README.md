# Nirvana Coppola — personal academic website

A lightweight, responsive academic website for GitHub Pages. It uses plain HTML, CSS and JavaScript: no framework, build step, database, or paid service.

## Site structure

- `index.html` — page structure
- `content.js` — personal information, links, publications, talks, events and teaching
- `assets/style.css` — visual design and responsive layout
- `assets/site.js` — renders the content and mobile navigation
- `assets/favicon.svg` — site icon

## Publish with GitHub Pages

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then save.
4. GitHub Pages will publish the site at [https://nirvanac93.github.io/](https://nirvanac93.github.io/).

## Update the website

Most edits belong in `content.js`. Add entries to the `publications`, `talks`, `events`, and `teaching` arrays, following the examples in that file. Use full `https://` links. Commit your changes to `main`; GitHub Pages will rebuild the site.

The starter deliberately leaves publication titles, dates, affiliations, email address, and external profile links blank rather than inventing details. Please review the draft biography and research description before treating them as final.

## Assisted updates

The site does not publish changes automatically from external sources. A future review workflow could collect suggestions from ORCID and present them as a pull request for approval before publication.
