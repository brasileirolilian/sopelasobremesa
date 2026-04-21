#!/bin/bash

IMG_DIR="assets/img"
# Cambia a false cuando estés seguro de querer borrar los archivos
DRY_RUN=false 

echo "🔍 Iniciando búsqueda de imágenes huérfanas en $IMG_DIR..."

# Buscamos todos los archivos en la carpeta de imágenes
find "$IMG_DIR" -type f | while read -r img_path; do
  # Extraemos solo el nombre del archivo (ej. foto-post.jpg)
  filename=$(basename "$img_path")
  
  # Buscamos el nombre del archivo literalmente (-F) en todos los .md y .html
  # -r recursivo, -q modo silencioso (solo nos importa el exit code)
  if ! grep -r -q -F --include="*.md" --include="*.html" "$filename" .; then
    if [ "$DRY_RUN" = true ]; then
      echo "[DRY-RUN] Se eliminaría: $img_path"
    else
      echo "🗑️ Eliminando: $img_path"
      rm "$img_path"
    fi
  fi
done

echo "✅ Proceso de limpieza finalizado."