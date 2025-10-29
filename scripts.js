/**
 * Scripts unificados para Casa Mobelle
 * Funcionalidades comunes para todas las páginas
 */

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCarousels();
    initContactForm();
    initQuoteForm();
    initScrollEffects();
});

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

// ===== CARRUSELES =====
function initCarousels() {
    initMainCarousel();
    initFeaturesCarousel();
}

// Carrusel principal (home.html)
function initMainCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carouselItems.length === 0) return;
    
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        carouselItems[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % carouselItems.length);
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
            resetInterval();
        });
    });

    function startInterval() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    // Inicializar
    showSlide(0);
    startInterval();
}

// Carrusel de características (home.html)
function initFeaturesCarousel() {
    const featureItems = document.querySelectorAll('.features-carousel .feature');
    
    if (featureItems.length === 0) return;
    
    let featureIndex = 0;
    let featureInterval;

    function showFeature(index) {
        featureItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        featureIndex = index;
    }

    window.prevFeature = function() {
        showFeature((featureIndex - 1 + featureItems.length) % featureItems.length);
        resetFeatureInterval();
    }

    window.nextFeature = function() {
        showFeature((featureIndex + 1) % featureItems.length);
        resetFeatureInterval();
    }

    function startFeatureInterval() {
        featureInterval = setInterval(window.nextFeature, 9000);
    }

    function resetFeatureInterval() {
        clearInterval(featureInterval);
        startFeatureInterval();
    }

    // Inicializar
    showFeature(0);
    startFeatureInterval();
}

// ===== FORMULARIO DE CONTACTO =====
// COMPLETAMENTE DESACTIVADO - Se usa contact-handler.js
function initContactForm() {
    // No hacer nada - contact-handler.js maneja todo
    console.log('📧 initContactForm() desactivada - usando contact-handler.js');
}

// Función para copiar número al portapapeles
window.copyToClipboard = function(phoneNumber) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
        event.preventDefault();
        navigator.clipboard.writeText(phoneNumber).then(function() {
            const originalText = event.target.closest('a').title;
            event.target.closest('a').title = '¡Número copiado!';
            setTimeout(() => {
                event.target.closest('a').title = originalText;
            }, 2000);
        }).catch(function(err) {
            const textArea = document.createElement('textarea');
            textArea.value = phoneNumber;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = event.target.closest('a').title;
            event.target.closest('a').title = '¡Número copiado!';
            setTimeout(() => {
                event.target.closest('a').title = originalText;
            }, 2000);
        });
    }
}

