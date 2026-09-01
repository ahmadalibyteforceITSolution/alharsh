const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Quote = require('../models/Quote');
const Banner = require('../models/Banner');
const Coupon = require('../models/Coupon');
const Inquiry = require('../models/Inquiry');
const Admin = require('../models/Admin');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readJson(filename, defaultVal = []) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2));
    return defaultVal;
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return defaultVal;
  }
}

function writeJson(filename, data) {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Generate MongoDB-compatible 24-character hex ID
function generateId() {
  return new mongoose.Types.ObjectId().toString();
}

const Store = {
  // PRODUCTS
  async getProducts(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isActive: { $ne: false } };
        if (filter.category && filter.category !== 'All') query.category = filter.category;
        if (filter.subcategory) query.subcategory = filter.subcategory;
        if (filter.brand) query.brand = filter.brand;
        if (filter.search) {
          query.$or = [
            { name: { $regex: filter.search, $options: 'i' } },
            { description: { $regex: filter.search, $options: 'i' } },
            { sku: { $regex: filter.search, $options: 'i' } },
            { tags: { $in: [new RegExp(filter.search, 'i')] } }
          ];
        }
        if (filter.featured === true || filter.featured === 'true') query.featured = true;
        if (filter.bestSeller === true || filter.bestSeller === 'true') query.bestSeller = true;
        if (filter.isNewArrival === true || filter.isNewArrival === 'true') query.isNewArrival = true;

        let queryBuilder = Product.find(query);
        if (filter.sort === 'price-low') queryBuilder = queryBuilder.sort({ price: 1 });
        else if (filter.sort === 'price-high') queryBuilder = queryBuilder.sort({ price: -1 });
        else if (filter.sort === 'rating') queryBuilder = queryBuilder.sort({ rating: -1 });
        else queryBuilder = queryBuilder.sort({ createdAt: -1 });

        return await queryBuilder.exec();
      } catch (e) {
        console.warn('Fallback to local store for getProducts:', e.message);
      }
    }

    // Local Store
    let items = readJson('products.json', []);
    items = items.filter(p => p.isActive !== false);

    if (filter.category && filter.category !== 'All') {
      items = items.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.subcategory) {
      items = items.filter(p => p.subcategory.toLowerCase() === filter.subcategory.toLowerCase());
    }
    if (filter.brand) {
      items = items.filter(p => p.brand.toLowerCase() === filter.brand.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q)) || 
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    if (filter.featured === true || filter.featured === 'true') {
      items = items.filter(p => p.featured);
    }
    if (filter.bestSeller === true || filter.bestSeller === 'true') {
      items = items.filter(p => p.bestSeller);
    }
    if (filter.isNewArrival === true || filter.isNewArrival === 'true') {
      items = items.filter(p => p.isNewArrival);
    }

    if (filter.sort === 'price-low') items.sort((a, b) => a.price - b.price);
    else if (filter.sort === 'price-high') items.sort((a, b) => b.price - a.price);
    else if (filter.sort === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return items;
  },

  async getProductById(id) {
    if (mongoose.connection.readyState === 1) {
      try {
        const item = await Product.findOne({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }, { sku: id }] });
        if (item) return item;
      } catch (e) {}
    }
    const items = readJson('products.json', []);
    return items.find(p => p._id === id || p.slug === id || p.sku === id) || null;
  },

  async createProduct(data) {
    const id = generateId();
    const slug = (data.name || 'product')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const newProduct = {
      _id: id,
      ...data,
      slug,
      sku: data.sku || `ALH-${Date.now().toString().slice(-6)}`,
      rating: data.rating || 5.0,
      reviewsCount: data.reviewsCount || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to local JSON
    const items = readJson('products.json', []);
    items.unshift(newProduct);
    writeJson('products.json', items);

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Product.create(newProduct);
      } catch (e) {
        console.warn('Mongo createProduct err:', e.message);
      }
    }
    return newProduct;
  },

  async updateProduct(id, updateData) {
    let updated = null;
    const items = readJson('products.json', []);
    const idx = items.findIndex(p => p._id === id || p.slug === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updateData, updatedAt: new Date().toISOString() };
      writeJson('products.json', items);
      updated = items[idx];
    }

    if (mongoose.connection.readyState === 1) {
      try {
        await Product.findOneAndUpdate(
          { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }] },
          { $set: updateData },
          { new: true }
        );
      } catch (e) {}
    }
    return updated;
  },

  async deleteProduct(id) {
    const items = readJson('products.json', []);
    const filtered = items.filter(p => p._id !== id && p.slug !== id);
    writeJson('products.json', filtered);

    if (mongoose.connection.readyState === 1) {
      try {
        await Product.findOneAndDelete({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }] });
      } catch (e) {}
    }
    return true;
  },

  // CATEGORIES
  async getCategories() {
    if (mongoose.connection.readyState === 1) {
      try {
        const cats = await Category.find({ isActive: { $ne: false } }).sort({ displayOrder: 1 });
        if (cats.length) return cats;
      } catch (e) {}
    }
    return readJson('categories.json', []);
  },

  async createCategory(data) {
    const id = generateId();
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    const newCat = {
      _id: id,
      ...data,
      slug,
      subcategories: data.subcategories || [],
      displayOrder: data.displayOrder || 10,
      createdAt: new Date().toISOString()
    };
    const cats = readJson('categories.json', []);
    cats.push(newCat);
    writeJson('categories.json', cats);

    if (mongoose.connection.readyState === 1) {
      try {
        await Category.create(newCat);
      } catch (e) {}
    }
    return newCat;
  },

  async updateCategory(id, updateData) {
    let updated = null;
    const cats = readJson('categories.json', []);
    const idx = cats.findIndex(c => c._id === id || c.slug === id);
    if (idx !== -1) {
      cats[idx] = { ...cats[idx], ...updateData };
      writeJson('categories.json', cats);
      updated = cats[idx];
    }
    if (mongoose.connection.readyState === 1) {
      try {
        await Category.findOneAndUpdate({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }] }, updateData);
      } catch (e) {}
    }
    return updated;
  },

  async deleteCategory(id) {
    const cats = readJson('categories.json', []);
    const filtered = cats.filter(c => c._id !== id && c.slug !== id);
    writeJson('categories.json', filtered);

    if (mongoose.connection.readyState === 1) {
      try {
        await Category.findOneAndDelete({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }] });
      } catch (e) {}
    }
    return true;
  },

  // ORDERS
  async getOrders(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      try {
        const query = {};
        if (filter.status) query.orderStatus = filter.status;
        const orders = await Order.find(query).sort({ createdAt: -1 });
        if (orders.length) return orders;
      } catch (e) {}
    }
    let orders = readJson('orders.json', []);
    if (filter.status) {
      orders = orders.filter(o => o.orderStatus === filter.status);
    }
    return orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  },

  async getOrderByNumber(orderNumber) {
    if (mongoose.connection.readyState === 1) {
      try {
        const order = await Order.findOne({ $or: [{ orderNumber }, { 'customer.phone': orderNumber }, { _id: mongoose.isValidObjectId(orderNumber) ? orderNumber : null }] });
        if (order) return order;
      } catch (e) {}
    }
    const orders = readJson('orders.json', []);
    return orders.find(o => o.orderNumber === orderNumber || o._id === orderNumber || (o.customer && o.customer.phone === orderNumber)) || null;
  },

  async createOrder(data) {
    const id = generateId();
    const orderCount = readJson('orders.json', []).length + 1051;
    const orderNumber = `ALH-${new Date().getFullYear()}-${orderCount}`;

    const newOrder = {
      _id: id,
      orderNumber,
      customer: data.customer,
      items: data.items,
      subtotal: data.subtotal,
      shippingFee: data.shippingFee || 0,
      discount: data.discount || 0,
      couponCode: data.couponCode || '',
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod || 'COD',
      paymentStatus: data.paymentStatus || (data.paymentMethod === 'COD' ? 'Pending' : 'Paid'),
      orderStatus: 'Pending',
      trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      timeline: [
        {
          status: 'Pending',
          title: 'Order Placed',
          description: `Order successfully placed via ${data.paymentMethod || 'COD'}.`,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const orders = readJson('orders.json', []);
    orders.unshift(newOrder);
    writeJson('orders.json', orders);

    if (mongoose.connection.readyState === 1) {
      try {
        await Order.create(newOrder);
      } catch (e) {
        console.warn('Mongo createOrder err:', e.message);
      }
    }
    return newOrder;
  },

  async updateOrderStatus(id, { orderStatus, paymentStatus, trackingNumber, note }) {
    let updated = null;
    const orders = readJson('orders.json', []);
    const idx = orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx !== -1) {
      if (orderStatus) orders[idx].orderStatus = orderStatus;
      if (paymentStatus) orders[idx].paymentStatus = paymentStatus;
      if (trackingNumber !== undefined) orders[idx].trackingNumber = trackingNumber;

      if (orderStatus || note) {
        orders[idx].timeline = orders[idx].timeline || [];
        orders[idx].timeline.push({
          status: orderStatus || orders[idx].orderStatus,
          title: `Status Updated to ${orderStatus || orders[idx].orderStatus}`,
          description: note || `Order marked as ${orderStatus || orders[idx].orderStatus} by operations team.`,
          timestamp: new Date().toISOString()
        });
      }

      writeJson('orders.json', orders);
      updated = orders[idx];
    }

    if (mongoose.connection.readyState === 1) {
      try {
        await Order.findOneAndUpdate(
          { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { orderNumber: id }] },
          { 
            $set: { 
              ...(orderStatus && { orderStatus }), 
              ...(paymentStatus && { paymentStatus }), 
              ...(trackingNumber !== undefined && { trackingNumber }) 
            },
            ...(note || orderStatus ? {
              $push: {
                timeline: {
                  status: orderStatus,
                  title: `Status Updated to ${orderStatus}`,
                  description: note || `Order updated by staff.`,
                  timestamp: new Date()
                }
              }
            } : {})
          }
        );
      } catch (e) {}
    }
    return updated;
  },

  // BULK QUOTES
  async getQuotes() {
    if (mongoose.connection.readyState === 1) {
      try {
        const quotes = await Quote.find({}).sort({ createdAt: -1 });
        if (quotes.length) return quotes;
      } catch (e) {}
    }
    return readJson('quotes.json', []);
  },

  async createQuote(data) {
    const id = generateId();
    const quoteNumber = `QTE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote = {
      _id: id,
      quoteNumber,
      ...data,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const quotes = readJson('quotes.json', []);
    quotes.unshift(newQuote);
    writeJson('quotes.json', quotes);

    if (mongoose.connection.readyState === 1) {
      try {
        await Quote.create(newQuote);
      } catch (e) {}
    }
    return newQuote;
  },

  async updateQuoteStatus(id, { status, adminReply }) {
    const quotes = readJson('quotes.json', []);
    const idx = quotes.findIndex(q => q._id === id || q.quoteNumber === id);
    let updated = null;
    if (idx !== -1) {
      if (status) quotes[idx].status = status;
      if (adminReply !== undefined) quotes[idx].adminReply = adminReply;
      writeJson('quotes.json', quotes);
      updated = quotes[idx];
    }
    if (mongoose.connection.readyState === 1) {
      try {
        await Quote.findOneAndUpdate({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { quoteNumber: id }] }, { status, adminReply });
      } catch (e) {}
    }
    return updated;
  },

  // BANNERS
  async getBanners() {
    if (mongoose.connection.readyState === 1) {
      try {
        const banners = await Banner.find({ isActive: { $ne: false } }).sort({ order: 1 });
        if (banners.length) return banners;
      } catch (e) {}
    }
    return readJson('banners.json', []);
  },

  async createBanner(data) {
    const id = generateId();
    const newBanner = { _id: id, ...data, order: data.order || 1, isActive: true };
    const banners = readJson('banners.json', []);
    banners.push(newBanner);
    writeJson('banners.json', banners);
    if (mongoose.connection.readyState === 1) {
      try { await Banner.create(newBanner); } catch (e) {}
    }
    return newBanner;
  },

  async updateBanner(id, data) {
    const banners = readJson('banners.json', []);
    const idx = banners.findIndex(b => b._id === id);
    let updated = null;
    if (idx !== -1) {
      banners[idx] = { ...banners[idx], ...data };
      writeJson('banners.json', banners);
      updated = banners[idx];
    }
    if (mongoose.connection.readyState === 1) {
      try { await Banner.findByIdAndUpdate(id, data); } catch (e) {}
    }
    return updated;
  },

  async deleteBanner(id) {
    const banners = readJson('banners.json', []);
    writeJson('banners.json', banners.filter(b => b._id !== id));
    if (mongoose.connection.readyState === 1) {
      try { await Banner.findByIdAndDelete(id); } catch (e) {}
    }
    return true;
  },

  // COUPONS
  async getCoupons() {
    if (mongoose.connection.readyState === 1) {
      try {
        const coupons = await Coupon.find({ isActive: true });
        if (coupons.length) return coupons;
      } catch (e) {}
    }
    return readJson('coupons.json', []);
  },

  async validateCoupon(code, cartTotal) {
    const coupons = await this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) return { valid: false, message: 'Invalid or expired promo coupon code' };
    if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
      return { valid: false, message: `Minimum order amount for this coupon is Rs. ${coupon.minOrderAmount.toLocaleString()}` };
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((cartTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }
    return { valid: true, discount, coupon };
  },

  async createCoupon(data) {
    const id = generateId();
    const newCoupon = { _id: id, ...data, code: data.code.toUpperCase(), isActive: true };
    const coupons = readJson('coupons.json', []);
    coupons.push(newCoupon);
    writeJson('coupons.json', coupons);
    if (mongoose.connection.readyState === 1) {
      try { await Coupon.create(newCoupon); } catch (e) {}
    }
    return newCoupon;
  },

  async deleteCoupon(id) {
    const coupons = readJson('coupons.json', []);
    writeJson('coupons.json', coupons.filter(c => c._id !== id && c.code !== id));
    if (mongoose.connection.readyState === 1) {
      try { await Coupon.findOneAndDelete({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { code: id }] }); } catch (e) {}
    }
    return true;
  },

  // INQUIRIES / CONTACT
  async getInquiries() {
    if (mongoose.connection.readyState === 1) {
      try {
        const list = await Inquiry.find({}).sort({ createdAt: -1 });
        if (list.length) return list;
      } catch (e) {}
    }
    return readJson('inquiries.json', []);
  },

  async createInquiry(data) {
    const id = generateId();
    const item = { _id: id, ...data, status: 'Unread', createdAt: new Date().toISOString() };
    const inquiries = readJson('inquiries.json', []);
    inquiries.unshift(item);
    writeJson('inquiries.json', inquiries);
    if (mongoose.connection.readyState === 1) {
      try { await Inquiry.create(item); } catch (e) {}
    }
    return item;
  },

  async updateInquiryStatus(id, status) {
    const list = readJson('inquiries.json', []);
    const idx = list.findIndex(i => i._id === id);
    if (idx !== -1) {
      list[idx].status = status;
      writeJson('inquiries.json', list);
    }
    if (mongoose.connection.readyState === 1) {
      try { await Inquiry.findByIdAndUpdate(id, { status }); } catch (e) {}
    }
    return true;
  },

  // ANALYTICS & STATS
  async getStats() {
    const products = await this.getProducts({});
    const orders = await this.getOrders({});
    const quotes = await this.getQuotes();
    const categories = await this.getCategories();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const lowStockCount = products.filter(p => p.stock <= 15).length;
    const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Pending').length;
    const newQuotesCount = quotes.filter(q => q.status === 'New').length;

    // Category breakdown
    const categoryStats = {
      Sanitary: products.filter(p => p.category === 'Sanitary').length,
      Electrical: products.filter(p => p.category === 'Electrical').length,
      Hardware: products.filter(p => p.category === 'Hardware').length
    };

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      lowStockCount,
      pendingOrdersCount,
      newQuotesCount,
      categoryStats,
      recentOrders: orders.slice(0, 5),
      lowStockProducts: products.filter(p => p.stock <= 15).slice(0, 5)
    };
  }
};

module.exports = Store;
