// Funcionalidad para la interfaz del Administratum

document.addEventListener("DOMContentLoaded", function () {
  console.log("La interfaz del Administratum está lista para servir al Imperio");
  
  // Aquí puedes agregar más funcionalidad JavaScript en el futuro
  
  // Ejemplo: Manejo de botones
  const buttons = document.querySelectorAll('.imperial-button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Botón imperial presionado:', this.textContent.trim());
    });
  });
  
  // Ejemplo: Manejo de acciones en la tabla
  const actionButtons = document.querySelectorAll('.action-button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent.trim();
      const row = this.closest('tr');
      const userId = row.cells[0].textContent.trim();
      const userName = row.cells[1].textContent.trim();
      
      console.log(`Acción "${action}" sobre usuario ${userName} (${userId})`);
    });
  });
});
