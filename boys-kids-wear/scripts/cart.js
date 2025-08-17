const STORAGE_KEY = 'boyzwear_cart_v1';

const CartStore = {
  load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  },
  save(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); },
  add(productId, size = null, qty = 1) {
    const items = CartStore.load();
    const idx = items.findIndex(i => i.id === productId && i.size === size);
    if (idx >= 0) { items[idx].qty += qty; } else { items.push({ id: productId, size, qty }); }
    CartStore.save(items);
    return items;
  },
  update(productId, size, qty) {
    let items = CartStore.load();
    items = items.map(i => (i.id === productId && i.size === size ? { ...i, qty } : i)).filter(i => i.qty > 0);
    CartStore.save(items);
    return items;
  },
  remove(productId, size) {
    const items = CartStore.load().filter(i => !(i.id === productId && i.size === size));
    CartStore.save(items);
    return items;
  },
  clear() { CartStore.save([]); }
};

function formatPrice(n) { return `$${n.toFixed(2)}`; }

function computeSubtotal(items) {
  return items.reduce((sum, i) => {
    const p = window.catalog.getProductById(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  const items = CartStore.load();
  const container = document.getElementById('cart-items');
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = computeSubtotal(items);
  document.getElementById('cart-count').textContent = String(count);
  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);

  if (!container) return;
  container.innerHTML = '';
  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.style.padding = '16px';
    empty.textContent = 'Your cart is empty';
    container.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const p = window.catalog.getProductById(item.id);
    if (!p) return;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div>
        <div style="font-weight:800">${p.name}</div>
        <div class="card-sub">${item.size ? `Size: ${item.size}` : ''}</div>
        <div class="card-sub">${formatPrice(p.price)}</div>
      </div>
      <div style="display:grid; gap:8px; justify-items:end">
        <div class="qty">
          <button aria-label="decrease" data-dec>−</button>
          <input type="number" min="1" value="${item.qty}" />
          <button aria-label="increase" data-inc>+</button>
        </div>
        <button class="icon-btn" data-remove>Remove</button>
      </div>
    `;
    const input = row.querySelector('input');
    const dec = row.querySelector('[data-dec]');
    const inc = row.querySelector('[data-inc]');
    const remove = row.querySelector('[data-remove]');

    const onUpdate = (nextQty) => {
      CartStore.update(item.id, item.size, Math.max(0, nextQty));
      renderCart();
    };

    input.addEventListener('change', () => onUpdate(parseInt(input.value || '1', 10)));
    dec.addEventListener('click', () => onUpdate(item.qty - 1));
    inc.addEventListener('click', () => onUpdate(item.qty + 1));
    remove.addEventListener('click', () => { CartStore.remove(item.id, item.size); renderCart(); });

    container.appendChild(row);
  });
}

function toggleCart(show) {
  const cart = document.getElementById('cart');
  if (!cart) return;
  cart.setAttribute('aria-hidden', show ? 'false' : 'true');
}

function bindCartUI() {
  const btn = document.getElementById('cart-button');
  const cart = document.getElementById('cart');
  if (btn) btn.addEventListener('click', () => { toggleCart(true); renderCart(); });
  if (cart) cart.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof Element && (t.hasAttribute('data-close') || t.closest('[data-close]'))) toggleCart(false);
  });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function addToCart(productId, size = null, qty = 1) {
  CartStore.add(productId, size, qty);
  renderCart();
}

window.cart = { addToCart, renderCart };

document.addEventListener('DOMContentLoaded', () => {
  bindCartUI();
  renderCart();
});