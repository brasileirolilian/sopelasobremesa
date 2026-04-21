# Implementation Tasks: Theme Redesign

**Branch**: `feat/migrate-blog` | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup & Configuration
**Goal**: Initialize the project structure and global settings.
**Independent Test**: Jekyll builds successfully with the new configuration.

- [X] T001 Update `_config.yml` with global metadata, `jekyll-seo-tag`, and `jekyll-paginate` settings.
- [X] T002 [P] Create SASS architecture main file `assets/css/main.scss`.
- [X] T003 [P] Define color variables (Bordó/Beige) and typography in `assets/css/_variables.scss`.
- [X] T004 [P] Create layout structure files `assets/css/_layout.scss` and `assets/css/_components.scss`.

## Phase 2: Foundational Layouts
**Goal**: Establish the base HTML shell used by all pages.
**Independent Test**: Pages using `default.html` render the header, footer, and SEO tags properly.

- [X] T005 Create `_includes/head.html` to output `jekyll-seo-tag` and include CSS/JS.
- [X] T006 [P] Create `_includes/header.html` integrating the official logo and main navigation.
- [X] T007 [P] Create `_includes/footer.html` with basic footer structure.
- [X] T008 Create `_layouts/default.html` to wrap the standard head, header, content, and footer.

## Phase 3: [US1] Home Page Content Discovery
**Goal**: Display recent articles on the home page.
**Independent Test**: Home page shows the latest posts with image, title, and excerpt.

- [X] T009 [P] [US1] Create `_layouts/post.html` to display individual article content and metadata.
- [X] T010 [US1] Create `_layouts/home.html` iterating over `site.posts` to list articles.

## Phase 4: [US2] Author Identity
**Goal**: Present the author (Lílian Brasileiro) on the home page.
**Independent Test**: Author block appears on the home page.

- [X] T011 [US2] Create `_includes/author.html` with Lílian's descriptive text.
- [X] T012 [US2] Inject `{% include author.html %}` into `_layouts/home.html`.

## Phase 5: [US3] Search Functionality
**Goal**: Implement real-time static search.
**Independent Test**: Searching a known topic instantly yields results.

- [X] T013 [P] [US3] Create `search.json` in the root to expose posts data for search.
- [X] T014 [P] [US3] Create `_includes/search.html` for the search input UI (highlighted in Bordó).
- [X] T015 [US3] Implement `assets/js/search.js` logic using Simple-Jekyll-Search to filter `search.json`.
- [X] T016 [US3] Integrate `_includes/search.html` into `_layouts/home.html` or `_includes/header.html`.

## Phase 6: [US4] Category Navigation
**Goal**: Group posts dynamically by taxonomy.
**Independent Test**: Clicking a category shows related posts with the Beige/Bordó header.

- [X] T017 [US4] Create `_layouts/category.html` to filter and display posts for a specific category.
- [X] T018 [US4] Apply styling in `assets/css/_components.scss` to give category headers a Beige background and Bordó title.

## Phase 7: Polish & Cross-Cutting Concerns
**Goal**: Ensure the theme meets all SEO, accessibility, and design standards.

- [X] T019 Verify WCAG AA contrast ratios for text over Bordó and Beige backgrounds in `assets/css/_variables.scss`.
- [X] T020 Run Lighthouse to validate 95+ SEO score on Home, Category, and Post layouts.

## Implementation Strategy
- Focus on US1 and the Foundational layouts first to establish a minimum viable blog.
- Proceed to US2, then tackle US3 and US4 incrementally.

## Dependencies & Parallel Execution
- **Setup** must be completed before any styling.
- **Foundational Layouts** must be completed before US1.
- **US1** is a prerequisite for US2, US3, and US4 (since they build upon the home page or post structure).
- T002, T003, and T004 can be executed in parallel.
- T013 and T014 can be executed in parallel.
