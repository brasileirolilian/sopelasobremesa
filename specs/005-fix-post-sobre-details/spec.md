# Feature Specification: Post Detail & Sobre Page Polish

**Feature Branch**: `005-fix-post-sobre-details`  
**Created**: 2026-05-10  
**Status**: Draft  
**Input**: User description: "Fix post detail page layout and improve sobre page styling"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reading Time Visible in Post Header (Priority: P1)

A visitor opens any post and wants to quickly gauge how long it will take to read before committing.

**Why this priority**: The reading time is already computed by the existing `reading-time.html` include — exposing it in the header is the highest-value, lowest-effort improvement.

**Independent Test**: Open any post page and confirm reading time appears next to the date in the header.

**Acceptance Scenarios**:

1. **Given** a visitor opens a post, **When** the page loads, **Then** the post header shows the publication date and reading time on the same line, separated by a visual divider (e.g., `•`).
2. **Given** a very short post (under 1 minute), **When** the header renders, **Then** reading time shows "1 min de leitura".
3. **Given** a post with no date, **When** the header renders, **Then** reading time still appears correctly on its own.

---

### User Story 2 - Post Header Left-Aligned (Priority: P1)

A visitor reads a post and the title, date and reading time are consistently left-aligned, matching the editorial style defined in DESIGN.md.

**Why this priority**: Visual consistency with the design system; currently alignment is undefined or centered.

**Independent Test**: Open any post and inspect that the title and meta line are left-aligned.

**Acceptance Scenarios**:

1. **Given** a visitor opens a post, **When** the header renders, **Then** title, date, and reading time are all left-aligned.
2. **Given** a mobile viewport, **When** the header renders, **Then** left alignment is preserved.

---

### User Story 3 - Related Posts at End of Post (Priority: P2)

After finishing a post, a visitor sees a curated list of related posts to continue exploring.

**Why this priority**: Increases engagement and time-on-site; keeps visitors within the blog.

**Independent Test**: Open any post and scroll to the bottom — a "Related Posts" section appears above the footer share buttons, showing at least 2 posts from the same category.

**Acceptance Scenarios**:

1. **Given** a visitor finishes reading a post, **When** they reach the end of the content, **Then** a "Related Posts" section shows up to 3 posts from the same category.
2. **Given** no other posts share the same category, **When** the section renders, **Then** it falls back to showing the 3 most recent posts (excluding the current post).
3. **Given** the current post is the only post, **When** the section renders, **Then** the related posts section is not shown at all.

---

### User Story 4 - Post Footer with Share + Categories (Priority: P2)

A visitor finishes reading and can see both share buttons and the post categories in the footer — without having to scroll back to the header.

**Why this priority**: Improves discoverability of categories and sharing UX in a single glance.

**Independent Test**: Open any post with multiple categories and verify the footer shows share buttons on the left and category links on the right, wrapping gracefully when there are many categories.

**Acceptance Scenarios**:

1. **Given** a post with 2+ categories, **When** the footer renders, **Then** category links appear on the right side with the share section on the left.
2. **Given** a post with many categories (6+), **When** the footer renders, **Then** category chips wrap to a new line without breaking the layout.
3. **Given** a post with a single category, **When** the footer renders, **Then** one category link is shown.
4. **Given** a post with no categories, **When** the footer renders, **Then** the categories column is not rendered.

---

### User Story 5 - Author Section Shared via Include (Priority: P2)

The author section on the "Sobre" page looks identical to the author section on the home page, because both use the same reusable include.

**Why this priority**: Eliminates duplication; ensures visual consistency and easier future updates.

