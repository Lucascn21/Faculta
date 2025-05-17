// Esperar a que el DOM est� completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Men� hamburguesa
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.menu');
    const body = document.body;

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            // Toggle clases para mostrar/ocultar men�
            hamburgerBtn.classList.toggle('active');
            menu.classList.toggle('active');
            // Prevenir scroll cuando el men� est� abierto
            body.classList.toggle('no-scroll');
        });

        // Cerrar men� al hacer clic en un enlace
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Cerrar men�
                hamburgerBtn.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        // Cerrar men� al hacer clic fuera de �l
        document.addEventListener('click', function(e) {
            if (
                menu.classList.contains('active') && 
                !menu.contains(e.target) && 
                !hamburgerBtn.contains(e.target)
            ) {
                hamburgerBtn.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }

    // Botones de adopci�n
    const adoptButtons = document.querySelectorAll('.card .btn');
    
    adoptButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Obtener informaci�n del gato seleccionado
            const card = e.target.closest('.card');
            const gateName = card.querySelector('h3').textContent;
            const gatoPrice = card.querySelector('.precio').textContent;
            
            // Mostrar mensaje de adopci�n (por ahora solo un alert)
            alert(`�Gracias por tu inter�s en adoptar a ${gateName}!\nPrecio: ${gatoPrice}\n\nEsta funcionalidad estar� disponible pronto.`);
            
            // Animaci�n del bot�n
            const btn = e.target;
            btn.textContent = '�Adoptado!';
            btn.style.backgroundColor = '#4CAF50';
            
            // Despu�s de un tiempo, restaurar el bot�n
            setTimeout(() => {
                btn.textContent = 'Adoptar';
                btn.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validaci�n simple
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }
            
            // Mostrar mensaje de confirmaci�n (en una aplicaci�n real, enviar�amos los datos a un servidor)
            alert(`�Gracias por tu mensaje, ${nombre}!\nTe responderemos pronto a ${email}.`);
            
            // Limpiar formulario
            contactForm.reset();
        });
    }

    // Navegaci�n suave al hacer clic en los enlaces del men� y logo
    const allLinks = document.querySelectorAll('.menu a, .footer-links a, .banner a, .logo h1 a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verificar si el enlace apunta a un elemento en la misma p�gina
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Si es enlace a inicio, scrollear al principio de la p�gina
                if (targetId === '#inicio') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Desplazamiento suave
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Ajuste para el encabezado fijo
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // Funci�n para animaci�n de aparici�n al hacer scroll
    function checkScroll() {
        const elements = document.querySelectorAll('.card, .about-content, .contact-container');
        
        elements.forEach(element => {
            // Posici�n del elemento con respecto a la ventana
            const position = element.getBoundingClientRect();
            
            // Si el elemento es visible en la ventana
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Aplicar estilos iniciales para la animaci�n
    const animatedElements = document.querySelectorAll('.card, .about-content, .contact-container');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Verificar scroll al cargar la p�gina
    checkScroll();
    
    // Verificar scroll durante el desplazamiento
    window.addEventListener('scroll', checkScroll);
});
