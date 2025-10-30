// CONTACT HANDLER V7.1 - CON reCAPTCHA (checkbox o invisible)
// Requiere cargar EmailJS y Google reCAPTCHA en el HTML.
// - EmailJS:   <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
// - reCAPTCHA: <script src="https://www.google.com/recaptcha/api.js" async defer></script>

console.log('🚀 contact-handler-v7.1.js cargando CON reCAPTCHA...');

// =======================
// CONFIGURACIÓN EmailJS
// =======================
const CONTACT_CONFIG = {
  serviceID: 'service_i8ylqzi',
  templateID: 'template_i5irfjo',
  publicKey: 'Wg5X527MYMwivPKvs'
};

// =======================
// ESTADO INTERNO / GUARDAS
// =======================
let CONTACT_V7_INIT = false;             // evita inicializaciones múltiples
let RECAPTCHA_WIDGET_ID = null;          // si usas render explícito
let USE_INVISIBLE_RECAPTCHA = false;     // detectamos si es invisible
let SUBMIT_LOCK = false;                 // evita doble submit

// =======================
// INICIALIZAR EmailJS
// =======================
(function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS no está cargado. Incluye el script de EmailJS antes de este archivo.');
    return;
  }
  try {
    // v4 (recomendado) y compatible con v3
    if (typeof emailjs.init === 'function') {
      emailjs.init({ publicKey: CONTACT_CONFIG.publicKey });
      console.log('📧 EmailJS inicializado');
    } else {
      console.warn('⚠️ No fue posible inicializar EmailJS (init no es función)');
    }
  } catch (e) {
    console.error('❌ Error inicializando EmailJS:', e);
  }
})();

// =======================
// UTIL: ESPERAR TOKEN INVISIBLE
// =======================
function waitForRecaptchaToken(timeoutMs = 10000, intervalMs = 200) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const timer = setInterval(() => {
      try {
        if (typeof grecaptcha === 'undefined') {
          clearInterval(timer);
          return reject(new Error('reCAPTCHA no está cargado'));
        }
        const token = RECAPTCHA_WIDGET_ID != null
          ? grecaptcha.getResponse(RECAPTCHA_WIDGET_ID)
          : grecaptcha.getResponse();
        if (token && token.length > 0) {
          clearInterval(timer);
          resolve(token);
        } else if (Date.now() - start > timeoutMs) {
          clearInterval(timer);
          reject(new Error('reCAPTCHA no respondió a tiempo'));
        }
      } catch (err) {
        clearInterval(timer);
        reject(err);
      }
    }, intervalMs);
  });
}

// =======================
// VALIDACIÓN reCAPTCHA (checkbox)
// =======================
function validateContactRecaptcha() {
  console.log('🔒 Validando reCAPTCHA (checkbox)...');

  if (typeof grecaptcha === 'undefined') {
    showContactFormError('Error: reCAPTCHA no se ha cargado. Recarga la página.');
    return false;
  }

  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse || recaptchaResponse.length === 0) {
    showContactFormError('Por favor, completa la verificación reCAPTCHA.');
    const recaptchaElement = document.querySelector('.g-recaptcha');
    if (recaptchaElement) {
      recaptchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const container = document.querySelector('.recaptcha-container') || recaptchaElement;
      container.style.border = '2px solid #ff4444';
      container.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
      setTimeout(() => {
        container.style.border = '';
        container.style.boxShadow = 'none';
      }, 3000);
    }
    return false;
  }

  console.log('✅ reCAPTCHA (checkbox) validado');
  return true;
}

// =======================
// MENSAJES DE ERROR
// =======================
function showContactFormError(message) {
  let errorElement = document.querySelector('.form-error-message');
  const form = document.getElementById('contactForm');

  if (!form) {
    console.error('❌ No se encontró #contactForm para mostrar error');
    alert(message);
    return;
  }

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error-message';
    form.insertBefore(errorElement, form.firstChild);
  }

  errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
  errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    if (errorElement && errorElement.parentNode) {
      errorElement.remove();
    }
  }, 5000);
}

