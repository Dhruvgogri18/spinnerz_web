/* ============================================================
   SPINNERZ — Store JS  (assets/js/store.js)
   Depends on: data.js (loaded first)
   ============================================================ */

let activeFilter = 'All';

// ── RENDER PRODUCTS ───────────────────────────────────────────
function renderProducts(filter) {
  if (filter) activeFilter = filter;
  const products = getProducts();
  const grid = document.getElementById('productsGrid');
  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  if (!filtered.length) {
    grid.innerHTML = `<div class="prod-empty"><div class="big">No products</div>Check back soon.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="prod-card" onclick="openProduct(${p.id})">
      <div class="prod-img">
        ${p.emoji}
        ${p.badge ? `<div class="prod-badge ${p.badge}">${p.badge}</div>` : ''}
        <div class="prod-overlay">
          <button class="prod-overlay-btn primary" onclick="event.stopPropagation();addToCart(${p.id})">Add to Enquiry</button>
          <button class="prod-overlay-btn" onclick="event.stopPropagation();openProduct(${p.id})">Details</button>
        </div>
      </div>
      <div class="prod-info">
        <div class="prod-cat">${p.category}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-moq">${p.moq || 'MOQ: 500 pcs'}</div>
        <a class="prod-cta" href="https://wa.me/919892211065" target="_blank" onclick="event.stopPropagation()">Get Bulk Quote →</a>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}

function filterByCategory(cat) {
  scrollTo('products-section');
  setTimeout(() => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      if (b.textContent.trim() === cat) b.click();
    });
  }, 700);
}

// ── CART (ENQUIRY LIST) ───────────────────────────────────────
function addToCart(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  updateCartCount();
  showToast(`✓ ${product.name} added to enquiry list`);
}

function removeFromCart(id) {
  saveCart(getCart().filter(c => c.id !== id));
  openCart();
}

function updateCartCount() {
  const total = getCart().reduce((s, c) => s + (c.qty || 1), 0);
  document.getElementById('cartCount').textContent = total;
}

function openCart() {
  const cart = getCart();
  const count = cart.reduce((s, c) => s + (c.qty || 1), 0);
  document.getElementById('cartSubtitle').textContent = `${count} item${count !== 1 ? 's' : ''}`;
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (!cart.length) {
    itemsEl.innerHTML = `<p style="color:var(--ink-light);font-size:14px;padding:20px 0;">Your enquiry list is empty.</p>`;
    totalEl.textContent = '';
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:28px;">${c.emoji}</div>
          <div>
            <div style="font-weight:500;font-size:13px;">${c.name}</div>
            <div style="color:var(--ink-light);font-size:11px;">${c.moq || 'MOQ: 500 pcs'}</div>
          </div>
        </div>
        <button onclick="removeFromCart(${c.id})" style="font-size:11px;color:var(--ink-light);background:none;border:none;">Remove</button>
      </div>
    `).join('');
    totalEl.innerHTML = `<p style="font-size:12px;color:var(--ink-light);margin-top:16px;line-height:1.6;">Send this list via WhatsApp and our team will get back with bulk pricing within 24 hours.</p>`;
  }
  openModal('cartModal');
}

// ── PRODUCT DETAIL MODAL ──────────────────────────────────────
function openProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  const featuresHtml = p.features
    ? `<div style="margin-bottom:24px;">${p.features.map(f => `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--ink-mid);">✓ ${f}</div>`).join('')}</div>`
    : '';

  document.getElementById('productModalContent').innerHTML = `
    <div style="font-size:80px;text-align:center;padding:28px;background:var(--paper);margin-bottom:24px;">${p.emoji}</div>
    <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--ink-light);margin-bottom:6px;">${p.category}</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:400;color:var(--ink);margin-bottom:10px;">${p.name}</h2>
    <div style="display:inline-block;background:var(--paper);padding:6px 14px;font-size:11px;font-weight:600;color:var(--ink-mid);letter-spacing:1px;margin-bottom:16px;">${p.moq || 'MOQ: 500 pcs'}</div>
    <p style="color:var(--ink-light);font-size:14px;line-height:1.8;margin-bottom:20px;">${p.desc}</p>
    ${featuresHtml}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
      <button class="btn-red" style="text-align:center;" onclick="addToCart(${p.id});closeModal('productModal')">Add to Enquiry</button>
      <a href="https://wa.me/919892211065" target="_blank" class="btn-ghost" style="text-align:center;color:var(--ink);border-color:var(--border);">WhatsApp →</a>
    </div>
  `;
  openModal('productModal');
}

// ── MODALS ────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.overlay-bg').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── NAV — dark/light + hide topstrip on scroll ────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  const heroH = document.querySelector('.hero').offsetHeight;
  nav.classList.toggle('dark', window.scrollY > heroH - 100);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cursorDot.style.left  = e.clientX + 'px';
  cursorDot.style.top   = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, a, .cat, .prod-card, .program-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.width='52px'; cursorRing.style.height='52px'; cursorRing.style.opacity='.5'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.width='36px'; cursorRing.style.height='36px'; cursorRing.style.opacity='1'; });
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('page-load').classList.add('gone'), 1100);
  renderProducts();
  updateCartCount();
});