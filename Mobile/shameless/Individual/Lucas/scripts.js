document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en enlaces
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          hamburger.classList.remove('active');
        }
      });
    });
    
    // Cerrar menú al presionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
});
