# Feature Specification: Hamburger Menu for Blog Categories

**Feature Branch**: `003-hamburger-menu-categories`  
**Created**: 2026-05-10  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open Category Menu (Priority: P1)

A visitor wants to browse blog posts by category. They click the hamburger icon in the header, a sidebar slides in from the left showing all available categories, and they click one to navigate.

**Why this priority**: Core feature — the entire hamburger menu concept is only valuable if users can access and navigate categories from it.

**Independent Test**: Open the site, click the hamburger icon, verify sidebar appears with all categories, click one category, verify navigation works.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they click the hamburger icon in the header, **Then** a vertical sidebar opens from the left overlaying the page content, showing all blog categories.
2. **Given** the sidebar is open, **When** the visitor clicks a category, **Then** they are navigated to that category's page and the sidebar closes.
3. **Given** the sidebar is open, **When** the visitor clicks outside the sidebar or a close button, **Then** the sidebar closes without navigation.

---

### User Story 2 - Categories Removed from Home (Priority: P2)

A visitor arriving at the home page no longer sees a separate category list section. Categories are exclusively accessible via the hamburger menu.

**Why this priority**: Required for CA01 — the home page must be cleaned up as part of this migration.

**Independent Test**: Load the home page, verify no standalone category list is visible, confirm categories still accessible via hamburger menu.

**Acceptance Scenarios**:

1. **Given** a visitor loads the home page, **When** the page renders, **Then** no standalone category listing section appears in the main content area.
2. **Given** the hamburger menu is closed, **When** the visitor views the home page, **Then** all category navigation is accessible only through the hamburger menu.

---

### User Story 3 - Social Icons on Right, Search and Hamburger on Left (Priority: P3)

A visitor sees a reorganized header: hamburger icon and search field on the left, social network icons on the right.

**Why this priority**: Visual reorganization required by CA02 and CA03 — supports the new navigation model.

**Independent Test**: Load any page, verify header layout matches specification: hamburger + search on left, social icons on right.

**Acceptance Scenarios**:

1. **Given** a visitor loads any page on desktop, **When** the header renders, **Then** the hamburger icon and an open search field appear on the left side, and social network icons appear on the right side.
2. **Given** a visitor loads any page on mobile, **When** the header renders, **Then** the hamburger icon appears on the left and the search field is hidden/collapsed, social icons remain on the right.
3. **Given** a visitor on mobile taps the search area, **When** they interact with it, **Then** the search field expands or becomes accessible.

---

### Edge Cases

- What happens when there are no categories defined? The sidebar should show a fallback empty state message.
- How does the sidebar behave if the page is scrolled? The sidebar must overlay content and remain accessible regardless of scroll position.
- What happens when the hamburger menu is open and the user resizes from mobile to desktop? The sidebar and search field must adapt gracefully.
- How does the sidebar close on mobile where clicking outside may be ambiguous with scroll gestures? A visible close button must always be present.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a hamburger icon on the left side of the header on all pages.
- **FR-002**: System MUST display an open (visible) search field to the right of the hamburger icon on desktop viewports.
- **FR-003**: System MUST hide or collapse the search field on mobile viewports, with a mechanism to expand it.
- **FR-004**: System MUST display all social network icons on the right side of the header.
- **FR-005**: System MUST remove the standalone category list from the home page.
- **FR-006**: System MUST open a left-side vertical sidebar when the hamburger icon is clicked, displaying all blog categories.
- **FR-007**: The sidebar MUST overlay the page content (not push it) and appear above all other content.
- **FR-008**: The sidebar MUST be closable by: (a) clicking/tapping a dedicated close control, (b) clicking/tapping the semi-transparent backdrop that covers the rest of the page behind the sidebar, or (c) pressing the Escape key.
- **FR-009**: Clicking a category in the sidebar MUST navigate to that category and close the sidebar.
- **FR-010**: The sidebar and header layout MUST follow the design guidelines defined in `DESIGN.md` (tonal surfaces, no solid 1px borders, Newsreader/Manrope typography, glassmorphism for navigation elements, bordeaux/beige palette).
- **FR-011**: When the sidebar is open, a semi-transparent backdrop MUST cover the page content behind the sidebar; clicking/tapping the backdrop MUST close the sidebar.
- **FR-012**: The sidebar MUST slide in from the left edge on open and slide out to the left on close, using a CSS transition of no more than 300ms.
- **FR-013**: The sidebar width MUST be 320px on desktop viewports; on mobile viewports it MUST be 85% of the viewport width with a maximum cap of 400px.
- **FR-014**: The system MUST support a category display-name mapping file that translates category slugs (as used in posts) into human-readable names shown in the sidebar and throughout the site.

### Key Entities

- **Category**: A blog grouping with a slug (used in posts) and a human-readable display name (resolved via the category mapping file); displayed as a navigable list item in the sidebar.
- **Category Mapping**: A configuration file that maps each category slug to its display name (e.g., `sobremesas` → `Sobremesas`, `receitas` → `Recetas`).
- **Hamburger Menu Sidebar**: An overlay panel that appears from the left edge, contains the category list, and supports open/close state.
- **Header**: The site-wide top bar containing hamburger icon, search field, site title/logo, and social icons.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All blog categories previously accessible on the home page are accessible via the hamburger sidebar menu, displayed with their human-readable names (not raw slugs).
- **SC-002**: The home page renders with no standalone category list visible.
- **SC-003**: The sidebar opens and closes in under 300ms (animation included) on standard devices.
- **SC-004**: The header correctly displays hamburger icon and search on the left, social icons on the right, across all breakpoints.
- **SC-005**: On mobile, the search field is not visible by default and requires explicit user action to reveal.
- **SC-006**: The sidebar visually conforms to the editorial design system: tonal surfaces, no solid divider lines, correct typography (Newsreader/Manrope), and bordeaux/beige palette.

## Clarifications

### Session 2026-05-10

- Q: When the sidebar opens, should a semi-transparent backdrop appear behind it? → A: Yes — backdrop covers page content; clicking it closes the sidebar.
- Q: Should the sidebar animate when opening/closing? → A: Slide-in from left on open, slide-out on close; CSS transition ≤300ms.
- Q: What width should the sidebar have? → A: 320px on desktop; 85% viewport width on mobile with max-width 400px.
- Note: Category slugs used in posts must be translated to human-readable display names via a dedicated mapping file; sidebar must render display names, not raw slugs.

## Assumptions

- The site already has a defined list of categories used by Jekyll's category system; this feature consumes that existing data.
- "Social network icons" refers to the existing social links already present in the header — only their position changes.
- "Desktop" breakpoint is defined by the existing SCSS breakpoints already in use in the project.
- The sidebar does not need sub-categories or nested navigation in this iteration.
- The search field wired in the header is the existing search functionality already present; only its position and responsive behavior change.
- Glassmorphism effect on the sidebar (as per DESIGN.md) uses `backdrop-filter: blur` with semi-transparent `surface-container` background.
