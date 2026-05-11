# Research: Post Detail & Sobre Page Polish

**Feature**: `005-fix-post-sobre-details` | **Date**: 2026-05-10

## Decision 1: Related Posts Strategy

**Decision**: Match by `page.categories[0]` (first category). Fallback to 3 most recent posts excluding current. Cap at 3 results.

**Rationale**: Jekyll Archives already indexes categories. Matching on the first category is deterministic and avoids showing duplicate posts when a post belongs to many categories. Cap of 3 is standard editorial practice and sufficient for engagement without cluttering the page.

**Alternatives considered**:
- Match by ALL categories — would produce too many results and complicate deduplication logic in Liquid.
- Tag-based matching — tags are not consistently used on this blog; categories are more reliable.

## Decision 2: Category Links in Post Footer

**Decision**: Render category links as pill-style chips (`<a class="category-chip">`) in a flex-wrap row. Link each chip to `/categoria/[slug]/` (Jekyll Archives path).

**Rationale**: Pill chips are already partially implemented in `_components.scss` (`.category-pills`). Flex-wrap handles overflow gracefully at any viewport width without JS. The Archives plugin generates `/categoria/[slug]/` pages automatically.

**Alternatives considered**:
- Comma-separated inline links — no clear visual grouping, harder to tap on mobile.
- Dropdown — unnecessary complexity, adds JS dependency.

## Decision 3: Reading Time Placement

**Decision**: Inline in `.post-meta` paragraph, separated by `·` bullet from the date.

**Rationale**: Matches common blog conventions (Medium, Substack). The existing `reading-time.html` include outputs the formatted string directly; wrapping it in a `<span>` next to the date requires zero new Liquid logic.

**Alternatives considered**:
- Separate line below date — creates vertical noise and disrupts header compactness.
- Icon + number only — less accessible, requires icon SVG addition.

## Decision 4: Sobre Page Layout

**Decision**: Wrap sobre page content in a `.sobre-page` section with `surface-container-low` background and generous padding (80px vertical). Typography: `font-display` (Newsreader) for the intro heading, `font-body` (Manrope) for body text.

**Rationale**: `sobre.markdown` uses the `page` layout which outputs content inside `.container`. Adding a wrapper class via front matter (`class: sobre-page`) allows targeted SCSS without touching other pages.

**Alternatives considered**:
- New layout file — unnecessary; front matter class is sufficient.
- Inline styles — violates project conventions.

## Decision 5: Author Section Include

**Decision**: Create `_includes/author-section.html` with the exact markup currently in `_layouts/home.html`. Both home and sobre pages use `{% include author-section.html %}`.

**Rationale**: The author section is already semantically isolated in `home.html`. Moving it to an include is a mechanical extraction — no new logic required.

**Alternatives considered**:
- Parameterized include with author data from `_data/` — over-engineering for a single author blog.

## Resolved Clarifications

- **Jekyll Archives slug format**: Confirmed `/categoria/[slug]/` based on existing `_config.yml` Archives configuration from branch `004`.
- **`sobre.markdown` layout**: Currently uses `page` layout. A `page_class` front matter key will be added so the layout can inject a wrapper class on the `<main>` or `<div class="container">`.
