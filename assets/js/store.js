/* ============================================================
   SPINNERZ — Store JS  (assets/js/store.js)
   Depends on: data.js  (must be loaded first in index.html)
   ============================================================ */

// ─────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────
let activeFilter = 'All';

// ─────────────────────────────────────────────────────────────
//  PRODUCT RENDERING
// ─────────────────────────────────────────────────────────────

/**
 * Renders the product grid.
 * @param {string} [filter] - Category name or 'All'
 */
function renderProducts(filter) {
  if (filter) activeFilter = filter;

  const products = getProducts();
  const grid     = document.getElementById('productsGrid');
  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="prod-empty">
        <div class="big">No products</div>
        Check back soon or browse all categories.
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="prod-card" onclick="openProduct(${p.id})">
      <div class="prod-img">
        ${p.emoji}
        ${p.badge ? `<div class="prod-badge ${p.badge}">${p.badge}</div>` : ''}
        <div class="prod-overlay">
          <button class="prod-overlay-btn primary"
            onclick="event.stopPropagation(); addToCart(${p.id})">
            Add to Cart
          </button>
          <button class="prod-overlay-btn"
            onclick="event.stopPropagation(); openProduct(${p.id})">
            View
          </button>
        </div>
      </div>
      <div class="prod-info">
        <div class="prod-cat">${p.category}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-prices">
          <div class="prod-price">₹${Number(p.price).toLocaleString()}</div>
          ${p.origPrice
            ? `<div class="prod-orig">₹${Number(p.origPrice).toLocaleString()}</div>`
            : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Filters the product grid and updates the active filter button.
 * Called by the filter bar buttons in index.html.
 */
function filterProducts(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}

/**
 * Scrolls to the products section and activates a category filter.
 * Called by category tile clicks.
 */
function filterByCategory(cat) {
  scrollToSection('products-section');
  setTimeout(() => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      if (b.textContent.trim() === cat) b.click();
    });
  }, 600);
}

// ─────────────────────────────────────────────────────────────
//  CART
// ─────────────────────────────────────────────────────────────

/** Adds a product to the cart by id. Creates or increments qty. */
function addToCart(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;

  const cart     = getCart();
  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`✓ ${product.name} added to cart`);
}

/** Removes a product from the cart by id. */
function removeFromCart(id) {
  const cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
  openCart(); // re-render open cart panel
}

/** Updates the cart item count badge in the navbar. */
function updateCartCount() {
  const total = getCart().reduce((sum, c) => sum + (c.qty || 1), 0);
  document.getElementById('cartCount').textContent = total;
}

/** Opens the cart modal and renders its contents. */
function openCart() {
  const cart     = getCart();
  const count    = cart.reduce((sum, c) => sum + (c.qty || 1), 0);
  const subtitle = document.getElementById('cartSubtitle');
  const itemsEl  = document.getElementById('cartItems');
  const totalEl  = document.getElementById('cartTotal');

  subtitle.textContent = `${count} item${count !== 1 ? 's' : ''}`;

  if (!cart.length) {
    itemsEl.innerHTML = `<p style="color:var(--ink-light);font-size:14px;padding:20px 0;">Your cart is empty.</p>`;
    totalEl.textContent = '';
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div style="display:flex;justify-content:space-between;align-items:center;
                  padding:14px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:28px;">${c.emoji}</div>
          <div>
            <div style="font-weight:500;font-size:14px;">${c.name}</div>
            <div style="color:var(--ink-light);font-size:12px;">Qty: ${c.qty || 1}</div>
          </div>
        </div>
        <div>
          <div style="font-weight:600;color:var(--red);">
            ₹${(Number(c.price) * (c.qty || 1)).toLocaleString()}
          </div>
          <button onclick="removeFromCart(${c.id})"
            style="font-size:11px;color:var(--ink-light);background:none;border:none;
                   float:right;margin-top:4px;">
            Remove
          </button>
        </div>
      </div>
    `).join('');

    const grand = cart.reduce((sum, c) => sum + Number(c.price) * (c.qty || 1), 0);
    totalEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-top:16px;">
        <span>Total</span>
        <span style="color:var(--red);">₹${grand.toLocaleString()}</span>
      </div>`;
  }

  openModal('cartModal');
}

// ─────────────────────────────────────────────────────────────
//  PRODUCT DETAIL MODAL
// ─────────────────────────────────────────────────────────────

/** Opens the product detail modal for a given product id. */
function openProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;

  const stockColor = p.stock === 'In Stock' ? '#16a34a'
                   : p.stock === 'Low Stock' ? '#d97706'
                   : '#dc2626';

  document.getElementById('productModalContent').innerHTML = `
    <div style="font-size:80px;text-align:center;padding:32px;
                background:var(--paper);margin-bottom:24px;">${p.emoji}</div>
    <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;
                color:var(--ink-light);margin-bottom:6px;">${p.category}</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:28px;
               font-weight:400;color:var(--ink);margin-bottom:8px;">${p.name}</h2>
    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:16px;">
      <span style="font-size:22px;font-weight:600;color:var(--red);">
        ₹${Number(p.price).toLocaleString()}
      </span>
      ${p.origPrice
        ? `<span style="font-size:15px;color:var(--ink-light);text-decoration:line-through;">
             ₹${Number(p.origPrice).toLocaleString()}
           </span>`
        : ''}
    </div>
    <p style="color:var(--ink-light);font-size:14px;line-height:1.8;margin-bottom:28px;">
      ${p.desc || 'Premium quality travel gear from Spinnerz Globe.'}
    </p>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:28px;">
      <div style="width:8px;height:8px;border-radius:50%;background:${stockColor};"></div>
      <span style="font-size:13px;color:var(--ink-mid);">${p.stock || 'In Stock'}</span>
    </div>
    <button class="btn-red" style="width:100%;text-align:center;"
      onclick="addToCart(${p.id}); closeModal('productModal')">
      Add to Cart
    </button>
  `;

  openModal('productModal');
}

// ─────────────────────────────────────────────────────────────
//  MODAL HELPERS
// ─────────────────────────────────────────────────────────────

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Close modal when clicking the dark backdrop
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.overlay-bg').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
});

// ─────────────────────────────────────────────────────────────
//  TOAST NOTIFICATION
// ─────────────────────────────────────────────────────────────

/** Shows a brief toast notification at the bottom of the screen. */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─────────────────────────────────────────────────────────────
//  SMOOTH SCROLL
// ─────────────────────────────────────────────────────────────

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────────
//  NAV — switch between light / dark based on scroll position
// ─────────────────────────────────────────────────────────────

window.addEventListener('scroll', () => {
  const nav   = document.getElementById('mainNav');
  const heroH = document.querySelector('.hero').offsetHeight;
  nav.classList.toggle('dark', window.scrollY > heroH - 100);
});

// ─────────────────────────────────────────────────────────────
//  CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────

const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursorDot.style.left  = e.clientX + 'px';
  cursorDot.style.top   = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});

// Expand ring when hovering interactive elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, a, .cat, .prod-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width   = '52px';
      cursorRing.style.height  = '52px';
      cursorRing.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width   = '36px';
      cursorRing.style.height  = '36px';
      cursorRing.style.opacity = '1';
    });
  });
});

// ─────────────────────────────────────────────────────────────
//  SCROLL REVEAL
// ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// ─────────────────────────────────────────────────────────────
//  INIT — runs after the page fully loads
// ─────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  // Hide the page loader after a short delay
  setTimeout(() => document.getElementById('page-load').classList.add('gone'), 1100);

  // Populate product grid and cart count
  renderProducts();
  updateCartCount();
});