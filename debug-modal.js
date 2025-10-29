// Versión de debug del modal de éxito
function mostrarMensajeExitoDebug() {
    console.log('🚀 DEBUG: Iniciando mostrarMensajeExitoDebug');
    
    // Remover modales existentes
    const existingModals = document.querySelectorAll('.success-modal, .error-modal, .modal-overlay');
    existingModals.forEach(modal => {
        console.log('🗑️ Removiendo modal existente:', modal.className);
        modal.remove();
    });
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'success-modal-debug';
    modal.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(0, 0, 0, 0.8) !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        z-index: 99999 !important;
        font-family: Arial, sans-serif !important;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white !important;
            border-radius: 16px !important;
            padding: 40px !important;
            max-width: 520px !important;
            width: 90% !important;
            margin: 20px !important;
            text-align: center !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
            position: relative !important;
        ">
            <div style="margin-bottom: 25px !important;">
                <i class="fas fa-check-circle" style="
                    font-size: 64px !important;
                    color: #28a745 !important;
                "></i>
            </div>
            
            <h3 style="
                color: #182c72 !important;
                margin-bottom: 20px !important;
                font-size: 1.8rem !important;
                font-weight: 700 !important;
            ">¡Mensaje Enviado Exitosamente!</h3>
            
            <p style="color: #333 !important; line-height: 1.6 !important; margin: 15px 0 !important;">
                Hemos recibido tu consulta y queremos confirmarte que nuestro equipo la revisará cuidadosamente.
            </p>
            
            <p style="color: #333 !important; line-height: 1.6 !important; margin: 15px 0 !important;">
                Te hemos enviado un email de confirmación y te responderemos en las próximas <strong>24 horas</strong>.
            </p>
            
            <div style="
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
                border: 1px solid #dee2e6 !important;
                border-radius: 12px !important;
                padding: 20px !important;
                margin: 25px 0 !important;
                text-align: left !important;
            ">
                <h4 style="
                    color: #182c72 !important;
                    margin-bottom: 15px !important;
                    font-size: 1.1rem !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                ">
                    <i class="fas fa-clock"></i> ¿Qué sigue ahora?
                </h4>
                
                <div style="display: flex !important; flex-direction: column !important; gap: 10px !important;">
                    <div style="display: flex !important; align-items: center !important; gap: 12px !important; padding: 8px 0 !important;">
                        <span style="
                            background: #182c72 !important;
                            color: white !important;
                            width: 24px !important;
                            height: 24px !important;
                            border-radius: 50% !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            font-size: 0.85rem !important;
                            font-weight: 600 !important;
                        ">1</span>
                        <span style="color: #555 !important; font-size: 0.95rem !important;">Revisión de tu consulta</span>
                    </div>
                    <div style="display: flex !important; align-items: center !important; gap: 12px !important; padding: 8px 0 !important;">
                        <span style="
                            background: #182c72 !important;
                            color: white !important;
                            width: 24px !important;
                            height: 24px !important;
                            border-radius: 50% !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            font-size: 0.85rem !important;
                            font-weight: 600 !important;
                        ">2</span>
                        <span style="color: #555 !important; font-size: 0.95rem !important;">Asignación a especialista</span>
                    </div>
                    <div style="display: flex !important; align-items: center !important; gap: 12px !important; padding: 8px 0 !important;">
                        <span style="
                            background: #182c72 !important;
                            color: white !important;
                            width: 24px !important;
                            height: 24px !important;
                            border-radius: 50% !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            font-size: 0.85rem !important;
                            font-weight: 600 !important;
                        ">3</span>
                        <span style="color: #555 !important; font-size: 0.95rem !important;">Contacto personalizado</span>
                    </div>
                </div>
            </div>
            
            <div style="
                background: #fff3cd !important;
                border: 1px solid #ffeaa7 !important;
                border-radius: 8px !important;
                padding: 15px !important;
                margin: 20px 0 !important;
            ">
                <p style="margin-bottom: 15px !important; font-size: 0.95rem !important; color: #666 !important;">
                    <i class="fas fa-info-circle"></i> ¿Necesitas respuesta urgente?
                </p>
                <div style="display: flex !important; gap: 10px !important; justify-content: center !important; flex-wrap: wrap !important;">
                    <a href="https://wa.me/5217222896977?text=Hola%20Casa%20Mobelle%2C%20acabo%20de%20enviar%20un%20mensaje%20por%20el%20sitio%20web" 
                       target="_blank" 
                       style="
                           background: #25D366 !important;
                           color: white !important;
                           text-decoration: none !important;
                           padding: 10px 16px !important;
                           border-radius: 6px !important;
                           font-size: 0.9rem !important;
                           font-weight: 600 !important;
                           display: inline-flex !important;
                           align-items: center !important;
                           gap: 6px !important;
                       ">
                        <i class="fab fa-whatsapp"></i> WhatsApp directo
                    </a>
                    <a href="tel:+527222713638" 
                       style="
                           background: #007bff !important;
                           color: white !important;
                           text-decoration: none !important;
                           padding: 10px 16px !important;
                           border-radius: 6px !important;
                           font-size: 0.9rem !important;
                           font-weight: 600 !important;
                           display: inline-flex !important;
                           align-items: center !important;
                           gap: 6px !important;
                       ">
                        <i class="fas fa-phone"></i> Llamar ahora
                    </a>
                </div>
            </div>
            
            <button onclick="cerrarModalDebug()" style="
                background: #182c72 !important;
                color: white !important;
                border: none !important;
                padding: 14px 30px !important;
                border-radius: 8px !important;
                cursor: pointer !important;
                font-size: 1.05rem !important;
                font-weight: 600 !important;
                margin-top: 20px !important;
                min-width: 200px !important;
            ">Perfecto, entendido</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('✅ Modal de debug creado y agregado al DOM');
    
    // Crear función para cerrar
    window.cerrarModalDebug = function() {
        console.log('🚪 Cerrando modal de debug');
        modal.remove();
    };
    
    // Auto-cerrar después de 15 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            console.log('⏰ Auto-cerrando modal de debug');
            modal.remove();
        }
    }, 15000);
}

console.log('🔧 Función mostrarMensajeExitoDebug cargada. Úsala con: mostrarMensajeExitoDebug()');
