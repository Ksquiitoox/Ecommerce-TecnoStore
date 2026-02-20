document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-container');

  function renderCart() {
    container.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      container.innerHTML = `
        <section class="product-title" style="text-align:center; margin-top:20px;">
          🛒 Tu carrito está vacío
        <p>
          Si quieres hacer una compra online, selecciona el producto que te interesa y haz clic en el botón Agregar al carrito
        </p>
        </section>
      `;
      document.getElementById('cart-total').innerHTML = '';
      const actionsDiv = document.getElementById("cart-actions");
      actionsDiv.innerHTML = `
        <button id="continue-btn" class="btn-buy">
          Continuar comprando
        </button>
      `;
      document.getElementById("continue-btn").addEventListener("click", () => {
        window.location.href = "../index.html";
      });
      return;
    }

    cart.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="product-img">
        <h3 class="product-title">${item.title}</h3>
        <p>Precio unitario: $${item.price.toLocaleString('es-AR')}</p>

        <div class="quantity-selector">
          <button class="qty-btn decrease">-</button>
          <span class="qty">${item.quantity}</span>
          <button class="qty-btn increase">+</button>
        </div>

        <p>Subtotal: $<span class="subtotal">
          ${(item.price * item.quantity).toLocaleString('es-AR')}
        </span></p>

        <button class="btn-product remove-item">Eliminar</button>
      `;

      container.appendChild(card);

      const decreaseBtn = card.querySelector('.decrease');
      const increaseBtn = card.querySelector('.increase');
      const qtySpan = card.querySelector('.qty');
      const subtotalSpan = card.querySelector('.subtotal');
      const removeBtn = card.querySelector('.remove-item');

      decreaseBtn.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateCart();
        }
      });

      increaseBtn.addEventListener('click', () => {
        item.quantity++;
        updateCart();
      });

      removeBtn.addEventListener('click', () => {
        if (confirm("¿Seguro que querés eliminar este producto?")) {
          cart.splice(index, 1);
          updateCartStorage(cart);
          renderCart();
        }
      });

      function updateCart() {
        qtySpan.textContent = item.quantity;
        subtotalSpan.textContent =
          (item.price * item.quantity).toLocaleString('es-AR');
        updateCartStorage(cart);
        renderCart();
      }
    });

    renderTotal(cart);
    const actionsDiv = document.getElementById("cart-actions");
    actionsDiv.innerHTML = `
      <button id="buy-btn" class="btn-buy">
          Finalizar compra
      </button>
    `;
    document.getElementById("buy-btn").addEventListener("click", () => {
      const confirmPurchase = confirm("¿Confirmar tu compra?");
      if (!confirmPurchase) return;
      alert("¡Compra realizada con éxito!");
      localStorage.removeItem('cart');
      renderCart();
    });
  }
  function renderTotal(cart) {
    const totalDiv = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalDiv.innerHTML = `<h3>Total: $${total.toLocaleString('es-AR')}</h3>`;
  }
  function updateCartStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }
    renderCart();
});
