document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!logoutBtn || !usuarioLogueado) return;
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    alert(`Cerraste sesión correctamente, Hasta la próxima, ${usuarioLogueado.nombre} 👋`);
    window.location.href = ".pages/Login.html";
  });
});