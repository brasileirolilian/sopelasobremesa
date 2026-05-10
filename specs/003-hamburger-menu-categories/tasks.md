# Tasks: Hamburger Menu for Blog Categories

**Input**: `specs/003-hamburger-menu-categories/`  
**Branch**: `003-hamburger-menu-categories`

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Parallelizable (diferent files, no incomplete dependencies)
- **[Story]**: User story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Create the data file required before any template work begins.

- [ ] T001 Create `_data/categories.yml` with `slug` and `display_name` entries for all current site categories (inspect `site.categories` by running `bundle exec jekyll build` and checking `_site/` or listing post front matter to discover all slugs)

**Checkpoint**: `_data/categories.yml` exists with at least one valid entry. `bundle exec jekyll build` succeeds.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the sidebar component, JS logic, and SCSS styles that Phase 3 depends on. These three tasks are independent of each other (different files) and can run in parallel.

**⚠️ CRITICAL**: Phase 3 cannot begin until T002, T003, and T004 are all complete.

- [ ] T002 [P] Create `_includes/hamburger-menu.html` — sidebar overlay + backdrop markup. Structure: `<nav id="category-sidebar" class="category-sidebar" role="dialog" aria-modal="true" aria-label="Categorías">` containing a close button (`#sidebar-close`, `aria-label="Fechar menu"`), an `<h2 class="sidebar-title">`, and a `<ul class="sidebar-categories">` that iterates `site.categories`, resolves display names via `site.data.categories | where: "slug", cat_slug | first` with fallback to raw `category[0]`, and links to `'/categorias.html#' | append: cat_slug`. The inner navigation wrapper uses `<div class="sidebar-nav">` (not `<nav>` — avoid nesting nav inside nav). After the closing `</nav>`, add `<div id="sidebar-backdrop" class="sidebar-backdrop"></div>`.
- [ ] T003 [P] Create `assets/js/hamburger-menu.js` — open/close logic: `openSidebar()` adds `.is-open` to `#category-sidebar` and `#sidebar-backdrop` and `.sidebar-open` to `<body>`; `closeSidebar()` removes them. Wire: `#hamburger-btn` click → open; `#sidebar-backdrop` click → close; `#sidebar-close` click → close; `document` keydown `Escape` → close. Wrap in `DOMContentLoaded`.
- [ ] T004 [P] Add sidebar and hamburger-button SCSS to `assets/css/_components.scss` after the existing header block (`.site-header` ends at line 75). Add: `.hamburger-btn` (background none, border none, cursor pointer, color `$color-primary`, padding 8px, display flex, align-items center); `.category-sidebar` (position fixed, top 0, left 0, height 100vh, width 320px, background `rgba($color-surface-container, 0.92)`, backdrop-filter `blur(16px) saturate(180%)`, z-index 200, transform `translateX(-100%)`, transition `transform 0.25s ease`; `.is-open` → `translateX(0)`; `@media (max-width: 768px)` → `width: min(85vw, 400px)`); `.sidebar-backdrop` (position fixed, inset 0, background `rgba($color-on-surface, 0.4)`, z-index 199, opacity 0, pointer-events none, transition `opacity 0.25s ease`; `.is-open` → opacity 1, pointer-events all); `body.sidebar-open` (overflow hidden). Also add sidebar category list styles: `.sidebar-categories` (list-style none, padding 0, margin 0), `.sidebar-categories a` (display block, padding `12px 24px`, font-family `$font-body`, color `$color-on-surface`, no underline, transition `background 0.15s`; hover → background `$color-surface-container-high`).

**Checkpoint**: `bundle exec jekyll build` succeeds. Sidebar HTML is in `_site/` (once included in header). SCSS compiles without errors.

---

## Phase 3: User Story 1 — Open Category Menu (Priority: P1) 🎯 MVP

**Goal**: Visitor clicks hamburger icon → sidebar slides in from left → categories shown with display names → clicking a category navigates and closes sidebar.

**Independent Test**: Open any page, click the hamburger icon, verify sidebar slides in with all categories showing display names (not raw slugs), click a category, verify navigation and sidebar close.

- [ ] T005 [US1] Add hamburger button to `_includes/header.html` inside `.header-left`: `<button id="hamburger-btn" class="hamburger-btn" aria-label="Abrir menú de categorías" aria-expanded="false">` containing a 3-line SVG hamburger icon (three `<line>` elements or three `<rect>` elements, 24×24 viewBox, stroke `currentColor`).
- [ ] T006 [US1] Include `hamburger-menu.html` in `_includes/header.html` — add `{% include hamburger-menu.html %}` immediately before the closing `</header>` tag (outside `.container` div so the sidebar spans full viewport width).
- [ ] T007 [US1] Load `hamburger-menu.js` in the site — add `<script src="{{ '/assets/js/hamburger-menu.js' | relative_url }}" defer></script>` to `_includes/head.html` (or to `_layouts/default.html` before `</body>` — check where other script tags are placed in the layout).
- [ ] T008 [US1] Visual verification: run `bundle exec jekyll serve`, open `http://localhost:4000`, click hamburger → sidebar slides in from left with ≤300ms animation, all categories show display names from `categories.yml`, clicking a category navigates correctly and closes sidebar, clicking backdrop closes sidebar, pressing ESC closes sidebar, close button works.