// =======================
// ENVÍO (núcleo)
// =======================
async function enviarFormularioContactoV7(event) {
  console.log('🎯 enviarFormularioContactoV7()');
  event.preventDefault();
  event.stopPropagation();

  if (SUBMIT_LOCK) return false;
  SUBMIT_LOCK = true;

  const form = document.getElementById('contactForm');
  if (!form) {
    console.error('❌ No se encontró #contactForm');
    SUBMIT_LOCK = false;
    return false;
  }

  // Detectar si el captcha es invisible
  const elInvisible = document.querySelector('.g-recaptcha[data-size="invisible"], #recaptcha[data-size="invisible"]');
  USE_INVISIBLE_RECAPTCHA = !!elInvisible;

  // Datos del formulario
  const formData = {
    nombre: document.getElementById('contactName')?.value?.trim() || '',
    email: document.getElementById('contactEmail')?.value?.trim() || '',
    telefono: document.getElementById('contactPhone')?.value?.trim() || 'No proporcionado',
    asunto: document.getElementById('contactSubject')?.value || '',
    mensaje: document.getElementById('contactMessage')?.value?.trim() || ''
  };

  // Validación básica
  if (!formData.nombre || !formData.email || !formData.mensaje) {
    showContactFormError('Por favor completa todos los campos requeridos.');
    SUBMIT_LOCK = false;
    return false;
  }

  // Botón loading
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  }

  try {
    // 1) Manejo reCAPTCHA
    if (typeof grecaptcha !== 'undefined') {
      if (USE_INVISIBLE_RECAPTCHA) {
        console.log('🫥 reCAPTCHA invisible detectado → ejecutando...');
        try {
          // Ejecuta el widget (usa el primero si no tenemos ID explícito)
          if (RECAPTCHA_WIDGET_ID != null) {
            grecaptcha.execute(RECAPTCHA_WIDGET_ID);
          } else {
            grecaptcha.execute();
          }
          // Espera a que exista token
          await waitForRecaptchaToken();
        } catch (e) {
          console.error('❌ Error ejecutando reCAPTCHA invisible:', e);
          throw new Error('No se pudo verificar reCAPTCHA. Intenta nuevamente.');
        }
      } else {
        // Checkbox normal
        if (!validateContactRecaptcha()) {
          throw new Error('Verifica el reCAPTCHA.');
        }
      }
    } else {
      console.warn('⚠️ grecaptcha no está definido. Continuando SIN verificación (solo para pruebas).');
    }

    // Añadir token (si existe)
    const token = (typeof grecaptcha !== 'undefined')
      ? (RECAPTCHA_WIDGET_ID != null ? grecaptcha.getResponse(RECAPTCHA_WIDGET_ID) : grecaptcha.getResponse())
      : '';
    const payload = { ...formData, recaptchaToken: token };

    console.log('📤 Enviando por EmailJS:', payload);

    // 2) Enviar Email
    const response = await emailjs.send(CONTACT_CONFIG.serviceID, CONTACT_CONFIG.templateID, payload);
    console.log('✅ Email enviado:', response);

    // 3) Reset UI
    form.reset();
    if (typeof grecaptcha !== 'undefined') {
      if (RECAPTCHA_WIDGET_ID != null) {
        grecaptcha.reset(RECAPTCHA_WIDGET_ID);
      } else {
        grecaptcha.reset();
      }
    }
    const errorElement = document.querySelector('.form-error-message');
    if (errorElement) errorElement.remove();

    mostrarModalExitoV7();
    return true;

  } catch (err) {
    console.error('❌ Error en envío:', err);
    showContactFormError('Error al enviar el mensaje. Por favor intenta de nuevo.');
    return false;

  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
    SUBMIT_LOCK = false;
  }
}

