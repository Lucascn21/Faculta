/**
 * Inicializa todos los comportamientos de la página cuando el DOM está listo
 */
document.addEventListener("DOMContentLoaded", function () {
  // Configuración del menú móvil
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const menu = document.querySelector(".menu");
  const body = document.body;

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
      hamburgerBtn.classList.toggle("active");
      menu.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });

    /**
     * Cierra el menú cuando se hace clic en un enlace
     */
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburgerBtn.classList.remove("active");
        menu.classList.remove("active");
        body.classList.remove("no-scroll");
      });
    });

    /**
     * Cierra el menú al hacer clic fuera de él
     */
    document.addEventListener("click", function (e) {
      if (
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        hamburgerBtn.classList.remove("active");
        menu.classList.remove("active");
        body.classList.remove("no-scroll");
      }
    });
  }

  /**
   * Gestión de los botones de adopción
   * Muestra confirmación y animación del botón al hacer clic
   */
  const adoptButtons = document.querySelectorAll(".card .btn");

  adoptButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const card = e.target.closest(".card");
      const gateName = card.querySelector("h3").textContent;
      const gatoPrice = card.querySelector(".precio").textContent;

      alert(
        `¡Gracias por tu interés en adoptar a ${gateName}!\nPrecio: ${gatoPrice}\n\nEsta funcionalidad estará disponible pronto.`
      );

      const btn = e.target;
      btn.textContent = "¡Adoptado!";
      btn.style.backgroundColor = "#4CAF50";

      // Restaurar el botón después de 2 segundos
      setTimeout(() => {
        btn.textContent = "Adoptar";
        btn.style.backgroundColor = "";
      }, 2000);
    });
  });

  /**
   * Gestión del formulario de contacto
   * Valida, muestra confirmación y limpia el formulario
   */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
      }

      // En producción, aquí se enviarían los datos al servidor
      alert(
        `¡Gracias por tu mensaje, ${nombre}!\nTe responderemos pronto a ${email}.`
      );

      contactForm.reset();
    });
  }

  /**
   * Navegación suave para todos los enlaces internos
   * Permite scroll animado al hacer clic en enlaces del menú, footer y banner
   */
  const allLinks = document.querySelectorAll(
    ".menu a, .footer-links a, .banner a, .logo h1 a"
  );

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        if (targetId === "#inicio") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Compensamos el header fijo
              behavior: "smooth",
            });
          }
        }
      }
    });
  });

  /**
   * Detecta elementos visibles durante el scroll y aplica animaciones
   */
  function checkScroll() {
    const elements = document.querySelectorAll(
      ".card, .about-content, .contact-container"
    );

    elements.forEach((element) => {
      const position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Prepara los elementos para la animación de entrada
  const animatedElements = document.querySelectorAll(
    ".card, .about-content, .contact-container"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  checkScroll();

  window.addEventListener("scroll", checkScroll);
});
