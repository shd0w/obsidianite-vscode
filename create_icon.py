#!/usr/bin/env python3
from PIL import Image, ImageDraw

# Cores do tema Obsidianite
background_color = "#100e17"  # Fundo escuro
accent_color = "#0fb6d6"      # Ciano
highlight_color = "#6272a4"   # Roxo claro para detalhes

# Criar imagem 128x128
img = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Fundo arredondado
draw.rounded_rectangle([8, 8, 120, 120], radius=16, fill=background_color)

# Destaque ciano no topo
draw.rounded_rectangle([16, 16, 112, 48], radius=8, fill=accent_color)

# Elemento decorativo (código-like)
draw.rectangle([24, 56, 104, 60], fill=highlight_color)
draw.rectangle([24, 68, 88, 72], fill=highlight_color)
draw.rectangle([24, 80, 96, 84], fill=highlight_color)

# Salvar como PNG
img.save('icon.png', 'PNG')
print("Ícone criado: icon.png")