**Independent Test**: Compare the author section on the home page and the sobre page — they must be visually identical. Editing the include once should update both pages.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/sobre/`, **When** the page loads, **Then** the author section (photo, name, bio) looks identical to the one on the home page.
2. **Given** the author bio is updated in the include, **When** both pages are rebuilt, **Then** both show the updated text.

---

### User Story 6 - Sobre Page Styled to Design System (Priority: P3)

The full "Sobre" page follows the editorial style from DESIGN.md: generous whitespace, tonal layering, Newsreader/Manrope typography, no hard borders.

**Why this priority**: Cosmetic improvement; lower priority than structural changes but necessary for visual coherence.

**Independent Test**: Open `/sobre/` and verify layout uses correct surface colors, typography scale, and spacing from DESIGN.md.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/sobre/`, **When** the page loads, **Then** the page intro section uses `surface-container-low` background and generous vertical padding (≥80px).
2. **Given** the DESIGN.md forbids 1px solid borders, **When** the sobre page renders, **Then** no divider lines are visible; sections are separated by background color changes or padding.

---

### Edge Cases

- What happens when a post belongs to a category that links to an archive page that doesn't exist yet?
- How does the related posts section handle posts where categories use different casing (e.g., `Receitas` vs `receitas`)?
- How does the footer layout behave on very narrow viewports with 5+ category tags?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The post layout MUST display reading time adjacent to the publication date in the post header, using the existing `reading-time.html` include.
- **FR-002**: The post header (title, date, reading time) MUST be left-aligned.
- **FR-003**: The post layout MUST include a "Related Posts" section after the post body, showing up to 3 posts from the same category as the current post.
- **FR-004**: When no posts share the same category, the related posts section MUST fall back to the 3 most recent posts, excluding the current post.
- **FR-005**: When no other posts exist, the related posts section MUST be hidden entirely.
- **FR-006**: The post footer MUST display share buttons and the post's category links in a two-column row: share buttons on the left, categories on the right.
- **FR-007**: Category links in the post footer MUST link to the corresponding category archive pages.
- **FR-008**: The category list in the post footer MUST wrap to multiple lines gracefully when there are many categories.
- **FR-009**: If a post has no categories, the categories column in the post footer MUST not be rendered.
- **FR-010**: An `_includes/author-section.html` include MUST be created containing the author section markup currently hardcoded in the home layout.
- **FR-011**: The home layout MUST use the new `author-section.html` include in place of its current inline author markup.
- **FR-012**: The `sobre` page MUST render the author section using the same `author-section.html` include.
- **FR-013**: The `sobre` page intro section MUST be styled to match DESIGN.md: tonal background, generous whitespace, no 1px borders, Newsreader/Manrope typography scale.

### Key Entities

- **Post**: A Jekyll blog post with `title`, `date`, `categories` (array), `image`, and `content`.
- **Author Section**: A reusable content block with author photo, name, and bio — shared between home and sobre pages.
- **Related Post**: A post shown in the related posts section, determined by shared category with the current post.
- **Category Link**: A link pointing to the category archive page for a given category slug.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Reading time is visible on all post pages without any additional configuration.
- **SC-002**: The author section renders identically on the home page and the sobre page — confirmed by visual comparison.
- **SC-003**: Any post with at least one category sibling shows a related posts section with 1–3 posts.
- **SC-004**: The post footer layout does not break (no horizontal overflow, no invisible text) on viewports from 320px to 1440px wide, regardless of how many categories the post has.
- **SC-005**: The sobre page contains no visible 1px border dividers and uses the surface color hierarchy from DESIGN.md.
- **SC-006**: Updating the author section (name, bio, or photo) in a single file is sufficient to update both the home page and the sobre page.

## Assumptions

- Jekyll Archives plugin is already configured for category pages (branch `004` introduced this), so category links will resolve correctly.
- The `reading-time.html` include already exists and is functional — it only needs to be wired into the post header.
- The author photo (`/assets/img/lilian-brasileiro.webp`) is already present and does not need to be regenerated.
- Related posts are matched by the first category of the current post; if a post has multiple categories, the first one is used for matching.
- No pagination is required in the related posts section — a maximum of 3 posts is sufficient.
- The sobre page currently uses the `page` layout; this can remain unchanged or be switched to `default` if needed for full-width styling — this is a low-impact implementation decision.
