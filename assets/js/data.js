/* ============================================================
   SPINNERZ — Data Store  (assets/js/data.js)
   Requires supabase-config.js loaded first.

   DB COLUMN TYPES (all TEXT, pipe-separated):
     features, sizes, images  → "val1|val2|val3"
     related_colors           → "Name:hex:id|Name:hex:id"
   ============================================================ */

const DEFAULT_PRODUCTS = [
  { id:1, name:'Spinnerz Trolley — Teal Blue', category:'Hard Luggage', badge:'new', color:'Teal Blue', color_hex:'#2bc4c4', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-blue-front.jpg','assets/images/products/hl-blue-angle.jpg','assets/images/products/hl-blue-side.jpg','assets/images/products/hl-blue-detail.jpg'], desc:'Premium polypropylene hard shell trolley bag with scratch-resistant finish, dual wheels, fixed combination lock, and push-button telescopic handle. Lightweight, water-resistant & dust-proof.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}] },
  { id:2, name:'Spinnerz Trolley — Lime Yellow', category:'Hard Luggage', badge:'new', color:'Lime Yellow', color_hex:'#c8e02a', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-yellow-front.jpg','assets/images/products/hl-yellow-angle.jpg','assets/images/products/hl-yellow-side.jpg','assets/images/products/hl-yellow-detail.jpg'], desc:'Premium polypropylene hard shell trolley in vibrant lime yellow.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}] },
  { id:3, name:'Spinnerz Trolley — Scarlet Red', category:'Hard Luggage', badge:'new', color:'Scarlet Red', color_hex:'#e02a2a', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-red-front.jpg','assets/images/products/hl-red-angle.jpg','assets/images/products/hl-red-side.jpg','assets/images/products/hl-red-detail.jpg'], desc:'Bold scarlet red polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}] },
  { id:4, name:'Spinnerz Trolley — Jet Black', category:'Hard Luggage', badge:'', color:'Jet Black', color_hex:'#1a1a1a', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-black-front.jpg','assets/images/products/hl-black-angle.jpg','assets/images/products/hl-black-side.jpg','assets/images/products/hl-black-detail.jpg','assets/images/products/hl-black-open.jpg'], desc:'Elegant jet black polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Teal Blue',hex:'#2bc4c4',id:1},{name:'Lime Yellow',hex:'#c8e02a',id:2},{name:'Scarlet Red',hex:'#e02a2a',id:3},{name:'Jet Black',hex:'#1a1a1a',id:4}] },
  { id:5, name:'Spinnerz Trolley — Navy Blue', category:'Hard Luggage', badge:'', color:'Navy Blue', color_hex:'#000080', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-1-dark_blue-front.png'], desc:'Elegant navy blue polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}] },
  { id:6, name:'Spinnerz Trolley — Bright Yellow', category:'Hard Luggage', badge:'', color:'Bright Yellow', color_hex:'#FFEA00', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-1-yellow-front.png'], desc:'Elegant bright yellow polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}] },
  { id:7, name:'Spinnerz Trolley — Graphite Silver', category:'Hard Luggage', badge:'', color:'Graphite Silver', color_hex:'#C0C0C0', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-1-silver-front.png'], desc:'Elegant graphite silver polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Navy Blue',hex:'#000080',id:5},{name:'Bright Yellow',hex:'#FFEA00',id:6},{name:'Graphite Silver',hex:'#C0C0C0',id:7}] },
  { id:8, name:'Spinnerz Trolley — Greyish Blue', category:'Hard Luggage', badge:'', color:'Greyish Blue', color_hex:'#5E819D', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-2-grey_blue-front.png'], desc:'Elegant greyish blue polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}] },
  { id:9, name:'Spinnerz Trolley — Peacock Blue', category:'Hard Luggage', badge:'', color:'Peacock Blue', color_hex:'#0F2CB3', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-2-peacock_blue-front.png'], desc:'Elegant peacock blue polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}] },
  { id:10, name:'Spinnerz Trolley — Rose Gold', category:'Hard Luggage', badge:'', color:'Rose Gold', color_hex:'#B76E79', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-2-rose_gold-front.png'], desc:'Elegant rose gold polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Greyish Blue',hex:'#5E819D',id:8},{name:'Peacock Blue',hex:'#0F2CB3',id:9},{name:'Rose Gold',hex:'#B76E79',id:10}] },
  { id:11, name:'Spinnerz Trolley — Purple', category:'Hard Luggage', badge:'', color:'Purple', color_hex:'#800080', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-3-purple-front.png'], desc:'Elegant purple polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}] },
  { id:12, name:'Spinnerz Trolley — Khaki', category:'Hard Luggage', badge:'', color:'Khaki', color_hex:'#c3b091', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-3-khaki-front.png'], desc:'Elegant khaki polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}] },
  { id:13, name:'Spinnerz Trolley — Navy Blue (Set 4)', category:'Hard Luggage', badge:'', color:'Navy Blue', color_hex:'#000080', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/hl-3-navy_blue-front.png'], desc:'Elegant navy blue polypropylene hard shell trolley.', features:['Polypropylene Shell','Scratch Resistant','Dual Wheels','Fixed Combination Lock','Push Button Trolley','Water Resistant & Dust Proof','Spacious Interior'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Purple',hex:'#800080',id:11},{name:'Khaki',hex:'#c3b091',id:12},{name:'Navy Blue',hex:'#000080',id:13}] },
  { id:14, name:'Luxury Quilted Vanity Case — Pink', category:'Vanity Cases', badge:'new', color:'Pink', color_hex:'#e8a0b4', emoji:'💄', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/vc-pink-front.jpg'], desc:'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays.', features:['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'], sizes:['One Size'], related_colors:[{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}] },
  { id:15, name:'Luxury Quilted Vanity Case — Black', category:'Vanity Cases', badge:'new', color:'Black', color_hex:'#1a1a1a', emoji:'💄', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/vc-black-front.jpg'], desc:'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays.', features:['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'], sizes:['One Size'], related_colors:[{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}] },
  { id:16, name:'Luxury Quilted Vanity Case — Blue', category:'Vanity Cases', badge:'new', color:'Blue', color_hex:'#10183a', emoji:'💄', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/vc-blue-front.jpg'], desc:'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays.', features:['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'], sizes:['One Size'], related_colors:[{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}] },
  { id:17, name:'Luxury Quilted Vanity Case — Yellow', category:'Vanity Cases', badge:'new', color:'Yellow', color_hex:'#FFD700', emoji:'💄', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/vc-yellow-front.jpg','assets/images/products/vc-yellow-side.jpeg'], desc:'Elegant cosmetic travel case with luxurious quilted design, built-in mirror, removable organiser trays.', features:['Quilted Finish','Built-in Mirror','Removable Trays','Premium Hardware'], sizes:['One Size'], related_colors:[{name:'Pink',hex:'#e8a0b4',id:14},{name:'Black',hex:'#1a1a1a',id:15},{name:'Blue',hex:'#10183a',id:16},{name:'Yellow',hex:'#FFD700',id:17}] },
  { id:18, name:'Spinnerz Soft Trolley 28 — Blue', category:'Soft Luggage', badge:'new', color:'Blue', color_hex:'#10183a', colorGroup:'soft-trolley-28', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/sl-blue-front.png'], desc:'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels.', features:['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}] },
  { id:19, name:'Spinnerz Soft Trolley 28 — Brown', category:'Soft Luggage', badge:'new', color:'Brown', color_hex:'#A52A2A', colorGroup:'soft-trolley-28', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/sl-brown-front.png'], desc:'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels.', features:['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}] },
  { id:20, name:'Spinnerz Soft Trolley 28 — Red', category:'Soft Luggage', badge:'new', color:'Red', color_hex:'#e02a2a', colorGroup:'soft-trolley-28', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/sl-red-front.png'], desc:'Premium soft-sided trolley with spacious interior, durable fabric, and smooth-rolling wheels.', features:['Durable Fabric','Spacious Interior','Smooth-Rolling Wheels','Telescopic Handle'], sizes:['20" Cabin','24" Medium','28" Large'], related_colors:[{name:'Blue',hex:'#10183a',id:18},{name:'Brown',hex:'#A52A2A',id:19},{name:'Red',hex:'#e02a2a',id:20}] },
  { id:21, name:'Spinnerz Cabin Luggage — Light Grey', category:'Cabin Luggage', badge:'new', color:'Light Grey', color_hex:'#D3D3D3', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/cl-light_grey-front.png'], desc:'Compact cabin luggage designed to fit all major airline overhead bins.', features:['Cabin Size — Airline Compliant','Lightweight Shell','Smooth-Rolling Wheels','TSA Lock'], sizes:['One Size'], related_colors:[{name:'Light Grey',hex:'#D3D3D3',id:21},{name:'Ice Grey',hex:'#E8F1F2',id:22}] },
  { id:22, name:'Spinnerz Cabin Luggage — Ice Grey', category:'Cabin Luggage', badge:'new', color:'Ice Grey', color_hex:'#E8F1F2', emoji:'🧳', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/cl-ice_grey-front.png'], desc:'Compact cabin luggage designed to fit all major airline overhead bins.', features:['Cabin Size — Airline Compliant','Lightweight Shell','Smooth-Rolling Wheels','TSA Lock'], sizes:['One Size'], related_colors:[{name:'Light Grey',hex:'#D3D3D3',id:21},{name:'Ice Grey',hex:'#E8F1F2',id:22}] },
  { id:23, name:'Spinnerz Backpack — Blue', category:'Backpacks', badge:'new', color:'Blue', color_hex:'#1E3A5F', emoji:'🎒', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/bp-blue-front.png'], desc:'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric.', features:['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'], sizes:['One Size'], related_colors:[{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}] },
  { id:24, name:'Spinnerz Backpack — Grey', category:'Backpacks', badge:'new', color:'Grey', color_hex:'#6B7280', emoji:'🎒', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/bp-grey-front.png'], desc:'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric.', features:['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'], sizes:['One Size'], related_colors:[{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}] },
  { id:25, name:'Spinnerz Backpack — Silver', category:'Backpacks', badge:'new', color:'Silver', color_hex:'#D1D5DB', emoji:'🎒', stock:'In Stock', moq:'MOQ: 500 pcs', images:['assets/images/products/bp-silver-front.png'], desc:'Ergonomic backpack with padded laptop sleeve, multiple compartments, and durable fabric.', features:['Padded Laptop Sleeve','Multiple Compartments','Ergonomic Straps','Durable Fabric'], sizes:['One Size'], related_colors:[{name:'Blue',hex:'#1E3A5F',id:23},{name:'Grey',hex:'#6B7280',id:24},{name:'Silver',hex:'#D1D5DB',id:25}] },
];

// ── PIPE-SEPARATED HELPERS ─────────────────────────────────────
// Arrays are stored as pipe-separated TEXT columns in Supabase
// e.g. features = "Scratch Resistant|Dual Wheels"
// related_colors = "Teal Blue:#2bc4c4:1|Lime Yellow:#c8e02a:2"

function arrToStr(arr) {
  if (!Array.isArray(arr) || !arr.length) return '';
  return arr.join('|');
}

function strToArr(str) {
  if (!str) return [];
  return str.split('|').map(s => s.trim()).filter(Boolean);
}

function relColorsToStr(arr) {
  if (!Array.isArray(arr) || !arr.length) return '';
  return arr.map(c => `${c.name}:${c.hex}:${c.id}`).join('|');
}

function strToRelColors(str) {
  if (!str) return [];
  return str.split('|').map(s => {
    const [name, hex, id] = s.split(':');
    return { name: name || '', hex: hex || '', id: Number(id) || 0 };
  }).filter(c => c.name && c.hex);
}

// ── NORMALISE row from Supabase columns → JS object ───────────
function fromRow(r) {
  return {
    id:            r.id,
    name:          r.name,
    category:      r.category,
    badge:         r.badge || '',
    color:         r.color || '',
    colorHex:      r.color_hex || '',
    colorGroup:    r.color_group || '',
    emoji:         r.emoji || '🧳',
    stock:         r.stock || 'In Stock',
    moq:           r.moq || '',
    price:         r.price || null,
    origPrice:     r.orig_price || null,
    desc:          r.description || '',
    features:      strToArr(r.features),
    sizes:         strToArr(r.sizes),
    images:        strToArr(r.images),
    relatedColors: strToRelColors(r.related_colors),
  };
}

// ── NORMALISE JS object → Supabase columns ────────────────────
function toRow(p) {
  const sizes = Array.isArray(p.sizes)
    ? p.sizes
    : (p.sizes ? p.sizes.split(',').map(s => s.trim()).filter(Boolean) : []);
  const features = Array.isArray(p.features)
    ? p.features
    : (p.features ? p.features.split('\n').map(s => s.trim()).filter(Boolean) : []);
  const images = Array.isArray(p.images) ? p.images : [];
  const relColors = Array.isArray(p.relatedColors) ? p.relatedColors : [];

  return {
    id:             p.id,
    name:           p.name,
    category:       p.category || '',
    badge:          p.badge || '',
    color:          p.color || '',
    color_hex:      p.colorHex || '',
    color_group:    p.colorGroup || autoColorGroup(p) || '',
    emoji:          p.emoji || '🧳',
    stock:          p.stock || 'In Stock',
    moq:            p.moq || '',
    price:          p.price || null,
    orig_price:     p.origPrice || null,
    description:    p.desc || '',
    features:       arrToStr(features),
    sizes:          arrToStr(sizes),
    images:         arrToStr(images),
    related_colors: relColorsToStr(relColors),
  };
}

// ── HELPERS ───────────────────────────────────────────────────
const KEYS = { cart: 'sz_cart', adminPw: 'sz_admin_pw' };
const DEFAULT_ADMIN_PW = 'spinnerz2025';

const _IMG_STOP = new Set(['front','back','side','angle','detail','open','top','bottom',
  'blue','red','green','yellow','black','white','grey','gray','silver','gold','pink',
  'purple','brown','navy','khaki','teal','rose','lime','bright','graphite','peacock','ice','light']);

function groupFromImage(src) {
  if (!src) return null;
  const name = src.split('/').pop().replace(/\.[^.]+$/, '');
  const parts = name.split('-'), prefix = [];
  for (const p of parts) {
    if (p.includes('_') || _IMG_STOP.has(p.toLowerCase())) break;
    prefix.push(p);
  }
  return prefix.length ? prefix.join('-') : null;
}

function autoColorGroup(p) {
  if (p.colorGroup) return p.colorGroup;
  if (p.color_group) return p.color_group;
  return groupFromImage(p.images && p.images[0]);
}

// ── IN-MEMORY CACHE ───────────────────────────────────────────
let _cache = null;

// ── READ ──────────────────────────────────────────────────────
async function getProductsAsync() {
  try {
    const rows = await sbFetch('/products?order=id.asc');
    if (rows && rows.length) {
      _cache = rows.map(fromRow);
      return _cache;
    }
  } catch(e) {
    console.warn('Supabase fetch failed, using defaults:', e.message);
  }
  _cache = DEFAULT_PRODUCTS.map(p => ({...p}));
  return _cache;
}

function getProducts() {
  return _cache || DEFAULT_PRODUCTS.map(p => ({...p}));
}

// ── WRITE — upsert individual product ─────────────────────────
async function saveProduct(product) {
  const row = toRow(product);
  await sbFetch('/products', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(row)
  });
  // Update cache
  if (_cache) {
    const idx = _cache.findIndex(p => p.id === product.id);
    if (idx !== -1) _cache[idx] = product;
    else _cache.push(product);
  }
}

// ── WRITE — upsert all products (used for seed/reset) ─────────
async function saveProducts(products) {
  const rows = products.map(toRow);
  try {
    await sbFetch('/products', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rows)
    });
    _cache = products;
  } catch(e) {
    console.error('saveProducts failed:', e);
    throw e;
  }
}

// ── DELETE single product ─────────────────────────────────────
async function deleteProduct(id) {
  await sbFetch(`/products?id=eq.${id}`, { method: 'DELETE' });
  if (_cache) _cache = _cache.filter(p => p.id !== id);
}

// ── SEED / RESET ──────────────────────────────────────────────
async function seedSupabase() {
  console.log('Seeding Supabase with', DEFAULT_PRODUCTS.length, 'products…');
  await saveProducts(DEFAULT_PRODUCTS);
  console.log('Done!');
}

async function resetProducts() {
  await saveProducts(DEFAULT_PRODUCTS);
}

// ── CART ──────────────────────────────────────────────────────
function getCart()      { const r = localStorage.getItem(KEYS.cart); return r ? JSON.parse(r) : []; }
function saveCart(cart) { localStorage.setItem(KEYS.cart, JSON.stringify(cart)); }

// ── AUTH ──────────────────────────────────────────────────────
function getAdminPw()   { return localStorage.getItem(KEYS.adminPw) || DEFAULT_ADMIN_PW; }
function setAdminPw(pw) { localStorage.setItem(KEYS.adminPw, pw); }