/* ============================================================
   SPINNERZ — Store JS  (assets/js/store.js)
   Depends on: data.js (loaded first)
   Products are sourced from localStorage (managed by admin).
   ============================================================ */

// Emoji map for categories (fallback when no emoji stored)
const EMOJI_MAP = {
  'Hard Luggage':     '🧳',
  'Soft Luggage':     '🧳',
  'Trolley Bags':     '🛄',
  'Laptop Backpacks': '🎒',
  'Office & Sling':   '💼',
  'Vanity Cases':     '💄',
  'Gym & Lifestyle':  '🏋️',
  'Duffle & Travel':  '👜',
  'Backpacks':        '🎒',
  'Office Bags':      '💼',
  'School & Sports':  '🎒',
};

let activeFilter = 'All';

// ── BUILD FILTER TABS ─────────────────────────────────────────
function buildFilterTabs() {
  const tabsEl = document.getElementById('filterTabs');
  if (!tabsEl) return;
  const products  = getProducts();
  const cats      = ['All', ...new Set(products.map(p => p.category))];
  const counts    = {};
  products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  tabsEl.innerHTML = cats.map(cat => `
    <button class="filter-btn ${cat === 'All' ? 'active' : ''}"
            onclick="filterProducts('${cat}', this)">
      ${cat}${cat !== 'All' ? ` <span class="filter-count">${counts[cat]}</span>` : ''}
    </button>
  `).join('');
}

// ── RENDER PRODUCTS ───────────────────────────────────────────
function renderProducts(filter) {
  if (filter !== undefined) activeFilter = filter;
  const products = getProducts();
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  if (!filtered.length) {
    grid.innerHTML = `<div class="prod-empty"><div class="big">No products</div>Check back soon.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const icon      = p.emoji || EMOJI_MAP[p.category] || '🧳';
    const badgeHtml = p.badge ? `<div class="prod-badge ${p.badge}">${p.badge}</div>` : '';
    const priceHtml = p.price
      ? `<div class="prod-price">
           ₹${Number(p.price).toLocaleString()}
           ${p.origPrice ? `<span class="prod-orig">₹${Number(p.origPrice).toLocaleString()}</span>` : ''}
         </div>`
      : '';
    return `
      <div class="prod-card" onclick="openProduct(${p.id})">
        <div class="prod-img">
          ${icon}
          ${badgeHtml}
          <div class="prod-overlay">
            <button class="prod-overlay-btn primary" onclick="event.stopPropagation();addToCart(${p.id})">Add to Enquiry</button>
            <button class="prod-overlay-btn"         onclick="event.stopPropagation();openProduct(${p.id})">Details</button>
          </div>
        </div>
        <div class="prod-info">
          <div class="prod-cat">${p.category}</div>
          <div class="prod-name">${p.name}</div>
          ${priceHtml}
          <div class="prod-moq">${p.moq || 'MOQ: 500 pcs'}</div>
          ${p.stock && p.stock !== 'In Stock'
            ? `<div class="prod-stock-tag ${p.stock === 'Low Stock' ? 'low' : 'out'}">${p.stock}</div>`
            : ''}
          <a class="prod-cta" href="https://wa.me/919892211065" target="_blank" onclick="event.stopPropagation()">Get Bulk Quote →</a>
        </div>
      </div>
    `;
  }).join('');
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
      if (b.textContent.trim().startsWith(cat)) b.click();
    });
  }, 700);
}

// ── CART (ENQUIRY LIST) ───────────────────────────────────────
function addToCart(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  const cart     = getCart();
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
  const el    = document.getElementById('cartCount');
  if (!el) return;
  const total = getCart().reduce((s, c) => s + (c.qty || 1), 0);
  el.textContent = total;
}

function openCart() {
  const cart  = getCart();
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
          <div style="font-size:28px;">${c.emoji || EMOJI_MAP[c.category] || '🧳'}</div>
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
  const icon = p.emoji || EMOJI_MAP[p.category] || '🧳';
  const featuresHtml = p.features && p.features.length
    ? `<div style="margin-bottom:24px;">${p.features.map(f =>
        `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--ink-mid);">✓ ${f}</div>`
      ).join('')}</div>`
    : '';
  const priceHtml = p.price
    ? `<div style="margin-bottom:16px;">
         <span style="font-size:22px;font-weight:700;color:var(--ink);">₹${Number(p.price).toLocaleString()}</span>
         ${p.origPrice ? `<span style="font-size:14px;color:var(--ink-light);text-decoration:line-through;margin-left:10px;">₹${Number(p.origPrice).toLocaleString()}</span>` : ''}
       </div>`
    : '';

  document.getElementById('productModalContent').innerHTML = `
    <div style="font-size:80px;text-align:center;padding:28px;background:var(--paper);margin-bottom:24px;">${icon}</div>
    <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--ink-light);margin-bottom:6px;">${p.category}</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:400;color:var(--ink);margin-bottom:10px;">${p.name}</h2>
    ${priceHtml}
    <div style="display:inline-block;background:var(--paper);padding:6px 14px;font-size:11px;font-weight:600;color:var(--ink-mid);letter-spacing:1px;margin-bottom:16px;">${p.moq || 'MOQ: 500 pcs'}</div>
    <p style="color:var(--ink-light);font-size:14px;line-height:1.8;margin-bottom:20px;">${p.desc || ''}</p>
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
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});

