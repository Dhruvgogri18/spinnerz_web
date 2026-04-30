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
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// Smooth scroll all internal anchor links
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});

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


// ── PREMIUM ANIMATION ENGINE ──────────────────────────────────

// 1. Unified observer — handles all reveal variants + section-label + trusted chips
const allRevealSelectors = '.reveal,.reveal-left,.reveal-right,.reveal-scale,.section-label,.trusted-chip';
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

// 2. Counter animation
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const dur = 1600;
  const start = performance.now();
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
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    animateCounter(e.target);
    counterObserver.unobserve(e.target);
  });
}, { threshold: 0.5 });

// 3. Parallax on scroll
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

// 4. Stagger children inside a revealed parent
function staggerChildren(parent, selector, delay = 80) {
  const children = parent.querySelectorAll(selector);
  children.forEach((el, i) => {
    el.style.transitionDelay = (i * delay) + 'ms';
  });
}

// 5. Magnetic hover on CTA buttons
function initMagnetic() {
  document.querySelectorAll('.btn-red, .nav-wa-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// 6. Text split — animate words in headings
function splitAndAnimate(el, baseDelay = 0) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const words = el.innerHTML.split(/(\s+)/);
  el.innerHTML = words.map((w, i) => {
    if (/^\s+$/.test(w)) return w;
    return `<span class="word-wrap" style="display:inline-block;overflow:visible;line-height:inherit;"><span class="word-inner" style="display:inline-block;transform:translateY(30%);opacity:0;transition:transform .75s cubic-bezier(.16,1,.3,1) ${baseDelay + i*50}ms,opacity .6s ease ${baseDelay + i*50}ms;">${w}</span></span>`;
  }).join('');
}

const headingObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.word-inner').forEach(w => {
      w.style.transform = 'translateY(0)';
      w.style.opacity = '1';
    });
    headingObserver.unobserve(e.target);
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  // Register all reveal elements
  document.querySelectorAll(allRevealSelectors).forEach(el => revealObserver.observe(el));

  // Stagger trusted chips
  const chips = document.querySelectorAll('.trusted-chip');
  chips.forEach((c, i) => { c.style.transitionDelay = (i * 100) + 'ms'; });

  // Counter elements — mark them
  document.querySelectorAll('.about-stat-n, .hero-stat-n, .gs-n, .mfg-sc-n').forEach(el => {
    const txt = el.textContent.trim();
    const match = txt.match(/^([<]?)(\d+\.?\d*)([M+%K<]*)$/);
    if (match) {
      const num = parseFloat(match[2]);
      el.dataset.count = num;
      el.dataset.suffix = match[3] || '';
      el.dataset.prefix = match[1] || '';
      counterObserver.observe(el);
    }
  });

  // Split headings — skip hero-h1 (has its own CSS animation)
  document.querySelectorAll('.section-title').forEach(el => {
    splitAndAnimate(el);
    headingObserver.observe(el);
  });

  // Parallax
  initParallax();

  // Magnetic buttons
  initMagnetic();

  // Add scroll hint to hero
  const hero = document.querySelector('.hero');
  if (hero) {
    const hint = document.createElement('div');
    hint.className = 'hero-scroll-hint';
    hint.textContent = 'Scroll';
    hero.appendChild(hint);
    window.addEventListener('scroll', () => {
      hint.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }
});

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('page-load').classList.add('gone'), 1100);
  renderProducts();
  updateCartCount();
});