# Data Model: Standardize Post List

**Phase**: 1 | **Date**: 2026-05-10

## Entities

### Post Card (UI Component)

Shared visual unit rendered in all listing contexts.

| Attribute | Source | Format | Required |
|-----------|--------|--------|----------|
| Cover image | `post.image` | WebP, relative URL | No (conditional render) |
| Publication date | `post.date` | `"%d de %b, %Y" \| upcase` → "10 DE MAI, 2026" | Yes |
| Reading time | `post.content \| number_of_words / 200` | "N min de leitura", min 1 | Yes |
| Title | `post.title` | Plain text, escaped | Yes |
| Permalink | `post.url` | Relative URL | Yes |
| Excerpt | `post.excerpt \| strip_html \| truncatewords: 20` | Plain text | Yes |

**HTML class contract**:
- Wrapper: `article.post-card.group`
- Image wrapper: `div.post-cover-wrapper`
- Image: `img.post-cover`
- Content: `div.post-card-content`
- Meta: `span.post-meta`
- Title: `h3.post-title > a.post-link`
- Excerpt: `p.post-excerpt`

### Category Page

Statically generated page, one per category, produced by `jekyll-archives`.

| Attribute | Source | Notes |
|-----------|--------|-------|
| Slug | `page.title` | Lowercase, hyphenated; e.g., `"bolos-e-tortas"` |
| Display name | `site.data.categories \| where: "slug", page.title` | Falls back to `page.title` if not found |
| Posts | `page.posts` | Ordered by date descending (jekyll-archives default) |
| URL | `/categoria/:name/` | `:name` = slug |
| Layout | `category` | `_layouts/category.html` |

### Reading Time (Computed Value)

| Rule | Value |
|------|-------|
| Speed | 200 words/minute |
| Minimum | 1 min |
| Rounding | Integer division (floor) |
| Display | "N min de leitura" |

## File Change Map

| File | Action | Change Summary |
|------|--------|----------------|
| `Gemfile` | Modify | Add `gem "jekyll-archives"` to `:jekyll_plugins` group |
| `_config.yml` | Modify | Add `jekyll-archives` block; add `jekyll-archives` to `plugins` list |
| `_includes/reading-time.html` | Create | Liquid snippet: word count ÷ 200, min 1 |
| `_includes/hamburger-menu.html` | Modify | Category links: `/categorias.html#slug` → `/categoria/{{ cat_slug }}/` |
| `_layouts/category.html` | Modify | Replace `<ul class="post-list">` with `post-grid` + `post-card` structure |
| `_layouts/home.html` | Modify | Add `post-excerpt` and reading time to mosaic post cards |
| `artigos/index.html` | Modify | Add reading time to `post-meta` span |
| `categorias.html` | Delete | Replaced by `jekyll-archives` generated pages |

## Validation Rules

- `jekyll-archives` must be listed in both `Gemfile` AND `_config.yml plugins` for GitHub Pages / CI builds.
- `_includes/reading-time.html` must accept `post` as a passed variable (not assume `page`), so it works in loop contexts.
- Image block in `post-card` must remain conditional (`{% if post.image %}`) — older posts may lack images.
- `page.posts` (jekyll-archives) vs `site.categories[name]` — use `page.posts` in the `category` layout for compatibility.
