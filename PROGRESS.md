# Reno Box Website — Progress Snapshot

Last updated: 2026-07-25. This is a point-in-time handoff for continuing work in a fresh session — it will go stale as work continues. Cross-check against `git log`, `git status`, and the code itself before trusting anything below as current.

## Current goal and why

Reno Box (Singapore renovation/fit-out contractor, 40+ years, 300+ projects) needed a marketing site rebuilt around **real** content instead of the placeholder scaffold it launched with (see root `CLAUDE.md` for the placeholder-content inventory). This session's work has been almost entirely **portfolio-content work**: curating real project photography down to a strict "looks like a finished, professional job" bar, expanding the portfolio from 8 to 12 real projects, and building the UI to gracefully handle projects that don't have presentable photos at all. A secondary thread was making the project **viewable outside a running dev server** (git/GitHub setup for Claude Code web/mobile access, and a portable static HTML export) — driven by repeated friction viewing the site from the user's phone.

## Files changed so far

**Git state: 2 commits exist (`23517b5` initial, `0780d6e` mid-session curation). Everything below is currently UNCOMMITTED in the working tree** (confirm with `git status`) — this snapshot itself has not been committed. No git remote is configured — the site has never been pushed to GitHub (see Blockers).

| File | What changed |
|---|---|
| `website/src/lib/data/projects.ts` | Portfolio grew 8 → 12 projects. Cut unclean photos from `kfc-csp` (4→2) and `pizza-hut-tiong-bahru` (6→2); re-audited `kfc-plq` (6→5, two crops applied). Added 4 new projects: `kfc-compass-vale` (1 photo), `pizza-hut-downtown-east` (2 photos), `office-toa-payoh` (2 photos), `office-suntec-city` (0 photos — placeholder card). |
| `website/src/components/cards/ProjectCard.tsx` | Renders `<ProjectPlaceholder>` instead of a broken `<Image>` when `project.images.length === 0`. |
| `website/src/app/portfolio/[slug]/page.tsx` | Same zero-photo handling for the hero section; gallery grid already degraded gracefully for 0/1-photo projects (no change needed there). |
| `website/src/components/cards/ProjectPlaceholder.tsx` | **New.** Branded placeholder (logo watermark + location/type text, `size: "card" \| "hero"`) for finished projects with no presentable photos. |
| `website/src/app/portfolio/page.tsx` | Added a "Past Clients" section at the bottom — `SectionHeading` + `<ClientLogoGrid>`. |
| `website/src/components/sections/ClientLogoGrid.tsx` | **New.** 18 placeholder logo tiles (icon-only, `CornerFrame` gold hover), ready to swap in real client logos later. |
| `website/scripts/gen-image-sizes.py` | **New, persistent.** Regenerates `src/lib/data/image-sizes.ts` (per-image `{w,h}` + `isLandscape()`) by reading actual files on disk. Run after any photo change. |
| `website/scripts/check-images.py` | **New, persistent.** Validates every path in `projects.ts` exists on disk and vice versa (catches "deleted a photo, forgot to update the data" bugs). Exits non-zero on mismatch. |
| `website/public/images/portfolio/**` | Extensive additions/replacements/deletions across the curation pass — see `git status` for the full file list; too granular to enumerate here. |
| `reno-box-website.zip`, `reno-box-website/` (repo root, untracked) | One-off deliverable — a portable static HTML export handed to the user for offline/mobile viewing. **Not part of the site source; safe to delete once no longer needed, should not be committed.** |

## Key architectural / design decisions and reasoning

