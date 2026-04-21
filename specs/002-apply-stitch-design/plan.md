# Implementation Plan: apply-stitch-design

**Branch**: `002-apply-stitch-design` | **Date**: 2026-04-21 | **Spec**: [specs/002-apply-stitch-design/spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-apply-stitch-design/spec.md`

## Summary

Implementar la capa de presentación (estilos, paleta de colores, tipografía) de "Sobremesa Modern Evolution" sobre el tema actual de Jekyll. El proceso iniciará sincronizando dinámicamente el `designTheme` más reciente desde Stitch a través de su integración MCP, para luego mapearlo usando tokens SCSS y removiendo todos los divisores de línea sólida.

## Technical Context

**Language/Version**: HTML, CSS, SCSS, Markdown
**Primary Dependencies**: Jekyll, Google Fonts (Newsreader, Manrope)
**Storage**: N/A  
**Testing**: Pruebas visuales manuales en el navegador  
**Target Platform**: Web browsers (Mobile, Tablet, Desktop)
**Project Type**: Jekyll Blog Theme
**Performance Goals**: Lighthouse Performance > 90  
**Constraints**: Mantener el contenido de los posts `.md` intacto; usar variables SASS modulares.
**Scale/Scope**: Todas las vistas actuales del blog (Home, Post, Categories).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **SEO First**: Las actualizaciones de CSS no afectan los meta tags. Aprobado.
- **Accesibilidad**: Uso estricto del alto contraste provisto por el Stitch Design System (Beige #fff9ec y Bordó #63042c). Aprobado.
- **Diseño**: Adaptación a los colores evolucionados (#63042c en lugar de #881846 original) manteniendo la armonía dictada. Aprobado.
- **Restricción de Contenido**: Ningún archivo markdown de posts será alterado. Aprobado.

## Project Structure

### Documentation (this feature)

```text
specs/002-apply-stitch-design/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
assets/
└── css/
    ├── _components.scss
    ├── _variables.scss
    └── style.scss

_layouts/
├── default.html
├── post.html
└── home.html
```

**Structure Decision**: El proyecto es un blog clásico en Jekyll. Se crearán o modificarán archivos parciales de SCSS dentro de `assets/css/` para mapear los tokens del diseño, y se actualizarán los layouts en `_layouts/` y componentes en `_includes/` para adherir a la regla "No-Line".

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Evolución del color Bordó a #63042c | Requisito directo del diseño del proyecto Stitch Modern Evolution. | El color original #881846 no cumple con la nueva estética aprobada en DESIGN.md. |
