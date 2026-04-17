/* ============================================================
   SPINNERZ — Data Store  (assets/js/data.js)

   This file is the single source of truth for:
     • Default product catalogue
     • localStorage read/write helpers

   Both the storefront (store.js) and admin (admin.js) import
   from this file. Edit DEFAULT_PRODUCTS to change the seed data
   that loads on a fresh browser with no saved data.
   ============================================================ */

// ─────────────────────────────────────────────────────────────
//  DEFAULT PRODUCT CATALOGUE
//  Each product needs: id, name, category, price, emoji, stock
//  Optional: origPrice, badge ("new"|"hot"|"sale"), desc
// ─────────────────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Aria Pro 28"',
    category: 'Hard Luggage',
    price: 7999,
    origPrice: 10999,
    badge: 'new',
    emoji: '🧳',
    stock: 'In Stock',
    desc: 'Aircraft-grade polycarbonate shell with TSA lock and 360° spinner wheels.'
  },
  {
    id: 2,
    name: 'Trek Master 45L',
    category: 'Backpacks',
    price: 3499,
    origPrice: 4999,
    badge: 'hot',
    emoji: '🎒',
    stock: 'In Stock',
    desc: 'Water-resistant 45L backpack with padded laptop sleeve and hip belt.'
  },
  {
    id: 3,
    name: 'Duffle Pro XL',
    category: 'Duffle & Travel',
    price: 2899,
    origPrice: null,
    badge: '',
    emoji: '👜',
    stock: 'In Stock',
    desc: 'Premium wax canvas weekender with genuine leather handles and base.'
  },
  {
    id: 4,
    name: 'Executive Slim',
    category: 'Office Bags',
    price: 4199,
    origPrice: 5499,
    badge: 'sale',
    emoji: '💼',
    stock: 'Low Stock',
    desc: 'Slim leather-look office bag with USB charging port and organiser panel.'
  },
  {
    id: 5,
    name: 'Junior Explorer',
    category: 'School & Sports',
    price: 1599,
    origPrice: null,
    badge: 'new',
    emoji: '🎽',
    stock: 'In Stock',
    desc: 'Ergonomic school bag with lumbar support, designed for 6–14 year olds.'
  },
  {
    id: 6,
    name: 'Horizon 20" Cabin',
    category: 'Hard Luggage',
    price: 5999,
    origPrice: 7999,
    badge: 'sale',
    emoji: '🧳',
    stock: 'In Stock',
    desc: 'Ultra-lightweight cabin luggage available in 12 colours. Fits all major airlines.'
  },
  {
    id: 7,
    name: 'SkyPack Laptop 30L',
    category: 'Backpacks',
    price: 2799,
    origPrice: null,
    badge: '',
    emoji: '🎒',
    stock: 'In Stock',
    desc: 'Anti-theft backpack with hidden zip pockets and USB pass-through port.'
  },
  {
    id: 8,
    name: 'Weekender Canvas',
    category: 'Duffle & Travel',
    price: 3299,
    origPrice: 4499,
    badge: 'hot',
    emoji: '👜',
    stock: 'In Stock',
    desc: 'Wax canvas duffle with detachable shoulder strap and brass hardware.'
  }
];

// ─────────────────────────────────────────────────────────────
//  STORAGE KEYS  (change these if you need multiple instances)
// ─────────────────────────────────────────────────────────────
const KEYS = {
  products: 'sz_products',
  cart:     'sz_cart',
  adminPw:  'sz_admin_pw'
};

const DEFAULT_ADMIN_PW = 'spinnerz2025';

// ─────────────────────────────────────────────────────────────
//  PRODUCT HELPERS
// ─────────────────────────────────────────────────────────────

/** Returns the product array from localStorage, seeding defaults on first use. */
function getProducts() {
  const raw = localStorage.getItem(KEYS.products);
  if (!raw) {
    localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(raw);
}

/** Saves an updated product array to localStorage. */
function saveProducts(products) {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
}

/** Resets products to the default catalogue. */
function resetProducts() {
  localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
}

// ─────────────────────────────────────────────────────────────
//  CART HELPERS
// ─────────────────────────────────────────────────────────────

/** Returns the cart array from localStorage. */
function getCart() {
  const raw = localStorage.getItem(KEYS.cart);
  return raw ? JSON.parse(raw) : [];
}

/** Saves an updated cart array to localStorage. */
function saveCart(cart) {
  localStorage.setItem(KEYS.cart, JSON.stringify(cart));
}

// ─────────────────────────────────────────────────────────────
//  AUTH HELPERS
// ─────────────────────────────────────────────────────────────

/** Returns the current admin password (custom or default). */
function getAdminPw() {
  return localStorage.getItem(KEYS.adminPw) || DEFAULT_ADMIN_PW;
}

/** Saves a new admin password. */
function setAdminPw(pw) {
  localStorage.setItem(KEYS.adminPw, pw);
}