// =======================
// MODAL ÉXITO
// =======================
function mostrarModalExitoV7() {
  console.log('🎉 Mostrando modal de éxito V7');

  document.querySelectorAll('[id*="modal"], [class*="modal"]').forEach(m => m.remove());

  const modalHTML = `
    <div id="modal-exito-v7" style="
      position: fixed !important; top: 0 !important; left: 0 !important;
      width: 100% !important; height: 100% !important; background: rgba(0,0,0,0.8) !important;
      display: flex !important; justify-content: center !important; align-items: center !important;
      z-index: 999999 !important;">
      <div style="
        background: white; border-radius: 15px; padding: 40px; max-width: 500px; width: 90%;
        text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <div style="font-size: 60px; color: #28a745; margin-bottom: 20px;">✅</div>
        <h3 style="color: #182c72; margin-bottom: 15px; font-size: 1.8rem;">
          ¡Mensaje Enviado Exitosamente!
        </h3>
        <p style="color: #333; line-height: 1.6; margin: 15px 0;">
          Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
        </p>
        <div style="background: #e7f3ff; border-radius: 8px; padding: 15px; margin: 20px 0; border-left: 4px solid #2196F3;">
          <p style="margin: 0; color: #0c5460;">
            🛡️ <strong>Tu mensaje fue protegido por reCAPTCHA</strong><br>
            ⏰ Tiempo de respuesta: 24-48 horas
          </p>
        </div>
        <button onclick="cerrarModalV7()" style="
          background: #182c72; color: white; border: none; padding: 15px 30px; border-radius: 8px;
          cursor: pointer; font-size: 1rem; font-weight: 600; margin-top: 15px; transition: all 0.3s ease;">
          Entendido
        </button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  setTimeout(cerrarModalV7, 8000);
}

function cerrarModalV7() {
  const modal = document.getElementById('modal-exito-v7');
  if (modal) {
    modal.remove();
    console.log('❌ Modal cerrado');
  }
}

// =======================
// CONFIGURACIÓN (UNA SOLA VEZ)
// =======================
function configurarFormularioV7() {
  if (CONTACT_V7_INIT) return;
  CONTACT_V7_INIT = true;

  console.log('🔧 configurarFormularioV7() - CON reCAPTCHA');

  const form = document.getElementById('contactForm');
  if (!form) {
    console.error('❌ No se encontró el formulario contactForm');
    return;
  }

  // ❌ NO clonar el formulario (esto rompe el captcha)
  // ✅ Agregar un solo listener
  form.addEventListener('submit', enviarFormularioContactoV7);

  // Detecta invisible si el contenedor lo indica (opcional)
  const elInvisible = document.querySelector('.g-recaptcha[data-size="invisible"], #recaptcha[data-size="invisible"]');
  USE_INVISIBLE_RECAPTCHA = !!elInvisible;

  console.log('✅ Listener agregado. reCAPTCHA:', USE_INVISIBLE_RECAPTCHA ? 'INVISIBLE' : 'CHECKBOX');
}

// Init una sola vez
document.addEventListener('DOMContentLoaded', configurarFormularioV7);

// Exponer funciones globales si las necesitas
window.cerrarModalV7 = cerrarModalV7;
window.validateContactRecaptcha = validateContactRecaptcha;

// (Opcional) Si decides usar render explícito para invisible, define y usa esto en la URL del script:
// <script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit" async defer></script>
window.onRecaptchaLoaded = function onRecaptchaLoaded() {
  const explicitEl = document.getElementById('recaptcha'); // contenedor para render explícito
  if (explicitEl && typeof grecaptcha !== 'undefined') {
    try {
      USE_INVISIBLE_RECAPTCHA = true;
      RECAPTCHA_WIDGET_ID = grecaptcha.render(explicitEl, {
        sitekey: explicitEl.getAttribute('data-sitekey') || 'TU_SITE_KEY', // reemplaza si usas render explícito
        size: 'invisible',
        callback: function () { /* el token se toma con waitForRecaptchaToken() */ },
        'error-callback': function () { showContactFormError('Error al verificar reCAPTCHA. Inténtalo de nuevo.'); },
        'expired-callback': function () { showContactFormError('El reCAPTCHA expiró. Vuelve a intentar.'); }
      });
      console.log('✅ reCAPTCHA invisible renderizado explícitamente. WidgetID:', RECAPTCHA_WIDGET_ID);
    } catch (e) {
      console.warn('⚠️ No se pudo renderizar reCAPTCHA explícito:', e);
    }
  }
};

console.log('✅ contact-handler-v7.1.js CON reCAPTCHA completamente cargado');
