/* ============================================================
   SPINNERZ — Data Store  (assets/js/data.js)
   Real product catalogue migrated from products.html.
   Admin panel reads/writes here. Products page reads here.
   ============================================================ */

const DEFAULT_PRODUCTS = [
  // ── HARD LUGGAGE — Set 1 (Teal/Yellow/Red/Black) ──────────
  {
    id: 1, name: 'Spinnerz Trolley — Teal Blue', category: 'Hard Luggage', badge: 'new',
    color: 'Teal Blue', colorHex: '#2bc4c4', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-blue-front.jpg','assets/images/products/hl-blue-angle.jpg','assets/images/products/hl-blue-side.jpg','assets/images/products/hl-blue-detail.jpg'],
    desc: 'Premium polypropylene hard shell trolley bag with scratch-resistant finish, dual wheels, fixed combination lock, and push-button telescopic handle. Lightweight, water-resistant & dust-proof.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}]
  },
  {
    id: 2, name: 'Spinnerz Trolley — Lime Yellow', category: 'Hard Luggage', badge: 'new',
    color: 'Lime Yellow', colorHex: '#c8e02a', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-yellow-front.jpg','assets/images/products/hl-yellow-angle.jpg','assets/images/products/hl-yellow-side.jpg','assets/images/products/hl-yellow-detail.jpg'],
    desc: 'Premium polypropylene hard shell trolley in vibrant lime yellow. Scratch-resistant shell, fixed combination lock, dual spinner wheels, push-button handle. Built for frequent travel.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}]
  },
  {
    id: 3, name: 'Spinnerz Trolley — Scarlet Red', category: 'Hard Luggage', badge: 'new',
    color: 'Scarlet Red', colorHex: '#e02a2a', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-red-front.jpg','assets/images/products/hl-red-angle.jpg','assets/images/products/hl-red-side.jpg','assets/images/products/hl-red-detail.jpg'],
    desc: 'Bold scarlet red polypropylene hard shell trolley. Features scratch-resistant finish, dual spinner wheels, fixed combination TSA lock, and push-button telescopic aluminium handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}]
  },
  {
    id: 4, name: 'Spinnerz Trolley — Jet Black', category: 'Hard Luggage', badge: '',
    color: 'Jet Black', colorHex: '#1a1a1a', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-black-front.jpg','assets/images/products/hl-black-angle.jpg','assets/images/products/hl-black-side.jpg','assets/images/products/hl-black-detail.jpg','assets/images/products/hl-black-open.jpg'],
    desc: 'Elegant jet black polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}]
  },

  // ── HARD LUGGAGE — Set 2 (Navy/BrightYellow/Silver) ───────
  {
    id: 5, name: 'Spinnerz Trolley — Navy Blue', category: 'Hard Luggage', badge: '',
    color: 'Navy Blue', colorHex: '#000080', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-1-dark_blue-front.png'],
    desc: 'Elegant navy blue polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}]
  },
  {
    id: 6, name: 'Spinnerz Trolley — Bright Yellow', category: 'Hard Luggage', badge: '',
    color: 'Bright Yellow', colorHex: '#FFEA00', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-1-yellow-front.png'],
    desc: 'Elegant bright yellow polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}]
  },
  {
    id: 7, name: 'Spinnerz Trolley — Graphite Silver', category: 'Hard Luggage', badge: '',
    color: 'Graphite Silver', colorHex: '#C0C0C0', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-1-silver-front.png'],
    desc: 'Elegant graphite silver polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}]
  },

  // ── HARD LUGGAGE — Set 3 (GreyishBlue/Peacock/RoseGold) ───
  {
    id: 8, name: 'Spinnerz Trolley — Greyish Blue', category: 'Hard Luggage', badge: '',
    color: 'Greyish Blue', colorHex: '#5E819D', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-2-grey_blue-front.png'],
    desc: 'Elegant greyish blue polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}]
  },
  {
    id: 9, name: 'Spinnerz Trolley — Peacock Blue', category: 'Hard Luggage', badge: '',
    color: 'Peacock Blue', colorHex: '#0F2CB3', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-2-peacock_blue-front.png'],
    desc: 'Elegant peacock blue polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}]
  },
  {
    id: 10, name: 'Spinnerz Trolley — Rose Gold', category: 'Hard Luggage', badge: '',
    color: 'Rose Gold', colorHex: '#B76E79', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-2-rose_gold-front.png'],
    desc: 'Elegant rose gold polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}]
  },

  // ── HARD LUGGAGE — Set 4 (Purple/Khaki/Navy) ──────────────
  {
    id: 11, name: 'Spinnerz Trolley — Purple', category: 'Hard Luggage', badge: '',
    color: 'Purple', colorHex: '#800080', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-3-purple-front.png'],
    desc: 'Elegant purple polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}]
  },
  {
    id: 12, name: 'Spinnerz Trolley — Khaki', category: 'Hard Luggage', badge: '',
    color: 'Khaki', colorHex: '#c3b091', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-3-khaki-front.png'],
    desc: 'Elegant khaki polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}]
  },
  {
    id: 13, name: 'Spinnerz Trolley — Navy Blue (Set 4)', category: 'Hard Luggage', badge: '',
    color: 'Navy Blue', colorHex: '#000080', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/hl-3-navy_blue-front.png'],
    desc: 'Elegant navy blue polypropylene hard shell trolley. Spacious interior with luggage straps and zippered pocket. Dual spinner wheels, fixed combination lock, push-button telescopic handle.',
    features: ['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}]
  },

  // ── VANITY CASES ───────────────────────────────────────────
  {
    id: 14, name: 'Luxury Quilted Vanity Case — Pink', category: 'Vanity Cases', badge: 'new',
    color: 'Pink', colorHex: '#e8a0b4', emoji: '💄', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/vc-pink-front.jpg'],
    desc: 'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays. Perfect executive gift for women professionals.',
    features: ['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'],
    sizes: ['One Size'],
    relatedColors: [{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}]
  },
  {
    id: 15, name: 'Luxury Quilted Vanity Case — Black', category: 'Vanity Cases', badge: 'new',
    color: 'Black', colorHex: '#1a1a1a', emoji: '💄', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/vc-black-front.jpg'],
    desc: 'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays. Perfect executive gift for women professionals.',
    features: ['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'],
    sizes: ['One Size'],
    relatedColors: [{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}]
  },
  {
    id: 16, name: 'Luxury Quilted Vanity Case — Blue', category: 'Vanity Cases', badge: 'new',
    color: 'Blue', colorHex: '#10183a', emoji: '💄', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/vc-blue-front.jpg'],
    desc: 'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays. Perfect executive gift for women professionals.',
    features: ['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'],
    sizes: ['One Size'],
    relatedColors: [{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}]
  },
  {
    id: 17, name: 'Luxury Quilted Vanity Case — Yellow', category: 'Vanity Cases', badge: 'new',
    color: 'Yellow', colorHex: '#FFD700', emoji: '💄', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/vc-yellow-front.jpg','assets/images/products/vc-yellow-side.jpeg'],
    desc: 'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays. Perfect executive gift for women professionals.',
    features: ['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'],
    sizes: ['One Size'],
    relatedColors: [{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}]
  },

  // ── SOFT LUGGAGE ───────────────────────────────────────────
  {
    id: 18, name: 'Spinnerz Soft Trolley 28 — Blue', category: 'Soft Luggage', badge: 'new',
    color: 'Blue', colorHex: '#10183a', colorGroup: 'soft-trolley-28', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/sl-blue-front.png'],
    desc: 'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels. Perfect for extended travel and corporate gifting.',
    features: ['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}]
  },
  {
    id: 19, name: 'Spinnerz Soft Trolley 28 — Brown', category: 'Soft Luggage', badge: 'new',
    color: 'Brown', colorHex: '#A52A2A', colorGroup: 'soft-trolley-28', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/sl-brown-front.png'],
    desc: 'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels. Perfect for extended travel and corporate gifting.',
    features: ['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}]
  },
  {
    id: 20, name: 'Spinnerz Soft Trolley 28 — Red', category: 'Soft Luggage', badge: 'new',
    color: 'Red', colorHex: '#e02a2a', colorGroup: 'soft-trolley-28', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/sl-red-front.png'],
    desc: 'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels. Perfect for extended travel and corporate gifting.',
    features: ['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'],
    sizes: ['20" Cabin','24" Medium','28" Large'],
    relatedColors: [{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}]
  },

  // ── CABIN LUGGAGE ─────────────────────────────────────────
  {
    id: 21, name: 'Spinnerz Cabin Luggage — Light Grey', category: 'Cabin Luggage', badge: 'new',
    color: 'Light Grey', colorHex: '#D3D3D3', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/cl-light_grey-front.png'],
    desc: 'Compact cabin luggage designed to fit all major airline overhead bins. Lightweight construction with durable shell.',
    features: ['Cabin Size — Airline Compliant','Lightweight Shell','Smooth-Rolling Wheels','TSA Lock'],
    sizes: ['One Size'],
    relatedColors: [{name:'Light Grey',hex:'#D3D3D3',id:21},{name:'Ice Grey',hex:'#E8F1F2',id:22}]
  },
  {
    id: 22, name: 'Spinnerz Cabin Luggage — Ice Grey', category: 'Cabin Luggage', badge: 'new',
    color: 'Ice Grey', colorHex: '#E8F1F2', emoji: '🧳', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/cl-ice_grey-front.png'],
    desc: 'Compact cabin luggage designed to fit all major airline overhead bins. Lightweight construction with durable shell.',
    features: ['Cabin Size — Airline Compliant','Lightweight Shell','Smooth-Rolling Wheels','TSA Lock'],
    sizes: ['One Size'],
    relatedColors: [{name:'Light Grey',hex:'#D3D3D3',id:21},{name:'Ice Grey',hex:'#E8F1F2',id:22}]
  },

  // ── BACKPACKS ─────────────────────────────────────────────
  {
    id: 23, name: 'Spinnerz Backpack — Blue', category: 'Backpacks', badge: 'new',
    color: 'Blue', colorHex: '#1E3A5F', emoji: '🎒', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/bp-blue-front.png'],
    desc: 'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric. Ideal for corporate gifting and daily commutes.',
    features: ['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'],
    sizes: ['One Size'],
    relatedColors: [{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}]
  },
  {
    id: 24, name: 'Spinnerz Backpack — Grey', category: 'Backpacks', badge: 'new',
    color: 'Grey', colorHex: '#6B7280', emoji: '🎒', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/bp-grey-front.png'],
    desc: 'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric. Ideal for corporate gifting and daily commutes.',
    features: ['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'],
    sizes: ['One Size'],
    relatedColors: [{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}]
  },
  {
    id: 25, name: 'Spinnerz Backpack — Silver', category: 'Backpacks', badge: 'new',
    color: 'Silver', colorHex: '#D1D5DB', emoji: '🎒', stock: 'In Stock', moq: 'MOQ: 500 pcs',
    images: ['assets/images/products/bp-silver-front.png'],
    desc: 'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric. Ideal for corporate gifting and daily commutes.',
    features: ['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'],
    sizes: ['One Size'],
    relatedColors: [{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}]
  },
];

// ── STORAGE KEYS ──────────────────────────────────────────────
const KEYS = { products: 'sz_products', cart: 'sz_cart', adminPw: 'sz_admin_pw' };
const DEFAULT_ADMIN_PW = 'spinnerz2025';

// ── PRODUCT HELPERS ───────────────────────────────────────────
// Normalize sizes: admin saves as comma-string, default catalogue uses arrays
function normalizeSizes(p) {
  if (typeof p.sizes === 'string') {
    p.sizes = p.sizes ? p.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
  } else if (!Array.isArray(p.sizes)) {
    p.sizes = [];
  }
  return p;
}

// ── IMAGE-BASED GROUP DETECTION ──────────────────────────────
const _IMG_STOP = new Set(['front','back','side','angle','detail','open','top','bottom',
  'blue','red','green','yellow','black','white','grey','gray','silver','gold','pink',
  'purple','brown','navy','khaki','teal','rose','lime','bright','graphite','peacock','ice','light']);

function groupFromImage(src) {
  if (!src) return null;
  const name = src.split('/').pop().replace(/\.[^.]+$/, '');
  const parts = name.split('-');
  const prefix = [];
  for (const p of parts) {
    if (p.includes('_') || _IMG_STOP.has(p.toLowerCase())) break;
    prefix.push(p);
  }
  return prefix.length ? prefix.join('-') : null;
}

function autoColorGroup(p) {
  if (p.colorGroup) return p.colorGroup;
  const img = p.images && p.images[0];
  return img ? groupFromImage(img) : null;
}

function getProducts() {
  try {
    const raw = localStorage.getItem(KEYS.products);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map(p => { normalizeSizes(p); p.colorGroup = autoColorGroup(p); return p; });
    }
  } catch(e) {}
  return DEFAULT_PRODUCTS.map(p => { p = normalizeSizes({...p}); p.colorGroup = autoColorGroup(p); return p; });
}

function saveProducts(products) {
  try { localStorage.setItem(KEYS.products, JSON.stringify(products)); } catch(e) {}
}

function resetProducts() {
  try { localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS)); } catch(e) {}
}

// Export updated data.js for hosting (download-based persistence)
function exportDataJs() {
  const products = getProducts();
  const blob = new Blob([
    '/* SPINNERZ — data.js (exported from admin) */\n' +
    '/* Replace assets/js/data.js on your server with this file */\n\n' +
    window.__dataJsTemplate.replace('/*__PRODUCTS__*/', JSON.stringify(products, null, 2))
  ], {type: 'application/javascript'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  a.click();
}

// ── CART HELPERS ──────────────────────────────────────────────
function getCart()      { const r = localStorage.getItem(KEYS.cart); return r ? JSON.parse(r) : []; }
function saveCart(cart) { localStorage.setItem(KEYS.cart, JSON.stringify(cart)); }

// ── AUTH HELPERS ──────────────────────────────────────────────
function getAdminPw()   { return localStorage.getItem(KEYS.adminPw) || DEFAULT_ADMIN_PW; }
function setAdminPw(pw) { localStorage.setItem(KEYS.adminPw, pw); }