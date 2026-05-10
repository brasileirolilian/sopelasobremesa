# Research: Standardize Post List

**Phase**: 0 | **Date**: 2026-05-10

## 1. jekyll-archives Configuration

**Decision**: Use `jekyll-archives` with `categories` type and permalink `/categoria/:name/`.

**Rationale**: The plugin generates one static HTML page per category automatically during `jekyll build`. No JavaScript needed. Pages are fully indexable by search engines. The permalink pattern matches the Portuguese naming convention already used in the site (`artigos/`, not `articles/`).

**Config block** for `_config.yml`:
```yaml
jekyll-archives:
  enabled:
    - categories
  layouts:
    category: category
  permalinks:
    category: /categoria/:name/
```

**Gemfile entry**:
```ruby
gem "jekyll-archives"
```

**Variables available in `category` layout** (provided by the plugin):
- `page.title` → category slug (e.g., `"sobremesas"`)
- `page.type` → `"category"`
- `page.posts` → array of posts in this category

**Slug behavior**: `jekyll-archives` slugifies the category value from the post front matter. Since posts use lowercase hyphenated values (e.g., `"bolos-e-tortas"`), the generated URL will be `/categoria/bolos-e-tortas/`. This matches the slugs in `_data/categories.yml`.

**Alternatives considered**:
- Custom category pages (manual `_pages/*.md` per category) → rejected: requires manual maintenance as categories grow.
- Current hash-based `categorias.html` → rejected: not indexable, depends on JS, violates SEO principle.

---

## 2. Reading Time in Liquid

**Decision**: Implement reading time as a reusable Liquid include (`_includes/reading-time.html`) using `number_of_words` filter at 200 words/min, minimum 1 min.

**Rationale**: Jekyll has `number_of_words` built-in. No Ruby plugin needed. A shared include avoids code duplication across `home.html`, `artigos/index.html`, and `category.html`. Consistent with the project's "no external dependencies" principle.

**Implementation pattern**:
```liquid
{% assign words = post.content | number_of_words %}
{% assign reading_time = words | divided_by: 200 %}
{% if reading_time < 1 %}{% assign reading_time = 1 %}{% endif %}
{{ reading_time }} min de leitura
```

**Usage in post-meta**:
```liquid
<span class="post-meta">
  {{ post.date | date: "%d de %b, %Y" | upcase }}
  · {% include reading-time.html post=post %}
</span>
```

**Edge cases**:
- Posts with < 200 words → clamps to "1 min de leitura" via the `if` guard.
- `number_of_words` counts words in rendered HTML (after Markdown conversion) — includes any HTML tags. Acceptable for estimation purposes.

**Alternatives considered**:
- `jekyll-reading-time` gem → rejected: adds an external dependency; native Liquid solution is simpler and sufficient.
- Hardcoded reading time in front matter → rejected: requires manual maintenance per post.

---

## 3. Display Name Resolution in Category Layout

**Decision**: In `category.html`, resolve the display name from `_data/categories` using `page.title` (the slug provided by `jekyll-archives`) as the lookup key.

**Rationale**: `_data/categories.yml` already maps slugs to display names. Reusing this lookup keeps a single source of truth.

**Lookup pattern**:
```liquid
{% assign cat_data = site.data.categories | where: "slug", page.title | first %}
{% assign display_name = cat_data.display_name | default: page.title %}
```

**Note**: `jekyll-archives` sets `page.title` to the raw category value from the post front matter (e.g., `"sobremesas"`). Since `_data/categories.yml` uses the same lowercase slugs, the lookup will match correctly.

---

## 4. Unified post-card HTML Structure

**Decision**: Canonical `post-card` structure (from `categorias.html`, already the most complete) is:

```html
<article class="post-card group">
  <div class="post-cover-wrapper">
    <a href="{{ post.url | relative_url }}">
      <img src="{{ post.image | relative_url }}" class="post-cover" alt="{{ post.title }}">
    </a>
  </div>
  <div class="post-card-content">
    <span class="post-meta">
      {{ post.date | date: "%d de %b, %Y" | upcase }}
      · {% include reading-time.html post=post %}
    </span>
    <h3 class="post-title">
      <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </h3>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
  </div>
</article>
```

**Gap analysis**:
| Location | Missing elements |
|----------|-----------------|
| `home.html` mosaic cards | excerpt, reading time |
| `artigos/index.html` | reading time |
| `category.html` | entire post-card structure (uses `post-list` / `<ul><li>`) |

**All three need updating** to match this canonical structure.
