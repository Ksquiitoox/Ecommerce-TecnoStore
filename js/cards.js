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
            <p class="product-description">${product.description}</p>

            <p class="product-price">$${product.price.toLocaleString()}</p>

            <div class="quantity-selector">
                <button class="qty-btn decrease">-</button>
                <span class="qty">1</span>
                <button class="qty-btn increase">+</button>
            </div>

            <button class="btn-product add-cart">Agregar al carrito</button>
        `;

        container.appendChild(card);

        // =========================
        // SELECTORES
        // =========================

        const decreaseBtn = card.querySelector('.decrease');
        const increaseBtn = card.querySelector('.increase');
        const qtySpan = card.querySelector('.qty');
        const addCartBtn = card.querySelector('.add-cart');

        // =========================
        // CONTROL DE CANTIDAD
        // =========================

        decreaseBtn.addEventListener('click', () => {
            let qty = parseInt(qtySpan.textContent);
            if (qty > 1) {
                qtySpan.textContent = qty - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let qty = parseInt(qtySpan.textContent);
            qtySpan.textContent = qty + 1;
        });

        // =========================
        // AGREGAR AL CARRITO
        // =========================

        addCartBtn.addEventListener('click', () => {

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const quantity = parseInt(qtySpan.textContent);

            // ⚠️ IMPORTANTE: usar ID en vez de title
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Resetear cantidad visual
            qtySpan.textContent = 1;

            // Disparar evento para actualizar contador
            window.dispatchEvent(new Event('cartUpdated'));

            alert(`${quantity} x ${product.title} agregado al carrito`);
        });

    });
}
