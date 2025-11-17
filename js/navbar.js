document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const nav = document.createElement("nav");
  nav.classList.add("navbar");
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");
  logoDiv.innerHTML = `
    
  `;
  nav.appendChild(logoDiv);
  const ul = document.createElement("ul");
  ul.classList.add("nav-links");
  navbarItems.forEach(item => {
    if (usuarioLogueado && (item.title === "Login" || item.title === "Registro")) return;
    if (!usuarioLogueado && item.title === "Logout") return;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.title;
    a.href = item.url;
    if (item.id) a.id = item.id;
    const currentPage = window.location.pathname.split("/").pop();
    if (a.href.includes(currentPage)) a.classList.add("active");
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  navbarContainer.appendChild(nav);
  if (usuarioLogueado) {
    const saludo = document.createElement("span");
    saludo.textContent = `👋 Hola, ${usuarioLogueado.nombre}`;
    saludo.style.marginLeft = "15px";
    saludo.style.fontWeight = "bold";
    saludo.style.color = "#38bdf8";
    logoDiv.appendChild(saludo);
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogueado");
      alert(`Cerraste sesión correctamente, Hasta la próxima, ${usuarioLogueado.nombre} 👋`);
      window.location.href = "Login.html";
    });
  }

    const cartCountSpan = document.getElementById('cart-count');
    // Función para actualizar contador del carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = count;
    }

    updateCartCount();
    // Escuchar evento personalizado "cartUpdated" para actualizar contador en tiempo real
    window.addEventListener('cartUpdated', updateCartCount);
    // Logout: limpiar localStorage y redirigir a Login
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('cart');
            window.location.href = 'Login.html';
        });
    }
});
