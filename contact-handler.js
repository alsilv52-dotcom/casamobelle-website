// Configuración EmailJS para formulario de contacto
const CONTACT_CONFIG = {
    serviceID: 'service_i8ylqzi',  // Mismo service ID que funciona en cotización
    templateID: 'template_i5irfjo', // Template específico para contacto
    publicKey: 'Wg5X527MYMwivPKvs'  // Misma public key que funciona en cotización
};

// Inicializar EmailJS
(function() {
    emailjs.init(CONTACT_CONFIG.publicKey);
})();

// Función para enviar formulario de contacto
async function enviarFormularioContacto(event) {
    event.preventDefault();
    event.stopImmediatePropagation(); // Prevenir que otros handlers se ejecuten
    
    console.log('📤 enviarFormularioContacto() ejecutándose...');
    
    // Obtener elementos del formulario
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Validar formulario
    if (!validarFormularioContacto()) {
        return false;
    }
    
    // Preparar datos
    const formData = {
        nombre: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        telefono: document.getElementById('contactPhone').value.trim() || 'No proporcionado',
        asunto: document.getElementById('contactSubject').value,
        mensaje: document.getElementById('contactMessage').value.trim()
    };
    
    // Actualizar botón
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Enviar email
        const result = await emailjs.send(
            CONTACT_CONFIG.serviceID,
            CONTACT_CONFIG.templateID,
            formData
        );
        
        console.log('Formulario de contacto enviado:', result);
        
        // Mostrar éxito
        mostrarMensajeExitoContacto();
        
        // Limpiar formulario
        form.reset();
        
    } catch (error) {
        console.error('Error al enviar formulario de contacto:', error);
        mostrarMensajeErrorContacto();
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Validación del formulario de contacto
function validarFormularioContacto() {
    let isValid = true;
    
    // Limpiar errores previos
    limpiarErrores();
    
    // Validar nombre
    const nombre = document.getElementById('contactName').value.trim();
    if (!nombre || nombre.length < 2) {
        mostrarError('contactName', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('contactEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        mostrarError('contactEmail', 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validar teléfono (opcional pero si se proporciona debe ser válido)
    const telefono = document.getElementById('contactPhone').value.trim();
    if (telefono) {
        const telefonoRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
            mostrarError('contactPhone', 'Por favor ingresa un teléfono válido');
            isValid = false;
        }
    }
    
    // Validar asunto
    const asunto = document.getElementById('contactSubject').value;
    if (!asunto) {
        mostrarError('contactSubject', 'Por favor selecciona un asunto');
        isValid = false;
    }
    
    // Validar mensaje
    const mensaje = document.getElementById('contactMessage').value.trim();
    if (!mensaje || mensaje.length < 10) {
        mostrarError('contactMessage', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Funciones auxiliares para manejo de errores
function limpiarErrores() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const inputsWithError = document.querySelectorAll('.form-control.error');
    inputsWithError.forEach(input => input.classList.remove('error'));
}

function mostrarError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Mensajes de éxito y error
function mostrarMensajeExitoContacto() {
    console.log('🎯 mostrarMensajeExitoContacto() llamada - Versión mejorada');
    
    // Limpiar modales anteriores
    const existingModals = document.querySelectorAll('.success-modal, .error-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Crear modal de éxito
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.id = 'contacto-success-modal-v2';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Mensaje Enviado Exitosamente!</h3>
                <p>Hemos recibido tu consulta y queremos confirmarte que nuestro equipo la revisará cuidadosamente.</p>
                <p>Te hemos enviado un email de confirmación a la dirección proporcionada y te responderemos en las próximas <strong>24 horas</strong>.</p>
                
                <div class="info-box">
                    <h4><i class="fas fa-clock"></i> ¿Qué sigue ahora?</h4>
                    <div class="process-steps">
                        <div class="step-item">
                            <span class="step-number">1</span>
                            <span class="step-text">Revisión de tu consulta</span>
                        </div>
                        <div class="step-item">
                            <span class="step-number">2</span>
                            <span class="step-text">Asignación a especialista</span>
                        </div>
                        <div class="step-item">
                            <span class="step-number">3</span>
                            <span class="step-text">Contacto personalizado</span>
                        </div>
                    </div>
                </div>
                
                <div class="contact-options">
                    <p style="margin-bottom: 15px; font-size: 0.95rem; color: #666;">
                        <i class="fas fa-info-circle"></i> ¿Necesitas respuesta urgente?
                    </p>
                    <div class="urgent-contact">
                        <a href="https://wa.me/5217222896977?text=Hola%20Casa%20Mobelle%2C%20acabo%20de%20enviar%20un%20mensaje%20por%20el%20sitio%20web%20y%20necesito%20respuesta%20urgente" 
                           target="_blank" class="btn-whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp directo
                        </a>
                        <a href="tel:+527222713638" class="btn-phone">
                            <i class="fas fa-phone"></i> Llamar ahora
                        </a>
                    </div>
                </div>
                
                <button onclick="cerrarModalContacto()" class="btn-primary">Perfecto, entendido</button>
            </div>
        </div>
    `;
    
    // Agregar estilos mejorados del modal
    const style = document.createElement('style');
    style.textContent = `
        .success-modal .modal-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.8) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 10000 !important;
            animation: modalFadeIn 0.3s ease-out;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .success-modal .modal-content {
            background: white;
            border-radius: 16px;
            padding: 40px 35px;
            max-width: 520px;
            width: 90%;
            margin: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            animation: modalSlideIn 0.4s ease-out;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        @keyframes modalSlideIn {
            from { 
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .success-modal .success-icon {
            margin-bottom: 25px;
        }
        
        .success-modal .success-icon i {
            font-size: 64px;
            color: #28a745;
            animation: successPulse 0.6s ease-out;
        }
        
        @keyframes successPulse {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .success-modal h3 {
            color: #182c72;
            margin-bottom: 20px;
            font-size: 1.8rem;
            font-weight: 700;
        }
        
        .success-modal p {
            color: #333;
            line-height: 1.6;
            margin: 15px 0;
            font-size: 1rem;
        }
        
        .success-modal .info-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 1px solid #dee2e6;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            text-align: left;
        }
        
        .success-modal .info-box h4 {
            color: #182c72;
            margin-bottom: 15px;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .success-modal .process-steps {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .success-modal .step-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
        }
        
        .success-modal .step-number {
            background: #182c72;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .success-modal .step-text {
            color: #555;
            font-size: 0.95rem;
        }
        
        .success-modal .contact-options {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .success-modal .urgent-contact {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .success-modal .btn-whatsapp {
            background: #25D366;
            color: white;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            flex: 1;
            justify-content: center;
            min-width: 130px;
        }
        
        .success-modal .btn-whatsapp:hover {
            background: #128C7E;
            transform: translateY(-2px);
        }
        
        .success-modal .btn-phone {
            background: #007bff;
            color: white;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            flex: 1;
            justify-content: center;
            min-width: 130px;
        }
        
        .success-modal .btn-phone:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        
        .success-modal .btn-primary {
            background: #182c72;
            color: white;
            border: none;
            padding: 14px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.05rem;
            font-weight: 600;
            transition: all 0.3s;
            margin-top: 20px;
            min-width: 200px;
        }
        
        .success-modal .btn-primary:hover {
            background: #142551;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(24, 44, 114, 0.3);
        }
        
        @media (max-width: 576px) {
            .success-modal .modal-content {
                padding: 30px 25px;
                margin: 10px;
            }
            
            .success-modal h3 {
                font-size: 1.5rem;
            }
            
            .success-modal .urgent-contact {
                flex-direction: column;
                align-items: stretch;
            }
            
            .success-modal .btn-whatsapp,
            .success-modal .btn-phone {
                min-width: auto;
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Cerrar modal automáticamente después de 12 segundos
    setTimeout(() => {
        cerrarModalContacto();
    }, 12000);
}

function cerrarModalContacto() {
    const modals = document.querySelectorAll('.success-modal, .error-modal');
    modals.forEach(modal => modal.remove());
}

function mostrarMensajeErrorContacto() {
    // Crear modal de error
    const modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Error al Enviar Mensaje</h3>
                <p>Ha ocurrido un error temporal al procesar tu consulta. Esto puede deberse a problemas de conectividad.</p>
                
                <div class="error-suggestions">
                    <h4><i class="fas fa-lightbulb"></i> ¿Qué puedes hacer?</h4>
                    <ul>
                        <li>Verificar tu conexión a internet</li>
                        <li>Intentar enviar el mensaje nuevamente</li>
                        <li>Contactarnos directamente por WhatsApp o teléfono</li>
                    </ul>
                </div>
                
                <div class="alternative-contact">
                    <h4><i class="fas fa-phone-alt"></i> Contáctanos directamente:</h4>
                    <div class="contact-buttons">
                        <a href="https://wa.me/5217222896977?text=Hola%20Casa%20Mobelle%2C%20intenté%20enviar%20un%20mensaje%20por%20el%20sitio%20web%20pero%20tuve%20problemas%20técnicos" 
                           target="_blank" class="btn-whatsapp">
                            <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
                        </a>
                        <a href="tel:+527222713638" class="btn-phone">
                            <i class="fas fa-phone"></i> Llamar al 722 271 3638
                        </a>
                    </div>
                    <p class="business-hours">
                        <i class="fas fa-clock"></i> 
                        <strong>Horarios:</strong> Lun-Vie 9:00-18:30 | Sáb 9:00-16:00
                    </p>
                </div>
                
                <div class="modal-footer">
                    <button onclick="cerrarModalContacto()" class="btn-secondary">Intentar de nuevo</button>
                </div>
            </div>
        </div>
    `;
    
    // Agregar estilos del modal de error
    const style = document.createElement('style');
    style.textContent = `
        .error-modal .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease-out;
        }
        
        .error-modal .modal-content {
            background: white;
            border-radius: 16px;
            padding: 35px;
            max-width: 520px;
            width: 90%;
            margin: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.4s ease-out;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .error-modal .error-icon {
            margin-bottom: 20px;
        }
        
        .error-modal .error-icon i {
            font-size: 56px;
            color: #dc3545;
            animation: errorShake 0.6s ease-out;
        }
        
        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .error-modal h3 {
            color: #dc3545;
            margin-bottom: 15px;
            font-size: 1.6rem;
            font-weight: 700;
        }
        
        .error-modal p {
            color: #333;
            line-height: 1.6;
            margin: 15px 0;
        }
        
        .error-modal .error-suggestions {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        
        .error-modal .error-suggestions h4 {
            color: #495057;
            margin-bottom: 12px;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .error-modal .error-suggestions ul {
            margin: 0;
            padding-left: 20px;
            color: #666;
        }
        
        .error-modal .error-suggestions li {
            margin: 5px 0;
            line-height: 1.4;
        }
        
        .error-modal .alternative-contact {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .error-modal .alternative-contact h4 {
            color: #856404;
            margin-bottom: 15px;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }
        
        .error-modal .contact-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }
        
        .error-modal .btn-whatsapp {
            background: #25D366;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            justify-content: center;
            min-width: 160px;
        }
        
        .error-modal .btn-whatsapp:hover {
            background: #128C7E;
            transform: translateY(-2px);
        }
        
        .error-modal .btn-phone {
            background: #007bff;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            justify-content: center;
            min-width: 160px;
        }
        
        .error-modal .btn-phone:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        
        .error-modal .business-hours {
            font-size: 0.85rem;
            color: #856404;
            margin: 10px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        
        .error-modal .btn-secondary {
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s;
            margin-top: 15px;
        }
        
        .error-modal .btn-secondary:hover {
            background: #545b62;
            transform: translateY(-2px);
        }
        
        @media (max-width: 576px) {
            .error-modal .modal-content {
                padding: 25px 20px;
                margin: 10px;
            }
            
            .error-modal .contact-buttons {
                flex-direction: column;
                align-items: stretch;
            }
            
            .error-modal .btn-whatsapp,
            .error-modal .btn-phone {
                min-width: auto;
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
}

function cerrarModal() {
    const modals = document.querySelectorAll('.success-modal, .error-modal');
    modals.forEach(modal => modal.remove());
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('🔧 Configurando formulario de contacto...');
        
        // REMOVER TODOS LOS EVENT LISTENERS EXISTENTES
        const newForm = contactForm.cloneNode(true);
        contactForm.parentNode.replaceChild(newForm, contactForm);
        console.log('🗑️ Event listeners anteriores removidos');
        
        // AGREGAR NUESTRO EVENT LISTENER
        newForm.addEventListener('submit', enviarFormularioContacto);
        console.log('✅ Nuevo event listener agregado');
        
        // Limpiar errores al escribir
        const inputs = newForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    }
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModalContacto();
        }
    });
});

// CSS adicional para errores
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-control.error {
        border-color: #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.05) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 5px;
        font-weight: 500;
    }
`;
document.head.appendChild(errorStyles);