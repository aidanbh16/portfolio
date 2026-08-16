# aidanholton.dev

Aidan Holton's portfolio — built as two views of the same content.

- **Dev View** — a real interactive terminal (desktop only). Type `help` to
  see what it can do: `about`, `experience`, `projects`, `skills`, `contact`,
  `resume`, and a few extras (`sudo`, `whoami`, `date`). Commands support
  piping into grep, e.g. `experience | grep python`.
- **Base View** — a standard scrolling portfolio page. This is the only view
  shown on mobile, and it's reachable from Dev View by clicking the close
  (×) dot on the terminal's titlebar; from Base View, the "Dev View" button
  in the header brings the terminal back.

Both views render from the same data and are built with Next.js (App
Router), React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All real content — name, bio, experience, projects, skills, links — lives
in **`app/data.ts`**. Both views read from it, so an edit there shows up
everywhere. Keep entries short: Dev View is a fixed-size terminal window and
Base View clips long text with `line-clamp` in a few places, so there's no
scrollback for anything absurdly long.

The résumé PDF served from the "Resume" links is `public/resume.pdf` —
replace that file to update it.

## Project structure

```
app/
  data.ts                  # single source of truth for all content
  layout.tsx                # metadata, fonts
  page.tsx                  # renders PortfolioClient
  globals.css                # color tokens (dark terminal theme + light
                              # theme-light scope for Base View), animations
  components/
    PortfolioClient.tsx      # top-level switch: Dev View vs Base View,
                              # forces Base View on mobile
    DevView.tsx               # centers the Terminal on screen
    Terminal.tsx               # terminal window: input, history, titlebar
    terminalCommands.tsx      # command implementations + output formatting
    BaseView.tsx               # standard portfolio page
    Reveal.tsx                 # scroll-triggered fade-in used in Base View
    icons.tsx                   # small inline SVG icons
```

## Deployment

This is a standard Next.js app — the [Vercel Platform](https://vercel.com/new)
is the easiest way to deploy it. Run `npm run build` locally first if you
want to sanity-check the production build before pushing.
