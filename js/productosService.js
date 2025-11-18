export async function getProductos() {
  const respuesta = await fetch('/data/productos.json');

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los productos');
  }

  const data = await respuesta.json();
  return data;
}

export async function getProductosPorCategoria(categoria) {
  const productos = await getProductos();
  return productos.filter(p => p.category === categoria);
}