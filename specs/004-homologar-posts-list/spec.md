# Feature Specification: Standardize Post List

**Feature Branch**: `004-homologar-posts-list`
**Created**: 2026-05-10
**Status**: Draft
**Input**: User description: "Standardize the post list on the home page to match the design of the categories page"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reader browses by category (Priority: P1)

A reader opens the hamburger menu, sees available categories, and clicks one. They are taken to a dedicated category page (`/categoria/sobremesas/`) where they find all posts in that category displayed with the same card style they already know from the home page and articles page.

**Why this priority**: This is the primary content discovery flow by category. It replaces the current hash/JS-based system and generates indexable URLs for search engines.

**Independent Test**: Clicking a category link in the menu opens `/categoria/:name/` with a post list using the same `post-card` structure as the rest of the site.

**Acceptance Scenarios**:

1. **Given** the hamburger menu is open, **When** the reader clicks "Sobremesas", **Then** they navigate to `/categoria/sobremesas/` and see all posts in that category.
2. **Given** the `/categoria/sobremesas/` page, **When** the reader views the list, **Then** each card has: cover image, date + estimated reading time, title, and excerpt — identical to `artigos/`.
3. **Given** a category with no posts, **When** the page is accessed, **Then** it displays "Nenhuma postagem encontrada nesta categoria."

---

### User Story 2 - Reader sees latest posts on home page (Priority: P2)

A reader lands on the home page and sees the "Últimos Artigos" section with 3 recent posts whose cards look identical to those on `/artigos/`: image, date with reading time, title, and excerpt.

**Why this priority**: Visual consistency builds trust and eliminates confusion when navigating between pages.

**Independent Test**: The 3 cards on the home page have identical HTML and CSS classes to the cards in `artigos/index.html`, including excerpt and reading time.

**Acceptance Scenarios**:

1. **Given** the home page is loaded, **When** the reader sees the post section, **Then** all 3 cards have: image, date + reading time, title, and excerpt.
2. **Given** the home page, **When** the reader scrolls to the end of the post section, **Then** the "Ver Todos os Artigos" button is still present and functional.
3. **Given** the home page, **When** loaded, **Then** the hero (featured post) remains visible at the top of the content section.

---

### User Story 3 - Reader sees reading time on post cards (Priority: P3)

In any post listing (home, `/artigos/`, `/categoria/:name/`), the estimated reading time appears next to the publication date.

**Why this priority**: Useful metadata that helps the reader decide whether they have time for the article now.

**Independent Test**: In all listing contexts, `post-meta` displays both date and reading time in the same element.

**Acceptance Scenarios**:

1. **Given** any post list, **When** the reader sees a card, **Then** the meta displays something like "10 DE MAI, 2026 · 5 min de leitura".
2. **Given** a very short post (< 1 min), **When** displayed in a list, **Then** reading time shows as "1 min de leitura".

---

### Edge Cases

- What happens when a category name contains special characters or spaces (e.g., "Café & Drinks")? → The generated slug must be URL-safe.
- What happens if `jekyll-archives` is missing from the Gemfile? → Build fails with a clear error; must be documented in `Gemfile`.
- What happens to the old `/categorias.html` URL after deletion? → No redirect needed; the page had no established SEO value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST use the `jekyll-archives` plugin to generate category pages with URLs in the format `/categoria/:name/`.
- **FR-002**: Each category page MUST use the `category` layout, updated to display cards using the standard `post-card` structure (image, meta, title, excerpt).
- **FR-003**: The `category` layout MUST display posts using the same HTML structure and CSS classes as `artigos/index.html`.
- **FR-004**: All post cards (home, `/artigos/`, `/categoria/:name/`) MUST include estimated reading time alongside the date in `post-meta`.
- **FR-005**: Reading time calculation MUST use a standard reading speed (200 words/min) and display a minimum of "1 min de leitura".
- **FR-006**: The `hamburger-menu.html` component MUST link each category to `/categoria/:name/` instead of `/categorias.html#slug`.
- **FR-007**: The home page MUST retain: hero (1 featured post), a section with 3 recent posts, and a "Ver Todos os Artigos" link.
- **FR-008**: The 3 post cards on the home page MUST have the same HTML structure and CSS classes as cards in `artigos/index.html`, including excerpt.
- **FR-009**: The `categorias.html` file MUST be removed from the project.
- **FR-010**: `_config.yml` MUST include `jekyll-archives` configuration for type `categories` with permalink `/categoria/:name/`.

### Key Entities

- **Post Card**: Reusable visual unit. Attributes: cover image, publication date, estimated reading time, title (link), excerpt. Identical HTML structure across all listing contexts.
- **Category**: Grouping of posts by Jekyll category tag. Has a URL-safe slug and a dedicated page generated automatically by the plugin.
- **Reading Time**: Metadata calculated from the post's word count, displayed in rounded minutes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reader can reach a category page from the hamburger menu in at most 2 clicks.
- **SC-002**: 100% of post cards across all listing pages (home, artigos, categories) share the same HTML structure and CSS classes — verifiable by code inspection.
- **SC-003**: All category pages have static, indexable URLs (`/categoria/:name/`) with no JavaScript required to display content.
- **SC-004**: The home page retains hero + 3 posts + "Ver Todos os Artigos" CTA after the change — verifiable visually.
- **SC-005**: Reading time is displayed on all post cards in all site listings.

## Assumptions

- The `jekyll-archives` plugin will be added to the `Gemfile` and installed before implementation.
- Default reading speed for time calculation is 200 words/minute (standard for casual reading).
- Category permalink will be `/categoria/:name/` (singular, in Portuguese), not `/categories/` or `/categorias/`.
- No redirect from `/categorias.html` is needed, as the page has no established SEO value.
- The existing `category` layout will be modified in-place to support the new standard card structure.
- The `category_name` field used in the `category` layout will be sourced from `page.title` or `page.category` as provided by `jekyll-archives`.
- Reading time will be implemented as a Liquid include or filter, not as an external Ruby plugin.
- Data from `_data/categories` (display names) will continue to be used in the category layout to show the formatted name.
