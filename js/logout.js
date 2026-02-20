document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    sessionStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("cart");
    alert(`Hasta la próxima, ${usuarioLogueado.nombre} 👋`);
    window.location.href = "../pages/Login.html";
  });
});