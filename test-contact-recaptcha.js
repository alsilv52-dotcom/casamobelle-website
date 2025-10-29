/**
 * Script de prueba para verificar reCAPTCHA en formulario de contacto
 * Ejecutar en la consola del navegador
 */

console.log('🔍 Iniciando pruebas de reCAPTCHA en formulario de contacto...');

// Verificar que reCAPTCHA esté cargado
function testContactRecaptchaLoaded() {
    if (typeof grecaptcha !== 'undefined') {
        console.log('✅ reCAPTCHA está cargado correctamente');
        return true;
    } else {
        console.log('❌ reCAPTCHA no está cargado');
        return false;
    }
}

// Verificar que el widget esté presente
function testContactRecaptchaWidget() {
    const widget = document.querySelector('.g-recaptcha');
    if (widget) {
        console.log('✅ Widget reCAPTCHA encontrado en formulario de contacto');
        console.log('   Site Key:', widget.getAttribute('data-sitekey'));
        console.log('   Tema:', widget.getAttribute('data-theme'));
        console.log('   Tamaño:', widget.getAttribute('data-size'));
        return true;
    } else {
        console.log('❌ Widget reCAPTCHA no encontrado');
        return false;
    }
}

// Verificar estilos CSS
function testContactRecaptchaStyles() {
    const container = document.querySelector('.recaptcha-container');
    if (container) {
        const styles = window.getComputedStyle(container);
        console.log('✅ Contenedor reCAPTCHA encontrado');
        console.log('   Padding:', styles.padding);
        console.log('   Background:', styles.backgroundColor);
        console.log('   Border radius:', styles.borderRadius);
        return true;
    } else {
        console.log('❌ Contenedor reCAPTCHA no encontrado');
        return false;
    }
}

// Simular llenar el formulario de contacto
function fillContactTestForm() {
    console.log('📝 Llenando formulario de contacto de prueba...');
    
    // Llenar campos de texto
    const campos = {
        'contactName': 'Juan Pérez',
        'contactEmail': 'juan.perez@email.com',
        'contactPhone': '5555555555',
        'contactMessage': 'Consulta sobre diseño de cocina integral'
    };
    
    for (const [id, valor] of Object.entries(campos)) {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = valor;
            console.log(`✅ Campo ${id} llenado`);
        }
    }
    
    // Seleccionar asunto
    const subjectSelect = document.getElementById('contactSubject');
    if (subjectSelect) {
        subjectSelect.value = 'cotizacion';
        console.log('✅ Asunto seleccionado: Solicitud de cotización');
    }
    
    console.log('✅ Formulario de contacto de prueba llenado');
}

// Probar validación sin reCAPTCHA
function testContactValidationWithoutRecaptcha() {
    console.log('🧪 Probando validación de contacto sin reCAPTCHA...');
    
    fillContactTestForm();
    
    const form = document.getElementById('contactForm');
    if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        console.log('✅ Evento submit disparado');
    }
}

// Verificar funciones de validación específicas del contacto
function testContactValidationFunctions() {
    console.log('🔧 Verificando funciones de validación de contacto...');
    
    if (typeof window.validateContactRecaptcha === 'function') {
        console.log('✅ validateContactRecaptcha disponible');
    } else {
        console.log('❌ validateContactRecaptcha no disponible');
    }
    
    if (typeof window.cerrarModalV7 === 'function') {
        console.log('✅ cerrarModalV7 disponible');
    } else {
        console.log('❌ cerrarModalV7 no disponible');
    }
}

// Verificar que el handler V7 esté cargado
function testContactHandlerV7() {
    console.log('🔧 Verificando Contact Handler V7...');
    
    // Verificar en la consola si hay mensajes del handler
    const form = document.getElementById('contactForm');
    if (form) {
        console.log('✅ Formulario de contacto encontrado');
        
        // Verificar si tiene event listeners
        const listeners = getEventListeners ? getEventListeners(form) : 'No disponible en esta consola';
        console.log('Event listeners:', listeners);
        
        return true;
    } else {
        console.log('❌ Formulario de contacto no encontrado');
        return false;
    }
}

// Ejecutar todas las pruebas
function runAllContactRecaptchaTests() {
    console.log('🚀 Ejecutando todas las pruebas de reCAPTCHA en formulario de contacto...\n');
    
    testContactRecaptchaLoaded();
    testContactRecaptchaWidget();
    testContactRecaptchaStyles();
    testContactValidationFunctions();
    testContactHandlerV7();
    
    console.log('\n🧪 Para probar validación sin reCAPTCHA, ejecuta: testContactValidationWithoutRecaptcha()');
    console.log('📝 Para llenar formulario de prueba, ejecuta: fillContactTestForm()');
    
    console.log('\n📋 Instrucciones:');
    console.log('1. Completa el reCAPTCHA manualmente');
    console.log('2. Ejecuta fillContactTestForm() para llenar el resto del formulario');
    console.log('3. Envía el formulario para probar la funcionalidad completa');
    console.log('4. Verifica que aparezca el modal de éxito con protección reCAPTCHA');
}

// Hacer funciones disponibles globalmente
window.testContactRecaptcha = {
    runAllContactRecaptchaTests,
    testContactRecaptchaLoaded,
    testContactRecaptchaWidget,
    testContactRecaptchaStyles,
    fillContactTestForm,
    testContactValidationWithoutRecaptcha,
    testContactValidationFunctions,
    testContactHandlerV7
};

// Ejecutar pruebas automáticamente
setTimeout(runAllContactRecaptchaTests, 1000);
