document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("LoginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    if (!email || !password) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      alert(`Inicio de sesión exitoso. ¡Bienvenido ${usuario.nombre}!`);
      window.location.href = ".pages/index.html";
    } else {
      alert("Usuario o contraseña incorrectos. Por favor intentá nuevamente.");
    }
  });
})