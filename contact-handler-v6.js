// CONTACT HANDLER V6.0 - SOLUCION DEFINITIVA
// Este script debe cargar AL FINAL para tomar precedencia completa

console.log('🚀 contact-handler-v6.js cargando...');

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

// FUNCIÓN PRINCIPAL - ENVÍO DE FORMULARIO
function enviarFormularioContactoV6(event) {
    console.log('🎯 enviarFormularioContactoV6() - HANDLER DEFINITIVO');
    
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
    
    // OBTENER DATOS
    const formData = {
        nombre: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        telefono: document.getElementById('contactPhone').value.trim() || 'No proporcionado',
        asunto: document.getElementById('contactSubject').value,
        mensaje: document.getElementById('contactMessage').value.trim()
    };
    
    console.log('📤 Datos a enviar:', formData);
    
    // VALIDACIÓN BÁSICA
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert('Por favor completa todos los campos requeridos');
        return false;
    }
    
    // ENVIAR CON EMAILJS
    emailjs.send(
        CONTACT_CONFIG.serviceID,
        CONTACT_CONFIG.templateID,
        formData
    ).then(function(response) {
        console.log('✅ Email enviado:', response);
        
        // LIMPIAR FORMULARIO
        form.reset();
        
        // MOSTRAR MODAL DE ÉXITO
        mostrarModalExitoV6();
        
    }).catch(function(error) {
        console.error('❌ Error:', error);
        alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
    });
    
    return false;
}

// FUNCIÓN MODAL DE ÉXITO
function mostrarModalExitoV6() {
    console.log('🎉 Mostrando modal de éxito V6');
    
    // REMOVER MODALES ANTERIORES
    const existingModals = document.querySelectorAll('[id*="modal"], [class*="modal"]');
    existingModals.forEach(modal => modal.remove());
    
    // CREAR MODAL
    const modalHTML = `
        <div id="modal-exito-v6" style="
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
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                ">
                    <p style="margin: 0; color: #666;">
                        ⏰ <strong>Tiempo de respuesta:</strong> 24-48 horas
                    </p>
                </div>
                
                <button onclick="cerrarModalV6()" style="
                    background: #182c72;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-top: 15px;
                ">Entendido</button>
            </div>
        </div>
    `;
    
    // INSERTAR EN EL BODY
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // AUTO-CERRAR DESPUÉS DE 8 SEGUNDOS
    setTimeout(() => {
        cerrarModalV6();
    }, 8000);
}

// FUNCIÓN PARA CERRAR MODAL
function cerrarModalV6() {
    const modal = document.getElementById('modal-exito-v6');
    if (modal) {
        modal.remove();
        console.log('❌ Modal cerrado');
    }
}

// FUNCIÓN DE CONFIGURACIÓN PRINCIPAL
function configurarFormularioV6() {
    console.log('🔧 configurarFormularioV6() - CONFIGURACIÓN DEFINITIVA');
    
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
    console.log('➕ Agregando nuestro event listener...');
    
    const finalForm = document.getElementById('contactForm');
    finalForm.addEventListener('submit', enviarFormularioContactoV6);
    
    console.log('✅ Event listener agregado - Configuración completa');
    
    // VERIFICACIÓN
    console.log('🔍 Verificación final:');
    console.log('- Formulario ID:', finalForm.id);
    console.log('- Event listener configurado correctamente');
}

// INICIALIZACIÓN MÚLTIPLE PARA ASEGURAR CARGA
console.log('🔄 Configurando inicialización múltiple...');

// Método 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM cargado - Configurando...');
    setTimeout(configurarFormularioV6, 100);
});

// Método 2: Si DOM ya está listo
if (document.readyState === 'loading') {
    console.log('⏳ DOM aún cargando...');
    document.addEventListener('DOMContentLoaded', configurarFormularioV6);
} else {
    console.log('⚡ DOM ya listo - Configurando inmediatamente...');
    configurarFormularioV6();
}

// Método 3: Timeout de seguridad
setTimeout(() => {
    console.log('⏰ Timeout de seguridad - Configurando...');
    configurarFormularioV6();
}, 500);

// Método 4: Window load (por si acaso)
window.addEventListener('load', function() {
    console.log('🌐 Window load - Configuración final...');
    setTimeout(configurarFormularioV6, 200);
});

console.log('✅ contact-handler-v6.js completamente cargado');
