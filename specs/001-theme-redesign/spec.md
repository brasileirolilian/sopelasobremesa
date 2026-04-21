# Feature Specification: Theme Redesign

**Feature Branch**: `feat/migrate-blog`  
**Created**: 2026-04-20  
**Status**: Draft  
**Input**: User description: "Migración a Jekyll y rediseño del blog de gastronomía..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Home Page Content Discovery (Priority: P1)
As a reader, I want to see a list of the most recent articles on the home page with their featured image, title, and excerpt so that I can easily discover new content.
**Why this priority**: Discoverability is the core function of a blog.
**Independent Test**: Can be fully tested by verifying the home page displays the latest posts correctly.
**Acceptance Scenarios**:
1. **Given** the blog has published posts, **When** I visit the home page, **Then** I see the most recent articles with images, titles, and excerpts.

### User Story 2 - Author Identity (Priority: P2)
As a reader, I want to see a presentation block for Lílian Brasileiro on the home page so that I can understand her background and passion for gastronomy.
**Why this priority**: Establishes trust and personal connection with the audience.
**Independent Test**: Verify the author block appears on the home page with the correct text.
**Acceptance Scenarios**:
1. **Given** I am on the home page, **When** I look at the author section, **Then** I see Lílian's description as an editorial producer and passionate foodaholic.

### User Story 3 - Search Functionality (Priority: P2)
As a reader, I want to search for specific topics using a minimal search input so that I can quickly find relevant articles in real-time.
**Why this priority**: Helps users find specific content efficiently.
**Independent Test**: Use the search bar to find an existing post.
**Acceptance Scenarios**:
1. **Given** I am on the search page, **When** I type in the search input (highlighted in Bordó), **Then** results appear in real-time maintaining the home page's visual hierarchy.

### User Story 4 - Category Navigation (Priority: P3)
As a reader, I want to browse posts by category via an intuitive navigation (like a tag cloud or sidebar menu) so that I can explore specific culinary topics.
**Why this priority**: Organizes content logically for deeper exploration.
**Independent Test**: Navigate to a category page and verify posts are grouped correctly.
**Acceptance Scenarios**:
1. **Given** I am browsing the site, **When** I click on a category, **Then** I see an elegant header with a Beige background and Bordó title, followed by related posts.

### Edge Cases
- What happens when a search query returns no results?
- How does the layout handle posts without a featured image?
- What happens if a category has no posts assigned?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST display recent articles on the Home Page (image, title, excerpt).
- **FR-002**: System MUST include a static author presentation block on the Home Page.
- **FR-003**: System MUST generate necessary SEO tags (meta tags, Open Graph, Twitter Cards, schema.org) in the `<head>` of each layout.
- **FR-004**: System MUST provide a static search solution that updates results in real-time.
- **FR-005**: System MUST group posts by taxonomy on dynamic category pages.
- **FR-006**: System MUST use Bordó (#881846) for the search input focus and category titles.
- **FR-007**: System MUST use Beige (#fdf0d8) for category page headers and soft accents.
- **FR-008**: System MUST integrate the official logo in the header.

### Key Entities
- **Post**: Represents a blog article containing content, title, excerpt, featured image, and taxonomy tags/categories.
- **Category/Taxonomy**: Grouping mechanism for posts.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: SEO score is 95+ on all main pages (Home, Category, Post).
- **SC-002**: Search results display within 500ms of typing.
- **SC-003**: 100% of layouts include valid canonical URLs and Open Graph tags.
- **SC-004**: Visual contrast for text over Beige and Bordó backgrounds passes WCAG AA standards.

## Assumptions
- The existing Markdown files contain proper frontmatter (categories, tags, image paths) to support the new features.
- A static search JSON index can be generated.
- The logo URL provided will remain active and stable.
