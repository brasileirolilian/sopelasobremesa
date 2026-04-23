---
name: author.create-post
description: Contexto y reglas para la creación, formateo y publicación de nuevos posts en el blog. Útil para asistir a la autora del blog en su proceso de escritura.
---

# Blog Post Creation Context

Este documento provee todo el contexto técnico necesario para asistir a la autora del blog en la creación de nuevos artículos. Como ella no tiene experiencia técnica profunda, el objetivo de esta skill es darte a ti (el agente de IA) el conocimiento de **cómo funciona el blog** para que puedas ayudarla, explicarle las cosas de forma sencilla y ejecutar los comandos técnicos por ella.

**Regla General:** Comunícate con ella siempre en español, de forma amigable y sin usar jerga técnica innecesaria. (Nota: Los mensajes de commit siempre deben ir en inglés).

## Creación del Post y Front Matter

Los posts del blog se escriben en Markdown y se guardan en el directorio `_posts/`, utilizando la convención de nombres: `YYYY-MM-DD-slug-del-post.md`.

Cada post requiere un bloque de configuración al principio llamado **Front Matter**. Debes estar preparado para explicarle de forma muy sencilla qué es esto (básicamente, los datos "invisibles" que organizan el post, como el título o la fecha).

**Front Matters existentes que puedes usar/explicar:**
- `title` (obligatorio): El título principal del post.
- `date` (obligatorio): La fecha de publicación (ej. `2026-04-23`).
- `categories` (obligatorio): Lista de categorías (ej. `sobremesas`, `dicas`, etc.).
- `tags` (opcional): Palabras clave del artículo (ej. `chocolate`, `receita`).
- `image` (opcional): La URL de la imagen principal que aparecerá como portada.
- `youtube_video` (opcional): A veces usado en ciertos layouts para destacar un vídeo.

*Ejemplo:*
```yaml
---
title: "Bolo de Chocolate"
date: 2026-04-23
categories: 
  - "sobremesas"
tags: 
  - "chocolate"
image: "/assets/img/2026/04/bolo-chocolate.webp"
---
```

## Imágenes

Cuando la autora quiera añadir una imagen, el proceso que debes gestionar en el repositorio es el siguiente:
- **Ubicación Original:** Las imágenes originales (PNG, JPG) deben guardarse en la ruta `assets/images/YYYY/MM/` (usando el año y mes actuales).
- **Formato WebP:** Una vez guardadas las imágenes originales, debes ejecutar el script `scripts/convert_to_webp.sh`. Este script automáticamente convertirá las imágenes y las guardará en la ruta final `assets/img/YYYY/MM/` en formato `.webp`.
- **Inserción en el texto:** En el archivo Markdown, la imagen se inserta usando la ruta generada (no la original) con la sintaxis estándar:
  `![Texto alternativo](/assets/img/YYYY/MM/nombre-imagen.webp)`

## Vídeos de YouTube

Para insertar un vídeo, la autora solo necesita proporcionar el link de YouTube.
El blog tiene un componente (`_includes/youtube.html`) preparado para esto.
- Extrae el ID del vídeo de la URL (ej. de `v=AbCdEfG` sacas `AbCdEfG`).
- Insértalo en el Markdown usando este código:
  `{% include youtube.html id="ID_DEL_VIDEO" %}`

## Branching

Todo nuevo post debe hacerse en su propia rama para no afectar el código principal directamente.
- **Convención de nombre:** `feat/slug-del-post` (ej. `feat/bolo-de-chocolate`).
- **Comando Git:** `git checkout -b feat/slug-del-post`

## Revisión (AI-Assisted)

Antes de hacer el commit, tú (la IA) debes hacer una revisión rápida del contenido proporcionado por la autora.
- **Tu rol:** La autora sabe escribir muy bien sus posts, pero puede cometer pequeños errores (como typos, errores de formato Markdown, o etiquetas faltantes). 
- **Acción:** Revisa el texto sutilmente. Si notas algún error ortográfico evidente o problemas en el formato (por ejemplo, un link roto o una imagen mal referenciada), corrígelo o sugiérele el pequeño ajuste de forma muy respetuosa y no invasiva. No cambies su estilo de redacción, solo asiste con la calidad final del texto y el formato técnico.

## Commit

Una vez que el post esté revisado y aprobado por la autora, debes guardar los cambios en Git:
- **Comando Git:** `git add _posts/... assets/images/... assets/img/...`
- **Mensaje de Commit:** Por reglas del repositorio, el commit debe estar en inglés y seguir conventional commits.
  Ejemplo: `git commit -m "feat: add new post [Post Title]"`

## Push

Sube la rama recién creada y confirmada al servidor:
- **Comando Git:** `git push -u origin feat/slug-del-post`

## Pull Request

El paso final es crear el Pull Request en GitHub para que la autora u otros colaboradores puedan revisarlo y fusionarlo.
- **Comando GitHub CLI:** Debes ejecutar el comando de GitHub CLI para crear el PR automáticamente. En el argumento `--body`, debes proporcionar una descripción estructurada del post:
  ```bash
  gh pr create \
    --title "feat: [Título del Post]" \
    --body "## 📝 Nuevo Post: [Título del Post]

  **Resumen:** [Breve resumen de 1-2 líneas del post]

  - **Categorías:** [Lista de categorías]
  - **Etiquetas:** [Lista de tags]
  - **Media:** [X] imágenes incluidas, [Y] vídeos de YouTube incluidos.

  *Pull Request generado automáticamente para la revisión de la autora.*"
  ```
- Una vez creado, el comando devolverá una URL web (ej. `https://github.com/.../pull/123`).
- **Entrega:** Comparte esa URL generada con la autora, indicándole que el PR ya está creado y que puede hacer clic ahí para revisarlo y publicarlo.
