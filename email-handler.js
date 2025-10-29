/**
 * EmailJS Configuration and Email Handling for Casa Mobelle
 * Manejo de envío de correos para formulario de cotización
 */

// ===== CONFIGURACIÓN EMAILJS =====
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Wg5X527MYMwivPKvs', // Clave pública de EmailJS
    SERVICE_ID: 'service_i8ylqzi', // Service ID configurado
    TEMPLATE_CLIENTE: 'template_s60kolv' // Template de confirmación para cliente (EmailJS envía copia automática)
};

// Hacer configuración disponible globalmente para debug
window.EMAILJS_CONFIG = EMAILJS_CONFIG;

// ===== INICIALIZACIÓN =====
let emailjsInitialized = false;

function initEmailJS() {
    if (emailjsInitialized) return true;
    
    // Verificar que EmailJS esté cargado
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS no está cargado. Verifica que el script esté incluido.');
        return false;
    }
    
    // Verificar configuración
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'TU_PUBLIC_KEY_AQUI') {
        console.warn('EmailJS no está configurado. Revisa CONFIGURACION_EMAILJS.md');
        return false;
    }
    
    try {
        emailjs.init({
            publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        });
        emailjsInitialized = true;
        console.log('✅ EmailJS v4 inicializado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error inicializando EmailJS:', error);
        return false;
    }
}

// ===== FUNCIONES DE DIAGNÓSTICO =====

function diagnosticarEmailJS() {
    console.log('🔍 Diagnóstico de EmailJS:');
    
    // Verificar scripts
    console.log(`📦 EmailJS cargado: ${typeof emailjs !== 'undefined' ? '✅' : '❌'}`);
    
    // Verificar configuración
    console.log('⚙️ Configuración:');
    console.log(`   PUBLIC_KEY: ${EMAILJS_CONFIG.PUBLIC_KEY ? '✅ Configurado' : '❌ Faltante'}`);
    console.log(`   SERVICE_ID: ${EMAILJS_CONFIG.SERVICE_ID ? '✅ Configurado' : '❌ Faltante'}`);
    console.log(`   TEMPLATE_CLIENTE: ${EMAILJS_CONFIG.TEMPLATE_CLIENTE ? '✅ Configurado' : '❌ Faltante'}`);
    console.log(`   TEMPLATE_ADMIN: ${EMAILJS_CONFIG.TEMPLATE_ADMIN ? '✅ Configurado' : '❌ Faltante'}`);
    
    // Probar inicialización
    const inicializado = initEmailJS();
    console.log(`🚀 Inicialización: ${inicializado ? '✅ Exitosa' : '❌ Falló'}`);
    
    return inicializado;
}

// ===== FUNCIONES DE ENVÍO =====

/**
 * Envía email de confirmación al cliente
 */
async function enviarEmailCliente(formData) {
    if (!initEmailJS()) {
        throw new Error('EmailJS no está configurado correctamente');
    }
    
    const templateParams = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        ciudad: getCiudadTexto(formData.ciudad, formData.otraCiudad),
        codigoPostal: formData.codigoPostal,
        tipoProyecto: getProyectoTexto(formData.tipoProyecto, formData.otroProyecto),
        descripcion: formData.descripcion,
        fecha: new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    console.log('📧 Enviando email al cliente:', templateParams);
    
    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_CLIENTE,
            templateParams
        );
        console.log('✅ Email de confirmación enviado al cliente:', response);
        return response;
    } catch (error) {
        console.error('❌ Error enviando email al cliente:', error);
        
        // Detalles específicos del error
        if (error.status === 400) {
            throw new Error('Configuración incorrecta de EmailJS (400 Bad Request)');
        } else if (error.status === 403) {
            throw new Error('Credenciales de EmailJS inválidas (403 Forbidden)');
        } else if (error.status === 404) {
            throw new Error('Template o Service ID no encontrado (404 Not Found)');
        } else if (error.text) {
            throw new Error(`Error EmailJS: ${error.text}`);
        } else if (error.message) {
            throw new Error(`Error: ${error.message}`);
        } else {
            throw new Error(`Error de conexión: ${JSON.stringify(error)}`);
        }
    }
}

/**
 * Envía email de notificación al admin
 */
async function enviarEmailAdmin(formData) {
    if (!initEmailJS()) {
        throw new Error('EmailJS no está configurado correctamente');
    }
    
    // Para el admin, enviamos los datos del cliente pero al email del admin
    const templateParams = {
        nombre: `[NUEVA SOLICITUD] ${formData.nombre}`,
        email: 'lopez.sil.beto@outlook.com', // Email del admin, no del cliente
        telefono: formData.telefono,
        ciudad: getCiudadTexto(formData.ciudad, formData.otraCiudad),
        codigoPostal: formData.codigoPostal,
        tipoProyecto: getProyectoTexto(formData.tipoProyecto, formData.otroProyecto),
        descripcion: `INFORMACIÓN DEL CLIENTE:
        
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Ciudad: ${getCiudadTexto(formData.ciudad, formData.otraCiudad)}
Código Postal: ${formData.codigoPostal}
Proyecto: ${getProyectoTexto(formData.tipoProyecto, formData.otroProyecto)}

DESCRIPCIÓN:
${formData.descripcion}

*** ESTE ES UN EMAIL DE NOTIFICACIÓN PARA EL EQUIPO DE CASA MOBELLE ***
*** El cliente ha sido instruido para responder con fotos y medidas del espacio ***`,
        fecha: new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    console.log('📧 Enviando email al admin:', templateParams);
    
    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            'lopez.sil.beto@outlook.com',
            templateParams
        );
        console.log('✅ Email de notificación enviado al admin:', response);
        return response;
    } catch (error) {
        console.error('❌ Error enviando email al admin:', error);
        
        // Detalles específicos del error
        if (error.status === 400) {
            throw new Error('Configuración incorrecta de EmailJS (400 Bad Request)');
        } else if (error.status === 403) {
            throw new Error('Credenciales de EmailJS inválidas (403 Forbidden)');
        } else if (error.status === 404) {
            throw new Error('Template o Service ID no encontrado (404 Not Found)');
        } else if (error.text) {
            throw new Error(`Error EmailJS: ${error.text}`);
        } else if (error.message) {
            throw new Error(`Error: ${error.message}`);
        } else {
            throw new Error(`Error de conexión: ${JSON.stringify(error)}`);
        }
    }
}

