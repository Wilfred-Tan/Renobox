# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 — read the local docs first

The app uses **Next.js 16.2.10**, which has breaking changes from older/training-data conventions. Before writing any Next.js code (routing, `params`/`searchParams`, metadata, fonts, images, route handlers), read the relevant guide under `website/node_modules/next/dist/docs/`. This is also enforced by `website/AGENTS.md`. Notable gotchas already hit: `params` is a `Promise` in dynamic pages/`generateMetadata`; set `data-scroll-behavior="smooth"` on `<html>` when using CSS smooth scroll.

## Project location

The working directory is the repo root, but the Next.js app lives in the **`website/`** subfolder. Run all npm commands from there (or via `--prefix website`). Sibling `Website Samples/` holds design-reference images only — not code.

## Commands

```bash
cd website
npm run dev            # Turbopack dev server on :3000
npm run build          # production build (fully static export — verifies generateStaticParams)
npm run lint           # eslint (flat config, eslint-config-next)
npx tsc --noEmit       # type-check (no dedicated script)
```

The dev server is also wired into `.claude/launch.json` (`npm --prefix website run dev`, port 3000) for the preview tools. There is **no test suite**. Treat `npm run build` + `npx tsc --noEmit` + `npm run lint` as the pre-delivery gate — the build catches App Router / static-generation errors that dev mode does not.

## Architecture

Marketing site for a Singapore renovation firm serving two audiences (commercial/F&B fit-outs and residential). Design direction (premium dark-editorial, warm charcoal + gold) was generated via the `ui-ux-pro-max` skill. App Router, all pages statically rendered.

**Styling — Tailwind CSS v4, CSS-first (no `tailwind.config.js`).** The entire theme is defined in `src/app/globals.css` via `@theme inline`. Design tokens are plain CSS variables promoted to Tailwind utilities:
- Colors are **semantic, not literal**: `ink` / `ink-soft` / `ink-elevated` (dark surfaces), `paper` / `paper-dim` (light surfaces), `muted`, `gold` / `gold-bright` / `gold-deep` (accent). Use them as utilities (`bg-ink`, `text-paper`, `text-gold-deep`, `border-ink/10`). Do not introduce raw hex in components.
- Fonts: `font-heading` (Bricolage Grotesque) and `font-body` (Inter), loaded via `next/font` in `src/app/layout.tsx` and exposed as `--font-bricolage` / `--font-inter`.
- Reduced-motion is globally honored in `globals.css`; the `animate-fade-up` keyframe is the standard entrance animation.

**Component tiers** under `src/components/`:
- `ui/` — primitives (`Button`, `Container`, `SectionHeading`, `Badge`, `PlaceholderImage`, `StatCounter`, `RevealOnScroll`, `CornerFrame`).
- `cards/`, `sections/`, `layout/`, `forms/` — composed from primitives.
- `Button` is polymorphic: pass `href` → renders `next/link`, otherwise a `<button>`; variants `primary | secondary | on-dark | ghost`. `cn()` (`src/lib/utils.ts`, clsx + tailwind-merge) is the class-merging helper. Path alias `@/*` → `src/*`.
- Client components are the exception, used only where an effect is required (`Nav`, `RevealOnScroll`, `StatCounter`, `TestimonialCarousel`, `PortfolioGrid`, `QuoteForm`); scroll/reveal/count-up all use `IntersectionObserver`. Everything else is a Server Component.

**Content lives in `src/lib/data/`, not in pages** — `site.ts` (brand, contact, stats, `whatsappHref`, `siteUrl`), `projects.ts` (portfolio + `getProjectBySlug`, drives `/portfolio/[slug]` via `generateStaticParams`), `testimonials.ts`, `nav.ts`. Pages/components import from here so copy changes happen in one place. `sitemap.ts` and `robots.ts` also read from this data.

## ⚠️ Placeholder content — must be replaced before launch

Everything in `src/lib/data/` is **placeholder** (brand name "Forme", `+65 8000 0000`, `6580000000` WhatsApp, `formestudio.sg`, UEN, stats, projects, testimonials) and images are `PlaceholderImage` grid boxes, not photos. The `QuoteForm` (`src/components/forms/QuoteForm.tsx`) has **no backend** — it simulates success with a timeout. Before go-live it needs a route handler (e.g. `src/app/api/enquiry/route.ts`) + an email service. Search the data files for `PLACEHOLDER` and update `siteUrl` (used by sitemap/robots/metadata) when the real domain is known.
