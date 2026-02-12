// ========================================
// LA PRIMAVERA - JAVASCRIPT INTERACTIVO
// Funcionalidades: Efectos de scroll, animaciones,
// y carrusel automático
// ========================================

// ===== FUNCIÓN PRINCIPAL AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    // Efectos de scroll
    configurarEfectosScroll();
    
    // Animaciones de entrada
    animarElementos();
    
    // Inicializar carrusel con autoplay
    inicializarCarrusel();
    
    // Mensaje de bienvenida
    mostrarMensajeBienvenida();
});

// ===== EFECTOS DE SCROLL =====
function configurarEfectosScroll() {
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(45, 122, 79, 0.3)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 4px 16px rgba(45, 122, 79, 0.15)';
        }
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== ANIMACIONES DE ELEMENTOS =====
function animarElementos() {
    // Observador de intersección para animaciones al hacer scroll
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observador.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observar las tarjetas de productos
    document.querySelectorAll('.product-card').forEach(card => {
        observador.observe(card);
    });
    
    // Observar la sección de quiénes somos
    const quienesSomos = document.querySelector('.tienda-image-wrapper');
    if (quienesSomos) {
        observador.observe(quienesSomos);
    }
    
    const nosotrosContenedor = document.querySelector('.nosotros-contenedor');
    if (nosotrosContenedor) {
        observador.observe(nosotrosContenedor);
    }
}

// ===== INICIALIZAR CARRUSEL =====
function inicializarCarrusel() {
    // El carrusel de Bootstrap ya tiene autoplay por defecto
    // Agregar pausa al hover para mejor UX
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', function() {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.cycle();
            }
        });
    }
}

// ===== MENSAJES DINÁMICOS =====
// Mostrar mensaje de bienvenida basado en la hora
function mostrarMensajeBienvenida() {
    const ahora = new Date();
    const horas = ahora.getHours();
    let saludo;
    
    if (horas >= 0 && horas < 6) {
        saludo = "¡Buenas noches! 🌙";
    } else if (horas >= 6 && horas < 12) {
        saludo = "¡Buenos días! ☀️";
    } else if (horas >= 12 && horas < 18) {
        saludo = "¡Buenas tardes! 🌤️";
    } else {
        saludo = "¡Buenas noches! 🌆";
    }
    
    console.log(`${saludo} Bienvenido a La Primavera - Abierto 24/7`);
}

// ===== FUNCIONES DE UTILIDAD =====
// Obtener día de la semana en español
function obtenerDiaSemana() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[new Date().getDay()];
}

console.log(`🌸 La Primavera - ${obtenerDiaSemana()} - Sistema inicializado correctamente`);