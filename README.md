# AL-HRSH — Sanitary, Electrical & Hardware Products E-Commerce Store & Admin Portal

A full-featured, enterprise-grade E-Commerce web platform built for **AL-HRSH** inspired by [Popular Pipes Group](https://www.popularpipesgroup.com/) with a sleek **Industrial Bluish Theme**, connected directly to **MongoDB Atlas**, featuring a complete customer storefront and a separate staff **Admin Management Dashboard**.

---

## 🌟 Key Features

### 🛒 Customer Storefront (Vue 3 + Vite + Tailwind)
- **Bluish Industrial Design System**: Styled with deep royal navy, sky blue, cyan, and gold badges matching Popular Pipes brand identity.
- **Helpline & WhatsApp Integration**: Direct calling (`0302-9355294`) and floating sticky WhatsApp quick-order button on every page.
- **Hero Slider Carousel**: High-impact banners for Popular PPRC pipes, Fast Cables, and heavy-duty power tools.
- **Dynamic Category & Subcategory Catalog**:
  - **Sanitary**: Wash basins & sinks, commodes, brass mixers & taps, rainfall showers, bathroom accessories, Popular PPRC & UPVC PN-20 pipes, water tanks.
  - **Electrical**: Fast Cables 99.99% pure copper, Schneider double-pole MCBs, luxury acrylic glass switches, LED flood lights, inverter BLDC fans.
  - **Hardware**: Heavy-duty rotary hammer drills, angle grinders, Yale solid brass mortise locks, anchor shield rawal bolts, silicone sealants.
- **Live Search & Auto-Suggestions**: Real-time product search with thumbnail previews.
- **Product Detail Experience**:
  - Multi-image zoom gallery and thumbnail switcher.
  - Technical engineering specification tables (DIN 8077/8078, PN-20, voltage, warranty).
  - Live quantity stepper and instant subtotal calculation.
  - Interactive **"Request Bulk Contractor Rate"** modal for high-volume B2B orders.
- **Cart & Checkout**:
  - Slide-over quick cart drawer with Free Shipping milestone tracker.
  - Promo code redemption system (`WELCOME10`, `BULK500`, `CONTRACTOR15`).
  - Checkout supporting **Cash on Delivery (COD)**, **JazzCash / Easypaisa**, and **Direct Bank Transfer (IBFT)**.
  - Printable official order invoices.
- **Real-Time Live Order Tracking**: Search by Order ID (`ALH-2026-xxxx`) or phone number to view interactive 5-stage dispatch milestones:
  `Order Received` &rarr; `Verified` &rarr; `Packed in Hub` &rarr; `Dispatched / In Transit` &rarr; `Delivered`.
- **Contractor & Wholesale BOQ Portal**: Specialized B2B quote submission form for builders and plumbers.
- **About, Contact & Location Map**: Store contact info with embedded Google Map and message submission.

---

### 🛡️ Dedicated Admin Management Portal (`/admin`)
- **Role-Based Admin Authentication**: Secured JWT login for staff.
- **Overview Analytics & KPI Dashboard**:
  - Total Revenue, Total Orders, Active Catalog Items, and Low Stock Inventory Alerts.
  - Recent Orders table and Category distribution stats.
- **Product Management (CRUD & Upload)**:
  - Add and Edit products with file image upload or image URL.
  - Dynamic key-value technical specifications builder.
  - Category and subcategory selectors, stock level counters, and sale pricing.
  - Delete with confirmation.
- **Category & Subcategory Hierarchy**: Add and manage subcategories dynamically.
- **Orders & Logistics Management**:
  - View all incoming orders and customer details.
  - Update status (`Pending`, `Confirmed`, `Processing`, `Dispatched`, `Delivered`, `Cancelled`).
  - Assign courier tracking codes (TCS, Leopard, Daewoo).
- **Bulk Contractor Quotations**: Track, review, and reply to contractor RFPs.
- **Home Hero Banners**: Create, edit, and re-order homepage carousel slides.
- **Promo Coupon Codes**: Create percentage or fixed discount coupon codes.
- **Customer Inquiries**: Read and respond to contact form submissions.

---

## 🗄️ Database Architecture (MongoDB Atlas)

- **MongoDB URI**: `mongodb+srv://ahmedalihafeez25_db_user:%40Sublime12345@cluster0.oe0inne.mongodb.net/Alharsh?retryWrites=true&w=majority`
- All product catalogs, categories, orders, quotes, banners, and coupons are stored and fetched live directly from MongoDB via Mongoose.

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
```bash
# In the root folder:
cd server && npm install
cd ../client && npm install
```

### 2. Seed Live MongoDB Database
```bash
cd server
npm run seed
```

### 3. Run Backend & Frontend Servers
```bash
# Terminal 1 - Backend Server (Port 5000)
cd server
npm start

# Terminal 2 - Frontend Client (Port 3000)
cd client
npm run dev
```

Visit:
- **Customer Storefront**: `http://localhost:3000/`
- **Staff Admin Portal**: `http://localhost:3000/admin`

---

## 🔐 Default Admin Credentials
- **Email**: `admin@alharsh.com`
- **Password**: `admin12345`

---

## 📞 Support Helpline & WhatsApp
- **Helpline Number**: `0302-9355294`
- **WhatsApp**: `+92 302 9355294`
- **Official Email**: `support@alharsh.com`
