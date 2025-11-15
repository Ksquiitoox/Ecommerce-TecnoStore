document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    alert(`Cerraste sesión correctamente, Hasta la próxima, ${usuarioLogueado.nombre} 👋`);
    window.location.href = "Login.html";
  });
});
