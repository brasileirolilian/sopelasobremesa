#!/bin/bash

IMG_DIR="assets/img"
# Detecta la cantidad de cores disponibles (funciona en Linux y macOS)
CORES=$(nproc 2>/dev/null || sysctl -n hw.ncpu)

echo "⚡ Optimizando imágenes en $IMG_DIR usando $CORES hilos concurrentes..."

# 1. Optimizar JPGs
echo "Optimizando JPGs..."
find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | \
  xargs -0 -P "$CORES" -I {} jpegoptim --max=85 --strip-all --quiet "{}"

# 2. Optimizar PNGs
echo "Optimizando PNGs..."
# --skip-if-larger evita tocar el archivo si la "optimización" resulta en un archivo más pesado
find "$IMG_DIR" -type f -iname "*.png" -print0 | \
  xargs -0 -P "$CORES" -I {} pngquant --quality=65-90 --skip-if-larger --ext .png --force "{}"

echo "🚀 Optimización completada."