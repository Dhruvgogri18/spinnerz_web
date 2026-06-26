/* ============================================================
   SPINNERZ — products-page.js  (assets/js/products-page.js)
   Replaces the inline <script> in products.html.
   Depends on: assets/js/data.js (loaded first — provides getProducts())
   Products are managed via the admin panel and stored in localStorage.
   ============================================================ */

// ── STATE ────────────────────────────────────────────────────
let activeCategory = 'All';
let activeColor    = '';
let currentView    = 'grid';
let openProductId  = null;

// Emoji fallback map
const EMOJI_MAP = {
  'Hard Luggage':'🧳','Soft Luggage':'🧳','Trolley Bags':'🛄',
  'Laptop Backpacks':'🎒','Office & Sling':'💼','Vanity Cases':'💄',
  'Gym & Lifestyle':'🏋️','Duffle & Travel':'👜','Backpacks':'🎒',
  'Office Bags':'💼','School & Sports':'🎒','Cabin Luggage':'🧳',
};

// ── SIDEBAR ───────────────────────────────────────────────────
function buildSidebar() {
  const products = getProducts();
  const counts   = {};
  products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  const cats = ['All', ...new Set(products.map(p => p.category))];

  const cl = document.getElementById('categoryList');
  if (cl) {
    cl.innerHTML = cats.map(cat => `
      <div class="sb-category ${cat === 'All' ? 'active' : ''}" onclick="setCategory('${cat}', this)">
        <span>${cat}</span>
        <span class="count">${cat === 'All' ? products.length : (counts[cat] || 0)}</span>
      </div>
    `).join('');
  }

  // Color filters — built from products that have a colorHex field
  // (admin-added products won't have colors; skip gracefully)
  const colorMap = {};
  products.forEach(p => {
    if (p.color && p.colorHex) colorMap[p.color] = p.colorHex;
  });
  const cf = document.getElementById('colorFilters');
  if (cf) {
    const entries = Object.entries(colorMap);
    if (entries.length) {
      cf.innerHTML = entries.map(([name, hex]) => `
        <div class="color-dot" style="background:${hex}" title="${name}" onclick="setColor('${name}', this)"></div>
      `).join('');
    } else {
      // Hide color section if no color data
      const sec = cf.closest('.sb-section');
      if (sec) sec.style.display = 'none';
    }
  }
}

function setCategory(cat, el) {
  activeCategory = cat;
  document.querySelectorAll('.sb-category').forEach(e => e.classList.remove('active'));
  if (el) el.classList.add('active');
  applyFilters();
}

function setColor(color, el) {
  if (activeColor === color) {
    activeColor = '';
    document.querySelectorAll('.color-dot').forEach(e => e.classList.remove('active'));
  } else {
    activeColor = color;
    document.querySelectorAll('.color-dot').forEach(e => e.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  applyFilters();
}

// ── FILTERS ──────────────────────────────────────────────────
function applyFilters() {
  const searchEl = document.getElementById('searchInput');
  const sortEl   = document.getElementById('sortSelect');
  const q        = searchEl ? searchEl.value.toLowerCase() : '';
  const sort     = sortEl ? sortEl.value : 'default';

  let filtered = getProducts().filter(p => {
    const matchCat   = activeCategory === 'All' || p.category === activeCategory;
    const matchColor = !activeColor || p.color === activeColor;
    const matchQ     = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.color || '').toLowerCase().includes(q);
    return matchCat && matchColor && matchQ;
  });

  if (sort === 'name-asc')  filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === 'price-asc') filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  if (sort === 'price-desc')filtered.sort((a, b) => (b.price || 0) - (a.price || 0));

  renderProducts(filtered);
}

// ── RENDER ───────────────────────────────────────────────────
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productsCount');
  if (countEl) countEl.innerHTML = `Showing <strong>${products.length}</strong> product${products.length !== 1 ? 's' : ''}`;
  if (!grid) return;

  if (!products.length) {
    grid.innerHTML = `<div class="no-products"><div class="no-products-icon">🔍</div>No products match your filters.</div>`;
    return;
  }

  grid.innerHTML = products.map(p => {
    const icon     = p.emoji || EMOJI_MAP[p.category] || '🧳';
    const mainImg  = p.images && p.images[0];
    const imgHtml  = mainImg
      ? `<img src="${mainImg}" alt="${p.name}" loading="lazy">`
      : `<div style="aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-size:80px;background:#f0ece6;">${icon}</div>`;

    const swatches = (p.relatedColors || []).map(c =>
      `<div class="prod-color-swatch" style="background:${c.hex}" title="${c.name}"></div>`
    ).join('');

    const priceHtml = p.price
      ? `<div class="prod-price-row" style="margin-bottom:6px;">
           <strong style="font-size:15px;">₹${Number(p.price).toLocaleString()}</strong>
           ${p.origPrice ? `<span style="font-size:12px;color:#6b6b6b;text-decoration:line-through;margin-left:6px;">₹${Number(p.origPrice).toLocaleString()}</span>` : ''}
         </div>`
      : '';

    const stockTag = p.stock && p.stock !== 'In Stock'
      ? `<div style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${p.stock === 'Low Stock' ? '#d97706' : '#dc2626'};margin-bottom:4px;">${p.stock}</div>`
      : '';

    return `
      <div class="prod-card" onclick="openProduct(${p.id})">
        <div class="prod-img-wrap">
          ${imgHtml}
          ${p.badge ? `<div class="prod-badge badge-${p.badge}">${p.badge}</div>` : ''}
          <div class="prod-overlay">
            <button class="prod-overlay-btn primary" onclick="event.stopPropagation();openProduct(${p.id})">View Details</button>
            <button class="prod-overlay-btn" onclick="event.stopPropagation();window.open('https://wa.me/919892211065','_blank')">WhatsApp</button>
          </div>
        </div>
        <div class="prod-info">
          <div class="prod-cat-label">${p.category}</div>
          <div class="prod-name">${p.name}</div>
          ${swatches ? `<div class="prod-colors-row">${swatches}</div>` : ''}
          ${priceHtml}
          ${stockTag}
          <div class="prod-moq">${p.moq || 'MOQ: 500 pcs'}</div>
          <a class="prod-enquire" href="https://wa.me/919892211065" target="_blank" onclick="event.stopPropagation()">Get Bulk Quote →</a>
        </div>
      </div>
    `;
  }).join('');
}

