# JavaScript Unificado - Casa Mobelle

## Funcionalidades consolidadas en scripts.js

### ✅ Scripts migrados exitosamente:

1. **Menú móvil** (todas las páginas)
   - Toggle del menú hamburguesa
   - Cambio de iconos (bars ↔ times)

2. **Carruseles** (home.html)
   - Carrusel principal de imágenes
   - Carrusel de características
   - Auto-avance e indicadores

3. **Formulario de contacto** (contacto.html)
   - Validación de campos obligatorios
   - Envío simulado del formulario
   - Función de copiar teléfono al portapapeles

4. **Formulario de cotización** (cotiza.html)
   - Manejo de botones de selección
   - Campos condicionales (otra ciudad, otro proyecto)
   - Subida de archivos con drag & drop
   - Validación de archivos (tipo y tamaño)
   - Envío y reseteo del formulario

5. **Efectos de scroll** (galeria.html)
   - Scroll automático a secciones con hash
   - Scroll suave para enlaces internos

### 📁 Archivos modificados:
- ✅ `/scripts.js` (nuevo archivo unificado)
- ✅ `/home.html` (script inline reemplazado)
- ✅ `/cotiza.html` (script inline reemplazado)
- ✅ `/contacto.html` (script inline reemplazado)
- ✅ `/galeria.html` (script inline reemplazado)

### 🎯 Beneficios de la unificación:
- **Mantenibilidad**: Un solo archivo para todas las funcionalidades comunes
- **Performance**: Carga única del script, reutilización en cache
- **Consistencia**: Comportamiento uniforme en todas las páginas
- **Modularidad**: Funciones organizadas por tipo de funcionalidad
- **Escalabilidad**: Fácil añadir nuevas funcionalidades

### 🔧 Funciones globales expuestas:
- `window.prevFeature()` - Para navegación del carrusel de características
- `window.nextFeature()` - Para navegación del carrusel de características  
- `window.copyToClipboard()` - Para copiar números de teléfono
- `window.removeFile()` - Para remover archivos subidos
- `window.selectedFiles` - Array global de archivos seleccionados

### 📋 Inicialización:
El script se inicializa automáticamente con `DOMContentLoaded` y detecta qué elementos están disponibles en cada página para activar solo las funcionalidades necesarias.
