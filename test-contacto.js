// Script de prueba para el formulario de contacto
console.log('🧪 Iniciando pruebas del formulario de contacto...');

// Función para simular llenado del formulario
function llenarFormularioPrueba() {
    const datos = {
        nombre: 'Juan Pérez Prueba',
        email: 'juan.prueba@ejemplo.com',
        telefono: '55 1234 5678',
        asunto: 'cotizacion',
        mensaje: 'Este es un mensaje de prueba para verificar que el formulario de contacto funciona correctamente. Estoy interesado en una cocina integral.'
    };
    
    // Llenar campos
    document.getElementById('contactName').value = datos.nombre;
    document.getElementById('contactEmail').value = datos.email;
    document.getElementById('contactPhone').value = datos.telefono;
    document.getElementById('contactSubject').value = datos.asunto;
    document.getElementById('contactMessage').value = datos.mensaje;
    
    console.log('✅ Formulario llenado con datos de prueba:', datos);
    return datos;
}

// Función para validar que EmailJS esté cargado
function verificarEmailJS() {
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS está cargado correctamente');
        console.log('📧 Configuración actual:', {
            serviceID: 'service_i8ylqzi',
            templateID: 'template_i5irfjo',
            publicKey: 'Wg5X527MYMwivPKvs'
        });
        return true;
    } else {
        console.error('❌ EmailJS no está cargado');
        return false;
    }
}

// Función para probar validaciones
function probarValidaciones() {
    console.log('🔍 Probando validaciones del formulario...');
    
    // Limpiar formulario
    document.getElementById('contactForm').reset();
    
    // Intentar enviar formulario vacío
    const esValido = validarFormularioContacto();
    
    if (!esValido) {
        console.log('✅ Las validaciones funcionan correctamente (formulario vacío rechazado)');
    } else {
        console.error('❌ Las validaciones no están funcionando');
    }
    
    return esValido;
}

// Función para probar envío completo
async function probarEnvioCompleto() {
    console.log('📤 Probando envío completo del formulario...');
    
    // Llenar formulario
    const datos = llenarFormularioPrueba();
    
    // Simular envío
    try {
        const resultado = await emailjs.send(
            'service_i8ylqzi',
            'template_i5irfjo',
            {
                nombre: datos.nombre,
                email: datos.email,
                telefono: datos.telefono,
                asunto: datos.asunto,
                mensaje: datos.mensaje
            }
        );
        
        console.log('✅ Email enviado exitosamente:', resultado);
        return true;
    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        return false;
    }
}

// Función principal de prueba
async function ejecutarPruebas() {
    console.log('🚀 Ejecutando suite completa de pruebas...');
    
    // Esperar a que la página cargue completamente
    if (document.readyState !== 'complete') {
        await new Promise(resolve => {
            window.addEventListener('load', resolve);
        });
    }
    
    let resultados = {
        emailjsCargado: false,
        validacionesFuncionan: false,
        envioExitoso: false
    };
    
    // Prueba 1: Verificar EmailJS
    resultados.emailjsCargado = verificarEmailJS();
    
    // Prueba 2: Probar validaciones
    if (typeof validarFormularioContacto === 'function') {
        resultados.validacionesFuncionan = !probarValidaciones(); // Invertido porque esperamos que falle con datos vacíos
    } else {
        console.error('❌ Función validarFormularioContacto no encontrada');
    }
    
    // Prueba 3: Probar envío (solo si las anteriores pasaron)
    if (resultados.emailjsCargado) {
        try {
            resultados.envioExitoso = await probarEnvioCompleto();
        } catch (error) {
            console.error('❌ Error en prueba de envío:', error);
        }
    }
    
    // Resumen de resultados
    console.log('\n📊 RESUMEN DE PRUEBAS:');
    console.log('====================');
    console.log(`EmailJS cargado: ${resultados.emailjsCargado ? '✅' : '❌'}`);
    console.log(`Validaciones funcionan: ${resultados.validacionesFuncionan ? '✅' : '❌'}`);
    console.log(`Envío exitoso: ${resultados.envioExitoso ? '✅' : '❌'}`);
    
    const todasPasaron = Object.values(resultados).every(resultado => resultado);
    console.log(`\n🎯 RESULTADO GENERAL: ${todasPasaron ? '✅ TODAS LAS PRUEBAS PASARON' : '❌ ALGUNAS PRUEBAS FALLARON'}`);
    
    return resultados;
}

// Función para prueba manual paso a paso
function pruebaManual() {
    console.log('\n🎯 INSTRUCCIONES PARA PRUEBA MANUAL:');
    console.log('=====================================');
    console.log('1. Ejecuta: llenarFormularioPrueba()');
    console.log('2. Haz clic en el botón "Enviar mensaje"');
    console.log('3. Observa los modales que aparecen');
    console.log('4. Verifica que recibas el email');
    console.log('5. Si hay errores, revisa la consola');
    
    console.log('\n📝 COMANDOS ÚTILES:');
    console.log('- llenarFormularioPrueba() - Llena el formulario con datos de prueba');
    console.log('- verificarEmailJS() - Verifica que EmailJS esté cargado');
    console.log('- probarValidaciones() - Prueba las validaciones del formulario');
    console.log('- ejecutarPruebas() - Ejecuta todas las pruebas automáticamente');
}

// Hacer funciones disponibles globalmente
window.testContacto = {
    llenarFormularioPrueba,
    verificarEmailJS,
    probarValidaciones,
    probarEnvioCompleto,
    ejecutarPruebas,
    pruebaManual
};

// Ejecutar pruebas automáticamente si la página ya está cargada
if (document.readyState === 'complete') {
    setTimeout(() => {
        console.log('🔧 Script de pruebas cargado. Usa testContacto.pruebaManual() para instrucciones.');
    }, 1000);
} else {
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🔧 Script de pruebas cargado. Usa testContacto.pruebaManual() para instrucciones.');
        }, 1000);
    });
}
