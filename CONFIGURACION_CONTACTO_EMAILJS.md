# Template de Contacto - EmailJS

## Información del Template

- **Template ID:** `template_i5irfjo`
- **Service ID:** `service_i8ylqzi` (mismo que cotización)
- **Public Key:** `Wg5X527MYMwivPKvs` (mismo que cotización)

## Variables del Template

### Variables obligatorias para el template de EmailJS:

1. **{{nombre}}** - Nombre completo del contacto
2. **{{email}}** - Correo electrónico del contacto  
3. **{{telefono}}** - Teléfono del contacto (puede ser "No proporcionado")
4. **{{asunto}}** - Asunto seleccionado del formulario:
   - cotizacion
   - proyecto
   - cita
   - servicio
   - otro
5. **{{mensaje}}** - Mensaje del formulario de contacto

## Configuración en EmailJS

### En el template de EmailJS usar estas variables exactamente:

```
Nombre: {{nombre}}
Email: {{email}}
Teléfono: {{telefono}}
Asunto: {{asunto}}
Mensaje: {{mensaje}}
```

### Mapeo de campos del formulario:

- `contactName` → `{{nombre}}`
- `contactEmail` → `{{email}}`
- `contactPhone` → `{{telefono}}`
- `contactSubject` → `{{asunto}}`
- `contactMessage` → `{{mensaje}}`

## Archivos relacionados

- **Template HTML:** `contacto-template.html` - Plantilla visual del email
- **Manejador JS:** `contact-handler.js` - Lógica de envío del formulario
- **Formulario:** `contacto.html` - Página con el formulario de contacto

## Diferencias con el template de cotización

### Campos únicos del contacto:
- **Asunto:** Categoriza el tipo de consulta
- **Mensaje libre:** Campo de texto abierto para consultas generales

### Campos que NO tiene (vs cotización):
- Ciudad
- Código postal
- Tipo de proyecto específico
- Descripción estructurada del proyecto

## Proceso de funcionamiento

1. **Usuario completa formulario** en `contacto.html`
2. **JavaScript valida** datos con `contact-handler.js`
3. **EmailJS envía** usando template `template_i5irfjo`
4. **Cliente recibe** email con formato de `contacto-template.html`
5. **Casa Mobelle recibe** copia del mensaje

## Personalización del template

El template `contacto-template.html` está diseñado para:

- ✅ Confirmar recepción del mensaje
- ✅ Mostrar resumen de la consulta
- ✅ Explicar próximos pasos (respuesta en 24h)
- ✅ Destacar servicios principales
- ✅ Proporcionar información de contacto adicional
- ✅ Incluir enlace a cotización personalizada

## Validaciones del formulario

- **Nombre:** mínimo 2 caracteres
- **Email:** formato válido de email
- **Teléfono:** opcional, pero si se proporciona debe ser válido
- **Asunto:** obligatorio, debe seleccionar una opción
- **Mensaje:** mínimo 10 caracteres

## Mensajes de respuesta

### Éxito:
- Modal con confirmación
- Mensaje: "Te responderemos dentro de las próximas 24 horas"

### Error:
- Modal con opción de reintentar
- Botón alternativo de WhatsApp para contacto directo
