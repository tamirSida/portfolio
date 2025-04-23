#\!/bin/bash

# This script generates a complete set of favicons from a source logo
# It requires ImageMagick to be installed: brew install imagemagick

# Usage: ./generate-favicon.sh source-logo.png

if [ -z "$1" ]; then
  echo "Usage: $0 source-logo.png"
  exit 1
fi

SOURCE=$1
DEST_DIR="../"

# Create various sizes
convert "$SOURCE" -resize 16x16 "$DEST_DIR/favicon-16x16.png"
convert "$SOURCE" -resize 32x32 "$DEST_DIR/favicon-32x32.png"
convert "$SOURCE" -resize 192x192 "$DEST_DIR/android-chrome-192x192.png"
convert "$SOURCE" -resize 512x512 "$DEST_DIR/android-chrome-512x512.png"
convert "$SOURCE" -resize 180x180 "$DEST_DIR/apple-touch-icon.png"

# Create .ico file (contains multiple sizes)
convert "$SOURCE" -define icon:auto-resize=16,32,48,64 "$DEST_DIR/favicon.ico"

echo "Favicon generation complete\!"
