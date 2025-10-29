# 📧 Configuración EmailJS para Casa Mobelle

## ✅ Estado Actual: CONFIGURADO

### 🔑 Credenciales Actuales

```javascript
PUBLIC_KEY: 'PMTpZdpGQZBp5wjyq'
SERVICE_ID: 'service_9jlw0dq'
TEMPLATE_CLIENTE: 'template_s60kolv'
TEMPLATE_ADMIN: 'template_w2264fa'
```

## 📝 Templates Configurados

### 1. Template Cliente (template_s60kolv)
- **Propósito**: Confirmación al cliente
- **Variables utilizadas**:
  - `{{nombre}}` - Nombre completo del cliente
  - `{{email}}` - Email del cliente
  - `{{telefono}}` - Teléfono del cliente
  - `{{ciudad}}` - Ciudad del cliente
  - `{{codigoPostal}}` - Código postal
  - `{{tipoProyecto}}` - Tipo de proyecto
  - `{{descripcion}}` - Descripción del proyecto

### 2. Template Admin (template_w2264fa)
- **Propósito**: Notificación al equipo de Casa Mobelle
- **Variables utilizadas**:
  - Mismas que el template cliente
  - `{{num_archivos}}` - Número de archivos adjuntos
  - `{{lista_archivos}}` - Lista de nombres de archivos
  - `{{tamanos_archivos}}` - Tamaños de archivos
  - `{{mensaje_archivos}}` - Mensaje sobre archivos adjuntos

## 🎨 Design del Email

El template utiliza el diseño profesional de Casa Mobelle con:
- Logo corporativo alojado en: `https://iili.io/KqBk9qb.png`
- Colores corporativos: #182c72 (azul Casa Mobelle)
- Diseño responsive
- Secciones organizadas:
  - Header con logo
  - Saludo personalizado
  - Resumen del proyecto
  - Proceso de seguimiento
  - Garantías
  - Información de contacto
  - Footer

## 🔧 Archivos Actualizados

1. `email-handler.js` - Configuración y funciones principales
2. `emailjs-template.html` - Diseño del template para referencia
3. `cotiza.html` - Formulario de cotización (sin cambios)

## ✅ Estado de Funcionalidad

- [x] EmailJS inicializado correctamente
- [x] Templates configurados
- [x] Variables mapeadas correctamente
- [x] Envío de confirmación al cliente
- [x] Envío de notificación al admin
- [x] Manejo de archivos adjuntos (con limitaciones)
- [x] UI/UX mejorado con modales de confirmación

## 🚨 Limitaciones Conocidas

### Archivos Adjuntos
- EmailJS no puede reenviar archivos adjuntos por limitaciones de tamaño
- El sistema informa sobre los archivos pero no los incluye en el email
- Se notifica al admin que debe contactar al cliente para solicitar los archivos

### Solución Implementada
- Se envía información detallada sobre archivos (nombres, tamaños)
- Mensaje explicativo en el modal de éxito
- Instrucción al admin para contactar al cliente si necesita los archivos

## 🧪 Pruebas Recomendadas

Después de la configuración, probar:

1. **Formulario básico**:
   - Llenar campos obligatorios
   - Enviar sin archivos
   - Verificar recepción de ambos emails

2. **Formulario con archivos**:
   - Adjuntar archivos de prueba
   - Verificar información en email admin
   - Confirmar mensaje sobre archivos en modal

3. **Casos edge**:
   - Campos opcionales vacíos
   - Conexión lenta
   - Errores de red

## 📞 Soporte

Para problemas con EmailJS:
- Revisar consola del navegador
- Verificar credenciales en EmailJS dashboard
- Comprobar límites de envío de EmailJS
- Ejecutar `diagnosticarEmailJS()` en la consola

## 📅 Última Actualización

**Fecha**: Septiembre 2025
**Estado**: Completamente funcional
**Próxima revisión**: Enero 2026
