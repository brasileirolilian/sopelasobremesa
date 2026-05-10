# Só pela sobremesa

Um delicioso passeio por lugares, filmes, livros e é claro, guloseimas.

---

## 🛠 Instalación y Requisitos

Este blog está construido con **Jekyll**, un generador de sitios estáticos basado en Ruby.

### Requisitos Previos

Este proyecto requiere **Ruby 3.2.11**. Para garantizar la compatibilidad y evitar problemas con la versión del sistema (especialmente en Mac), se recomienda usar **rbenv**.

**Paso a paso para instalar Ruby (Mac/Linux):**

1. **Instalar rbenv** (recomendado usar Homebrew en Mac):
   ```bash
   brew install rbenv ruby-build
   ```
2. **Configurar tu terminal** (para Zsh en Mac):
   ```bash
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   source ~/.zshrc
   ```
3. **Instalar la versión exacta del proyecto**:
   Dentro de la carpeta del proyecto (`sopelasobremesa`), ejecuta:
   ```bash
   rbenv install
   ```
4. **GCC y Make**: Dependiendo del sistema operativo, necesario para compilar dependencias nativas (ej. instalar *Xcode Command Line Tools* en Mac con `xcode-select --install`).
5. **Bundler**: Instala el gestor de dependencias de Ruby ejecutando:
   ```bash
   gem install bundler
   ```

*(Para instrucciones de instalación en Windows o alternativas, visita la [documentación oficial de instalación de Jekyll](https://jekyllrb.com/docs/installation/).)*

### Instalar el Proyecto

1. Clona este repositorio o descarga los archivos.
2. Abre tu terminal y navega hasta la carpeta raíz del proyecto (`sopelasobremesa`).
3. Instala todas las dependencias del proyecto ejecutando:
   ```bash
   bundle install
   ```

---

## 🚀 Cómo levantar el entorno local (Servidor de Desarrollo)

Para previsualizar el blog localmente en tu computadora y ver los cambios en tiempo real, ejecuta el siguiente comando en la terminal:

```bash
bundle exec jekyll serve --livereload
```

- `--livereload` se encarga de recargar automáticamente el navegador cada vez que guardas un cambio en un archivo de código o texto.
- Abre tu navegador y visita: **[http://localhost:4000](http://localhost:4000)**

---

## 📝 Cómo crear un nuevo Post

Los artículos o "posts" del blog se guardan dentro de la carpeta `_posts`. Jekyll requiere un formato estricto tanto para los nombres de archivo como para los datos iniciales (Front Matter).

### 1. Nombrar el archivo

El nombre del archivo **siempre** debe incluir la fecha y seguir este formato exacto:

`YYYY-MM-DD-titulo-del-post.md`

Por ejemplo: `2024-05-12-mi-receta-de-brownie.md`.

### 2. El Front Matter

El **Front Matter** es un bloque de texto especial en la parte superior del archivo Markdown. Jekyll lo utiliza para leer todos los "metadatos" o información clave del artículo (su título, categoría, la foto de portada, etc.). Siempre debe estar delimitado por tres guiones (`---`) al principio y al final.

Copia este bloque en la parte superior de tu nuevo archivo `.md` y ajusta los valores:

```yaml
---
layout: post
title:  "El título de mi artículo aquí"
date:   2024-05-12 10:00:00 -0400
categories: [ "Receitas", "Doces" ]
author: "Lílian Brasileiro"
image: "/assets/img/nombre-de-mi-imagen.webp"
excerpt: "Este texto aparecerá como un pequeño resumen debajo del título en la tarjeta del post de la pantalla principal."
---
```

### Explicación de los campos principales:

*   **`layout: post`**: Le dice a Jekyll que envuelva este contenido usando el diseño predefinido para un artículo (no lo borres).
*   **`title`**: El título de tu post (se leerá tal cual, asegúrate de escribirlo bien).
*   **`date`**: La fecha y hora exactas de publicación. El sufijo `-0400` es la zona horaria.
*   **`categories`**: Determina en qué filtro del menú de inicio y de la página "Categorías" aparecerá. Puedes colocar más de una separada por comas.
*   **`image`**: (Opcional pero muy recomendado). La ruta hacia la imagen principal que ilustrará la tarjeta de la página de inicio. Te aconsejo subir primero tus fotos a la carpeta `assets/img/`.
*   **`excerpt`**: (Opcional). Es el extracto de texto corto introductorio para las tarjetas de navegación.

### 3. Escribir el contenido

Justo debajo del último `---` del Front Matter, puedes empezar a escribir el desarrollo de tu post usando sintaxis de **Markdown**.

*(Para conocer todas las opciones de formato, crear listas, tablas o enlaces, te recomendamos leer la [Guía Básica de Markdown](https://www.markdownguide.org/basic-syntax/)).*

**Para crear subtítulos:**
```markdown
## Título de mi receta
```

**Para resaltar o enfatizar texto:**
```markdown
Esto es **negrita** y esto es *cursiva*.
```

**Para insertar una imagen dentro del propio texto:**
```markdown
![Texto alternativo que describe la imagen](/assets/img/mi-foto-interna.webp)
```

---

## 🖼️ Optimización de Imágenes (WebP)

Para garantizar que el sitio cargue extremadamente rápido y ahorremos minutos de compilación en GitHub Actions, todas las imágenes se sirven en formato `.webp`.

En lugar de depender de un plugin que regenere las imágenes cada vez, contamos con un script automatizado local:

1. Guarda siempre tus imágenes originales (`.jpg`, `.png`, etc.) dentro de la carpeta `assets/images/`.
2. Antes de subir tus cambios a GitHub, abre tu terminal y ejecuta el siguiente script:

```bash
chmod +x scripts/convert_to_webp.sh && ./scripts/convert_to_webp.sh
```

**¿Qué hace este script?**
Buscará todas las fotos originales nuevas en `assets/images/`, las convertirá automáticamente a formato `.webp` con un 95% de calidad, y guardará el resultado manteniendo la misma estructura de carpetas dentro de `assets/img/`.

*(Nota: Solo debes referenciar las imágenes con la extensión `.webp` apuntando a la carpeta `assets/img/` dentro de tus posts o código HTML)*.

---

## 📂 Estructura Principal del Proyecto

Si necesitas modificar la apariencia estructural, debes saber dónde está cada cosa:

*   `_posts/`: Aquí viven los archivos `.md` de tus artículos.
*   `_layouts/`: Contiene los esqueletos principales de las páginas (Home, Post, Page, Default).
*   `_includes/`: Componentes reutilizables que se inyectan en los layouts (Header, Footer, Barra de búsqueda, etc.).
*   `assets/css/`: La magia del diseño vive aquí. Utilizamos SCSS, distribuido lógicamente en `_variables.scss` (los tokens de color de Stitch), `_layout.scss` y `_components.scss` (para estilos específicos de tarjetas o autor).
*   `assets/images/`: Directorio central para guardar imágenes originales.
*   `assets/img/`: Directorio de imagens optimizadas para uso en el sitio.
*   `assets/js/`: Funcionalidades como el buscador en tiempo real.
*   `_config.yml`: Archivo maestro de configuración general de Jekyll. Desde aquí puedes cambiar el nombre de la autora por defecto, la descripción del sitio o enlaces de redes sociales (por ejemplo, `instagram_username`).