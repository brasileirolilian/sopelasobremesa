<!-- 
Sync Impact Report:
- Version change: 0.0.0 -> 1.0.0
- List of modified principles:
  - PRINCIPLE_1_NAME -> Stack Tecnológico y Rendimiento
  - PRINCIPLE_2_NAME -> SEO First
  - PRINCIPLE_3_NAME -> Accesibilidad (a11y)
  - PRINCIPLE_4_NAME -> Diseño
  - PRINCIPLE_5_NAME -> Restricción de Contenido
- Added sections: Estándares de Arquitectura, Flujo de Trabajo y Validación
- Removed sections: None
- Templates requiring updates (⚠ pending):
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
- Follow-up TODOs: Update dependent templates to align with new principles.
-->
# Só vim pela sobremesa Constitution

## Core Principles

### I. Stack Tecnológico y Rendimiento
Jekyll, HTML5 semántico y CSS moderno (variables CSS, Flexbox/Grid). No utilizar frameworks CSS pesados (como Bootstrap) a menos que se especifique; priorizar código a medida y ligero para un rendimiento óptimo.

### II. SEO First
Todas las vistas deben estar optimizadas para motores de búsqueda, incluyendo meta tags, Open Graph, Twitter Cards y marcado schema.org.

### III. Accesibilidad (a11y)
Usar etiquetas ARIA donde sea necesario y asegurar un buen contraste de colores.

### IV. Diseño
La paleta de colores base es inamovible. Bordó (#881846) y Beige (#fdf0d8). Cualquier color adicional (textos, sombras, bordes) debe derivarse o tener una armonía estricta con estos dos.

### V. Restricción de Contenido
Prohibición: No modificar ni eliminar los archivos markdown existentes de los posts. El trabajo se limita a la capa de presentación (layouts, includes, sass/css y configuración).

## Estándares de Arquitectura

El tema debe construirse de manera semántica y modular, permitiendo un mantenimiento sencillo a largo plazo. Los estilos deben estar lógicamente divididos usando la estructura SASS de Jekyll sin añadir dependencias excesivas.

## Flujo de Trabajo y Validación

Cualquier adición visual o de marcado debe ser verificada para asegurar que no degrade el rendimiento (Lighthouse score alto) y no introduzca regresiones en los lineamientos de SEO y accesibilidad dictados.

## Governance

Cualquier desvío de la paleta de colores requerida o la introducción de dependencias externas (JS o CSS extra) debe contar con una justificación explícita. El enfoque fundamental es conservar el contenido actual intacto.

**Version**: 1.0.0 | **Ratified**: 2026-04-20 | **Last Amended**: 2026-04-20
