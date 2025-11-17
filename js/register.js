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
    //Minimo 6 caracteres pa
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    //Usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    //Verifico si ya existe email
    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert("Este correo ya está registrado. Iniciá sesión o usá otro correo.");
      return;
    }
    //Nuevo usuario
    const nuevoUsuario = { nombre, apellido, email, password, fecha };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert(`Registro exitoso. ¡Bienvenido ${nombre}! Ahora podés iniciar sesión.`);
    window.location.href = "Login.html";
  });
});