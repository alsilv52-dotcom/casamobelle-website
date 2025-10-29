/**
 * Script de prueba para verificar la funcionalidad del formulario de cotización
 * Ejecutar este script en la consola del navegador para hacer una prueba
 */

// Función para probar el formulario con datos de ejemplo
function probarFormularioCotizacion() {
    console.log('🧪 Iniciando prueba del formulario de cotización...');
    
    // Verificar que EmailJS esté cargado
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado. Verifica que el script esté incluido en la página.');
        return false;
    }
    
    // Verificar que las funciones estén disponibles
    if (typeof window.procesarFormularioCotizacion !== 'function') {
        console.error('❌ La función procesarFormularioCotizacion no está disponible.');
        return false;
    }
    
    // Datos de prueba
    const datosPrueba = {
        nombre: 'Juan Pérez (PRUEBA)',
        email: 'juan.perez.prueba@example.com',
        telefono: '5551234567',
        ciudad: 'cdmx',
        otraCiudad: '',
        codigoPostal: '06100',
        tipoProyecto: 'cocina',
        otroProyecto: '',
        descripcion: 'Esta es una prueba del sistema de formularios. Solicito una cotización para una cocina integral de aproximadamente 15 metros lineales. Preferencia por materiales modernos y acabados en blanco.'
    };
    
    console.log('📝 Datos de prueba:', datosPrueba);
    
    // Simular envío
    window.procesarFormularioCotizacion(datosPrueba)
        .then(result => {
            if (result) {
                console.log('✅ Prueba exitosa! El formulario está funcionando correctamente.');
                console.log('📧 Se deberían haber enviado 2 emails:');
                console.log('   1. Confirmación al cliente (juan.perez.prueba@example.com)');
                console.log('   2. Notificación al admin (tu email configurado)');
            } else {
                console.log('⚠️ La prueba falló, pero no hubo errores críticos.');
            }
        })
        .catch(error => {
            console.error('❌ Error en la prueba:', error);
            console.log('💡 Posibles causas:');
            console.log('   - EmailJS no está configurado correctamente');
            console.log('   - Las claves en email-handler.js no están actualizadas');
            console.log('   - Problema de conexión a internet');
            console.log('   - Configuración incorrecta en EmailJS');
        });
}

// Función para verificar la configuración
function verificarConfiguracion() {
    console.log('🔍 Verificando configuración...');
    
    // Ejecutar diagnóstico de EmailJS si está disponible
    if (typeof window.diagnosticarEmailJS === 'function') {
        console.log('\n📧 Diagnóstico EmailJS:');
        window.diagnosticarEmailJS();
    }
    
    // Verificar scripts cargados
    const scripts = {
        'EmailJS': typeof emailjs !== 'undefined',
        'Función principal': typeof window.procesarFormularioCotizacion === 'function',
        'Función de modal': typeof window.cerrarModal === 'function',
        'Función diagnóstico': typeof window.diagnosticarEmailJS === 'function'
    };
    
    console.log('\n📊 Estado de los scripts:');
    Object.entries(scripts).forEach(([nombre, cargado]) => {
        console.log(`   ${cargado ? '✅' : '❌'} ${nombre}: ${cargado ? 'Cargado' : 'No cargado'}`);
    });
    
    // Verificar elementos del DOM
    const elementos = {
        'Formulario': document.getElementById('cotizacionForm'),
        'Botón enviar': document.querySelector('.btn-cotizar')
    };
    
    console.log('🏗️ Estado de elementos del DOM:');
    Object.entries(elementos).forEach(([nombre, elemento]) => {
        console.log(`   ${elemento ? '✅' : '❌'} ${nombre}: ${elemento ? 'Encontrado' : 'No encontrado'}`);
    });
    
    // Verificar CSS
    const estilos = {
        'Estilos principales': !!document.querySelector('link[href*="styles.css"]'),
        'Estilos de cotización': !!document.querySelector('link[href*="cotiza-styles.css"]'),
        'Estilos de modal': !!document.querySelector('link[href*="modal-styles.css"]')
    };
    
    console.log('🎨 Estado de los estilos CSS:');
    Object.entries(estilos).forEach(([nombre, cargado]) => {
        console.log(`   ${cargado ? '✅' : '❌'} ${nombre}: ${cargado ? 'Cargado' : 'No cargado'}`);
    });
    
    return scripts && elementos && estilos;
}

