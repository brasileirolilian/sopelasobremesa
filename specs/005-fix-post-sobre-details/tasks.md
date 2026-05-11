# Tasks: Post Detail & Sobre Page Polish

**Input**: Design documents from `specs/005-fix-post-sobre-details/`
**Branch**: `005-fix-post-sobre-details`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Organization**: Grouped by user story. No tests requested — implementation tasks only.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: User story label from spec.md
- All paths relative to repository root

---

## Phase 1: Setup

**Purpose**: Verify build works before making any changes.

- [x] T001 Run `bundle exec jekyll build` and confirm it succeeds with zero errors

---

## Phase 2: Foundational — Author Section Include

**Purpose**: Extract the author section from `_layouts/home.html` into a shared include. All subsequent pages that use it depend on this file existing.

**⚠️ CRITICAL**: T002 must complete before US5 and US6 work can begin.

- [x] T002 Create `_includes/author-section.html` by extracting the `<section class="author-section full-width-breakout">` block from `_layouts/home.html` (lines containing `.author-container`, `.author-avatar`, `.author-info`, `.author-heading`, `.author-name`, `.author-bio`)
- [x] T003 Replace the extracted block in `_layouts/home.html` with `{% include author-section.html %}`

**Checkpoint**: Run `bundle exec jekyll serve` and confirm home page still shows author section identically.

---

## Phase 3: User Story 1 + 2 — Post Header (Reading Time + Left Alignment) 🎯 MVP

**Goal**: Show reading time next to publication date; left-align the entire post header.

**Independent Test**: Open any post — header shows date + reading time on one line, both left-aligned.

### Implementation

- [x] T004 [US1] [US2] In `_layouts/post.html`, add `{% include reading-time.html post=page %}` inside `.post-meta` after the date `<time>` element, separated by ` · `
- [x] T005 [US1] [US2] In `assets/css/_components.scss`, change `.post-detail .post-header { text-align: center; }` to `text-align: left`

**Checkpoint**: Open any post and verify reading time appears next to the date, both left-aligned on desktop and mobile.

---

## Phase 4: User Story 3 — Related Posts Section (P2)

**Goal**: After the post body, show up to 3 posts from the same category. Fall back to 3 most recent posts if no category match. Hide section if no other posts exist.

**Independent Test**: Open a post with at least one sibling in the same category — a "Related Posts" section appears above the bottom share block with 1–3 post cards.

### Implementation

- [x] T006 [US3] In `_layouts/post.html`, after the closing `</div>` of `.post-content` and before the bottom `<hr class="share-divider">`, add the related posts Liquid block:

  ```liquid
  {% assign current_cat = page.categories[0] %}
  {% assign related = site.posts | where_exp: "p", "p.categories contains current_cat and p.url != page.url" | limit: 3 %}
  {% if related.size == 0 %}
    {% assign related = site.posts | where_exp: "p", "p.url != page.url" | limit: 3 %}
  {% endif %}
  {% if related.size > 0 %}
  <section class="related-posts">
    <h2 class="related-posts-title">Artigos Relacionados</h2>
    <div class="related-posts-grid">
      {% for post in related %}
      {% include post-card.html post=post %}
      {% endfor %}
    </div>
  </section>
  {% endif %}
  ```

- [x] T007 [US3] In `assets/css/_components.scss`, add `.related-posts` section styles after the `.post-detail` block:

  ```scss
  .related-posts {
    padding: 48px 0 32px;

    .related-posts-title {
      font-family: $font-display;
      font-size: 1.5rem;
      color: $color-on-surface;
      margin-bottom: 24px;
    }

    .related-posts-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
  ```

**Checkpoint**: Open a post with category siblings and confirm related posts section renders correctly. Open a post with no siblings and confirm fallback to recent posts. If only one post exists, section must not render.

---

## Phase 5: User Story 4 — Post Footer Bar (Share + Categories) (P2)

**Goal**: Post footer shows share buttons on the left and category chips on the right in a single flex row. Category chips link to archive pages and wrap gracefully.

**Independent Test**: Open a post with 2+ categories — footer shows share on left, category chips on right. Resize to 320px — chips wrap, layout does not break.

### Implementation

- [x] T008 [US4] In `_layouts/post.html`, replace the bottom share section (the `<hr class="share-divider">` + `{% include share_buttons.html %}` at the end) with:

  ```liquid
  <hr class="share-divider">
  <div class="post-footer-bar">
    {% include share_buttons.html %}
    {% if page.categories.size > 0 %}
    <div class="post-footer-categories">
      <span class="post-footer-categories-label">Categorias:</span>
      {% for category in page.categories %}
      <a href="{{ '/categoria/' | append: category | slugify | prepend: '/' | relative_url }}" class="category-chip">{{ category }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
  ```

- [x] T009 [US4] In `assets/css/_components.scss`, add `.post-footer-bar` and `.category-chip` styles after the `.share-buttons` block:

  ```scss
  .post-footer-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .post-footer-categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;

    .post-footer-categories-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: $color-on-surface-variant;
      font-family: $font-body;
      white-space: nowrap;
    }
  }

  .category-chip {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    background-color: $color-surface-container;
    color: $color-primary;
    font-family: $font-body;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $color-surface-container-high;
    }
  }
  ```

**Checkpoint**: Open a post with multiple categories. Verify footer layout: share buttons left, category chips right. Verify chips link to `/categoria/[slug]/`. Test at 320px width.

---

## Phase 6: User Story 5 — Sobre Page Author Include (P2)

