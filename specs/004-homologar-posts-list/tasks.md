# Tasks: Standardize Post List

**Input**: Design documents from `specs/004-homologar-posts-list/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Exact file paths included in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install `jekyll-archives` plugin and wire configuration.

- [ ] T001 [P] Add `gem "jekyll-archives"` to the `:jekyll_plugins` group in `Gemfile`
- [ ] T002 [P] Add `jekyll-archives` to `plugins` list and add config block to `_config.yml`:
  ```yaml
  jekyll-archives:
    enabled:
      - categories
    layouts:
      category: category
    permalinks:
      category: /categoria/:name/
  ```

**Checkpoint**: `bundle install` runs clean; `bundle exec jekyll build` generates `/categoria/:name/` pages

---

## Phase 2: Foundational (Blocking Prerequisite)

**Purpose**: Create the shared reading-time Liquid include used by all three user stories.

**⚠️ CRITICAL**: Must complete before any user story phase begins.

- [ ] T003 Create `_includes/reading-time.html` with word-count-based reading time calculation (200 words/min, minimum 1 min), accepting `post` as a passed variable

**Checkpoint**: Include exists and can be called with `{% include reading-time.html post=post %}` inside any loop

---

## Phase 3: User Story 1 - Reader browses by category (Priority: P1) 🎯 MVP

**Goal**: Static, indexable category pages at `/categoria/:name/` with standard post cards; hamburger menu links updated.

**Independent Test**: Open hamburger menu → click a category → land on `/categoria/sobremesas/` → verify cards have image, date + reading time, title, excerpt. No JavaScript required to display posts.

- [ ] T004 [US1] Rewrite `_layouts/category.html`: replace `<ul class="post-list">` with `<div class="post-grid">` containing `article.post-card.group` cards; resolve display name from `site.data.categories` using `page.title` slug; use `page.posts` for post iteration; include reading time in `post-meta` via `_includes/reading-time.html`
- [ ] T005 [P] [US1] Update `_includes/hamburger-menu.html`: change each category link `href` from `/categorias.html#{{ cat_slug }}` to `/categoria/{{ cat_slug }}/`
- [ ] T006 [P] [US1] Delete `categorias.html` from the project root

**Checkpoint**: US1 fully functional — `/categoria/:name/` pages render correctly; hamburger menu links navigate to correct static pages; `categorias.html` no longer exists

---

## Phase 4: User Story 2 - Latest posts on home page (Priority: P2)

**Goal**: 3 mosaic post cards on home page have identical HTML structure to `artigos/index.html` cards, including excerpt and reading time.

**Independent Test**: Load home page → verify 3 cards each have: cover image, `post-meta` with date + reading time, `h3.post-title`, `p.post-excerpt`. Hero and "Ver Todos os Artigos" button remain present.

- [ ] T007 [US2] Update mosaic post cards in `_layouts/home.html`: add `<p class="post-excerpt">` block and reading time (via `_includes/reading-time.html`) to each of the 3 cards in the `{% for post in remaining_posts limit: 3 %}` loop

**Checkpoint**: US2 fully functional — home page mosaic cards visually match `artigos/index.html` cards

---

## Phase 5: User Story 3 - Reading time on all post cards (Priority: P3)

**Goal**: Reading time visible in `post-meta` on every post listing page.

**Independent Test**: Open `/artigos/` → verify each card's `post-meta` contains date AND "N min de leitura". Repeat on home and any `/categoria/:name/` page.

- [ ] T008 [US3] Update `artigos/index.html`: add `· {% include reading-time.html post=post %}` to the `<span class="post-meta">` element inside the paginator loop

**Checkpoint**: US3 fully functional — reading time visible on all three listing contexts: home, `/artigos/`, `/categoria/:name/`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build validation and visual QA across all affected pages.

- [ ] T009 Run `bundle exec jekyll build` and confirm zero errors and zero warnings related to category pages, missing layouts, or missing includes
- [ ] T010 [P] Visual QA: compare post card HTML structure across home, `/artigos/`, and one `/categoria/:name/` page — confirm identical classes and elements
- [ ] T011 [P] Visual QA: verify DESIGN.md principles are maintained — no new borders, correct palette, adequate whitespace between cards

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T001 and T002 run in parallel immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — T003 BLOCKS T004, T007, T008
- **US1 (Phase 3)**: Depends on T003 — T004 sequential; T005 and T006 parallel after T004 or independently
- **US2 (Phase 4)**: Depends on T003 — can run in parallel with Phase 3
- **US3 (Phase 5)**: Depends on T003 — can run in parallel with Phases 3 and 4
- **Polish (Phase 6)**: Depends on all Phase 3–5 tasks complete

### User Story Dependencies

- **US1 (P1)**: Requires T003 — no dependency on US2 or US3
- **US2 (P2)**: Requires T003 — no dependency on US1 or US3
- **US3 (P3)**: Requires T003 — no dependency on US1 or US2; reading time appears in US1/US2 contexts via those tasks

### Parallel Opportunities

- T001 ‖ T002 (Phase 1, different files)
- T005 ‖ T006 (Phase 3, different files, no shared dependency after T003)
- T007 ‖ T004 (different layouts, both depend only on T003)
- T008 ‖ T004 ‖ T007 (all depend only on T003, all different files)
- T010 ‖ T011 (Phase 6, read-only QA tasks)

---

## Parallel Example: After T003 completes

```bash
# These 4 tasks can all run simultaneously:
Task T004: "Rewrite _layouts/category.html"
Task T005: "Update _includes/hamburger-menu.html"
Task T007: "Update _layouts/home.html mosaic cards"
Task T008: "Update artigos/index.html post-meta"

# T006 (delete categorias.html) runs independently any time after T001/T002
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003)
3. Complete Phase 3: US1 (T004, T005, T006)
4. **STOP and VALIDATE**: Category pages work; hamburger links correct; `categorias.html` gone
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → infrastructure ready
2. Phase 3 (US1) → category navigation works → **MVP**
3. Phase 4 (US2) → home cards standardized
4. Phase 5 (US3) → reading time complete everywhere
5. Phase 6 → polish + QA

---

## Notes

- `jekyll-archives` must appear in BOTH `Gemfile` AND `_config.yml plugins` — missing either causes silent failure on some hosts
- `_includes/reading-time.html` must use `post` variable (not `page`) to work inside `for` loops
- Image block in `post-card` must remain conditional (`{% if post.image %}`) — older posts may lack images
- `page.posts` (jekyll-archives) preferred over `site.categories[name]` in category layout
- Delete `categorias.html` before testing to avoid stale hash-based links
