document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            container.innerHTML = "<p>El carrito está vacío.</p>";
            return;
        }

        let html = `<table class="cart-table">
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>`;

        let totalCompra = 0;

        cart.forEach((item, index) => {
            const totalItem = item.price * item.quantity;
            totalCompra += totalItem;
            html += `<tr>
                        <td>${item.title}</td>
                        <td>$${item.price.toLocaleString()}</td>
                        <td>
                            <button class="decrease" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-index="${index}">+</button>
                        </td>
                        <td>$${totalItem.toLocaleString()}</td>
                        <td><button class="remove" data-index="${index}">Eliminar</button></td>
                     </tr>`;
        });

        html += `<tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td colspan="2"><strong>$${totalCompra.toLocaleString()}</strong></td>
                 </tr>`;
        html += `</table>`;

        container.innerHTML = html;

        // Agregar eventos a botones
        container.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.getAttribute('data-index');
                cart[idx].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        container.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.getAttribute('data-index');
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            });
        });

        container.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.getAttribute('data-index');
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();
});