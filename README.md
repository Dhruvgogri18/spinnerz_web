# Spinnerz — Project Structure & Editing Guide

## Quick Start

Open `index.html` in your browser — that's the storefront.
Open `admin/index.html` for the admin panel. Default password: **spinnerz2025**

---

## Folder Structure

```
spinnerz/
│
├── index.html                  ← Main storefront (customer-facing)
│
├── assets/
│   ├── css/
│   │   ├── tokens.css          ← ⭐ Design tokens (colours, fonts, spacing)
│   │   └── store.css           ← Storefront styles
│   ├── js/
│   │   ├── data.js             ← ⭐ Product data + localStorage helpers
│   │   └── store.js            ← Storefront logic (cart, filters, modals)
│   └── images/                 ← Drop product or brand images here
│
└── admin/
    ├── index.html              ← Admin panel (password-protected)
    ├── css/
    │   └── admin.css           ← Admin panel styles
    └── js/
        └── admin.js            ← Admin logic (auth, CRUD, dashboard)
```

---

## Common Tasks

### 🎨 Change Brand Colours
Edit `assets/css/tokens.css`. Every colour variable is documented inline.
```css
--red:   #c0251a;   /* Change this to update all CTAs */
--navy:  #10183a;   /* Change this to update hero / sidebar */
--gold:  #b8953a;   /* Change this to update accent colour */
```

### 📦 Change Default Products
Edit the `DEFAULT_PRODUCTS` array at the top of `assets/js/data.js`.
These are the products that appear when a user opens the site for the first time.
After editing, clear localStorage in the browser to see the change.

Each product object:
```js
{
  id:        1,                  // Unique number
  name:      'Aria Pro 28"',     // Displayed on card
  category:  'Hard Luggage',     // Must match a filter button label
  price:     7999,               // Selling price (₹)
  origPrice: 10999,              // MRP — shows strikethrough (null to hide)
  badge:     'new',              // 'new' | 'hot' | 'sale' | '' (empty = none)
  emoji:     '🧳',              // Product icon
  stock:     'In Stock',         // 'In Stock' | 'Low Stock' | 'Out of Stock'
  desc:      'Description here.' // Shown in product detail modal
}
```

### 🗂️ Add a New Product Category
1. Add the category to the filter bar in `index.html`:
   ```html
   <button class="filter-btn" onclick="filterProducts('My Category', this)">My Category</button>
   ```
2. Add a category tile in the `cats-grid` section of `index.html`.
3. Make sure new products in `data.js` use the same category string.

### 🔒 Change the Admin Password
Log into the admin panel → Settings → Change Admin Password.
The password is stored in `localStorage` (`sz_admin_pw`).

Default fallback: `spinnerz2025` (defined in `assets/js/data.js` → `DEFAULT_ADMIN_PW`).

### 🖼️ Replace Emoji with Real Product Images
In `store.js`, find the `renderProducts()` function.
Change the `prod-img` div from emoji to an `<img>` tag:
```js
// Before:
`<div class="prod-img">${p.emoji} ...`

// After (if you add an imageUrl field to each product):
`<div class="prod-img"><img src="${p.imageUrl}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;"> ...`
```

### ✏️ Edit Homepage Copy
All static text (hero headline, about band, testimonials, footer) lives
directly in `index.html`. Search for the section comment, e.g. `HERO`, and
edit the text inside the HTML tags.

### 📱 Adjust Responsive Breakpoints
Breakpoints are at the bottom of `assets/css/store.css` under `/* RESPONSIVE */`.
Currently: 900px (tablet) and 600px (mobile).

---

## How the Backend Works

There is no server. Products are stored in the browser's `localStorage`:

| Key             | Contents                              |
|-----------------|---------------------------------------|
| `sz_products`   | JSON array of product objects         |
| `sz_cart`       | JSON array of cart items              |
| `sz_admin_pw`   | Custom admin password (if changed)    |

`assets/js/data.js` exposes these helpers:
- `getProducts()` / `saveProducts(arr)`
- `getCart()` / `saveCart(arr)`
- `getAdminPw()` / `setAdminPw(pw)`
- `resetProducts()` — restores DEFAULT_PRODUCTS

Admin changes (add / edit / delete) are saved immediately and reflected on
the storefront on next page load.

---

## Script Load Order

Both HTML files load scripts in this order — **do not change this**:
```html
<script src="assets/js/data.js"></script>   <!-- Must be first -->
<script src="assets/js/store.js"></script>  <!-- OR admin.js -->
```

`data.js` declares all shared functions. If `store.js` / `admin.js` loads
first, it will throw "getProducts is not defined" errors.

---

## Deploy to Production

1. Upload the entire `spinnerz/` folder to your web host via FTP / cPanel.
2. Set your domain to point to `spinnerz/index.html`.
3. The admin panel will be at `yourdomain.com/admin/`.
4. **Before going live:** remove the default-password hint line from
   `admin/index.html` (search for `Default password:`).
5. Log into admin and change the password immediately.

> **Note:** Because this uses localStorage, product data lives in each
> visitor's browser — not on a server. All products added via admin
> are only visible from the same browser. To serve products from a real
> database, you would replace the `getProducts()` / `saveProducts()`
> functions in `data.js` with `fetch()` calls to a backend API.

---

## Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Markup     | Plain HTML5        |
| Styles     | Plain CSS3         |
| Logic      | Plain JavaScript   |
| Data       | Browser localStorage |
| Fonts      | Google Fonts (CDN) |

No build tools, no npm, no frameworks — open any file in a text editor and
start editing.