// ── NAV DARK/LIGHT ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav  = document.getElementById('mainNav');
  const hero = document.querySelector('.hero');
  if (nav && hero) nav.classList.toggle('dark', window.scrollY > hero.offsetHeight - 100);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
if (cursorDot && cursorRing) {
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
}

// ── ANIMATION ENGINE ──────────────────────────────────────────
const allRevealSelectors = '.reveal,.reveal-left,.reveal-right,.reveal-scale,.section-label,.trusted-chip';
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); revealObserver.unobserve(e.target); });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const dur = 1600; const start = performance.now();
  const isFloat = target % 1 !== 0;
  const update = now => {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const val = isFloat ? (target * ease).toFixed(1) : Math.round(target * ease);
    el.textContent = prefix + val + suffix;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (!e.isIntersecting) return; animateCounter(e.target); counterObserver.unobserve(e.target); });
}, { threshold: 0.5 });

function initParallax() {
  const items = document.querySelectorAll('.parallax-img');
  if (!items.length) return;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    items.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * 0.06}px)`;
    });
  }, { passive: true });
}

function initMagnetic() {
  document.querySelectorAll('.btn-red, .nav-wa-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

function splitAndAnimate(el, baseDelay = 0) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const words = el.innerHTML.split(/(\s+)/);
  el.innerHTML = words.map((w, i) => {
    if (/^\s+$/.test(w)) return w;
    return `<span class="word-wrap" style="display:inline-block;overflow:visible;line-height:inherit;"><span class="word-inner" style="display:inline-block;transform:translateY(30%);opacity:0;transition:transform .75s cubic-bezier(.16,1,.3,1) ${baseDelay+i*50}ms,opacity .6s ease ${baseDelay+i*50}ms;">${w}</span></span>`;
  }).join('');
}

const headingObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.word-inner').forEach(w => { w.style.transform='translateY(0)'; w.style.opacity='1'; });
    headingObserver.unobserve(e.target);
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(allRevealSelectors).forEach(el => revealObserver.observe(el));
  const chips = document.querySelectorAll('.trusted-chip');
  chips.forEach((c, i) => { c.style.transitionDelay = (i * 100) + 'ms'; });
  document.querySelectorAll('.about-stat-n, .hero-stat-n, .gs-n, .mfg-sc-n').forEach(el => {
    const match = el.textContent.trim().match(/^([<]?)(\d+\.?\d*)([M+%K<]*)$/);
    if (match) { el.dataset.count = parseFloat(match[2]); el.dataset.suffix = match[3]||''; el.dataset.prefix = match[1]||''; counterObserver.observe(el); }
  });
  document.querySelectorAll('.section-title').forEach(el => { splitAndAnimate(el); headingObserver.observe(el); });
  initParallax();
  initMagnetic();
});

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => { const pl = document.getElementById('page-load'); if (pl) pl.classList.add('gone'); }, 1100);
  buildFilterTabs();
  renderProducts();
  updateCartCount();
});