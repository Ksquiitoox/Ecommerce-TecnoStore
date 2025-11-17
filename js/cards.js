export function renderProductCards(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <h3 class="product-title">${product.title}</h3>
            <p>${product.description}</p>
            <p class="product-price">$${product.price.toLocaleString()}</p>
            <div class="quantity-selector">
                <button class="qty-btn decrease">-</button>
                <span class="qty">1</span>
                <button class="qty-btn increase">+</button>
            </div>
            <button class="btn-product add-cart">Agregar al carrito</button>
        `;
        container.appendChild(card);

        const decreaseBtn = card.querySelector('.decrease');
        const increaseBtn = card.querySelector('.increase');
        const qtySpan = card.querySelector('.qty');
        const addCartBtn = card.querySelector('.add-cart');

        decreaseBtn.addEventListener('click', () => {
            let qty = parseInt(qtySpan.textContent);
            if (qty > 1) qtySpan.textContent = qty - 1;
        });

        increaseBtn.addEventListener('click', () => {
            let qty = parseInt(qtySpan.textContent);
            qtySpan.textContent = qty + 1;
        });

        addCartBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const qty = parseInt(qtySpan.textContent);
            const existingIndex = cart.findIndex(item => item.title === product.title);

            if (existingIndex !== -1) {
                cart[existingIndex].quantity += qty;
            } else {
                cart.push({ ...product, quantity: qty });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cartUpdated'));
            alert(`${qty} x ${product.title} agregado al carrito`);
        });
    });
}
