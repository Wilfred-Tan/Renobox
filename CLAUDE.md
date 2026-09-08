# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 — read the local docs first

The app uses **Next.js 16.2.10**, which has breaking changes from older/training-data conventions. Before writing any Next.js code (routing, `params`/`searchParams`, metadata, fonts, images, route handlers), read the relevant guide under `node_modules/next/dist/docs/`. This is also enforced by `AGENTS.md`. Notable gotchas already hit: `params` is a `Promise` in dynamic pages/`generateMetadata`; set `data-scroll-behavior="smooth"` on `<html>` when using CSS smooth scroll.

## Project location

The Next.js app lives at the **repo root** — `package.json`, `src/`, `public/`, etc. are all here directly (this used to be nested under a `website/` subfolder; it was flattened so hosting platforms that expect `package.json` at the repo root, e.g. GoDaddy Node.js Hosting, can deploy it without extra config). Sibling folders (`Website Samples/`, `Project Photos/`, `Company Logo/`, `Project Logos/`, `Company Project List/`) hold design-reference images and internal business data only — not code.

## Commands

```bash
npm run dev            # Turbopack dev server on :3000
npm run build          # production build via webpack (see Deployment below) — verifies generateStaticParams
npm run lint           # eslint (flat config, eslint-config-next)
npx tsc --noEmit       # type-check (no dedicated script)
```

The dev server is also wired into `.claude/launch.json` (`npm run dev`, port 3000) for the preview tools. There is **no test suite**. Treat `npm run build` + `npx tsc --noEmit` + `npm run lint` as the pre-delivery gate — the build catches App Router / static-generation errors that dev mode does not.

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

## Deployment

**Live at [renobox.sg](https://www.renobox.sg).** Hosted on **GoDaddy Node.js Hosting** (currently beta), connected via GitHub import — GitHub repo is [Wilfred-Tan/Renobox](https://github.com/Wilfred-Tan/Renobox) (`main` branch; `gh` CLI is authenticated locally and wired into git, so `git push` just works).

⚠️ **`npm run build` must keep the `--webpack` flag.** GoDaddy's build container blocks the port bind that Turbopack's `@tailwindcss/postcss` worker needs, failing with `TurbopackInternalError: ... Permission denied (os error 13)`. Do not remove `--webpack` from the `build` script without re-testing a deploy. `npm run dev` is unaffected and still uses Turbopack.

The app was moved from a nested `website/` subfolder to the repo root (see git history around commit `695db87`) specifically because GoDaddy's GitHub import expects `package.json` at the repo root and has no subfolder/monorepo option.

## ⚠️ Remaining placeholder content

Most of `src/lib/data/site.ts` is now real (brand name, phone, WhatsApp, address, UEN, stats) — it is **not** the original starter-template placeholder anymore. What's still outstanding:

- `site.socials` (Instagram/Facebook/LinkedIn) are still generic placeholder URLs — swap in real profile links when available.
- `site.certifications` (BCA Registered Contractor, CaseTrust Accredited) are flagged as **unconfirmed** in a code comment — claiming a licence/accreditation the company doesn't actually hold is a compliance risk, so confirm these before treating them as final.
- The `QuoteForm` (`src/components/forms/QuoteForm.tsx`) still has **no backend** — it simulates success with a timeout. Now that the site is live, this is the main functional gap: it needs a route handler (e.g. `src/app/api/enquiry/route.ts`) + an email service before real enquiries can actually reach anyone.
