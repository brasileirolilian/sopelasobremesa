# Implementation Plan: Standardize Post List

**Branch**: `004-homologar-posts-list` | **Date**: 2026-05-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/004-homologar-posts-list/spec.md`

## Summary

Standardize post card HTML/styles across home, `/artigos/`, and `/categoria/:name/` pages. Add estimated reading time to all post cards. Replace the current hash-based `categorias.html` system with Jekyll-generated static category pages via `jekyll-archives`, and update hamburger menu links accordingly.

## Technical Context

**Language/Version**: Jekyll 4.4.1 + Liquid templating  
**Primary Dependencies**: `jekyll-archives` (new), `jekyll-paginate` (existing)  
**Storage**: N/A — static site, content in `_posts/*.md`  
**Testing**: Manual visual QA + `bundle exec jekyll build` (no errors)  
**Target Platform**: Static website (HTML/CSS served via CDN)  
**Project Type**: Jekyll static blog  
**Performance Goals**: Lighthouse score ≥ 90 (existing baseline)  
**Constraints**: No external CSS/JS frameworks; no modification of `_posts/*.md` files; SCSS must remain modular  
**Scale/Scope**: ~100–500 posts, ~20 categories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Stack — Jekyll + custom CSS, no frameworks | ✅ PASS | All changes use Jekyll/Liquid/SCSS only |
| II. SEO First — indexable URLs | ✅ PASS | `/categoria/:name/` replaces JS hash approach; full static pages indexed by Google |
| III. Accessibility (a11y) | ✅ PASS | Existing semantic HTML structure maintained; hamburger menu aria-labels unchanged |
| IV. Design — bordô/beige palette only | ✅ PASS | Reusing existing `post-card` CSS classes; no palette changes |
| V. Content restriction — no `_posts/` modification | ✅ PASS | All changes are layout/include/config only |

**Gate result: ALL PASS — proceed to research**

## Project Structure

### Documentation (this feature)

```text
specs/004-homologar-posts-list/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (files affected)

```text
Gemfile                          # ADD: jekyll-archives gem
_config.yml                      # ADD: jekyll-archives config block + plugin entry

_includes/
├── reading-time.html            # NEW: reusable reading time Liquid snippet
└── hamburger-menu.html          # MODIFY: category links → /categoria/:name/

_layouts/
├── category.html                # MODIFY: use post-card structure + reading time
└── home.html                    # MODIFY: add excerpt + reading time to mosaic cards

artigos/
└── index.html                   # MODIFY: add reading time to post-meta

categorias.html                  # DELETE
```

## Complexity Tracking

> No constitution violations — section not applicable.
