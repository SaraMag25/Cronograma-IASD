#!/bin/bash

mkdir -p build/icons

for size in 16 24 32 48 64 128 256 512
do
    convert public/logoapp.png \
        -background none \
        -gravity center \
        -resize ${size}x${size} \
        -extent ${size}x${size} \
        build/icons/${size}x${size}.png
done

echo "Ícones criados com sucesso!"