- **Strict photo curation standard** (memory: `renobox-photo-curation-standard`): reject any photo with people, tools, ladders, boxes, cables, wrapped furniture, or debris; crop out a small edge issue rather than reject if genuinely salvageable, else reject. Chosen because the source photography is mostly construction/handover-day documentation, not styled shoots, and the user's explicit goal is a "finished, professional" impression — padding the site with in-progress shots would work against that.
- **Client naming policy** (memory: `renobox-client-naming-policy`): residential projects are *always* genericised to district (never street/block/unit — a street name is identifying), decided automatically, no need to ask. Commercial clients are decided **case-by-case, always ask first** — some add credibility named, others haven't given permission. Two office clients this session (HDB Hub, JSI) were resolved to generic ("Corporate Office Fit-Out, Toa Payoh" / "...Suntec City") — their real names must never appear anywhere, including slugs and image folder names.
- **`ProjectPlaceholder` reuses `LogoMark` + `Badge`, not the existing `PlaceholderImage`** — `PlaceholderImage` is a "content not built yet" pattern (wrong tone for a *finished* project that just lacks presentable photos). Went through one real bug fix: the first version centered location/type text in the hero, which visually collided with the page's real title (which sits bottom-left via the existing hero layout) — fixed by making the hero variant a background watermark only, with a small corner badge that clears the fixed nav.
- **Mixed-orientation gallery** (`isLandscape()` in `image-sizes.ts`): landscape photos render full-width at 3:2, portraits pair 2-up at 4:5. Added because forcing a 16:9 photo into a 4:5 tile via `object-cover` was cropping away roughly half the frame (e.g. a dining-table shot lost the table).
- **`ClientLogoGrid` reuses `CornerFrame`'s hover pattern** (already used once, on `ServiceCard` — invisible corner brackets that fade gold on hover) rather than inventing a new grayscale-hover treatment, since a full codebase search found no existing logo-cloud or grayscale pattern to match. Tiles are icon-only with `sr-only` labels, not visible "Client 01" text — a real logo cloud never captions individual logos, and visible placeholder numbers would just be cleanup debt later.
- **No new "clients" data file** — there's no real data yet (not even names), so a bare `PLACEHOLDER_LOGO_COUNT = 18` constant in the component was judged more honest than a fake structured array.
- **Static export was a temporary, fully-reverted config change**, not a permanent architecture decision. `next.config.ts` normally sets security `headers()`, which is incompatible with `output: "export"` (no server to apply them); `next/image` also needs `unoptimized: true` in export mode. The config was changed, built, then reverted via `git checkout` back to its original committed content (confirmed via `git diff` showing zero changes). Next's export also emits root-absolute `href`/`src` paths that don't resolve via `file://` — a one-off Python script rewrote ~1000 references across 21 HTML files into depth-relative paths so the export folder is genuinely double-click-browsable with no server.

## Remaining tasks / next steps

1. **Commit the uncommitted work** — nothing since `0780d6e` is saved to git history yet. Confirm scope with `git status` / `git diff` before committing.
2. **Push to GitHub** — repo has no remote. `gh auth login` was started earlier in the session but never completed (needs the user's interactive browser login, can't be done by the agent). Once authenticated: `gh repo create reno-box-website --private --source . --remote origin --push`. **Keep it private** — the repo contains the unredacted A.P. Møller/Maersk signage source photo and a source folder literally named after the Jalan Kemboja street address.
3. **Deploy decision pending** — user asked about a live public link; no deployment has happened. Flagged but not actioned: publishing now would make the placeholder certifications (BCA/CaseTrust/HDB — see item 4) publicly visible as claims before they're confirmed, which the user should decide on explicitly.
4. **Pre-launch content still needs client confirmation** (from original handoff, still open): 1985 founding year, BCA/CaseTrust/HDB certifications, testimonials (still literal "Placeholder Client"), Bidadari home type ("HDB Flat" is inferred), Contact page office hours, social links, `siteUrl` (still the placeholder `renobox.com.sg` domain).
5. **QuoteForm has no backend** (`src/components/forms/QuoteForm.tsx`) — simulates success with a timeout. Needs a route handler + email service before launch.
6. Delete `reno-box-website.zip` / `reno-box-website/` from the repo root once the user no longer needs them locally — they're a delivery artifact, not source, and are currently untracked (won't get pulled into a commit unless explicitly `git add`ed, but worth tidying).

## Commands to verify current state

No test suite exists. Run from `website/`:

```bash
npx tsc --noEmit                    # typecheck
npm run lint                        # eslint
python scripts/gen-image-sizes.py   # regenerate image-sizes.ts (after any photo change)
python scripts/check-images.py      # validate projects.ts <-> disk consistency; must print OK
```

**Build/dev must never run concurrently** (memory: `no-next-build-while-dev-server-running` — a build run while `next dev` is live corrupts `.next` and causes stale/404 dynamic-route serving on the next `dev` start). Always:
```bash
# stop any running `npm run dev` first, then:
npm run build                       # production build, 23 routes expected (12 project pages + 11 static)
# then restart:
npm run dev                         # Turbopack, :3000
```

Every UI change should also be checked at 375px mobile width (memory: `renobox-mobile-responsive-required` — firm project requirement, watch the gallery split and horizontal overflow specifically).

## Known blockers / open questions

- **GitHub push blocked on user's `gh auth login`** — cannot be completed by the agent (needs interactive browser auth).
- **Deploy-publicly decision is the user's call**, not yet made — see item 3 above.
- **User's Browser-pane doesn't reliably display on their phone/remote setup** — screenshots and coordinate-based interactions (hover, click) fail with "pane not displayed" in that context; verification this session repeatedly fell back to DOM/computed-style inspection instead of visual screenshots. This is an environment limitation, not something fixable from within a session.
- **Artifact links opened from the phone's browser (not the Claude app) show "Page not found"** — the phone browser session wasn't authenticated; the fix that worked was tapping "Open in the Claude app" on the smart-banner rather than staying in the browser.
- Six pending client-confirmation content items (see Remaining tasks #4) block full launch-readiness but don't block continued development.
