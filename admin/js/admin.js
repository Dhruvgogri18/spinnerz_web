/* ============================================================
   SPINNERZ — Admin JS  (admin/js/admin.js)
   Depends on: assets/js/data.js  (loaded first in admin.html)
   ============================================================ */

// ─────────────────────────────────────────────────────────────
//  SESSION KEY
// ─────────────────────────────────────────────────────────────
const SESSION_KEY = 'sz_admin_session';

// ─────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────

/** Returns true if admin is logged in this browser tab. */
function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

/** Verifies password and shows the admin app. */
function attemptLogin() {
  const input = document.getElementById('passwordInput').value;
  const error = document.getElementById('loginError');

  if (input === getAdminPw()) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.add('visible');
    initAdmin();
  } else {
    error.classList.add('show');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordInput').focus();
    setTimeout(() => error.classList.remove('show'), 3500);
  }
}

/** Clears the session and returns to the login screen. */
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('adminApp').classList.remove('visible');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('passwordInput').value = '';
}

// ─────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────

/** Bootstraps the admin UI after successful login. */
function initAdmin() {
  renderDashboard();
  renderProductsTable();
}

// Auto-login if session exists (tab reload / same session)
document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.add('visible');
    initAdmin();
  }

  // Enter key on password field
  document.getElementById('passwordInput')
    .addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });

  // Close modal on backdrop click
  document.getElementById('editModal')
    .addEventListener('click', e => {
      if (e.target === document.getElementById('editModal')) closeEditModal();
    });
});

// ─────────────────────────────────────────────────────────────
//  SECTION NAVIGATION
// ─────────────────────────────────────────────────────────────

const SECTION_TITLES = {
  'dashboard':   'Dashboard',
  'products':    'Products',
  'add-product': 'Add Product',
  'settings':    'Settings'
};

/**
 * Switches the visible admin section.
 * @param {string} id   - Section key (e.g. 'products')
 * @param {Element} el  - The nav-item element that was clicked
 */
function showSec(id, el) {
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('topbarTitle').textContent = SECTION_TITLES[id] || '';

  // Refresh data when switching to these views
  if (id === 'products')  renderProductsTable();
  if (id === 'dashboard') renderDashboard();
}

// ─────────────────────────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────────────────────────

