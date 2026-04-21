# Feature Specification: apply-stitch-design

**Feature Branch**: `002-apply-stitch-design`  
**Created**: 2026-04-21
**Status**: Draft  
**Input**: User description: "Aplicar los estilo y el DESIGN.md del proyecto de Stitch Sobremesa Modern Evolution (ID: 13626381258901127561)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Implementación del Design System Base (Priority: P1)

Como visitante del blog, quiero ver una paleta de colores, tipografía y estructura visual consistentes para disfrutar de una experiencia de lectura premium similar a una revista física de lujo.

**Why this priority**: Es el pilar fundamental que da soporte a todos los demás componentes visuales. Establece el diseño fundamental dictado por el sistema de Stitch.

**Independent Test**: Can be fully tested by loading any page on the site and verifying that the correct background colors, text colors, fonts (Newsreader and Manrope), and the absence of solid borders ("No-Line" rule) are applied correctly.

**Acceptance Scenarios**:

1. **Given** que el usuario accede a la página de inicio, **When** la página carga, **Then** el fondo debe ser color `surface` (bege) y los textos principales deben usar la fuente Manrope.
2. **Given** que el usuario visualiza un encabezado, **When** lee el título, **Then** debe estar renderizado con la fuente Newsreader.
3. **Given** un componente interactivo como un botón primario, **When** el usuario lo observa, **Then** no debe tener bordes, tener un fondo primario (bordó) y aplicar un sutil gradiente o brillo interno según el sistema de diseño.

---

### User Story 2 - Renovación Visual del Blog Feed y Cards (Priority: P2)

Como lector de reseñas gastronómicas, quiero que la lista de publicaciones se vea como un mosaico curado, con uso amplio del espacio y jerarquía tonal sin usar líneas divisorias explícitas.

**Why this priority**: Asegura que el contenido principal (los artículos) se presente según el estilo "Editorial de Alto Padrão".

**Independent Test**: Can be fully tested by viewing the list of posts and checking spacing, image radius, and surface container usage without any line dividers.

**Acceptance Scenarios**:

1. **Given** la lista de artículos, **When** el usuario hace scroll, **Then** la separación entre publicaciones debe basarse en un padding generoso (ej. 64px a 120px) o cambios sutiles de fondo en lugar de líneas.
2. **Given** la imagen destacada de una publicación, **When** el usuario la observa, **Then** debe mostrar bordes curvos tipo `md` y superposiciones asimétricas de forma intencional.

---

### User Story 3 - Componentes Interactivos y 'Nota del Crítico' (Priority: P3)

Como lector inmerso en una reseña, quiero encontrar elementos de interfaz que respondan sutilmente y destaquen de forma orgánica para una interacción fluida.

**Why this priority**: Añade los detalles premium finales completando el sistema de diseño (sombras de ambiente, "Ghost Borders").

**Independent Test**: Can be fully tested by interacting with input fields (focus state ghost border) or viewing a specific "Nota del Crítico" block.

**Acceptance Scenarios**:

1. **Given** un campo de entrada (input), **When** el usuario hace click o lo enfoca, **Then** el fondo debe ser más claro y aparecer una "borda fantasma" (outline sutil al 20%).
2. **Given** un bloque de contenido especial de "Nota del Crítico", **When** el usuario lo lee, **Then** debe mostrar texto en Manrope y solo una línea decorativa lateral del color secundario (teal).

### Edge Cases

- What happens when a legacy blog post contains embedded inline styles or `<hr>` tags? El sistema debe sobreescribir estos estilos globalmente para ocultar líneas sólidas y aplicar el espaciado correcto en su lugar.
- How does system handle views with very little content? El color `surface` de fondo debe cubrir el viewport completo manteniéndose armónico.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-000**: System MUST extraer dinámicamente los valores actualizados de los tokens desde el proyecto Stitch (ID: 13626381258901127561) usando la herramienta MCP antes de transcribir las variables SCSS.
- **FR-001**: System MUST aplicar tipografías globales: Newsreader para encabezados y estilos display, y Manrope para cuerpo de texto y etiquetas.
- **FR-002**: System MUST reemplazar los bordes de línea sólida (1px) de todo el layout y las separaciones entre secciones por transiciones de colores de fondo o márgenes/paddings amplios.
- **FR-003**: System MUST implementar todos los design tokens de color definidos en la especificación de Sobremesa Modern Evolution (fondos, colores primarios, secundarios y opacidades asociadas).
- **FR-004**: System MUST usar elevaciones y "Sombras Ambientes" para definir superposiciones de capas en vez de sombras oscuras predeterminadas.
- **FR-005**: System MUST proveer el estilo visual predefinido para la "Nota del Crítico" (con una línea de margen izquierdo).

### Key Entities

- **Design System Tokens**: La representación en la vista de la paleta de colores, escalas tipográficas y espaciados de Stitch.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de los elementos de separación en las vistas principales deben cumplir con la regla "No-Line", usando espaciados o transiciones de fondo en lugar de bordes.
- **SC-002**: 100% de las nuevas vistas o componentes cargan exitosamente las fuentes predeterminadas desde Google Fonts u origen local sin mostrar fallbacks por defecto de navegador.
- **SC-003**: Mantener la puntuación de Lighthouse para el Performance por encima de 90 al cargar los nuevos estilos.

## Assumptions

- El contenido existente del blog en Markdown no necesita modificación manual sustancial, y las clases CSS o estilos se pueden aplicar mediante layouts y el diseño de la plantilla general.
- Se tiene acceso a importar tipografías externas o las mismas se incluirán de manera estática.
- Las vistas actuales (Página de Inicio, Post, Categorías) proveen los elementos estructurales (headers, footers, mains) necesarios para anclar las variables de estilo solicitadas.
