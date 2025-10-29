// CONTACT HANDLER V7.0 - CON RECAPTCHA
// Incluye validación de reCAPTCHA para protección contra spam

console.log('🚀 contact-handler-v7.js cargando CON reCAPTCHA...');

// Configuración EmailJS
const CONTACT_CONFIG = {
    serviceID: 'service_i8ylqzi',
    templateID: 'template_i5irfjo', 
    publicKey: 'Wg5X527MYMwivPKvs'
};

// Inicializar EmailJS
(function() {
    emailjs.init(CONTACT_CONFIG.publicKey);
    console.log('📧 EmailJS inicializado');
})();

// VALIDACIÓN DE RECAPTCHA
function validateContactRecaptcha() {
    console.log('🔒 Validando reCAPTCHA...');
    
    // Verificar si reCAPTCHA está cargado
    if (typeof grecaptcha === 'undefined') {
        showContactFormError('Error: reCAPTCHA no se ha cargado correctamente. Por favor, recarga la página.');
        return false;
    }
    
    // Verificar si reCAPTCHA fue completado
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse || recaptchaResponse.length === 0) {
        showContactFormError('Por favor, completa la verificación reCAPTCHA.');
        
        // Hacer scroll al reCAPTCHA
        const recaptchaElement = document.querySelector('.g-recaptcha');
        if (recaptchaElement) {
            recaptchaElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Agregar una animación de destaque
            const container = document.querySelector('.recaptcha-container');
            if (container) {
                container.style.border = '2px solid #ff4444';
                container.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
                
                setTimeout(() => {
                    container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    container.style.boxShadow = 'none';
                }, 3000);
            }
        }
        
        return false;
    }
    
    console.log('✅ reCAPTCHA validado correctamente');
    return true;
}

