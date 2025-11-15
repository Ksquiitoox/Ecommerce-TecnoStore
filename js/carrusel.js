document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  if (!productsContainer) return;

  const products = [
    //LAPTOPS
    { category: "Laptops", title: "Notebook Pro 15\"", price: 750000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { category: "Laptops", title: "UltraBook X", price: 890000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0aXhzi_CKAC8UWhtrbbKTvCC3fK8n3gtjow&s" },
    { category: "Laptops", title: "Gaming Beast", price: 1200000, img: "https://media.medion.com/cms/medion/uk/Beast-X25-Laptop_WP-Bg.jpg" },
    //SMARTPHONES
    { category: "Smartphones", title: "OnePlus 11 Concept", price: 450000, img: "https://i.blogs.es/3de3fe/op/1366_2000.webp" },
    { category: "Smartphones", title: "Unihertz Luna", price: 1200000, img: "https://i.blogs.es/a957c3/nothing/1366_2000.webp" },
    { category: "Smartphones", title: "Realme GT3", price: 690000, img: "https://i.blogs.es/5582e9/realme-gt3/1366_2000.webp" },
    //ACCESORIOS
    { category: "Accesorios", title: "Smartwatchs Pro", price: 45000, img: "https://istarmax.com/wp-content/uploads/2024/04/Starmax-Product-Range-Summer-2024-2.webp" },
    { category: "Accesorios", title: "Kit Gamer Pc Ex-450", price: 60000, img: "https://smarttucuman.com/img/Public/1130/43425-producto-solarmax-combo-gamer-4-en-1-rgbb.jpg" },
    { category: "Accesorios", title: "Cargador Carga Rápida", price: 50000, img: "https://imagenes.elpais.com/resizer/v2/QZTUJNWHPFGR5LTVPOFJZKCBBU.png?auth=0d8390af677bfaefdf5e239f5a41c2c6cddc80473bdaf867cb7a43170c246043&width=1960" }
  ];

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  // Crear wrapper del carrusel
  const wrapper = document.createElement("div");
  wrapper.classList.add("slider-wrapper");

  // Título
  const title = document.createElement("h2");
  title.classList.add("category-title");
  title.textContent = "Producto recomendado";
  wrapper.appendChild(title);

  // Slider
  const slider = document.createElement("div");
  slider.classList.add("slider");

  shuffledProducts.forEach(p => {
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

  wrapper.appendChild(slider);

  // Botones de flecha
  const prevBtn = document.createElement("button");
  prevBtn.classList.add("slider-btn", "prev-btn");
  prevBtn.textContent = "◀";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("slider-btn", "next-btn");
  nextBtn.textContent = "▶";

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  productsContainer.appendChild(wrapper);

  // Control de índice
  let currentIndex = 0;
  const cards = slider.querySelectorAll(".product-card");

  function showCard(index) {
    const offset = index * slider.offsetWidth;
    slider.scrollTo({ left: offset, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  });

  // Inicial mostrar primera card
  showCard(currentIndex);
});

//Cantidad de productos
function changeQty(btn, delta) {
  const qtySpan = btn.parentElement.querySelector(".qty");
  let qty = parseInt(qtySpan.textContent);
  qty = Math.max(1, qty + delta);
  qtySpan.textContent = qty;
}