    navbar.innerHTML = `
        <ul class="navbar-list">
            ${navbarItems.map(item => item.id ? 
                `<li><button id="${item.id}">${item.title}</button></li>` : 
                `<li><a href="${item.url}">${item.title}</a></li>`).join('')}
            <li><a href="carrito.html">🛒 Carrito (<span id="cart-count">0</span>)</a></li>
        </ul>
    `;

    const cartCountSpan = document.getElementById('cart-count');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = count;
    }

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('cart');
            window.location.href = 'Login.html';
        });
    }
});
