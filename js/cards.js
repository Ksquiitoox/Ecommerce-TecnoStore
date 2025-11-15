export function renderProductCards(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let cardsHTML = '';

    products.forEach(product => {
        cardsHTML += `
        <div class="card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <div class="quantity">
                <button class="decrease">-</button>
                <span class="amount">1</span>
                <button class="increase">+</button>
            </div>
        </div>
        `;
    });

    container.innerHTML = cardsHTML;

    // Funcionalidad para aumentar/disminuir cantidad
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
        const decreaseBtn = card.querySelector('.decrease');
        const increaseBtn = card.querySelector('.increase');
        const amountSpan = card.querySelector('.amount');

        decreaseBtn.addEventListener('click', () => {
            let amount = parseInt(amountSpan.textContent);
            if (amount > 1) amountSpan.textContent = amount - 1;
        });

        increaseBtn.addEventListener('click', () => {
            let amount = parseInt(amountSpan.textContent);
            amountSpan.textContent = amount + 1;
        });
    });
}