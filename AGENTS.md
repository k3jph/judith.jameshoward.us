# AGENTS.md — Judith & Holofernes: The Fatal Image

## Mandatory First Read

Read this root `AGENTS.md` before any analysis, editing, content creation, testing, review, branch operation, or deployment. It governs the full repository. Read the README and relevant local documentation before changing implementation. Explicit instructions from the site owner take precedence.

## GitHub Flow

- `main` is the one permanent integration branch and must remain deployable.
- No permanent `dev`, `develop`, `staging`, or long-lived work branches.
- For every subsequent change, branch freshly from the latest `main` with a descriptive `feature/`, `fix/`, `content/`, `docs/`, `chore/`, or `deps/` name.
- Keep the change focused. Do not bundle unrelated refactoring, dependency upgrades, redesigns, or editorial rewrites.
- Test locally, open a pull request into `main`, review the diff and required CI, then merge when ready. Prefer squash merge for normal single-topic work.
- Delete the temporary branch once merged; close and prune obsolete PRs/branches explicitly, never merge abandoned work just to tidy up.
- No direct commits to `main`, apart from a specifically authorized bootstrap/administrative exception.
- Do not force-push, rewrite `main`, bypass failed checks, or claim validations passed if they did not run.

## General Preservation Rules

- Preserve published URLs, aliases, redirects, dates, canonical domains, metadata, search, feeds, sitemaps, source attributions, and public records.
- Preserve navigation, responsive layouts, accessibility, semantic headings, visible focus, reduced-motion preferences, and useful operation without JavaScript where feasible.
- Preserve any cookie-consent choices and Global Privacy Control behavior. No optional analytics or trackers before valid affirmative consent; never weaken privacy to improve metrics.
- Never commit secrets or sensitive personal data; do not introduce third-party scripts or dependencies without reason.
- Historical publications should remain historical. Correct factual errors transparently rather than silently rewriting the record.
- Keep research evidence separate from inference, uncertain attribution, tradition, or speculation. Never invent citations, image rights, credentials, titles, genealogy, claims, or publication metadata.
- New public writing should respect James's clear, explanatory, evidence-led, conversational style with concrete examples and occasional dry humor; avoid generic AI promotional prose.
- Preserve existing design systems rather than cloning the appearance of another JHCU site.

## Completion

Review the final diff, run the repository-specific checks below and relevant browser checks, verify routes and critical user paths, then report exactly what changed, tests run, PR/merge, and deployment state. Never silently alter hosting, DNS, site ownership, or public policy.

## Site-Specific Rules

- Canonical public exhibition: https://judith.jameshoward.us/.
- Preserve its distinct museum/exhibition design, artwork provenance and attributions, artists, dates, objects, interpretation, catalog structure, and historical context.
- Maintain static GitHub Pages export from `main`, `public/CNAME`, `public/.nojekyll`, and published `out/` artifact. Retain Vinext development compatibility unless deliberately migrated.
- Use Node >=22.13.0 and the project's documented reproducible dependency path.
- Check `npm run build:pages` for publication and the available exhibition validation and HTML tests. Preserve accessible browsing, descriptive alt text, search, and image loading; do not substitute fabricated artworks or invented historical metadata.