// ── PRODUCT MODAL ─────────────────────────────────────────────
function openProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  openProductId = id;

  const icon    = p.emoji || EMOJI_MAP[p.category] || '🧳';
  const mainImg = p.images && p.images[0];
  const emojiEl = document.getElementById('modalEmoji');
  const mainImgEl = document.getElementById('modalMainImg');

  if (mainImg) {
    mainImgEl.src = mainImg; mainImgEl.style.display = 'block';
    if (emojiEl) emojiEl.style.display = 'none';
  } else {
    mainImgEl.style.display = 'none';
    if (emojiEl) { emojiEl.textContent = icon; emojiEl.style.display = 'flex'; }
  }

  // Thumbnails
  const thumbsEl = document.getElementById('modalThumbs');
  if (thumbsEl && p.images && p.images.length > 1) {
    thumbsEl.innerHTML = p.images.map((img, i) =>
      `<img loading="lazy" src="${img}" alt="" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="switchImg('${img}', this)">`
    ).join('');
  } else if (thumbsEl) {
    thumbsEl.innerHTML = '';
  }

  document.getElementById('modalCat').textContent  = p.category;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalDesc').textContent = p.desc || '';

  // Colors
  const colorsEl = document.getElementById('modalColors');
  if (colorsEl) {
    colorsEl.innerHTML = (p.relatedColors || []).map(c =>
      `<div class="modal-color-btn ${c.name === p.color ? 'active' : ''}" style="background:${c.hex}" title="${c.name}" onclick="switchColor(${c.id})"></div>`
    ).join('') || '<span style="font-size:12px;color:#6b6b6b;">See enquiry for colour options</span>';
  }

  // Features as tags
  const tagsEl = document.getElementById('modalTags');
  if (tagsEl) {
    tagsEl.innerHTML = (p.features || []).map(f => `<div class="modal-tag">${f}</div>`).join('');
  }

  // MOQ
  const moqEl = document.getElementById('modalMoq');
  if (moqEl) {
    const sizesStr = p.sizes ? ` &nbsp;|&nbsp; Sizes: ${p.sizes.join(', ')}` : '';
    moqEl.innerHTML = `<strong>Bulk Orders Only</strong> &nbsp;|&nbsp; ${p.moq || 'MOQ: 500 pcs'}${sizesStr}`;
  }

  // Price in modal (inject if element exists)
  let priceEl = document.getElementById('modalPrice');
  if (!priceEl && p.price) {
    priceEl = document.createElement('div');
    priceEl.id = 'modalPrice';
    priceEl.style.cssText = 'margin-bottom:12px;';
    document.getElementById('modalDesc').insertAdjacentElement('beforebegin', priceEl);
  }
  if (priceEl) {
    priceEl.innerHTML = p.price
      ? `<span style="font-size:22px;font-weight:700;color:#0e0e0e;">₹${Number(p.price).toLocaleString()}</span>${p.origPrice ? `<span style="font-size:14px;color:#6b6b6b;text-decoration:line-through;margin-left:10px;">₹${Number(p.origPrice).toLocaleString()}</span>` : ''}`
      : '';
  }

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function switchImg(src, el) {
  document.getElementById('modalMainImg').src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

function switchColor(id) { openProduct(id); }

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── VIEW TOGGLE ───────────────────────────────────────────────
function setView(v) {
  currentView = v;
  const grid = document.getElementById('productsGrid');
  grid.className = v === 'list' ? 'products-grid list-view' : 'products-grid';
  document.getElementById('gridViewBtn').classList.toggle('active', v === 'grid');
  document.getElementById('listViewBtn').classList.toggle('active', v === 'list');
}

// ── MOBILE ────────────────────────────────────────────────────
function openMobMenu()  { document.getElementById('mobPanel').classList.add('open'); document.getElementById('mobOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobMenu() { document.getElementById('mobPanel').classList.remove('open'); document.getElementById('mobOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function openSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('open'); document.getElementById('sidebarClose').style.display = 'block'; document.body.style.overflow = 'hidden'; }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); document.body.style.overflow = ''; }

// ── EVENT LISTENERS ───────────────────────────────────────────
document.getElementById('productModal').addEventListener('click', e => { if (e.target === document.getElementById('productModal')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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
  document.querySelectorAll('button, a, .prod-card, .sb-category, .color-dot').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.width='52px'; cursorRing.style.height='52px'; cursorRing.style.opacity='.5'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.width='36px'; cursorRing.style.height='36px'; cursorRing.style.opacity='1'; });
  });
}

// ── INIT ──────────────────────────────────────────────────────
buildSidebar();
applyFilters();