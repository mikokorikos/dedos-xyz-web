# Dedos.xyz — versión estática

Este repositorio contiene una versión 100% estática del sitio Dedos.xyz. Todo el layout se construyó con HTML, CSS y JavaScript vanilla aprovechando la CDN de Tailwind para los estilos utilitarios y efectos glassmorphism.

## Estructura

```
index.html          # Landing principal
robux.html          # Planes y proceso de compra de Robux
roblox.html         # Redirección al grupo oficial de Roblox
discord.html        # Redirección al servidor de Discord
tos.html            # Términos de servicio
assets/css/styles.css
assets/js/main.js   # Renderizado dinámico y efectos responsivos
assets/js/fx-*.js   # Background animado de orbes y estrellas
```

## Cómo visualizar

1. Abre `index.html` en tu navegador preferido. No se requiere ningún build step.
2. Para revisar otras páginas navega directamente a los archivos (`robux.html`, `discord.html`, etc.).

## Personalización rápida

* Cambia el código de invitación de Discord editando el atributo `data-discord-invite` en los archivos HTML.
* Actualiza la URL del grupo de Roblox mediante `data-roblox-url` en `index.html` y `robux.html`.
* Ajusta el estilo global en `assets/css/styles.css` (por ejemplo, colores base o animaciones del backdrop).

## Notas

* Las microinteracciones y el grid responsive se generan desde `assets/js/main.js`, que hidrata el contenido con datos predefinidos.
* El fondo animado reutiliza los mismos efectos de orbes y estrellas que existían en la versión React.
* No hay dependencias ni tooling: basta con un navegador moderno con soporte para módulos ES.