// ===== FORMULARIO DE COTIZACIÓN =====
function initQuoteForm() {
    const cotizacionForm = document.getElementById('cotizacionForm');
    
    if (!cotizacionForm) return;
    
    // Referencias a elementos
    const ciudadInput = document.getElementById('ciudad');
    const otraCiudadGroup = document.getElementById('otraCiudadGroup');
    const otraCiudadInput = document.getElementById('otraCiudad');
    
    const tipoProyectoInput = document.getElementById('tipoProyecto');
    const otroProyectoGroup = document.getElementById('otroProyectoGroup');
    const otroProyectoInput = document.getElementById('otroProyecto');

    // Manejo de botones de ciudad
    const ciudadButtons = document.querySelectorAll('#ciudadButtons .option-btn');
    ciudadButtons.forEach(button => {
        button.addEventListener('click', function() {
            ciudadButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const value = this.getAttribute('data-value');
            ciudadInput.value = value;
            
            if (value === 'otra') {
                otraCiudadGroup.style.display = 'block';
                otraCiudadInput.required = true;
            } else {
                otraCiudadGroup.style.display = 'none';
                otraCiudadInput.required = false;
                otraCiudadInput.value = '';
            }
        });
    });

    // Manejo de botones de tipo de proyecto
    const proyectoButtons = document.querySelectorAll('#proyectoButtons .option-btn');
    proyectoButtons.forEach(button => {
        button.addEventListener('click', function() {
            proyectoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const value = this.getAttribute('data-value');
            tipoProyectoInput.value = value;
            
            if (value === 'otro') {
                otroProyectoGroup.style.display = 'block';
                otroProyectoInput.required = true;
            } else {
                otroProyectoGroup.style.display = 'none';
                otroProyectoInput.required = false;
                otroProyectoInput.value = '';
            }
        });
    });

    // Envío del formulario
    cotizacionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateQuoteForm()) return;
        
        // Verificar reCAPTCHA
        if (!validateRecaptcha()) return;
        
        // Recopilar datos del formulario
        const formData = new FormData(cotizacionForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Agregar token de reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        data.recaptchaToken = recaptchaResponse;
        
        // Verificar si EmailJS está configurado
        if (typeof window.procesarFormularioCotizacion === 'function') {
            // Enviar con EmailJS
            await window.procesarFormularioCotizacion(data);
        } else {
            // Fallback - mensaje simple
            alert('¡Gracias por tu solicitud! Te contactaremos en las próximas 72 horas.');
            resetQuoteForm();
        }
    });

    function validateQuoteForm() {
        if (!ciudadInput.value) {
            showFormError('Por favor, selecciona tu ubicación.');
            return false;
        }
        
        if (!tipoProyectoInput.value) {
            showFormError('Por favor, selecciona el tipo de proyecto.');
            return false;
        }
        
        if (ciudadInput.value === 'otra' && !otraCiudadInput.value.trim()) {
            showFormError('Por favor, especifica tu ciudad.');
            otraCiudadInput.focus();
            return false;
        }
        
        if (tipoProyectoInput.value === 'otro' && !otroProyectoInput.value.trim()) {
            showFormError('Por favor, especifica tu tipo de proyecto.');
            otroProyectoInput.focus();
            return false;
        }
        
        return true;
    }

    function validateRecaptcha() {
        // Verificar si reCAPTCHA está cargado
        if (typeof grecaptcha === 'undefined') {
            showFormError('Error: reCAPTCHA no se ha cargado correctamente. Por favor, recarga la página.');
            return false;
        }
        
        // Verificar si reCAPTCHA fue completado
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse || recaptchaResponse.length === 0) {
            showFormError('Por favor, completa la verificación reCAPTCHA.');
            
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
        
        return true;
    }

    function showFormError(message) {
        // Crear o actualizar el mensaje de error
        let errorElement = document.querySelector('.form-error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error-message';
            errorElement.style.cssText = `
                background: rgba(255, 68, 68, 0.1);
                border: 1px solid rgba(255, 68, 68, 0.3);
                color: #ff4444;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
                font-weight: 500;
                animation: fadeIn 0.3s ease;
            `;
            
            const form = document.getElementById('cotizacionForm');
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

    function resetQuoteForm() {
        cotizacionForm.reset();
        ciudadButtons.forEach(btn => btn.classList.remove('active'));
        proyectoButtons.forEach(btn => btn.classList.remove('active'));
        ciudadInput.value = '';
        tipoProyectoInput.value = '';
        otraCiudadGroup.style.display = 'none';
        otroProyectoGroup.style.display = 'none';
        otraCiudadInput.required = false;
        otroProyectoInput.required = false;
        
        // Resetear reCAPTCHA
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
        }
        
        // Remover mensajes de error
        const errorElement = document.querySelector('.form-error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Resetear estilos del contenedor de reCAPTCHA
        const container = document.querySelector('.recaptcha-container');
        if (container) {
            container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            container.style.boxShadow = 'none';
        }
    }

    // Hacer disponible globalmente para email-handler.js
    window.resetQuoteForm = resetQuoteForm;
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    // Scroll automático a la sección si hay hash en la URL (galeria.html)
    if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const section = document.getElementById(id);
        if (section) {
            setTimeout(function() {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }

    // Efecto suave al hacer scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