**Goal**: `/sobre/` uses `author-section.html` include instead of hardcoded markdown. Author section looks identical to home page.

**Independent Test**: Compare `/sobre/` and `/` visually — author sections are identical. Update bio text in the include once and both pages reflect the change.

### Implementation

- [x] T010 [US5] In `sobre.markdown`, remove the `### Sobre a Autora` heading and the following paragraph (the Lílian Brasileiro bio block in markdown), and replace with `{% include author-section.html %}`

**Checkpoint**: Open `/sobre/` and compare the author section with the one on the home page — must be visually identical.

---

## Phase 7: User Story 6 — Sobre Page Styling (P3)

**Goal**: `/sobre/` page intro section follows DESIGN.md: tonal surface background, generous whitespace, no 1px borders, editorial typography.

**Independent Test**: Open `/sobre/` and verify: intro section has `surface-container-low` background, 80px+ vertical padding, no hard borders separating sections.

### Implementation

- [x] T011 [US6] In `sobre.markdown` front matter, add `page_class: sobre-page`
- [x] T012 [US6] In `_layouts/page.html`, wrap the content output with a conditional class:

  ```liquid
  <div class="container{% if page.page_class %} {{ page.page_class }}{% endif %}">
    {{ content }}
  </div>
  ```

- [x] T013 [US6] In `assets/css/_components.scss`, add `.sobre-page` styles:

  ```scss
  .sobre-page {
    > p:first-child,
    .sobre-intro {
      padding: 64px 0 80px;
      background-color: $color-surface-container-low;
      margin: 0 calc(-1 * var(--container-padding, 24px));
      padding-left: var(--container-padding, 24px);
      padding-right: var(--container-padding, 24px);

      @media (min-width: 768px) {
        padding-top: 80px;
        padding-bottom: 80px;
      }
    }

    p, li {
      font-family: $font-body;
      font-size: 1.05rem;
      line-height: 1.8;
      color: $color-on-surface-variant;
      max-width: 72ch;
    }

    h3 {
      font-family: $font-display;
      font-size: 1.75rem;
      color: $color-on-surface;
      margin-top: 48px;
      margin-bottom: 16px;
    }
  }
  ```

**Checkpoint**: Open `/sobre/` and verify: generous whitespace, no visible border dividers, Newsreader heading, readable body text. Confirm no visual regressions on other pages.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T014 [P] Run `bundle exec jekyll build` and fix any Liquid/build errors
- [x] T015 [P] Verify all pages still render without regressions: home (`/`), sobre (`/sobre/`), any post detail, any category archive
- [ ] T016 Verify post detail at 320px, 768px, and 1440px — no layout breaks in header, related posts, or footer bar

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS US5 and US6
- **Phase 3 (US1+US2)**: Depends on Phase 1 — can run in parallel with Phase 2
- **Phase 4 (US3)**: Depends on Phase 3 (modifies same `post.html`)
- **Phase 5 (US4)**: Depends on Phase 4 (modifies same `post.html`)
- **Phase 6 (US5)**: Depends on Phase 2 (needs `author-section.html`)
- **Phase 7 (US6)**: Depends on Phase 6 (sobre page must have include first)
- **Phase 8 (Polish)**: Depends on all phases above

### User Story Dependencies

- **US1 + US2 (P1)**: Can start after Phase 1 — no story dependencies
- **US3 (P2)**: Depends on US1+US2 (same file: `post.html`)
- **US4 (P2)**: Depends on US3 (same file: `post.html`)
- **US5 (P2)**: Depends on Phase 2 Foundational — independent from US3/US4
- **US6 (P3)**: Depends on US5

### Parallel Opportunities

- Phase 2 (Foundational) and Phase 3 (US1+US2) can run in parallel — different files
- Phase 6 (US5) can run in parallel with Phase 4/5 (US3/US4) — different files

---

## Parallel Execution Example

```bash
# After Phase 1 completes, these two tracks can run simultaneously:

# Track A: Post header + body (post.html)
Task T004: Add reading time to post header in _layouts/post.html
Task T005: Left-align post header in _components.scss
→ T006: Add related posts section to _layouts/post.html
→ T007: Add related-posts styles to _components.scss
→ T008: Replace post footer with share+categories bar in _layouts/post.html
→ T009: Add post-footer-bar and category-chip styles to _components.scss

# Track B: Author include + sobre page
Task T002: Create _includes/author-section.html
Task T003: Update _layouts/home.html to use include
→ T010: Update sobre.markdown to use include
→ T011–T013: Sobre page styling
```

---

## Implementation Strategy

### MVP First (US1 + US2 only — 2 tasks)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 3: Header reading time + left-align (T004, T005)
3. **STOP and VALIDATE**: Reading time visible, header left-aligned
4. Continue with remaining phases

### Incremental Delivery

1. T001 → T004–T005: Reading time + header alignment ← **MVP**
2. T002–T003: Author include extracted
3. T006–T007: Related posts
4. T008–T009: Footer categories
5. T010: Sobre uses include
6. T011–T013: Sobre styled
7. T014–T016: Polish + verify

---

## Notes

- `_components.scss` is modified in multiple phases — work sequentially on this file; do not run Tasks T005, T007, T009, T013 in parallel
- `_layouts/post.html` is modified in Phases 3, 4, and 5 — keep sequential
- `sobre.markdown` is modified in Phase 6 and 7 — keep sequential
- `_layouts/home.html` modified only in Phase 2 (T003)
- Category archive URL pattern: `/categoria/[slugified-category]/` — confirmed from Jekyll Archives config
