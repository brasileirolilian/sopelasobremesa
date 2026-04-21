# Research: apply-stitch-design

## 1. Jekyll SCSS Integration with Stitch Tokens
**Decision**: Use Jekyll's built-in SASS processor to map Stitch Design Tokens (`primary`, `surface`, etc.) to SCSS variables.
**Rationale**: Jekyll supports SCSS out of the box in `assets/css/`. Mapping variables will make it easy to maintain the "No-Line" rule and the Tonal Layering without requiring external build tools like Webpack.
**Alternatives considered**: Using CSS Custom Properties directly. Rejected as primary method because SCSS allows for mixins needed for the Glassmorphism blur, Ghost borders, and backwards compatibility, although CSS custom properties may still be used alongside SCSS.

## 2. Implementing "No-Line" Rule and "Tonal Layering"
**Decision**: Global CSS reset to remove `border` from inputs, `<hr>`, and standard cards. Use generous `padding` and `background-color` transitions to define spatial hierarchy.
**Rationale**: Complies strictly with the "Strict Mandate" in `DESIGN.md`. 
**Alternatives considered**: Manually removing borders per component. Rejected as it is error-prone and could lead to inconsistencies.

## 3. Font Integration (Newsreader and Manrope)
**Decision**: Import via Google Fonts directly in the `<head>` of the `default.html` layout.
**Rationale**: High availability, easy implementation, and reliable caching.
**Alternatives considered**: Self-hosting fonts. Rejected as an initial step due to complexity vs benefit; will revisit if Lighthouse performance drops below 90.
