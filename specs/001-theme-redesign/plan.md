# Implementation Plan: Theme Redesign

**Branch**: `feat/migrate-blog` | **Date**: 2026-04-20 | **Spec**: [spec.md](./spec.md)

## Summary
Migración a Jekyll y rediseño del blog de gastronomía "Só pela sobremesa", implementando una estructura visual moderna y seria, optimización SEO avanzada y componentes como búsqueda estática y archivo de categorías.

## Plan de Implementación Paso a Paso

1. **Configuración Inicial (`_config.yml`)**
   - Actualizar los metadatos globales (`title`, `description`, `url`, `author`).
   - Integrar el plugin `jekyll-seo-tag` en la sección de `plugins`.
   - Integrar el plugin `jekyll-paginate` (si se usa paginación tradicional) y definir `paginate` y `paginate_path`.
   - Definir variables globales como URLs del logo (Bordó y Beige base) y redes sociales.

2. **Arquitectura de Carpetas y Archivos Base**
   - **`_layouts/`**: `default.html` (layout base con `<head>`, `header`, `footer`), `home.html` (para el listado principal), `post.html` (para los artículos), `category.html` (para el archivo dinámico).
   - **`_includes/`**: `head.html` (SEO y assets), `header.html` (navegación y logo), `footer.html`, `author.html` (sección de Lílian), `search.html` (input de búsqueda).
   - **`assets/css/`**: `main.scss` (importador principal), `_variables.scss` (colores Bordó y Beige, tipografías), `_layout.scss`, `_components.scss`.
   - **`assets/js/`**: `search.js` (lógica de Simple-Jekyll-Search).

3. **Estrategia CSS y Diseño Visual**
   - **Variables**: Definir `$color-bordo: #881846;` para CTAs, títulos, y estado `focus` de inputs. Definir `$color-beige: #fdf0d8;` para fondos, encabezados de categorías y acentos visuales suaves.
   - **Tipografía**: Importar fuentes de Google Fonts (una serifa elegante para los artículos largos y una sans-serif moderna para UI/navegación).
   - **Arquitectura SASS**: Utilizar CSS Grid y Flexbox en `_layout.scss` para lograr la estructura limpia requerida, sin recurrir a frameworks pesados.

4. **Desarrollo de Layouts (Orden de Creación)**
   - **Paso 1**: `default.html` (Establece el shell HTML y las inclusiones base).
   - **Paso 2**: `home.html` (Lista iterando sobre `site.posts`, e incluye `author.html`).
   - **Paso 3**: `post.html` (Contenido de los posts con sus metadatos y etiquetas SEO).

5. **Estructura de la Sección de la Autora**
   - El código de presentación ("foodaholic" apasionada, Producción Editorial) vivirá en `_includes/author.html`.
   - Este componente será incluido en `_layouts/home.html` (arriba o abajo del listado de artículos) usando la etiqueta de Liquid `{% include author.html %}`.

## Evolución Técnica: Búsqueda y Categorías

1. **Generación de Índice (`search.json`)**
   - Crear archivo `search.json` en la raíz.
   - Iterar sobre `site.posts` para construir un arreglo JSON con `title`, `url`, `categories` y `excerpt` (escapando caracteres especiales).

2. **Script de Búsqueda (`assets/js/search.js`)**
   - Integrar la lógica necesaria en `assets/js/search.js` para inicializar el contenedor de resultados escuchando al `search.json` (usando una solución como Simple-Jekyll-Search).

3. **Layout de Archivo/Categorías (`_layouts/category.html`)**
   - Crear el archivo `_layouts/category.html`.
   - Utilizar el objeto `page.title` o `page.category_name` para iterar y filtrar `site.categories`.

4. **UI/UX Consistente**
   - Asegurar que los componentes de búsqueda (ej. input con borde Bordó en `focus`) y el listado de categorías (ej. header elegante con fondo Beige y título Bordó) hereden los estilos de tipografía y espaciado de la Home para mantener la seriedad del blog de gastronomía.