**Checkpoint**: User Story 1 fully functional. Sidebar opens/closes correctly. Category display names resolved. Navigation works.

---

## Phase 4: User Story 2 — Categories Removed from Home (Priority: P2)

**Goal**: Home page no longer shows the standalone category section.

**Independent Test**: Load `http://localhost:4000`, verify no `.categories-section` block is visible in the page body.

- [ ] T009 [US2] Remove the `<section class="categories-section">` block from `_layouts/home.html` (lines 74–84: from `<section class="categories-section">` through its closing `</section>`). Do NOT remove the `.categories-section` SCSS in `_components.scss` — it is still used by other pages.
- [ ] T010 [US2] Visual verification: load home page, confirm no category pill list appears; confirm the layout between the post grid and the author section looks clean with appropriate spacing.

**Checkpoint**: Home page renders without `.categories-section`. All categories accessible only via hamburger sidebar.

---

## Phase 5: User Story 3 — Header Reorganization (Priority: P3)

**Goal**: Header shows hamburger + search on the left, social icons on the right across all breakpoints.

**Independent Test**: Load any page on desktop and mobile (≤768px), verify header layout: left side has hamburger icon and search field (open on desktop, collapsed on mobile); right side has social icons.

- [ ] T011 [US3] Move `.social-links-header` block from `.header-left` to `.header-right` in `_includes/header.html`. After this change, `.header-left` contains: hamburger button (from T005) + search include; `.header-right` contains: social icons only.
- [ ] T012 [US3] Move `{% include search.html %}` from `.header-right` to `.header-left` in `_includes/header.html` (place it after the `#hamburger-btn` button). Wrap in a `<div class="header-search-wrapper">` if needed for layout control.
- [ ] T013 [US3] Update `.header-left` SCSS in `assets/css/_components.scss` to add `gap: 12px; align-items: center;` so hamburger button and search field sit side by side. Verify `.header-right` also has `align-items: center`.
- [ ] T014 [US3] Visual verification: desktop — hamburger icon and search field visible on left, social icons (Instagram + RSS) on right. Mobile (≤768px) — hamburger icon on left, search field collapsed (toggle button visible), social icons on right.

**Checkpoint**: Header layout correct across all breakpoints. Hamburger, search, and social icons all in correct positions.

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: Full end-to-end validation across all user stories and edge cases.

- [ ] T015 [P] Edge case — empty categories: temporarily comment out all entries in `_data/categories.yml`, rebuild, verify sidebar shows a fallback empty-state message (add empty-state markup in `hamburger-menu.html` if missing: `{% if categories_list == empty %}<p class="sidebar-empty">Nenhuma categoria encontrada.</p>{% endif %}`).
- [ ] T016 [P] Edge case — unmapped slug fallback: remove one entry from `_data/categories.yml`, rebuild, verify the raw slug renders in the sidebar without errors.
- [ ] T017 Resize test: open sidebar on mobile viewport → resize browser to desktop width → verify sidebar and search field adapt correctly with no broken layout.
- [ ] T018 Accessibility check: verify `#hamburger-btn` has `aria-expanded="false"` when closed and `"true"` when open (update JS in `hamburger-menu.js` to toggle `aria-expanded` on open/close). Verify `role="dialog"` and `aria-modal="true"` on sidebar element.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 (needs `_data/categories.yml` for T002 template)
- **Phase 3 (US1)**: Depends on Phase 2 complete — all of T002, T003, T004 must be done
- **Phase 4 (US2)**: Depends on Phase 1 only — independent of Phase 2/3
- **Phase 5 (US3)**: Depends on T005 (hamburger button must exist in header-left first)
- **Phase 6 (Polish)**: Depends on Phases 3, 4, 5 all complete

### User Story Independence

- **US1 (P1)**: Blocks nothing, delivers full sidebar functionality
- **US2 (P2)**: Fully independent — can be done in parallel with US1 after Phase 1
- **US3 (P3)**: Depends on T005 (hamburger button) from US1 — sequence US1 → US3

### Parallel Opportunities Within Phase 2

```
T002 (_includes/hamburger-menu.html)   ─┐
T003 (assets/js/hamburger-menu.js)      ├─ all parallel (different files)
T004 (assets/css/_components.scss)     ─┘
```

### Parallel Opportunities: US2 + US1 Foundational

```
Phase 2 (T002, T003, T004)   ─┐
Phase 4 T009 (home.html)     ─┘  can run simultaneously
```

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Phase 1: T001 — create `_data/categories.yml`
2. Phase 2: T002 + T003 + T004 in parallel
3. Phase 3: T005 → T006 → T007 → T008 (verify)
4. **STOP and VALIDATE** — sidebar fully functional
5. Ship if ready

### Full Delivery (all stories)

1. Phase 1 → Phase 2 (parallel T002/T003/T004)
2. Phase 3 (US1) + Phase 4 T009 in parallel
3. Phase 5 (US3) after T005 exists
4. Phase 6 (Polish)

---

## Notes

- `[P]` tasks have different target files — safe to parallelize
- `.categories-section` SCSS in `_components.scss` must **not** be deleted — used by `categorias.html`
- `_data/categories.yml` fallback behavior means site never breaks if a slug is missing
- JS `defer` attribute on script tag ensures DOM is ready before event listeners attach
- `aria-expanded` toggle in T018 should be added to `hamburger-menu.js` alongside open/close logic
