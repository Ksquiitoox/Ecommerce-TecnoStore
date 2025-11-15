document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    const navbarItems = [
      { title: "Home", url: "index.html" },
      { title: "Categorías", url: "Categorias.html" },
      { title: "Laptops", url: "Laptops.html" },
      { title: "Smartphones", url: "Smartphones.html" },
      { title: "Accesorios", url: "Accesorios.html" },
      { title: "Login", url: "Login.html" },
      { title: "Registro", url: "Register.html" },
      { title: "Logout", url: "#", id: "logoutBtn" }
    ];

    navbar.innerHTML = `
        <div class="logo">
            <img src="img/logo.png" alt="Logo">
            <h1>TecnoStore</h1>
        </div>
        <ul class="nav-links">
            ${navbarItems.map(item => {
                if(item.id) return `<li><a href="${item.url}" id="${item.id}">${item.title}</a></li>`;
                return `<li><a href="${item.url}">${item.title}</a></li>`;
            }).join('')}
            <li>
                <a href="carrito.html" class="cart-link">
                    🛒 Carrito (<span id="cart-count">0</span>)
                </a>
            </li>
        </ul>
    `;

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
