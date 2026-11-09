# Mohammed Saif: interactive portfolio

A hand-drawn, whiteboard-style portfolio (think Excalidraw or Eraser) built with Next.js. Visitors can pan
around a draggable whiteboard, read a short single-column overview, or scroll the mobile version, all from one
source of truth: [`src/data/profile.ts`](src/data/profile.ts).

**Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, `@xyflow/react`
(whiteboard), `roughjs` (hand-drawn borders), `framer-motion`, `lucide-react` and `react-icons` (logos).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npx tsc --noEmit   # type-check
```

To open the dev server on a phone on the same Wi-Fi, use `http://<your-pc-ip>:3000`
(`allowedDevOrigins` in `next.config.ts` already allows local network addresses).

## Project structure

```
src/
├── app/                    Routes and app-level files (Next.js conventions)
│   ├── layout.tsx          Root layout, fonts, theme script
│   ├── page.tsx            The single page
│   ├── globals.css         Theme variables (paper + dark) and global styles
│   └── favicon.ico, icon.png, apple-icon.png
├── components/
│   ├── PortfolioApp.tsx    Client shell: chooses which view to show
│   ├── views/              Full-page experiences
│   │   ├── EntryScreen.tsx     Boot sequence + "Explore / Quick overview" choice
│   │   ├── Whiteboard.tsx      Desktop canvas (React Flow): draggable, resizable frames
│   │   ├── Story.tsx           Mobile vertical scroll of the same sections
│   │   └── QuickOverview.tsx   Single-column page for recruiters
│   ├── sections/           Content blocks, written once and reused by every view
│   │   └── Intro, About, Experience, Projects, Recommendations, Skills, Contact, SocialLinks
│   ├── chat/               Floating "Ask me anything" widget
│   └── ui/                 Reusable building blocks (Sketch borders, Motion, Doodles,
│                           TechChip, ProfilePhoto, DoodleAvatar, BigScreenNotice)
├── data/
│   ├── profile.ts          ALL portfolio content. Edit this to change the site.
│   ├── sections.ts         Section ids and labels, in reading order
│   └── types.ts            Types for the content shapes
└── lib/
    ├── theme.tsx           Theme provider and toggle
    ├── techLogos.tsx       Technology name -> brand logo
    ├── sectionIcons.ts     Section id -> icon
    └── mockAgent.ts        Canned chat replies (to be replaced by the real /api/chat agent)
public/
└── images/                 Portraits (photo, ink sketch, pencil sketch)
```

## Conventions

- **Content lives in `src/data/profile.ts`.** Components never hard-code personal details.
- **Sections are written once.** `sections/*` render inside the whiteboard, the mobile story and the overview, so the
  three views can never drift apart.
- **Import with the `@/` alias** (`@/components/...`, `@/data/...`, `@/lib/...`), which maps to `src/`.
- **Adding a skill logo:** add the technology to `src/lib/techLogos.tsx`; unknown names get a generic icon.
- **Theme:** `data-theme` on `<html>`, set by an inline script before paint. Colours are CSS variables in `globals.css`.
- **Next.js version:** this version has breaking changes. Read `node_modules/next/dist/docs/` before relying on memory
  (see `AGENTS.md`).

## Still to do

- Real photo already in; add `public/resume.pdf`, then set `resumeHref` in `src/data/profile.ts`
  (the Resume buttons stay hidden while it is empty).
- Real Claude-backed `/api/chat` agent grounded in `profile.ts`.
- SEO metadata and Open Graph image, accessibility and reduced-motion pass, deploy to Vercel.
