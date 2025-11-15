document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("RegisterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const fecha = document.getElementById("fecha").value;
    if (!nombre || !apellido || !email || !password || !fecha) {
      alert("Por favor, completá todos los campos.");
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert("Este correo ya está registrado. Iniciá sesión o usá otro correo.");
      return;
    }
    const nuevoUsuario = { nombre, apellido, email, password, fecha };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert(`Registro exitoso. ¡Bienvenido ${nombre}!`);
    window.location.href = "index.html";
  });
});