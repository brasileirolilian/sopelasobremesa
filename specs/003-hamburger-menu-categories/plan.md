# Implementation Plan: Hamburger Menu for Blog Categories

**Branch**: `003-hamburger-menu-categories` | **Date**: 2026-05-10 | **Spec**: [spec.md](./spec.md)

## Summary

Migrate the home page category list to a left-side hamburger sidebar. Reorganize the header: hamburger icon + search field on the left, social icons on the right. Add a `_data/categories.yml` mapping to translate category slugs into human-readable display names.

## Technical Context

**Language/Version**: Jekyll (Liquid) + SCSS + Vanilla JS  
**Primary Dependencies**: `site.categories` (Jekyll built-in), `site.data.categories` (new `_data/categories.yml`)  
**Storage**: `_data/categories.yml` — flat YAML list of `{ slug, display_name }` entries  
**Testing**: Manual visual verification in browser (Jekyll static site — no automated test runner)  
**Target Platform**: Static site served via Jekyll  
**Performance Goals**: Sidebar open/close transition ≤ 300ms  
**Constraints**: No external CSS frameworks or JS libraries; SCSS must remain modular  
**Scale/Scope**: Single blog; number of categories is small (< 20)

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Stack (Jekyll + SCSS, no heavy frameworks) | ✅ Pass | Vanilla JS only; no npm deps |
| II. SEO First | ✅ Pass | Sidebar is navigational; no content removed from crawlable DOM |
| III. Accessibility (a11y) | ✅ Pass | `aria-label` on hamburger btn; `role="dialog"` + `aria-modal` on sidebar; ESC closes |
| IV. Design (bordeaux/beige palette, DESIGN.md) | ✅ Pass | Uses `$color-surface-container` + `backdrop-filter` glassmorphism; `$color-primary` for icons |
| V. Content restriction (no post markdown edits) | ✅ Pass | Only layout/include/SCSS/JS files touched |

## Project Structure

### Documentation (this feature)

```text
specs/003-hamburger-menu-categories/
├── plan.md              ← this file
├── research.md          ← Phase 0 (below)
├── data-model.md        ← Phase 1 (below)
└── tasks.md             ← /speckit.tasks (not created here)
```

### Source Code Changes

```text
_data/
└── categories.yml           ← NEW: slug → display_name mapping

_includes/
├── header.html              ← MODIFY: restructure left/right zones
└── hamburger-menu.html      ← NEW: sidebar + backdrop markup

_layouts/
└── home.html                ← MODIFY: remove .categories-section block

assets/
├── css/
│   └── _components.scss     ← MODIFY: header layout + hamburger + sidebar styles
└── js/
    └── hamburger-menu.js    ← NEW: open/close logic (toggle, ESC, backdrop click)
```

## Phase 0: Research

### Decision Log

**Decision 1: Category data source**
- Chosen: `_data/categories.yml` — flat list `[{ slug, display_name }]`
- Rationale: Native Jekyll `_data` mechanism; no plugins needed; Liquid `where` filter resolves slug → display_name in templates
- Lookup pattern: `{% assign cat_data = site.data.categories | where: "slug", cat_slug | first %}` with `| default: category[0]` fallback for unmapped slugs

**Decision 2: Sidebar state management**
- Chosen: CSS class `.is-open` toggled on the sidebar and backdrop elements; `body.sidebar-open` adds `overflow: hidden` to prevent scroll while open
- Rationale: No JS framework; class-based state is the standard vanilla approach for static sites
- Alternatives: `<details>`/`<summary>` element — rejected because it lacks backdrop and animation control

**Decision 3: Animation approach**
- Chosen: `transform: translateX(-100%)` → `translateX(0)` with `transition: transform 0.25s ease`
- Rationale: GPU-composited property; no layout reflow; achieves slide-in from left within 300ms budget
- Backdrop: `opacity 0 → 1` with same duration; `pointer-events: none/all` toggled via class

**Decision 4: Sidebar width**
- Desktop: `width: 320px` (fixed)
- Mobile: `width: min(85vw, 400px)` — CSS `min()` function handles both percentage and max-cap in one declaration

**Decision 5: Category slug vs. raw category name**
- `site.categories` returns `[category_name, posts_array]` where `category_name` is the raw string from post front matter (e.g., `sobremesas`)
- We apply `| slugify` before looking up in `categories.yml` for consistency (handles accents, spaces)
- If no match found in `categories.yml`, fallback to raw `category[0]` ensures nothing breaks

## Phase 1: Data Model & Contracts

### Data Model (`data-model.md`)

#### Entity: Category Mapping Entry (`_data/categories.yml`)

