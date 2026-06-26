/* ============================================================
   SPINNERZ — Admin JS  (admin/js/admin.js)
   Depends on: assets/js/supabase-config.js + assets/js/data.js
   ============================================================ */

const SESSION_KEY = 'sz_admin_session';

const _STOP = new Set(['front','back','side','angle','detail','open','top','bottom',
  'blue','red','green','yellow','black','white','grey','gray','silver','gold','pink',
  'purple','brown','navy','khaki','teal','rose','lime','bright','graphite','peacock','ice','light']);

function groupFromImage(src) {
  const name = src.split('/').pop().replace(/\.[^.]+$/, '');
  const parts = name.split('-'), prefix = [];
  for (const p of parts) {
    if (p.includes('_') || _STOP.has(p.toLowerCase())) break;
    prefix.push(p);
  }
  return prefix.length ? prefix.join('-') : null;
}

// ── AUTH ──────────────────────────────────────────────────────
function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === 'true'; }

async function attemptLogin() {
  const input = document.getElementById('passwordInput').value;
  const error = document.getElementById('loginError');
  if (input === getAdminPw()) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.add('visible');
    await initAdmin();
  } else {
    error.classList.add('show');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordInput').focus();
    setTimeout(() => error.classList.remove('show'), 3500);
  }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('adminApp').classList.remove('visible');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('passwordInput').value = '';
}

// ── INIT ──────────────────────────────────────────────────────
async function initAdmin() {
  showToast('Loading products…', '');
  await getProductsAsync();
  renderDashboard(); renderProductsTable(); populateColorGroupLists();
}

function populateColorGroupLists() {
  const products = getProducts();
  const groups = [...new Set(products.map(p => p.colorGroup || autoColorGroup(p)).filter(Boolean))];
  ['colorGroupList','editColorGroupList'].forEach(id => {
    const dl = document.getElementById(id);
    if (dl) dl.innerHTML = groups.map(g => `<option value="${g}">`).join('');
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if (isLoggedIn()) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.add('visible');
    await initAdmin();
  }
  document.getElementById('passwordInput')
    .addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
  document.getElementById('editModal')
    .addEventListener('click', e => { if (e.target === document.getElementById('editModal')) closeEditModal(); });
});

// ── SECTION NAVIGATION ────────────────────────────────────────
const SECTION_TITLES = { 'dashboard':'Dashboard', 'products':'Products', 'add-product':'Add Product', 'settings':'Settings' };

function showSec(id, el) {
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('topbarTitle').textContent = SECTION_TITLES[id] || '';
  if (id === 'products')  renderProductsTable();
  if (id === 'dashboard') renderDashboard();
}

// ── HELPERS ───────────────────────────────────────────────────
function imgSrc(src, prefix = '../') {
  if (!src) return '';
  return src.startsWith('data:') ? src : prefix + src;
}