/**
 * Procesa y envía el formulario de cotización
 */
async function procesarFormularioCotizacion(formData) {
    // Mostrar loading
    mostrarLoading(true);
    
    try {
        // Diagnóstico inicial
        console.log('🚀 Iniciando envío de formulario...');
        
        if (!diagnosticarEmailJS()) {
            throw new Error('EmailJS no está configurado correctamente. Revisa la consola para más detalles.');
        }
        
        // Verificar reCAPTCHA en el lado del cliente (básico)
        if (formData.recaptchaToken) {
            console.log('✅ Token reCAPTCHA presente');
        } else {
            console.warn('⚠️ Token reCAPTCHA no encontrado');
        }
        
        console.log('📊 Datos a enviar:', formData);
        
        // Enviar solo email al cliente (EmailJS ya te envía copia automáticamente)
        console.log('📧 Enviando email de confirmación al cliente...');
        const response = await enviarEmailCliente(formData);
        
        console.log('✅ Email enviado exitosamente');
        
        // Mostrar mensaje de éxito
        mostrarMensajeExito();
        
        // Limpiar formulario
        if (window.resetQuoteForm) {
            window.resetQuoteForm();
        }
        
        // Analytics (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'cotizacion_form'
            });
        }
        
        console.log('✅ Formulario procesado exitosamente');
        return true;
        
    } catch (error) {
        console.error('❌ Error procesando formulario:', error);
        mostrarMensajeError(error.message);
        return false;
    } finally {
        mostrarLoading(false);
    }
}

// ===== FUNCIONES AUXILIARES =====

function getCiudadTexto(ciudad, otraCiudad) {
    switch (ciudad) {
        case 'cdmx':
            return 'Ciudad de México';
        case 'estado-mexico':
            return 'Estado de México';
        case 'otra':
            return otraCiudad || 'No especificada';
        default:
            return ciudad || 'No especificada';
    }
}

function getProyectoTexto(tipoProyecto, otroProyecto) {
    switch (tipoProyecto) {
        case 'closet':
            return 'Clóset/Vestidor';
        case 'cocina':
            return 'Cocina integral';
        case 'otro':
            return otroProyecto || 'Proyecto personalizado';
        default:
            return tipoProyecto || 'No especificado';
    }
}

// ===== FUNCIONES DE UI =====

function mostrarLoading(mostrar) {
    const submitBtn = document.querySelector('.btn-cotizar');
    if (!submitBtn) return;
    
    if (mostrar) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Solicitar Cotización';
    }
}

function mostrarMensajeExito() {
    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>¡Solicitud Enviada Exitosamente!</h3>
            <p>Hemos recibido tu solicitud de cotización y te hemos enviado un email de confirmación.</p>
            <p>Nuestro equipo te contactará en las próximas <strong>72 horas</strong> para procesar tu solicitud.</p>
            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left;">
                <h4 style="margin-top: 0; color: #0c5460;"><i class="fas fa-camera"></i> Información importante</h4>
                <p style="margin-bottom: 0; font-size: 0.9rem;">Para brindarte un diseño y precio más acertado, por favor responde al email de confirmación que acabas de recibir adjuntando <strong>fotos y medidas de los espacios</strong> donde se realizará el proyecto.</p>
            </div>
            <button onclick="cerrarModal()" class="btn-modal">Entendido</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function mostrarMensajeError(mensaje) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content error-modal">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Error al Enviar</h3>
            <p>Ha ocurrido un error al enviar tu solicitud:</p>
            <p class="error-message">${mensaje}</p>
            <p>Por favor, intenta nuevamente o contáctanos directamente al <strong>722 289 6977</strong>.</p>
            <button onclick="cerrarModal()" class="btn-modal">Cerrar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function cerrarModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        
        // Si es un modal de éxito (tiene la clase success-modal), resetear el formulario
        if (modal.querySelector('.success-modal')) {
            // Intentar resetear el formulario primero
            if (window.resetQuoteForm) {
                window.resetQuoteForm();
            } else {
                // Si no está disponible la función, recargar la página
                window.location.reload();
            }
        }
    }
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.procesarFormularioCotizacion = procesarFormularioCotizacion;
window.cerrarModal = cerrarModal;
window.diagnosticarEmailJS = diagnosticarEmailJS;