// Función para llenar el formulario automáticamente (para pruebas)
function llenarFormularioPrueba() {
    console.log('📝 Llenando formulario con datos de prueba...');
    
    // Llenar campos básicos
    const campos = {
        'nombre': 'María García (PRUEBA)',
        'telefono': '5559876543',
        'email': 'maria.garcia.prueba@example.com',
        'codigoPostal': '52172',
        'descripcion': 'Solicito cotización para un closet empotrado de 3 metros de ancho x 2.5 metros de alto. Necesito diferentes compartimentos para ropa, zapatos y accesorios. Preferencia por acabados en madera.'
    };
    
    Object.entries(campos).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.value = valor;
            console.log(`   ✅ ${id}: "${valor}"`);
        } else {
            console.log(`   ❌ Campo ${id} no encontrado`);
        }
    });
    
    // Simular clic en botones de selección
    setTimeout(() => {
        const botonCiudad = document.querySelector('#ciudadButtons [data-value="estado-mexico"]');
        const botonProyecto = document.querySelector('#proyectoButtons [data-value="closet"]');
        
        if (botonCiudad) {
            botonCiudad.click();
            console.log('   ✅ Ciudad seleccionada: Estado de México');
        }
        
        if (botonProyecto) {
            botonProyecto.click();
            console.log('   ✅ Proyecto seleccionado: Clóset/Vestidor');
        }
        
        console.log('✅ Formulario llenado completamente. Puedes hacer clic en "Solicitar Cotización" para probar.');
    }, 500);
}

// Función para mostrar ayuda
function mostrarAyuda() {
    console.log(`
🆘 AYUDA - Funciones disponibles para pruebas:

1. verificarConfiguracion()
   - Verifica que todos los scripts y elementos estén cargados correctamente

2. diagnosticarEmailJS()
   - Diagnóstico específico de EmailJS (configuración, conexión, etc.)

3. llenarFormularioPrueba()
   - Llena el formulario automáticamente con datos de prueba

4. probarFormularioCotizacion()
   - Envía una solicitud de prueba sin usar el formulario

5. solucionarProblemas()
   - Guía paso a paso para solucionar errores comunes

6. mostrarAyuda()
   - Muestra esta ayuda

📝 Pasos recomendados para probar:
1. Ejecuta: verificarConfiguracion()
2. Si hay errores, ejecuta: solucionarProblemas()
3. Si todo está bien, ejecuta: llenarFormularioPrueba()
4. Haz clic en "Solicitar Cotización" en la página

⚠️ IMPORTANTE:
- Asegúrate de haber configurado EmailJS primero
- Las pruebas enviarán emails reales si está configurado
    `);
}

// Nueva función para solucionar problemas
function solucionarProblemas() {
    console.log('🔧 SOLUCIONADOR DE PROBLEMAS EmailJS\n');
    
    // Paso 1: Verificar carga de EmailJS
    if (typeof emailjs === 'undefined') {
        console.log('❌ PROBLEMA: EmailJS no está cargado');
        console.log('💡 SOLUCIÓN:');
        console.log('   1. Verifica que este script esté en tu HTML:');
        console.log('      <script src="https://cdn.emailjs.com/dist/email.min.js"></script>');
        console.log('   2. Debe ir ANTES de email-handler.js');
        console.log('   3. Recarga la página');
        return;
    }
    console.log('✅ EmailJS está cargado correctamente');
    
    // Paso 2: Verificar configuración
    if (typeof window.diagnosticarEmailJS === 'function') {
        console.log('\n🔍 Ejecutando diagnóstico...');
        const resultado = window.diagnosticarEmailJS();
        
        if (!resultado) {
            console.log('\n❌ PROBLEMA: Configuración de EmailJS incorrecta');
            console.log('💡 SOLUCIONES POSIBLES:');
            console.log('   1. Verifica tu Public Key en EmailJS dashboard');
            console.log('   2. Verifica tu Service ID');
            console.log('   3. Verifica los Template IDs');
            console.log('   4. Asegúrate de que el servicio esté activo');
            return;
        }
        console.log('✅ Configuración de EmailJS correcta');
    }
    
    // Paso 3: Probar conexión
    console.log('\n📡 Probando conexión con EmailJS...');
    emailjs.send('test', 'test', {})
        .then(() => {
            console.log('Esto no debería suceder...');
        })
        .catch((error) => {
            console.log('Error capturado:', error);
            const mensaje = error?.message || error?.text || 'Error desconocido';
            if (mensaje.includes('Invalid') || mensaje.includes('not found') || mensaje.includes('Bad Request')) {
                console.log('✅ Conexión con EmailJS funcionando (error esperado de configuración de prueba)');
                console.log('\n🎯 TODO LISTO - Puedes probar el formulario ahora');
                console.log('Ejecuta: llenarFormularioPrueba()');
            } else {
                console.log('❌ Problema de conexión:', mensaje);
                console.log('💡 Verifica tu conexión a internet');
            }
        });
}

// Ejecutar verificación automática al cargar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script de prueba de Casa Mobelle cargado.');
    console.log('💡 Ejecuta mostrarAyuda() para ver las funciones disponibles.');
    
    // Verificación automática después de 2 segundos
    setTimeout(verificarConfiguracion, 2000);
});

// Exportar funciones globalmente para acceso desde consola
window.probarFormularioCotizacion = probarFormularioCotizacion;
window.verificarConfiguracion = verificarConfiguracion;
window.llenarFormularioPrueba = llenarFormularioPrueba;
window.mostrarAyuda = mostrarAyuda;
window.solucionarProblemas = solucionarProblemas;
