document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');
    function renderCart() {
        container.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            container.innerHTML = `
                <p style="text-align:center; font-size:1.1rem; margin-top:20px;">
                    🛒 Tu carrito está vacío
                </p>
            `;
            //Elimino total
            const totalDiv = document.getElementById('cart-total');
            if (totalDiv) {
                totalDiv.innerHTML = '';
            }
            //Contador 0
            updateCartStorage(cart);
            return;
        }
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="product-img">
                <h3 class="product-title">${item.title}</h3>
                <p>Precio unitario: $${item.price.toLocaleString()}</p>
                <div class="quantity-selector">
                    <button class="qty-btn decrease">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn increase">+</button>
                </div>
                <p>Subtotal: $<span class="subtotal">${(item.price * item.quantity).toLocaleString()}</span></p>
                <button class="btn-product remove-item">Eliminar</button>
            `;
            container.appendChild(card);
            // Botones de cantidad
            const decreaseBtn = card.querySelector('.decrease');
            const increaseBtn = card.querySelector('.increase');
            const qtySpan = card.querySelector('.qty');
            const subtotalSpan = card.querySelector('.subtotal');
            const removeBtn = card.querySelector('.remove-item');
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    qtySpan.textContent = item.quantity;
                    subtotalSpan.textContent = (item.price * item.quantity).toLocaleString();
                    updateCartStorage(cart);
                    renderTotal(cart);
                }
            });
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    qtySpan.textContent = item.quantity;
                    subtotalSpan.textContent = (item.price * item.quantity).toLocaleString();
                    updateCartStorage(cart);
                    renderTotal(cart);
                }
            });
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                qtySpan.textContent = item.quantity;
                subtotalSpan.textContent = (item.price * item.quantity).toLocaleString();
                updateCartStorage(cart);
                renderTotal(cart);
            });
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCartStorage(cart);
                renderCart();
            });
        });
        renderTotal(cart);
    }
    function renderTotal(cart) {
        let totalDiv = document.getElementById('cart-total');
        if (!totalDiv) {
            totalDiv = document.createElement('div');
            totalDiv.id = 'cart-total';
            totalDiv.style.textAlign = 'center';
            totalDiv.style.marginTop = '20px';
            container.appendChild(totalDiv);
        }
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalDiv.innerHTML = `<h3>Total: $${total.toLocaleString()}</h3>`;
    }
    function updateCartStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    }
    renderCart();
});