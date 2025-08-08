function makeProductCard(product) {
  const hasSale = product.compareAt && product.compareAt > product.price;
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="card-media">
      ${hasSale ? '<div class="badge-sale">Sale</div>' : ''}
      <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;" />
    </div>
    <div class="card-body">
      <div class="card-title">${product.name}</div>
      <div class="card-sub">${product.subtitle}</div>
      <div class="price-row">
        <div>
          <span class="price">$${product.price.toFixed(2)}</span>
          ${hasSale ? `<span class="card-sub" style="text-decoration:line-through; margin-left:8px">$${product.compareAt.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-btn" data-id="${product.id}">Add</button>
      </div>
    </div>
  `;
  el.querySelector('.add-btn').addEventListener('click', () => window.cart.addToCart(product.id));
  return el;
}

function renderGrid(targetId, products) {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = '';
  products.forEach(p => container.appendChild(makeProductCard(p)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrid('featured-grid', window.catalog.getFeaturedProducts());
  renderGrid('new-grid', window.catalog.getNewArrivals());
  renderGrid('sale-grid', window.catalog.getSaleItems());
});