// MOSTRAR MENSAJES DE ERROR
function showContactFormError(message) {
    // Crear o actualizar el mensaje de error
    let errorElement = document.querySelector('.form-error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error-message';
        
        const form = document.getElementById('contactForm');
        form.insertBefore(errorElement, form.firstChild);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        if (errorElement && errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

// FUNCIÓN PRINCIPAL - ENVÍO DE FORMULARIO
function enviarFormularioContactoV7(event) {
    console.log('🎯 enviarFormularioContactoV7() - CON reCAPTCHA');
    
    // DETENER TODO
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // OBTENER FORMULARIO
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('❌ No se encontró el formulario');
        return false;
    }
    
    // VALIDAR RECAPTCHA PRIMERO
    if (!validateContactRecaptcha()) {
        return false;
    }
    
    // OBTENER DATOS
    const formData = {
        nombre: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        telefono: document.getElementById('contactPhone').value.trim() || 'No proporcionado',
        asunto: document.getElementById('contactSubject').value,
        mensaje: document.getElementById('contactMessage').value.trim(),
        recaptchaToken: grecaptcha.getResponse()
    };
    
    console.log('📤 Datos a enviar:', formData);
    
    // VALIDACIÓN BÁSICA
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        showContactFormError('Por favor completa todos los campos requeridos');
        return false;
    }
    
    // Mostrar loading en botón
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // ENVIAR CON EMAILJS
    emailjs.send(
        CONTACT_CONFIG.serviceID,
        CONTACT_CONFIG.templateID,
        formData
    ).then(function(response) {
        console.log('✅ Email enviado:', response);
        
        // LIMPIAR FORMULARIO
        form.reset();
        
        // Resetear reCAPTCHA
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
        }
        
        // Remover mensajes de error
        const errorElement = document.querySelector('.form-error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // MOSTRAR MODAL DE ÉXITO
        mostrarModalExitoV7();
        
    }).catch(function(error) {
        console.error('❌ Error:', error);
        showContactFormError('Error al enviar el mensaje. Por favor intenta de nuevo.');
    }).finally(() => {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
    
    return false;
}

// FUNCIÓN MODAL DE ÉXITO
function mostrarModalExitoV7() {
    console.log('🎉 Mostrando modal de éxito V7');
    
    // REMOVER MODALES ANTERIORES
    const existingModals = document.querySelectorAll('[id*="modal"], [class*="modal"]');
    existingModals.forEach(modal => modal.remove());
    
    // CREAR MODAL
    const modalHTML = `
        <div id="modal-exito-v7" style="
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.8) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 999999 !important;
        ">
            <div style="
                background: white;
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div style="
                    font-size: 60px;
                    color: #28a745;
                    margin-bottom: 20px;
                ">
                    ✅
                </div>
                
                <h3 style="
                    color: #182c72;
                    margin-bottom: 15px;
                    font-size: 1.8rem;
                ">¡Mensaje Enviado Exitosamente!</h3>
                
                <p style="
                    color: #333;
                    line-height: 1.6;
                    margin: 15px 0;
                ">Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
                
                <div style="
                    background: #e7f3ff;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    border-left: 4px solid #2196F3;
                ">
                    <p style="margin: 0; color: #0c5460;">
                        🛡️ <strong>Tu mensaje fue protegido por reCAPTCHA</strong><br>
                        ⏰ Tiempo de respuesta: 24-48 horas
                    </p>
                </div>
                
                <button onclick="cerrarModalV7()" style="
                    background: #182c72;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-top: 15px;
                    transition: all 0.3s ease;
                ">Entendido</button>
            </div>
        </div>
    `;
    
    // INSERTAR EN EL BODY
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // AUTO-CERRAR DESPUÉS DE 8 SEGUNDOS
    setTimeout(() => {
        cerrarModalV7();
    }, 8000);
}

// FUNCIÓN PARA CERRAR MODAL
function cerrarModalV7() {
    const modal = document.getElementById('modal-exito-v7');
    if (modal) {
        modal.remove();
        console.log('❌ Modal cerrado');
    }
}

// FUNCIÓN DE CONFIGURACIÓN PRINCIPAL
function configurarFormularioV7() {
    console.log('🔧 configurarFormularioV7() - CON reCAPTCHA');
    
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('❌ No se encontró el formulario contactForm');
        return;
    }
    
    console.log('📋 Formulario encontrado:', form);
    
    // PASO 1: ELIMINAR TODOS LOS EVENT LISTENERS EXISTENTES
    console.log('🗑️ Eliminando todos los event listeners existentes...');
    
    // Clonamos el formulario para eliminar TODOS los listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    console.log('✅ Formulario clonado - listeners anteriores eliminados');
    
    // PASO 2: AGREGAR NUESTRO LISTENER ÚNICO
    console.log('➕ Agregando nuestro event listener con reCAPTCHA...');
    
    const finalForm = document.getElementById('contactForm');
    finalForm.addEventListener('submit', enviarFormularioContactoV7);
    
    console.log('✅ Event listener con reCAPTCHA agregado - Configuración completa');
    
    // VERIFICACIÓN
    console.log('🔍 Verificación final:');
    console.log('- Formulario ID:', finalForm.id);
    console.log('- reCAPTCHA protection: ENABLED');
    console.log('- Event listener configurado correctamente');
}

// INICIALIZACIÓN MÚLTIPLE PARA ASEGURAR CARGA
console.log('🔄 Configurando inicialización múltiple...');

// Método 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM cargado - Configurando...');
    setTimeout(configurarFormularioV7, 100);
});

// Método 2: Si DOM ya está listo
if (document.readyState === 'loading') {
    console.log('⏳ DOM aún cargando...');
    document.addEventListener('DOMContentLoaded', configurarFormularioV7);
} else {
    console.log('⚡ DOM ya listo - Configurando inmediatamente...');
    configurarFormularioV7();
}

// Método 3: Timeout de seguridad
setTimeout(() => {
    console.log('⏰ Timeout de seguridad - Configurando...');
    configurarFormularioV7();
}, 500);

// Método 4: Window load (por si acaso)
window.addEventListener('load', function() {
    console.log('🌐 Window load - Configuración final...');
    setTimeout(configurarFormularioV7, 200);
});

// Hacer funciones disponibles globalmente
window.cerrarModalV7 = cerrarModalV7;
window.validateContactRecaptcha = validateContactRecaptcha;

console.log('✅ contact-handler-v7.js CON reCAPTCHA completamente cargado');
