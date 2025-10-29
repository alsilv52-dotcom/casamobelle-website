/**
 * Script de depuración para EmailJS - Casa Mobelle
 * Este script ayuda a identificar problemas comunes
 */

console.log('🔧 DEBUG EmailJS - Iniciando diagnóstico...');

// Función de diagnóstico automático
function diagnosticoCompleto() {
    console.log('\n=== 🔍 DIAGNÓSTICO COMPLETO EmailJS ===\n');
    
    // 1. Verificar carga de EmailJS
    console.log('1️⃣ Verificando carga de EmailJS...');
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS NO está cargado');
        console.log('💡 Solución: Verifica que este script esté en tu HTML ANTES de email-handler.js:');
        console.log('   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>');
        return false;
    } else {
        console.log('✅ EmailJS está cargado correctamente');
        console.log('   Versión:', emailjs.version || 'No disponible');
    }
    
    // 2. Verificar configuración
    console.log('\n2️⃣ Verificando configuración...');
    if (typeof window.EMAILJS_CONFIG !== 'undefined') {
        console.log('✅ Configuración encontrada:');
        console.log('   PUBLIC_KEY:', window.EMAILJS_CONFIG?.PUBLIC_KEY ? '✅ Configurado' : '❌ Faltante');
        console.log('   SERVICE_ID:', window.EMAILJS_CONFIG?.SERVICE_ID ? '✅ Configurado' : '❌ Faltante');
        console.log('   TEMPLATE_CLIENTE:', window.EMAILJS_CONFIG?.TEMPLATE_CLIENTE ? '✅ Configurado' : '❌ Faltante');
        console.log('   TEMPLATE_ADMIN:', window.EMAILJS_CONFIG?.TEMPLATE_ADMIN ? '✅ Configurado' : '❌ Faltante');
    } else {
        console.error('❌ No se encontró EMAILJS_CONFIG');
        console.log('💡 Verifica que email-handler.js se esté cargando correctamente');
    }
    
    // 3. Verificar funciones principales
    console.log('\n3️⃣ Verificando funciones principales...');
    const funciones = [
        'procesarFormularioCotizacion',
        'diagnosticarEmailJS',
        'cerrarModal'
    ];
    
    funciones.forEach(nombreFuncion => {
        if (typeof window[nombreFuncion] === 'function') {
            console.log(`✅ ${nombreFuncion} está disponible`);
        } else {
            console.error(`❌ ${nombreFuncion} NO está disponible`);
        }
    });
    
    // 4. Verificar elementos del DOM
    console.log('\n4️⃣ Verificando elementos del formulario...');
    const elementos = {
        'cotizacionForm': 'Formulario principal',
        'nombre': 'Campo nombre',
        'email': 'Campo email',
        'telefono': 'Campo teléfono',
        'descripcion': 'Campo descripción',
        'fileInput': 'Input de archivos'
    };
    
    Object.entries(elementos).forEach(([id, descripcion]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            console.log(`✅ ${descripcion} encontrado`);
        } else {
            console.error(`❌ ${descripcion} NO encontrado (ID: ${id})`);
        }
    });
    
    // 5. Verificar CSS
    console.log('\n5️⃣ Verificando estilos CSS...');
    const estilos = [
        'styles.css',
        'cotiza-styles.css',
        'modal-styles.css'
    ];
    
    estilos.forEach(archivo => {
        const link = document.querySelector(`link[href*="${archivo}"]`);
        if (link) {
            console.log(`✅ ${archivo} cargado`);
        } else {
            console.warn(`⚠️ ${archivo} NO encontrado`);
        }
    });
    
    // 6. Probar inicialización de EmailJS
    console.log('\n6️⃣ Probando inicialización de EmailJS...');
    try {
        if (window.EMAILJS_CONFIG?.PUBLIC_KEY) {
            emailjs.init({
                publicKey: window.EMAILJS_CONFIG.PUBLIC_KEY,
            });
            console.log('✅ EmailJS inicializado correctamente');
        } else {
            console.error('❌ No se puede inicializar: PUBLIC_KEY no encontrado');
        }
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
    }
    
    console.log('\n=== 🏁 FIN DEL DIAGNÓSTICO ===\n');
    
    // Mensaje final
    console.log('💡 PRÓXIMOS PASOS:');
    console.log('1. Si ves errores ❌, soluciónals primero');
    console.log('2. Si todo está ✅, prueba el formulario');
    console.log('3. Ejecuta: llenarFormularioPrueba() para prueba automática');
    console.log('4. O llena el formulario manualmente y envía');
    
    return true;
}

