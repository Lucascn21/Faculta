console.dir("asd");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const dialog = document.getElementById("menu-dialog");
  const closeBtn = document.getElementById("close-dialog");

  if (hamburger && dialog && closeBtn) {
    hamburger.addEventListener("click", () => dialog.showModal());
    closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
});
