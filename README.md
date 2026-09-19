# aidanholton.dev

Aidan Holton's portfolio — built as two views of the same content.

- **Base View** — a clean, recruiter-friendly scrolling page (warm dark
  charcoal, soft orange accent). Each role leads with its headline results, then the details.
  This is what everyone lands on, and the only view on mobile.
- **Dev View** — a real interactive terminal (desktop only), opened from the
  "Terminal" button in Base View's header or the link under the hero. Type
  `help` to see what it can do: `about`, `experience`, `projects`, `skills`,
  `contact`, `references`, `open <name>`, `resume`, and a few extras (`sudo`,
  `whoami`, `date`). Tab completes commands (and lists them when more than
  one matches). Commands support piping into grep, e.g.
  `experience | grep python`. Get back to
  Base View with `exit`, the link above the terminal, or the close (×) dot
  on its titlebar.

Both views render from the same data and are built with Next.js (App
Router), React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All real content — name, bio, experience, projects, skills, links,
recommendations — lives in **`app/data.ts`**. Both views read from it, as do
the link-preview image, sitemap, and structured data, so an edit there shows
up everywhere. Base View shows the first two bullets of each role or project
and tucks the rest behind a "Show N more" toggle, so lead with the strongest.

Files served as-is from `public/`:

- `resume.pdf` — the résumé behind every "Résumé" link; replace it to update.
- `letters/` — the full recommendation letters linked from each quote.
- `projects/` — project screenshots and logos.

## Project structure

```
app/
  data.ts                  # single source of truth for all content
  layout.tsx                # metadata, fonts (IBM Plex Sans + Mono)
  page.tsx                  # renders PortfolioClient + JSON-LD Person data
  globals.css                # color tokens (dark-only charcoal/orange
                              # site theme; terminal keeps its own teal
                              # palette), animations
  opengraph-image.tsx        # link-preview image, rendered at build time
  sitemap.ts, robots.ts      # search-engine files
  components/
    PortfolioClient.tsx      # top-level switch: Dev View vs Base View,
                              # forces Base View on mobile
    DevView.tsx               # centers the Terminal on screen
    Terminal.tsx               # terminal window: input, history, titlebar
    terminalCommands.tsx      # command implementations + output formatting
    BaseView.tsx               # standard portfolio page
    Reveal.tsx                 # scroll-triggered fade-in used in Base View
    projectStatus.ts           # live / in progress / archived labels + colors
assets/                      # static font files for the link-preview image
```

## Deployment

This is a standard Next.js app — the [Vercel Platform](https://vercel.com/new)
is the easiest way to deploy it. Run `npm run build` locally first if you
want to sanity-check the production build before pushing.
