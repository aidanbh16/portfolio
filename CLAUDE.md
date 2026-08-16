@AGENTS.md
---
name: nextjs-npm-expert
description: Specialized context for building Next.js applications with npm package management.
tags: [nextjs, npm, typescript, tailwind]
---

# CLAUDE.md - Next.js & npm Project Guidelines

## System Directives
@import AGENTS.md
@vercel/next-browser

## Project Profile
- **Framework:** Next.js (App Router preferred)
- **Package Manager:** npm
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Explicit Build & Development Commands
- **Install Dependencies:** `npm install`
- **Add Dependency:** `npm install <package_name>`
- **Add Dev Dependency:** `npm install -D <package_name>`
- **Run Local Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Linting:** `npm run lint`
- **Type Checking:** `npx tsc --noEmit`

## Architectural & Code Style Requirements

### 1. Component Strategy
- Default to **React Server Components (RSC)** for data fetching and static UI.
- Restrict `'use client'` strictly to interactive leaf components or state-heavy subtrees.
- Maximize performance by packaging explicit backend mutations inside **Server Actions**.

### 2. Data Fetching & Caching
- Use the modern asynchronous request APIs for dynamic headers and cookies.
- Implement the modern `'use cache'` directive for persistent sub-page caching.
- Avoid legacy data fetching patterns (`getServerSideProps`, `getStaticProps`).

### 3. State & Routing
- Handle application layouts natively via `layout.tsx` and parallel/intercepted routing files.
- Restrict global state providers; push state closer to the interactive component layers.

### 4. Code Standards
- Use **TypeScript** with explicit typing; avoid `any`.
- Favor explicit, descriptive named exports over default exports.
- Prefer asynchronous/await constructs over chaining `.then()` promises.