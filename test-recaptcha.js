/**
 * Script de prueba para verificar reCAPTCHA en formulario de cotización
 * Ejecutar en la consola del navegador
 */

console.log('🔍 Iniciando pruebas de reCAPTCHA...');

// Verificar que reCAPTCHA esté cargado
function testRecaptchaLoaded() {
    if (typeof grecaptcha !== 'undefined') {
        console.log('✅ reCAPTCHA está cargado correctamente');
        return true;
    } else {
        console.log('❌ reCAPTCHA no está cargado');
        return false;
    }
}

// Verificar que el widget esté presente
function testRecaptchaWidget() {
    const widget = document.querySelector('.g-recaptcha');
    if (widget) {
        console.log('✅ Widget reCAPTCHA encontrado en el DOM');
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
function testRecaptchaStyles() {
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

// Simular llenar el formulario
function fillTestForm() {
    console.log('📝 Llenando formulario de prueba...');
    
    // Seleccionar ubicación
    const ciudadBtn = document.querySelector('[data-value="cdmx"]');
    if (ciudadBtn) {
        ciudadBtn.click();
        console.log('✅ Ubicación seleccionada: CDMX');
    }
    
    // Seleccionar tipo de proyecto
    const proyectoBtn = document.querySelector('[data-value="cocina"]');
    if (proyectoBtn) {
        proyectoBtn.click();
        console.log('✅ Proyecto seleccionado: Cocina integral');
    }
    
    // Llenar campos de texto
    const campos = {
        'nombre': 'Juan Pérez',
        'telefono': '5555555555',
        'codigoPostal': '12345',
        'email': 'juan.perez@email.com',
        'descripcion': 'Cocina integral para casa de 3 recámaras'
    };
    
    for (const [id, valor] of Object.entries(campos)) {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = valor;
            console.log(`✅ Campo ${id} llenado`);
        }
    }
    
    console.log('✅ Formulario de prueba llenado');
}

// Probar validación sin reCAPTCHA
function testValidationWithoutRecaptcha() {
    console.log('🧪 Probando validación sin reCAPTCHA...');
    
    fillTestForm();
    
    const form = document.getElementById('cotizacionForm');
    if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        console.log('✅ Evento submit disparado');
    }
}

// Verificar que las funciones de validación estén disponibles
function testValidationFunctions() {
    console.log('🔧 Verificando funciones de validación...');
    
    if (typeof window.procesarFormularioCotizacion === 'function') {
        console.log('✅ procesarFormularioCotizacion disponible');
    } else {
        console.log('❌ procesarFormularioCotizacion no disponible');
    }
    
    if (typeof window.resetQuoteForm === 'function') {
        console.log('✅ resetQuoteForm disponible');
    } else {
        console.log('❌ resetQuoteForm no disponible');
    }
}

// Ejecutar todas las pruebas
function runAllTests() {
    console.log('🚀 Ejecutando todas las pruebas de reCAPTCHA...\n');
    
    testRecaptchaLoaded();
    testRecaptchaWidget();
    testRecaptchaStyles();
    testValidationFunctions();
    
    console.log('\n🧪 Para probar validación sin reCAPTCHA, ejecuta: testValidationWithoutRecaptcha()');
    console.log('📝 Para llenar formulario de prueba, ejecuta: fillTestForm()');
    
    console.log('\n📋 Instrucciones:');
    console.log('1. Completa el reCAPTCHA manualmente');
    console.log('2. Ejecuta fillTestForm() para llenar el resto del formulario');
    console.log('3. Envía el formulario para probar la funcionalidad completa');
}

// Hacer funciones disponibles globalmente
window.testRecaptcha = {
    runAllTests,
    testRecaptchaLoaded,
    testRecaptchaWidget,
    testRecaptchaStyles,
    fillTestForm,
    testValidationWithoutRecaptcha,
    testValidationFunctions
};

// Ejecutar pruebas automáticamente
setTimeout(runAllTests, 1000);