```yaml
- slug: sobremesas
  display_name: Sobremesas
- slug: viagem
  display_name: Viagem
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | yes | Matches value produced by `category[0] | slugify` from `site.categories` |
| `display_name` | string | yes | Human-readable label shown in sidebar and any other UI rendering categories |

**Constraint**: `slug` must be unique. If a slug has no entry, the raw Jekyll category name is shown as fallback.

#### Entity: Sidebar State (runtime, JS-managed)

| State | CSS Classes Present | Behavior |
|-------|---------------------|----------|
| Closed | — | Sidebar off-screen (`translateX(-100%)`); backdrop `opacity: 0`, `pointer-events: none` |
| Open | `.is-open` on `#hamburger-sidebar` + `#sidebar-backdrop`; `.sidebar-open` on `<body>` | Sidebar on-screen; backdrop visible; body scroll locked |

### Interface Contracts

No external API contracts (static Jekyll site). The "interface" is the Liquid template contract:

**`hamburger-menu.html` include** — no parameters required; reads `site.categories` and `site.data.categories` directly.

**`_data/categories.yml` schema** — consumed by `hamburger-menu.html`. Any new category added to posts MUST have a corresponding entry added here for correct display names to appear.

### Implementation Details

#### `_includes/header.html` — new structure

```
header.site-header
  div.container  (grid: 1fr auto 1fr)
    div.header-left
      button#hamburger-btn.hamburger-btn  ← NEW (was: social icons)
      div.header-search-wrapper           ← MOVED from header-right (wraps search.html)
    div.site-logo (unchanged)
    div.header-right
      div.social-links-header             ← MOVED from header-left
  
  <!-- outside .container, full-width overlay -->
  {% include hamburger-menu.html %}
```

#### `_includes/hamburger-menu.html` — new file

```
div#hamburger-sidebar.hamburger-sidebar (role="dialog" aria-modal="true" aria-label="Categorías")
  button#sidebar-close.sidebar-close (aria-label="Fechar menu")
  nav.sidebar-nav
    h2.sidebar-title  "Categorías"
    ul.sidebar-categories
      [for each site.category → resolve display_name → li > a]

div#sidebar-backdrop.sidebar-backdrop
```

#### `assets/js/hamburger-menu.js` — new file

```
openSidebar()  → adds .is-open to sidebar + backdrop; adds .sidebar-open to body
closeSidebar() → removes .is-open; removes .sidebar-open
Triggers: #hamburger-btn click → open
          #sidebar-backdrop click → close
          #sidebar-close click → close
          document keydown Escape → close
```

#### `assets/css/_components.scss` — additions/modifications

**Header changes:**
- `.header-left`: add `gap: 12px; align-items: center`
- `.header-search-wrapper`: visible on desktop; hidden on mobile (existing `.mobile-search-toggle` logic preserved)
- `.hamburger-btn`: `background: none; border: none; cursor: pointer; color: $color-primary; padding: 8px; display: flex; align-items: center`

**New sidebar styles:**
```scss
.hamburger-sidebar {
  position: fixed; top: 0; left: 0; height: 100vh;
  width: 320px;
  background: rgba($color-surface-container, 0.92);
  backdrop-filter: blur(16px) saturate(180%);
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  
  &.is-open { transform: translateX(0); }
  
  @media (max-width: 768px) { width: min(85vw, 400px); }
}

.sidebar-backdrop {
  position: fixed; inset: 0;
  background: rgba($color-on-surface, 0.4);
  z-index: 199;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s ease;
  
  &.is-open { opacity: 1; pointer-events: all; }
}

body.sidebar-open { overflow: hidden; }
```

**Note**: `.categories-section` styles in `_components.scss` (lines 293–346) are preserved — they are used on `categorias.html` and potentially other pages. Only the `home.html` markup is removed.

## Verification

1. Run `bundle exec jekyll serve` and open `http://localhost:4000`
2. **CA01** — Home page: confirm `.categories-section` is gone; open hamburger sidebar and verify all categories appear with display names from `_data/categories.yml`
3. **CA02** — Header: social icons (Instagram + RSS) are on the right
4. **CA03** — Desktop: hamburger + open search field on the left. Mobile (≤768px): hamburger on left, search collapsed
5. **Backdrop**: open sidebar → dark overlay appears → click overlay → sidebar closes
6. **ESC key**: open sidebar → press Escape → sidebar closes
7. **Animation**: open/close transition is smooth, ≤300ms
8. **Category navigation**: click a category in sidebar → navigates to correct category page → sidebar closes
9. **Unmapped slug fallback**: temporarily remove one entry from `categories.yml` → verify raw slug displayed instead of breaking
10. **Mobile resize**: open sidebar on mobile → resize to desktop → verify layout adapts