function thumbHtml(src, prefix) {
  return `<img src="${imgSrc(src, prefix)}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
}

// ── DASHBOARD ─────────────────────────────────────────────────
function renderDashboard() {
  const products = getProducts();
  document.getElementById('dashTotalProducts').textContent = products.length;
  document.getElementById('dashInStock').textContent       = products.filter(p => p.stock === 'In Stock').length;
  document.getElementById('dashLowStock').textContent      = products.filter(p => p.stock === 'Low Stock').length;
  const recent = [...products].slice(-5).reverse();
  document.getElementById('dashRecentTable').innerHTML = `
    <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
    <tbody>${recent.map(p => `
      <tr>
        <td><div style="display:flex;align-items:center;gap:12px;">
          <div class="thumb">${p.images && p.images[0] ? thumbHtml(p.images[0], '../') : (p.emoji || '🧳')}</div>
          <span>${p.name}</span>
        </div></td>
        <td>${p.category}</td>
        <td>${p.price ? '₹' + Number(p.price).toLocaleString() : '—'}</td>
        <td data-label="Stock"><span class="badge ${stockBadgeClass(p.stock)}">${p.stock}</span></td>
      </tr>`).join('')}
    </tbody>`;
}

// ── PRODUCTS TABLE ────────────────────────────────────────────
let searchQuery = '';

function renderProductsTable() {
  const products = getProducts();
  const filtered = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery))
    : products;

  document.getElementById('productsTable').innerHTML = `
    <thead><tr><th>Product</th><th>Category</th><th>Sizes</th><th>Price</th><th>Badge</th><th>Stock</th><th>Actions</th></tr></thead>
    <tbody>${filtered.map(p => `
      <tr>
        <td><div style="display:flex;align-items:center;gap:12px;">
          <div class="thumb">${p.images && p.images[0] ? thumbHtml(p.images[0], '../') : (p.emoji || '🧳')}</div>
          <strong style="font-size:13px;">${p.name}</strong>
        </div></td>
        <td data-label="Category" style="font-size:12px;color:var(--ink-light);">${p.category}</td>
        <td style="font-size:11px;color:var(--ink-light);">${(()=>{const sz=Array.isArray(p.sizes)?p.sizes:(p.sizes?p.sizes.split(',').map(s=>s.trim()).filter(Boolean):[]);return sz.length?sz.join(', '):'—'})()}</td>
        <td>
          ${p.price ? `<strong>₹${Number(p.price).toLocaleString()}</strong>` : '—'}
          ${p.origPrice ? `<div style="font-size:11px;color:var(--ink-light);text-decoration:line-through;">₹${Number(p.origPrice).toLocaleString()}</div>` : ''}
        </td>
        <td data-label="Badge">${p.badge ? `<span class="badge badge-navy">${p.badge}</span>` : '–'}</td>
        <td data-label="Stock"><span class="badge ${stockBadgeClass(p.stock)}">${p.stock}</span></td>
        <td><div class="actions">
          <button class="btn btn-outline btn-sm" onclick="openEditModal(${p.id})">Edit</button>
          <button class="btn btn-danger btn-sm"  onclick="confirmDelete(${p.id})">Delete</button>
        </div></td>
      </tr>`).join('')}
    </tbody>`;
}

function searchProducts(q) { searchQuery = q.toLowerCase(); renderProductsTable(); }

// ── IMAGE PREVIEW WITH REMOVE ─────────────────────────────────
let pendingImages = [];
let editImages    = [];

function renderImagePreview(containerId, images, onRemove) {
  const container = document.getElementById(containerId);
  container.innerHTML = images.map((src, i) => `
    <div class="img-preview-item" style="position:relative;width:80px;height:80px;display:inline-block;margin:4px;">
      <img src="${src}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;border:1px solid #ddd;">
      <button onclick="${onRemove}(${i})" style="position:absolute;top:-6px;right:-6px;background:#c0251a;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:13px;cursor:pointer;line-height:20px;text-align:center;padding:0;font-weight:bold;">×</button>
    </div>`).join('');
}

function removePendingImage(i) {
  pendingImages.splice(i, 1);
  renderImagePreview('pImagesPreview', pendingImages, 'removePendingImage');
}

function removeEditImage(i) {
  editImages.splice(i, 1);
  renderImagePreview('editImagesPreview', editImages, 'removeEditImage');
}

async function handleImageSelect(inputId, previewId) {
  const input = document.getElementById(inputId);
  const newFiles = await readFilesAsBase64(input);
  if (inputId === 'pImages') {
    pendingImages = pendingImages.concat(newFiles);
    renderImagePreview(previewId, pendingImages, 'removePendingImage');
  } else {
    editImages = editImages.concat(newFiles);
    renderImagePreview(previewId, editImages, 'removeEditImage');
  }
  const groupInputId = inputId === 'pImages' ? 'pColorGroup' : 'editColorGroup';
  const groupEl = document.getElementById(groupInputId);
  if (groupEl && !groupEl.value && input.files[0]) {
    const g = groupFromImage(input.files[0].name);
    if (g) groupEl.value = g;
  }
  input.value = '';
}

// ── ADD PRODUCT ───────────────────────────────────────────────
let selectedEmoji = '🧳';

function selectEmoji(em, el) {
  selectedEmoji = em;
  document.getElementById('selectedEmojiDisplay').textContent = em;
  document.querySelectorAll('.emoji-opt').forEach(e => e.classList.remove('sel'));
  if (el) el.classList.add('sel');
}

async function addProduct() {
  const name      = document.getElementById('pName').value.trim();
  const category  = document.getElementById('pCategory').value;
  if (!name || !category) { showToast('⚠️ Name and category are required', 'danger'); return; }

  const products = getProducts();
  products.push({
    id:         Date.now(),
    name,       category,
    price:      Number(document.getElementById('pPrice').value) || null,
    origPrice:  Number(document.getElementById('pOrigPrice').value) || null,
    badge:      document.getElementById('pBadge').value,
    emoji:      selectedEmoji,
    stock:      document.getElementById('pStock').value,
    desc:       document.getElementById('pDesc').value.trim(),
    moq:        document.getElementById('pMoq').value.trim() || 'MOQ: 500 pcs',
    sizes:      document.getElementById('pSizes').value.trim(),
    colorGroup: document.getElementById('pColorGroup').value.trim(),
    colorHex:   document.getElementById('pColorHex').value.trim() || '',
    images:     pendingImages,
    features:   document.getElementById('pFeatures').value.split('\n').map(f => f.trim()).filter(Boolean),
  });

  try {
    await saveProducts(products);
    showToast('✓ Product published — live on store', 'success');
    resetForm();
    showSec('products', document.querySelectorAll('.nav-item')[1]);
  } catch(e) {
    showToast('⚠️ Save failed: ' + e.message, 'danger');
  }
}

function resetForm() {
  ['pName','pPrice','pOrigPrice','pDesc','pFeatures'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('pCategory').value    = '';
  document.getElementById('pBadge').value        = '';
  document.getElementById('pStock').value        = 'In Stock';
  document.getElementById('pMoq').value          = '';
  document.getElementById('pSizes').value        = '';
  document.getElementById('pColorGroup').value   = '';
  document.getElementById('pColorHex').value     = '';
  document.getElementById('pColorPicker').value  = '#1a1a1a';
  pendingImages = [];
  document.getElementById('pImagesPreview').innerHTML = '';
  selectEmoji('🧳', document.querySelector('.emoji-opt'));
}

// ── DELETE PRODUCT ────────────────────────────────────────────
async function confirmDelete(id) {
  if (!confirm('Delete this product? It will be removed from the store immediately.')) return;
  try {
    await deleteProduct(id);
    renderProductsTable(); renderDashboard();
    showToast('Product deleted', 'danger');
  } catch(e) {
    showToast('⚠️ Delete failed: ' + e.message, 'danger');
  }
}

// ── EDIT MODAL ────────────────────────────────────────────────
function openEditModal(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  document.getElementById('editId').value         = p.id;
  document.getElementById('editName').value       = p.name;
  document.getElementById('editCategory').value   = p.category;
  document.getElementById('editPrice').value      = p.price || '';
  document.getElementById('editOrigPrice').value  = p.origPrice || '';
  document.getElementById('editBadge').value      = p.badge || '';
  document.getElementById('editStock').value      = p.stock;
  document.getElementById('editDesc').value       = p.desc || '';
  document.getElementById('editMoq').value        = p.moq || '';
  document.getElementById('editSizes').value      = Array.isArray(p.sizes) ? p.sizes.join(', ') : (p.sizes || '');
  document.getElementById('editColorGroup').value = p.colorGroup || '';
  document.getElementById('editColorHex').value   = p.colorHex || '';
  const ehex = p.colorHex || '#1a1a1a';
  document.getElementById('editColorPicker').value = ehex.match(/^#[0-9a-fA-F]{6}$/) ? ehex : '#1a1a1a';
  document.getElementById('editFeatures').value   = (p.features || []).join('\n');

  editImages = (p.images || []).map(src => src.startsWith('data:') ? src : '../' + src);
  renderImagePreview('editImagesPreview', editImages, 'removeEditImage');

  document.getElementById('editModal').classList.add('open');
  previewGroup(p.colorGroup || autoColorGroup(p) || '', 'editGroupPreview');
}

async function saveEdit() {
  const id   = Number(document.getElementById('editId').value);
  const name = document.getElementById('editName').value.trim();
  if (!name) { showToast('⚠️ Name is required', 'danger'); return; }

  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return;

  products[idx] = {
    ...products[idx],
    name,
    category:   document.getElementById('editCategory').value,
    price:      Number(document.getElementById('editPrice').value) || null,
    origPrice:  Number(document.getElementById('editOrigPrice').value) || null,
    badge:      document.getElementById('editBadge').value,
    stock:      document.getElementById('editStock').value,
    desc:       document.getElementById('editDesc').value.trim(),
    moq:        document.getElementById('editMoq').value.trim() || 'MOQ: 500 pcs',
    sizes:      document.getElementById('editSizes').value.trim(),
    features:   document.getElementById('editFeatures').value.split('\n').map(f => f.trim()).filter(Boolean),
    images:     editImages,
    colorGroup: document.getElementById('editColorGroup').value.trim(),
    colorHex:   document.getElementById('editColorHex').value.trim(),
  };

  try {
    await saveProducts(products);
    renderProductsTable(); renderDashboard();
    closeEditModal();
    showToast('✓ Product updated — live on store', 'success');
  } catch(e) {
    showToast('⚠️ Save failed: ' + e.message, 'danger');
  }
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('open');
  editImages = [];
}

// ── SETTINGS ──────────────────────────────────────────────────
function changePassword() {
  const cur  = document.getElementById('curPwd').value;
  const nw   = document.getElementById('newPwd').value;
  const conf = document.getElementById('confPwd').value;
  if (cur !== getAdminPw())  { showToast('⚠️ Current password is incorrect', 'danger'); return; }
  if (nw.length < 6)         { showToast('⚠️ New password must be 6+ characters', 'danger'); return; }
  if (nw !== conf)           { showToast('⚠️ Passwords do not match', 'danger'); return; }
  setAdminPw(nw);
  ['curPwd','newPwd','confPwd'].forEach(id => document.getElementById(id).value = '');
  showToast('✓ Password updated', 'success');
}

async function confirmReset() {
  if (!confirm('Reset all products to default catalogue? This cannot be undone.')) return;
  try {
    await resetProducts();
    renderProductsTable(); renderDashboard();
    showToast('✓ Product data reset to defaults', 'success');
  } catch(e) {
    showToast('⚠️ Reset failed: ' + e.message, 'danger');
  }
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast' + (type ? ' ' + type : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ── UTILITIES ─────────────────────────────────────────────────
function stockBadgeClass(stock) {
  if (stock === 'In Stock')  return 'badge-green';
  if (stock === 'Low Stock') return 'badge-amber';
  return 'badge-red';
}

function readFilesAsBase64(input) {
  return Promise.all([...input.files].map(f => new Promise(res => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(f);
  })));
}

// ── GROUP PREVIEW ─────────────────────────────────────────────
function previewGroup(groupName, panelId) {
  const panel = document.getElementById(panelId);
  const itemsEl = document.getElementById(panelId.replace('Preview','Items'));
  if (!panel || !itemsEl) return;
  const g = groupName.trim();
  if (!g) { panel.classList.remove('visible'); return; }

  const members = getProducts().filter(p => {
    const pg = p.colorGroup || autoColorGroup(p);
    return pg === g;
  });

  if (!members.length) { panel.classList.remove('visible'); return; }
  panel.classList.add('visible');
  itemsEl.innerHTML = members.map(p => {
    const img = p.images && p.images[0];
    const imgHtml = img
      ? `<img class="group-preview-img" src="${img.startsWith('data:') ? img : '../' + img}" alt="">`
      : `<div class="group-preview-img" style="display:flex;align-items:center;justify-content:center;font-size:22px;">${p.emoji || '🧳'}</div>`;
    const dotStyle = p.colorHex ? `background:${p.colorHex}` : 'background:#ccc';
    return `<div class="group-preview-item">
      ${imgHtml}
      <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
        <div class="group-preview-dot" style="${dotStyle}"></div>
      </div>
      <div class="group-preview-name">${(p.color || p.name).split('—').pop().trim()}</div>
    </div>`;
  }).join('');
}

// ── MOBILE SIDEBAR ─────────────────────────────────────────────
function openMobSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('mobOverlay').classList.add('open'); }
function closeMobSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('mobOverlay').classList.remove('open'); }