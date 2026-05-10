# Project Context: Só Pela Sobremesa
Este es el repositorio de "Só Pela Sobremesa", un blog gastronómico y de estilo de vida centrado en postres. El sitio es estático, generado mediante **Jekyll**.

# General AI Instructions
- Siempre responde en español, manteniendo un tono amigable.
- Commit messages siempre en inglés, siguiendo el estándar de **Conventional Commits** (`feat:`, `style:`, `perf:`, `chore:`, etc.).
- Para ramas (branches), utiliza la convención `tipo/nombre-de-la-rama` (ej. `feat/nuevo-post`, `style/grid-css`).

# Tech Stack & Architecture
- **Framework:** Jekyll
- **Estilos:** SCSS (alojados en `assets/css/`). Evita sugerir frameworks CSS externos como Tailwind o Bootstrap; mantén el código SCSS modular.
- **Rendimiento:** Prioridad alta en SEO y performance.
- **Flujo de Imágenes:** Las imágenes crudas (PNG, JPG) deben depositarse en `assets/images/`. NUNCA se referencian directamente en el código. Siempre se debe ejecutar `scripts/convert_to_webp.sh` y referenciar la salida `.webp` alojada en `assets/img/`.

<!-- SPECKIT START -->
## Active Feature Plan

**Branch**: `004-homologar-posts-list`  
**Plan**: [specs/004-homologar-posts-list/plan.md](specs/004-homologar-posts-list/plan.md)  
**Spec**: [specs/004-homologar-posts-list/spec.md](specs/004-homologar-posts-list/spec.md)
<!-- SPECKIT END -->
