# Research: Hamburger Menu for Blog Categories

**Date**: 2026-05-10

## Decision 1: Category Translation Mechanism

- **Decision**: `_data/categories.yml` — flat list `[{ slug, display_name }]`, user-specified
- **Rationale**: Native Jekyll `_data` system; zero plugins; Liquid `where` filter handles lookup; graceful fallback if slug missing
- **Alternatives considered**: Inline mapping in `_config.yml` — rejected (mixes config with content data); front matter on category pages — rejected (requires separate category page per slug)

## Decision 2: Sidebar State Management

- **Decision**: CSS class `.is-open` toggled on sidebar + backdrop elements via vanilla JS; `body.sidebar-open` locks scroll
- **Rationale**: No build toolchain for JS on this static site; class-toggle is idiomatic and zero-dependency
- **Alternatives considered**: CSS `:target` pseudo-class (no JS) — rejected: does not support ESC key or backdrop-click close without JS anyway; `<details>` element — rejected: no backdrop, no animation control

## Decision 3: Animation

- **Decision**: `transform: translateX(-100%)` → `translateX(0)`, `transition: 0.25s ease`
- **Rationale**: GPU-composited transform; no layout reflow; well within 300ms budget
- **Alternatives considered**: `left: -320px` → `left: 0` — rejected: triggers layout reflow on each frame

## Decision 4: Z-index Layering

- **Decision**: Sidebar `z-index: 200`, backdrop `z-index: 199` (header is `z-index: 100`)
- **Rationale**: Sidebar and backdrop must render above the fixed header; values leave room for future modals above sidebar if needed

## Decision 5: Mobile Width

- **Decision**: `width: min(85vw, 400px)` — single CSS declaration
- **Rationale**: `min()` function handles percentage + max-cap without a media query; supported in all modern browsers
