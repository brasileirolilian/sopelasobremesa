# Data Model: Hamburger Menu for Blog Categories

**Date**: 2026-05-10

## `_data/categories.yml` — Category Mapping

Flat list consumed by `_includes/hamburger-menu.html` to translate Jekyll category slugs into display names.

```yaml
- slug: sobremesas
  display_name: Sobremesas
```

### Schema

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `slug` | string | yes | Must match `category[0] | slugify` from `site.categories`. Unique. |
| `display_name` | string | yes | Human-readable label. Shown in sidebar and any template rendering categories. |

### Fallback behavior

If a category slug from `site.categories` has no matching entry in `categories.yml`, the raw Jekyll category name (`category[0]`) is displayed. No build errors occur.

### Liquid lookup pattern

```liquid
{% assign cat_slug = category[0] | slugify %}
{% assign cat_data = site.data.categories | where: "slug", cat_slug | first %}
{% assign display_name = cat_data.display_name | default: category[0] %}
```

---

## Sidebar State — Runtime (JS-managed)

No persistent data. State is ephemeral CSS class presence.

| State | Elements with `.is-open` | `<body>` class | Effect |
|-------|--------------------------|----------------|--------|
| Closed | none | — | Sidebar off-screen; backdrop invisible; scroll free |
| Open | `#hamburger-sidebar`, `#sidebar-backdrop` | `.sidebar-open` | Sidebar on-screen; backdrop visible; body scroll locked |