/** Populates the dashboard stat cards and recent products table. */
function renderDashboard() {
  const products = getProducts();
  document.getElementById('dashTotalProducts').textContent = products.length;
  document.getElementById('dashInStock').textContent  = products.filter(p => p.stock === 'In Stock').length;
  document.getElementById('dashLowStock').textContent = products.filter(p => p.stock === 'Low Stock').length;

  const recent = [...products].slice(-5).reverse();
  document.getElementById('dashRecentTable').innerHTML = `
    <thead>
      <tr>
        <th>Product</th><th>Category</th><th>Price</th><th>Stock</th>
      </tr>
    </thead>
    <tbody>
      ${recent.map(p => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <div class="thumb">${p.emoji}</div>
              <span>${p.name}</span>
            </div>
          </td>
          <td>${p.category}</td>
          <td>₹${Number(p.price).toLocaleString()}</td>
          <td>
            <span class="badge ${stockBadgeClass(p.stock)}">${p.stock}</span>
          </td>
        </tr>
      `).join('')}
    </tbody>`;
}

// ─────────────────────────────────────────────────────────────
//  PRODUCTS TABLE
// ─────────────────────────────────────────────────────────────

let searchQuery = '';

/** Renders the full products table, optionally filtered by searchQuery. */
function renderProductsTable() {
  const products = getProducts();
  const filtered = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery))
    : products;

  document.getElementById('productsTable').innerHTML = `
    <thead>
      <tr>
        <th>Product</th><th>Category</th><th>Price</th>
        <th>Badge</th><th>Stock</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${filtered.map(p => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <div class="thumb">${p.emoji}</div>
              <strong style="font-size:13px;">${p.name}</strong>
            </div>
          </td>
          <td style="font-size:12px;color:var(--ink-light);">${p.category}</td>
          <td>
            <strong>₹${Number(p.price).toLocaleString()}</strong>
            ${p.origPrice
              ? `<div style="font-size:11px;color:var(--ink-light);text-decoration:line-through;">
                   ₹${Number(p.origPrice).toLocaleString()}
                 </div>`
              : ''}
          </td>
          <td>
            ${p.badge
              ? `<span class="badge badge-navy">${p.badge}</span>`
              : '–'}
          </td>
          <td>
            <span class="badge ${stockBadgeClass(p.stock)}">${p.stock}</span>
          </td>
          <td>
            <div class="actions">
              <button class="btn btn-outline btn-sm" onclick="openEditModal(${p.id})">Edit</button>
              <button class="btn btn-danger btn-sm"  onclick="deleteProduct(${p.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('')}
    </tbody>`;
}

/** Updates the search query and re-renders the table. */
function searchProducts(q) {
  searchQuery = q.toLowerCase();
  renderProductsTable();
}

// ─────────────────────────────────────────────────────────────
//  ADD PRODUCT
// ─────────────────────────────────────────────────────────────

let selectedEmoji = '🧳';

/** Called when an emoji option is clicked in the picker. */
function selectEmoji(em, el) {
  selectedEmoji = em;
  document.getElementById('selectedEmojiDisplay').textContent = em;
  document.querySelectorAll('.emoji-opt').forEach(e => e.classList.remove('sel'));
  if (el) el.classList.add('sel');
}

/** Reads the add-product form, validates, and saves the new product. */
function addProduct() {
  const name      = document.getElementById('pName').value.trim();
  const category  = document.getElementById('pCategory').value;
  const price     = Number(document.getElementById('pPrice').value);
  const origPrice = Number(document.getElementById('pOrigPrice').value) || null;
  const badge     = document.getElementById('pBadge').value;
  const stock     = document.getElementById('pStock').value;
  const desc      = document.getElementById('pDesc').value.trim();

  if (!name || !category || !price) {
    showToast('⚠️ Please fill all required fields', 'danger');
    return;
  }

  const products = getProducts();
  products.push({
    id: Date.now(),
    name, category, price, origPrice, badge,
    emoji: selectedEmoji, stock, desc
  });
  saveProducts(products);

  showToast('✓ Product published successfully', 'success');
  resetForm();

  // Switch to the products list view
  showSec('products', document.querySelectorAll('.nav-item')[1]);
}

/** Resets the add-product form to its default state. */
function resetForm() {
  ['pName', 'pPrice', 'pOrigPrice', 'pDesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('pCategory').value = '';
  document.getElementById('pBadge').value    = '';
  document.getElementById('pStock').value    = 'In Stock';
  selectEmoji('🧳', document.querySelector('.emoji-opt'));
}

// ─────────────────────────────────────────────────────────────
//  DELETE PRODUCT
// ─────────────────────────────────────────────────────────────

function deleteProduct(id) {
  if (!confirm('Delete this product? This cannot be undone.')) return;
  saveProducts(getProducts().filter(p => p.id !== id));
  renderProductsTable();
  renderDashboard();
  showToast('Product deleted', 'danger');
}

// ─────────────────────────────────────────────────────────────
//  EDIT PRODUCT MODAL
// ─────────────────────────────────────────────────────────────

/** Populates and opens the edit modal for a given product id. */
function openEditModal(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;

  document.getElementById('editId').value        = p.id;
  document.getElementById('editName').value      = p.name;
  document.getElementById('editCategory').value  = p.category;
  document.getElementById('editPrice').value     = p.price;
  document.getElementById('editOrigPrice').value = p.origPrice || '';
  document.getElementById('editBadge').value     = p.badge || '';
  document.getElementById('editStock').value     = p.stock;
  document.getElementById('editDesc').value      = p.desc || '';

  document.getElementById('editModal').classList.add('open');
}

/** Reads the edit modal form and saves the updated product. */
function saveEdit() {
  const id    = Number(document.getElementById('editId').value);
  const name  = document.getElementById('editName').value.trim();
  const price = Number(document.getElementById('editPrice').value);

  if (!name || !price) {
    showToast('⚠️ Name and price are required', 'danger');
    return;
  }

  const products = getProducts();
  const idx      = products.findIndex(p => p.id === id);
  if (idx === -1) return;

  products[idx] = {
    ...products[idx],
    name,
    category:  document.getElementById('editCategory').value,
    price,
    origPrice: Number(document.getElementById('editOrigPrice').value) || null,
    badge:     document.getElementById('editBadge').value,
    stock:     document.getElementById('editStock').value,
    desc:      document.getElementById('editDesc').value.trim()
  };

  saveProducts(products);
  renderProductsTable();
  renderDashboard();
  closeEditModal();
  showToast('✓ Product updated', 'success');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('open');
}

// ─────────────────────────────────────────────────────────────
//  SETTINGS
// ─────────────────────────────────────────────────────────────

/** Validates and saves a new admin password. */
function changePassword() {
  const cur  = document.getElementById('curPwd').value;
  const nw   = document.getElementById('newPwd').value;
  const conf = document.getElementById('confPwd').value;

  if (cur !== getAdminPw()) { showToast('⚠️ Current password is incorrect', 'danger'); return; }
  if (nw.length < 6)        { showToast('⚠️ New password must be 6+ characters', 'danger'); return; }
  if (nw !== conf)          { showToast('⚠️ Passwords do not match', 'danger'); return; }

  setAdminPw(nw);
  ['curPwd', 'newPwd', 'confPwd'].forEach(id => document.getElementById(id).value = '');
  showToast('✓ Password updated successfully', 'success');
}

/** Resets all product data to defaults after confirmation. */
function confirmReset() {
  if (!confirm('Reset all products to default catalogue? This cannot be undone.')) return;
  resetProducts();
  renderProductsTable();
  renderDashboard();
  showToast('✓ Product data reset to defaults', 'success');
}

// ─────────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────────

/**
 * @param {string} msg
 * @param {'success'|'danger'|''} type
 */
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ─────────────────────────────────────────────────────────────
//  UTILITIES
// ─────────────────────────────────────────────────────────────

/** Returns the CSS class for a stock badge. */
function stockBadgeClass(stock) {
  if (stock === 'In Stock')  return 'badge-green';
  if (stock === 'Low Stock') return 'badge-amber';
  return 'badge-red';
}