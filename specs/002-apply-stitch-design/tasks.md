# Implementation Tasks: apply-stitch-design

**Feature Branch**: `002-apply-stitch-design`
**Created**: 2026-04-21
**Spec**: [specs/002-apply-stitch-design/spec.md](./spec.md)

## Phase 1: Setup
**Goal**: Sincronizar el diseño desde Stitch, inicializar archivos de SASS base e importar tipografías.
- [x] T001 Extraer el diseño del proyecto Stitch (ID: 13626381258901127561) mediante la herramienta `mcp_StitchMCP_get_project` y validar la estructura del JSON.
- [x] T002 [P] Poblar los tokens de diseño en `assets/css/_variables.scss` extrayendo los colores y parámetros exactos del JSON retornado por la API.
- [x] T003 Actualizar `_layouts/default.html` para incluir los enlaces a Google Fonts para "Newsreader" y "Manrope".

## Phase 2: Foundational
**Goal**: Establecer el CSS reset global para aplicar la regla "No-Line" y los tokens fundamentales de Tonal Layering.
- [x] T004 Definir en `assets/css/_variables.scss` los colores extraídos (`$color-primary`, `$color-surface`, `$color-surface-container-lowest`, etc.).
- [x] T005 Definir en `assets/css/_variables.scss` las tipografías: `$font-display` y `$font-body`.
- [x] T006 [P] Crear mixins en `assets/css/_components.scss` (o variables) para elevaciones (`$shadow-ambient`) y blur (`$glass-blur`).
- [x] T007 Aplicar un reset global en `assets/css/main.scss` para ocultar líneas `<hr>` y `border: 1px solid` nativos en el sitio.

## Phase 3: User Story 1 - Implementación del Design System Base (P1)
**Goal**: Aplicar fondo `surface` beige general, textos base en Manrope y titulares en Newsreader.
**Independent Test**: La página de inicio y las subpáginas tienen fondo beige, los headers usan Newsreader y el texto regular Manrope, sin desvíos de la paleta.
- [x] T008 [US1] Actualizar body y contenedores principales en `assets/css/style.scss` para usar el color `$color-surface` y texto `$font-body`.
- [x] T009 [US1] Aplicar estilos tipográficos a tags H1-H6 en `assets/css/style.scss` usando `$font-display`.
- [x] T010 [US1] Modificar estilos de botones primarios en `assets/css/_components.scss` para no tener bordes, usar `$color-primary` y aplicar gradiente/brillo interno.

## Phase 4: User Story 2 - Renovación Visual del Blog Feed y Cards (P2)
**Goal**: Espaciar artículos usando padding en lugar de líneas, aplicar radio de borde a imágenes.
**Independent Test**: El feed del blog muestra separación amplia entre posts (64px+) o sutiles cambios tonales en el fondo sin `hr`, y las fotos tienen bordes redondeados.
- [x] T011 [US2] Modificar `_layouts/home.html` (o los includes del blog) para asegurar que la lista usa clases para padding generoso en lugar de divisores de borde.
- [x] T012 [US2] Actualizar estilos de la lista de posts en `assets/css/_components.scss` para añadir los márgenes (64px-120px) correspondientes entre artículos.
- [x] T013 [P] [US2] Aplicar `border-radius: md` (ej. 8px) a las imágenes dentro de los posts en `assets/css/style.scss` o `_components.scss`.

## Phase 5: User Story 3 - Componentes Interactivos y 'Nota del Crítico' (P3)
**Goal**: Detalles interactivos de inputs y componente de Nota del Crítico.
**Independent Test**: Input fields muestran una borda fantasma sutil al hacer focus, y el bloque destaca orgánicamente con borde secundario.
- [x] T014 [P] [US3] Agregar estilos a inputs (textareas, form fields) en `assets/css/_components.scss` para usar ghost border en focus.
- [x] T015 [US3] Implementar los estilos para la clase `.nota-critico` en `assets/css/_components.scss` con fondo `surface-variant` y borde izquierdo `secondary`.
- [x] T016 [P] [US3] Crear o verificar `_includes/nota_critico.html` actualizando un archivo markdown de ejemplo si se precisa.

## Phase 6: Polish & Cross-Cutting Concerns
**Goal**: Limpieza final, compatibilidad responsiva y verificación de la accesibilidad.
- [x] T017 Revisar `_layouts/post.html` para asegurar que el contenido markdown renderizado se ajusta responsivamente al nuevo diseño.
- [x] T018 Verificar contrastes y asegurarse de que ningún archivo `.md` de posts haya sido destruido.

## Dependencies
- Phase 1 y 2 (Setup y Foundational) son prerrequisitos bloqueantes para todas las historias de usuario.
- US1 (Phase 3) debe ser completada antes de US2 y US3.

## Parallel Execution
- T002 y T003 pueden ejecutarse en paralelo (SCSS y HTML header) una vez completada la T001.
- T013 puede ejecutarse de manera independiente dentro de US2.
- T014 y T016 pueden ejecutarse simultáneamente en US3.

## Implementation Strategy
Comenzar por extraer explícitamente los datos con la API en T001, para asegurar total paridad con el proyecto de Stitch.
