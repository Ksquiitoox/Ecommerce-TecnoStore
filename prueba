document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const products = [
    { category: "Laptops", title: "Notebook Pro 15\"", price: 750000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { category: "Laptops", title: "UltraBook X", price: 890000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0aXhzi_CKAC8UWhtrbbKTvCC3fK8n3gtjow&s" },
    { category: "Laptops", title: "Gaming Beast", price: 1200000, img: "https://media.medion.com/cms/medion/uk/Beast-X25-Laptop_WP-Bg.jpg" },
    { category: "Smartphones", title: "OnePlus 11 Concept", price: 450000, img: "https://i.blogs.es/3de3fe/op/1366_2000.webp" },
    { category: "Smartphones", title: "Unihertz Luna", price: 1200000, img: "https://i.blogs.es/a957c3/nothing/1366_2000.webp" },
    { category: "Smartphones", title: "Realme GT3", price: 690000, img: "https://i.blogs.es/5582e9/realme-gt3/1366_2000.webp" },
    { category: "Accesorios", title: "Smartwatchs Pro", price: 45000, img: "https://istarmax.com/wp-content/uploads/2024/04/Starmax-Product-Range-Summer-2024-2.webp" },
    { category: "Accesorios", title: "Kit Gamer Pc Ex-450", price: 60000, img: "https://smarttucuman.com/img/Public/1130/43425-producto-solarmax-combo-gamer-4-en-1-rgbb.jpg" },
    { category: "Accesorios", title: "Cargador Carga Rápida", price: 50000, img: "https://imagenes.elpais.com/resizer/v2/QZTUJNWHPFGR5LTVPOFJZKCBBU.png" }
  ];

  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const section = document.createElement("div");
    section.classList.add("category-section");

    const title = document.createElement("h2");
    title.classList.add("category-title");
    title.textContent = cat;
    section.appendChild(title);

    const slider = document.createElement("div");
    slider.classList.add("slider");

    products.filter(p => p.category === cat).forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" class="product-img">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-price">$${p.price.toLocaleString()}</p>
        <div class="quantity-selector">
          <button class="qty-btn" onclick="changeQty(this, -1)">-</button>
          <span class="qty">1</span>
          <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
        </div>
        <button class="btn-product">Agregar al carrito</button>
      `;
      slider.appendChild(card);
    });

    section.appendChild(slider);

    // Flechas
    const prevBtn = document.createElement("button");
    prevBtn.className = "slider-btn prev-btn";
    prevBtn.textContent = "◀";
    prevBtn.onclick = () => slider.scrollBy({ left: -270, behavior: "smooth" });

    const nextBtn = document.createElement("button");
    nextBtn.className = "slider-btn next-btn";
    nextBtn.textContent = "▶";
    nextBtn.onclick = () => slider.scrollBy({ left: 270, behavior: "smooth" });

    section.appendChild(prevBtn);
    section.appendChild(nextBtn);

    productsContainer.appendChild(section);
  });
});

// Cantidad
function changeQty(btn, delta) {
  const qtySpan = btn.parentElement.querySelector(".qty");
  let qty = parseInt(qtySpan.textContent);
  qty = Math.max(1, qty + delta);
  qtySpan.textContent = qty;
}
