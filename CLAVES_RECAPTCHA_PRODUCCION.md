# 🔐 Claves de reCAPTCHA para Casa Mobelle

## ⚠️ INFORMACIÓN CONFIDENCIAL
**Este archivo contiene claves sensibles. NO compartir públicamente.**

## 🔑 Claves de Producción

### Site Key (Clave del Sitio)
**Para uso en el frontend HTML:**
```
6LdrX7wrAAAAADDQ1fOLGdg3YyBXjniUfgz8KzU1
```

### Secret Key (Clave Secreta)
**Para verificación del servidor:**
```
6LdrX7wrAAAAADFhJpjfcvjIimv6r-8ELs5sqbeN
```

## 📋 Estado de Configuración

- ✅ **Site Key configurada** en `cotiza.html`
- ⚠️ **Secret Key disponible** para verificación del servidor (opcional)
- ✅ **reCAPTCHA v2** ("No soy un robot" checkbox)
- ✅ **Límite gratuito**: 10,000 evaluaciones por mes

## 🌐 Dominios Configurados

Asegúrate de que estos dominios estén configurados en tu proyecto de Google reCAPTCHA:

- `localhost` (para desarrollo)
- `tu-dominio.com` (reemplazar con dominio real)
- `www.tu-dominio.com` (reemplazar con dominio real)

## 🔒 Verificación del Servidor (Opcional pero Recomendada)

Para máxima seguridad, puedes implementar verificación del lado del servidor:

### Ejemplo para Node.js/Express:
```javascript
const verifyRecaptcha = async (token) => {
    const secretKey = '6LdrX7wrAAAAADFhJpjfcvjIimv6r-8ELs5sqbeN';
    
    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });
        
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error verificando reCAPTCHA:', error);
        return false;
    }
};
```

### Ejemplo para PHP:
```php
function verifyRecaptcha($token) {
    $secretKey = '6LdrX7wrAAAAADFhJpjfcvjIimv6r-8ELs5sqbeN';
    
    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}"
    );
    
    $responseData = json_decode($response, true);
    return $responseData['success'] === true;
}
```

### Ejemplo para Python/Flask:
```python
import requests

def verify_recaptcha(token):
    secret_key = '6LdrX7wrAAAAADFhJpjfcvjIimv6r-8ELs5sqbeN'
    
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', {
        'secret': secret_key,
        'response': token
    })
    
    return response.json().get('success', False)
```

## 🚨 Consideraciones de Seguridad

1. **Nunca exponer la Secret Key** en el frontend
2. **Verificar tokens en el servidor** para máxima seguridad
3. **Configurar dominios específicos** en lugar de permitir todos
4. **Monitorear uso** para evitar exceder límites gratuitos

## 📊 Monitoreo y Analytics

Puedes monitorear el uso de reCAPTCHA en:
- Google Cloud Platform Console
- reCAPTCHA Admin Panel

## ⚡ Enlaces Útiles

- **Admin Panel**: https://www.google.com/recaptcha/admin
- **Documentación**: https://developers.google.com/recaptcha/docs
- **Google Cloud Platform**: https://console.cloud.google.com

---

**Última actualización**: 3 de septiembre de 2025
**Estado**: ✅ Configurado y funcionando
