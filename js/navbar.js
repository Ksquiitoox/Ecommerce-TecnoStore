document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  //Detectar pagina
  const ruta = window.location.pathname;
  const esHome = ruta === "/" || ruta.toLowerCase() === "/index.html";
  //<nav>
  const nav = document.createElement("nav");
  nav.classList.add("navbar");
  //Logo
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");
  logoDiv.innerHTML = `
    <img src="/img/logo.png" alt="Logo TecnoStore" url: /index.html>
    <h1>TecnoStore</h1>
  `;
  //BTN CATEGORIAS
  const menuToggle = document.createElement("button");
  menuToggle.classList.add("menu-toggle");
  menuToggle.setAttribute("aria-label", "Categorías");
  //Icono tougle
  menuToggle.innerHTML = `
    <span class="menu-toggle-icon">☰</span>
    <span>Categorías</span>
  `;
  logoDiv.prepend(menuToggle);
  nav.appendChild(logoDiv);
  //Ul contenedor Links
  const ul = document.createElement("ul");
  ul.classList.add("nav-links");

  navbarItems.forEach(item => {
    //Filtro Home
    if (!usuarioLogueado && esHome) {
      //Muestro Categorias - Login - Registro
      if (
        item.title !== "Categorías" &&
        item.title !== "Login" &&
        item.title !== "Registro"
      ) {
        return;
      }
    }
    //Filtro Login/Logout
    if (usuarioLogueado && (item.title === "Login" || item.title === "Registro")) return;
    if (!usuarioLogueado && item.title === "Logout") return;
    
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    //Link Carrito
    if (item.id === "cart-link"){
        a.id = item.id;
        a.innerHTML = `🛒 Carrito (<span id="cart-count">0</span>)`;
    } else {
      a.textContent = item.title;
    }
    //ID
    if (item.id && item.id !== "cart-link") {
      a.id = item.id;
    }

    // Marcar link activo
    if (item.url.toLowerCase() === ruta.toLowerCase()) {
      a.classList.add("active");
    }
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  
  //Menu de categorias
  const moreMenu = document.createElement("div");
  moreMenu.classList.add("more-menu");
  //categorias al menú
  const categorias = navbarItems.filter(item =>
    ["Laptops", "Smartphones", "Accesorios"].includes(item.title)
  );
  categorias.forEach(item => {
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.title;
    moreMenu.appendChild(link);
  });
  nav.appendChild(moreMenu);
  // Agregar toda la navbar al contenedor
  navbarContainer.appendChild(nav);
  //Saludo
  if (usuarioLogueado) {
    const saludo = document.createElement("span");
    saludo.textContent = `👋 Hola, ${usuarioLogueado.nombre}`;
    saludo.style.marginLeft = "15px";
    saludo.style.fontWeight = "bold";
    saludo.style.color = "#38bdf8";
    logoDiv.appendChild(saludo);
  }
  //Carrito contador
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
  // // Logout: limpiar localStorage y redirigir a Login
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogueado");
      localStorage.removeItem('cart');
      alert(`Cerraste sesión correctamente, Hasta la próxima, ${usuarioLogueado.nombre} 👋`);
      window.location.href = "/pages/Login.html";
    });
  }
  //menu categorias
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();//que no cierre al hacer clic ahi
    moreMenu.classList.toggle("open");
  });
  //Cerrar al clickear afuera
  document.addEventListener("click", () => {
    moreMenu.classList.remove("open");
  });
  //Evitar cerrar con clic derecho
  moreMenu.addEventListener("click", (e) => e.stopPropagation());
});