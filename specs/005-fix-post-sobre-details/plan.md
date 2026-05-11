# Implementation Plan: Post Detail & Sobre Page Polish

**Branch**: `005-fix-post-sobre-details` | **Date**: 2026-05-10 | **Spec**: [spec.md](./spec.md)

## Summary

Extract the author section into a shared `_includes/author-section.html`, wire up the existing `reading-time.html` include in the post header, enforce left alignment on the post header, add a related posts section after the post body, update the post footer to show share buttons alongside category links, and restyle the sobre page to match the editorial design system.

## Technical Context

**Language/Version**: Jekyll (Ruby static site generator), Liquid templating  
**Primary Dependencies**: Jekyll Archives plugin (already configured), existing `reading-time.html` include  
**Storage**: N/A — static site  
**Testing**: Visual browser verification; Jekyll build (`bundle exec jekyll serve`)  
**Target Platform**: Static web, modern browsers, responsive (320px–1440px)  
**Project Type**: Jekyll blog / static site  
**Performance Goals**: No runtime degradation — all changes are pure HTML/CSS/Liquid  
**Constraints**: No JS additions; no new external CSS dependencies; paleta inamovible (bordó + beige); no 1px solid borders per DESIGN.md  
**Scale/Scope**: 6 files modified, 1 new include created

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Jekyll + CSS custom (no heavy frameworks) | ✅ Pass | Only HTML/Liquid/SCSS changes |
| II. SEO First | ✅ Pass | Related posts add internal links (SEO positive); no meta regression |
| III. Accessibility (a11y) | ✅ Pass | Category links need descriptive text; related post images need alt attributes |
| IV. Paleta inamovible (bordó + beige) | ✅ Pass | All new styles use existing `$color-*` SCSS variables |
| V. No modificar markdown de posts | ✅ Pass | `sobre.markdown` receives a Liquid include call — no post content touched |

No violations. No complexity justification needed.

## Project Structure

### Documentation (this feature)

```text
specs/005-fix-post-sobre-details/
├── plan.md              ← this file
├── research.md          ← Phase 0
├── data-model.md        ← Phase 1
└── tasks.md             ← Phase 2 (via /speckit.tasks)
```

### Source Code (repository root)

```text
_includes/
├── author-section.html      ← NEW: extracted from _layouts/home.html
├── reading-time.html        ← EXISTS: no changes needed
└── share_buttons.html       ← EXISTS: no changes needed

_layouts/
├── home.html                ← MODIFIED: replace inline author markup with {% include author-section.html %}
└── post.html                ← MODIFIED: reading time in header, left-align, related posts section, footer bar

sobre.markdown               ← MODIFIED: replace markdown author block with {% include author-section.html %}

assets/css/
└── _components.scss         ← MODIFIED: left-align .post-header, new .related-posts styles,
                                          new .post-footer-bar styles, .sobre-page styles
```

**Structure Decision**: Pure Jekyll include/layout/SCSS — no new files except `author-section.html`. No contracts or quickstart needed (static site, no external APIs).
