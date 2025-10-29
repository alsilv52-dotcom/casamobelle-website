# Configuración de reCAPTCHA v2 para Casa Mobelle

## 📋 Descripción
Este documento describe cómo configurar Google reCAPTCHA v2 para proteger el formulario de cotización contra spam y bots.

## 🔑 Obtener Claves de reCAPTCHA

### 1. Acceder a Google reCAPTCHA
- Visita: https://www.google.com/recaptcha/admin/create
- Inicia sesión con tu cuenta de Google

### 2. Crear un Nuevo Sitio
- **Etiqueta**: Casa Mobelle Cotización
- **Tipo de reCAPTCHA**: reCAPTCHA v2 → "No soy un robot" Checkbox
- **Dominios**: 
  - `localhost` (para desarrollo)
  - `127.0.0.1` (para desarrollo)
  - `tu-dominio.com` (para producción)
  - `www.tu-dominio.com` (para producción)

### 3. Obtener las Claves
Después de crear el sitio, obtendrás:
- **Clave del sitio (Site Key)**: Para usar en el frontend
- **Clave secreta (Secret Key)**: Para verificación del servidor (opcional)

## ⚙️ Configuración en el Código

### 1. Actualizar la Clave del Sitio
En `cotiza.html`, busca esta línea:
```html
<div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" data-theme="light" data-size="normal"></div>
```

**⚠️ IMPORTANTE**: Reemplaza `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` con tu clave del sitio real.

**Nota**: La clave actual es la clave de prueba de Google que funciona solo en `localhost`.

### 2. Configuración de Producción
```html
<!-- ✅ CONFIGURADO - Clave de producción activa -->
<div class="g-recaptcha" data-sitekey="6LdrX7wrAAAAADDQ1fOLGdg3YyBXjniUfgz8KzU1" data-theme="light" data-size="normal"></div>
```

**✅ Estado**: Las claves de producción ya están configuradas y activas.

## 🧪 Claves de Prueba (Solo para Desarrollo)

Google proporciona estas claves para pruebas en localhost:

### Site Key (Frontend)
```
6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

### Secret Key (Backend - para verificación del servidor)
```
6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

## 🔒 Verificación del Servidor (Opcional)

Si quieres verificar el token reCAPTCHA en el servidor, puedes crear un endpoint que haga esta verificación:

```javascript
// Ejemplo para Node.js/Express
app.post('/verify-recaptcha', async (req, res) => {
    const { recaptchaToken } = req.body;
    const secretKey = 'TU_CLAVE_SECRETA_AQUI';
    
    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${recaptchaToken}`,
        });
        
        const data = await response.json();
        
        if (data.success) {
            res.json({ success: true, message: 'reCAPTCHA válido' });
        } else {
            res.json({ success: false, message: 'reCAPTCHA inválido' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verificando reCAPTCHA' });
    }
});
```

## 🎨 Personalización de reCAPTCHA

### Temas Disponibles
```html
<!-- Tema claro (por defecto) -->
<div class="g-recaptcha" data-theme="light" ...></div>

<!-- Tema oscuro -->
<div class="g-recaptcha" data-theme="dark" ...></div>
```

### Tamaños Disponibles
```html
<!-- Tamaño normal (por defecto) -->
<div class="g-recaptcha" data-size="normal" ...></div>

<!-- Tamaño compacto -->
<div class="g-recaptcha" data-size="compact" ...></div>
```

### Idioma
```html
<!-- Agregar parámetro de idioma al script -->
<script src="https://www.google.com/recaptcha/api.js?hl=es" async defer></script>
```

## 📱 Responsividad

El CSS incluido en `cotiza-styles.css` ya maneja la responsividad:

```css
/* Móviles */
@media (max-width: 768px) {
    .g-recaptcha {
        transform: scale(0.85);
        transform-origin: center;
    }
}

/* Móviles pequeños */
@media (max-width: 480px) {
    .g-recaptcha {
        transform: scale(0.75);
    }
}
```

## 🔧 Funcionalidades Implementadas

### Validación del Cliente
- ✅ Verificación de que reCAPTCHA esté cargado
- ✅ Validación de que el usuario completó el reCAPTCHA
- ✅ Mensaje de error visual
- ✅ Scroll automático al reCAPTCHA si hay error
- ✅ Animación de destaque en caso de error

### Manejo del Formulario
- ✅ Reset automático del reCAPTCHA al resetear el formulario
- ✅ Inclusión del token reCAPTCHA en los datos del formulario
- ✅ Logging del token para debugging

### Experiencia de Usuario
- ✅ Estilos integrados con el diseño del sitio
- ✅ Responsive design
- ✅ Mensajes de error claros
- ✅ Enlaces a políticas de privacidad de Google

## 🚨 Consideraciones de Seguridad

### Lado del Cliente
- La validación del lado del cliente es solo una verificación básica
- Los bots sofisticados pueden saltarse esta validación
- Es recomendable implementar verificación del servidor

### Lado del Servidor
- Para máxima seguridad, verifica el token en tu servidor
- Usa la clave secreta para la verificación
- Nunca expongas la clave secreta en el frontend

## 🐛 Solución de Problemas

### reCAPTCHA no se muestra
1. Verifica que la clave del sitio sea correcta
2. Verifica que el dominio esté autorizado en Google reCAPTCHA
3. Verifica que el script se cargue correctamente
4. Revisa la consola del navegador para errores

### Error "Invalid site key"
- La clave del sitio no es válida o no coincide con el dominio
- Verifica la configuración en Google reCAPTCHA Admin

### reCAPTCHA muy pequeño en móviles
- Los estilos CSS incluidos manejan esto automáticamente
- Puedes ajustar el `scale` en `cotiza-styles.css` si es necesario

## 📞 Soporte

Si tienes problemas con la configuración de reCAPTCHA:

1. Revisa la documentación oficial: https://developers.google.com/recaptcha/docs/display
2. Verifica la consola del navegador para errores
3. Usa las claves de prueba en desarrollo
4. Asegúrate de tener las claves de producción configuradas antes del lanzamiento

## ✅ Lista de Verificación para Producción

- [ ] Claves de reCAPTCHA obtenidas de Google
- [ ] Clave del sitio actualizada en `cotiza.html`
- [ ] Dominios de producción agregados en Google reCAPTCHA
- [ ] Pruebas realizadas en el sitio en vivo
- [ ] Verificación del servidor implementada (opcional pero recomendada)
- [ ] Políticas de privacidad actualizadas para mencionar reCAPTCHA