// Función para capturar errores en tiempo real
function capturarErrores() {
    // Capturar errores de JavaScript
    window.addEventListener('error', function(e) {
        console.error('🚨 ERROR CAPTURADO:', {
            mensaje: e.message,
            archivo: e.filename,
            linea: e.lineno,
            columna: e.colno,
            error: e.error
        });
        
        if (e.message.includes('emailjs') || e.filename.includes('email')) {
            console.log('💡 Este parece ser un error relacionado con EmailJS');
            console.log('   Ejecuta diagnosticoCompleto() para más información');
        }
    });
    
    // Capturar promesas rechazadas
    window.addEventListener('unhandledrejection', function(e) {
        console.error('🚨 PROMESA RECHAZADA:', e.reason);
        
        if (e.reason?.message?.includes('emailjs') || 
            e.reason?.message?.includes('403') || 
            e.reason?.message?.includes('Invalid')) {
            console.log('💡 Este parece ser un error de EmailJS');
            console.log('   Verifica tu configuración en EmailJS dashboard');
        }
    });
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Debug EmailJS cargado');
    capturarErrores();
    
    // Esperar un momento para que otros scripts se carguen
    setTimeout(() => {
        diagnosticoCompleto();
    }, 1000);
});

// Hacer función disponible globalmente
window.diagnosticoCompleto = diagnosticoCompleto;

// Función para probar específicamente las credenciales de EmailJS
function probarCredencialesEmailJS() {
    console.log('\n🔐 PROBANDO CREDENCIALES EmailJS...\n');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado');
        return;
    }
    
    if (!window.EMAILJS_CONFIG) {
        console.error('❌ Configuración EMAILJS_CONFIG no encontrada');
        return;
    }
    
    const config = window.EMAILJS_CONFIG;
    console.log('📋 Configuración actual:');
    console.log(`   PUBLIC_KEY: ${config.PUBLIC_KEY}`);
    console.log(`   SERVICE_ID: ${config.SERVICE_ID}`);
    console.log(`   TEMPLATE_CLIENTE: ${config.TEMPLATE_CLIENTE}`);
    console.log('   ℹ️  Solo se enviará email al cliente (EmailJS te envía copia automática)');
    
    // Probar inicialización
    console.log('\n🚀 Probando inicialización...');
    try {
        emailjs.init({
            publicKey: config.PUBLIC_KEY
        });
        console.log('✅ Inicialización exitosa');
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
        return;
    }
    
    // Probar envío con datos mínimos
    console.log('\n📤 Probando envío de email al cliente...');
    
    const templateParams = {
        nombre: 'PRUEBA SISTEMA',
        email: 'test@test.com',
        telefono: '5555555555',
        ciudad: 'Ciudad de México',
        codigoPostal: '06100',
        tipoProyecto: 'Cocina integral',
        descripcion: 'Esta es una prueba automática del sistema EmailJS'
    };
    
    console.log('📝 Parámetros de prueba:', templateParams);
    
    // Probar solo template de cliente
    emailjs.send(config.SERVICE_ID, config.TEMPLATE_CLIENTE, templateParams)
        .then((response) => {
            console.log('✅ ÉXITO - Email enviado correctamente:', response);
            console.log('   Status:', response.status);
            console.log('   Text:', response.text);
            console.log('\n🎉 ¡PRUEBA EXITOSA!');
            console.log('💡 El formulario está funcionando correctamente.');
            console.log('� EmailJS debería enviarte una copia automáticamente.');
        })
        .catch((error) => {
            console.error('❌ ERROR en envío:', error);
            console.log('\n🔍 Detalles del error:');
            console.log('   Status:', error.status);
            console.log('   Message:', error.message || 'Sin mensaje');
            console.log('   Text:', error.text || 'Sin texto');
            
            // Análisis específico del error
            if (error.status === 400) {
                console.log('\n💡 ERROR 400 - Bad Request:');
                console.log('   - Verifica que el Template ID sea correcto: template_s60kolv');
                console.log('   - Verifica que el Service ID sea correcto: service_i8ylqzi');
                console.log('   - Revisa que el template tenga las variables correctas');
            } else if (error.status === 403) {
                console.log('\n💡 ERROR 403 - Forbidden:');
                console.log('   - La Public Key es incorrecta');
                console.log('   - El servicio no está activo en EmailJS');
                console.log('   - Has excedido el límite de emails del plan gratuito');
            } else if (error.status === 404) {
                console.log('\n💡 ERROR 404 - Not Found:');
                console.log('   - El Service ID no existe');
                console.log('   - El Template ID no existe');
                console.log('   - Verifica los IDs en tu dashboard de EmailJS');
            } else {
                console.log('\n💡 Error de red o configuración:');
                console.log('   - Problema de conexión a internet');
                console.log('   - Firewall bloqueando EmailJS');
                console.log('   - Error temporal del servicio');
            }
        });
}

// Hacer funciones disponibles globalmente
window.probarCredencialesEmailJS = probarCredencialesEmailJS;
