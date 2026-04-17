/* ============================================================
   SPINNERZ — Data Store  (assets/js/data.js)
   Edit DEFAULT_PRODUCTS to update the product catalogue.
   ============================================================ */

const DEFAULT_PRODUCTS = [
  // ── HARD LUGGAGE ──────────────────────────────────────────
  {
    id: 1,
    name: 'APLUS Hard Shell 28" Large',
    category: 'Hard Luggage',
    badge: 'new',
    emoji: '🧳',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Premium polycarbonate & ABS hard shell suitcase. 360° spinner wheels, TSA-approved combination lock, telescopic aluminium handle. Perfect for executive gifting programs.',
    features: ['Polycarbonate + ABS Shell', '360° Spinner Wheels', 'TSA Lock', 'Telescopic Handle']
  },
  {
    id: 2,
    name: 'APLUS Hard Shell 24" Medium',
    category: 'Hard Luggage',
    badge: 'hot',
    emoji: '🧳',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Mid-size polycarbonate hard shell luggage. Superior protection with elegant professional appearance. Ideal for employee recognition programs.',
    features: ['Polycarbonate + ABS Shell', '360° Spinner Wheels', 'TSA Lock', 'Available in Multiple Colours']
  },
  {
    id: 3,
    name: 'APLUS Hard Shell 20" Cabin',
    category: 'Hard Luggage',
    badge: 'sale',
    emoji: '🧳',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Ultra-lightweight cabin luggage. Fits all major airline overhead bins. Available in 12 colours. Best-seller for corporate gifting.',
    features: ['Cabin Size — Airline Compliant', '360° Spinner Wheels', 'TSA Lock', '12 Colour Options']
  },

  // ── SOFT LUGGAGE ──────────────────────────────────────────
  {
    id: 4,
    name: 'APLUS Soft Trolley 28"',
    category: 'Soft Luggage',
    badge: '',
    emoji: '🧳',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Durable soft-sided luggage with expandable compartments, water-resistant fabric and smooth-rolling wheels. Lightweight yet spacious design for frequent business travel.',
    features: ['Water-Resistant Fabric', 'Expandable Compartments', 'Multiple Interior Pockets', 'Premium Zippers']
  },
  {
    id: 5,
    name: 'APLUS Soft Trolley Cabin Set',
    category: 'Soft Luggage',
    badge: 'new',
    emoji: '🧳',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Versatile soft-sided luggage set combining functionality with professional aesthetics. Reinforced handles and premium zippers for frequent business trips.',
    features: ['Reinforced Handles', 'Premium Zippers', 'Laptop Sleeve', 'Business-Ready Design']
  },

  // ── TROLLEY BAGS ──────────────────────────────────────────
  {
    id: 6,
    name: 'Trolley Overnighter Business',
    category: 'Trolley Bags',
    badge: 'hot',
    emoji: '🛄',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Compact wheeled overnight bag designed for business trips. Smooth-rolling wheels, telescopic handles, and organised compartments. Dedicated laptop and document sections.',
    features: ['Compact Cabin Size', 'Dedicated Laptop Section', 'Document Organiser', 'Telescopic Handle']
  },
  {
    id: 7,
    name: 'Trolley Duffle Bag Premium',
    category: 'Trolley Bags',
    badge: '',
    emoji: '🛄',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Versatile wheeled duffle with separate shoe compartments and multiple pockets. Combines the spaciousness of a duffle with trolley convenience. Ideal for dealer incentive programs.',
    features: ['Separate Shoe Compartment', 'Multiple Pockets', '360° Wheels', 'Telescopic Handle']
  },

  // ── LAPTOP BACKPACKS ──────────────────────────────────────
  {
    id: 8,
    name: 'Executive Laptop Backpack 45L',
    category: 'Laptop Backpacks',
    badge: 'new',
    emoji: '🎒',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Professional laptop backpack with padded 15.6" compartment, integrated USB charging port, and ergonomic breathable back panel. Water-resistant materials for all-weather protection.',
    features: ['15.6" Padded Laptop Sleeve', 'USB Charging Port', 'Anti-Theft Hidden Pockets', 'Ergonomic Back Panel']
  },
  {
    id: 9,
    name: 'Anti-Theft Travel Backpack 30L',
    category: 'Laptop Backpacks',
    badge: 'hot',
    emoji: '🎒',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Anti-theft backpack with hidden zip pockets and USB pass-through port. Multiple organisational pockets. The perfect corporate gift for executives and travelling professionals.',
    features: ['Anti-Theft Design', 'USB Pass-Through', 'Water-Resistant', 'Premium Zippers']
  },

  // ── OFFICE & SLING ────────────────────────────────────────
  {
    id: 10,
    name: 'Executive Leather Sling Bag',
    category: 'Office & Sling',
    badge: 'new',
    emoji: '💼',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Executive leather office sling bag with dedicated laptop protection up to 15.6". Multiple organisational pockets, adjustable padded shoulder strap. Premium craftsmanship meets functional elegance.',
    features: ['Genuine Leather Finish', '15.6" Laptop Protection', 'Adjustable Padded Strap', 'Multiple Organiser Pockets']
  },
  {
    id: 11,
    name: 'Slim Laptop Office Briefcase',
    category: 'Office & Sling',
    badge: '',
    emoji: '💼',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Slim professional office bag with USB charging port and organiser panel. Leather-look finish perfect for corporate gifting. Elevate your professional image.',
    features: ['USB Charging Port', 'Organiser Panel', 'Leather-Look Finish', 'Slim Profile Design']
  },

  // ── GYM & LIFESTYLE ───────────────────────────────────────
  {
    id: 12,
    name: 'Pro Gym & Sports Duffle',
    category: 'Gym & Lifestyle',
    badge: '',
    emoji: '🏋️',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Versatile gym bag with thoughtful compartments, durable materials, and ergonomic designs. From athletic training sessions to daily commutes — functionality meets contemporary style.',
    features: ['Ventilated Shoe Pocket', 'Water-Resistant Base', 'Detachable Shoulder Strap', 'Multiple Pockets']
  },
  {
    id: 13,
    name: 'Campus College Backpack',
    category: 'Gym & Lifestyle',
    badge: 'new',
    emoji: '🎒',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Stylish college backpack combining functionality with contemporary design. Multiple compartments, laptop sleeve, and durable fabric. Perfect for college and school gifting programs.',
    features: ['15.6" Laptop Sleeve', 'Multiple Compartments', 'Ergonomic Straps', 'USB Port Available']
  },

  // ── VANITY CASES ──────────────────────────────────────────
  {
    id: 14,
    name: 'Luxury Quilted Vanity Case',
    category: 'Vanity Cases',
    badge: 'new',
    emoji: '💄',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Elegant cosmetic travel case with luxurious quilted design and premium finish. Thoughtfully organised interior with dedicated compartments, secure closures, built-in mirror and removable trays. Perfect executive gift for women professionals.',
    features: ['Quilted Premium Finish', 'Built-In Mirror', 'Removable Organiser Trays', 'Secure Closure']
  },
  {
    id: 15,
    name: 'Executive Travel Vanity Set',
    category: 'Vanity Cases',
    badge: 'hot',
    emoji: '💄',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Sophisticated styling vanity case combining functionality with fashion-forward aesthetics. Dedicated compartments for cosmetics, jewellery and personal essentials. Makes a lasting impression.',
    features: ['Compartmentalised Interior', 'Jewellery Section', 'Premium Hardware', 'Elegant Design']
  },

  // ── DUFFLE & TRAVEL ───────────────────────────────────────
  {
    id: 16,
    name: 'Canvas Travel Duffle XL',
    category: 'Duffle & Travel',
    badge: '',
    emoji: '👜',
    stock: 'In Stock',
    moq: 'MOQ: 500 pcs',
    desc: 'Spacious canvas and premium leather duffle for extended trips. Reinforced handles, stylish design, and durable materials. Ideal for channel partner incentive programs.',
    features: ['Wax Canvas + Leather', 'Reinforced Handles', 'Detachable Shoulder Strap', 'Brass Hardware']
  }
];

// ── STORAGE KEYS ──────────────────────────────────────────────
const KEYS = {
  products: 'sz_products',
  cart:     'sz_cart',
  adminPw:  'sz_admin_pw'
};

const DEFAULT_ADMIN_PW = 'spinnerz2025';

// ── PRODUCT HELPERS ───────────────────────────────────────────
function getProducts() {
  const raw = localStorage.getItem(KEYS.products);
  if (!raw) {
    localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(raw);
}
function saveProducts(products) { localStorage.setItem(KEYS.products, JSON.stringify(products)); }
function resetProducts() { localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS)); }

// ── CART HELPERS ──────────────────────────────────────────────
function getCart() {
  const raw = localStorage.getItem(KEYS.cart);
  return raw ? JSON.parse(raw) : [];
}
function saveCart(cart) { localStorage.setItem(KEYS.cart, JSON.stringify(cart)); }

// ── AUTH HELPERS ──────────────────────────────────────────────
function getAdminPw() { return localStorage.getItem(KEYS.adminPw) || DEFAULT_ADMIN_PW; }
function setAdminPw(pw) { localStorage.setItem(KEYS.adminPw, pw); }